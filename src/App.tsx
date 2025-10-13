import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  FileText,
  Download,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics Student",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline:
    "Purdue CS + Math · interests in ML reliability, medical imaging, and RAG systems.",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

type ProjectLinks = { code?: string; demo?: string; paper?: string };
interface Project {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLinks;
}

const PROJECTS: Project[] = [
  {
    title: "RAG Sports Bot",
    description:
      "Retrieval-augmented chatbot that answers NFL stat questions using a Python backend (FAISS) and a SwiftUI front end.",
    tags: ["Python", "FAISS", "RAG", "SwiftUI"],
    links: { code: "https://github.com/srihanvege" },
  },
  {
    title: "ContrastIQ",
    description:
      "CNN + pharmacokinetic priors to predict arterial-phase aortic peak enhancement timing in CT (mode error ~0.3s; ~97% improvement).",
    tags: ["PyTorch", "Medical Imaging", "CNN", "MONAI"],
  },
  {
    title: "TRUTH DECAY",
    description:
      "Benchmark + mitigation study on multi-turn sycophancy in LLMs; accepted to NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Prompting"],
    links: { paper: "https://arxiv.org/abs/2503.11656" },
  },
  {
    title: "REALestate.ai",
    description:
      "AI-driven real estate valuation and insight system built to automate and optimize property value estimation.",
    tags: ["Machine Learning", "Real Estate", "Automation"],
    links: { code: "https://github.com/S-K-23/REALestate.ai" },
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

const SKILLS = [
  "Python",
  "Java",
  "JavaScript",
  "HTML",
  "CSS",
  "Swift",
  "PyTorch",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "MONAI",
  "Git",
  "Linux",
  "LLMs",
  "FAISS",
];

const PANEL =
  "rounded-xl border bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm";
const PANEL_TEXT = "text-slate-800 dark:text-slate-100 text-lg sm:text-xl";
const MUTED = "text-slate-600 dark:text-slate-300 text-base sm:text-lg";
const SUBTLE = "text-slate-500 dark:text-slate-400 text-base";

type Mode = "light" | "dark" | "system";

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>("system");

  React.useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const toDark = mode === "dark" || (mode === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", toDark);
  }, [mode]);

  const btn = "h-9 px-3 rounded-md text-base";

  return (
    <div className="inline-flex items-center gap-3 text-base">
      <Button variant="secondary" className={`${btn} ${mode === "light" ? "ring-2 ring-sky-600" : ""}`} onClick={() => setMode("light")}>
        <Sun className="w-5 h-5 mr-1" /> Light
      </Button>
      <Button variant="secondary" className={`${btn} ${mode === "dark" ? "ring-2 ring-sky-600" : ""}`} onClick={() => setMode("dark")}>
        <Moon className="w-5 h-5 mr-1" /> Dark
      </Button>
      <Button variant="secondary" className={`${btn} ${mode === "system" ? "ring-2 ring-sky-600" : ""}`} onClick={() => setMode("system")}>
        <Monitor className="w-5 h-5 mr-1" /> Auto
      </Button>
    </div>
  );
}

interface SectionProps { id: string; title: string; children: React.ReactNode; }
const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-8 ${PANEL_TEXT}`}>
      {title}
    </motion.h2>
    {children}
  </section>
);

interface LinkIconProps { href: string; title?: string; children: React.ReactNode; }
const LinkIcon: React.FC<LinkIconProps> = ({ href, children, title }) => (
  <a href={href} target="_blank" rel="noreferrer" title={title} className="inline-flex items-center gap-2 text-base text-sky-700 hover:underline dark:text-sky-400">{children}</a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 text-lg">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <nav className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between text-lg">
          <a href="#home" className="font-semibold text-xl tracking-tight">{INFO.name}</a>
          <div className="hidden sm:flex items-center gap-8 text-base">
            <a href="#about" className="hover:opacity-80">Biography</a>
            <a href="#skills" className="hover:opacity-80">Interests</a>
            <a href="#notes" className="hover:opacity-80">Notes</a>
            <a href="#projects" className="hover:opacity-80">Past Projects</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <Button asChild className="rounded-md text-base px-4 py-2">
              <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-5 h-5 mr-2" /> Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        <Section id="projects" title="Past Projects">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, idx) => (
              <Card key={idx} className={PANEL}>
                <CardHeader>
                  <CardTitle className={`flex items-start justify-between gap-3 ${PANEL_TEXT}`}>
                    <a href={p.links?.code || p.links?.demo || p.links?.paper || "#"} target="_blank" rel="noreferrer" className="hover:underline text-sky-700 dark:text-sky-400">
                      {p.title}
                    </a>
                    <Badge>Project</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className={`text-base ${MUTED}`}>{p.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100">{t}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
