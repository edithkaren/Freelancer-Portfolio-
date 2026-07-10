import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Github, Linkedin, Instagram, ArrowRight, Globe,
  ShoppingCart, User, CheckCircle, Menu, X, Sparkles,
  Bot, Layers, Rocket, Zap, ExternalLink, Send, Loader2
} from "lucide-react";

// ── Custom platform icons ─────────────────────────────────────────────────────

const VercelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 22.525H0l12-21.05 12 21.05z" />
  </svg>
);

const ContraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M16.5 8.5A6 6 0 1 0 16.5 15.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: Globe,        title: "Full-Stack Website Development",  desc: "End-to-end web applications built with modern frameworks, scalable architecture, and performance-first engineering." },
  { icon: Sparkles,     title: "Premium 3D Animated Websites",    desc: "Immersive digital experiences with GSAP & Three.js animations that captivate and convert visitors." },
  { icon: Rocket,       title: "Startup MVP Development",         desc: "Launch fast with a polished, investor-ready MVP designed to validate your idea and drive early traction." },
  { icon: Bot,          title: "AI-Powered Web Applications",     desc: "Intelligent apps powered by OpenAI, Gemini, and Claude with smart automations and AI-driven UX built in." },
  { icon: ShoppingCart, title: "E-Commerce Stores",               desc: "High-converting online stores with seamless UX, secure payments, and real-time inventory management." },
  { icon: User,         title: "Portfolio Websites",              desc: "Stunning personal portfolios that showcase your best work and attract the right opportunities." },
  { icon: Layers,       title: "AI SaaS Platforms",               desc: "Scalable software-as-a-service with AI features, subscription billing, and user management dashboards." },
  { icon: Zap,          title: "Business Automation Solutions",   desc: "Automate repetitive workflows with AI and streamline operations to save time and reduce overhead." },
];

const PROJECTS = [
  {
    title: "Avraksh- Startup Portfolio ",
    desc: "An AI-Based startup agency portfolio, automated reporting, and intelligent insights for SaaS businesses.",
    image: "F:/techrudra/freelancing-portfolio/img/animatedportfolio.png",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind CSS"],
    live: "https://animated-portfolio-rp.vercel.app/",
    github: "https://github.com/edithkaren",
    tag: "AI SaaS",
    tagColor: "#06b6d4",
  },
  {
   title: "UniStay- Student Accomodation Platform",
    desc: "Full-stack student, professionals room, pg, flats finding website in any city in india with Stripe payments, real-time updation of flats, rooms, pg's, hostels, admin dashboard, and an AI-powered product recommendation engine.",
    image: "F:/techrudra/freelancing-portfolio/img/unistay.png",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
    live: "https://unistay-app.vercel.app/",
    github: "https://github.com/edithkaren/Unistay-App",
    tag: "E-Commerce",
    tagColor: "#f59e0b",
  },
  {
    title: "GitCity",
    desc: "Git City Transforms every github profile into a unique pixel art building. The more you Contribute, the taller yours building grows.",
    image: "F:/techrudra/freelancing-portfolio/img/gitcity.png",
    tech: ["Next.js", "Supabase", "Stripe", "TypeScript", "Resend"],
    live: "https://git-city-ivory.vercel.app",
    github: "https://github.com/edithkaren/Git-City",
    tag: "Startup MVP",
    tagColor: "#7c3aed",
  },
  {
    title: "RP- 3D  Creative Logo Designer Portfolio",
    desc: "Immersive 3D portfolio experience with WebGL animations, scroll-driven storytelling, and premium motion design built for a creative agency.",
    image: "F:/techrudra/freelancing-portfolio/img/logodesign.png",
    tech: ["Three.js", "GSAP", "React", "WebGL", "Framer Motion"],
    live: "https://logo-designer-portfolio.vercel.app/",
    github: "https://github.com/edithkaren/logo-designer-portfolio-",
    tag: "3D Website",
    tagColor: "#ec4899",
  },
];

const TECH_ROW1 = ["Next.js", "React", "Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "Firebase", "Supabase", "Tailwind CSS", "Vercel"];
const TECH_ROW2 = ["OpenAI GPT-4o", "Google Gemini", "Anthropic Claude", "AI Chatbots", "Vector Search", "Content Generation", "Workflow Automation", "AI Assistants", "RAG Systems", "LangChain"];

const INDUSTRIES = [
  "AI Startups", "SaaS Companies", "Healthcare", "Finance & Fintech",
  "Education", "E-commerce", "Real Estate", "Restaurants",
  "Creative Agencies", "Personal Brands", "Small Businesses", "Enterprise Teams",
];

const PRICING = [
  {
    name: "Starter",     price: "$300",   tag: "starter",
    desc: "Perfect for individuals and small projects",
    features: ["Responsive Design", "Up to 5 Pages", "Basic SEO Setup", "Contact Form", "1 Month Support"],
    glow: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.3)",
  },
  {
    name: "Business",    price: "$700",   tag: "business",
    desc: "Ideal for growing businesses",
    features: ["Custom UI/UX Design", "Up to 10 Pages", "Advanced SEO", "CMS Integration", "3 Months Support"],
    glow: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)",
  },
  {
    name: "Premium 3D",  price: "$1,500", tag: "popular",
    desc: "Immersive 3D animated experience",
    features: ["3D Animations & GSAP", "Three.js Integration", "Custom Interactions", "Performance Optimized", "6 Months Support"],
    glow: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.5)",
    popular: true,
  },
  {
    name: "AI Business", price: "$2,000", tag: "ai",
    desc: "AI-powered business website",
    features: ["AI Chatbot Integration", "Content Generation", "Smart Search", "Analytics Dashboard", "6 Months Support"],
    glow: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.4)",
  },
  {
    name: "Startup MVP", price: "$3,500", tag: "mvp",
    desc: "Full-stack product launch ready",
    features: ["Full-Stack Application", "Auth & Payments", "AI Feature Integration", "Admin Dashboard", "1 Year Support"],
    glow: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.4)",
  },
];

const BENEFITS = [
  "Modern UI/UX & Responsive Design",
  "Fast & Scalable Full-Stack Development",
  "AI-Powered Features & Automation",
  "Premium Animations & 3D Experiences",
  "SEO & Performance Optimization",
  "Clean Code & Ongoing Support",
];

const SOCIALS = [
  { name: "GitHub",    icon: () => <Github size={20} />,    url: "#", accent: "#e2e8f0", glow: "rgba(226,232,240,0.15)" },
  { name: "LinkedIn",  icon: () => <Linkedin size={20} />,  url: "#", accent: "#60a5fa", glow: "rgba(96,165,250,0.15)" },
  { name: "Instagram", icon: () => <Instagram size={20} />, url: "#", accent: "#f472b6", glow: "rgba(244,114,182,0.15)" },
  { name: "Twitter",   icon: () => <XIcon />,               url: "#", accent: "#38bdf8", glow: "rgba(56,189,248,0.15)" },
  { name: "Vercel",    icon: () => <VercelIcon />,           url: "#", accent: "#e2e8f0", glow: "rgba(226,232,240,0.15)" },
  { name: "Contra",    icon: () => <ContraIcon />,           url: "#", accent: "#fb923c", glow: "rgba(251,146,60,0.15)" },
];

// ── Shared UI helpers ─────────────────────────────────────────────────────────

function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }} />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
    </div>
  );
}

function HeroOrb() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 480, height: 480, perspective: "900px" }}>
      <div className="absolute" style={{ width: 280, height: 280, background: "radial-gradient(circle, rgba(6,182,212,0.25), rgba(124,58,237,0.15), transparent 70%)", filter: "blur(55px)" }} />
      <div className="absolute z-10 rounded-full" style={{ width: 148, height: 148, background: "radial-gradient(circle at 33% 28%, #22d3ee 0%, #7c3aed 55%, #030712 100%)", boxShadow: "0 0 45px rgba(6,182,212,0.55), 0 0 90px rgba(124,58,237,0.28), inset 0 0 28px rgba(6,182,212,0.18)" }} />
      <div className="absolute z-20 rounded-full" style={{ width: 36, height: 36, background: "radial-gradient(circle, rgba(255,255,255,0.75) 0%, transparent 80%)", transform: "translate(-24px, -24px)", filter: "blur(5px)" }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotateX(72deg)", transformStyle: "preserve-3d" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="relative rounded-full" style={{ width: 264, height: 264, border: "1.5px solid rgba(6,182,212,0.55)" }}>
          <div className="absolute rounded-full bg-cyan-400" style={{ width: 10, height: 10, top: -5, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 10px #06b6d4, 0 0 20px rgba(6,182,212,0.5)" }} />
          <div className="absolute rounded-full bg-cyan-300/60" style={{ width: 5, height: 5, bottom: -3, left: "30%", boxShadow: "0 0 6px #06b6d4" }} />
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotateX(48deg) rotateY(22deg)", transformStyle: "preserve-3d" }}>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 11, repeat: Infinity, ease: "linear" }} className="relative rounded-full" style={{ width: 370, height: 370, border: "1px solid rgba(124,58,237,0.45)" }}>
          <div className="absolute rounded-full bg-purple-400" style={{ width: 8, height: 8, top: -4, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 10px #7c3aed" }} />
        </motion.div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotateX(22deg) rotateY(-35deg)", transformStyle: "preserve-3d" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="rounded-full" style={{ width: 450, height: 450, border: "1px solid rgba(139,92,246,0.18)" }} />
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: i % 2 === 0 ? 6 : 4, height: i % 2 === 0 ? 6 : 4, background: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#7c3aed" : "#a78bfa", boxShadow: `0 0 8px ${i % 2 === 0 ? "#06b6d4" : "#7c3aed"}`, top: `${12 + i * 13}%`, left: `${8 + i * 15}%` }} animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }} />
      ))}
      {[{ text: "AI Ready", top: "10%", right: "5%" }, { text: "Full-Stack", bottom: "18%", left: "0%" }, { text: "3D Motion", top: "55%", right: "2%" }].map(({ text, ...pos }) => (
        <motion.div key={text} className="absolute font-code text-[10px] tracking-widest uppercase" style={{ ...pos, color: "rgba(6,182,212,0.6)" }} animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}>
          {text}
        </motion.div>
      ))}
    </div>
  );
}

function SectionBadge({ text }: { text: string }) {
  return (
    <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 rounded-full text-[11px] font-code tracking-widest uppercase border mb-5" style={{ borderColor: "rgba(6,182,212,0.3)", color: "#06b6d4", background: "rgba(6,182,212,0.05)" }}>
      {text}
    </motion.span>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Contact Modal ─────────────────────────────────────────────────────────────

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const subject = `Project Inquiry — ${form.service || "General"} | ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget}`,
      ``,
      `Message:`,
      form.message,
    ].join("\n");
    setTimeout(() => {
      window.open(`mailto:hello@techrudra.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", service: "", budget: "", message: "" });
    }, 350);
  };

  const field: React.CSSProperties = {
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(6,182,212,0.18)",
    color: "#e2e8f0",
    borderRadius: "0.75rem",
    padding: "0.72rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    fontFamily: "'Rajdhani', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(3,7,18,0.88)", backdropFilter: "blur(14px)" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ pointerEvents: "none" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
              style={{ background: "rgba(10,14,26,0.98)", borderColor: "rgba(6,182,212,0.22)", boxShadow: "0 0 70px rgba(6,182,212,0.1), 0 0 130px rgba(124,58,237,0.08)", pointerEvents: "all" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #06b6d4, #7c3aed, transparent)" }} />

              {/* Header */}
              <div className="flex items-start justify-between px-7 pt-7 pb-5">
                <div>
                  <h2 className="font-display font-bold text-xl text-white leading-tight">Start a Project</h2>
                  <p className="text-muted-foreground text-sm font-body mt-1">Fill the form — {"I'll"} reply within 24 hours</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all flex-shrink-0"
                  style={{ borderColor: "rgba(6,182,212,0.2)", color: "#64748b" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.45)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.2)"; }}
                >
                  <X size={15} />
                </button>
              </div>

              <div className="px-7 pb-7">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-code tracking-widest uppercase mb-1.5" style={{ color: "#64748b" }}>Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          style={field}
                          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(6,182,212,0.18)")}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-code tracking-widest uppercase mb-1.5" style={{ color: "#64748b" }}>Email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          style={field}
                          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(6,182,212,0.18)")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-code tracking-widest uppercase mb-1.5" style={{ color: "#64748b" }}>Service *</label>
                        <select
                          required
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          style={{ ...field, cursor: "pointer" }}
                          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(6,182,212,0.18)")}
                        >
                          <option value="">Select…</option>
                          <option>Full-Stack Development</option>
                          <option>Premium 3D Website</option>
                          <option>AI-Powered Web App</option>
                          <option>Startup MVP</option>
                          <option>E-Commerce Store</option>
                          <option>AI SaaS Platform</option>
                          <option>Business Automation</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-code tracking-widest uppercase mb-1.5" style={{ color: "#64748b" }}>Budget *</label>
                        <select
                          required
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          style={{ ...field, cursor: "pointer" }}
                          onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(6,182,212,0.18)")}
                        >
                          <option value="">Select…</option>
                          <option>$300 – $700</option>
                          <option>$700 – $1,500</option>
                          <option>$1,500 – $3,500</option>
                          <option>$3,500 – $7,000</option>
                          <option>$7,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-code tracking-widest uppercase mb-1.5" style={{ color: "#64748b" }}>Project Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your project, goals, timeline, and any specific requirements..."
                        style={{ ...field, resize: "none" }}
                        onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(6,182,212,0.18)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-body font-semibold text-white transition-all disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 28px rgba(6,182,212,0.28)" }}
                    >
                      {submitting ? (
                        <><Loader2 size={15} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={14} /> Send Inquiry</>
                      )}
                    </button>

                    <p className="text-center text-xs font-code" style={{ color: "#475569" }}>
                      Or email directly:{" "}
                      <a href="mailto:avrakshai2604@gmail.com" style={{ color: "#06b6d4" }} className="hover:underline">
                        avrakshai2604@gmail.com
                      </a>
                    </p>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(6,182,212,0.1)", border: "2px solid rgba(6,182,212,0.45)", boxShadow: "0 0 30px rgba(6,182,212,0.2)" }}>
                      <CheckCircle size={28} style={{ color: "#06b6d4" }} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6 max-w-xs mx-auto">
                      Your email client has opened with your inquiry pre-filled. {"I'll"} get back to you within 24 hours. 🚀
                    </p>
                    <button onClick={handleClose} className="px-8 py-3 rounded-xl text-sm font-body font-semibold text-white" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>
                      Back to Portfolio
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Services",   href: "#services"   },
    { label: "Projects",   href: "#projects"   },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Pricing",    href: "#pricing"    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0%,100% { background-position: 0% center; }
          50%      { background-position: 100% center; }
        }
        .marquee-fwd { animation: marquee 32s linear infinite; }
        .marquee-rev { animation: marquee 38s linear infinite reverse; }
        .font-display { font-family: 'Orbitron', sans-serif; }
        .font-body    { font-family: 'Rajdhani', sans-serif; }
        .font-code    { font-family: 'JetBrains Mono', monospace; }
        .gradient-text {
          background: linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #06b6d4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }
        select option { background: #0d1117; color: #e2e8f0; }
        *::-webkit-scrollbar { width: 3px; }
        *::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.35); border-radius: 3px; }
        * { scrollbar-width: thin; scrollbar-color: rgba(6,182,212,0.35) transparent; }
      `}</style>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "border-b" : ""}`}
        style={{ background: scrolled ? "rgba(3,7,18,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderColor: "rgba(6,182,212,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 18px rgba(6,182,212,0.5)" }}>
              <span className="text-white text-xs font-display font-black">T</span>
            </div>
            <span className="font-display font-bold text-[17px] tracking-wide">
              <span className="text-white">Techrudra</span>
              <span style={{ color: "#06b6d4" }}>.ai</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="text-sm font-body font-medium tracking-wide transition-colors" style={{ color: "#64748b" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#06b6d4")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-2.5 rounded-lg text-sm font-body font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 22px rgba(6,182,212,0.28)" }}
            >
              Hire Me
            </button>
          </div>

          <button className="md:hidden transition-colors" style={{ color: "#64748b" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-b" style={{ background: "rgba(3,7,18,0.97)", backdropFilter: "blur(20px)", borderColor: "rgba(6,182,212,0.1)" }}>
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className="text-sm font-body text-muted-foreground hover:text-cyan-400 transition-colors" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <button onClick={() => { setMenuOpen(false); setContactOpen(true); }} className="text-center py-2.5 rounded-lg text-sm font-body font-semibold text-white" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <GridBg />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #030712)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-24">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-code tracking-widest uppercase border mb-8" style={{ borderColor: "rgba(6,182,212,0.35)", color: "#06b6d4", background: "rgba(6,182,212,0.06)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                Available for Projects
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="font-display font-black leading-[0.95] mb-7">
              <span className="block text-white text-6xl md:text-7xl mb-1">I Build</span>
              <span className="block gradient-text text-6xl md:text-7xl mb-1">Modern &</span>
              <span className="block text-white text-5xl md:text-6xl mb-1">AI-Powered</span>
              <span className="block text-white text-5xl md:text-6xl">Web Apps</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18 }} className="text-muted-foreground text-lg leading-relaxed mb-9 max-w-lg font-body">
              From stunning landing pages to full-stack SaaS platforms — I deliver scalable, responsive, and conversion-focused solutions for startups, businesses, and creators.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.28 }} className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => setContactOpen(true)}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold text-white transition-all hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 30px rgba(6,182,212,0.32)" }}
              >
                Hire Me
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#projects" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold border transition-all" style={{ borderColor: "rgba(6,182,212,0.25)", color: "#94a3b8" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.5)"; (e.currentTarget as HTMLElement).style.color = "#06b6d4"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.25)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              >
                View Projects
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }} className="flex gap-10">
              {[["50+", "Projects Delivered"], ["5+", "Years Experience"], ["100%", "Client Satisfaction"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-display font-black text-2xl" style={{ color: "#06b6d4" }}>{val}</div>
                  <div className="text-[10px] font-code text-muted-foreground tracking-widest uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="hidden md:flex justify-center items-center">
            <HeroOrb />
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section id="services" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.04) 0%, transparent 65%)" }} />
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center">
            <SectionBadge text="💼 Services" />
            <SectionHeading title="What I Build" subtitle="End-to-end digital solutions from concept to deployment, engineered for performance, scale, and growth." />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -5 }} className="group relative p-6 rounded-2xl border transition-all cursor-default overflow-hidden" style={{ background: "rgba(13,17,23,0.85)", borderColor: "rgba(6,182,212,0.1)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.3)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.1)")}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.05), transparent 70%)" }} />
                  <div className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.18), rgba(124,58,237,0.18))", border: "1px solid rgba(6,182,212,0.28)" }}>
                    <Icon size={18} style={{ color: "#06b6d4" }} />
                  </div>
                  <h3 className="font-display font-bold text-[13px] leading-tight text-white mb-2.5">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-28 px-6 overflow-hidden border-t" style={{ borderColor: "rgba(6,182,212,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center">
            <SectionBadge text="🚀 Projects" />
            <SectionHeading title="Recent Work" subtitle="A selection of projects I've built — from AI analytics platforms to immersive 3D websites." />
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border overflow-hidden flex flex-col"
                style={{ background: "rgba(13,17,23,0.9)", borderColor: "rgba(6,182,212,0.12)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.38)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.12)")}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52 bg-slate-900 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3,7,18,0.05) 0%, rgba(3,7,18,0.65) 100%)" }} />
                  {/* Hover shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, transparent 60%)" }} />
                  {/* Tag badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-code font-bold tracking-widest uppercase text-white" style={{ background: `linear-gradient(135deg, ${project.tagColor}, ${project.tagColor}99)`, boxShadow: `0 0 14px ${project.tagColor}55` }}>
                    {project.tag}
                  </span>
                  {/* Live indicator */}
                  <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-code tracking-wider uppercase" style={{ background: "rgba(3,7,18,0.75)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", backdropFilter: "blur(8px)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-body flex-1">{project.desc}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-code transition-colors" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)", color: "#64748b" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-body font-semibold text-white transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 18px rgba(6,182,212,0.2)" }}
                    >
                      <ExternalLink size={13} className="group-hover/btn:rotate-12 transition-transform" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold border transition-all"
                      style={{ borderColor: "rgba(6,182,212,0.22)", color: "#94a3b8" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e2e8f0"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(226,232,240,0.3)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.22)"; }}
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all CTA */}
          <FadeUp delay={0.2} className="text-center mt-12">
            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-body font-semibold border transition-all"
              style={{ borderColor: "rgba(6,182,212,0.25)", color: "#94a3b8" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.5)"; (e.currentTarget as HTMLElement).style.color = "#06b6d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.25)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
            >
              Want a project like these?
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────────────────── */}
      <section id="tech-stack" className="relative py-24 overflow-hidden border-y" style={{ borderColor: "rgba(6,182,212,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)" }} />
        <FadeUp className="text-center mb-12 px-6">
          <SectionBadge text="⚙️ Tech Stack" />
          <SectionHeading title="Built With" subtitle="Modern, battle-tested technologies for scalable and high-performance web experiences." />
        </FadeUp>
        <div className="relative overflow-hidden mb-4">
          <div className="flex gap-3 marquee-fwd whitespace-nowrap">
            {[...TECH_ROW1, ...TECH_ROW1].map((tech, i) => (
              <span key={i} className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-code font-medium border flex-shrink-0" style={{ background: "rgba(13,17,23,0.9)", borderColor: "rgba(6,182,212,0.18)", color: "#94a3b8" }}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-3 marquee-rev whitespace-nowrap">
            {[...TECH_ROW2, ...TECH_ROW2].map((tech, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-code flex-shrink-0" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.28)", color: "#a78bfa" }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: "#a78bfa" }} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────────────── */}
      <section id="industries" className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center">
            <SectionBadge text="🎯 Industries" />
            <SectionHeading title="Who I Work With" subtitle="From AI startups to local businesses, I build digital solutions for every sector and scale." />
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry, i) => (
              <motion.span key={industry} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.45 }} whileHover={{ scale: 1.06 }} className="px-5 py-2.5 rounded-full text-sm font-body font-medium border cursor-default transition-all" style={{ background: "rgba(13,17,23,0.8)", borderColor: "rgba(6,182,212,0.15)", color: "#94a3b8" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.45)"; (e.currentTarget as HTMLElement).style.color = "#06b6d4"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.15)"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center">
            <SectionBadge text="💎 Packages" />
            <SectionHeading title="Transparent Pricing" subtitle="No hidden fees. Choose the package that fits your project and budget." />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRICING.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -7 }} className="relative flex flex-col p-6 rounded-2xl border transition-all" style={{ background: "rgba(13,17,23,0.95)", borderColor: plan.border, boxShadow: plan.popular ? `0 0 40px ${plan.glow}` : "none" }}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-code font-bold tracking-widest text-white whitespace-nowrap" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 18px rgba(6,182,212,0.45)" }}>
                    MOST POPULAR
                  </div>
                )}
                <span className="font-code text-[10px] tracking-widest uppercase mb-4 opacity-60" style={{ color: "#06b6d4" }}>{plan.tag}</span>
                <h3 className="font-display font-bold text-base text-white mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-5 font-body">{plan.desc}</p>
                <div className="mb-5">
                  <span className="font-display font-black text-3xl text-white">{plan.price}</span>
                  <span className="text-muted-foreground text-xs ml-1 font-code">/ project</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs font-body" style={{ color: "#94a3b8" }}>
                      <CheckCircle size={12} style={{ color: "#06b6d4", flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setContactOpen(true)}
                  className="w-full py-2.5 rounded-xl text-xs font-body font-semibold transition-all"
                  style={plan.popular ? { background: "linear-gradient(135deg, #06b6d4, #7c3aed)", color: "#fff", boxShadow: "0 0 22px rgba(6,182,212,0.25)" } : { border: `1px solid ${plan.border}`, color: "#94a3b8" }}
                  onMouseEnter={(e) => { if (!plan.popular) { (e.currentTarget as HTMLElement).style.color = "#06b6d4"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.5)"; }}}
                  onMouseLeave={(e) => { if (!plan.popular) { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = plan.border; }}}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <SectionBadge text="✅ What You Get" />
              <SectionHeading title="Every Project Includes" />
            </FadeUp>
            <div className="space-y-3">
              {BENEFITS.map((benefit, i) => (
                <motion.div key={benefit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="flex items-center gap-4 p-4 rounded-xl border transition-all" style={{ background: "rgba(13,17,23,0.7)", borderColor: "rgba(6,182,212,0.1)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.28)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.1)")}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)" }}>
                    <CheckCircle size={14} style={{ color: "#06b6d4" }} />
                  </div>
                  <span className="font-body font-semibold text-sm text-white">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <FadeUp delay={0.15}>
            <div className="relative p-9 rounded-2xl border overflow-hidden" style={{ background: "rgba(13,17,23,0.85)", borderColor: "rgba(124,58,237,0.3)" }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #06b6d4, #7c3aed, transparent)" }} />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)", filter: "blur(30px)" }} />
              <Rocket size={44} style={{ color: "#06b6d4", filter: "drop-shadow(0 0 14px rgba(6,182,212,0.55))", marginBottom: "1.5rem" }} />
              <h3 className="font-display font-black text-2xl text-white mb-4 leading-tight">
                Ready to launch your<br />digital product?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-7 font-body">
                Helping founders and businesses build premium digital products that drive growth, automate workflows, and deliver exceptional user experiences. 🚀
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setContactOpen(true)}
                  className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 28px rgba(6,182,212,0.3)" }}
                >
                  {"Let's Talk"}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#pricing" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-body font-semibold border transition-all" style={{ borderColor: "rgba(6,182,212,0.25)", color: "#94a3b8" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#06b6d4"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.5)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(6,182,212,0.25)"; }}
                >
                  View Pricing
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="relative border-t py-20 px-6" style={{ borderColor: "rgba(6,182,212,0.1)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.04) 0%, transparent 55%)" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 24px rgba(6,182,212,0.4)" }}>
                <span className="text-white text-sm font-display font-black">T</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-wide">
                <span className="text-white">Techrudra</span>
                <span style={{ color: "#06b6d4" }}>.ai</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed font-body">
              Building modern, high-performance websites and AI-powered web applications that drive growth and deliver exceptional user experiences.
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center flex-wrap gap-4 mb-14">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.06 }} whileTap={{ scale: 0.97 }} className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all" style={{ background: "rgba(13,17,23,0.8)", borderColor: "rgba(6,182,212,0.12)", color: "#64748b", minWidth: 72 }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = social.accent; el.style.borderColor = social.glow.replace("0.15", "0.45"); el.style.boxShadow = `0 0 18px ${social.glow}`; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#64748b"; el.style.borderColor = "rgba(6,182,212,0.12)"; el.style.boxShadow = "none"; }}
                >
                  <Icon />
                  <span className="text-[10px] font-code tracking-wider">{social.name}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Hire Me CTA in footer */}
          <div className="text-center mb-10">
            <button
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-body font-semibold text-white transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)", boxShadow: "0 0 30px rgba(6,182,212,0.25)" }}
            >
              Start a Project
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex justify-center flex-wrap gap-6 mb-10">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="text-xs font-body text-muted-foreground hover:text-cyan-400 transition-colors tracking-wide">
                {label}
              </a>
            ))}
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(6,182,212,0.08)" }}>
            <span className="text-xs font-code text-muted-foreground">© 2025 Techrudra.ai — All rights reserved.</span>
            <span className="text-xs font-code text-muted-foreground flex items-center gap-2">
              <ExternalLink size={10} />
              Built with Next.js · React · TypeScript · AI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
