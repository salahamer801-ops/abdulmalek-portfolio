import { useState } from "react";
import { useStore } from "../store";
import { Icon } from "./Icons";
import { SectionHead } from "./common";
import { Lightbox, SpotlightFrame, type LightboxItem } from "./Interactive";

export function Gallery() {
  const { content, lang, t, editing } = useStore();
  const [index, setIndex] = useState<number | null>(null);

  const items = content.gallery.filter((item) => item.visible || editing);
  if (!content.settings.showGallery || !items.length) return null;

  const shots: LightboxItem[] = items.map((item) => ({
    src: item.image,
    title: item.caption[lang],
    note: item.note[lang],
    fit: item.fit,
    tone: item.tone,
  }));

  return (
    <section className="section border-t border-[color:var(--color-line)]/60" id="gallery">
      <div className="wrap">
        <SectionHead
          index="07"
          eyebrow="GALLERY"
          titlePath="labels.gallery"
          subPath="labels.gallerySub"
        />

        <div className="mt-9 grid auto-rows-[186px] gap-4 md:auto-rows-[200px] md:grid-cols-3">
          {items.map((item, itemIndex) => {
            const isHero = itemIndex === 0 && items.length >= 3;
            return (
              <SpotlightFrame
                key={`${item.image}-${itemIndex}`}
                tilt={isHero ? 4 : 2.2}
                className={`frame shine h-full ${isHero ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{ ["--tone" as string]: item.tone }}
              >
                <img
                  src={item.image}
                  alt={item.caption[lang]}
                  loading={itemIndex < 2 ? "eager" : "lazy"}
                  className={`frame-media absolute inset-0 h-full w-full ${
                    item.fit === "contain" ? "object-contain p-7" : "object-cover"
                  }`}
                />

                <span className="fc fc-a" aria-hidden="true" />
                <span className="fc fc-b" aria-hidden="true" />
                <span className="fc fc-c" aria-hidden="true" />
                <span className="fc fc-d" aria-hidden="true" />

                <span className="frame-tag">
                  <Icon name="search" size={12} />
                  {t("zoomIn")}
                </span>

                <div className="frame-cap">
                  <div className="text-[14.5px] font-bold leading-snug">{item.caption[lang]}</div>
                  <div className="mt-0.5 line-clamp-2 text-[12px] text-white/72">{item.note[lang]}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`${t("zoomIn")} — ${item.caption[lang]}`}
                  className="absolute inset-0 z-[5] cursor-zoom-in"
                />
              </SpotlightFrame>
            );
          })}
        </div>
      </div>

      <Lightbox items={shots} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
