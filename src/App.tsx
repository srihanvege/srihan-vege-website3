import React from "react";
import { motion } from "framer-motion";
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
    "Purdue CS + Math · Interests in ML reliability and high-powered computing.",
  resumeUrl: "/srihan_vege_resume.pdf",
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
    links: { code: "https://github.com/srihanvege/RAG-Bot" },
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

type Mode = "light" | "dark" | "system";

function ThemeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const base =
    "h-8 w-8 flex items-center justify-center rounded-full text-sm transition";

  return (
    <div className="inline-flex items-center rounded-full border border-slate-300/60 bg-white/70 backdrop-blur px-1">
      <button
        type="button"
        onClick={() => setMode("light")}
        className={`${base} ${
          mode === "light"
            ? "bg-slate-900 text-slate-50"
            : "text-slate-500"
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => setMode("dark")}
        className={`${base} ${
          mode === "dark"
            ? "bg-slate-900 text-slate-50"
            : "text-slate-500"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => setMode("system")}
        className={`${base} ${
          mode === "system"
            ? "bg-slate-900 text-slate-50"
            : "text-slate-500"
        }`}
        aria-label="System theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}

const PANEL_CARD_CLASS = "rounded-xl border shadow-sm";
const PANEL_TEXT = "text-lg sm:text-xl";
const MUTED = "text-base sm:text-lg opacity-80";
const SUBTLE = "text-base opacity-75";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-20 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-6"
  >
    <motion.h2
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-4 ${PANEL_TEXT}`}
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

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
    className="inline-flex items-center gap-2 text-base"
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
    ? "min-h-screen bg-slate-950 text-slate-100 text-lg"
    : "min-h-screen bg-white text-slate-900 text-lg";

  const headerClass = isDark
    ? "sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-900/70"
    : "sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200/70";

  const footerTextClass = isDark ? "text-slate-400" : "text-slate-500";

  const cardStyle: React.CSSProperties = isDark
    ? {
        backgroundColor: "#020617",
        borderColor: "#374151",
        color: "#e5e7eb",
      }
    : {
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        color: "#020617",
      };

  return (
    <div className={mainClass}>
      <header className={headerClass}>
        <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 h-14 flex items-center justify-between text-sm sm:text-base">
          {/* Left: minimal mono mark */}
          <a
            href="#home"
            className="font-mono tracking-tight text-sm sm:text-base opacity-80 hover:opacity-100 transition"
          >
            srihan.vege
          </a>

          {/* Right: slim nav + theme + resume */}
          <div className="hidden sm:flex items-center gap-5">
            <a
              href="#projects"
              className="opacity-70 hover:opacity-100 transition"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="opacity-70 hover:opacity-100 transition"
            >
              Experience
            </a>
            <a
              href="#notes"
              className="opacity-70 hover:opacity-100 transition"
            >
              Publications
            </a>

            <a
              href={INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300/70 px-3 py-1.5 text-xs font-medium opacity-80 hover:opacity-100 hover:bg-slate-900 hover:text-slate-50 transition"
            >
              <Download className="w-3 h-3" />
              Resume
            </a>

            <ThemeToggle mode={mode} setMode={setMode} />
          </div>
        </nav>
      </header>

      <main>
        {}
        <section
          id="home"
          className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 min-h-[calc(100vh-4rem)] flex items-center justify-center"
        >
          <div className="max-w-3xl text-center space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm sm:text-base opacity-60"
            >
              {INFO.location} · {INFO.role}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-mono text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
            >
              Experiment at the speed of thought.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm sm:text-base opacity-80 leading-relaxed max-w-2xl mx-auto"
            >
              I&apos;m {INFO.name}, a Purdue CS & Math student interested in ML
              reliability and high-performance computing. I work on
              retrieval-based systems, medical imaging models, and multi-turn
              LLM evaluation.
            </motion.p>

            {}
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <div className="w-full sm:w-80 flex items-center gap-2 rounded-md border border-slate-300/60 px-3 py-2 bg-white/5 backdrop-blur-sm">
                <Mail className="w-5 h-5 opacity-70" />
                <input
                  type="email"
                  defaultValue={INFO.email}
                  placeholder="you@domain.com"
                  className="w-full bg-transparent outline-none text-base placeholder:opacity-60"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto rounded-md text-base px-5 py-2.5"
                asChild
              >
                <a href={`mailto:${INFO.email}`}>Let&apos;s talk</a>
              </Button>
            </motion.form>

            <p className="text-sm opacity-60">
              Open to research, internships, and collaborations in ML systems &
              eval.
            </p>
          </div>
        </section>

        <Section id="about" title="Biography">
          <Card className={PANEL_CARD_CLASS} style={cardStyle}>
            <CardContent className={`p-4 leading-relaxed ${PANEL_TEXT}`}>
              I recently started at Purdue University (CS & Math). I enjoy
              building things at the intersection of ML reliability and usable
              products. Recent projects include a sports Q&A bot with
              retrieval-augmented generation and research on mitigating
              multi-turn sycophancy in LLMs. If any of this connects to your
              work, feel free to reach out at{" "}
              <a
                className="text-sky-700 hover:underline"
                href={`mailto:${INFO.email}`}
              >
                {INFO.email}
              </a>
              .
            </CardContent>
          </Card>
        </Section>

        <Section id="notes" title="Publications">
          <div className="grid sm:grid-cols-2 gap-3">
            <Card className={PANEL_CARD_CLASS} style={cardStyle}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-xl sm:text-2xl ${PANEL_TEXT}`}>
                  TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language
                  Models
                </CardTitle>
                <p className={`text-base ${SUBTLE}`}>
                  Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu,
                  O&apos;Brien, Sharma. NAACL SRW 2025.
                </p>
              </CardHeader>
              <CardContent className="pt-1">
                <a
                  className="inline-flex items-center gap-2 text-base text-sky-700 hover:underline"
                  href="https://arxiv.org/abs/2503.11656"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-5 h-5" /> arXiv
                </a>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="projects" title="Past Projects">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECTS.map((p, idx) => (
              <Card key={idx} className={PANEL_CARD_CLASS} style={cardStyle}>
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`flex items-start justify-between gap-2 ${PANEL_TEXT}`}
                  >
                    <a
                      href={
                        p.links?.demo || p.links?.code || p.links?.paper || "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-sky-700"
                    >
                      {p.title}
                    </a>
                    <Badge>Project</Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className={`text-base ${MUTED}`}>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-2">
            {EXPERIENCE.map((e, idx) => (
              <Card key={idx} className={PANEL_CARD_CLASS} style={cardStyle}>
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`flex items-center gap-2 text-xl ${PANEL_TEXT}`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>
                      {e.role} · {e.org}
                    </span>
                  </CardTitle>
                  <p className={`text-base ${SUBTLE}`}>{e.date}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className={`list-disc pl-6 space-y-1 ${PANEL_TEXT}`}>
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <Card className={PANEL_CARD_CLASS} style={cardStyle}>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-base"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="contact" title="Contact">
          <Card className={PANEL_CARD_CLASS} style={cardStyle}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className={PANEL_TEXT}>Interested in collaborating?</p>
                <p className={`text-base ${MUTED}`}>Feel free to reach out.</p>
              </div>

              <div className="flex gap-3">
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
            </CardContent>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-slate-200 mt-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-6 text-base flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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
            © {new Date().getFullYear()} {INFO.name}. This site is inspired by
            clean academic profiles.
          </p>
        </div>
      </footer>
    </div>
  );
}
