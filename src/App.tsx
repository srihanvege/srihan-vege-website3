import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Download,
  Sun,
  Moon,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./components/ui/button";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics Student",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline:
    "Purdue CS + Math · Interests in ML reliability and high-powered computing.",
  resumeUrl: "/srihan_vege_resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

type ProjectLinks = { code?: string; demo?: string; paper?: string };
type CategoryColor = "blue" | "purple" | "amber" | "green" | "rose";
interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  categoryColor: CategoryColor;
  year: string;
  featured?: boolean;
  links?: ProjectLinks;
}

const PROJECTS: Project[] = [
  {
    title: "TRUTH DECAY",
    description:
      "Benchmark and mitigation study on multi-turn sycophancy in LLMs. Co-first authored paper accepted to NAACL SRW 2025; built the multi-turn evaluation harness and prompt-strategy ablations that reduced accuracy degradation by ~43%.",
    tags: ["LLM Eval", "NLP", "Prompting", "Python"],
    category: "RESEARCH",
    categoryColor: "blue",
    year: "2025",
    featured: true,
    links: { paper: "https://arxiv.org/abs/2503.11656" },
  },
  {
    title: "ContrastIQ",
    description:
      "CT imaging model that combines a CNN with pharmacokinetic priors to predict arterial-phase aortic peak enhancement timing. Reduced mode timing error to ~0.3s (≈97% improvement) on 272 patient scans; EMBC paper submitted, patent pending.",
    tags: ["PyTorch", "Medical Imaging", "CNN", "MONAI"],
    category: "RESEARCH",
    categoryColor: "purple",
    year: "2024",
    featured: true,
  },
  {
    title: "REALestate.ai",
    description:
      "AI-driven real estate valuation system that automates and optimizes property value estimation by combining tabular features with location and market signals.",
    tags: ["Machine Learning", "Real Estate", "Automation"],
    category: "FULL-STACK",
    categoryColor: "green",
    year: "2024",
    links: { code: "https://github.com/S-K-23/REALestate.ai" },
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Binary classification pipeline for detecting fraudulent credit card transactions, with feature engineering and model evaluation for reliable risk scoring. Currently a work in progress.",
    tags: ["Python", "XGBoost", "Pandas", "scikit-learn"],
    category: "ML",
    categoryColor: "amber",
    year: "2025",
    links: { code: "https://github.com/srihanvege/Credit-Card-Fraud-Detection" },
  },
];

const EXPERIENCE = [
  {
    org: "Algoverse AI Research",
    role: "Machine Learning Researcher",
    date: "Aug 2024 – Apr 2025",
    bullets: [
      "Built multi-turn LLM evaluation harness; reduced accuracy degradation from sycophancy by ~43% via prompt strategies.",
      "Co-first authored TRUTH DECAY; accepted to NAACL SRW 2025; presented results to research audience.",
    ],
  },
  {
    org: "Northwestern University · Bagci Lab (MHIL)",
    role: "Machine Learning Engineer",
    date: "Jun 2024 – Feb 2025",
    bullets: [
      "Developed CT imaging model to determine aortic peak enhancement timing; mode timing error ~0.3s (≈97% improvement).",
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

interface SkillCategory {
  label: string;
  title: string;
  items: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    title: "Programming Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "HTML/CSS", "Swift"],
  },
  {
    label: "ML & AI",
    title: "Machine Learning",
    items: ["PyTorch", "MONAI", "LLMs", "FAISS", "CNNs", "Transformers"],
  },
  {
    label: "Data",
    title: "Data Science",
    items: ["NumPy", "Pandas", "Matplotlib", "scikit-learn"],
  },
  {
    label: "Tools & Platforms",
    title: "Dev Tools",
    items: ["Git", "GitHub", "Linux", "VS Code"],
  },
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

const CONTAINER = "w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16";

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
  const labelShadow = isDark ? "shadow-slate-900/60" : "shadow-slate-200/80";

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4"
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
                  className={`text-sm font-medium px-2.5 py-1 rounded-md shadow-md ${labelBg} ${labelShadow}`}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span
              animate={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
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
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const btn = "h-8 px-3 rounded-md text-base";
  return (
    <div className="inline-flex items-center gap-3 text-base">
      <Button
        variant="secondary"
        className={`${btn} ${mode === "light" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("light")}
      >
        <Sun className="w-5 h-5 mr-1" /> Light
      </Button>
      <Button
        variant="secondary"
        className={`${btn} ${mode === "dark" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("dark")}
      >
        <Moon className="w-5 h-5 mr-1" /> Dark
      </Button>
      <Button
        variant="secondary"
        className={`${btn} ${mode === "system" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("system")}
      >
        <Monitor className="w-5 h-5 mr-1" /> Auto
      </Button>
    </div>
  );
}

function ScrollProgress({ isDark }: { isDark: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        backgroundColor: isDark ? "#38bdf8" : "#0284c7",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60]"
    />
  );
}

interface SectionHeaderProps {
  number: string;
  title: string;
  isDark: boolean;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  isDark,
}) => (
  <div className="mb-12 sm:mb-16">
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="font-mono text-xs sm:text-sm tracking-[0.3em] text-sky-500 dark:text-sky-400 uppercase mb-4"
    >
      {number} — Section
    </motion.p>
    <div className="flex items-end gap-6">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{ transformOrigin: "0% 50%" }}
        className={`flex-1 h-px mb-4 ${
          isDark ? "bg-slate-700" : "bg-slate-300"
        }`}
      />
    </div>
  </div>
);

interface SectionProps {
  id: string;
  number: string;
  title: string;
  isDark: boolean;
  tinted?: boolean;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({
  id,
  number,
  title,
  isDark,
  tinted,
  children,
}) => {
  const bg = tinted
    ? isDark
      ? "bg-slate-900/40"
      : "bg-slate-50"
    : "";
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${bg}`}>
      <div className={CONTAINER}>
        <SectionHeader number={number} title={title} isDark={isDark} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.15 },
            },
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function categoryClasses(c: CategoryColor, isDark: boolean): string {
  const map: Record<CategoryColor, { dark: string; light: string }> = {
    blue: {
      dark: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      light: "bg-sky-50 text-sky-700 border-sky-200",
    },
    purple: {
      dark: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      light: "bg-violet-50 text-violet-700 border-violet-200",
    },
    amber: {
      dark: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      light: "bg-amber-50 text-amber-700 border-amber-200",
    },
    green: {
      dark: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      light: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    rose: {
      dark: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      light: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };
  return isDark ? map[c].dark : map[c].light;
}

function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) {
  const primaryLink =
    project.links?.demo || project.links?.code || project.links?.paper;
  const linkLabel = project.links?.paper
    ? "Paper"
    : project.links?.demo
    ? "Demo"
    : "GitHub";

  const cardBg = isDark
    ? "bg-slate-900/60 border-slate-800 hover:border-slate-600"
    : "bg-white border-slate-200 hover:border-slate-400";
  const tagPill = isDark
    ? "bg-slate-900/60 border-slate-700 text-slate-300"
    : "bg-slate-50 border-slate-200 text-slate-700";
  const featuredCls = isDark
    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
    : "bg-amber-50 text-amber-700 border-amber-200";
  const yearCls = isDark ? "text-slate-500" : "text-slate-400";
  const watermarkCls = isDark ? "text-slate-800/80" : "text-slate-100";
  const ghostBtn = isDark
    ? "bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800"
    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";

  return (
    <motion.div variants={itemVariants}>
      <div
        className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${cardBg}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none select-none absolute -top-4 right-6 font-serif font-bold text-[8rem] sm:text-[11rem] leading-none ${watermarkCls}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {project.featured && (
              <span
                className={`text-[10px] sm:text-xs font-mono font-semibold tracking-widest px-2 py-1 rounded border ${featuredCls}`}
              >
                FEATURED
              </span>
            )}
            <span
              className={`text-[10px] sm:text-xs font-mono font-semibold tracking-widest px-2 py-1 rounded border ${categoryClasses(
                project.categoryColor,
                isDark
              )}`}
            >
              {project.category}
            </span>
            <span
              className={`text-xs sm:text-sm font-mono ${yearCls} ml-1`}
            >
              {project.year}
            </span>

            {primaryLink && (
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                className={`ml-auto inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md border transition-colors ${ghostBtn}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                {linkLabel}
              </a>
            )}
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 max-w-3xl leading-tight">
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                className="hover:underline decoration-sky-500 underline-offset-4"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p
            className={`max-w-3xl leading-relaxed text-base sm:text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`font-mono text-xs px-2.5 py-1 rounded border ${tagPill}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillCard({
  cat,
  isDark,
}: {
  cat: SkillCategory;
  isDark: boolean;
}) {
  const cardBg = isDark
    ? "bg-slate-900/60 border-slate-800"
    : "bg-white border-slate-200";
  const labelCls = isDark ? "text-sky-400" : "text-sky-600";
  const tagPill = isDark
    ? "bg-slate-900/60 border-slate-700 text-slate-300"
    : "bg-slate-50 border-slate-200 text-slate-700";

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl border p-6 ${cardBg}`}
    >
      <p
        className={`text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-2 ${labelCls}`}
      >
        {cat.label}
      </p>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4 tracking-tight">
        {cat.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {cat.items.map((s) => (
          <span
            key={s}
            className={`font-mono text-xs px-2.5 py-1 rounded border ${tagPill}`}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceCard({
  e,
  isDark,
}: {
  e: (typeof EXPERIENCE)[number];
  isDark: boolean;
}) {
  const cardBg = isDark
    ? "bg-slate-900/60 border-slate-800"
    : "bg-white border-slate-200";
  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const subtle = isDark ? "text-slate-500" : "text-slate-500";

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}
    >
      <div className="flex items-start gap-3 mb-1">
        <Briefcase className="w-5 h-5 mt-2 shrink-0 text-sky-500" />
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
            {e.role}
          </h3>
          <p className={`text-base ${muted}`}>{e.org}</p>
        </div>
      </div>
      <p className={`font-mono text-xs ${subtle} ml-8 mb-3`}>{e.date}</p>
      <ul className={`list-disc pl-12 space-y-1.5 text-base ${muted}`}>
        {e.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </motion.div>
  );
}

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
    className="inline-flex items-center gap-2 text-base hover:text-sky-500 transition-colors"
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

  const mainClass = isDark
    ? "min-h-screen bg-slate-950 text-slate-100"
    : "min-h-screen bg-white text-slate-900";

  const headerClass = isDark
    ? "sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800"
    : "sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200";

  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const footerTextClass = isDark ? "text-slate-500" : "text-slate-500";

  return (
    <div className={`${mainClass} text-lg overflow-x-hidden`}>
      <ScrollProgress isDark={isDark} />
      <ScrollSpyNav isDark={isDark} />

      <header className={headerClass}>
        <nav className={`${CONTAINER} h-16 flex items-center justify-between text-lg`}>
          <a
            href="#home"
            className="font-serif font-semibold text-2xl tracking-tight"
          >
            {INFO.name}
          </a>
          <div className="hidden sm:flex items-center gap-6 text-base">
            <a href="#about" className="hover:text-sky-500 transition-colors">
              Biography
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
            <Button asChild className="rounded-md text-base px-3 py-1.5">
              <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-5 h-5 mr-2" /> Resume
              </a>
            </Button>
            <ThemeToggle mode={mode} setMode={setMode} />
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="py-20 sm:py-28">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-[1fr,240px] gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-sm tracking-[0.3em] text-sky-500 dark:text-sky-400 uppercase mb-4"
                >
                  Hi, my name is
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
                >
                  {INFO.name}.
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mt-4 ${muted}`}
                >
                  I build at the edge of ML & math.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className={`mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed ${muted}`}
                >
                  {INFO.headline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-md text-base px-4 py-2"
                  >
                    <a href={INFO.github} target="_blank" rel="noreferrer">
                      <Github className="w-5 h-5 mr-2" /> GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-md text-base px-4 py-2"
                  >
                    <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                    </a>
                  </Button>
                  <Button asChild className="rounded-md text-base px-4 py-2">
                    <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                      <Download className="w-5 h-5 mr-2" /> Resume
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`mt-8 text-base flex items-center gap-2 ${muted}`}
                >
                  <GraduationCap className="w-5 h-5 text-sky-500" />
                  <span>
                    B.S. in Computer Science & Mathematics · Purdue University
                    (Aug 2025 – May 2028)
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="justify-self-center md:justify-self-end"
              >
                <div
                  className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-xl border-2 ${
                    isDark ? "border-slate-700" : "border-slate-200"
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

        <Section id="about" number="01" title="Biography" isDark={isDark} tinted>
          <motion.div
            variants={itemVariants}
            className={`rounded-2xl border p-8 sm:p-10 leading-relaxed text-lg sm:text-xl max-w-4xl ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <p className={muted}>
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
            </p>
          </motion.div>
        </Section>

        <Section id="notes" number="02" title="Publications" isDark={isDark}>
          <motion.div variants={itemVariants}>
            <div
              className={`rounded-2xl border p-8 sm:p-10 max-w-4xl ${
                isDark
                  ? "bg-slate-900/60 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <p className="font-mono text-xs tracking-[0.2em] text-sky-500 dark:text-sky-400 uppercase mb-3">
                NAACL SRW 2025
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-4 leading-tight">
                TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language
                Models
              </h3>
              <p className={`text-base mb-5 ${muted}`}>
                Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu, O&apos;Brien,
                Sharma.
              </p>
              <a
                href="https://arxiv.org/abs/2503.11656"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base text-sky-500 hover:underline"
              >
                <ExternalLink className="w-5 h-5" /> Read on arXiv
              </a>
            </div>
          </motion.div>
        </Section>

        <Section id="projects" number="03" title="Projects" isDark={isDark} tinted>
          <div className="space-y-6">
            {PROJECTS.map((p, idx) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={idx}
                isDark={isDark}
              />
            ))}
          </div>
        </Section>

        <Section id="experience" number="04" title="Experience" isDark={isDark}>
          <div className="space-y-4 max-w-5xl">
            {EXPERIENCE.map((e, idx) => (
              <ExperienceCard key={idx} e={e} isDark={isDark} />
            ))}
          </div>
        </Section>

        <Section id="skills" number="05" title="Skills" isDark={isDark} tinted>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillCard key={cat.label} cat={cat} isDark={isDark} />
            ))}
          </div>
        </Section>

        <Section id="contact" number="06" title="Contact" isDark={isDark}>
          <motion.div variants={itemVariants}>
            <div
              className={`rounded-2xl border p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 max-w-5xl ${
                isDark
                  ? "bg-slate-900/60 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  Interested in collaborating?
                </p>
                <p className={`mt-2 text-base sm:text-lg ${muted}`}>
                  I'm always open to research, internships, or interesting
                  side-projects. Drop me a line.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button asChild className="rounded-md text-base px-4 py-2">
                  <a href={`mailto:${INFO.email}`}>
                    <Mail className="w-5 h-5 mr-2" /> Email
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-md text-base px-4 py-2"
                >
                  <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>

      <footer
        className={`border-t ${
          isDark ? "border-slate-800" : "border-slate-200"
        }`}
      >
        <div className={`${CONTAINER} py-8 text-base flex flex-wrap items-center justify-between gap-4`}>
          <div className="flex items-center gap-5">
            <LinkIcon href={INFO.github} title="GitHub">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </LinkIcon>
            <LinkIcon href={INFO.linkedin} title="LinkedIn">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </LinkIcon>
            <LinkIcon href={`mailto:${INFO.email}`} title="Email">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </LinkIcon>
          </div>
          <p className={footerTextClass}>
            © {new Date().getFullYear()} {INFO.name}. Built with React, Tailwind,
            and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
