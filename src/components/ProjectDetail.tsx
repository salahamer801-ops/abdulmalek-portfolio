import { useStore } from "../store";
import { CATEGORY_LABEL, STATUS_LABEL } from "../i18n";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { StatusPill } from "./Projects";
import { goTo } from "../lib/dom";

function InfoBlock({
  title,
  bodyPath,
  icon,
}: {
  title: string;
  bodyPath: string;
  icon: string;
}) {
  return (
    <div className="reveal card p-5">
      <div className="mb-2 flex items-center gap-2 text-[13px] font-bold text-[color:var(--color-navy)]">
        <Icon name={icon} size={16} />
        {title}
      </div>
      <E path={bodyPath} as="p" multiline className="text-[14.5px] leading-loose text-[color:var(--color-ink)]/80" />
    </div>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { t, lang, content, editing } = useStore();
  const index = content.projects.findIndex((project) => project.slug === slug);
  const project = content.projects[index];

  if (!project) {
    return (
      <section className="section">
        <div className="wrap text-center">
          <p className="text-[16px] text-[color:var(--color-muted)]">{t("noResults")}</p>
          <button type="button" className="btn btn-ghost mt-5" onClick={() => goTo("")}>
            <Icon name="arrowBack" size={16} />
            {t("backToWork")}
          </button>
        </div>
      </section>
    );
  }

  const related = content.projects
    .filter((item) => item.visible && item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  const mailto = content.profile.email
    ? `mailto:${content.profile.email}?subject=${encodeURIComponent(
        `${lang === "ar" ? "استفسار عن مشروع" : "Question about"}: ${project.name[lang]}`,
      )}`
    : "";

  return (
    <div className="section">
      <div className="wrap">
        <button type="button" className="no-print btn btn-ghost btn-sm" onClick={() => goTo("")}>
          <Icon name="arrowBack" size={15} />
          {t("backToWork")}
        </button>

        <div className="reveal card mt-5 overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[1.05fr_.95fr]">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold text-[color:var(--color-muted)]">
                  {t(CATEGORY_LABEL[project.category])}
                </span>
                <StatusPill status={project.status} />
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-brand-soft)] px-2.5 py-1 text-[11.5px] font-semibold text-[color:var(--color-brand-deep)]">
                    <Icon name="star" size={13} />
                    {t("featured")}
                  </span>
                ) : null}
                {editing ? (
                  <span className="mono text-[11px] text-[color:var(--color-muted)]">
                    {t(STATUS_LABEL[project.status])} · #{project.slug}
                  </span>
                ) : null}
              </div>

              <E
                path={`projects.${index}.name`}
                as="h1"
                className="mt-3 text-[30px] font-bold leading-tight text-[color:var(--color-navy)] md:text-[42px]"
              />
              <E
                path={`projects.${index}.tagline`}
                as="p"
                multiline
                className="mt-3 text-[16px] leading-relaxed text-[color:var(--color-ink)]/80 md:text-[17.5px]"
              />

              <div className="mt-5 rounded-2xl border border-[color:var(--color-line)] bg-white/70 p-4">
                <div className="panel-label">{t("role")}</div>
                <E
                  path={`projects.${index}.role`}
                  as="p"
                  multiline
                  className="mt-1 text-[14px] leading-relaxed text-[color:var(--color-ink)]/80"
                />
              </div>

              <div className="no-print mt-6 flex flex-wrap gap-2">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()}>
                  <Icon name="printer" size={15} />
                  {t("printProject")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (mailto) window.location.href = mailto;
                    else document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Icon name="mail" size={15} />
                  {t("askAbout")}
                </button>
                {project.link ? (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon name="external" size={15} />
                    {t("liveDemo")}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative min-h-[220px] border-t border-[color:var(--color-line)] md:border-s md:border-t-0">
              {project.image ? (
                project.imageFit === "contain" ? (
                  <div
                    className="flex h-full min-h-[220px] items-center justify-center p-5"
                    style={{ background: `linear-gradient(150deg, ${project.tone}1f, rgba(11,42,75,0.06))` }}
                  >
                    <img
                      src={project.image}
                      alt={project.name[lang]}
                      className="max-h-[400px] w-auto max-w-full rounded-2xl object-contain shadow-lg"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.name[lang]}
                    className="h-full max-h-[440px] w-full object-cover"
                    loading="lazy"
                  />
                )
              ) : (
                <div
                  className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3"
                  style={{ background: `linear-gradient(150deg, ${project.tone}26, transparent 70%)` }}
                >
                  <div className="absolute inset-0 grid-bg opacity-60" />
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-3xl text-[32px] font-bold text-white"
                    style={{ background: project.tone }}
                  >
                    {(project.name[lang] || "?").trim().charAt(0)}
                  </div>
                  <p className="relative max-w-[240px] text-center text-[12.5px] leading-relaxed text-[color:var(--color-muted)]">
                    {t("screenshotsSoon")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoBlock title={t("theIdea")} bodyPath={`projects.${index}.idea`} icon="sparkles" />
          <InfoBlock title={t("theGoal")} bodyPath={`projects.${index}.goal`} icon="star" />
        </div>

        <div className="reveal card mt-4 p-5">
          <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-[color:var(--color-navy)]">
            <Icon name="check" size={16} />
            {t("highlights")}
          </div>
          <ul className="grid gap-x-6 gap-y-2.5 md:grid-cols-2">
            {project.features[lang].map((_, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-2.5">
                <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-deep)]">
                  <Icon name="check" size={11} />
                </span>
                <E
                  path={`projects.${index}.features.${lang}.${featureIndex}`}
                  as="span"
                  className="text-[14px] leading-relaxed text-[color:var(--color-ink)]/82"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="reveal card p-5">
            <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-[color:var(--color-navy)]">
              <Icon name="layers" size={16} />
              {t("techStack")}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span key={tech} className="chip mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <InfoBlock title={t("futurePlans")} bodyPath={`projects.${index}.future`} icon="bolt" />
        </div>

        {related.length ? (
          <div className="no-print mt-10">
            <div className="reveal text-[13px] font-bold text-[color:var(--color-navy)]">
              {t("relatedProjects")}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {related.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => goTo(`#/work/${item.slug}`)}
                  className="card p-4 text-start transition hover:-translate-y-0.5"
                >
                  <div className="text-[11.5px] font-semibold text-[color:var(--color-muted)]">
                    {t(CATEGORY_LABEL[item.category])}
                  </div>
                  <div className="mt-1 text-[14.5px] font-bold text-[color:var(--color-navy)]">
                    {item.name[lang]}
                  </div>
                  <div className="mt-1 line-clamp-2 text-[12.5px] text-[color:var(--color-muted)]">
                    {item.tagline[lang]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
