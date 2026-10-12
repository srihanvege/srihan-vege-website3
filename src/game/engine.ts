import { MILESTONES, type Milestone } from "../data";

// ─────────────────────────────────────────────────────────────
//  Field geometry. World units are yards; the renderer scales.
// ─────────────────────────────────────────────────────────────
export const FIELD = {
  width: 53.3, // real hash to hash width, in yards
  length: 100,
  playerRadius: 0.9,
  defenderRadius: 0.9,
};

export const PLAYER_SPEED = 13; // yards per second

export interface Vec {
  x: number; // 0..FIELD.width
  y: number; // 0..FIELD.length, downfield
}

export interface Defender extends Vec {
  speed: number;
  /** lateral drift so they don't all collapse onto one line */
  phase: number;
}

export type Phase = "ready" | "running" | "tackled" | "milestone" | "scored";

export interface GameState {
  phase: Phase;
  player: Vec;
  defenders: Defender[];
  /** furthest yard line already collected */
  reached: number;
  /** checkpoint to respawn at after a tackle */
  checkpoint: number;
  milestone: Milestone | null;
  tackles: number;
  elapsed: number;
}

export function initialState(): GameState {
  return {
    phase: "ready",
    player: { x: FIELD.width / 2, y: 0 },
    defenders: [],
    reached: 0,
    checkpoint: 0,
    milestone: null,
    tackles: 0,
    elapsed: 0,
  };
}

/**
 * Difficulty rises downfield, so the later career is literally harder to
 * get through. Count and speed both scale with yards gained.
 */
export function defenderCountFor(yard: number): number {
  return 3 + Math.floor(yard / 20); // 3 at the goal line, 8 in the red zone
}

export function defenderSpeedFor(yard: number): number {
  return 5.2 + (yard / 100) * 4.3; // 5.2 -> 9.5 yards/sec, always under player speed
}

/** The next milestone the player has not yet collected. */
export function nextMilestone(reached: number): Milestone | undefined {
  return MILESTONES.find((m) => m.yard > reached);
}

/** A milestone is crossed when the player's yard passes its line. */
export function milestoneCrossed(
  prevYard: number,
  yard: number,
  reached: number
): Milestone | null {
  const m = nextMilestone(reached);
  if (!m) return null;
  return prevYard < m.yard && yard >= m.yard ? m : null;
}

export function spawnDefenders(aroundYard: number, count: number): Defender[] {
  const speed = defenderSpeedFor(aroundYard);
  return Array.from({ length: count }, (_, i) => ({
    // spread across the width, staggered well ahead so there is room to read the field
    x: ((i + 0.5) / count) * FIELD.width,
    y: aroundYard + 24 + (i % 3) * 11,
    speed: speed * (0.88 + ((i * 37) % 25) / 100),
    phase: (i * 1.7) % (Math.PI * 2),
  }));
}

export function circlesOverlap(a: Vec, b: Vec, ra: number, rb: number): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy <= (ra + rb) * (ra + rb);
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Yard line the player falls back to after a tackle. */
export function checkpointFor(reached: number): number {
  return reached;
}

export interface Input {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  /** absolute target from touch drag, in world units */
  target: Vec | null;
}

/**
 * Advance the world by dt seconds. Pure: returns a new state, touches nothing
 * outside it, so the rules are testable without a canvas.
 */
export function step(s: GameState, input: Input, dt: number): GameState {
  if (s.phase !== "running") return s;

  const prevYard = s.player.y;

  // ── player ──
  let vx = 0;
  let vy = 0;
  if (input.target) {
    const dx = input.target.x - s.player.x;
    const dy = input.target.y - s.player.y;
    const d = Math.hypot(dx, dy);
    if (d > 0.4) {
      vx = (dx / d) * PLAYER_SPEED;
      vy = (dy / d) * PLAYER_SPEED;
    }
  } else {
    if (input.left) vx -= 1;
    if (input.right) vx += 1;
    if (input.up) vy += 1;
    if (input.down) vy -= 1;
    const d = Math.hypot(vx, vy);
    if (d > 0) {
      vx = (vx / d) * PLAYER_SPEED;
      vy = (vy / d) * PLAYER_SPEED;
    }
  }

  const player: Vec = {
    x: clamp(s.player.x + vx * dt, FIELD.playerRadius, FIELD.width - FIELD.playerRadius),
    y: clamp(s.player.y + vy * dt, 0, FIELD.length),
  };

  // ── defenders pursue, with a lateral weave ──
  const defenders = s.defenders.map((d) => {
    const dx = player.x - d.x;
    const dy = player.y - d.y;
    const dist = Math.hypot(dx, dy) || 1;
    const weave = Math.sin(s.elapsed * 1.6 + d.phase) * 1.8;
    return {
      ...d,
      x: clamp(d.x + ((dx / dist) * d.speed + weave) * dt, 0, FIELD.width),
      y: d.y + (dy / dist) * d.speed * dt,
    };
  });

  const elapsed = s.elapsed + dt;

  // ── scored ──
  if (player.y >= FIELD.length) {
    const m = MILESTONES[MILESTONES.length - 1];
    return {
      ...s,
      phase: "scored",
      player,
      defenders,
      elapsed,
      reached: FIELD.length,
      milestone: m,
    };
  }

  // ── tackled ──
  const hit = defenders.some((d) =>
    circlesOverlap(player, d, FIELD.playerRadius, FIELD.defenderRadius)
  );
  if (hit) {
    const back = checkpointFor(s.reached);
    return {
      ...s,
      phase: "tackled",
      player: { x: FIELD.width / 2, y: back },
      defenders: spawnDefenders(back, defenderCountFor(back)),
      checkpoint: back,
      tackles: s.tackles + 1,
      elapsed,
    };
  }

  // ── milestone crossed ──
  const crossed = milestoneCrossed(prevYard, player.y, s.reached);
  if (crossed) {
    return {
      ...s,
      phase: "milestone",
      player,
      defenders,
      elapsed,
      reached: crossed.yard,
      checkpoint: crossed.yard,
      milestone: crossed,
    };
  }

  return { ...s, player, defenders, elapsed };
}

/** Resume after a milestone card or a tackle. */
export function resume(s: GameState): GameState {
  const count = defenderCountFor(s.player.y);
  return {
    ...s,
    phase: "running",
    milestone: null,
    defenders: spawnDefenders(s.player.y, count),
  };
}
