import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defaultContent } from "./content/defaultContent";
import type { Content, L, Lang } from "./content/types";
import { tr } from "./i18n";

const CONTENT_KEY = "amer.portfolio.content.v3";
const LANG_KEY = "amer.portfolio.lang";

/* ------------------------------------------------------------------ */
/* immutable helpers                                                   */
/* ------------------------------------------------------------------ */
type Any = any;

export function getIn(obj: Any, path: string[]): Any {
  return path.reduce((acc: Any, key) => (acc == null ? undefined : acc[key]), obj);
}

export function setIn(obj: Any, path: string[], value: Any): Any {
  if (path.length === 0) return value;
  const [key, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = obj.slice();
    const idx = Number(key);
    copy[idx] = setIn(copy[idx], rest, value);
    return copy;
  }
  const base = obj && typeof obj === "object" ? obj : {};
  return { ...base, [key]: setIn(base[key], rest, value) };
}

function isPlainObject(v: Any): boolean {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/** Fill in anything missing in stored content from the defaults. */
function mergeDefaults<T>(base: T, stored: Any): T {
  if (!isPlainObject(base) || !isPlainObject(stored)) {
    return (stored === undefined || stored === null ? base : stored) as T;
  }
  const out: Any = Array.isArray(base) ? [] : { ...(base as Any) };
  for (const key of Object.keys(base as Any)) {
    out[key] = mergeDefaults((base as Any)[key], stored[key]);
  }
  // keep extra keys the user added (e.g. new projects)
  for (const key of Object.keys(stored)) {
    if (!(key in out)) out[key] = stored[key];
  }
  return out as T;
}

/* ------------------------------------------------------------------ */
/* context                                                             */
/* ------------------------------------------------------------------ */
type Store = {
  content: Content;
  lang: Lang;
  editing: boolean;
  setLang: (l: Lang) => void;
  setEditing: (b: boolean) => void;
  get: (path: string) => Any;
  set: (path: string, value: Any) => void;
  insert: (path: string, index: number, value: Any) => void;
  remove: (path: string, index: number) => void;
  move: (path: string, index: number, delta: number) => void;
  exportJson: () => void;
  importJson: (text: string) => boolean;
  reset: () => void;
  t: (key: string) => string;
  /** pick the current language out of a bilingual value */
  L: (value: L | undefined) => string;
  hasLocal: boolean;
};

const StoreContext = createContext<Store | null>(null);

/** Old default text colours are swapped for the new palette, so saved copies follow along. */
const LEGACY_COLORS: Record<string, string> = {
  "#0b2a4b": "#123a76",
  "#0f172a": "#1b2a46",
  "#64748b": "#5c6d8a",
  "#12305e": "#123a76",
};

function migrateColors(content: Content): Content {
  const settings = { ...content.settings };
  let touched = false;
  (["navy", "ink", "muted"] as const).forEach((key) => {
    const value = String(settings[key] ?? "").toLowerCase();
    if (LEGACY_COLORS[value]) {
      settings[key] = LEGACY_COLORS[value];
      touched = true;
    }
  });

  // a saved copy made before the profile photos existed gets them filled in
  const profile = { ...content.profile };
  if (!String(profile.avatar ?? "").trim() && defaultContent.profile.avatar) {
    profile.avatar = defaultContent.profile.avatar;
    touched = true;
  }
  if (!String(profile.portrait ?? "").trim() && defaultContent.profile.portrait) {
    profile.portrait = defaultContent.profile.portrait;
    touched = true;
  }

  if (!touched) return content;
  return { ...content, settings, profile };
}

function loadContent(): { content: Content; hasLocal: boolean } {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { content: migrateColors(mergeDefaults(defaultContent, parsed)), hasLocal: true };
    }
  } catch {
    /* ignore broken storage */
  }
  return { content: defaultContent, hasLocal: false };
}

function loadLang(): Lang {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === "en" || raw === "ar") return raw;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const initial = useRef(loadContent());
  const [content, setContent] = useState<Content>(initial.current.content);
  const [lang, setLangState] = useState<Lang>(loadLang);
  const [editing, setEditing] = useState(false);
  const [hasLocal, setHasLocal] = useState(initial.current.hasLocal);
  /* only write to storage after a real edit, so new defaults are never shadowed */
  const dirty = useRef(false);

  /* persist content */
  useEffect(() => {
    if (!dirty.current) return;
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
      setHasLocal(true);
    } catch {
      /* storage full or blocked */
    }
  }, [content]);

  /* persist language + document direction */
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title =
      content.settings.pageTitle?.[lang] ||
      (lang === "ar"
        ? `${content.profile.name.ar} — ${content.profile.title.ar}`
        : `${content.profile.name.en} — ${content.profile.title.en}`);
    const social = [
      document.querySelector('meta[property="og:title"]'),
      document.querySelector('meta[name="twitter:title"]'),
    ];
    social.forEach((tag) => {
      if (tag) tag.setAttribute("content", document.title);
    });
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        lang === "ar"
          ? `${content.profile.name.ar} — ${content.profile.title.ar}. ${content.profile.tagline.ar}`
          : `${content.profile.name.en} — ${content.profile.title.en}. ${content.profile.tagline.en}`,
      );
    }
  }, [lang, content.profile.name, content.profile.title, content.profile.tagline, content.settings.pageTitle]);

  /* theme variables + motion + editing flags */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-brand", content.settings.accent);
    root.style.setProperty("--color-navy", content.settings.navy);
    root.style.setProperty("--color-ink", content.settings.ink || "#1b2a46");
    root.style.setProperty("--color-muted", content.settings.muted || "#5c6d8a");
    root.dataset.motion = content.settings.motion;
    root.dataset.editing = editing ? "1" : "0";
  }, [
    content.settings.accent,
    content.settings.navy,
    content.settings.ink,
    content.settings.muted,
    content.settings.motion,
    editing,
  ]);

  const get = useCallback((path: string) => getIn(content, path.split(".")), [content]);

  const set = useCallback((path: string, value: Any) => {
    dirty.current = true;
    setContent((prev) => setIn(prev, path.split("."), value));
  }, []);

  const insert = useCallback((path: string, index: number, value: Any) => {
    dirty.current = true;
    setContent((prev) => {
      const list = getIn(prev, path.split("."));
      const next = Array.isArray(list) ? list.slice() : [];
      next.splice(index, 0, value);
      return setIn(prev, path.split("."), next);
    });
  }, []);

  const remove = useCallback((path: string, index: number) => {
    dirty.current = true;
    setContent((prev) => {
      const list = getIn(prev, path.split("."));
      if (!Array.isArray(list)) return prev;
      const next = list.slice();
      next.splice(index, 1);
      return setIn(prev, path.split("."), next);
    });
  }, []);

  const move = useCallback((path: string, index: number, delta: number) => {
    dirty.current = true;
    setContent((prev) => {
      const list = getIn(prev, path.split("."));
      if (!Array.isArray(list)) return prev;
      const target = index + delta;
      if (target < 0 || target >= list.length) return prev;
      const next = list.slice();
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return setIn(prev, path.split("."), next);
    });
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-portfolio-content.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [content]);

  const importJson = useCallback((text: string) => {
    try {
      const parsed = JSON.parse(text);
      dirty.current = true;
      setContent(mergeDefaults(defaultContent, parsed));
      return true;
    } catch {
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    dirty.current = false;
    try {
      localStorage.removeItem(CONTENT_KEY);
    } catch {
      /* ignore */
    }
    setContent(defaultContent);
    setHasLocal(false);
  }, []);

  const value = useMemo<Store>(
    () => ({
      content,
      lang,
      editing,
      setLang: setLangState,
      setEditing,
      get,
      set,
      insert,
      remove,
      move,
      exportJson,
      importJson,
      reset,
      t: (key: string) => tr(key, lang),
      L: (v: L | undefined) => (v ? v[lang] ?? v.ar ?? "" : ""),
      hasLocal,
    }),
    [content, lang, editing, get, set, insert, remove, move, exportJson, importJson, reset, hasLocal],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
