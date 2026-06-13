"use client";

import { useEffect, useRef } from "react";

const PALETTE = {
  bg: "#070d0e",
  primary: "#1a7a6e",
  mid: "#0d5a50",
  accent: "#22a899",
  glow: "#3ecfbf",
};

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  pulsePhase: number; isPad: boolean;
}

interface Pulse {
  fromX: number; fromY: number;
  toX: number; toY: number;
  t: number; speed: number; color: string;
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const EDGE_DISTANCE = 140;
const NODE_COUNT_BASE = 55;
const PULSE_SPAWN_CHANCE = 0.004;

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const isAndroid = /android/i.test(navigator.userAgent);

    let raf: number;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let W = 0, H = 0;

    const { r: gr, g: gg, b: gb } = hexToRgb(PALETTE.glow);
    const { r: ar, g: ag, b: ab } = hexToRgb(PALETTE.accent);

    const glowColor   = (alpha: number) => `rgba(${gr},${gg},${gb},${alpha})`;
    const accentColor = (alpha: number) => `rgba(${ar},${ag},${ab},${alpha})`;
    const midColor    = (alpha: number) => {
      const { r, g, b } = hexToRgb(PALETTE.mid);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      if (!isAndroid) spawnNodes();
    };

    const spawnNodes = () => {
      const count = Math.round(NODE_COUNT_BASE * Math.sqrt((W * H) / (1440 * 900)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() < 0.15 ? 4 : Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        isPad: Math.random() < 0.15,
      }));
      pulses = [];
    };

    const drawPad = (x: number, y: number, r: number, alpha: number, t: number) => {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.04 + r);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      const s = r * 2.2;
      ctx.fillStyle = midColor(alpha * 0.6);
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.strokeStyle = glowColor(alpha * pulse);
      ctx.lineWidth = 0.8;
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.beginPath();
      ctx.moveTo(-s / 2, 0); ctx.lineTo(s / 2, 0);
      ctx.moveTo(0, -s / 2); ctx.lineTo(0, s / 2);
      ctx.strokeStyle = glowColor(alpha * 0.5 * pulse);
      ctx.stroke();
      ctx.restore();
    };

    const drawGrid = () => {
      const gridStep = 60;
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = midColor(0.28);
      for (let x = 0; x < W; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    };

    // Android: draw grid once, static, done
    const drawStatic = () => {
      ctx.fillStyle = "#070d0e";
      ctx.fillRect(0, 0, W, H);
      drawGrid();
    };

    let frame = 0;
    const draw = () => {
      frame++;

      ctx.fillStyle = `rgba(7,13,14,0.18)`;
      ctx.fillRect(0, 0, W, H);

      drawGrid();

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d > EDGE_DISTANCE) continue;

          const fade = 1 - d / EDGE_DISTANCE;
          const alpha = fade * 0.35;
          const mx = a.x + dx * 0.5;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(mx, a.y);
          ctx.lineTo(mx, b.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = glowColor(alpha * 0.5);
          ctx.lineWidth = 0.6;
          ctx.stroke();

          if (Math.abs(dx) < 50 || Math.abs(dy) < 50) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = accentColor(alpha * 0.2);
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }

          if (Math.random() < PULSE_SPAWN_CHANCE) {
            pulses.push({
              fromX: a.x, fromY: a.y,
              toX: b.x, toY: b.y,
              t: 0,
              speed: 0.012 + Math.random() * 0.018,
              color: Math.random() < 0.6 ? PALETTE.glow : PALETTE.accent,
            });
          }
        }
      }

      pulses = pulses.filter((p) => p.t <= 1);
      for (const p of pulses) {
        const cx = p.fromX + (p.toX - p.fromX) * p.t;
        const cy = p.fromY + (p.toY - p.fromY) * p.t;
        const { r, g, b } = hexToRgb(p.color);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        p.t += p.speed;
      }

      for (const n of nodes) {
        const pulse = 0.7 + 0.3 * Math.sin(frame * 0.03 + n.pulsePhase);
        const alpha = n.alpha * pulse;

        if (n.isPad) {
          drawPad(n.x, n.y, n.r, alpha, frame);
        } else {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
          grad.addColorStop(0, glowColor(alpha * 0.6));
          grad.addColorStop(1, glowColor(0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = glowColor(alpha);
          ctx.fill();
        }

        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
      vig.addColorStop(0, "rgba(7,13,14,0)");
      vig.addColorStop(1, "rgba(7,13,14,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (isAndroid) drawStatic();
    });
    ro.observe(canvas);
    resize();

    if (isAndroid) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        display: "block",
      }}
    />
  );
}