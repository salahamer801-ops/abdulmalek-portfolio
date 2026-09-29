import { useMemo, useState } from "react";
import { useStore } from "../store";
import type { CategoryKey, Project } from "../content/types";
import { CATEGORY_LABEL, STATUS_LABEL, STATUS_TONE } from "../i18n";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { SectionHead } from "./common";
import { Lightbox, SpotlightFrame, type LightboxItem } from "./Interactive";
import { goTo } from "../lib/dom";

const CATS: ("all" | CategoryKey)[] = ["all", "ops", "agri", "pm", "tools"];

function matches(project: Project, query: string, lang: "ar" | "en"): boolean {
  if (!query.trim()) return true;
  const haystack = [
    project.name[lang],
    project.name.ar,
    project.name.en,
    project.tagline[lang],
    project.summary[lang],
    ...project.tech,
    ...(project.features[lang] ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export function StatusPill({ status }: { status: Project["status"] }) {
  const { t } = useStore();
  const tone = STATUS_TONE[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
      style={{ background: `${tone}18`, color: tone, border: `1px solid ${tone}33` }}
    >
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: tone }} />
      {t(STATUS_LABEL[status])}
    </span>
  );
}

function Thumb({
  project,
  large = false,
  fill = false,
  onOpen,
}: {
  project: Project;
  large?: boolean;
  fill?: boolean;
  onOpen?: () => void;
}) {
  const { lang, t, editing } = useStore();
  const contain = project.imageFit === "contain";
  const height = large
    ? fill
      ? "h-full min-h-[240px] md:min-h-[420px]"
      : "h-[240px] md:h-[380px]"
    : contain
      ? "h-[212px]"
      : "h-[176px]";
  if (project.image) {
    return (
      <SpotlightFrame
        tilt={large ? 4 : 2.5}
        className={`shine w-full ${fill ? "h-full" : ""}`}
        style={{ ["--tone" as string]: project.tone }}
      >
        <div
          className={`zoom-media relative w-full overflow-hidden ${height} ${
            contain ? "flex items-center justify-center p-3" : ""
          }`}
          style={
            contain
              ? { background: `linear-gradient(150deg, ${project.tone}1f, rgba(11,42,75,0.05))` }
              : undefined
          }
        >
          <img
            src={project.image}
            alt={project.name[lang]}
            loading="lazy"
            className={contain ? "max-h-full max-w-full object-contain" : "h-full w-full object-cover"}
          />
        </div>
        {onOpen ? (
          <>
            <span className="frame-tag">
              <Icon name="search" size={12} />
              {t("zoomIn")}
            </span>
            <button
              type="button"
              onClick={onOpen}
              aria-label={`${t("zoomIn")} — ${project.name[lang]}`}
              className="absolute inset-0 z-[5] cursor-zoom-in"
            />
          </>
        ) : null}
      </SpotlightFrame>
    );
  }
  return (
    <div
      className={`relative flex w-full items-center justify-center ${height}`}
      style={{
        background: `linear-gradient(135deg, ${project.tone}22, ${project.tone}06 55%, transparent)`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-[26px] font-bold text-white shadow-lg"
          style={{ background: project.tone }}
        >
          {(project.name[lang] || "?").trim().charAt(0)}
        </div>
        <div className="mt-3 text-[12.5px] font-semibold text-[color:var(--color-navy)]/70">
          {t(CATEGORY_LABEL[project.category])}
        </div>
        {editing ? (
          <div className="mono mt-1 text-[11px] text-[color:var(--color-muted)]">image: {project.image || "—"}</div>
        ) : null}
      </div>
    </div>
  );
}

function Badges({ project }: { project: Project }) {
  const { t } = useStore();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusPill status={project.status} />
      {project.featured ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-brand-soft)] px-2.5 py-1 text-[11.5px] font-semibold text-[color:var(--color-brand-deep)]">
          <Icon name="star" size={13} />
          {t("featured")}
        </span>
      ) : null}
    </div>
  );
}

function Actions({ project }: { project: Project }) {
  const { t, editing } = useStore();
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <button type="button" className="btn btn-primary btn-sm" onClick={() => goTo(`#/work/${project.slug}`)}>
        <Icon name="arrow" size={15} />
        {t("details")}
      </button>
      {project.link ? (
        <a className="btn btn-ghost btn-sm" href={project.link} target="_blank" rel="noreferrer noopener">
          <Icon name="external" size={15} />
          {t("liveDemo")}
        </a>
      ) : null}
      {editing ? <span className="mono text-[11px] text-[color:var(--color-muted)]">#{project.slug}</span> : null}
    </div>
  );
}

function TechRow({ tech }: { tech: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tech.slice(0, 6).map((item) => (
        <span key={item} className="chip mono">
          {item}
        </span>
      ))}
      {tech.length > 6 ? <span className="chip mono">+{tech.length - 6}</span> : null}
    </div>
  );
}

function Card({ project, onOpen }: { project: Project; onOpen?: () => void }) {
  const { t, content } = useStore();
  const index = content.projects.indexOf(project);

  if (project.featured) {
    return (
      <article
        className="reveal card card-hover group col-span-full overflow-hidden"
        style={{ ["--tone" as string]: project.tone }}
      >
        <div className="grid lg:grid-cols-[1fr_1.03fr]">
          <div className="relative p-6 md:p-8">
            <span className="tone-line absolute inset-x-0 top-0 h-[3px]" />
            <div className="text-[11.5px] font-semibold text-[color:var(--color-muted)]">
              {t(CATEGORY_LABEL[project.category])}
            </div>
            <div className="mt-2">
              <Badges project={project} />
            </div>
            <E
              path={`projects.${index}.name`}
              as="h3"
              className="balance mt-4 text-[24px] font-bold leading-tight text-[color:var(--color-navy)] md:text-[32px]"
            />
            <E
              path={`projects.${index}.tagline`}
              as="p"
              multiline
              className="pretty mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink)]/80 md:text-[16.5px]"
            />
            <E
              path={`projects.${index}.summary`}
              as="p"
              multiline
              className="pretty mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]"
            />
            <TechRow tech={project.tech} />
            <Actions project={project} />
          </div>
          <div className="relative flex border-t border-[color:var(--color-line)] lg:border-s lg:border-t-0">
            <Thumb project={project} large fill onOpen={onOpen} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="reveal card card-hover group flex flex-col overflow-hidden"
      style={{ ["--tone" as string]: project.tone }}
    >
      <div className="relative">
        <span className="tone-line absolute inset-x-0 top-0 z-10 h-[3px]" />
        <Thumb project={project} onOpen={onOpen} />
        <div className="absolute start-3 top-4 z-10">
          <Badges project={project} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11.5px] font-semibold text-[color:var(--color-muted)]">
          {t(CATEGORY_LABEL[project.category])}
        </div>
        <E
          path={`projects.${index}.name`}
          as="h3"
          className="balance mt-1 text-[18px] font-bold text-[color:var(--color-navy)]"
        />
        <E
          path={`projects.${index}.tagline`}
          as="p"
          multiline
          className="pretty mt-2 text-[14px] leading-relaxed text-[color:var(--color-ink)]/78"
        />
        <E
          path={`projects.${index}.summary`}
          as="p"
          multiline
          className="pretty mt-2 line-clamp-3 text-[13px] leading-relaxed text-[color:var(--color-muted)]"
        />
        <TechRow tech={project.tech} />
        <div className="mt-auto">
          <Actions project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const { content, lang, editing, t } = useStore();
  const [cat, setCat] = useState<"all" | CategoryKey>("all");
  const [query, setQuery] = useState("");
  const [shot, setShot] = useState<number | null>(null);

  const list = useMemo(
    () =>
      content.projects
        .filter((project) => project.visible || editing)
        .filter((project) => cat === "all" || project.category === cat)
        .filter((project) => matches(project, query, lang)),
    [content.projects, cat, query, lang, editing],
  );

  const shots: LightboxItem[] = useMemo(
    () =>
      list
        .filter((project) => project.image)
        .map((project) => ({
          src: project.image,
          title: project.name[lang],
          note: project.tagline[lang],
          fit: project.imageFit,
          tone: project.tone,
        })),
    [list, lang],
  );

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="work">
      <div className="wrap">
        <SectionHead index="04" eyebrow="WORK" titlePath="labels.work" subPath="labels.workSub" />

        <div className="reveal mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATS.map((key) => {
              const active = cat === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCat(key)}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                    active
                      ? "border-transparent bg-[color:var(--color-navy)] text-white shadow-sm"
                      : "border-[color:var(--color-line)] bg-white/80 text-[color:var(--color-navy)]/80 hover:border-[color:var(--color-brand)]/50"
                  }`}
                >
                  {key === "all" ? t("filterAll") : t(CATEGORY_LABEL[key])}
                </button>
              );
            })}
          </div>

          <label className="relative flex items-center md:w-72">
            <span className="pointer-events-none absolute start-3 text-[color:var(--color-muted)]">
              <Icon name="search" size={16} />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchProjects")}
              aria-label={t("searchProjects")}
              className="panel-field ps-10"
              type="search"
            />
          </label>
        </div>

        <div className="mt-7 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <Card
              key={project.slug + project.name.en}
              project={project}
              onOpen={
                project.image
                  ? () => {
                      const position = shots.findIndex((item) => item.src === project.image);
                      setShot(position < 0 ? null : position);
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {!list.length ? (
          <p className="mt-8 text-center text-[14px] text-[color:var(--color-muted)]">{t("noResults")}</p>
        ) : null}
      </div>

      <Lightbox items={shots} index={shot} onClose={() => setShot(null)} onIndex={setShot} />
    </section>
  );
}
