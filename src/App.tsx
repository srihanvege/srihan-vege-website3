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
  MapPin,
} from "lucide-react";
import { Button } from "./components/ui/button";

const INFO = {
  name: "Srihan Vege",
  role: "CS & Mathematics",
  school: "Purdue University",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline:
    "Purdue CS + Math student interested in ML reliability and high-powered computing. Recent work spans LLM evaluation, medical imaging, and applied ML.",
  resumeUrl: "/srihan_vege_resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

const INTERESTS = [
  "Machine Learning",
  "LLM Evaluation",
  "Medical Imaging",
  "Applied Mathematics",
];

const EDUCATION = [
  {
    degree: "B.S. in Computer Science & Mathematics",
    school: "Purdue University",
    date: "Aug 2025 – May 2028",
  },
];

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

const CONTAINER = "w-full max-w-6xl mx-auto px-6 sm:px-10";

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
  <div className="mb-8">
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="font-mono text-xs tracking-[0.25em] text-sky-500 dark:text-sky-400 uppercase mb-2"
    >
      {number}
    </motion.p>
    <div className="flex items-center gap-4">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{ transformOrigin: "0% 50%" }}
        className={`flex-1 h-px ${
          isDark ? "bg-slate-800" : "bg-slate-200"
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
      ? "bg-slate-900/30"
      : "bg-slate-50"
    : "";
  return (
    <section id={id} className={`scroll-mt-24 py-14 sm:py-16 ${bg}`}>
      <div className={CONTAINER}>
        <SectionHeader number={number} title={title} isDark={isDark} />
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
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
  const ghostBtn = isDark
    ? "bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800"
    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";

  return (
    <motion.div variants={itemVariants}>
      <div
        className={`relative overflow-hidden rounded-xl border transition-colors duration-300 ${cardBg}`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-mono ${yearCls} mr-1`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.featured && (
              <span
                className={`text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border ${featuredCls}`}
              >
                FEATURED
              </span>
            )}
            <span
              className={`text-[10px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border ${categoryClasses(
                project.categoryColor,
                isDark
              )}`}
            >
              {project.category}
            </span>
            <span className={`text-xs font-mono ${yearCls}`}>
              · {project.year}
            </span>

            {primaryLink && (
              <a
                href={primaryLink}
                target="_blank"
                rel="noreferrer"
                className={`ml-auto inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${ghostBtn}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                {linkLabel}
              </a>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight mb-2 max-w-3xl">
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
            className={`max-w-3xl leading-relaxed text-base ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`font-mono text-xs px-2 py-0.5 rounded border ${tagPill}`}
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
      className={`rounded-xl border p-5 ${cardBg}`}
    >
      <p
        className={`text-[10px] font-mono font-semibold tracking-[0.2em] uppercase mb-1.5 ${labelCls}`}
      >
        {cat.label}
      </p>
      <h3 className="text-lg font-semibold mb-3 tracking-tight">
        {cat.title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {cat.items.map((s) => (
          <span
            key={s}
            className={`font-mono text-xs px-2 py-0.5 rounded border ${tagPill}`}
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
      className={`rounded-xl border p-5 sm:p-6 ${cardBg}`}
    >
      <div className="flex items-start gap-3 mb-1">
        <Briefcase className="w-5 h-5 mt-1 shrink-0 text-sky-500" />
        <div>
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {e.role}
          </h3>
          <p className={`text-sm ${muted}`}>{e.org}</p>
        </div>
      </div>
      <p className={`font-mono text-xs ${subtle} ml-8 mb-2`}>{e.date}</p>
      <ul className={`list-disc pl-12 space-y-1 text-sm ${muted}`}>
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
    ? "sticky top-0 z-50 backdrop-blur bg-slate-950/80"
    : "sticky top-0 z-50 backdrop-blur bg-white/80";

  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const subtle = isDark ? "text-slate-500" : "text-slate-500";
  const cardBg = isDark
    ? "bg-slate-900/60 border-slate-800"
    : "bg-white border-slate-200";

  return (
    <div className={`${mainClass} text-base overflow-x-hidden`}>
      <ScrollProgress isDark={isDark} />
      <ScrollSpyNav isDark={isDark} />

      <header className={headerClass}>
        <nav className={`${CONTAINER} h-14 flex items-center justify-between`}>
          <a href="#home" className="font-serif font-semibold text-xl tracking-tight">
            {INFO.name}
          </a>
          <div className="hidden sm:flex items-center gap-5 text-sm">
            <a href="#about" className="hover:text-sky-500 transition-colors">
              Biography
            </a>
            <a href="#projects" className="hover:text-sky-500 transition-colors">
              Projects
            </a>
            <a href="#experience" className="hover:text-sky-500 transition-colors">
              Experience
            </a>
            <a href="#skills" className="hover:text-sky-500 transition-colors">
              Skills
            </a>
            <Button asChild className="rounded-md text-sm h-8 px-3">
              <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-4 h-4 mr-1.5" /> Resume
              </a>
            </Button>
            <ThemeToggle mode={mode} setMode={setMode} />
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-[200px,1fr] gap-8 sm:gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center md:items-start"
              >
                <div
                  className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-2 ${
                    isDark ? "border-slate-700" : "border-slate-200"
                  }`}
                >
                  <img
                    src="/1753369044349.jpeg"
                    alt="Srihan Vege"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-center md:text-left">
                  {INFO.name}
                </h1>
                <p className={`text-sm ${muted} text-center md:text-left`}>
                  {INFO.role}
                </p>
                <a
                  href="https://www.purdue.edu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-sky-500 hover:underline text-center md:text-left"
                >
                  {INFO.school}
                </a>
                <div className={`mt-2 flex items-center gap-1 text-xs ${subtle}`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{INFO.location}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${INFO.email}`}
                    title="Email"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={INFO.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Resume"
                    className="text-slate-500 hover:text-sky-500 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="font-mono text-xs tracking-[0.25em] text-sky-500 dark:text-sky-400 uppercase mb-2">
                  Hi, my name is
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
                  {INFO.name}.
                </h2>
                <p className={`mt-3 text-lg sm:text-xl ${muted}`}>
                  I build at the edge of ML &amp; math.
                </p>
                <p className={`mt-4 max-w-2xl leading-relaxed ${muted}`}>
                  {INFO.headline}
                </p>

                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-mono font-semibold tracking-[0.2em] text-sky-500 dark:text-sky-400 uppercase mb-2">
                      Interests
                    </p>
                    <ul className={`space-y-1 text-sm ${muted} list-disc pl-5`}>
                      {INTERESTS.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono font-semibold tracking-[0.2em] text-sky-500 dark:text-sky-400 uppercase mb-2">
                      Education
                    </p>
                    <ul className="space-y-2">
                      {EDUCATION.map((ed) => (
                        <li key={ed.degree} className="flex items-start gap-2">
                          <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" />
                          <div>
                            <p className="text-sm font-medium">{ed.degree}</p>
                            <p className={`text-xs ${subtle}`}>
                              {ed.school} · {ed.date}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="about" number="01" title="Biography" isDark={isDark} tinted>
          <motion.div
            variants={itemVariants}
            className={`rounded-xl border p-6 leading-relaxed max-w-4xl ${cardBg}`}
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
            <div className={`rounded-xl border p-6 max-w-4xl ${cardBg}`}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-sky-500 dark:text-sky-400 uppercase mb-2">
                NAACL SRW 2025
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight mb-2 leading-snug">
                TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language
                Models
              </h3>
              <p className={`text-sm mb-3 ${muted}`}>
                Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu,
                O&apos;Brien, Sharma.
              </p>
              <a
                href="https://arxiv.org/abs/2503.11656"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-sky-500 hover:underline"
              >
                <ExternalLink className="w-4 h-4" /> Read on arXiv
              </a>
            </div>
          </motion.div>
        </Section>

        <Section id="projects" number="03" title="Projects" isDark={isDark} tinted>
          <div className="space-y-4">
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
          <div className="space-y-3 max-w-5xl">
            {EXPERIENCE.map((e, idx) => (
              <ExperienceCard key={idx} e={e} isDark={isDark} />
            ))}
          </div>
        </Section>

        <Section id="skills" number="05" title="Skills" isDark={isDark} tinted>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillCard key={cat.label} cat={cat} isDark={isDark} />
            ))}
          </div>
        </Section>

        <Section id="contact" number="06" title="Contact" isDark={isDark}>
          <motion.div variants={itemVariants}>
            <div
              className={`rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-5xl ${cardBg}`}
            >
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">
                  Interested in collaborating?
                </p>
                <p className={`mt-1 text-sm ${muted}`}>
                  I'm always open to research, internships, or interesting
                  side-projects. Drop me a line.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button asChild className="rounded-md text-sm h-9 px-3">
                  <a href={`mailto:${INFO.email}`}>
                    <Mail className="w-4 h-4 mr-1.5" /> Email
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-md text-sm h-9 px-3"
                >
                  <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="w-4 h-4 mr-1.5" /> LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>

      <footer className={`border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <div className={`${CONTAINER} py-6 text-sm flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-4">
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
          <p className={subtle}>
            © {new Date().getFullYear()} {INFO.name}.
          </p>
        </div>
      </footer>
    </div>
  );
}
