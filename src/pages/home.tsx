import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Brain,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircuitBoard,
  FileVideo2,
  Globe,
  GraduationCap,
  Headphones,
  HeartPulse,
  LineChart,
  Link2,
  Lock,
  MessagesSquare,
  PhoneCall,
  PieChart,
  PlugZap,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Timer,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_DEMO = "wa.me/917889019602?text=Hi%20I%20want%20to%20test%20Vox%20AI";

function useCountUp(target: number, start: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs]);

  return value;
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
        <span data-testid={`text-eyebrow-${id ?? "section"}`}>{eyebrow}</span>
      </div>
      <h2
        className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        data-testid={`text-heading-${id ?? "section"}`}
      >
        {title}
      </h2>
      <p
        className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground sm:text-base"
        data-testid={`text-subtitle-${id ?? "section"}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function GradientOrb({ className, color }: { className: string; color: "primary" | "accent" }) {
  const c = color === "primary" ? "hsl(var(--primary) / .22)" : "hsl(var(--accent) / .20)";
  return (
    <div
      className={
        "pointer-events-none absolute rounded-full blur-3xl " +
        className
      }
      style={{ background: `radial-gradient(circle at 30% 30%, ${c}, transparent 60%)` }}
      aria-hidden
    />
  );
}

function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const points = Array.from({ length: 48 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00055,
      vy: (Math.random() - 0.5) * 0.00055,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(160, 85, 255, 0.35)");
      grad.addColorStop(1, "rgba(45, 212, 255, 0.25)");

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const ax = a.x * w;
          const ay = a.y * h;
          const bx = b.x * w;
          const by = b.y * h;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 180) continue;
          const alpha = (1 - dist / 180) * 0.28;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      for (const p of points) {
        const x = p.x * w;
        const y = p.y * h;
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-60"
      aria-hidden
    />
  );
}

function WhatsappMock() {
  const messages = useMemo(
    () => [
      { from: "lead", text: "Hi, do you handle dental bookings?", t: "10:14" },
      {
        from: "ai",
        text: "Yes. I can qualify you and book the next available slot. ",
        t: "10:14",
      },
      { from: "lead", text: "Can you handle real estate leads ?", t: "10:15" },
      {
        from: "ai",
        text: "Yes I can instantly book viewings, sends reminders, handle follow-ups, and route hot prospects directly to your sales agent.",
        t: "10:15",
      },
      { from: "lead", text: "Is there anything that you can't do ? ", t: "10:15" },
      {
        from: "ai",
        text: "We can automate conversations, qualification, booking, and follow-ups — but we don’t replace human relationships or final deal negotiations ,The goal is to handle the repetitive work so your team focuses on closing.",
        t: "10:16",
      },
    ],
    [],
  );

  return (
    <div className="vox-glass vox-noise rounded-2xl p-4 md:p-5 vox-glow">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black/50">
              <MessagesSquare className="h-4.5 w-4.5 text-white" />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium" data-testid="text-chat-title">
              Vox AI Agent
            </div>
            <div className="text-xs text-muted-foreground" data-testid="text-chat-subtitle">
              Context-aware • Multi-language • 24/7
            </div>
          </div>
        </div>
        <Badge
          className="border-white/10 bg-white/5 text-xs text-muted-foreground"
          data-testid="badge-live-demo"
        >
          Live Demo
        </Badge>
      </div>

      <div className="mt-4 space-y-2.5">
        {messages.map((m, idx) => {
          const isAI = m.from === "ai";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className={
                "flex " + (isAI ? "justify-start" : "justify-end")
              }
              data-testid={`row-message-${idx}`}
            >
              <div
                className={
                  "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
                  (isAI
                    ? "bg-white/5 text-foreground border border-white/10"
                    : "bg-gradient-to-br from-[hsl(var(--primary)/.85)] to-[hsl(var(--accent)/.75)] text-white")
                }
              >
                <div data-testid={`text-message-${idx}`}>{m.text}</div>
                <div
                  className={
                    "mt-1 text-[11px] " +
                    (isAI ? "text-muted-foreground" : "text-white/80")
                  }
                  data-testid={`text-message-time-${idx}`}
                >
                  {m.t}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_24px_hsl(var(--accent)/.8)]" />
        <div className="text-xs text-muted-foreground" data-testid="text-typing">
          AI is typing…
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  points,
  body,
  testId,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  points: string[];
  testId: string;
}) {
  return (
    <Card className="vox-glass vox-noise rounded-2xl p-5 md:p-6" data-testid={testId}>
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
          {icon}
        </div>
        <div>
          <div className="font-display text-lg font-semibold" data-testid={`${testId}-title`}>
            {title}
          </div>
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground" data-testid={`${testId}-body`}>
            {body}
          </div>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/90" data-testid={`${testId}-point-${i}`}>
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function PricingCard({
  name,
  price,
  setup,
  items,
  highlight,
  testId,
}: {
  name: string;
  price: string;
  setup: string;
  items: string[];
  highlight?: boolean;
  testId: string;
}) {
  return (
    <div
      className={
        "vox-glass vox-noise relative rounded-2xl p-6 " +
        (highlight ? "vox-glow" : "")
      }
      data-testid={testId}
    >
      {highlight ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-muted-foreground">
          Most Popular
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <div className="font-display text-lg font-semibold" data-testid={`${testId}-name`}>
          {name}
        </div>
        <Badge
          className="border-white/10 bg-white/5 text-muted-foreground"
          data-testid={`${testId}-badge`}
        >
          Premium
        </Badge>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-semibold tracking-tight" data-testid={`${testId}-price`}>
          {price}
          <span className="text-sm font-normal text-muted-foreground">/mo</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground" data-testid={`${testId}-setup`}>
          Setup fee: {setup}
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm" data-testid={`${testId}-item-${i}`}>
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
            <span className="text-foreground/90">{it}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2">
        <Button
          className={
            highlight
              ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
              : "bg-white/5 hover:bg-white/10"
          }
          data-testid={`${testId}-button-primary`}
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="ghost" className="text-muted-foreground" data-testid={`${testId}-button-secondary`}>
          See full comparison
        </Button>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <a href="#" className="flex items-center gap-3" data-testid="link-home">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black/55">
                  <Brain className="h-4.5 w-4.5 text-white" />
                </div>
              </div>
              <div>
                <div className="font-display text-sm font-semibold tracking-tight" data-testid="text-brand">
                  VOX AI
                </div>
                <div className="text-xs text-muted-foreground" data-testid="text-brand-tagline">
                  WhatsApp AI Agents
                </div>
              </div>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {[
                ["Features", "#features"],
                ["How it works", "#process"],
                ["Industries", "#industries"],
                ["Pricing", "#pricing"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
            <Button
  variant="secondary"
  className="hidden border border-white/10 bg-white/5 text-foreground hover:bg-white/10 md:inline-flex"
  data-testid="button-book-call"
  onClick={() => window.open("https://calendly.com/voxai4278/30min", "_blank")}
>
  Book Strategy Call
  <ChevronRight className="ml-1.5 h-4 w-4" />
</Button>
              <Button
                className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
                asChild
                data-testid="button-test-agent"
              >
                <a href={`https://${WHATSAPP_DEMO}`} target="_blank" rel="noreferrer">
                  Test the AI Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setStatsInView(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const s1 = useCountUp(60, statsInView);
  const s2 = useCountUp(40, statsInView);
  const s3 = useCountUp(80, statsInView);

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <div className="min-h-screen">
      <motion.div
        className="fixed left-0 top-0 h-1 w-full origin-left bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <Navbar />

      <main className="pt-28">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 vox-grid opacity-70" />
            <GradientOrb className="-top-24 left-[-10%] h-[520px] w-[520px]" color="primary" />
            <GradientOrb className="top-10 right-[-12%] h-[520px] w-[520px]" color="accent" />
            <div className="absolute inset-0 opacity-70">
              <NeuralField />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
          </div>

          <div className="vox-container vox-noise relative">
            <div className="grid items-center gap-12 pb-20 pt-10 md:grid-cols-2 md:pb-28 md:pt-16">
              <motion.div style={{ y: heroY }}>
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                  data-testid="badge-hero"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                  Official WhatsApp Business API • GDPR-ready
                </div>

                <h1
                  className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
                  data-testid="text-hero-headline"
                >
                  Your Business Deserves an <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]">AI Employee</span>.
                </h1>

                <p
                  className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
                  data-testid="text-hero-subheadline"
                >
                  Vox AI builds intelligent WhatsApp AI agents that handle leads, bookings, sales, support, and follow-ups — 24/7.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="h-11 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
                    asChild
                    data-testid="button-hero-test"
                  >
                    <a href={`https://${WHATSAPP_DEMO}`} target="_blank" rel="noreferrer">
                      Test the AI Agent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-11 border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
                    data-testid="button-hero-book"
                    asChild
                  >
                    <a href="#contact">Book Strategy Call</a>
                  </Button>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-3">
                  {[{
                    icon: <Timer className="h-4 w-4" />,
                    label: "24/7 Coverage",
                  }, {
                    icon: <PlugZap className="h-4 w-4" />,
                    label: "Full Automation",
                  }, {
                    icon: <Lock className="h-4 w-4" />,
                    label: "Secure by design",
                  }].map((b, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground"
                      data-testid={`badge-hero-pill-${i}`}
                    >
                      <div className="flex items-center gap-2 text-foreground/90">
                        <span className="text-[hsl(var(--accent))]">{b.icon}</span>
                        <span>{b.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="relative">
                <motion.div
                  className="absolute -left-6 -top-6 hidden w-44 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground md:block"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  data-testid="card-floating-1"
                >
                
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-4 hidden w-48 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground md:block"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                  data-testid="card-floating-2"
                >
                  
                </motion.div>

                <WhatsappMock />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="What VOX AI does"
              title="Premium automation across the full customer journey"
              subtitle="From the first inbound message to booked appointments, payments, and support — Vox AI runs your WhatsApp channel like an elite team member."
              id="features"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                testId="card-feature-qualification"
                icon={<Users className="h-5 w-5" />}
                title="24/7 Smart Lead Qualification"
                body="Instantly responds, qualifies with intelligent questions, and routes high-intent leads to your team."
                points={[
                  "Automatically replies to new inquiries in seconds",
                  "Qualifies by budget, urgency, and location",
                  "Tags leads inside your CRM for clean pipelines",
                  "Sends qualified leads directly to sales team",
                ]}
              />
              <FeatureCard
                testId="card-feature-calendar"
                icon={<CalendarDays className="h-5 w-5" />}
                title="Appointment & Calendar Automation"
                body="Real-time scheduling that reduces no-shows and keeps calendars full."
                points={[
                  "Syncs with Google Calendar",
                  "Checks real-time availability",
                  "Books appointments automatically",
                  "Sends reminders + follow-ups",
                ]}
              />
              <FeatureCard
                testId="card-feature-conversations"
                icon={<Brain className="h-5 w-5" />}
                title="AI-Powered Conversations"
                body="GPT-powered natural language conversations designed for results — not scripts."
                points={[
                  "Natural responses with brand tone control",
                  "Context memory across sessions",
                  "Handles objections with dynamic reasoning",
                  "Multi-language support",
                ]}
              />
              <FeatureCard
                testId="card-feature-sales"
                icon={<Wallet className="h-5 w-5" />}
                title="Sales Automation"
                body="Drive revenue with product logic, payments, and retention triggers."
                points={[
                  "Product recommendations",
                  "Payment link generation",
                  "Abandoned cart recovery",
                  "Upsell & cross-sell logic",
                ]}
              />
              <FeatureCard
                testId="card-feature-integrations"
                icon={<Link2 className="h-5 w-5" />}
                title="CRM & System Integration"
                body="Plug into your stack and automate end-to-end operations." 
                points={[
                  "Integrates with n8n, Zapier, HubSpot, GoHighLevel",
                  "Google Sheets + internal tools",
                  "Custom APIs supported",
                  "Real-time data sync",
                ]}
              />
              <FeatureCard
                testId="card-feature-analytics"
                icon={<BarChart3 className="h-5 w-5" />}
                title="Analytics Dashboard"
                body="Full visibility into conversations, sources, and ROI." 
                points={[
                  "Conversation tracking",
                  "Lead source tracking",
                  "Conversion metrics",
                  "ROI reporting",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="process" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="How we develop your AI agent"
              title="A build process engineered for conversion, reliability, and safety"
              subtitle="We combine prompt engineering, conversation flow design, and secure automation to deliver WhatsApp agents that feel human — and perform like machines."
              id="process"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="vox-glass vox-noise rounded-2xl p-6">
                <div className="font-display text-lg font-semibold" data-testid="text-process-title">
                  Development Timeline
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ["Step 1", "Business Deep Analysis"],
                    ["Step 2", "AI Logic Architecture Design"],
                    ["Step 3", "Conversation Flow Engineering"],
                    ["Step 4", "API + Automation Integration"],
                    ["Step 5", "WhatsApp Official API Setup"],
                    ["Step 6", "Testing & Optimization"],
                    ["Step 7", "Deployment & Monitoring"],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      data-testid={`row-process-${i}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-[1px]">
                          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black/55 text-xs font-semibold">
                            {i + 1}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground" data-testid={`text-process-step-${i}`}>{k}</div>
                          <div className="text-sm font-medium" data-testid={`text-process-name-${i}`}>{v}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="vox-glass vox-noise rounded-2xl p-6">
                <div className="font-display text-lg font-semibold" data-testid="text-process-details-title">
                  What’s included
                </div>
                <ul className="mt-4 space-y-2">
                  {[
                    "Official WhatsApp Business API implementation",
                    "Secure server architecture principles (role-based access, audited data flow)",
                    "Prompt engineering logic + brand tone control",
                    "Fallback handling for edge cases and handoff",
                    "Custom business knowledge training (products, services, policies)",
                    "Monitoring + optimization after launch",
                  ].map((t, i) => (
                    <li className="flex gap-2 text-sm" key={i} data-testid={`text-process-include-${i}`}>
                      <Star className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                      <span className="text-foreground/90">{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[hsl(var(--primary)/.18)] via-white/5 to-[hsl(var(--accent)/.12)] p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-[hsl(var(--accent))]" />
                    <div>
                      <div className="font-display text-base font-semibold" data-testid="text-process-security-heading">
                        Built for enterprise trust
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid="text-process-security-body">
                        Vox AI emphasizes safety, privacy, and compliance — so your automation never compromises customer experience.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  
                  <Button
                    className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
                    asChild
                    data-testid="button-process-chat"
                  >
                    <a href={`https://${WHATSAPP_DEMO}`} target="_blank" rel="noreferrer">
                      Chat on WhatsApp
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-18 sm:py-22">
          <div className="vox-container">
            <div className="vox-glass vox-noise vox-shimmer rounded-3xl p-7 sm:p-10">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground" data-testid="badge-demo">
                    <PhoneCall className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                    Live demo
                  </div>
                  <div className="font-display mt-4 text-3xl font-semibold tracking-tight" data-testid="text-demo-heading">
                    Experience Vox AI in Action
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="text-demo-body">
                    Test a real WhatsApp agent experience — see qualification, scheduling, and handoff flows in minutes.
                  </p>
                  <div className="mt-6">
                    <Button
                      className="h-11 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
                      asChild
                      data-testid="button-demo-whatsapp"
                    >
                      <a href={`https://${WHATSAPP_DEMO}`} target="_blank" rel="noreferrer">
                        Chat With AI on WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <WhatsappMock />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="Industries we serve"
              title="Built for high-intent inbound businesses"
              subtitle="Vox AI is designed to qualify, book, and sell — across industries where speed and trust win deals."
              id="industries"
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Stethoscope className="h-5 w-5" />,
                  title: "Dental Clinics",
                  body: "Automate booking, pre-qualification, reminders, and post-visit follow-ups.",
                },
                {
                  icon: <HeartPulse className="h-5 w-5" />,
                  title: "Physiotherapy Clinics",
                  body: "Reduce no-shows and keep schedules full with smart availability handling.",
                },
                {
                  icon: <Building2 className="h-5 w-5" />,
                  title: "Real Estate",
                  body: "Qualify by budget and location, schedule viewings, and route hot leads instantly.",
                },
                {
                  icon: <ShoppingBag className="h-5 w-5" />,
                  title: "E-commerce",
                  body: "Handle objections, generate payment links, recover abandoned carts, and upsell.",
                },
                {
                  icon: <GraduationCap className="h-5 w-5" />,
                  title: "Coaching & Education",
                  body: "Qualify prospects, deliver program info, and book calls automatically.",
                },
                {
                  icon: <Headphones className="h-5 w-5" />,
                  title: "Service Businesses",
                  body: "Quote, book, and support customers with high-quality conversational automation.",
                },
                {
                  icon: <Building2 className="h-5 w-5" />,
                  title: "Enterprises",
                  body: "Secure workflows, RBAC, integrations, and analytics at scale.",
                },
              ].map((it, i) => (
                <Card key={i} className="vox-glass vox-noise rounded-2xl p-6" data-testid={`card-industry-${i}`}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
                      {it.icon}
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold" data-testid={`text-industry-title-${i}`}>
                        {it.title}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-industry-body-${i}`}>
                        {it.body}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="Why VOX AI is different"
              title="Not a chatbot. A conversion engine."
              subtitle="Script-based bots break the moment users go off-script. Vox AI uses context, reasoning, and integrations to handle real business complexity."
              id="difference"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="vox-glass vox-noise rounded-2xl p-6" data-testid="card-compare">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-muted-foreground" data-testid="text-compare-left">
                      Traditional Chatbots
                    </div>
                    <ul className="mt-3 space-y-2">
                      {["Script-based", "No memory", "Limited logic", "No integration"].map((t, i) => (
                        <li key={i} className="flex items-center gap-2" data-testid={`text-compare-left-${i}`}>
                          <div className="h-2 w-2 rounded-full bg-white/30" />
                          <span className="text-foreground/80">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[hsl(var(--primary)/.18)] via-white/5 to-[hsl(var(--accent)/.12)] p-4">
                    <div className="text-xs text-muted-foreground" data-testid="text-compare-right">
                      Vox AI
                    </div>
                    <ul className="mt-3 space-y-2">
                      {["AI-powered", "Context-aware", "Dynamic reasoning", "Full automation"].map((t, i) => (
                        <li key={i} className="flex items-center gap-2" data-testid={`text-compare-right-${i}`}>
                          <div className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_18px_hsl(var(--accent)/.7)]" />
                          <span className="text-foreground">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-start gap-3">
                    <Rocket className="mt-0.5 h-5 w-5 text-[hsl(var(--primary))]" />
                    <div>
                      <div className="font-display font-semibold" data-testid="text-compare-footer-title">
                        Designed to close, not just respond
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid="text-compare-footer-body">
                        Vox AI qualifies intent, answers objections, triggers automations, and routes humans only when needed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                {[{
                  icon: <Lock className="h-5 w-5" />,
                  title: "Security & Compliance",
                  items: [
                    "End-to-end encryption",
                    "Official Meta API",
                    "GDPR compliant",
                    "Secure data storage",
                    "Role-based access",
                  ],
                }, {
                  icon: <PlugZap className="h-5 w-5" />,
                  title: "Stack + Integrations",
                  items: [
                    "n8n automation workflows",
                    "Zapier + HubSpot + GoHighLevel",
                    "Google Sheets for quick ops",
                    "Custom API endpoints",
                    "Real-time sync",
                  ],
                }].map((b, i) => (
                  <Card key={i} className="vox-glass vox-noise rounded-2xl p-6" data-testid={`card-diff-${i}`}>
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
                        {b.icon}
                      </div>
                      <div>
                        <div className="font-display text-lg font-semibold" data-testid={`text-diff-title-${i}`}>
                          {b.title}
                        </div>
                        <ul className="mt-3 space-y-2 text-sm">
                          {b.items.map((t, j) => (
                            <li key={j} className="flex items-center gap-2" data-testid={`text-diff-item-${i}-${j}`}>
                              <Check className="h-4 w-4 text-[hsl(var(--primary))]" />
                              <span className="text-muted-foreground">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-18 sm:py-22" ref={statsRef}>
          <div className="vox-container">
            <SectionHeading
              eyebrow="Results"
              title="Performance that compounds"
              subtitle="When your response speed hits seconds, your pipeline becomes predictable — and your team gets their time back."
              id="results"
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Faster Lead Response", value: `${s1}%`, icon: <Timer className="h-5 w-5" /> },
                { label: "Increase in Conversions", value: `${s2}%`, icon: <LineChart className="h-5 w-5" /> },
                { label: "Reduced Admin Work", value: `${s3}%`, icon: <Users className="h-5 w-5" /> },
                { label: "Availability", value: "24/7", icon: <Globe className="h-5 w-5" /> },
              ].map((s, i) => (
                <Card key={i} className="vox-glass vox-noise rounded-2xl p-6" data-testid={`card-stat-${i}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
                      {s.icon}
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-semibold" data-testid={`text-stat-value-${i}`}>
                        {s.value}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`text-stat-label-${i}`}>
                        {s.label}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <Card className="vox-glass vox-noise rounded-2xl p-6" data-testid="card-media-demo">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileVideo2 className="h-4 w-4 text-[hsl(var(--accent))]" />
                  N8N
                </div>
                <div className="font-display mt-2 text-lg font-semibold" data-testid="text-media-title">
                  How The Worklow in the Backend Will Look Like 
                </div>
                <img
  src="/n8n-diagram.png"
  alt="n8n backend workflow"
  className="mt-4 aspect-video w-full rounded-xl border border-white/10 object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
  data-testid="image-n8n-workflow"
/>
                <div className="mt-4 grid grid-cols-3 gap-3">
                </div>
              </Card>

              <Card className="vox-glass vox-noise rounded-2xl p-6" data-testid="card-media-testimonials">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-[hsl(var(--primary))]" />
                  Google Sheet
                </div>
                <div className="font-display mt-2 text-lg font-semibold" data-testid="text-testimonials-title">
                  Whatsapp Dashbaord With Integerated CRM
                </div>
                <img
  src="whatsapp-dashboard.png"
  alt="Whatsapp Dashbaord"
  className="mt-4 aspect-video w-full rounded-xl border border-white/10 object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
  data-testid="image-google-sheet-crm"
/>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="Pricing"
              title="Choose the build level for your growth"
              subtitle="Transparent tiers for different stages — with custom integrations and enterprise requirements available."
              id="pricing"
            />

            <div className="mt-10 flex justify-center">
              <div
                className="vox-glass vox-noise vox-glow relative max-w-lg w-full rounded-2xl p-8"
                data-testid="card-pricing-custom"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-2xl font-semibold" data-testid="text-pricing-custom-name">
                    Custom AI Solutions
                  </div>
                  <Badge className="border-white/10 bg-white/5 text-muted-foreground">
                    Enterprise
                  </Badge>
                </div>
                <div className="mt-6">
                  <div className="text-4xl font-semibold tracking-tight">
                    Custom
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Tailored AI architecture designed specifically for your business workflows, 
                    deep integrations, and custom logic requirements.
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    "Custom conversation logic & flows",
                    "Deep CRM & API integrations",
                    "Official WhatsApp API setup",
                    "Full testing & optimization",
                    "Ongoing monitoring & support",
                  ].map((it, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent))]" />
                      <span className="text-foreground/90">{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button
                    className="w-full h-12 text-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
                    asChild
                    data-testid="button-pricing-custom"
                  >
                    <a href="https://calendly.com/voxai4278/30min" target="_blank" rel="noreferrer">
                      Book a Strategy Call
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="Technical clarity"
              title="WhatsApp API + automation that your team can trust"
              subtitle="Clear fundamentals you can share with compliance, operations, and leadership."
              id="tech"
            />

<div className="mt-10 grid gap-5 lg:grid-cols-3">
  {[{
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "WhatsApp Official API",
    body: "We use the official WhatsApp Business API for reliability, delivery, and compliance — designed for real business workflows.",
  }, {
    icon: <CircuitBoard className="h-5 w-5" />,
    title: "AI Logic + Prompt Engineering",
    body: "We design prompts, system rules, and conversation memory to keep responses accurate, on-brand, and conversion-focused.",
  }, {
    icon: <PlugZap className="h-5 w-5" />,
    title: "Automation with n8n",
    body: "We wire automations for tagging, CRM updates, calendar booking, and routing.",
  }].map((b, i) => (
    <Card
      key={i}
      className="vox-glass vox-noise rounded-2xl p-6"
      data-testid={`card-tech-${i}`}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
          {b.icon}
        </div>

        <div>
          <div
            className="font-display text-lg font-semibold"
            data-testid={`text-tech-title-${i}`}
          >
            {b.title}
          </div>

          <div
            className="mt-1 text-sm text-muted-foreground"
            data-testid={`text-tech-body-${i}`}
          >
            {b.body}
          </div>
        </div>
      </div>

      {/* Image only for 3rd card */}
      {i === 2 && (
        <img
          src="/n8n-diagram.png"
          alt="n8n automation workflow"
          className="mt-4 w-full rounded-xl border border-white/10 shadow-lg transition-transform duration-300 hover:scale-105"
        />
      )}
    </Card>
  ))}
</div>
          </div>
        </section>

        <section id="case-studies" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="Case studies"
              title="Proof across industries"
              subtitle="A few examples of what Vox AI agents typically automate."
              id="cases"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Clinic — Bookings at scale",
                  body: "Qualification → availability check → booking → reminders → post-visit follow-ups.",
                  icon: <Stethoscope className="h-5 w-5" />,
                },
                {
                  title: "Real estate — Hot lead routing",
                  body: "Budget/location scoring → viewing scheduling → instant agent handoff.",
                  icon: <Building2 className="h-5 w-5" />,
                },
                {
                  title: "E-commerce — Revenue recovery",
                  body: "Objection handling → payment links → abandoned cart triggers → upsells.",
                  icon: <ShoppingBag className="h-5 w-5" />,
                },
              ].map((c, i) => (
                <Card key={i} className="vox-glass vox-noise rounded-2xl p-6" data-testid={`card-case-${i}`}>
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold" data-testid={`text-case-title-${i}`}>{c.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-case-body-${i}`}>{c.body}</div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4" data-testid={`card-case-metrics-${i}`}>
<div className="grid grid-cols-3 gap-3 text-center">
  {[
    [
      { label: "Speed", value: "3x Faster Bookings" },
      { label: "Quality", value: "92% Show Rate" },
      { label: "ROI", value: "+41% Revenue" },
    ],
    [
      { label: "Speed", value: "< 60s Lead Response" },
      { label: "Quality", value: "Hot Lead Filtering" },
      { label: "ROI", value: "+27% Closings" },
    ],
    [
      { label: "Speed", value: "Instant Recovery" },
      { label: "Quality", value: "Smart Objection AI" },
      { label: "ROI", value: "+18% AOV" },
    ],
  ][i].map((metric, j) => (
    <div
      key={j}
      className="rounded-lg border border-white/10 bg-white/5 p-3"
    >
      <div className="text-xs text-muted-foreground">
        {metric.label}
      </div>
      <div className="mt-1 font-semibold text-sm text-white">
        {metric.value}
      </div>
    </div>
  ))}
</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="FAQ"
              title="Everything leadership asks — answered"
              subtitle="If you want, we can tailor these answers to your exact compliance and tech requirements."
              id="faq"
            />

            <div className="mx-auto mt-10 max-w-3xl vox-glass vox-noise rounded-2xl p-3 sm:p-4" data-testid="accordion-faq">
              <Accordion type="single" collapsible>
                {[
                  {
                    q: "Do you use the official WhatsApp Business API?",
                    a: "Yes. Vox AI is designed around the official WhatsApp Business API so businesses can operate reliably and align with Meta’s policies.",
                  },
                  {
                    q: "Can the agent integrate with our CRM and automations?",
                    a: "Yes. We commonly integrate with n8n, Zapier, HubSpot, GoHighLevel, Google Sheets, and custom APIs for real-time sync.",
                  },
                  {
                    q: "How do you handle safety and edge cases?",
                    a: "We implement fallback flows, guardrails, and human handoff rules. The goal is a great customer experience under all conditions.",
                  },
                  {
                    q: "Do you support multiple languages?",
                    a: "Yes. Vox AI agents can detect language and respond appropriately while maintaining your brand tone.",
                  },
                  {
                    q: "Is this GDPR compliant?",
                    a: "We design for privacy and compliance, including secure storage, controlled access, and data minimization principles.",
                  },
                ].map((f, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger data-testid={`button-faq-${i}`}>{f.q}</AccordionTrigger>
                    <AccordionContent data-testid={`text-faq-${i}`}>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="about" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <SectionHeading
              eyebrow="About VOX AI"
              title="Building scalable business AI systems"
              subtitle="Innovation-driven AI automation for teams that demand premium experiences and measurable ROI."
              id="about"
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Card className="vox-glass vox-noise rounded-2xl p-6 lg:col-span-2" data-testid="card-about">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[hsl(var(--accent))]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold" data-testid="text-about-title">
                      AI Automation Company
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground" data-testid="text-about-body">
                      We build premium WhatsApp AI agents for clinics, real estate, e-commerce, service businesses, and enterprises — engineered for trust, speed, and conversion.
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[{
                    title: "Mission",
                    body: "Replace repetitive workload with intelligent systems that boost revenue and customer satisfaction.",
                  }, {
                    title: "Vision",
                    body: "Make AI agents a standard, secure layer across every business communication channel.",
                  }, {
                    title: "Positioning",
                    body: "Premium, enterprise-grade AI automations — built like product, not like scripts.",
                  }, {
                    title: "Partner",
                    body: "Meta official partner mention (placeholder).",
                  }].map((b, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4" data-testid={`card-about-item-${i}`}>
                      <div className="text-xs text-muted-foreground" data-testid={`text-about-item-label-${i}`}>{b.title}</div>
                      <div className="mt-1 text-sm" data-testid={`text-about-item-body-${i}`}>{b.body}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="vox-glass vox-noise rounded-2xl p-6" data-testid="card-trust">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-[hsl(var(--accent))]" />
                  Trust badges
                </div>
                <div className="mt-4 grid gap-3">
                  {["Official API", "GDPR", "Secure Architecture", "24/7 Ops"].map((t, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4" data-testid={`badge-trust-${i}`}>
                      <div className="font-display text-sm font-semibold" data-testid={`text-trust-${i}`}>{t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Verification placeholder</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-18 sm:py-22">
          <div className="vox-container">
            <div className="vox-glass vox-noise rounded-3xl p-7 sm:p-10">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground" data-testid="badge-contact">
                    <PhoneCall className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                    Strategy call
                  </div>
                  <div className="font-display mt-4 text-3xl font-semibold tracking-tight" data-testid="text-final-cta-heading">
                    Stop Hiring More People. Deploy AI Instead.
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="text-final-cta-body">
                    Tell us your industry, your current lead flow, and what you want automated. We’ll map a system that ships fast and performs.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
  variant="secondary"
  className="hidden border border-white/10 bg-white/5 text-foreground hover:bg-white/10 md:inline-flex"
  data-testid="button-book-call"
  onClick={() => window.open("https://calendly.com/voxai4278/30min", "_blank")}
>
  Book Strategy Call
  <ChevronRight className="ml-1.5 h-4 w-4" />
</Button>

                    <Button
                      variant="secondary"
                      className="h-11 border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
                      asChild
                      data-testid="button-final-test"
                    >
                      <a href={`https://${WHATSAPP_DEMO}`} target="_blank" rel="noreferrer">
                        Test AI on WhatsApp
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 vox-glass rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <Lock className="mt-0.5 h-5 w-5 text-[hsl(var(--accent))]" />
                      <div>
                        <div className="font-display font-semibold" data-testid="text-contact-security-title">
                          Email integration note
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground" data-testid="text-contact-security-body">
                          This prototype includes a contact form UI. For real email delivery, we’ll connect a secure backend workflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-8 text-center">
  <div className="font-display text-lg font-semibold mb-3">
    Book a Strategy Call
  </div>

  <p className="text-sm text-muted-foreground mb-6">
    Let’s discuss how Vox AI can automate and scale your business.
  </p>

  <a 
    href="https://calendly.com/voxai4278/30min"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white hover:opacity-95"
      data-testid="button-book-meeting"
    >
      Book 30-Min Meeting
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </a>
</div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        icon: <Globe className="h-5 w-5" />,
                        label: "Location",
                        value: "Ludhiana,India",
                      },
                      {
                        icon: <BadgeCheck className="h-5 w-5" />,
                        label: "Focus",
                        value: "Scalable AI systems",
                      },
                    ].map((c, i) => (
                      <div key={i} className="vox-glass vox-noise rounded-2xl p-5" data-testid={`card-contact-meta-${i}`}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-[hsl(var(--accent))]">{c.icon}</span>
                          <span data-testid={`text-contact-meta-label-${i}`}>{c.label}</span>
                        </div>
                        <div className="font-display mt-2 text-base font-semibold" data-testid={`text-contact-meta-value-${i}`}>
                          {c.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6 text-xs text-muted-foreground">
                <div data-testid="text-footer-left">© {new Date().getFullYear()} VOX AI. All rights reserved.</div>
                <div className="hidden items-center gap-4 sm:flex">
                  {["Privacy", "Security", "Terms"].map((t, i) => (
                    <a
                      key={i}
                      href="#"
                      className="hover:text-foreground"
                      data-testid={`link-footer-${t.toLowerCase()}`}
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        href={`https://${WHATSAPP_DEMO}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50"
        data-testid="button-floating-whatsapp"
      >
        <div className="group rounded-full border border-white/10 bg-black/35 p-1.5 backdrop-blur-xl">
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_70px_hsl(var(--primary)/.25)] transition-transform group-hover:scale-[1.02]">
            <MessagesSquare className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">WhatsApp Demo</span>
          </div>
        </div>
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VOX AI",
            url: "https://vox-ai.example",
            slogan: "Intelligent WhatsApp AI Agents for Businesses",
            description:
              "VOX AI builds intelligent WhatsApp AI agents for clinics, real estate, e-commerce, service businesses, and enterprises.",
          }),
        }}
      />
    </div>
  );
}
