import { motion, useInView, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Check, Menu, X,
  Globe, BookOpen, Users, Award, Clock, Target, MessageSquare,
  BarChart3, Building2, Layout, TrendingUp, CheckCircle2, Shield, Languages,
} from 'lucide-react';
import { useRef, useState, useEffect, type ElementType, type ReactNode } from 'react';

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}

function useCountUp(target: number, active: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return count;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'training',
    title: 'Corporate Training',
    description:
      'Customised instructor-led and virtual training programmes that drive measurable performance improvement across your organisation.',
    image: '/images/bento-corporate-training.jpg',
    features: ['Leadership & Management', 'Soft Skills & Communication', 'Technical Skills', 'Compliance Training'],
  },
  {
    id: 'elearning',
    title: 'eLearning Development',
    description:
      'High-impact digital learning experiences — from rapid eLearning to immersive simulations — built for every device and learner.',
    image: '/images/bento-elearning.jpg',
    features: ['SCORM / xAPI Compliant', 'Gamification & Simulations', 'Mobile-First Design', 'LMS Integration'],
  },
  {
    id: 'translation',
    title: 'Translation & Localisation',
    description:
      'Expert language services in 40+ languages with native-speaker accuracy, cultural nuance, and fast turnaround times.',
    image: '/images/bento-localization.jpg',
    features: ['40+ Languages Supported', 'Subject-Matter Experts', 'Multimedia Localisation', 'ISO 9001:2015 Certified'],
  },
];

const processSteps = [
  { num: '01', label: 'Understand', image: '/images/step-understand.jpg' },
  { num: '02', label: 'Design',     image: '/images/step-design.jpg'     },
  { num: '03', label: 'Deliver',    image: '/images/step-deliver.jpg'    },
  { num: '04', label: 'Apply',      image: '/images/step-apply.jpg'      },
  { num: '05', label: 'Measure',    image: '/images/step-measure.jpg'    },
];

interface WhyFeature {
  icon: ElementType;
  title: string;
  desc: string;
}

const whyFeatures: WhyFeature[] = [
  { icon: Award,    title: 'ISO 9001:2015 Certified', desc: 'Quality management at every stage of delivery.' },
  { icon: Globe,    title: 'Global Reach',             desc: '25+ countries, 40+ languages, one trusted partner.' },
  { icon: Users,    title: '500+ Clients',             desc: 'Trusted by Fortune 500s and fast-growing businesses.' },
  { icon: Clock,    title: '15+ Years Experience',     desc: 'Deep domain expertise across industries.' },
  { icon: Target,   title: 'Outcome-Focused',          desc: 'Every programme tied to measurable KPIs.' },
  { icon: BookOpen, title: 'Custom Content',            desc: 'Bespoke solutions, never off-the-shelf filler.' },
];

const bentoItems = [
  { image: '/images/bento-corporate-training.jpg', label: 'Corporate Training',       large: true  },
  { image: '/images/bento-elearning.jpg',          label: 'eLearning Development',    large: false },
  { image: '/images/bento-localization.jpg',       label: 'Translation & Localisation', large: false },
  { image: '/images/bento-workshops.jpg',          label: 'Workshops & Bootcamps',    large: false },
  { image: '/images/bento-certification.jpg',      label: 'Certification Programmes', large: false },
];

const problemBullets = [
  'Skills don\'t translate into performance',
  'Employees forget what they learned',
  'Teams struggle with real-world execution',
  'ROI remains completely unclear',
];

const consequences = [
  { icon: Clock,     text: 'Slower project delivery' },
  { icon: Building2, text: 'Increased operational errors' },
  { icon: BarChart3, text: 'Low employee productivity' },
  { icon: Layout,    text: 'Poor adoption of new technologies' },
  { icon: Users,     text: 'Higher attrition due to lack of growth' },
];

const differentiators = [
  'Real-world simulations instead of pure theory.',
  'Structured learning paths, not fragmented sessions.',
  'Hybrid delivery models designed for hyper-retention.',
  'Certifications aligned strictly with industry demands.',
  'Unwavering focus on measurable business impact.',
];

const ecFeatures = [
  { title: 'Certified Ethical Hacker (CEH)',       desc: 'Industry gold-standard offensive security certification' },
  { title: 'SOC Analyst (CSA)',                     desc: 'Blue-team operations and threat detection skills' },
  { title: 'Enterprise Cyber Awareness',            desc: 'Organisation-wide security culture programs' },
  { title: 'Continuous Threat Exposure Management', desc: 'Ongoing adversarial readiness and risk reduction' },
];

const skillsoftFeatures = [
  { title: 'AI-Driven Personalization Engine',  desc: "Adaptive journeys that match every learner's role and pace" },
  { title: '200,000+ Digital Learning Assets',  desc: 'Courses, videos, books, and labs across every domain' },
  { title: 'Skill Intelligence & Analytics',    desc: 'Real-time skill gap visibility and workforce benchmarks' },
  { title: 'No Infrastructure Investment',      desc: 'Fully managed SaaS — live in weeks, not months' },
];

const testimonials = [
  {
    quote: 'Prudentia transformed our onboarding programme. New hires reach full productivity 40% faster and report significantly higher job satisfaction from day one.',
    name: 'Anita Sharma',
    title: 'VP of People & Culture',
    company: 'TechServe Global',
  },
  {
    quote: 'The eLearning modules they built for our compliance rollout were outstanding — engaging, accurate, and deployed across 18 countries without a single localisation issue.',
    name: 'James Whitfield',
    title: 'Director of Learning',
    company: 'Meridian Financial Group',
  },
  {
    quote: 'Their translation team handled our technical documentation in 12 languages — on time, on budget, and with the cultural accuracy our local teams demanded.',
    name: 'Priya Nair',
    title: 'Head of Global Operations',
    company: 'Novaris Pharmaceuticals',
  },
];

const testimonialMetrics = [
  { value: '40%',  label: 'faster onboarding' },
  { value: '18',   label: 'countries, zero issues' },
  { value: '12',   label: 'languages delivered' },
];

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#068140]">
      <span className="inline-block w-6 h-0.5 bg-[#068140] shrink-0" />
      {children}
    </span>
  );
}

// ── Navbar data ───────────────────────────────────────────────────────────────

const megaColumns = [
  {
    heading: 'Learning Solutions',
    items: [
      { icon: Users,     title: 'Corporate Training',     desc: 'ILT, VILT, blended learning & leadership programmes' },
      { icon: BookOpen,  title: 'eLearning Development',  desc: 'SCORM, microlearning, gamification & custom LXP builds' },
      { icon: Target,    title: 'Workshops & Bootcamps',  desc: 'Immersive, hands-on skill-building intensives' },
    ],
  },
  {
    heading: 'Specialisations',
    items: [
      { icon: Languages, title: 'Translation & Localisation', desc: '40+ languages — eLearning, technical & marketing content' },
      { icon: Shield,    title: 'Certification Programmes',   desc: 'EC-Council, industry-recognised credentials & compliance' },
    ],
  },
];

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(key);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 80);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/97 backdrop-blur-sm shadow-[0_1px_12px_rgba(0,0,0,0.07)]' : 'bg-transparent'
      }`}
    >
      {/* ── Main bar ── */}
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="/" className="shrink-0">
          <img src="/images/logo-prudentia.png" alt="Prudentia" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {/* Home dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown('home')}
            onMouseLeave={closeDropdown}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[#002747] hover:text-[#00558F] transition-colors">
              Home <ChevronDown size={14} className={`transition-transform duration-200 ${dropdown === 'home' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdown === 'home' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-3 w-44 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
                  onMouseEnter={() => openDropdown('home')}
                  onMouseLeave={closeDropdown}
                >
                  <a href="/"           className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00558F]">Home Original</a>
                  <a href="/home1.html" className="block px-4 py-2.5 text-sm text-[#068140] font-semibold hover:bg-gray-50">Home 1 (New)</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services mega menu trigger */}
          <div
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={closeDropdown}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${dropdown === 'services' ? 'text-[#00558F]' : 'text-[#002747] hover:text-[#00558F]'}`}>
              Services <ChevronDown size={14} className={`transition-transform duration-200 ${dropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <a href="#process"      className="text-sm font-medium text-[#002747] hover:text-[#00558F] transition-colors">How We Work</a>
          <a href="#testimonials" className="text-sm font-medium text-[#002747] hover:text-[#00558F] transition-colors">Testimonials</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:inline-flex btn-primary px-5 py-2.5 text-sm rounded-full">
            <span>Contact Us</span>
          </a>
          <button className="md:hidden p-2 text-[#002747]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mega menu panel (full-width) ── */}
      <AnimatePresence>
        {dropdown === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]"
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={closeDropdown}
          >
            {/* Green top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#068140] via-[#00558F] to-transparent" />

            <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-[1fr_1fr_300px] gap-10">

              {/* Service columns */}
              {megaColumns.map(col => (
                <div key={col.heading}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">{col.heading}</p>
                  <div className="space-y-1">
                    {col.items.map(item => (
                      <a
                        key={item.title}
                        href="#services"
                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-[#F8F7F3] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#068140]/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#068140]/15 transition-colors">
                          <item.icon size={17} className="text-[#068140]" />
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-[#002747] group-hover:text-[#00558F] transition-colors leading-tight">{item.title}</p>
                          <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Featured panel */}
              <div className="bg-[#002747] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]/70 mb-3">Why Prudentia</p>
                  <h3 className="font-serif text-white text-[22px] leading-[1.2] mb-3">
                    500+ organisations<br />
                    <em className="italic text-[#6ee89a]">trust us globally.</em>
                  </h3>
                  <p className="text-white/55 text-[12px] leading-relaxed">
                    From onboarding to advanced defence — learning that drives real performance, not just certificates.
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-3 gap-2 mt-5 mb-5">
                    {[{ v: '15+', l: 'Years' }, { v: '40+', l: 'Languages' }, { v: '25+', l: 'Countries' }].map(s => (
                      <div key={s.l} className="text-center">
                        <p className="font-serif text-white text-[20px] leading-none font-bold">{s.v}</p>
                        <p className="text-white/45 text-[10px] uppercase tracking-wider mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="btn-primary w-full text-center text-sm font-bold py-2.5 rounded-xl block">
                    <span>Book a Free Call</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom bar: explore all */}
            <div className="border-t border-gray-100 bg-[#F8F7F3]">
              <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between">
                <p className="text-[12px] text-gray-400">Trusted by TechServe Global, Meridian Financial, Novaris Pharmaceuticals and 500+ more.</p>
                <a href="#services" className="text-[12px] font-semibold text-[#00558F] hover:text-[#002747] flex items-center gap-1 transition-colors">
                  Explore all services <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              <a href="/"           className="block text-sm text-gray-700 py-2">Home Original</a>
              <a href="/home1.html" className="block text-sm text-[#068140] font-semibold py-2">Home 1 (New)</a>

              {/* Mobile services accordion */}
              <div>
                <button
                  onClick={() => setMobileServices(!mobileServices)}
                  className="w-full flex items-center justify-between text-sm text-gray-700 py-2"
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServices ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServices && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-3 border-l-2 border-[#068140]/20 ml-1 mb-1"
                    >
                      {megaColumns.flatMap(c => c.items).map(item => (
                        <a
                          key={item.title}
                          href="#services"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-2.5"
                        >
                          <item.icon size={14} className="text-[#068140] shrink-0" />
                          <span className="text-sm text-gray-700">{item.title}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#process"      className="block text-sm text-gray-700 py-2">How We Work</a>
              <a href="#testimonials" className="block text-sm text-gray-700 py-2">Testimonials</a>
              <div className="pt-2">
                <a href="#contact" className="btn-primary inline-flex px-5 py-2.5 text-sm rounded-full">
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-[#068140]/10 border border-[#068140]/30 flex items-center justify-center mb-4">
          <Check size={24} className="text-[#068140]" />
        </div>
        <h4 className="font-serif text-xl text-[#002747] mb-2">Thank You!</h4>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">Our team will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Name *</label>
          <input
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 placeholder:text-gray-300 text-gray-800 transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Company</label>
          <input
            value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="Organisation"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 placeholder:text-gray-300 text-gray-800 transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Email *</label>
        <input
          required type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="work@company.com"
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 placeholder:text-gray-300 text-gray-800 transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="+91 XXXXX XXXXX"
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 placeholder:text-gray-300 text-gray-800 transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">I'm interested in</label>
        <select
          value={form.service}
          onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 text-gray-500 transition"
        >
          <option value="">Select a service…</option>
          <option>Corporate Training</option>
          <option>eLearning Development</option>
          <option>Translation & Localisation</option>
          <option>Certification Programme</option>
          <option>Cybersecurity (EC-Council)</option>
          <option>LXP Platform (Skillsoft)</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Message</label>
        <textarea
          rows={2}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your training needs…"
          className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-gray-200 rounded-lg focus:outline-none focus:border-[#068140] focus:ring-1 focus:ring-[#068140]/20 placeholder:text-gray-300 text-gray-800 transition resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full btn-primary py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 group"
      >
        Request Free Consultation
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <p className="text-center text-[11px] text-gray-400">No commitment · Response within 24 hours</p>
    </form>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)' }}
      />
      {/* Strong left-heavy overlay — legible text on left, visible photo on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F3]/98 via-[#F8F7F3]/90 to-[#F8F7F3]/40" />
      {/* Green left accent bar */}
      <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-[#068140] via-[#00558F] to-[#068140] z-20" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left: headline + trust badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#068140] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#068140]" />
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#068140]">
                Corporate Training · eLearning · Translation
              </span>
            </div>

            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[68px] xl:text-[76px] leading-[1.04] tracking-tight text-[#002747]">
              Empower Your<br />
              Team.{' '}
              <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#068140] to-[#00558F]">
                Transform
              </em><br />
              Your Business.
            </h1>

            <p className="mt-7 text-[16px] md:text-[18px] text-gray-500 leading-relaxed max-w-[500px]">
              Prudentia partners with global organisations to design and deliver learning experiences that drive real, measurable performance improvement.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#process" className="inline-flex items-center px-6 py-3 text-sm font-semibold text-[#002747] border-2 border-[#002747]/20 rounded-full hover:border-[#002747]/50 transition-colors bg-white/70 backdrop-blur-sm gap-2">
                How We Work <ArrowRight size={14} />
              </a>
              <a href="#testimonials" className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 hover:text-[#002747] transition-colors">
                See Client Results →
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 pt-8 border-t border-[#002747]/10 grid grid-cols-3 gap-6 max-w-[480px]">
              {[
                { val: '500+', label: 'Companies Served' },
                { val: '15+',  label: 'Years Experience' },
                { val: '40+',  label: 'Languages' },
              ].map(b => (
                <div key={b.label}>
                  <div className="font-serif text-[28px] font-bold text-[#002747] leading-none">{b.val}</div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1 leading-snug">{b.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-[13px] font-medium text-gray-500">
              {['ISO 9001:2015 Certified', '98% Client Retention', 'Microsoft & SAP Partner'].map(badge => (
                <span key={badge} className="flex items-center gap-1.5">
                  <Check size={13} className="text-[#068140]" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: enquiry form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-[0_24px_64px_-12px_rgba(0,39,71,0.18)] border border-gray-100 overflow-hidden">
              {/* Card header */}
              <div className="bg-[#002747] px-6 py-5">
                <h3 className="font-serif text-[20px] text-white leading-tight">Get a Free Consultation</h3>
                <p className="text-white/55 text-xs mt-1">We'll design a solution tailored to your goals.</p>
              </div>
              {/* Green top accent */}
              <div className="h-[3px] bg-gradient-to-r from-[#068140] to-[#00558F]" />
              <div className="px-6 py-6">
                <EnquiryForm />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Stats Strip ───────────────────────────────────────────────────────────────

function StatCounter({ target, suffix = '+', label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(target, inView);
  return (
    <div ref={ref} className="px-4 text-center">
      <div className="font-serif text-[36px] md:text-[52px] leading-none text-white mb-2">{count}{suffix}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

function StatsStrip() {
  return (
    <section className="bg-[#002747] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
          <StatCounter target={500} label="Companies Served" />
          <StatCounter target={15}  label="Years Experience"  />
          <StatCounter target={40}  label="Languages Supported" />
          <StatCounter target={25}  label="Countries Reached" />
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <SectionTag>What We Do</SectionTag>
        <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-[#002747] max-w-lg">
          Learning Solutions Built for the Real World
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.14)] transition-shadow duration-300 border-t-4 border-[#068140] flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl text-[#002747]">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{service.description}</p>
                <ul className="mt-4 space-y-1.5 flex-1">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#068140] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#00558F] hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────────

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(0);

  const descriptions: Record<string, string> = {
    '01': 'We assess skill gaps, roles, and business outcomes before creating a single slide.',
    '02': 'Learning strategies are meticulously aligned to real-world business use cases.',
    '03': 'Hybrid delivery combining instructor-led, virtual, video-based, and interactive modules.',
    '04': 'Real-world scenarios, business simulations, and case-based learning embedded throughout.',
    '05': 'Strict focus on post-training performance gains — not mere attendance numbers.',
  };

  return (
    <section id="process" className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionTag>Our Approach</SectionTag>
            <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] text-[#002747] leading-[1.1]">
              A Structured Path<br />
              <em className="italic text-[#00558F]">to Real Results.</em>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
            Every engagement follows the same rigorous five-stage methodology — no shortcuts.
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {processSteps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === i
                  ? 'bg-[#002747] text-white shadow-md'
                  : 'bg-[#F8F7F3] text-gray-500 hover:text-[#002747]'
              }`}
            >
              <span className={`text-xs font-bold ${active === i ? 'text-[#068140]' : 'text-gray-400'}`}>{step.num}</span>
              {step.label}
            </button>
          ))}
        </div>

        {/* Active step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,39,71,0.14)]"
          >
            <div className="relative h-64 md:h-auto min-h-[320px]">
              <img
                src={processSteps[active].image}
                alt={processSteps[active].label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#002747]/20" />
              <div className="absolute top-6 left-6">
                <span className="font-serif text-[72px] font-bold text-white/20 leading-none select-none">
                  {processSteps[active].num}
                </span>
              </div>
            </div>

            <div className="bg-[#F8F7F3] p-10 lg:p-14 flex flex-col justify-center">
              <SectionTag>Step {processSteps[active].num}</SectionTag>
              <h3 className="mt-4 font-serif text-[36px] text-[#002747] leading-tight">
                {processSteps[active].label}
              </h3>
              <p className="mt-4 text-gray-600 text-[17px] leading-relaxed">
                {descriptions[processSteps[active].num]}
              </p>
              <div className="mt-8 flex gap-2">
                {processSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? 'bg-[#068140] w-8' : 'bg-[#002747]/15 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

// ── Why Prudentia ─────────────────────────────────────────────────────────────

function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionTag>Why Prudentia</SectionTag>
            <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-[#002747]">
              The Partner That Delivers on Its Promises
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We don't just design content — we engineer learning outcomes. Our ISO-certified process, global network, and obsession with measurement set us apart from typical L&D vendors.
            </p>
            <blockquote className="mt-8 pl-5 border-l-2 border-[#068140] italic font-serif text-xl text-[#002747] leading-relaxed">
              "Learning is not something that is done to people. It's something people do."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#068140]/10 flex items-center justify-center shrink-0">
                    <feature.icon size={16} className="text-[#068140]" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#002747] leading-tight">{feature.title}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Bento Gallery ─────────────────────────────────────────────────────────────

function BentoGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="bg-[#F8F7F3] py-24" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionTag>Our Programmes</SectionTag>
            <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] text-[#002747] leading-[1.1]">
              Everything You Need<br />
              <em className="italic text-[#00558F]">Under One Roof.</em>
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#068140] border border-[#068140]/30 px-5 py-2.5 rounded-full hover:bg-[#068140]/5 transition-colors shrink-0">
            View All Services <ArrowRight size={14} />
          </a>
        </div>

        <div
          className="grid gap-3 grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px]"
          ref={ref}
        >
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer${item.large ? ' col-span-2 row-span-2' : ''}`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              {/* Always-on gradient — stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001d37]/85 via-[#001d37]/20 to-transparent" />
              {/* Hover brightens the overlay slightly */}
              <div className="absolute inset-0 bg-[#068140]/0 group-hover:bg-[#068140]/10 transition-colors duration-400" />

              {/* Label — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 text-white font-semibold text-sm leading-tight">
                    <span className="w-2 h-2 rounded-full bg-[#068140] shrink-0" />
                    {item.label}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={13} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Problem ───────────────────────────────────────────────────────────────────

function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-white overflow-hidden" ref={ref}>

      {/* Top half: headline block */}
      <div className="relative max-w-[1280px] mx-auto px-6 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F7F3] border border-gray-200 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#068140]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">The Problem</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-serif text-[36px] sm:text-[48px] lg:text-[72px] xl:text-[80px] leading-[1.0] text-[#002747]"
            >
              Most Training<br />
              <em className="italic text-[#068140]">Doesn't Work.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed max-w-sm lg:text-right lg:mb-2"
          >
            Organizations invest. Employees attend. Certificates get issued.<br />
            <strong className="text-gray-700 font-semibold">But nothing changes.</strong>
          </motion.p>
        </div>

        {/* What goes wrong — horizontal numbered list */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {problemBullets.map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="p-5 md:p-8 hover:bg-white transition-colors bg-[#F8F7F3]"
            >
              <span className="font-serif text-[32px] md:text-[44px] font-bold text-[#002747]/10 leading-none block mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-600 text-[13px] md:text-[15px] leading-snug">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom half: cost of inaction */}
      <div className="relative bg-[#F8F7F3]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

            <div className="lg:w-72 shrink-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">The cost of inaction</p>
              <h3 className="font-serif text-[28px] text-[#002747] leading-snug">
                If This Continues,{' '}
                <em className="italic text-[#068140]">It Gets Expensive.</em>
              </h3>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {consequences.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                  className="flex flex-col items-center text-center gap-2.5 p-4 bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F8F7F3] border border-gray-100 flex items-center justify-center">
                    <item.icon size={17} className="text-[#068140]" />
                  </div>
                  <span className="text-xs text-gray-600 leading-snug font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance gap banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 bg-[#002747] rounded-xl flex items-center justify-between gap-6 px-8 py-5"
          >
            <div className="flex items-center gap-4">
              <TrendingUp size={22} className="text-[#068140] shrink-0" />
              <p className="text-white font-serif italic text-lg leading-snug">
                This isn't a training problem.{' '}
                <span className="not-italic font-sans font-semibold text-base">It's a performance gap.</span>
              </p>
            </div>
            <a href="#contact" className="shrink-0 btn-primary inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full group">
              Fix It Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Trust & Differentiation ───────────────────────────────────────────────────

function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="bg-[#002747] py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute -top-40 -right-40 w-[40vw] h-[40vw] bg-[#068140]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[36vw] h-[36vw] bg-[#00558F]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#068140]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/90">The Prudentia Difference</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[28px] sm:text-[36px] lg:text-[52px] leading-[1.1] text-white mb-6"
            >
              Why Most Training Fails<br />
              <em className="italic text-[#6ee89a]">— And Why Prudentia Delivers.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/75 text-[17px] leading-relaxed mb-8 max-w-lg"
            >
              While most providers focus on content delivery — dumping information and hoping it sticks — we deliver something different.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.4 }}
              className="inline-block"
            >
              <p className="font-serif italic text-xl leading-tight text-white bg-gradient-to-br from-[#068140]/90 to-[#00558F]/90 px-6 py-4 rounded-xl border border-[#068140]/30 shadow-[0_20px_50px_-12px_rgba(6,129,64,0.4)]">
                Prudentia focuses on{' '}
                <span className="not-italic font-sans font-semibold">performance outcomes.</span>
              </p>
            </motion.div>
          </div>

          {/* Right — differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-8 lg:p-10"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#068140] mb-6">What makes the difference</p>
            <ul className="space-y-4">
              {differentiators.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 size={20} className="text-[#6ee89a] shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span className="text-[16px] text-white/85 leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-2 gap-6">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[42px] text-white leading-none">500+</span>
                <span className="text-[11px] uppercase tracking-widest text-white/55 leading-tight">Global<br />Organizations</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[42px] text-[#6ee89a] leading-none">100%</span>
                <span className="text-[11px] uppercase tracking-widest text-white/55 leading-tight">ROI<br />Focused</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── EC-Council Partnership ────────────────────────────────────────────────────

function ECCouncilSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#002747]" style={{ minHeight: '560px' }}>
      {/* Green glow — top right */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] bg-[#068140]/12 rounded-full blur-[140px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-[1280px] mx-auto px-6 py-20 lg:py-28">

        {/* Top row: badge left, large decorative word right */}
        <div className="flex items-start justify-between mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#068140]/15 border border-[#068140]/30 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#068140]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]">In Partnership with EC-Council</span>
          </motion.div>
          <span className="hidden lg:block font-serif text-[7rem] font-bold leading-none text-white/4 select-none tracking-tighter -mt-4">
            CYBER
          </span>
        </div>

        {/* Main 2-col */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Left: heading + desc + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] text-white mb-6"
            >
              From Awareness<br />
              to{' '}
              <em className="italic text-[#6ee89a]">Advanced Defense.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-[17px] text-white/55 leading-relaxed mb-10 max-w-md"
            >
              Certified cybersecurity capability for your entire workforce — from first-line awareness to advanced threat response.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.38 }}
              href="#contact"
              className="btn-primary inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-full text-sm tracking-wide group"
            >
              Explore Cybersecurity Training
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: numbered editorial list */}
          <div className="space-y-0 divide-y divide-white/8">
            {ecFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-6 py-6 group hover:bg-white/3 px-2 -mx-2 rounded-xl transition-colors"
              >
                <span className="font-serif text-[28px] font-bold text-[#068140]/40 group-hover:text-[#068140]/80 transition-colors leading-none mt-0.5 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-white font-semibold text-[15px] mb-1 leading-snug">{f.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Skillsoft Percipio ────────────────────────────────────────────────────────

function SkillsoftSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const platformStats = [
    { value: '200K+', label: 'Learning Assets' },
    { value: 'AI',    label: 'Personalized Paths' },
    { value: '8 wks', label: 'Avg. Time to Deploy' },
    { value: '100%',  label: 'Cloud-Managed' },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F8F7F3] py-20 lg:py-28">
      {/* Cyan accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00a3e0] via-[#00558F] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00a3e0]/10 border border-[#00a3e0]/25 rounded-full mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#00a3e0]" />
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#00558F]">Powered by Skillsoft Percipio</span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* Left: heading + description + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] text-[#002747] mb-6"
            >
              Enterprise Learning<br />
              <em className="italic text-[#00558F]">as a Subscription.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-[17px] text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              A fully managed LXP deployed in weeks. AI-personalized learning journeys, 200,000+ assets, and real-time skill intelligence — zero infrastructure required.
            </motion.p>

            {/* Platform stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              {platformStats.map((s, i) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-[#002747]/8 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]">
                  <div className="font-serif text-[26px] font-bold text-[#00558F] leading-none mb-1">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-400 leading-snug">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-[#002747] text-white font-bold px-8 py-4 rounded-full hover:bg-[#00558F] transition-colors text-sm tracking-wide group"
            >
              Explore the LXP Platform
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: features as clean rows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="bg-white rounded-3xl border border-[#002747]/8 shadow-[0_8px_40px_-8px_rgba(0,39,71,0.1)] overflow-hidden"
          >
            {skillsoftFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-start gap-5 px-7 py-6 ${i < skillsoftFeatures.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-[#f0f9ff] transition-colors group`}
              >
                <div className="w-1 self-stretch rounded-full bg-[#00a3e0]/20 group-hover:bg-[#00a3e0] transition-colors shrink-0 mt-1" />
                <div>
                  <h4 className="text-[#002747] font-semibold text-sm mb-1 leading-snug">{f.title}</h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const DURATION = 5000;

  const go = (idx: number) => { setActive(idx); setProgress(0); };
  const prev = () => go((active - 1 + testimonials.length) % testimonials.length);
  const next = () => go((active + 1) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const step = 40;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += step;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed >= DURATION) {
        elapsed = 0;
        setActive(a => (a + 1) % testimonials.length);
        setProgress(0);
      }
    }, step);
    return () => clearInterval(timer);
  }, [paused, active]);

  const t = testimonials[active];
  const m = testimonialMetrics[active];

  return (
    <section
      id="testimonials"
      className="bg-white py-24 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[340px_1fr] gap-16 lg:gap-24 items-center">

          {/* Left — label + heading + navigation */}
          <div>
            <SectionTag>Client Stories</SectionTag>
            <h2 className="mt-5 font-serif text-[28px] sm:text-[36px] lg:text-[50px] leading-[1.1] text-[#002747]">
              Outcomes,<br />
              <em className="italic text-[#068140]">not just stories.</em>
            </h2>
            <p className="mt-5 text-gray-400 text-[15px] leading-relaxed max-w-[260px]">
              Every engagement measured against real business impact — not certificates issued.
            </p>

            {/* Arrow nav + counter */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
              <span className="ml-2 font-serif text-[#002747]">
                <span className="text-[22px] font-bold">{String(active + 1).padStart(2, '0')}</span>
                <span className="text-gray-300 mx-1.5">/</span>
                <span className="text-sm text-gray-400">{String(testimonials.length).padStart(2, '0')}</span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-5 w-[180px] h-[2px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#068140] rounded-full"
                style={{ width: `${progress}%`, transition: paused ? 'none' : 'width 40ms linear' }}
              />
            </div>
          </div>

          {/* Right — quote */}
          <div className="relative min-h-[280px] flex items-center">
            {/* Decorative large quote */}
            <span className="absolute -top-6 -left-2 font-serif text-[140px] leading-none text-[#068140]/8 select-none pointer-events-none">
              "
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full"
              >
                <blockquote className="font-serif italic text-[22px] lg:text-[27px] text-[#002747] leading-[1.5]">
                  "{t.quote}"
                </blockquote>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#002747] flex items-center justify-center shrink-0">
                      <span className="font-serif text-white text-[18px] font-bold leading-none">
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#002747] text-[15px]">{t.name}</p>
                      <p className="text-gray-400 text-sm">{t.title}, {t.company}</p>
                    </div>
                  </div>

                  {/* Metric callout */}
                  <div className="sm:pl-8 sm:border-l sm:border-gray-100 shrink-0">
                    <p className="font-serif text-[#068140] text-[36px] leading-none font-bold">{m.value}</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{m.label}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section id="contact" className="relative bg-[#002747] py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#068140] opacity-[0.12] rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
        <SectionTag>Let's Work Together</SectionTag>
        <h2 className="mt-4 font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15] text-white">
          Ready to Transform Your<br /><em className="italic">Learning Culture?</em>
        </h2>
        <p className="mt-6 text-white/65 text-lg max-w-lg mx-auto leading-relaxed">
          Talk to our experts. We'll design a learning strategy tailored to your goals, your people, and your budget.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:info@prudentia.bizzinfo.in"
            className="inline-flex items-center gap-2 bg-white text-[#002747] font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors shadow-lg text-sm"
          >
            Schedule a Free Call <ArrowRight size={16} />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:border-white/60 transition-colors text-sm"
          >
            View Our Services
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#001d37] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img src="/images/logo-prudentia.png" alt="Prudentia" className="h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              Real-world learning solutions for global organisations.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Services</h5>
            <ul className="space-y-2.5">
              {['Corporate Training', 'eLearning Development', 'Translation & Localisation', 'Workshops & Bootcamps'].map(item => (
                <li key={item}>
                  <a href="#services" className="text-white/55 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Company</h5>
            <ul className="space-y-2.5">
              {['About Us', 'Case Studies', 'Careers', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/55 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Get in Touch</h5>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@prudentia.bizzinfo.in" className="text-white/55 text-sm hover:text-white transition-colors">
                  info@prudentia.bizzinfo.in
                </a>
              </li>
              <li className="text-white/55 text-sm">Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-sm">© 2025 Prudentia Technology Solutions India Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="text-white/35 text-sm hover:text-white/60 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home1() {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#F8F7F3]">
        <Navbar />
        <HeroSection />
        <StatsStrip />
        <ProblemSection />
        <ProcessSection />
        <WhySection />
        <TrustSection />
        <BentoGallery />
        <ECCouncilSection />
        <SkillsoftSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </ReactLenis>
  );
}
