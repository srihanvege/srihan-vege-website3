import { describe, it, expect } from "vitest";
import {
  FIELD,
  initialState,
  step,
  resume,
  milestoneCrossed,
  defenderCountFor,
  defenderSpeedFor,
  circlesOverlap,
  spawnDefenders,
  clamp,
  type Input,
} from "./engine";
import { MILESTONES } from "../data";

const idle: Input = { left: false, right: false, up: false, down: false, target: null };
const forward: Input = { ...idle, up: true };

describe("milestone mapping", () => {
  it("covers the field end to end", () => {
    expect(MILESTONES[MILESTONES.length - 1].yard).toBe(FIELD.length);
    expect(MILESTONES.every((m) => m.yard > 0 && m.yard <= FIELD.length)).toBe(true);
  });

  it("is strictly increasing, so the field reads as a timeline", () => {
    const yards = MILESTONES.map((m) => m.yard);
    expect([...yards].sort((a, b) => a - b)).toEqual(yards);
  });

  it("fires only when a line is actually crossed", () => {
    expect(milestoneCrossed(19, 21, 0)?.yard).toBe(20);
    expect(milestoneCrossed(19, 19.5, 0)).toBeNull();
  });

  it("does not re-award a milestone already collected", () => {
    expect(milestoneCrossed(19, 21, 20)).toBeNull();
  });

  it("awards the next one after backtracking across an old line", () => {
    expect(milestoneCrossed(39, 41, 20)?.yard).toBe(40);
  });
});

describe("difficulty", () => {
  it("rises downfield", () => {
    expect(defenderCountFor(0)).toBeLessThan(defenderCountFor(80));
    expect(defenderSpeedFor(0)).toBeLessThan(defenderSpeedFor(100));
  });

  it("never lets a defender outrun the player outright", () => {
    // a defender strictly faster than the player makes the game unwinnable
    expect(defenderSpeedFor(100)).toBeLessThan(13);
    // with a margin, so weave does not push them over
    expect(defenderSpeedFor(100)).toBeLessThan(13 * 0.8);
  });

  it("spawns defenders ahead of the player, never on top of them", () => {
    const ds = spawnDefenders(30, defenderCountFor(30));
    // far enough that the player gets a beat to react, not just outside collision range
    expect(ds.every((d) => d.y > 30 + 18)).toBe(true);
  });
});

describe("movement", () => {
  it("keeps the player inside the sidelines", () => {
    let s = resume({ ...initialState(), defenders: [] });
    s = { ...s, defenders: [] };
    for (let i = 0; i < 200; i++) s = step({ ...s, defenders: [] }, { ...idle, left: true }, 1 / 60);
    expect(s.player.x).toBeGreaterThanOrEqual(FIELD.playerRadius);
  });

  it("does not move while a milestone card is open", () => {
    const s = { ...initialState(), phase: "milestone" as const };
    expect(step(s, forward, 1 / 60)).toBe(s);
  });

  it("diagonal is not faster than straight", () => {
    const base = { ...resume(initialState()), defenders: [] };
    const straight = step(base, { ...idle, up: true }, 0.5);
    const diag = step(base, { ...idle, up: true, right: true }, 0.5);
    const dStraight = Math.hypot(straight.player.x - base.player.x, straight.player.y - base.player.y);
    const dDiag = Math.hypot(diag.player.x - base.player.x, diag.player.y - base.player.y);
    expect(dDiag).toBeCloseTo(dStraight, 5);
  });
});

describe("tackles", () => {
  it("sends the player back to the last milestone, not the goal line", () => {
    let s = { ...resume(initialState()), reached: 40, player: { x: 10, y: 55 } };
    s = { ...s, defenders: [{ x: 10, y: 55, speed: 8, phase: 0 }] };
    const after = step(s, idle, 1 / 60);
    expect(after.phase).toBe("tackled");
    expect(after.player.y).toBe(40);
    expect(after.tackles).toBe(1);
  });

  it("keeps collected milestones after a tackle", () => {
    let s = { ...resume(initialState()), reached: 60, player: { x: 10, y: 70 } };
    s = { ...s, defenders: [{ x: 10, y: 70, speed: 8, phase: 0 }] };
    expect(step(s, idle, 1 / 60).reached).toBe(60);
  });
});

describe("scoring", () => {
  it("scores at the end zone", () => {
    const s = { ...resume(initialState()), player: { x: 26, y: 99.9 } };
    const after = step({ ...s, defenders: [] }, forward, 1 / 30);
    expect(after.phase).toBe("scored");
    expect(after.milestone?.org).toBe("Microsoft");
  });
});

describe("helpers", () => {
  it("clamp", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
  });
  it("circlesOverlap", () => {
    expect(circlesOverlap({ x: 0, y: 0 }, { x: 1, y: 0 }, 0.6, 0.6)).toBe(true);
    expect(circlesOverlap({ x: 0, y: 0 }, { x: 5, y: 0 }, 0.6, 0.6)).toBe(false);
  });
});
