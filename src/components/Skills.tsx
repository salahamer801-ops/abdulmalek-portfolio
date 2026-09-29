import { useStore } from "../store";
import { E } from "./Editable";
import { SectionHead } from "./common";

const TONES = ["#2aa3e0", "#7c3aed", "#12305e", "#16a34a", "#d97706", "#0891b2"];

export function Skills() {
  const { content } = useStore();

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="skills">
      <div className="wrap">
        <SectionHead index="03" eyebrow="STACK" titlePath="labels.skills" subPath="labels.skillsSub" />

        <div className="mt-10 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.skills.map((group, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <div
                key={index}
                className="reveal card card-hover relative overflow-hidden p-5"
                style={{ ["--tone" as string]: tone }}
              >
                <span className="tone-line absolute inset-x-0 top-0 h-[3px]" />
                <div className="flex items-center gap-2.5">
                  <span
                    className="tnum mono inline-flex h-6 min-w-6 items-center justify-center rounded-lg px-1.5 text-[11px] font-bold"
                    style={{ background: `${tone}1a`, color: tone }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <E
                    path={`skills.${index}.title`}
                    as="h3"
                    className="balance text-[15.5px] font-bold text-[color:var(--color-navy)]"
                  />
                </div>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {group.items.map((item, itemIndex) => (
                    <span key={`${item}-${itemIndex}`} className="chip mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
