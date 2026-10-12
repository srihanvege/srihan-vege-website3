import React from "react";
import {
  FIELD,
  initialState,
  resume,
  step,
  defenderCountFor,
  spawnDefenders,
  type GameState,
  type Input,
} from "./engine";
import { MILESTONES } from "../data";

const VIEW_YARDS = 34; // how much field is on screen at once
const PLAYER_SCREEN_FRAC = 0.68; // player sits this far down the viewport

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export default function Field({ onExit }: { onExit: () => void }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<GameState>(initialState());
  const inputRef = React.useRef<Input>({
    left: false, right: false, up: false, down: false, target: null,
  });
  const reduced = usePrefersReducedMotion();

  // mirrored into React only for the overlays, so the loop stays out of render
  const [phase, setPhase] = React.useState<GameState["phase"]>("ready");
  const [hud, setHud] = React.useState({ yard: 0, tackles: 0 });

  const begin = React.useCallback(() => {
    const s = initialState();
    stateRef.current = {
      ...s,
      phase: "running",
      defenders: spawnDefenders(0, defenderCountFor(0)),
    };
    setPhase("running");
  }, []);

  const advance = React.useCallback(() => {
    const s = stateRef.current;
    if (s.phase === "scored") { begin(); return; }
    stateRef.current = resume(s);
    setPhase("running");
  }, [begin]);

  // ── keyboard ──
  React.useEffect(() => {
    const key = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.toLowerCase();
      const i = inputRef.current;
      if (k === "arrowleft" || k === "a") i.left = down;
      else if (k === "arrowright" || k === "d") i.right = down;
      else if (k === "arrowup" || k === "w") i.up = down;
      else if (k === "arrowdown" || k === "s") i.down = down;
      else return;
      i.target = null; // keyboard overrides a stale touch target
      e.preventDefault();
    };
    const dn = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        const p = stateRef.current.phase;
        if (p === "ready") begin();
        else if (p === "milestone" || p === "tackled" || p === "scored") advance();
        e.preventDefault();
        return;
      }
      if (e.key === "Escape") { onExit(); return; }
      key(e, true);
    };
    const up = (e: KeyboardEvent) => key(e, false);
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", dn);
      window.removeEventListener("keyup", up);
    };
  }, [begin, advance, onExit]);

  // ── game loop ──
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    const trail: { x: number; y: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30); // clamp after tab switches
      last = now;

      const before = stateRef.current;
      const after = step(before, inputRef.current, dt);
      stateRef.current = after;

      if (after.phase !== before.phase) setPhase(after.phase);
      if (after.phase === "running") {
        const y = Math.round(after.player.y);
        setHud((h) => (h.yard === y && h.tackles === after.tackles ? h : { yard: y, tackles: after.tackles }));
      }

      // ── draw ──
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const s = stateRef.current;

      const scale = Math.min(W / (FIELD.width + 8), H / VIEW_YARDS);
      const fieldW = FIELD.width * scale;
      const ox = (W - fieldW) / 2;
      const camY = s.player.y - (VIEW_YARDS * (1 - PLAYER_SCREEN_FRAC));
      const toScreen = (wx: number, wy: number) => ({
        x: ox + wx * scale,
        y: H - (wy - camY) * scale,
      });

      ctx.fillStyle = "#050511";
      ctx.fillRect(0, 0, W, H);

      // turf
      ctx.fillStyle = "rgba(255,255,255,0.012)";
      ctx.fillRect(ox, 0, fieldW, H);

      // end zone
      const ez = toScreen(0, FIELD.length);
      if (ez.y < H && ez.y > -200) {
        const grad = ctx.createLinearGradient(0, ez.y, 0, ez.y - 14 * scale);
        grad.addColorStop(0, "rgba(139,92,246,0.16)");
        grad.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(ox, ez.y - 14 * scale, fieldW, 14 * scale);
      }

      // yard lines
      for (let y = 0; y <= FIELD.length; y += 5) {
        const p = toScreen(0, y);
        if (p.y < -40 || p.y > H + 40) continue;
        const isMilestone = MILESTONES.some((m) => m.yard === y);
        const major = y % 10 === 0;
        ctx.strokeStyle = isMilestone
          ? "rgba(56,189,248,0.60)"
          : major
          ? "rgba(255,255,255,0.22)"
          : "rgba(255,255,255,0.10)";
        ctx.lineWidth = isMilestone ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(ox, p.y);
        ctx.lineTo(ox + fieldW, p.y);
        ctx.stroke();

        // hash marks, so motion downfield is legible
        if (!major) {
          ctx.strokeStyle = "rgba(255,255,255,0.14)";
          ctx.beginPath();
          const h = scale * 0.7;
          ctx.moveTo(ox + fieldW * 0.36, p.y - h / 2);
          ctx.lineTo(ox + fieldW * 0.36, p.y + h / 2);
          ctx.moveTo(ox + fieldW * 0.64, p.y - h / 2);
          ctx.lineTo(ox + fieldW * 0.64, p.y + h / 2);
          ctx.stroke();
        }

        if (major && y > 0 && y < FIELD.length) {
          ctx.fillStyle = isMilestone ? "rgba(56,189,248,0.85)" : "rgba(255,255,255,0.35)";
          ctx.font = `${Math.max(11, scale * 0.85)}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.textAlign = "left";
          ctx.fillText(String(y), ox + 10, p.y - 7);
          ctx.textAlign = "right";
          ctx.fillText(String(y), ox + fieldW - 10, p.y - 7);
        }

        // name the milestone on its line so you can see what is coming
        const ms = MILESTONES.find((m) => m.yard === y);
        if (ms && y < FIELD.length) {
          ctx.fillStyle = "rgba(56,189,248,0.45)";
          ctx.font = `${Math.max(10, scale * 0.62)}px "JetBrains Mono", ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.fillText(ms.org.toUpperCase(), ox + fieldW / 2, p.y - 9);
        }
      }

      // sidelines
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ox, 0); ctx.lineTo(ox, H);
      ctx.moveTo(ox + fieldW, 0); ctx.lineTo(ox + fieldW, H);
      ctx.stroke();

      // trail
      if (!reduced && s.phase === "running") {
        trail.push({ x: s.player.x, y: s.player.y });
        if (trail.length > 18) trail.shift();
      } else {
        trail.length = 0;
      }
      trail.forEach((t, i) => {
        const p = toScreen(t.x, t.y);
        ctx.fillStyle = `rgba(56,189,248,${(i / trail.length) * 0.16})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, FIELD.playerRadius * scale * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // defenders
      s.defenders.forEach((d) => {
        const p = toScreen(d.x, d.y);
        if (p.y < -60 || p.y > H + 60) return;
        ctx.fillStyle = "rgba(244,63,94,0.16)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, FIELD.defenderRadius * scale * 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f43f5e";
        ctx.beginPath();
        ctx.arc(p.x, p.y, FIELD.defenderRadius * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // player
      const pp = toScreen(s.player.x, s.player.y);
      ctx.fillStyle = "rgba(56,189,248,0.20)";
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, FIELD.playerRadius * scale * 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e8f6ff";
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, FIELD.playerRadius * scale, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  // ── touch / drag ──
  const pointerTarget = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const W = r.width, H = r.height;
    const scale = Math.min(W / (FIELD.width + 8), H / VIEW_YARDS);
    const ox = (W - FIELD.width * scale) / 2;
    const s = stateRef.current;
    const camY = s.player.y - VIEW_YARDS * (1 - PLAYER_SCREEN_FRAC);
    inputRef.current.target = {
      x: (e.clientX - r.left - ox) / scale,
      y: camY + (H - (e.clientY - r.top)) / scale,
    };
  };

  const milestone = stateRef.current.milestone;
  const pct = Math.round((hud.yard / FIELD.length) * 100);

  return (
    <div className="fixed inset-0 bg-[#050511] overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); pointerTarget(e); }}
        onPointerMove={(e) => { if (e.buttons) pointerTarget(e); }}
        onPointerUp={() => { inputRef.current.target = null; }}
        onPointerCancel={() => { inputRef.current.target = null; }}
      />

      {/* HUD */}
      <div className="absolute top-0 inset-x-0 p-5 sm:p-7 flex items-start justify-between pointer-events-none">
        <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/50">
          <div className="text-sky-400/80">{hud.yard} yd · {pct}%</div>
          {hud.tackles > 0 && <div className="mt-1 text-white/30">{hud.tackles} tackled</div>}
        </div>
        <button
          onClick={onExit}
          className="pointer-events-auto font-mono text-[11px] tracking-[0.25em] uppercase border border-white/15 text-white/60 hover:text-white hover:border-white/35 px-3 py-1.5 rounded transition-all"
        >
          Back to site
        </button>
      </div>

      {/* Overlays */}
      {phase !== "running" && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-[#050511]/75 backdrop-blur-sm">
          <div className="max-w-md w-full text-center">
            {phase === "ready" && (
              <>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sky-400/75 mb-5">
                  100 yards · 2023 to now
                </p>
                <h1 className="font-display font-black text-white leading-[0.95] mb-5" style={{ fontSize: "clamp(2.5rem,7vw,4rem)" }}>
                  The Drive.
                </h1>
                <p className="text-white/55 leading-relaxed mb-8">
                  Every ten yards is a year of my career. Run the field and pick it
                  up as you go. Dodge what got in the way.
                </p>
                <button onClick={begin} className="hero-btn-accent mx-auto">Start the drive</button>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/25 mt-6">
                  WASD / arrows · or drag · esc to leave
                </p>
              </>
            )}

            {phase === "milestone" && milestone && (
              <>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-sky-400/75 mb-4">
                  {milestone.yard} yard line · {milestone.date}
                </p>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">{milestone.org}</h2>
                <p className="font-mono text-[12px] text-white/50 mb-5">{milestone.role}</p>
                <p className="text-white/65 leading-relaxed mb-8">{milestone.note}</p>
                <button onClick={advance} className="hero-btn-accent mx-auto">Keep running</button>
              </>
            )}

            {phase === "tackled" && (
              <>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-rose-400/80 mb-4">Tackled</p>
                <p className="text-white/60 leading-relaxed mb-8">
                  {stateRef.current.checkpoint === 0
                    ? "Back to the goal line."
                    : `Back to the ${stateRef.current.checkpoint} yard line.`}{" "}
                  Everything you picked up is still yours.
                </p>
                <button onClick={advance} className="hero-btn-accent mx-auto">Run it again</button>
              </>
            )}

            {phase === "scored" && (
              <>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-violet-400/80 mb-4">Touchdown</p>
                <h2 className="font-display font-black text-white leading-[0.95] mb-5" style={{ fontSize: "clamp(2rem,6vw,3.2rem)" }}>
                  End zone.
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Hundred yards, {MILESTONES.length} stops, {stateRef.current.tackles} tackles.
                  That's the whole run so far.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button onClick={begin} className="hero-btn">Run it again</button>
                  <button onClick={onExit} className="hero-btn-accent">See the full site</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
