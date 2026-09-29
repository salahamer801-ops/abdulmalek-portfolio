import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { Stage3D } from "./Interactive";
import { SectionHead } from "./common";

/* ------------------------------------------------------------------ */
/* small animated pieces used inside the demo screens                  */
/* ------------------------------------------------------------------ */

/** Counts a number up whenever it is mounted, so each demo screen plays once. */
function CountUp({ to, duration = 1200, className = "" }: { to: number; duration?: number; className?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return <span className={className}>{value.toLocaleString("en-US")}</span>;
}

function Bars({ values }: { values: number[] }) {
  return (
    <div className="flex h-[64px] items-end gap-1.5">
      {values.map((value, index) => (
        <span
          key={index}
          className="screen-bar"
          style={{ height: `${value}%`, animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  );
}

function Sparkline() {
  const points = "0,44 22,38 44,42 66,26 88,30 110,18 132,22 154,10";
  return (
    <svg viewBox="0 0 154 52" className="h-[52px] w-full" aria-hidden="true">
      <polyline className="screen-line" points={points} />
      <polyline className="screen-line-fill" points={`${points} 154,52 0,52`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* one demo screen per tour step                                       */
/* ------------------------------------------------------------------ */

function ScreenUi() {
  const { t } = useStore();
  const rows = [
    { label: t("screenSales"), value: 24500, tone: "#16a34a" },
    { label: t("screenExpenses"), value: 8120, tone: "#d97706" },
    { label: t("screenCollected"), value: 16200, tone: "#2aa3e0" },
    { label: t("screenNet"), value: 13180, tone: "#123a76" },
  ];
  return (
    <div className="relative h-full p-3.5">
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row, index) => (
          <div key={row.label} className="screen-pop rounded-xl bg-white p-2.5 shadow-sm" style={{ animationDelay: `${index * 160}ms` }}>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[color:var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.tone }} />
              {row.label}
            </div>
            <div className="mono mt-1 text-[15px] font-bold text-[color:var(--color-navy)]">
              <CountUp to={row.value} duration={900 + index * 160} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        {[0, 1, 2].map((index) => (
          <div key={index} className="screen-row flex items-center gap-2 rounded-lg bg-white/85 px-2.5 py-1.5" style={{ animationDelay: `${700 + index * 180}ms` }}>
            <span className="h-6 w-6 shrink-0 rounded-lg bg-[color:var(--color-brand-soft)]" />
            <span className="h-2 flex-1 rounded-full bg-[color:var(--color-line)]" />
            <span className="mono text-[10.5px] font-bold text-[color:var(--color-navy)]/70">{(index + 1) * 420}</span>
          </div>
        ))}
      </div>
      <span className="screen-cursor" aria-hidden="true" />
      <span className="screen-toast" aria-hidden="true">
        <Icon name="check" size={12} />
        {t("screenSaved")}
      </span>
    </div>
  );
}

function ScreenData() {
  const { t } = useStore();
  const json = [
    'GET /api/farms/3/summary',
    '{ "sales": 24500,',
    '  "expenses": 8120,',
    '  "debts": 3400,',
    '  "collected": 16200 }',
  ];
  return (
    <div className="grid h-full grid-cols-[1.1fr_.9fr] gap-2 p-3.5">
      <div className="overflow-hidden rounded-xl bg-white p-2.5 shadow-sm">
        <div className="mb-2 text-[10.5px] font-bold text-[color:var(--color-navy)]">{t("screenRows")}</div>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="screen-row flex items-center gap-2 border-b border-[color:var(--color-line)]/70 py-1.5 last:border-0" style={{ animationDelay: `${index * 150}ms` }}>
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
            <span className="h-2 flex-1 rounded-full bg-[color:var(--color-line)]" />
            <span className="mono text-[10px] font-semibold text-[color:var(--color-muted)]">{(index + 1) * 250}</span>
          </div>
        ))}
      </div>
      <div className="screen-json rounded-xl bg-[color:var(--color-navy)] p-2.5 font-mono text-[10px] leading-relaxed text-white/90" dir="ltr">
        {json.map((line, index) => (
          <div key={line} className="screen-row" style={{ animationDelay: `${200 + index * 220}ms` }}>
            {line}
          </div>
        ))}
        <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9.5px] text-white">
          <span className="dot-live" />
          {t("screenWriting")}
        </div>
      </div>
    </div>
  );
}

function ScreenCharts() {
  const { t } = useStore();
  return (
    <div className="h-full p-3.5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: t("screenSales"), value: 24500 },
          { label: t("screenCollected"), value: 16200 },
          { label: t("screenNet"), value: 13180 },
        ].map((item, index) => (
          <div key={item.label} className="screen-pop rounded-xl bg-white p-2.5 text-center shadow-sm" style={{ animationDelay: `${index * 140}ms` }}>
            <div className="text-[9.5px] font-semibold text-[color:var(--color-muted)]">{item.label}</div>
            <div className="mono text-[13.5px] font-bold text-[color:var(--color-navy)]">
              <CountUp to={item.value} duration={1000 + index * 200} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.15fr_.85fr] gap-2">
        <div className="rounded-xl bg-white p-2.5 shadow-sm">
          <Sparkline />
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-sm">
          <Bars values={[38, 62, 46, 78, 54, 86]} />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--color-line)]">
          <span className="screen-fill block h-full rounded-full bg-[color:var(--color-brand)]" />
        </span>
        <span className="mono text-[10px] font-semibold text-[color:var(--color-muted)]">86%</span>
      </div>
    </div>
  );
}

function ScreenOps() {
  const { t } = useStore();
  const tasks = [t("screenBackup"), t("screenCollected"), t("screenRows")];
  return (
    <div className="h-full space-y-2 p-3.5">
      {tasks.map((task, index) => (
        <div key={task} className="screen-row flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm" style={{ animationDelay: `${index * 220}ms` }}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-deep)]">
            <Icon name={index === 0 ? "download" : index === 1 ? "check" : "layers"} size={14} />
          </span>
          <span className="flex-1 text-[11.5px] font-semibold text-[color:var(--color-navy)]">{task}</span>
          <span className="screen-pill">{t("screenSaved")}</span>
        </div>
      ))}
      <div className="rounded-xl bg-white p-2.5 shadow-sm">
        <div className="flex items-center justify-between text-[10px] font-semibold text-[color:var(--color-muted)]">
          <span>{t("screenTasks")}</span>
          <span className="mono">3 / 4</span>
        </div>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[color:var(--color-line)]">
          <span className="screen-fill block h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand),var(--color-violet))]" />
        </span>
      </div>
    </div>
  );
}

const SCREENS = [ScreenUi, ScreenData, ScreenCharts, ScreenOps];

/* ------------------------------------------------------------------ */
/* the live tour                                                       */
/* ------------------------------------------------------------------ */

const LAYER_KEYS = ["layerUi", "layerLogic", "layerApi", "layerDb", "layerReports"] as const;
const LAYER_TONES = ["#2aa3e0", "#7c3aed", "#0891b2", "#123a76", "#16a34a"];

export function Tour() {
  const { t, content, lang } = useStore();
  const steps = content.tour ?? [];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useRef(true);
  const total = Math.max(1, steps.length);

  /* auto play, but never while the section is off screen or the tab is hidden */
  useEffect(() => {
    const node = sectionRef.current;
    if (node && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          inView.current = entries.some((entry) => entry.isIntersecting);
        },
        { threshold: 0.25 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (!playing || content.settings.motion === "off") return;
    const timer = window.setInterval(() => {
      if (!inView.current || document.hidden) return;
      setActive((current) => (current + 1) % total);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [playing, total, content.settings.motion]);

  const step = steps[active] ?? steps[0];
  const Screen = SCREENS[active % SCREENS.length];

  return (
    <section ref={sectionRef} className="section border-t border-[color:var(--color-line)]/60" id="tour">
      <div className="wrap">
        <SectionHead index="01" eyebrow="LIVE DEMO" titlePath="labels.tour" subPath="labels.tourSub" />

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.06fr_.94fr]">
          {/* the screen that plays by itself */}
          <div className="reveal">
            <div className="device-frame">
              <div className="device-bar">
                <span className="device-dot" />
                <span className="device-dot" />
                <span className="device-dot" />
                <span className="device-url mono" dir="ltr">
                  amer.dev/app
                </span>
                <span className="device-live">
                  <span className="dot-live" />
                  {t("tourLive")}
                </span>
              </div>
              <div className="device-body">
                <div key={active} className="screen-flip h-full">
                  <Screen />
                </div>
                <span className="device-scan" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`${t("tourTitle")} — ${index + 1}`}
                  className={`tour-dot ${index === active ? "is-active" : ""}`}
                >
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  {index === active && playing ? (
                    <span key={`${active}-${playing}`} className="tour-dot-progress" />
                  ) : null}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="btn btn-ghost btn-sm ms-auto"
                aria-pressed={playing}
              >
                <Icon name={playing ? "eyeOff" : "eye"} size={14} />
                {playing ? t("tourPause") : t("tourPlay")}
              </button>
            </div>
          </div>

          {/* the same system, as a 3D stack of its own layers */}
          <div className="reveal">
            <Stage3D max={7}>
              <div className="stack3d">
                {LAYER_KEYS.map((key, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={`layer3d ${isActive ? "is-active" : ""}`}
                      style={{ ["--i" as string]: index, ["--tone" as string]: LAYER_TONES[index] }}
                    >
                      <span className="layer-label">{t(key)}</span>
                    </button>
                  );
                })}
                <span className="stack3d-line" aria-hidden="true" />
                <span className="stack3d-base" aria-hidden="true" />
              </div>
            </Stage3D>
            <div className="mt-3 text-center text-[11.5px] font-semibold text-[color:var(--color-muted)]">
              {t("tourHint")}
            </div>

            {/* the caption of the layer on show */}
            <div key={active} className="screen-flip mt-4 card p-5">
              <div className="flex items-center gap-2">
                <span className="sec-num">{String(active + 1).padStart(2, "0")}</span>
                {step ? (
                  <E
                    path={`tour.${active}.title`}
                    as="h3"
                    className="balance text-[17px] font-bold text-[color:var(--color-navy)]"
                  />
                ) : null}
              </div>
              {step ? (
                <E
                  path={`tour.${active}.text`}
                  as="p"
                  multiline
                  className="pretty mt-2.5 text-[14px] leading-loose text-[color:var(--color-ink)]/78"
                />
              ) : null}
              <div className="mt-3 flex items-center gap-2 text-[11.5px] text-[color:var(--color-muted)]">
                <Icon name="sparkles" size={13} className="text-[color:var(--color-brand)]" />
                {t(LAYER_KEYS[active % LAYER_KEYS.length])}
                {lang === "en" ? " · layer" : " · طبقة"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
