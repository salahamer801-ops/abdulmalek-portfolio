import { useState } from "react";
import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { flashNav } from "../lib/dom";
import { Monogram } from "./common";

const LINKS = [
  { hash: "#tour", key: "navTour" },
  { hash: "#work", key: "navWork" },
  { hash: "#about", key: "navAbout" },
  { hash: "#skills", key: "navSkills" },
  { hash: "#services", key: "navServices" },
  { hash: "#contact", key: "navContact" },
];

export function Nav({ onOpenEditor }: { onOpenEditor: () => void }) {
  const { t, lang, setLang, content, editing, setEditing } = useStore();
  const [open, setOpen] = useState(false);

  const jump = (hash: string) => {
    setOpen(false);
    flashNav();
    const isSub = window.location.hash.startsWith("#/work") || window.location.hash.startsWith("#/resume");
    if (isSub) {
      window.location.hash = "";
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[color:var(--color-line)]/70 bg-white/80 backdrop-blur-md">
      <div className="wrap flex h-[66px] items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            window.location.hash = "";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-start"
          aria-label={content.profile.name[lang]}
        >
          <Monogram name={content.profile.name[lang]} size={38} />
          <span className="hidden leading-tight sm:block">
            <E path="profile.name" as="span" className="block text-[15px] font-bold text-[color:var(--color-navy)]" />
            <E
              path="profile.title"
              as="span"
              className="block text-[11.5px] text-[color:var(--color-muted)]"
            />
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => jump(link.hash)}
              className="rounded-xl px-3 py-2 text-[14px] font-medium text-[color:var(--color-navy)]/80 transition hover:bg-[color:var(--color-brand-soft)] hover:text-[color:var(--color-navy)]"
            >
              {t(link.key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="btn btn-ghost btn-sm"
            aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Icon name="globe" size={15} />
            {lang === "ar" ? "EN" : "ع"}
          </button>

          <button
            type="button"
            onClick={() => {
              const next = !editing;
              setEditing(next);
              if (next) onOpenEditor();
            }}
            className={`btn btn-sm ${editing ? "btn-primary" : "btn-ghost"}`}
            aria-label={t("editToggle")}
            aria-pressed={editing}
          >
            <Icon name="edit" size={15} />
            <span className="hidden sm:inline">{t("editToggle")}</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} size={17} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--color-line)] bg-white/95 lg:hidden">
          <div className="wrap grid grid-cols-2 gap-2 py-3">
            {LINKS.map((link, index) => (
              <button
                key={link.key}
                type="button"
                onClick={() => jump(link.hash)}
                className="menu3d rounded-xl border border-[color:var(--color-line)] px-3 py-2.5 text-start text-[14px] font-medium text-[color:var(--color-navy)]"
                style={{ ["--k" as string]: index }}
              >
                {t(link.key)}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
