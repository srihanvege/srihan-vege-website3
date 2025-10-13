import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap, FileText, Download, Sun, Moon, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics Student",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline: "Purdue CS + Math · interests in ML reliability, medical imaging, and RAG systems.",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

const PROJECTS = [
  {
    title: "RAG Sports Bot",
    description: "Retrieval-augmented chatbot that answers NFL stat questions using a Python backend (FAISS) and a SwiftUI front end.",
    tags: ["Python", "FAISS", "RAG", "SwiftUI"],
    links: { code: "https://github.com/srihanvege" },
  },
  {
    title: "ContrastIQ",
    description: "CNN + pharmacokinetic priors to predict arterial-phase aortic peak enhancement timing in CT (mode error ~0.3s; ~97% improvement).",
    tags: ["PyTorch", "Medical Imaging", "CNN", "MONAI"],
  },
  {
    title: "TRUTH DECAY",
    description: "Benchmark + mitigation study on multi-turn sycophancy in LLMs; accepted to NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Prompting"],
    links: { paper: "https://arxiv.org/abs/2503.11656" },
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
  "Python","Java","JavaScript","HTML","CSS","Swift","PyTorch","NumPy","Pandas","Matplotlib","MONAI","Git","Linux","LLMs","FAISS"
];

function ThemeToggle() {
  const [mode, setMode] = React.useState("system");

  React.useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const toDark = mode === "dark" || (mode === "system" && prefersDark);
    root.classList.toggle("dark", toDark);
  }, [mode]);

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "light" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("light")}>
        <Sun className="w-4 h-4 mr-1" /> Light
      </Button>
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "dark" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("dark")}>
        <Moon className="w-4 h-4 mr-1" /> Dark
      </Button>
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "system" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("system")}>
        <Monitor className="w-4 h-4 mr-1" /> Auto
      </Bu
