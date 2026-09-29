import { useEffect, useState } from "react";
import { StoreProvider, useStore } from "./store";
import { useHashRoute, useReveal } from "./lib/dom";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { Services } from "./components/Services";
import { Testimonials, Timeline } from "./components/Timeline";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { EditPanel } from "./components/EditPanel";
import { Resume } from "./components/Resume";
import { Icon } from "./components/Icons";
import { Gallery } from "./components/Gallery";
import { Intro } from "./components/Intro";
import { ScrollProgress, TechTicker } from "./components/Motion";
import { Scene3D } from "./components/Scene3D";
import { Tour } from "./components/Tour";

function Shell() {
  const { content, editing, setEditing, t } = useStore();
  const route = useHashRoute();
  const [editorOpen, setEditorOpen] = useState(false);

  useReveal([
    route.name,
    route.slug,
    editing,
    content.projects.length,
    content.tour.length,
    content.skills.length,
    content.services.length,
    content.timeline.length,
    content.strengths.length,
    content.settings.showTimeline,
    content.settings.showStats,
  ]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        const next = !editing;
        setEditing(next);
        setEditorOpen(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, setEditing]);

  return (
    <div className="min-h-screen">
      <Intro />
      <Scene3D />
      <ScrollProgress />
      <Nav onOpenEditor={() => setEditorOpen(true)} />

      <main>
        {route.name === "home" ? (
          <>
            <Hero />
            <Tour />
            <About />
            <Skills />
            <TechTicker />
            <Projects />
            <Services />
            <Timeline />
            <Gallery />
            <Testimonials />
            <Contact />
          </>
        ) : null}

        {route.name === "work" && route.slug ? <ProjectDetail slug={route.slug} /> : null}
        {route.name === "resume" ? <Resume /> : null}
      </main>

      <Footer onOpenEditor={() => setEditorOpen(true)} />

      {editing ? (
        <div className="no-print fixed bottom-4 start-4 z-40 flex items-center gap-2 rounded-2xl border border-[color:var(--color-line)] bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
          <span className="dot-live" />
          <span className="text-[12.5px] font-semibold text-[color:var(--color-navy)]">{t("editHint")}</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditorOpen(true)}>
            <Icon name="sliders" size={14} />
            {t("editToggle")}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditing(false);
              setEditorOpen(false);
            }}
          >
            <Icon name="check" size={14} />
            {t("close")}
          </button>
        </div>
      ) : null}

      <EditPanel open={editorOpen} onClose={() => setEditorOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
