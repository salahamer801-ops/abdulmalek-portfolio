import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { SpotlightFrame, Stage3D } from "./Interactive";
import { Monogram, SectionHead } from "./common";

export function About() {
  const { t, content, lang } = useStore();
  const figure = content.profile.portrait || content.profile.avatar;

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="about">
      <div className="wrap">
        <SectionHead index="02" eyebrow="PROFILE" titlePath="labels.about" />

        <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div className="reveal">
            <E
              path="profile.aboutLead"
              as="p"
              multiline
              className="text-[20px] font-semibold leading-relaxed text-[color:var(--color-navy)] md:text-[25px]"
            />
            <E
              path="profile.about"
              as="p"
              multiline
              className="mt-4 text-[15.5px] leading-loose text-[color:var(--color-ink)]/78"
            />

            {content.settings.showStats ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.stats.map((stat, index) => (
                  <SpotlightFrame
                    key={index}
                    tilt={2.5}
                    className="card p-4"
                    style={{ ["--tone" as string]: "var(--color-brand)" }}
                  >
                    <div className="mono text-[15px] font-bold text-[color:var(--color-brand-deep)]" dir="ltr">
                      {stat.value}
                    </div>
                    <E
                      path={`stats.${index}.label`}
                      as="div"
                      className="mt-1 text-[12.5px] leading-relaxed text-[color:var(--color-muted)]"
                    />
                  </SpotlightFrame>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-3">
            {content.settings.showPortrait ? (
              <Stage3D className="reveal">
                <SpotlightFrame
                  tilt={2.5}
                  className="frame shine block w-full"
                  style={{ ["--tone" as string]: "var(--color-brand)" }}
                >
                  <div
                    className="relative aspect-[2/3] w-full"
                    style={{
                      background:
                        "linear-gradient(158deg, rgba(42,163,224,0.18), rgba(18,58,118,0.12) 58%, rgba(9,24,44,0.30))",
                    }}
                  >
                    {figure ? (
                      <img
                        src={figure}
                        alt={content.profile.name[lang]}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                        <Monogram name={content.profile.name[lang]} size={92} />
                        <div className="text-[12.5px] font-semibold text-[color:var(--color-navy)]">
                          {t("photoSlot")}
                        </div>
                        <div className="max-w-[220px] text-[11.5px] leading-relaxed text-[color:var(--color-muted)]">
                          {t("photoHint")}
                        </div>
                      </div>
                    )}

                    {figure ? (
                      <>
                        <span className="floor3d" aria-hidden="true" />
                        <span className="plane3d" style={{ top: "9%", insetInlineStart: "5%", ["--z" as string]: "78px" }}>
                          <b>◆</b>
                          {t("stageFullstack")}
                        </span>
                        <span
                          className="plane3d"
                          style={{ top: "32%", insetInlineEnd: "5%", ["--z" as string]: "96px", animationDelay: "1.1s" }}
                        >
                          <b>◈</b>
                          {t("stageApi")}
                        </span>
                        <span
                          className="plane3d"
                          style={{ top: "54%", insetInlineStart: "5%", ["--z" as string]: "64px", animationDelay: "2.2s" }}
                        >
                          <b>▣</b>
                          {t("stageRtl")}
                        </span>
                        <span
                          className="plane3d"
                          style={{ bottom: "14%", insetInlineEnd: "5%", ["--z" as string]: "84px", animationDelay: "3.1s" }}
                        >
                          <b>▤</b>
                          {t("stageDb")}
                        </span>
                      </>
                    ) : null}

                    <span className="fc fc-a" aria-hidden="true" />
                    <span className="fc fc-b" aria-hidden="true" />
                    <span className="fc fc-c" aria-hidden="true" />
                    <span className="fc fc-d" aria-hidden="true" />
                  </div>
                  <div className="relative flex items-start gap-3 border-t border-[color:var(--color-line)] px-4 py-3.5">
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ background: "var(--color-navy)" }}
                    >
                      <Icon name="user" size={17} />
                    </span>
                    <div className="min-w-0">
                      <E
                        path="profile.name"
                        as="div"
                        className="text-[14.5px] font-bold text-[color:var(--color-navy)]"
                      />
                      <E
                        path="profile.title"
                        as="div"
                        className="text-[12px] text-[color:var(--color-muted)]"
                      />
                      <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[color:var(--color-brand-deep)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
                        <E path="profile.location" as="span" />
                      </div>
                    </div>
                  </div>
                </SpotlightFrame>
              </Stage3D>
            ) : null}

            <div className="reveal text-[12.5px] font-semibold text-[color:var(--color-muted)]">
              {t("strengthsTitle")}
            </div>
            {content.strengths.map((_, index) => (
              <div key={index} className="reveal card p-4">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: "var(--color-navy)" }}
                  >
                    <Icon name={index === 0 ? "layers" : index === 1 ? "globe" : "gauge"} size={17} />
                  </span>
                  <div>
                    <E
                      path={`strengths.${index}.title`}
                      as="div"
                      className="text-[14.5px] font-bold text-[color:var(--color-navy)]"
                    />
                    <E
                      path={`strengths.${index}.text`}
                      as="p"
                      multiline
                      className="mt-1 text-[13.5px] leading-relaxed text-[color:var(--color-muted)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
