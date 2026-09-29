import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../store";

function rgba(hex: string, alpha: number): string {
  const clean = (hex || "#2aa3e0").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full || "2aa3e0", 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Slow drifting node field — the "live system" behind the page. */
export function NodeField() {
  const { content } = useStore();
  const motion = content.settings.motion;
  const accent = content.settings.accent;
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = motion !== "off" && !reduced;
    const count = motion === "soft" ? 16 : 30;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = 0;
    let height = 0;
    let raf = 0;

    const nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
      r: 0.9 + Math.random() * 1.5,
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => ({ x: node.x * width, y: node.y * height, r: node.r }));

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance < 190) {
            ctx.strokeStyle = rgba(accent, 0.13 * (1 - distance / 190));
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point) => {
        ctx.fillStyle = rgba(accent, 0.42);
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const step = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0.02 || node.x > 0.98) node.vx *= -1;
        if (node.y < 0.02 || node.y > 0.98) node.vy *= -1;
      });
      draw();
      raf = window.requestAnimationFrame(step);
    };

    resize();
    draw();
    if (animate) raf = window.requestAnimationFrame(step);

    const onResize = () => {
      resize();
      if (!animate) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
    };
  }, [motion, accent]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="progress-bar no-print"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

/** Cycles through the roles, typing them out — off when motion is disabled. */
export function TypingRoles({ roles, className }: { roles: string[]; className?: string }) {
  const { content } = useStore();
  const motion = content.settings.motion;
  const list = roles.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(list[0] ?? "");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");

  useEffect(() => {
    if (motion === "off" || list.length < 2) {
      setText(list[0] ?? "");
      setPhase("holding");
      return;
    }
    const target = list[index % list.length] ?? "";

    if (phase === "typing") {
      if (text.length < target.length) {
        const id = window.setTimeout(() => setText(target.slice(0, text.length + 1)), 62);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => setPhase("erasing"), 1900);
      return () => window.clearTimeout(id);
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        const id = window.setTimeout(() => setText(target.slice(0, text.length - 1)), 26);
        return () => window.clearTimeout(id);
      }
      setIndex((value) => value + 1);
      setPhase("typing");
      return;
    }

    const id = window.setTimeout(() => setPhase("erasing"), 1900);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase, index, motion, roles.join("|")]);

  return (
    <span className={className}>
      {text}
      {motion === "off" ? null : <span className="caret" />}
    </span>
  );
}

/** Endless strip of the tools and technologies, as a thin technical band. */
export function TechTicker() {
  const { content } = useStore();
  const items = useMemo(() => content.skills.flatMap((group) => group.items), [content.skills]);
  if (!items.length) return null;
  const row = [...items, ...items];

  return (
    <div className="no-print border-y border-[color:var(--color-line)] bg-white/60 py-4 backdrop-blur">
      <div className="marquee-mask overflow-hidden" dir="ltr">
        <div className="marquee-track items-center gap-7">
          {row.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mono flex shrink-0 items-center gap-3 whitespace-nowrap text-[12.5px] text-[color:var(--color-navy)]/75"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-[color:var(--color-brand)]/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
