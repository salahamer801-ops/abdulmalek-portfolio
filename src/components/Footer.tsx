import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { Monogram } from "./common";
import { goTo } from "../lib/dom";

export function Footer({ onOpenEditor }: { onOpenEditor: () => void }) {
  const { t, lang, content, editing, setEditing } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-[color:var(--color-line)]/70 bg-white/70">
      <div className="wrap flex flex-col gap-6 py-9 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Monogram name={content.profile.name[lang]} size={40} />
            <div className="leading-tight">
              <E path="profile.name" as="div" className="text-[15px] font-bold text-[color:var(--color-navy)]" />
              <E
                path="profile.title"
                as="div"
                className="text-[12px] text-[color:var(--color-muted)]"
              />
            </div>
          </div>
          <p className="mono mt-3 text-[11.5px] text-[color:var(--color-muted)]" dir="ltr">
            web · backend · api · database
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              window.location.hash = "";
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Icon name="arrow" size={15} />
            {t("navWork")}
          </button>
          {content.settings.showResume ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => goTo("#/resume")}>
              <Icon name="printer" size={15} />
              {t("resume")}
            </button>
          ) : null}
          {content.profile.linkedin ? (
            <a
              className="btn btn-ghost btn-sm"
              href={content.profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="linkedin" size={15} />
              {t("linkedin")}
            </a>
          ) : null}
          <button
            type="button"
            className={`btn btn-sm ${editing ? "btn-primary" : "btn-ghost"}`}
            onClick={() => {
              const next = !editing;
              setEditing(next);
              if (next) onOpenEditor();
            }}
            aria-pressed={editing}
          >
            <Icon name="edit" size={15} />
            {t("editToggle")}
          </button>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-line)]/70">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-4 text-[12px] text-[color:var(--color-muted)]">
          <span>
            © {year} — <E path="profile.name" as="span" /> · {t("footerRights")}
          </span>
          <span className="mono" dir="ltr">
            {lang === "ar" ? "صُنع بعناية في اليمن" : "Crafted in Yemen"}
          </span>
        </div>
      </div>
    </footer>
  );
}
