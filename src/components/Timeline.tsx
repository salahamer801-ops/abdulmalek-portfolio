import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { SpotlightFrame } from "./Interactive";
import { SectionHead } from "./common";

const TONES = ["#2aa3e0", "#7c3aed", "#16a34a"];

export function Timeline() {
  const { content } = useStore();

  if (!content.settings.showTimeline || !content.timeline.length) return null;

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="journey">
      <div className="wrap">
        <SectionHead index="06" eyebrow="JOURNEY" titlePath="labels.timeline" />

        <ol className="relative mt-10 space-y-4 border-s border-dashed border-[color:var(--color-line)] ps-5 md:ps-8">
          {content.timeline.map((_, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <li key={index} className="reveal relative" style={{ ["--tone" as string]: tone }}>
                <span
                  className="absolute -start-[27px] top-5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white md:-start-[37px]"
                  style={{ background: tone, boxShadow: `0 0 0 3px ${tone}22` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <SpotlightFrame
                  tilt={2.5}
                  className="card relative overflow-hidden p-5"
                  style={{ ["--tone" as string]: tone }}
                >
                  <span className="tone-line absolute inset-x-0 top-0 h-[3px]" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <E
                      path={`timeline.${index}.period`}
                      as="span"
                      className="mono rounded-full bg-[color:var(--color-brand-soft)] px-2.5 py-0.5 text-[11.5px] font-semibold text-[color:var(--color-brand-deep)]"
                    />
                    <E
                      path={`timeline.${index}.place`}
                      as="span"
                      className="inline-flex items-center gap-1.5 text-[11.5px] text-[color:var(--color-muted)]"
                    />
                  </div>
                  <E
                    path={`timeline.${index}.role`}
                    as="h3"
                    className="balance mt-2 text-[16.5px] font-bold text-[color:var(--color-navy)]"
                  />
                  <E
                    path={`timeline.${index}.text`}
                    as="p"
                    multiline
                    className="pretty mt-1.5 text-[14px] leading-relaxed text-[color:var(--color-ink)]/78"
                  />
                </SpotlightFrame>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { content } = useStore();
  if (!content.settings.showTestimonials || !content.testimonials.length) return null;

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="testimonials">
      <div className="wrap">
        <SectionHead index="08" eyebrow="TRUST" titlePath="labels.testimonials" />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.testimonials.map((_, index) => (
            <figure key={index} className="reveal card card-hover p-5">
              <Icon name="sparkles" className="text-[color:var(--color-brand)]" size={18} />
              <E
                path={`testimonials.${index}.text`}
                as="blockquote"
                multiline
                className="pretty mt-3 text-[14px] leading-loose text-[color:var(--color-ink)]/82"
              />
              <figcaption className="mt-4 border-t border-[color:var(--color-line)] pt-3">
                <E
                  path={`testimonials.${index}.name`}
                  as="div"
                  className="text-[13.5px] font-bold text-[color:var(--color-navy)]"
                />
                <E
                  path={`testimonials.${index}.role`}
                  as="div"
                  className="text-[12px] text-[color:var(--color-muted)]"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
