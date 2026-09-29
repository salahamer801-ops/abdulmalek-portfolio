import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useStore } from "../store";
import { Icon } from "./Icons";

/**
 * A 3D exhibit stage: the content inside leans with the pointer, so layered
 * pieces at different depths read as a real object. Off for touch / reduced motion.
 */
export function Stage3D({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { content } = useStore();
  const ref = useRef<HTMLDivElement | null>(null);
  const allowed = content.settings.motion !== "off";

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || !allowed || event.pointerType === "touch") return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--sy", `${(x - 0.5) * max * 2}deg`);
    element.style.setProperty("--sx", `${6 + (0.5 - y) * max}deg`);
  };

  const leave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--sy", "0deg");
    element.style.setProperty("--sx", "6deg");
  };

  return (
    <div className={`scene3d ${className}`}>
      <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="stage3d">
        {children}
      </div>
    </div>
  );
}

/**
 * A frame whose light follows the cursor, with an optional soft 3D tilt.
 * Turns itself off for touch input and when motion is reduced.
 */
export function SpotlightFrame({
  children,
  className = "",
  tilt = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  style?: CSSProperties;
}) {
  const { content } = useStore();
  const ref = useRef<HTMLDivElement | null>(null);
  const allowed = content.settings.motion !== "off";

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || !allowed || event.pointerType === "touch") return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
    if (tilt) {
      element.style.setProperty("--rx", `${(0.5 - y) * tilt * 2}deg`);
      element.style.setProperty("--ry", `${(x - 0.5) * tilt * 2}deg`);
    }
  };

  const leave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "0%");
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`spot ${tilt ? "spot-tilt" : ""} ${className}`}
      style={style}
    >
      <span className="spot-light" aria-hidden="true" />
      {children}
    </div>
  );
}

export type LightboxItem = {
  src: string;
  title: string;
  note?: string;
  fit?: "cover" | "contain";
  tone?: string;
};

/** Full-screen interactive viewer: arrows, keyboard, thumbnails, hover zoom. */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const { t, lang } = useStore();
  const [zoomed, setZoomed] = useState(false);
  const open = index !== null && items.length > 0;
  const prevIcon = lang === "ar" ? "arrowBack" : "arrow";
  const nextIcon = lang === "ar" ? "arrow" : "arrowBack";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (items.length > 1 && event.key === "ArrowRight") onIndex(((index ?? 0) + 1) % items.length);
      if (items.length > 1) {
        if (event.key === "ArrowLeft") onIndex(((index ?? 0) - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onIndex]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setZoomed(false);
  }, [index]);

  if (!open) return null;
  const item = items[index as number];

  return (
    <div
      className="lightbox no-print"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div className="lightbox-bar" onClick={(event) => event.stopPropagation()}>
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold text-white">{item.title}</div>
          {item.note ? <div className="truncate text-[12px] text-white/60">{item.note}</div> : null}
        </div>
        <div className="flex items-center gap-2">
          <span className="mono text-[12px] text-white/55" dir="ltr">
            {(index as number) + 1} / {items.length}
          </span>
          <button
            type="button"
            className="lightbox-btn"
            aria-label={t("close")}
            onClick={onClose}
          >
            <Icon name="close" size={18} />
          </button>
        </div>
      </div>

      <div className="lightbox-stage" onClick={(event) => event.stopPropagation()}>
        {items.length > 1 ? (
          <button
            type="button"
            className="lightbox-nav start-2"
            aria-label={t("previous")}
            onClick={() => onIndex(((index as number) - 1 + items.length) % items.length)}
          >
            <Icon name={prevIcon} size={20} />
          </button>
        ) : null}

        <div
          className={`lightbox-canvas ${zoomed ? "is-zoomed" : ""} ${
            item.fit === "contain" ? "is-contain" : ""
          }`}
          style={item.tone ? { background: `radial-gradient(60% 60% at 50% 40%, ${item.tone}33, transparent 70%)` } : undefined}
          onClick={() => setZoomed((value) => !value)}
        >
          <img src={item.src} alt={item.title} className="lightbox-img" />
          <span className="lightbox-hint mono">{zoomed ? t("zoomOut") : t("zoomIn")}</span>
        </div>

        {items.length > 1 ? (
          <button
            type="button"
            className="lightbox-nav end-2"
            aria-label={t("next")}
            onClick={() => onIndex(((index as number) + 1) % items.length)}
          >
            <Icon name={nextIcon} size={20} />
          </button>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="lightbox-strip" onClick={(event) => event.stopPropagation()}>
          {items.map((thumb, thumbIndex) => (
            <button
              key={`${thumb.src}-${thumbIndex}`}
              type="button"
              aria-label={thumb.title}
              onClick={() => onIndex(thumbIndex)}
              className={`lightbox-thumb ${thumbIndex === index ? "is-active" : ""}`}
            >
              <img src={thumb.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
