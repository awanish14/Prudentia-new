import { motion, useInView, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  ChevronDown, ArrowRight, Check, Menu, X,
  Globe, BookOpen, Users, Award, Clock, Target, MessageSquare,
  BarChart3, Building2, Layout, TrendingUp, CheckCircle2,
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

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#068140]">
      <span className="inline-block w-6 h-0.5 bg-[#068140] shrink-0" />
      {children}
    </span>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_12px_rgba(0,0,0,0.07)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="/" className="shrink-0">
          <img src="/images/logo-prudentia.png" alt="Prudentia" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setDropdown('home')}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[#002747] hover:text-[#00558F] transition-colors">
              Home <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {dropdown === 'home' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
                >
                  <a href="/"          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00558F]">Home Original</a>
                  <a href="/home1.html" className="block px-4 py-2.5 text-sm text-[#068140] font-semibold hover:bg-gray-50">Home 1 (New)</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setDropdown('services')}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-[#002747] hover:text-[#00558F] transition-colors">
              Services <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {dropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
                >
                  <a href="#services" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00558F]">Corporate Training</a>
                  <a href="#services" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00558F]">eLearning Development</a>
                  <a href="#services" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00558F]">Translation & Localisation</a>
                </motion.div>
              )}
            </AnimatePresence>
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
              <a href="#services"   className="block text-sm text-gray-700 py-2">Services</a>
              <a href="#process"    className="block text-sm text-gray-700 py-2">How We Work</a>
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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F3] via-[#F8F7F3]/92 to-[#F8F7F3]/25" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[600px]"
        >
          <SectionTag>Corporate Training · eLearning · Translation</SectionTag>

          <h1 className="mt-6 font-serif text-[52px] lg:text-[64px] leading-[1.08] tracking-tight text-[#002747]">
            Empower Your Team.<br />
            <em className="italic text-[#00558F]">Transform Your Business.</em>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-[480px]">
            Prudentia partners with global organisations to design and deliver learning experiences that drive real, measurable performance improvement.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary px-7 py-3.5 text-sm rounded-full">
              <span>Get Free Consultation</span>
              <ArrowRight size={16} className="ml-2" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center px-7 py-3.5 text-sm font-medium text-[#002747] border border-[#002747]/30 rounded-full hover:border-[#002747]/70 transition-colors bg-white/60 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-[#002747]/10 flex flex-wrap gap-6 text-sm font-medium text-[#002747]">
            {['ISO 9001:2015 Certified', '98% Client Retention', '500+ Companies Served'].map(badge => (
              <div key={badge} className="flex items-center gap-2">
                <Check size={15} className="text-[#068140] shrink-0" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
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
      <div className="font-serif text-[52px] leading-none text-white mb-2">{count}{suffix}</div>
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
        <h2 className="mt-4 font-serif text-[42px] leading-[1.2] text-[#002747] max-w-lg">
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

  return (
    <section id="process" className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="text-center mb-14">
          <SectionTag>Our Approach</SectionTag>
          <h2 className="mt-4 font-serif text-[42px] text-[#002747]">How We Work</h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="hidden md:block absolute top-[58px] left-[9%] right-[9%] h-px bg-[#E8EEF4]" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center flex-1"
            >
              <div className="relative">
                <div className="w-[116px] h-[116px] rounded-full overflow-hidden border-4 border-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
                  <img src={step.image} alt={step.label} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#068140] text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.num}
                </span>
              </div>
              <p className="mt-4 font-serif text-lg text-[#002747]">{step.label}</p>
            </motion.div>
          ))}
        </div>
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
            <h2 className="mt-4 font-serif text-[42px] leading-[1.2] text-[#002747]">
              The Partner That Delivers on Its Promises
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We don't just design content — we engineer learning outcomes. Our ISO-certified process, global network, and obsession with measurement set us apart from typical L&D vendors.
            </p>
            <blockquote className="mt-8 pl-5 border-l-2 border-[#068140] italic font-serif text-xl text-[#002747] leading-relaxed">
              "Learning is not something that is done to people. It's something people do."
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <SectionTag>Our Work</SectionTag>
          <h2 className="mt-4 font-serif text-[42px] text-[#002747]">Explore Our Programmes</h2>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 220px)',
          }}
        >
          {bentoItems.map((item, i) => (
            <div
              key={item.image}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={item.large ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}}
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002747]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                initial={false}
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#068140] shrink-0" />
                  {item.label}
                </span>
              </motion.div>
            </div>
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
    <section className="bg-white py-24" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Headline */}
        <div className="text-center mb-16">
          <SectionTag>The Problem</SectionTag>
          <h2 className="mt-4 font-serif text-[42px] lg:text-[52px] leading-[1.1] text-[#002747]">
            Most Training<br /><em className="italic text-[#068140]">Doesn't Work.</em>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
            Organizations invest. Employees attend. Certificates get issued. But nothing changes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* What goes wrong */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-[#F8F7F3] rounded-2xl p-8 border border-[#002747]/8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">What goes wrong</p>
            <ul className="space-y-4">
              {problemBullets.map((text, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </span>
                  <span className="text-gray-700 text-[16px] leading-snug">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Cost of inaction */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">The cost of inaction</p>
              <h3 className="font-serif text-[26px] text-[#002747] leading-snug mb-2">
                If This Continues,{' '}
                <em className="italic text-[#068140]">It Gets Expensive.</em>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                When training fails, the consequences compound across your entire organization.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {consequences.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                  className="flex flex-col items-center text-center gap-2 p-4 bg-[#F8F7F3] rounded-xl border border-[#002747]/6"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-[#068140]/20 flex items-center justify-center">
                    <item.icon size={18} className="text-[#068140]" />
                  </div>
                  <span className="text-xs text-gray-600 leading-snug">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#002747] rounded-xl flex items-center gap-4 px-6 py-5">
              <TrendingUp size={20} className="text-[#068140] shrink-0" />
              <p className="flex-1 text-white text-[16px] font-serif italic leading-snug">
                This isn't a training problem.{' '}
                <span className="not-italic font-sans font-semibold text-sm">It's a performance gap.</span>
              </p>
              <ArrowRight size={16} className="text-white/50 shrink-0" />
            </div>
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
              className="font-serif text-[42px] lg:text-[52px] leading-[1.1] text-white mb-6"
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
            <ul className="space-y-5">
              {differentiators.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 size={20} className="text-[#6ee89a] shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span className="text-[17px] text-white/90 font-medium leading-snug">{point}</span>
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
    <section ref={ref} className="relative overflow-hidden py-24 bg-[#002747]">
      <div className="absolute inset-y-0 left-0 w-[3px] bg-[#e63946]" />
      <div className="absolute -top-40 -right-24 w-[40vw] h-[40vw] bg-[#e63946]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e63946]/15 border border-[#e63946]/30 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#e67a7f]">In Partnership with EC-Council</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[42px] lg:text-[52px] leading-[1.1] text-white mb-6"
            >
              From Awareness to<br />
              <em className="italic text-[#e67a7f]">Advanced Defense.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/65 leading-relaxed mb-8 max-w-lg"
            >
              Certified cybersecurity capability for your entire workforce — spanning training, certifications, enterprise awareness, and continuous threat readiness.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#e63946] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#c62d39] transition-colors text-sm"
            >
              Explore Cybersecurity Training <ArrowRight size={16} />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ecFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#e63946] mb-3" />
                <h4 className="text-white font-semibold text-sm mb-1.5 leading-snug">{f.title}</h4>
                <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
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

  return (
    <section ref={ref} className="relative overflow-hidden py-24 bg-[#001d37]">
      <div className="absolute inset-y-0 left-0 w-[3px] bg-[#00a3e0]" />
      <div className="absolute -top-40 -right-24 w-[40vw] h-[40vw] bg-[#00a3e0]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00a3e0]/15 border border-[#00a3e0]/30 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00a3e0]" />
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#00a3e0]">Powered by Skillsoft Percipio</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[42px] lg:text-[52px] leading-[1.1] text-white mb-6"
            >
              Enterprise Learning<br />
              <em className="italic text-[#00a3e0]">as a Subscription.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/65 leading-relaxed mb-8 max-w-lg"
            >
              A fully managed Learning Experience Platform deployed in weeks — AI-personalized journeys, 200,000+ assets, and measurable skill intelligence built in.
            </motion.p>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#00a3e0] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008bbf] transition-colors text-sm"
            >
              Explore LXP Platform <ArrowRight size={16} />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsoftFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.09 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00a3e0] mb-3" />
                <h4 className="text-white font-semibold text-sm mb-1.5 leading-snug">{f.title}</h4>
                <p className="text-white/55 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="bg-[#F8F7F3] py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <SectionTag>Testimonials</SectionTag>
        <h2 className="mt-4 font-serif text-[42px] text-[#002747]">What Our Clients Say</h2>

        <div className="mt-12 relative">
          <div className="absolute -top-4 left-4 font-serif text-[100px] leading-none text-[#068140]/12 select-none pointer-events-none">
            "
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-2xl p-10 shadow-[0_4px_32px_-4px_rgba(0,0,0,0.10)]"
            >
              <p className="text-lg text-gray-700 leading-relaxed italic">"{t.quote}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#002747]/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#002747]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-[#002747]">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'bg-[#068140] w-6' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
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
        <h2 className="mt-4 font-serif text-[48px] leading-[1.15] text-white">
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
        <ServicesSection />
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
