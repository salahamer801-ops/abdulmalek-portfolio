import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { SpotlightFrame } from "./Interactive";
import { SectionHead } from "./common";

export function Services() {
  const { content } = useStore();

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="services">
      <div className="wrap">
        <SectionHead
          index="05"
          eyebrow="SERVICES"
          titlePath="labels.services"
          subPath="labels.servicesSub"
        />

        <div className="mt-10 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <SpotlightFrame
              key={index}
              tilt={3}
              className="reveal card group p-5"
              style={{ ["--tone" as string]: "var(--color-brand)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{ background: "linear-gradient(140deg, var(--color-brand), var(--color-navy))" }}
                >
                  <Icon name={service.icon} size={20} />
                </span>
                <span className="sec-num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <E
                path={`services.${index}.title`}
                as="h3"
                className="balance mt-4 text-[16px] font-bold text-[color:var(--color-navy)]"
              />
              <E
                path={`services.${index}.text`}
                as="p"
                multiline
                className="pretty mt-2 text-[13.8px] leading-relaxed text-[color:var(--color-muted)]"
              />
            </SpotlightFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
