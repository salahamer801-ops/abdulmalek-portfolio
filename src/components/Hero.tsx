import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { Monogram } from "./common";
import { TypingRoles } from "./Motion";
import { goTo, useYemenClock } from "../lib/dom";

export function Hero() {
  const { t, lang, content } = useStore();
  const clock = useYemenClock();
  const tech = content.skills.flatMap((group) => group.items).slice(0, 6);
  const roles = content.profile.roles[lang] ?? [];
  const avatar = content.profile.avatar;

  const jump = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f6fafd]" />

      <div className="wrap relative grid items-center gap-10 pb-20 pt-14 md:min-h-[calc(100svh-76px)] md:grid-cols-[1.08fr_.92fr] md:gap-12 md:pb-24 md:pt-20">
        <div className="reveal in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/85 px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--color-navy)] shadow-sm">
            <span className="dot-live" />
            <E path="profile.availability" as="span" />
          </div>

          <E
            path="profile.name"
            as="h1"
            className="head-grad balance lead-tight text-[36px] font-bold md:text-[62px]"
          />
          <span
            className="mt-4 block h-[3px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-brand), var(--color-violet), transparent)" }}
            aria-hidden="true"
          />

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <E
              path="profile.title"
              as="p"
              className="text-[18px] font-semibold text-[color:var(--color-brand-deep)] md:text-[22px]"
            />
            <span className="hidden h-4 w-px bg-[color:var(--color-line)] md:block" />
            <E path="profile.subtitle" as="p" className="mono text-[12.5px] text-[color:var(--color-muted)]" />
          </div>

          <p className="pretty mt-3 min-h-[30px] text-[16px] md:text-[19px]">
            <span className="text-[color:var(--color-muted)]">{t("heroLead")} </span>
            <TypingRoles roles={roles} className="font-semibold text-[color:var(--color-navy)]" />
          </p>

          <E
            path="profile.tagline"
            as="p"
            multiline
            className="pretty mt-5 max-w-xl text-[16px] leading-relaxed text-[color:var(--color-ink)]/80 md:text-[17.5px]"
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={() => jump("#work")}>
              <Icon name="layers" size={17} />
              {t("heroCtaWork")}
            </button>
            {content.settings.showResume ? (
              <button type="button" className="btn btn-ghost" onClick={() => goTo("#/resume")}>
                <Icon name="download" size={17} />
                {t("heroCtaResume")}
              </button>
            ) : null}
            <button type="button" className="btn btn-ghost" onClick={() => jump("#contact")}>
              <Icon name="mail" size={17} />
              {t("heroCtaContact")}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--color-line)] pt-5 text-[13px] text-[color:var(--color-muted)]">
            <span className="inline-flex items-center gap-2">
              <Icon name="globe" size={15} />
              <E path="profile.location" as="span" />
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="bolt" size={15} />
              {t("handshake")}
            </span>
            <span className="mono inline-flex items-center gap-2" dir="ltr">
              <Icon name="wave" size={15} />
              web · api · db
            </span>
          </div>
        </div>

        <div className="reveal in">
          <div className="card card-hover relative overflow-hidden p-5 md:p-6">
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: "linear-gradient(90deg, var(--color-brand), #7c3aed, transparent)" }}
            />
            <div className="feat-glow pointer-events-none absolute inset-0 opacity-70" />

            <div className="relative flex items-center gap-3">
              {avatar ? (
                <img
                  src={avatar}
                  alt={content.profile.name[lang]}
                  className="h-12 w-12 rounded-2xl object-cover"
                  loading="lazy"
                />
              ) : (
                <Monogram name={content.profile.name[lang]} size={48} />
              )}
              <div className="leading-tight">
                <E
                  path="profile.name"
                  as="div"
                  className="text-[14.5px] font-bold text-[color:var(--color-navy)]"
                />
                <E path="profile.title" as="div" className="text-[12px] text-[color:var(--color-muted)]" />
              </div>
              <div className="ms-auto flex items-center gap-3">
                <span className="eq" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                    <span
                      key={bar}
                      style={{ animationDelay: `${bar * 0.14}s` }}
                      className={bar % 2 === 0 ? "h-[70%]" : "h-full"}
                    />
                  ))}
                </span>
              </div>
            </div>

            <div className="relative my-4 hairline" />

            <dl className="relative space-y-2.5 text-[13px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-[color:var(--color-muted)]">
                  <Icon name="bolt" size={15} />
                  {t("systemOnline")}
                </dt>
                <dd className="inline-flex items-center gap-2 font-semibold text-[#15803d]">
                  <span className="dot-live" />
                  OK
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-[color:var(--color-muted)]">
                  <Icon name="clock" size={15} />
                  {t("localTime")}
                </dt>
                <dd className="tnum mono font-semibold text-[color:var(--color-navy)]" dir="ltr">
                  {clock} +03
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="inline-flex items-center gap-2 text-[color:var(--color-muted)]">
                  <Icon name="layers" size={15} />
                  {t("projectsBuilt")}
                </dt>
                <dd className="tnum mono font-semibold text-[color:var(--color-navy)]" dir="ltr">
                  {content.projects.filter((project) => project.visible).length}
                </dd>
              </div>
            </dl>

            <div className="relative my-4 hairline" />

            <div className="mono relative text-[11.5px] text-[color:var(--color-muted)]" dir="ltr">
              <span className="text-[color:var(--color-brand-deep)]">›</span> stack: web · api · db
            </div>
            <div className="relative mt-3 flex flex-wrap gap-1.5">
              {tech.map((item) => (
                <span key={item} className="chip mono">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center md:flex">
        <span className="mono flex flex-col items-center text-[10.5px] tracking-[0.16em] text-[color:var(--color-muted)]">
          {t("scrollCue")}
          <span className="cue-line" aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
