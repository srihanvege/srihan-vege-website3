import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  Download,
  Sun,
  Moon,
  Monitor,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import { Button } from "./components/ui/button";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics",
  school: "Purdue University",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline:
    "Purdue CS + Math student interested in ML reliability and high-powered computing. Recent work spans LLM evaluation, medical imaging, and applied ML.",
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
      "Co-first authored study on multi-turn sycophancy in LLMs. Built the evaluation harness; reduced accuracy degradation by ~43%. NAACL SRW 2025.",
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
      "AI-driven real estate valuation system that automates property value estimation by combining tabular features with location and market signals.",
    tags: ["Machine Learning", "Real Estate"],
    year: "2024",
    link: "https://github.com/S-K-23/REALestate.ai",
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Binary classification pipeline for fraudulent transactions, with feature engineering and model evaluation for reliable risk scoring. Work in progress.",
    tags: ["Python", "XGBoost", "Pandas"],
    year: "2025",
    link: "https://github.com/srihanvege/Credit-Card-Fraud-Detection",
  },
];

const EXPERIENCE = [
  {
    org: "Algoverse AI Research",
    role: "Machine Learning Researcher",
    date: "Aug 2024 – Apr 2025",
    bullets: [
      "Built multi-turn LLM evaluation harness; reduced accuracy degradation from sycophancy by ~43% via prompt strategies.",
      "Co-first authored TRUTH DECAY; accepted to NAACL SRW 2025.",
    ],
  },
  {
    org: "Northwestern University · Bagci Lab (MHIL)",
    role: "Machine Learning Engineer",
    date: "Jun 2024 – Feb 2025",
    bullets: [
      "Developed CT imaging model for aortic peak enhancement timing; mode timing error ~0.3s (≈97% improvement).",
      "Improved prediction accuracy on 272 scans; reduced error from ~200 HU to ~100 HU; EMBC paper submitted; patent pending.",
    ],
  },
  {
    org: "FireFly EDU (501c3)",
    role: "Co-Founder & Vice President",
    date: "Jun 2023 – Aug 2024",
    bullets: [
      "Built and led education nonprofit serving under-resourced youth; recruited exec team across marketing and finance.",
      "Taught CS, Math, Biology, English, Physics to students aged 5–15 at Heal Paradise school.",
    ],
  },
  {
    org: "Stanford ML/Molecular Imaging Fellowship",
    role: "Research Student",
    date: "Jun 2023 – Aug 2023",
    bullets: [
      "Studied AI/deep learning applications in PET/MRI/SPECT under Dr. Frezghi Habte; surveyed CNN/RNN imaging tools.",
    ],
  },
];

const SKILLS = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "Swift",
  "PyTorch",
  "MONAI",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "scikit-learn",
  "LLMs",
  "FAISS",
  "Git",
  "Linux",
];

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "Biography" },
  { id: "notes", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const CONTAINER = "w-full max-w-5xl mx-auto px-6 sm:px-10";

function ScrollSpyNav({ isDark }: { isDark: boolean }) {
  const [activeId, setActiveId] = React.useState<string>("home");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.boundingClientRect.top);
            } else {
              visibleSections.delete(id);
            }
            if (visibleSections.size > 0) {
              const topmost = [...visibleSections.entries()].sort(
                (a, b) => a[1] - b[1]
              )[0][0];
              setActiveId(topmost);
            }
          });
        },
        { threshold: 0.15, rootMargin: "-10% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const dotActive = isDark ? "#38bdf8" : "#0284c7";
  const dotInactive = isDark ? "#475569" : "#cbd5e1";
  const labelBg = isDark
    ? "bg-slate-800 text-slate-100"
    : "bg-white text-slate-800";

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
      aria-label="Page sections"
    >
      {NAV_SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="flex items-center gap-3 group cursor-pointer bg-transparent border-0 p-0"
            aria-label={`Go to ${label}`}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  key="label"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className={`font-mono text-[11px] tracking-[0.2em] uppercase font-medium px-2 py-0.5 rounded shadow-sm ${labelBg}`}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              animate={{
                width: isActive ? 9 : 7,
                height: isActive ? 9 : 7,
                backgroundColor: isActive ? dotActive : dotInactive,
                scale: isHovered ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{ borderRadius: "50%", display: "block", flexShrink: 0 }}
            />
          </button>
        );
      })}
    </nav>
  );
}

type Mode = "light" | "dark" | "system";
function ThemeToggle({
  mode,
  setMode,
  isDark,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  isDark: boolean;
}) {
  const ringActive = isDark ? "ring-1 ring-sky-400" : "ring-1 ring-sky-600";
  const base =
    "h-8 w-8 inline-flex items-center justify-center rounded transition-colors";
  const inactive = isDark
    ? "text-slate-400 hover:text-slate-100"
    : "text-slate-500 hover:text-slate-900";
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => setMode("light")}
        className={`${base} ${inactive} ${mode === "light" ? ringActive : ""}`}
        title="Light"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setMode("dark")}
        className={`${base} ${inactive} ${mode === "dark" ? ringActive : ""}`}
        title="Dark"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setMode("system")}
        className={`${base} ${inactive} ${mode === "system" ? ringActive : ""}`}
        title="Auto"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  isDark: boolean;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isDark }) => (
  <div className="mb-8">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "0% 50%" }}
      className={`h-px mb-5 w-16 ${isDark ? "bg-sky-400" : "bg-sky-600"}`}
    />
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-4xl sm:text-5xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

interface SectionProps {
  id: string;
  title: string;
  isDark: boolean;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ id, title, isDark, children }) => (
  <section id={id} className="scroll-mt-24 py-16 sm:py-20">
    <div className={CONTAINER}>
      <SectionHeader title={title} isDark={isDark} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface LinkIconProps {
  href: string;
  title?: string;
  children: React.ReactNode;
}
const LinkIcon: React.FC<LinkIconProps> = ({ href, children, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="inline-flex items-center gap-2 hover:text-sky-500 transition-colors"
  >
    {children}
  </a>
);

export default function App() {
  const [mode, setMode] = React.useState<Mode>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Mode) ?? "system";
  });

  const isDark = React.useMemo(() => {
    if (mode === "dark") return true;
    if (mode === "light") return false;
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  }, [mode]);

  React.useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  React.useEffect(() => {
    const bg = isDark ? "#020617" : "#ffffff";
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }, [isDark]);

  const mainClass = isDark
    ? "min-h-screen bg-slate-950 text-slate-100"
    : "min-h-screen bg-white text-slate-900";

  const headerClass = isDark
    ? "sticky top-0 z-50 backdrop-blur bg-slate-950/85"
    : "sticky top-0 z-50 backdrop-blur bg-white/85";

  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const subtle = isDark ? "text-slate-500" : "text-slate-500";
  const cardBg = isDark
    ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
    : "bg-white border-slate-200 hover:border-slate-400";
  const tagPill = isDark
    ? "border-slate-700 text-slate-400"
    : "border-slate-300 text-slate-600";

  return (
    <div className={`${mainClass} text-base overflow-x-hidden`}>
      <ScrollSpyNav isDark={isDark} />

      <header className={headerClass}>
        <nav className={`${CONTAINER} h-16 flex items-center justify-between`}>
          <a
            href="#home"
            className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold"
          >
            {INFO.name}
          </a>
          <div className="hidden sm:flex items-center gap-7 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase">
            <a href="#about" className="hover:text-sky-500 transition-colors">
              Bio
            </a>
            <a href="#projects" className="hover:text-sky-500 transition-colors">
              Projects
            </a>
            <a
              href="#experience"
              className="hover:text-sky-500 transition-colors"
            >
              Experience
            </a>
            <a href="#skills" className="hover:text-sky-500 transition-colors">
              Skills
            </a>
            <a
              href={INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 transition-colors"
            >
              Resume
            </a>
            <ThemeToggle mode={mode} setMode={setMode} isDark={isDark} />
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-[1fr,240px] gap-10 sm:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-sky-500 dark:text-sky-400 mb-5">
                  CS · Math · Purdue
                </p>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
                  {INFO.name}
                </h1>
                <p className={`mt-4 text-xl sm:text-2xl ${muted}`}>
                  {INFO.role}
                </p>
                <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${muted}`}>
                  {INFO.headline}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-md text-base h-11 px-5"
                  >
                    <a href={INFO.github} target="_blank" rel="noreferrer">
                      <Github className="w-5 h-5 mr-2" /> GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-md text-base h-11 px-5"
                  >
                    <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild className="rounded-md text-base h-11 px-5">
                    <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                      <Download className="w-5 h-5 mr-2" /> Resume
                    </a>
                  </Button>
                </div>

                <div
                  className={`mt-7 flex items-center gap-2 text-base ${subtle}`}
                >
                  <GraduationCap className="w-5 h-5 text-sky-500" />
                  <span>
                    B.S. Computer Science &amp; Mathematics · Purdue University
                    (Aug 2025 – May 2028)
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="justify-self-center md:justify-self-end"
              >
                <div
                  className={`w-56 h-56 sm:w-60 sm:h-60 rounded-full overflow-hidden shadow-lg ${
                    isDark ? "ring-1 ring-slate-800" : "ring-1 ring-slate-200"
                  }`}
                >
                  <img
                    src="/1753369044349.jpeg"
                    alt="Srihan Vege"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="about" title="Biography" isDark={isDark}>
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl text-lg leading-relaxed ${muted}`}
          >
            I recently started at Purdue University (CS &amp; Math). I enjoy
            building things at the intersection of ML reliability and usable
            products. Recent projects include a credit card fraud detection
            pipeline and research on mitigating multi-turn sycophancy in LLMs.
            If any of this connects to your work, feel free to reach out at{" "}
            <a
              className="text-sky-500 hover:underline"
              href={`mailto:${INFO.email}`}
            >
              {INFO.email}
            </a>
            .
          </motion.p>
        </Section>

        <Section id="notes" title="Publications" isDark={isDark}>
          <motion.div
            variants={itemVariants}
            className={`rounded-xl border p-6 sm:p-8 max-w-3xl ${cardBg}`}
          >
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-sky-500 dark:text-sky-400 mb-2">
              NAACL SRW · 2025
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 leading-snug">
              TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language Models
            </h3>
            <p className={`text-base mb-4 ${muted}`}>
              Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu,
              O&apos;Brien, Sharma.
            </p>
            <a
              href="https://arxiv.org/abs/2503.11656"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-base text-sky-500 hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Read on arXiv
            </a>
          </motion.div>
        </Section>

        <Section id="projects" title="Projects" isDark={isDark}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p) => (
              <motion.a
                key={p.title}
                href={p.link || "#"}
                target={p.link ? "_blank" : undefined}
                rel={p.link ? "noreferrer" : undefined}
                variants={itemVariants}
                className={`group rounded-xl border p-6 transition-colors duration-300 flex flex-col ${cardBg} ${
                  p.link ? "" : "pointer-events-none"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`font-mono text-xs tracking-[0.2em] uppercase ${subtle}`}
                  >
                    {p.year}
                  </span>
                  {p.link && (
                    <ArrowUpRight
                      className={`w-5 h-5 ${subtle} group-hover:text-sky-500 transition-colors`}
                    />
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 group-hover:text-sky-500 transition-colors">
                  {p.title}
                </h3>
                <p className={`text-base leading-relaxed mb-5 flex-1 ${muted}`}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`font-mono text-xs tracking-wide px-2 py-1 rounded border ${tagPill}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" isDark={isDark}>
          <div className="space-y-4 max-w-4xl">
            {EXPERIENCE.map((e, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-xl border p-6 sm:p-7 transition-colors duration-300 ${cardBg}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className={`mt-1 shrink-0 w-9 h-9 rounded-md flex items-center justify-center ${
                      isDark ? "bg-sky-500/10" : "bg-sky-50"
                    }`}
                  >
                    <Briefcase
                      className={`w-4.5 h-4.5 ${
                        isDark ? "text-sky-400" : "text-sky-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        {e.role}
                      </h3>
                      <span
                        className={`font-mono text-xs tracking-[0.2em] uppercase ${subtle}`}
                      >
                        {e.date}
                      </span>
                    </div>
                    <p className={`text-base mt-1 ${muted}`}>{e.org}</p>
                  </div>
                </div>
                <ul
                  className={`list-disc pl-12 mt-4 space-y-1.5 text-base leading-relaxed ${muted}`}
                >
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" isDark={isDark}>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 max-w-3xl"
          >
            {SKILLS.map((s) => (
              <span
                key={s}
                className={`font-mono text-sm px-3 py-1.5 rounded-md border ${tagPill}`}
              >
                {s}
              </span>
            ))}
          </motion.div>
        </Section>

        <Section id="contact" title="Contact" isDark={isDark}>
          <motion.div variants={itemVariants} className="max-w-3xl">
            <p className={`text-lg leading-relaxed ${muted}`}>
              Open to research, internships, and interesting side-projects.
              Reach me at{" "}
              <a
                className="text-sky-500 hover:underline"
                href={`mailto:${INFO.email}`}
              >
                {INFO.email}
              </a>{" "}
              or on{" "}
              <a
                className="text-sky-500 hover:underline"
                href={INFO.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-md text-base h-11 px-5">
                <a href={`mailto:${INFO.email}`}>
                  <Mail className="w-5 h-5 mr-2" /> Email
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-md text-base h-11 px-5"
              >
                <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </Section>
      </main>

      <footer className="py-10">
        <div
          className={`${CONTAINER} flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.25em] uppercase ${subtle}`}
        >
          <div className="flex items-center gap-6">
            <LinkIcon href={INFO.github} title="GitHub">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </LinkIcon>
            <LinkIcon href={INFO.linkedin} title="LinkedIn">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </LinkIcon>
            <LinkIcon href={`mailto:${INFO.email}`} title="Email">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </LinkIcon>
          </div>
          <span>
            © {new Date().getFullYear()} {INFO.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
