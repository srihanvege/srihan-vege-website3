import React from "react";
import { motion } from "framer-motion";

/**
 * Ambient loop of an agent taking a real action: propose a typed payload,
 * gate it, execute, log it. Mirrors the Action Broker flow. Occasionally the
 * gate rejects and retries, which is the part worth showing.
 */
const STAGES = ["intent", "proposal", "validate", "execute", "audit"] as const;
type Stage = (typeof STAGES)[number];

interface Run {
  intent: string;
  domain: string;
  payload: string;
  rejects: boolean;
  reason: string;
}

const RUNS: Run[] = [
  {
    intent: "Refund invoice #4812",
    domain: "billing",
    payload: "{ action: refund, invoice: 4812, amount: 240.00 }",
    rejects: false,
    reason: "",
  },
  {
    intent: "File the intake packet",
    domain: "matter-intake",
    payload: "{ action: file, matter: M-209, docs: 4 }",
    rejects: true,
    reason: "missing required field: jurisdiction",
  },
  {
    intent: "Countersign the NDA",
    domain: "document",
    payload: "{ action: countersign, doc: nda-77, party: acme }",
    rejects: false,
    reason: "",
  },
];

const STAGE_MS = 900;

export default function AgentTrace() {
  const [runIdx, setRunIdx] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  const [retrying, setRetrying] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
  }, []);

  const run = RUNS[runIdx];
  // a rejected proposal stops at validate, then retries and goes through
  const blocked = run.rejects && !retrying;

  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setStage((s) => {
        const last = blocked ? 2 : STAGES.length - 1;
        if (s < last) return s + 1;
        if (blocked) { setRetrying(true); return 1; }
        setRetrying(false);
        setRunIdx((r) => (r + 1) % RUNS.length);
        return 0;
      });
    }, blocked && stage === 2 ? STAGE_MS * 1.6 : STAGE_MS);
    return () => clearTimeout(t);
  }, [stage, blocked, paused]);

  const rejectedNow = blocked && stage === 2;

  return (
    <div
      className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* intent */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-7">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/30">
          intent
        </span>
        <span className="font-mono text-[13px] text-white/80">{run.intent}</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sky-400/60">
          {run.domain}
        </span>
      </div>

      {/* pipeline */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const active = i === stage;
          const isReject = rejectedNow && i === 2;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className="relative w-full h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    animate={{ width: done || active ? "100%" : "0%" }}
                    transition={{ duration: active ? 0.75 : 0.2, ease: "easeInOut" }}
                    className={`h-full rounded-full ${
                      isReject ? "bg-rose-500" : "bg-gradient-to-r from-sky-400 to-indigo-400"
                    }`}
                  />
                </div>
                <span
                  className={`font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase truncate transition-colors ${
                    isReject
                      ? "text-rose-400/90"
                      : done || active
                      ? "text-white/60"
                      : "text-white/20"
                  }`}
                >
                  {s}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* payload */}
      <div className="font-mono text-[11px] sm:text-[12px] leading-relaxed">
        <motion.div
          key={`${runIdx}-${retrying}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/45 break-all"
        >
          <span className="text-white/25 select-none">→ </span>
          {run.payload}
        </motion.div>

        <div className="mt-2 min-h-[1.4em]">
          {rejectedNow ? (
            <span className="text-rose-400/90">
              <span className="text-white/25 select-none">✕ </span>
              rejected · {run.reason}
            </span>
          ) : retrying && stage < 3 ? (
            <span className="text-amber-400/80">
              <span className="text-white/25 select-none">↻ </span>
              repaired, revalidating
            </span>
          ) : stage >= 4 ? (
            <span className="text-emerald-400/80">
              <span className="text-white/25 select-none">✓ </span>
              executed · logged to audit trail
            </span>
          ) : stage === 3 ? (
            <span className="text-white/35">
              <span className="text-white/25 select-none">· </span>
              executing
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
