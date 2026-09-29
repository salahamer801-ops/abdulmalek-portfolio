import { useEffect, useState } from "react";
import { useStore } from "../store";
import { Monogram } from "./common";

const KEY = "amer.intro.seen";

/** A short opening curtain — once per session, skippable, and off when motion is reduced. */
export function Intro() {
  const { content, lang, t } = useStore();
  const [phase, setPhase] = useState<"run" | "out" | "done">(() => {
    if (typeof window === "undefined") return "done";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (content.settings.motion === "off" || reduced) return "done";
    try {
      if (window.sessionStorage.getItem(KEY) === "1") return "done";
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      return "done";
    }
    return "run";
  });

  useEffect(() => {
    if (phase === "run") {
      const id = window.setTimeout(() => setPhase("out"), 1150);
      return () => window.clearTimeout(id);
    }
    if (phase === "out") {
      const id = window.setTimeout(() => setPhase("done"), 470);
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const skip = () => setPhase("out");
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`intro no-print ${phase === "out" ? "is-out" : ""}`}
      onClick={() => setPhase("out")}
      role="presentation"
    >
      <span className="intro-glow" aria-hidden="true" />
      <div className="intro-inner">
        <Monogram name={content.profile.name[lang]} size={58} />
        <div className="intro-name">{content.profile.name[lang]}</div>
        <div className="intro-role mono">{content.profile.title[lang]}</div>
        <div className="intro-bar" aria-hidden="true">
          <span />
        </div>
        <div className="intro-foot">
          <span className="mono">{t("loadingLabel")}</span>
          <button
            type="button"
            className="intro-skip mono"
            onClick={(event) => {
              event.stopPropagation();
              setPhase("out");
            }}
          >
            {t("skipIntro")}
          </button>
        </div>
      </div>
    </div>
  );
}
