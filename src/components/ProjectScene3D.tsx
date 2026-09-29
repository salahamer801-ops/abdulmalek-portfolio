import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import type { Project } from "../content/types";

type ThreeNS = typeof import("three");

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** A small glass chip carrying one technology name. */
function chipTexture(THREE: ThreeNS, text: string, tone: string) {
  const canvas = document.createElement("canvas");
  const W = 512;
  const H = 128;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  roundRect(ctx, 8, 8, W - 16, H - 16, 56);
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = tone;
  ctx.globalAlpha = 0.75;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#1b2a46";
  ctx.font = "600 54px 'IBM Plex Sans Arabic', system-ui, 'Segoe UI', Tahoma, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.length > 16 ? `${text.slice(0, 15)}…` : text, W / 2, H / 2 + 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Every category gets its own wireframe object, so each project page feels different. */
function categoryGeometry(THREE: ThreeNS, category: Project["category"]) {
  switch (category) {
    case "ops":
      return new THREE.TorusKnotGeometry(1.5, 0.32, 96, 12, 2, 3);
    case "agri":
      return new THREE.TorusGeometry(1.8, 0.3, 10, 64);
    case "pm":
      return new THREE.BoxGeometry(2.1, 1.6, 1.6, 3, 3, 3);
    default:
      return new THREE.IcosahedronGeometry(1.75, 1);
  }
}

/* ------------------------------------------------------------------ */
/* the scene                                                           */
/* ------------------------------------------------------------------ */

type SceneOptions = {
  image: string;
  tone: string;
  chips: string[];
  category: Project["category"];
  portrait: boolean;
};

function start(THREE: ThreeNS, canvas: HTMLCanvasElement, options: SceneOptions) {
  const parent = canvas.parentElement as HTMLElement;
  const tone = new THREE.Color(options.tone || "#2aa3e0");
  const wide = window.innerWidth >= 900;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: wide });
  renderer.setClearAlpha(0);
  let pixelRatio = Math.min(window.devicePixelRatio || 1, wide ? 1.35 : 1.2);
  renderer.setPixelRatio(pixelRatio);

  let width = Math.max(320, parent.clientWidth);
  let height = Math.max(240, parent.clientHeight);
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf6fafd, 0.075);

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 60);
  const isWide = width / height > 1.15;
  let baseZ = isWide ? 7.3 : 9.6;
  camera.position.set(0, 0.15, baseZ);

  const world = new THREE.Group();
  scene.add(world);
  const disposables: Array<{ dispose: () => void }> = [];

  /* --- the project's own image, floating as a 3D card --- */
  const cardGroup = new THREE.Group();
  world.add(cardGroup);

  const cardH = options.portrait ? 2.9 : 2.35;
  let cardW = options.portrait ? 1.6 : 3.5;

  const backingMat = new THREE.MeshBasicMaterial({ color: tone, transparent: true, opacity: 0.16 });
  const backing = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), backingMat);
  backing.position.z = -0.04;
  cardGroup.add(backing);

  const cardMat = new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false });
  const card = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), cardMat);
  cardGroup.add(card);

  const frameMat = new THREE.LineBasicMaterial({ color: tone, transparent: true, opacity: 0.55 });
  const frameGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1));
  const frame = new THREE.LineSegments(frameGeo, frameMat);
  cardGroup.add(frame);

  const fitCard = (w: number, h: number) => {
    card.geometry.dispose();
    card.geometry = new THREE.PlaneGeometry(w, h);
    backing.geometry.dispose();
    backing.geometry = new THREE.PlaneGeometry(w + 0.09, h + 0.09);
    frame.geometry.dispose();
    frame.geometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(w + 0.02, h + 0.02));
  };
  fitCard(cardW, cardH);
  disposables.push(backingMat, cardMat, frameMat);

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    options.image,
    (loaded) => {
      const image = loaded.image as { width?: number; height?: number } | undefined;
      if (image?.width && image?.height) {
        const ratio = image.width / image.height;
        cardW = Math.min(Math.max(cardH * ratio, 1.1), 4.1);
        fitCard(cardW, cardH);
      }
    },
    undefined,
    () => undefined,
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  cardMat.map = texture;
  cardMat.needsUpdate = true;
  disposables.push(texture, frameGeo);

  /* --- the category object, turning behind the card --- */
  const solid = categoryGeometry(THREE, options.category);
  const wireGeo = new THREE.WireframeGeometry(solid);
  solid.dispose();
  const wireMat = new THREE.LineBasicMaterial({ color: tone, transparent: true, opacity: 0.24 });
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  wire.position.set(0, 0, -1.9);
  wire.scale.setScalar(isWide ? 1.14 : 0.92);
  world.add(wire);
  disposables.push(wireGeo, wireMat);

  const haloGeo = new THREE.TorusGeometry(isWide ? 2.7 : 2.2, 0.008, 3, 140);
  const haloMat = new THREE.MeshBasicMaterial({ color: tone, transparent: true, opacity: 0.38 });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.set(Math.PI / 2.35, 0.2, 0);
  world.add(halo);
  disposables.push(haloGeo, haloMat);

  /* --- the project's technologies, orbiting as chips --- */
  const chipGroup = new THREE.Group();
  world.add(chipGroup);
  const chips: Array<{ mesh: InstanceType<ThreeNS["Mesh"]>; base: number }> = [];
  const chipRadius = isWide ? 3.0 : 2.65;
  options.chips.slice(0, isWide ? 5 : 3).forEach((label, index, list) => {
    const texture2 = chipTexture(THREE, label, options.tone || "#2aa3e0");
    if (!texture2) return;
    const mat = new THREE.MeshBasicMaterial({ map: texture2, transparent: true, depthWrite: false });
    const geo = new THREE.PlaneGeometry(1.18, 0.3);
    const mesh = new THREE.Mesh(geo, mat);
    const angle = (index / Math.max(1, list.length)) * Math.PI * 2;
    const y = Math.sin(index * 2.1) * 1.05;
    mesh.position.set(Math.sin(angle) * chipRadius, y, Math.cos(angle) * chipRadius * 0.5);
    chipGroup.add(mesh);
    chips.push({ mesh, base: y });
    disposables.push(geo, mat, texture2);
  });

  /* --- horizon grid + dust --- */
  const grid = new THREE.GridHelper(26, 26, tone, tone);
  const gridMat = grid.material as InstanceType<ThreeNS["LineBasicMaterial"]> & { opacity: number };
  gridMat.transparent = true;
  gridMat.opacity = 0.13;
  grid.position.y = -2.15;
  world.add(grid);
  disposables.push(gridMat);

  const count = wide ? 220 : 120;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 4.5 + Math.random() * 7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: tone,
    size: 0.07,
    transparent: true,
    opacity: 0.42,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);
  disposables.push(dustGeo, dustMat);

  /* --- input + lifecycle --- */
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = parent.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    pointer.x = Math.max(-1.4, Math.min(1.4, (event.clientX - cx) / (window.innerWidth / 2)));
    pointer.y = Math.max(-1.4, Math.min(1.4, (event.clientY - cy) / (window.innerHeight / 2)));
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          width = Math.max(320, parent.clientWidth);
          height = Math.max(240, parent.clientHeight);
          camera.aspect = width / height;
          const nextWide = width / height > 1.15;
          baseZ = nextWide ? 7.3 : 9.6;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        })
      : null;
  resizeObserver?.observe(parent);

  let inView = true;
  const visibilityObserver =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          (entries) => {
            inView = entries.some((entry) => entry.isIntersecting);
          },
          { threshold: 0.05 },
        )
      : null;
  visibilityObserver?.observe(parent);

  let hidden = false;
  const onVisibility = () => {
    hidden = document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);

  /* --- animation --- */
  const t0 = performance.now();
  const minFrame = 1000 / (wide ? 55 : 34);
  let last = 0;
  let lastPaint = 0;
  let raf = 0;
  let frames = 0;
  let slow = 0;
  let camX = 0;
  let camY = 0.15;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const now = performance.now();
    const time = (now - t0) / 1000;
    const dt = Math.min(time - last, 0.05);
    last = time;
    if (hidden || !inView) return;
    if (now - lastPaint < minFrame) return;
    lastPaint = now;
    const frameStart = now;

    const rect = canvas.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
    );

    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 2.4);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 2.4);

    cardGroup.rotation.y = pointer.sx * 0.26 + Math.sin(time * 0.35) * 0.07;
    cardGroup.rotation.x = -pointer.sy * 0.16;
    cardGroup.position.y = Math.sin(time * 0.6) * 0.07;

    wire.rotation.y += dt * 0.16;
    wire.rotation.x += dt * 0.05;
    halo.rotation.z += dt * 0.22;

    chipGroup.rotation.y -= dt * 0.1;
    chips.forEach((chip, index) => {
      chip.mesh.position.y = chip.base + Math.sin(time * 0.8 + index) * 0.09;
      chip.mesh.rotation.y = -chipGroup.rotation.y;
    });

    dust.rotation.y += dt * 0.02;

    camX += (pointer.sx * 0.6 - camX) * Math.min(1, dt * 2);
    camY += (0.15 - pointer.sy * 0.4 - camY) * Math.min(1, dt * 2);
    camera.position.set(camX, camY, baseZ - (progress - 0.5) * 1.1);
    camera.lookAt(0, 0, 0);

    world.rotation.x = (progress - 0.5) * -0.18;
    world.rotation.y = (progress - 0.5) * 0.4;

    renderer.render(scene, camera);

    frames += 1;
    if (frames > 90 && frames < 250) {
      slow += performance.now() - frameStart;
      if (frames === 250 && slow / 160 > 34) {
        pixelRatio = 1;
        renderer.setPixelRatio(1);
        dustGeo.setDrawRange(0, Math.floor(count / 2));
      }
    }
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibility);
    resizeObserver?.disconnect();
    visibilityObserver?.disconnect();
    disposables.forEach((item) => item.dispose());
    grid.geometry?.dispose();
    renderer.dispose();
  };
}

/* ------------------------------------------------------------------ */
/* react wrapper                                                       */
/* ------------------------------------------------------------------ */

export function ProjectScene3D({ project }: { project: Project }) {
  const { t, lang } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const chips = project.tech.slice(0, 5);
  const signature = `${project.slug}|${project.tone}|${project.category}|${project.imageFit}|${chips.join(",")}|${project.image}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let stop: (() => void) | undefined;

    const boot = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !canvas) return;
        stop = start(THREE, canvas, {
          image: project.image,
          tone: project.tone,
          chips,
          category: project.category,
          portrait: project.imageFit === "contain",
        });
        setReady(true);
      } catch {
        /* no WebGL: the caller keeps the plain screenshot instead */
      }
    };
    void boot();

    return () => {
      disposed = true;
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return (
    <div className="pscene" style={{ ["--tone" as string]: project.tone || "#2aa3e0" }}>
      <span className="pscene-glow" aria-hidden="true" />
      <canvas ref={canvasRef} className="pscene-canvas" aria-hidden="true" />
      {ready ? (
        <span className="pscene-hint">
          {t("projectSceneHint")}
          <span className="pscene-live" aria-hidden="true" />
        </span>
      ) : (
        <img className="pscene-fallback" src={project.image} alt={project.name[lang]} />
      )}
    </div>
  );
}
