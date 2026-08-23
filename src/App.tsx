import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  Download,
  ArrowUpRight,
  ArrowDown,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────────────────────
const INFO = {
  name: "Srihan Vege",
  email: "svege@purdue.edu",
  resumeUrl: "/srihan_vege_resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: "TRUTH DECAY",
    description:
      "Joint first author of a study on multiturn sycophancy in LLMs. Built the evaluation harness; reduced accuracy degradation by ~43%. NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Python"],
    year: "2025",
    link: "https://arxiv.org/abs/2503.11656",
  },
  {
    title: "ContrastIQ",
    description:
      "CT imaging model combining a CNN with pharmacokinetic priors to predict aortic peak enhancement timing. ~97% improvement on 272 patient scans. EMBC submitted, patent pending.",
    tags: ["PyTorch", "Medical Imaging", "MONAI"],
    year: "2024",
  },
  {
    title: "REALestate.ai",
    description:
      "AI powered real estate valuation system that automates property value estimation by combining tabular features with location and market signals.",
    tags: ["Machine Learning", "Real Estate"],
    year: "2024",
    link: "https://github.com/S-K-23/REALestate.ai",
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Binary classification pipeline for fraudulent transactions, with feature engineering and model evaluation for reliable risk scoring.",
    tags: ["Python", "XGBoost", "Pandas"],
    year: "2025",
    link: "https://github.com/srihanvege/Credit-Card-Fraud-Detection",
  },
];

const EXPERIENCE = [
  {
    org: "Bioqore",
    role: "Software Engineering Intern",
    date: "Jun 2026 to Present",
    bullets: [
      "Built a synthetic biomanufacturing data framework in Python using SDV's Gaussian Copula and CTGAN models, achieving 85% fidelity against real process data.",
      "Designed a biological validity rule engine and model bake-off harness enforcing domain plausibility constraints; flagged 93% of implausible synthetic records across 8 validation rules.",
    ],
  },
  {
    org: "NuStudio.AI",
    role: "AI/ML Intern",
    date: "May 2026 to Present",
    bullets: [
      "Engineered an LLM-powered agent for automated cross-language code migration under the Apex team, reaching 95% translation accuracy on test conversions.",
      "Designed and implemented REST endpoints for Sarvos's Action Broker, covering typed action proposal contracts and validate/execute flows across billing, document, and matter-intake domains.",
      "Refined agent behavior, tested edge cases, and validated outputs across Cortava AI's credit union AI product suite, improving tool reliability and surfacing failure modes across core platform workflows.",
    ],
  },
  {
    org: "Algoverse AI Research",
    role: "Machine Learning Researcher",
    date: "Aug 2024 to Apr 2025",
    bullets: [
      "Built multiturn LLM evaluation harness; reduced accuracy degradation from sycophancy by ~43% via prompt strategies.",
      "Joint first author of TRUTH DECAY; accepted to NAACL SRW 2025.",
    ],
  },
  {
    org: "Northwestern University · Bagci Lab (MHIL)",
    role: "Machine Learning Engineer",
    date: "Jun 2024 to Feb 2025",
    bullets: [
      "Developed CT imaging model for aortic peak enhancement timing; mode timing error ~0.3s (≈97% improvement).",
      "Improved prediction accuracy on 272 scans; reduced error from ~200 HU to ~100 HU; EMBC submitted; patent pending.",
    ],
  },
  {
    org: "FireFly EDU (501c3)",
    role: "Cofounder & Vice President",
    date: "Jun 2023 to Aug 2024",
    bullets: [
      "Built and led education nonprofit serving underserved youth; recruited exec team across marketing and finance.",
      "Taught CS, Math, Biology, English, Physics to students aged 5 to 15 at Heal Paradise school.",
    ],
  },
  {
    org: "Stanford ML/Molecular Imaging Fellowship",
    role: "Research Student",
    date: "Jun 2023 to Aug 2023",
    bullets: [
      "Studied AI/deep learning applications in PET/MRI/SPECT under Dr. Frezghi Habte; surveyed CNN/RNN imaging tools.",
    ],
  },
];

const SKILLS = [
  "Python", "TypeScript", "JavaScript", "Java", "C", "SQL",
  "LLM Agents", "Agentic Workflows", "Synthetic Data", "CTGAN", "Gaussian Copula", "SDV",
  "PyTorch", "scikit-learn", "Pandas", "NumPy",
  "React", "Next.js", "Tailwind", "Node.js", "API Design", "MongoDB",
  "Git", "Linux",
];

// ─────────────────────────────────────────────────────────────
//  Animation variants
// ─────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────
//  Scroll progress bar
// ─────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500"
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  Magnetic nav link
// ─────────────────────────────────────────────────────────────
function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors cursor-pointer"
    >
      {children}
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
//  Nav
// ─────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050511]/90 backdrop-blur-xl border-b border-white/[0.04]" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 xl:px-16 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-mono text-[11px] tracking-[0.35em] uppercase text-white/70 hover:text-white transition-colors"
        >
          Srihan Vege
        </a>
        <div className="hidden sm:flex items-center gap-8">
          {(["Bio", "Projects", "Experience", "Contact"] as const).map((label) => (
            <MagneticLink key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </MagneticLink>
          ))}
          <a
            href={INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] tracking-[0.25em] uppercase border border-sky-500/25 text-sky-400/65 hover:text-sky-300 hover:border-sky-400/45 px-3 py-1.5 rounded transition-all"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
//  Hero Section
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 700], [0, -140]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const photoY = useTransform(scrollY, [0, 700], [0, 95]);
  const photoOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center overflow-hidden"
      style={{ background: "#050511" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
        <div className="hero-grain" />
      </div>

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 xl:px-16 w-full"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-sky-400/75 mb-8"
          >
            Agentic AI · Synthetic Data
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black leading-[0.87] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 12.5vw, 10.5rem)" }}
          >
            Srihan
            <br />
            Vege.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="mt-8 text-lg sm:text-xl text-white/40 max-w-lg leading-relaxed"
          >
            CS + Math at Purdue. Built agentic infra at NuStudio.AI, and
            generative models for biomanufacturing data at Bioqore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href={INFO.github} target="_blank" rel="noreferrer" className="hero-btn">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href={INFO.linkedin} target="_blank" rel="noreferrer" className="hero-btn">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a href={INFO.resumeUrl} target="_blank" rel="noreferrer" className="hero-btn-accent">
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile photo — desktop, fades/parallaxes on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        style={{ y: photoY, opacity: photoOpacity }}
        className="absolute inset-y-0 right-[12%] xl:right-[16%] hidden lg:flex items-center pointer-events-none z-[5]"
      >
        <div className="relative w-[310px] h-[310px] xl:w-[360px] xl:h-[360px]">
          <div className="absolute -inset-8 bg-gradient-to-br from-sky-500/10 to-indigo-500/8 rounded-full blur-3xl" />
          <img
            src="/1778867844831.png"
            alt="Srihan Vege"
            className="relative w-full h-full object-cover object-top rounded-full ring-1 ring-white/10"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-white/20">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3 h-3 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Section wrapper
// ─────────────────────────────────────────────────────────────
interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="py-28 sm:py-36 scroll-mt-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 xl:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 sm:mb-20"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/20">
              {number}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-black tracking-tight text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Project card
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 150, damping: 18 });

  function onTiltMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    rotX.set(-(e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2) * 7);
    rotY.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) * 7);
  }

  function onTiltLeave() { rotX.set(0); rotY.set(0); }

  const tiltStyle = { rotateX: springX, rotateY: springY, transformPerspective: 900 };

  const inner = (
    <>
      <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-sky-500/[0.06] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center justify-between mb-7">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
          {project.year}
        </span>
        {project.link && (
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-sky-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
        )}
      </div>

      <h3 className="font-display font-bold text-xl sm:text-2xl text-white/75 group-hover:text-white mb-3 transition-colors leading-tight">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-white/55 flex-1 mb-7">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-md bg-white/[0.03] text-white/30 border border-white/[0.05]"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  const cls =
    "group relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-7 flex flex-col overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-white/[0.03]";

  if (project.link) {
    return (
      <motion.a
        variants={fadeUp}
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={cls}
        style={tiltStyle}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.div variants={fadeUp} className={cls} style={tiltStyle} onMouseMove={onTiltMove} onMouseLeave={onTiltLeave}>
      {inner}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Skills marquee
// ─────────────────────────────────────────────────────────────
function SkillsMarquee() {
  const tripled = [...SKILLS, ...SKILLS, ...SKILLS];
  return (
    <div className="relative overflow-hidden -mx-6 sm:-mx-10 xl:-mx-16">
      <div className="marquee-track flex gap-3 py-1">
        {tripled.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 font-mono text-[12px] tracking-wide px-4 py-2.5 rounded-xl border border-white/[0.06] text-white/50 bg-white/[0.015] whitespace-nowrap hover:border-sky-500/25 hover:text-sky-400/80 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050511] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050511] to-transparent pointer-events-none" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  App
// ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#050511] text-white overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <HeroSection />

      <main>
        {/* ── About ── */}
        <Section id="bio" number="01" title="About.">
          <motion.div variants={fadeUp} className="space-y-5 max-w-3xl">
            <p className="text-lg sm:text-xl leading-relaxed text-white/65">
              I'm interested in AI infrastructure: action APIs, evaluation
              harnesses, and the data pipelines that decide whether a model
              survives contact with production. Longer term I want to build agent systems dependable
              enough for regulated, high-stakes domains.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed text-white/65">
              Recent work:{" "}
              <span className="text-white/85">agentic AI infrastructure</span>{" "}
              at NuStudio.AI,{" "}
              <span className="text-white/85">synthetic data engineering</span>{" "}
              at Bioqore, a multiturn sycophancy benchmark (NAACL SRW 2025),
              and CT imaging at Northwestern. Reach me at{" "}
              <a
                href={`mailto:${INFO.email}`}
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                {INFO.email}
              </a>
              .
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-start gap-3 font-mono text-sm tracking-wide text-white/55"
          >
            <GraduationCap className="w-5 h-5 text-sky-400/70 flex-shrink-0 mt-0.5" />
            <span>B.S. Computer Science &amp; Mathematics · Purdue · Aug 2025 to Dec 2028</span>
          </motion.div>
        </Section>

        {/* ── Publications ── */}
        <Section id="publications" number="02" title="Publications.">
          <motion.div
            variants={fadeUp}
            className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 sm:p-10 max-w-3xl overflow-hidden hover:border-white/10 transition-all duration-500"
          >
            <div className="absolute -top-20 -left-10 w-60 h-60 bg-indigo-500/[0.06] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-sky-400/75 mb-5">
              NAACL SRW · 2025
            </p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4 leading-snug">
              TRUTH DECAY: Quantifying Multiturn Sycophancy in Language Models
            </h3>
            <p className="text-base text-white/55 mb-7 leading-relaxed">
              Liu, Jain, Takuri,{" "}
              <strong className="text-white/75 font-semibold">Vege</strong>,
              Akalin, Zhu, O&apos;Brien, Sharma.
            </p>
            <a
              href="https://arxiv.org/abs/2503.11656"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-sky-400 hover:text-sky-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Read on arXiv
            </a>
          </motion.div>
        </Section>

        {/* ── Projects ── */}
        <Section id="projects" number="03" title="Projects.">
          <div className="grid sm:grid-cols-2 gap-4 max-w-5xl">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section id="experience" number="04" title="Experience.">
          <div className="max-w-2xl">
            {EXPERIENCE.map((e, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="relative pl-10 pb-14 last:pb-0"
              >
                {idx < EXPERIENCE.length - 1 && (
                  <div className="absolute left-[9px] top-[22px] bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
                )}
                <div className="absolute left-0 top-[5px] w-[19px] h-[19px] rounded-full border border-sky-500/35 bg-[#050511] flex items-center justify-center">
                  <div className="w-[7px] h-[7px] rounded-full bg-sky-500/55" />
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-display font-bold text-lg text-white/80">
                    {e.role}
                  </h3>
                  <span className="font-mono text-[10px] tracking-wider text-white/25">
                    {e.date}
                  </span>
                </div>
                <p className="font-mono text-[11px] tracking-wide text-sky-400/75 mb-4">
                  {e.org}
                </p>
                <ul className="space-y-2.5">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="text-white/15 flex-shrink-0 mt-0.5 select-none">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Skills ── */}
        <Section id="skills" number="05" title="Skills.">
          <SkillsMarquee />
        </Section>

        {/* ── Contact ── */}
        <Section id="contact" number="06" title="Let's Talk.">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-9">
              Open to research collaborations, internships, and interesting
              side projects. Best reached at{" "}
              <a
                href={`mailto:${INFO.email}`}
                className="text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/30 transition-colors"
              >
                {INFO.email}
              </a>{" "}
              or on{" "}
              <a
                href={INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/30 transition-colors"
              >
                LinkedIn
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${INFO.email}`} className="hero-btn-accent">
                <Mail className="w-3.5 h-3.5" /> Send Email
              </a>
              <a href={INFO.linkedin} target="_blank" rel="noreferrer" className="hero-btn">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </Section>
      </main>

      <footer className="py-12 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 xl:px-16 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {([
              { href: INFO.github, Icon: Github },
              { href: INFO.linkedin, Icon: Linkedin },
              { href: `mailto:${INFO.email}`, Icon: Mail },
            ] as const).map(({ href, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="text-white/20 hover:text-white/55 transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/15">
            © {new Date().getFullYear()} {INFO.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
