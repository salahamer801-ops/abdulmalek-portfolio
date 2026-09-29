import { useEffect, useState } from "react";

/** Hash routes: "" (home) · "#/work/<slug>" · "#/resume" */
export type Route = { name: "home" | "work" | "resume"; slug?: string };

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "");
  if (!clean) return { name: "home" };
  const [head, tail] = clean.split("/");
  if (head === "work" && tail) return { name: "work", slug: decodeURIComponent(tail) };
  if (head === "resume") return { name: "resume" };
  return { name: "home" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      flashNav();
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

/** A one-shot 3D transition on the content, used for navigation. */
export function flashNav() {
  const root = document.documentElement;
  delete root.dataset.nav;
  window.requestAnimationFrame(() => {
    root.dataset.nav = "1";
    window.setTimeout(() => delete root.dataset.nav, 780);
  });
}

export function goTo(hash: string) {
  if (window.location.hash === hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = hash;
}

/** Adds `.in` to every `.reveal` element as it scrolls into view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!nodes.length) return;
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Yemen local clock (UTC+3). */
export function useYemenClock(): string {
  const [time, setTime] = useState(() => formatYemen(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatYemen(new Date())), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function formatYemen(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Aden",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "--:--";
  }
}
