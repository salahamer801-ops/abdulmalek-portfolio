import { useStore } from "../store";
import { CATEGORY_LABEL } from "../i18n";
import { Icon } from "./Icons";
import { E } from "./Editable";
import { goTo } from "../lib/dom";

export function Resume() {
  const { t, lang, content } = useStore();
  const { profile, projects, skills, timeline, stats } = content;

  const contactBits = [
    profile.email,
    profile.whatsapp ? `${lang === "ar" ? "واتساب" : "WhatsApp"}: ${profile.whatsapp}` : "",
    profile.linkedin ? profile.linkedin.replace(/^https?:\/\/(www\.)?/, "") : "",
    profile.location[lang],
  ].filter(Boolean);

  return (
    <div className="section">
      <div className="wrap max-w-4xl">
        <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => goTo("")}>
            <Icon name="arrowBack" size={15} />
            {t("backToWork")}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>
            <Icon name="printer" size={15} />
            {t("printCv")}
          </button>
        </div>

        <article className="card print-plain p-6 md:p-9">
          <header className="flex items-start gap-5 border-b border-[color:var(--color-line)] pb-5">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name[lang]}
                className="print-photo h-[92px] w-[92px] shrink-0 rounded-2xl object-cover"
              />
            ) : null}
            <div className="min-w-0">
              <E
                path="profile.name"
                as="h1"
                className="text-[26px] font-bold text-[color:var(--color-navy)] md:text-[32px]"
              />
              <E
                path="profile.title"
                as="p"
                className="mt-1 text-[15px] font-semibold text-[color:var(--color-brand-deep)]"
              />
              <p className="mono mt-2 text-[12px] leading-relaxed text-[color:var(--color-muted)]" dir="ltr">
                {contactBits.join("  ·  ")}
              </p>
            </div>
          </header>

          <section className="mt-5">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-[color:var(--color-navy)]">
              {t("summary")}
            </h2>
            <E
              path="profile.about"
              as="p"
              multiline
              className="mt-2 text-[14px] leading-loose text-[color:var(--color-ink)]/82"
            />
          </section>

          {stats.length ? (
            <section className="mt-5">
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="mono text-[14px] font-bold text-[color:var(--color-brand-deep)]" dir="ltr">
                      {stat.value}
                    </div>
                    <div className="text-[12px] text-[color:var(--color-muted)]">{stat.label[lang]}</div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-[color:var(--color-navy)]">
              {t("skillsTitle")}
            </h2>
            <div className="mt-2 space-y-2">
              {skills.map((group, index) => (
                <div key={index} className="text-[13.5px] leading-relaxed">
                  <span className="font-semibold text-[color:var(--color-navy)]">{group.title[lang]}: </span>
                  <span className="text-[color:var(--color-ink)]/80">{group.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-[color:var(--color-navy)]">
              {t("keyProjects")}
            </h2>
            <div className="mt-3 space-y-3">
              {projects
                .filter((project) => project.visible)
                .map((project, index) => (
                  <div key={project.slug} className="border-s-2 border-[color:var(--color-brand)]/40 ps-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14.5px] font-bold text-[color:var(--color-navy)]">
                        {project.name[lang]}
                      </span>
                      <span className="text-[11.5px] text-[color:var(--color-muted)]">
                        {t(CATEGORY_LABEL[project.category])}
                      </span>
                    </div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[color:var(--color-ink)]/80">
                      {project.tagline[lang]}
                    </p>
                    {project.tech.length ? (
                      <p className="mono mt-1 text-[11.5px] text-[color:var(--color-muted)]" dir="ltr">
                        {project.tech.slice(0, 8).join(" · ")}
                      </p>
                    ) : null}
                    {index === 0 && project.features[lang].length ? (
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[color:var(--color-ink)]/75">
                        {project.features[lang].slice(0, 6).join(" · ")}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-[color:var(--color-navy)]">
              {t("navTimeline")}
            </h2>
            <div className="mt-3 space-y-3">
              {timeline.map((item, index) => (
                <div key={index} className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
                  <span className="mono min-w-[110px] text-[12px] text-[color:var(--color-muted)]">
                    {item.period[lang]}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-[color:var(--color-navy)]">{item.role[lang]}</div>
                    <div className="text-[12.5px] text-[color:var(--color-muted)]">{item.place[lang]}</div>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[color:var(--color-ink)]/78">
                      {item.text[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-[color:var(--color-navy)]">
              {t("languagesLabel")}
            </h2>
            <div className="mt-2 space-y-1 text-[13.5px] text-[color:var(--color-ink)]/80">
              <div>{t("arabicNative")}</div>
              <div>{t("englishPro")}</div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
