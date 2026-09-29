import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { NodeField } from "./Motion";

type Panel = { num: string; label: string };

type ThreeNS = typeof import("three");

/* ------------------------------------------------------------------ */
/* the WebGL scene                                                     */
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

/** A glass card carrying one section's name, drawn to a texture for the 3D space. */
function labelTexture(THREE: ThreeNS, panel: Panel) {
  const canvas = document.createElement("canvas");
  const W = 768;
  const H = 340;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  roundRect(ctx, 12, 12, W - 24, H - 24, 46);
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(1, "rgba(226,240,252,0.88)");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(42,163,224,0.8)";
  ctx.stroke();

  // index badge
  ctx.beginPath();
  ctx.arc(88, 88, 40, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(18,58,118,0.9)";
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px system-ui, 'Segoe UI', Tahoma, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(panel.num, 88, 90);

  // label
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.fillStyle = "#123a76";
  ctx.font = "700 92px 'IBM Plex Sans Arabic', system-ui, 'Segoe UI', Tahoma, sans-serif";
  ctx.fillText(panel.label, W / 2, H / 2 + 34);

  // underline accent
  const ruleW = Math.min(W - 160, panel.label.length * 42);
  ctx.fillStyle = "rgba(42,163,224,0.85)";
  roundRect(ctx, W / 2 - ruleW / 2, H - 92, ruleW, 8, 4);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function start(THREE: ThreeNS, canvas: HTMLCanvasElement, panels: Panel[]) {
  const wide = window.innerWidth >= 900;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: wide,
    powerPreference: "high-performance",
  });
  renderer.setClearAlpha(0);

  const maxDpr = wide ? 1.35 : 1.2;
  let pixelRatio = Math.min(window.devicePixelRatio || 1, maxDpr);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 60);
  const baseZ = wide ? 8.6 : 10.4;
  camera.position.set(0, 0.25, baseZ);

  const world = new THREE.Group();
  scene.add(world);

  const disposables: Array<{ dispose: () => void }> = [];

  /* core: a glass solid with visible edges */
  const coreGeo = new THREE.IcosahedronGeometry(1.45, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x2aa3e0,
    transparent: true,
    opacity: 0.07,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  world.add(core);

  const edgeGeo = new THREE.EdgesGeometry(coreGeo);
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x123a76, transparent: true, opacity: 0.34 });
  const coreEdges = new THREE.LineSegments(edgeGeo, edgeMat);
  world.add(coreEdges);
  disposables.push(coreGeo, coreMat, edgeGeo, edgeMat);

  /* orbit rings */
  const rings: Array<InstanceType<ThreeNS["Mesh"]>> = [];
  const ringTones = [0x2aa3e0, 0x7c3aed, 0x16a34a];
  for (let i = 0; i < 3; i += 1) {
    const geo = new THREE.TorusGeometry(2.15 + i * 0.62, 0.008, 3, 150);
    const mat = new THREE.MeshBasicMaterial({
      color: ringTones[i],
      transparent: true,
      opacity: 0.34 - i * 0.07,
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.set(Math.PI / 2 + i * 0.34, i * 0.5, i * 0.2);
    world.add(ring);
    rings.push(ring);
    disposables.push(geo, mat);
  }

  /* the site's own sections, orbiting as panels */
  const radius = wide ? 6.1 : 4.4;
  const carousel = new THREE.Group();
  carousel.position.z = -1.9;
  world.add(carousel);
  const cards: Array<{ mesh: InstanceType<ThreeNS["Mesh"]>; y: number; mat: InstanceType<ThreeNS["MeshBasicMaterial"]> }> = [];
  const step = (Math.PI * 2) / panels.length;

  panels.forEach((panel, index) => {
    const texture = labelTexture(THREE, panel);
    if (!texture) return;
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const geo = new THREE.PlaneGeometry(1.85, 0.82);
    const mesh = new THREE.Mesh(geo, mat);
    const angle = index * step;
    const y = Math.sin(index * 1.9) * 0.95;
    mesh.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    mesh.lookAt(mesh.position.x * 2, y, mesh.position.z * 2);
    carousel.add(mesh);
    cards.push({ mesh, y, mat });
    disposables.push(geo, mat, texture);
  });

  /* dust */
  const isSmall = !wide;
  const count = Math.min(isSmall ? 300 : 700, Math.max(220, Math.round((window.innerWidth * window.innerHeight) / 4200)));
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 6 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0x123a76,
    size: 0.055,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);
  disposables.push(dustGeo, dustMat);

  /* input: pointer + scroll */
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  const onPointerLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave);

  const onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  window.addEventListener("resize", onResize);

  let hidden = false;
  const onVisibility = () => {
    hidden = document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);

  /* animation */
  const t0 = performance.now();
  const minFrame = 1000 / (wide ? 55 : 34);
  let last = 0;
  let lastPaint = 0;
  let raf = 0;
  let frames = 0;
  let slow = 0;
  let eased = 0;
  let camX = 0;
  let camY = 0.25;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const now = performance.now();
    const time = (now - t0) / 1000;
    const dt = Math.min(time - last, 0.05);
    last = time;
    if (hidden) return;
    /* phones paint fewer frames on purpose: same calm motion, less battery */
    if (now - lastPaint < minFrame) return;
    lastPaint = now;
    const frameStart = now;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    const active = progress * (panels.length - 1);

    eased += (-progress * (panels.length - 1) * step - eased) * Math.min(1, dt * 3.4);
    carousel.rotation.y = eased;

    cards.forEach((card, index) => {
      const near = Math.max(0, 1 - Math.abs(index - active));
      // panels read strongest at the sides, so the middle of the page stays clear for text
      const side = Math.abs(Math.sin(index * step + carousel.rotation.y));
      card.mesh.scale.setScalar(0.78 + side * 0.14 + near * 0.08);
      card.mat.opacity = 0.09 + side * 0.26 + near * 0.1;
      card.mesh.position.y = card.y + Math.sin(time * 0.7 + index * 1.4) * 0.09;
    });

    core.rotation.y += dt * 0.22;
    core.rotation.x += dt * 0.07;
    coreEdges.rotation.copy(core.rotation);
    rings.forEach((ring, index) => {
      ring.rotation.z += dt * (0.1 + index * 0.05) * (index % 2 ? -1 : 1);
    });
    dust.rotation.y += dt * 0.02;

    pointer.sx += (pointer.x - pointer.sx) * Math.min(1, dt * 2.6);
    pointer.sy += (pointer.y - pointer.sy) * Math.min(1, dt * 2.6);
    camX += (pointer.sx * 0.85 - camX) * Math.min(1, dt * 2.2);
    camY += (0.25 - pointer.sy * 0.55 - camY) * Math.min(1, dt * 2.2);
    camera.position.set(camX, camY, baseZ - progress * 2.1);
    camera.lookAt(0, -progress * 0.5, 0);
    world.position.y = -progress * 0.35;

    renderer.render(scene, camera);

    /* if the device cannot keep up, shed pixels and dust once */
    frames += 1;
    if (frames > 90 && frames < 260) {
      slow += performance.now() - frameStart;
      if (frames === 260 && slow / 170 > 34) {
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
    window.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
  };
}

/* ------------------------------------------------------------------ */
/* react wrapper                                                       */
/* ------------------------------------------------------------------ */

export function Scene3D() {
  const { content, t } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const on = content.settings.show3d !== false && content.settings.motion !== "off";

  const panels: Panel[] = [
    { num: "01", label: t("navAbout") },
    { num: "02", label: t("navSkills") },
    { num: "03", label: t("navWork") },
    { num: "04", label: t("navServices") },
    { num: "05", label: t("navTimeline") },
    { num: "06", label: t("navContact") },
  ];
  const panelsRef = useRef(panels);
  panelsRef.current = panels;
  const signature = panels.map((panel) => `${panel.num}:${panel.label}`).join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!on || !canvas) return;
    let disposed = false;
    let stop: (() => void) | undefined;

    const boot = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !canvas) return;
        stop = start(THREE, canvas, panelsRef.current);
        setReady(true);
      } catch {
        /* WebGL unavailable — the flat canvas field stays in place instead */
      }
    };
    void boot();

    return () => {
      disposed = true;
      stop?.();
    };
  }, [on, signature]);

  if (!on) return <NodeField />;

  return (
    <>
      {ready ? null : <NodeField />}
      <div className="scene3d-layer" aria-hidden="true">
        <canvas ref={canvasRef} className="scene3d-canvas" />
        <div className="scene3d-veil" />
      </div>
    </>
  );
}
