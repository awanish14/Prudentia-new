import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Check, Menu, X,
  Globe, BookOpen, Users, Award, Clock, Target, MessageSquare,
  CheckCircle2, Shield, Languages,
  Mail, Phone, MapPin, Linkedin, Twitter, Youtube, GraduationCap, Monitor,
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
    features: ['40+ Languages Supported', 'Subject-Matter Experts', 'Multimedia Localisation', 'Cultural Accuracy Guaranteed'],
  },
];

const processSteps = [
  { num: '01', label: 'Understand', image: '/images/step-understand.jpg' },
  { num: '02', label: 'Design',     image: '/images/step-design.jpg'     },
  { num: '03', label: 'Deliver',    image: '/images/step-deliver.jpg'    },
  { num: '04', label: 'Apply',      image: '/images/step-apply.jpg'      },
  { num: '05', label: 'Measure',    image: '/images/step-measure.jpg'    },
];

const processDescriptions: Record<string, string> = {
  '01': 'We assess skill gaps, roles, and business outcomes before creating a single slide.',
  '02': 'Learning strategies are meticulously aligned to real-world business use cases.',
  '03': 'Hybrid delivery combining instructor-led, virtual, video-based, and interactive modules.',
  '04': 'Real-world scenarios, business simulations, and case-based learning embedded throughout.',
  '05': 'Strict focus on post-training performance gains — not mere attendance numbers.',
};

const stepVariants = {
  enter:  { y: 16, opacity: 0, scale: 0.98 },
  center: { y: 0,  opacity: 1, scale: 1,   transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit:   { y: -8, opacity: 0, scale: 0.98, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

interface WhyFeature {
  icon: ElementType;
  title: string;
  desc: string;
}

const whyFeatures: WhyFeature[] = [
  { icon: Globe,    title: 'Global Reach',         desc: '25+ countries, 15+ industries, one trusted partner.' },
  { icon: Users,    title: '1000+ Corporates',     desc: 'Trusted by Fortune 500s and fast-growing businesses.' },
  { icon: Clock,    title: '15+ Years Experience', desc: 'Deep domain expertise across industries.' },
  { icon: Target,   title: 'Outcome-Focused',      desc: 'Every programme tied to measurable KPIs.' },
];

const bentoItems = [
  { image: '/images/bento-corporate-training.jpg', label: 'Corporate Training',       large: true  },
  { image: '/images/bento-elearning.jpg',          label: 'eLearning Development',    large: false },
  { image: '/images/bento-localization.jpg',       label: 'Translation & Localisation', large: false },
  { image: '/images/bento-workshops.jpg',          label: 'Workshops & Bootcamps',    large: false },
  { image: '/images/bento-certification.jpg',      label: 'Certification Programmes', large: false },
];

const outcomeBullets = [
  'Skills that translate directly into performance',
  'Learning designed to stick — not just to pass',
  'Teams equipped for real-world execution',
  'Clear, measurable ROI from every engagement',
];

const differentiators = [
  'Real-world simulations instead of pure theory.',
  'Structured learning paths, not fragmented sessions.',
  'Hybrid delivery models designed for hyper-retention.',
  'Certifications aligned strictly with industry demands.',
  'Unwavering focus on measurable business impact.',
];

const ecFeatures = [
  { title: 'Certified Ethical Hacker (CEH)',           desc: 'Industry gold-standard offensive security certification' },
  { title: 'SOC Analyst (CSA)',                         desc: 'Blue-team operations and threat detection skills' },
  { title: 'Certified Cloud Security Engineer (CCSE)', desc: 'Advanced cloud security architecture and compliance' },
  { title: 'EC-Council Incident Handler (ECIH)',       desc: 'Incident response, digital forensics, and recovery' },
];

const sapFeatures = [
  { title: 'Curriculum Development',     desc: 'Collaborating with universities to design comprehensive, industry-aligned SAP training courses.' },
  { title: 'Hands-On ERP Training',      desc: 'Real-life scenarios and practical exercises inside live SAP enterprise environments.' },
  { title: 'Full Tool Proficiency',      desc: 'Deep expertise across all SAP modules, tools, and end-to-end business workflows.' },
  { title: 'Professional Certification', desc: 'Industry-recognised SAP credentials that validate real-world competency and career readiness.' },
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

const clientLogos = [
  { src: '/images/clients/hp-logo-icon-8.png',                                   alt: 'HP' },
  { src: '/images/clients/Schneider_Electric_2007.svg.png',                       alt: 'Schneider Electric' },
  { src: '/images/clients/mercedes_logos_PNG9.png',                               alt: 'Mercedes-Benz' },
  { src: '/images/clients/Vodafone_Logo.svg.png',                                 alt: 'Vodafone' },
  { src: '/images/clients/Fiserv_logo.svg.png',                                   alt: 'Fiserv' },
  { src: '/images/clients/HEXAWARE.NS_BIG-3c8842d4.png',                          alt: 'Hexaware' },
  { src: '/images/clients/_0098_zensar-technologies.png',                         alt: 'Zensar' },
  { src: '/images/clients/BNY_Mellon.svg.png',                                    alt: 'BNY Mellon' },
  { src: '/images/clients/HSBC_Logo_2018.png',                                    alt: 'HSBC' },
  { src: '/images/clients/Honeywell_logo.svg.png',                                alt: 'Honeywell' },
  { src: '/images/clients/john-deere-logo-png-transparent.png',                   alt: 'John Deere' },
  { src: '/images/clients/Sulzer_AG_logo.svg',                                    alt: 'Sulzer' },
  { src: '/images/clients/KSB.DE_BIG-3ed3e06b.png',                               alt: 'KSB' },
  { src: '/images/clients/Bata.svg.png',                                           alt: 'Bata' },
  { src: '/images/clients/LT-Infotech-Logo-Vector.svg-.png',                      alt: 'LTI Mindtree' },
  { src: '/images/clients/Atos-Logo.png',                                          alt: 'Atos' },
  { src: '/images/clients/Logo_of_Deloitte.svg.png',                              alt: 'Deloitte' },
  { src: '/images/clients/Spectrum_Logo.png',                                      alt: 'Spectrum' },
  { src: '/images/clients/global-edge.jpg',                                        alt: 'Global Edge' },
  { src: '/images/clients/Birlasoft_logo.png',                                     alt: 'Birlasoft' },
  { src: '/images/clients/Skillsoft-logo-navy-RGB_.png',                           alt: 'Skillsoft' },
  { src: '/images/clients/Tata_Technologies_logo.svg.png',                         alt: 'Tata Technologies' },
  { src: '/images/clients/bristlecone_logo_600.png',                               alt: 'Bristlecone' },
  { src: '/images/clients/Infosys_logo.svg.png',                                   alt: 'Infosys' },
  { src: '/images/clients/NuSummit-Logo-Color.png',                                alt: 'NuSummit' },
  { src: '/images/clients/SKODA-AUTO-Volkswagen-India-Private-Limited-logo.jpg',   alt: 'Skoda' },
  { src: '/images/clients/Intelliswift-Ltts-Logo-img-02.png',                      alt: 'Intelliswift' },
  { src: '/images/clients/Fulcrum_Digital_Logo.jpg',                               alt: 'Fulcrum Digital' },
  { src: '/images/clients/Mankind_Serving_Life.png',                               alt: 'Mankind Pharma' },
  { src: '/images/clients/Principal_Financial_Group_logo.svg.png',                 alt: 'Principal Financial' },
  { src: '/images/clients/CC-Logo-Tagline-Berry-300x.png',                         alt: 'CC' },
  { src: '/images/clients/Vanderlande-Logo-Black_Orange-line-RGB-_JPG_9740.jpg',   alt: 'Vanderlande' },
  { src: '/images/clients/Investec_logo.svg.png',                                  alt: 'Investec' },
  { src: '/images/clients/Syngene-logo-newsroom.png',                              alt: 'Syngene' },
  { src: '/images/clients/NEULANDLAB.NS_BIG-37c34c1e.png',                         alt: 'Neuland Labs' },
  { src: '/images/clients/magma-logo-scaled.jpg',                                  alt: 'Magma' },
  { src: '/images/clients/Datamatics-Logo.wine.png',                               alt: 'Datamatics' },
];

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#068140]">
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
    heading: 'Specialisations & Partners',
    items: [
      { icon: Languages,      title: 'Translation & Localisation', desc: '40+ languages — eLearning, technical & marketing content' },
      { icon: Shield,         title: 'Cybersecurity (EC-Council)', desc: 'CEH, CSA, CCSE, ECIH — certified cyber training & awareness' },
      { icon: GraduationCap,  title: 'SAP Academy Training',       desc: 'ERP curriculum, SAP tools & professional certification' },
      { icon: Monitor,        title: 'Skillsoft Percipio LXP',     desc: 'AI-driven platform with 200K+ digital learning assets' },
    ],
  },
];

// ── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar({ isSubpage = false }: { isSubpage?: boolean }) {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileServices, setMobileServices] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lk = (anchor: string) => isSubpage ? `/${anchor}` : anchor;
  // On subpages (dark hero banner) with transparent navbar, use light text
  const navLight = isSubpage && !scrolled;
  const linkCls = navLight ? 'text-white/90 hover:text-white' : 'text-[#002747] hover:text-[#00558F]';

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
          <img src="/images/logo-prudentia.png" alt="Prudentia" className="h-14 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/" className={`text-sm font-medium transition-colors ${linkCls}`}>Home</a>

          {/* Services mega menu trigger */}
          <div
            onMouseEnter={() => openDropdown('services')}
            onMouseLeave={closeDropdown}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${dropdown === 'services' ? 'text-[#00558F]' : linkCls}`}>
              Services <ChevronDown size={14} className={`transition-transform duration-200 ${dropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <a href={lk('#process')}      className={`text-sm font-medium transition-colors ${linkCls}`}>How We Work</a>
          <a href={lk('#testimonials')} className={`text-sm font-medium transition-colors ${linkCls}`}>Testimonials</a>
          <a href="/about" className={`text-sm font-medium transition-colors ${navLight ? 'text-white font-semibold' : isSubpage ? 'text-[#00558F]' : 'text-[#002747] hover:text-[#00558F]'}`}>About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="/contact" className="hidden md:inline-flex btn-primary px-5 py-2.5 text-sm rounded-full">
            <span>Contact Us</span>
          </a>
          <button className={`md:hidden p-2 ${navLight ? 'text-white' : 'text-[#002747]'}`} onClick={() => setMobileOpen(!mobileOpen)}>
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
                        href={lk('#services')}
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
                    {[{ v: '1000+', l: 'Trained' }, { v: '50+', l: 'Abroad' }, { v: '20+', l: 'Certs' }].map(s => (
                      <div key={s.l} className="text-center">
                        <p className="font-serif text-white text-[20px] leading-none font-bold">{s.v}</p>
                        <p className="text-white/45 text-[10px] uppercase tracking-wider mt-1">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <a href={lk('#contact')} className="btn-primary w-full text-center text-sm font-bold py-2.5 rounded-xl block">
                    <span>Book a Free Call</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom bar: explore all */}
            <div className="border-t border-gray-100 bg-[#F8F7F3]">
              <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between">
                <p className="text-[12px] text-gray-400">Trusted by TechServe Global, Meridian Financial, Novaris Pharmaceuticals and 500+ more.</p>
                <a href={lk('#services')} className="text-[12px] font-semibold text-[#00558F] hover:text-[#002747] flex items-center gap-1 transition-colors">
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
              <a href="/" className="block text-sm font-medium text-[#002747] py-2">Home</a>

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
                          href={lk('#services')}
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

              <a href={lk('#process')}      className="block text-sm text-gray-700 py-2">How We Work</a>
              <a href={lk('#testimonials')} className="block text-sm text-gray-700 py-2">Testimonials</a>
              <a href="/about" className="block text-sm text-gray-700 py-2">About Us</a>
              <div className="pt-2">
                <a href="/contact" className="btn-primary inline-flex px-5 py-2.5 text-sm rounded-full">
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

// ── Client Logo Strip ─────────────────────────────────────────────────────────

function LogoRow({ logos, duration, reverse }: { logos: typeof clientLogos; duration: number; reverse: boolean }) {
  const track = [...logos, ...logos];
  const anim = reverse
    ? `marquee-logos-reverse ${duration}s linear infinite`
    : `marquee-logos ${duration}s linear infinite`;

  return (
    <div
      className="flex items-center gap-12"
      style={{ animation: anim, width: 'max-content' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
    >
      {track.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className="h-8 w-auto max-w-[120px] object-contain opacity-75 hover:opacity-100 transition-all duration-300 cursor-default select-none shrink-0"
          style={{ mixBlendMode: 'multiply' }}
        />
      ))}
    </div>
  );
}

function ClientLogoStrip() {
  const row1 = clientLogos.slice(0, 13);
  const row2 = clientLogos.slice(13, 26);
  const row3 = clientLogos.slice(26);
  const maskStyle = {
    maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
  };

  return (
    <section className="bg-white border-b border-gray-100 py-10 overflow-hidden">
      <div className="flex justify-center mb-8 px-6">
        <SectionTag>Trusted by Global Organisations</SectionTag>
      </div>
      <div className="flex flex-col gap-9">
        <div className="overflow-hidden" style={maskStyle}>
          <LogoRow logos={row1} duration={40} reverse={false} />
        </div>
        <div className="overflow-hidden" style={maskStyle}>
          <LogoRow logos={row2} duration={50} reverse={true} />
        </div>
        <div className="overflow-hidden" style={maskStyle}>
          <LogoRow logos={row3} duration={44} reverse={false} />
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY     = useTransform(scrollY, [0, 600],  ['0%', '22%']);
  const bgScale = useTransform(scrollY, [0, 900],  [1.0, 1.22]);


  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax + scrub-zoom background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-slide-1.jpg)', y: bgY, scale: bgScale }}
      />
      {/* Left-heavy cream overlay — inline style avoids Tailwind opacity-modifier edge cases */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(to right, rgba(248,247,243,0.98) 0%, rgba(248,247,243,0.92) 45%, rgba(248,247,243,0.42) 100%)' }}
      />
      {/* Green left accent bar */}
      <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-[#068140] via-[#00558F] to-[#068140] z-20" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left: headline + trust badges ── */}
          <div>
            {/* Tag line slides in */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#068140] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#068140]" />
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#068140]">
                Corporate Training · eLearning · Translation
              </span>
            </motion.div>

            {/* Line-by-line reveal */}
            <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[78px] xl:text-[90px] leading-[1.0] tracking-tight text-[#002747]">
              {[
                <span key="l1">Empower Your</span>,
                <span key="l2">Team.{' '}<em className="italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #068140, #00558F)' }}>Transform</em></span>,
                <span key="l3">Your Business.</span>,
              ].map((line, i) => (
                <div key={i} className="overflow-hidden leading-[1.18]">
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.75, delay: 0.15 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h1>

            <motion.p
              className="mt-7 text-[16px] md:text-[18px] text-gray-500 leading-relaxed max-w-[500px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Prudentia partners with global organisations to design and deliver learning experiences that drive real, measurable performance improvement.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#process" className="inline-flex items-center px-6 py-3 text-sm font-semibold text-[#002747] border-2 border-[#002747]/20 rounded-full hover:border-[#002747]/50 transition-colors bg-white/70 backdrop-blur-sm gap-2">
                How We Work <ArrowRight size={14} />
              </a>
              <a href="#testimonials" className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-500 hover:text-[#002747] transition-colors">
                See Client Results →
              </a>
            </motion.div>

            {/* Trust badges — staggered */}
            <motion.div
              className="mt-12 pt-8 border-t border-[#002747]/10 hidden sm:grid grid-cols-3 gap-6 max-w-[480px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              {[
                { val: '1000+', label: 'Corporates Trained' },
                { val: '50+',   label: 'Abroad Corporates' },
                { val: '20+',   label: 'Certifications' },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                >
                  <div className="font-serif text-[28px] font-bold text-[#002747] leading-none">{b.val}</div>
                  <div className="text-[12px] font-medium text-gray-600 mt-1 leading-snug">{b.label}</div>
                </motion.div>
              ))}
            </motion.div>

          </div>

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
                <p className="text-white/55 text-[13px] mt-1">We'll design a solution tailored to your goals.</p>
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

function StatCounter({ target, suffix = '+', label, delay = 0 }: { target: number; suffix?: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(target, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 text-center"
    >
      <div className="font-serif text-[36px] md:text-[52px] leading-none text-white mb-2">{count}{suffix}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/60">{label}</div>
    </motion.div>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-[#002747] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
          <StatCounter target={500} label="Companies Served"  delay={0}    />
          <StatCounter target={15}  label="Years Experience"  delay={0.12} />
          <StatCounter target={15}  label="Industries Served" delay={0.24} />
          <StatCounter target={25}  label="Countries Reached" delay={0.36} />
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTag>What We Do</SectionTag>
          <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-[#002747] max-w-lg">
            Learning Solutions Built for the Real World
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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

export function ProcessSection() {
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    if (i === active) return;
    setActive(i);
  };

  return (
    <section id="process" className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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

        {/* Step tab pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {processSteps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => goTo(i)}
              className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === i
                  ? 'bg-[#002747] text-white shadow-md'
                  : 'bg-[#F8F7F3] text-gray-500 hover:text-[#002747]'
              }`}
            >
              <span className={`text-xs font-bold ${active === i ? 'text-[#068140]' : 'text-gray-400'}`}>
                {step.num}
              </span>
              {step.label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3 mb-8 h-[2px] bg-[#002747]/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#068140] to-[#00558F] rounded-full"
            animate={{ width: `${((active + 1) / processSteps.length) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-3xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,39,71,0.14)] grid md:grid-cols-2"
          >
            {/* Photo */}
            <div className="relative h-[220px] md:h-auto md:min-h-[420px] overflow-hidden">
              <img
                src={processSteps[active].image}
                alt={processSteps[active].label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#002747]/20" />
              <span className="absolute top-6 left-6 font-serif text-[72px] font-bold text-white/20 leading-none select-none">
                {processSteps[active].num}
              </span>
            </div>

            {/* Content */}
            <div className="bg-[#F8F7F3] p-8 md:p-10 lg:p-14 flex flex-col justify-center">
              <SectionTag>Step {processSteps[active].num}</SectionTag>
              <h3 className="mt-4 font-serif text-[32px] md:text-[36px] text-[#002747] leading-tight">
                {processSteps[active].label}
              </h3>
              <p className="mt-4 text-gray-600 text-[16px] md:text-[17px] leading-relaxed">
                {processDescriptions[processSteps[active].num]}
              </p>

              {/* Dots + Prev/Next */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {processSteps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'bg-[#068140] w-8' : 'bg-[#002747]/15 w-1.5'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { if (active > 0) goTo(active - 1); }}
                    disabled={active === 0}
                    className="w-9 h-9 rounded-full border border-[#002747]/15 flex items-center justify-center text-[#002747] disabled:opacity-30 hover:bg-[#002747]/5 transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => { if (active < processSteps.length - 1) goTo(active + 1); }}
                    disabled={active === processSteps.length - 1}
                    className="w-9 h-9 rounded-full border border-[#002747]/15 flex items-center justify-center text-[#002747] disabled:opacity-30 hover:bg-[#002747]/5 transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

// ── Why Prudentia ─────────────────────────────────────────────────────────────

export function WhySection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionTag>Why Prudentia</SectionTag>
            <h2 className="mt-4 font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-[#002747]">
              The Partner That Delivers on Its Promises
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              We don't just design content — we engineer learning outcomes. Our global network, performance-first approach, and obsession with measurement set us apart from typical L&D vendors.
            </p>
            <blockquote className="mt-8 pl-5 border-l-2 border-[#068140] italic font-serif text-xl text-[#002747] leading-relaxed">
              "Learning is not something that is done to people. It's something people do."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] border border-gray-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#068140]/10 flex items-center justify-center shrink-0">
                    <feature.icon size={20} className="text-[#068140]" />
                  </div>
                  <h4 className="font-semibold text-[16px] text-[#002747] leading-tight">{feature.title}</h4>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Bento Gallery ─────────────────────────────────────────────────────────────

export function BentoGallery() {
  return (
    <section className="bg-[#F8F7F3] py-24">
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
        >
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.image}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer${item.large ? ' col-span-2 row-span-2' : ''}`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              {/* Always-on gradient — lighter overlay so images show through */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001d37]/70 via-[#001d37]/10 to-transparent" />
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

export function OutcomesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative bg-white overflow-hidden" ref={ref}>
      <div className="relative max-w-[1280px] mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F7F3] border border-gray-200 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#068140]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">What We Deliver</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-serif text-[36px] sm:text-[48px] lg:text-[72px] xl:text-[80px] leading-[1.0] text-[#002747]"
            >
              Learning that actually<br />
              <em className="italic text-[#068140]">moves the needle.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed max-w-sm lg:text-right lg:mb-2"
          >
            Great learning transfers knowledge, builds capability, and drives real change<br />
            <strong className="text-gray-700 font-semibold">in how people actually work.</strong>
          </motion.p>
        </div>

        {/* Positive outcomes — horizontal numbered grid */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {outcomeBullets.map((text, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="p-5 md:p-8 hover:bg-white transition-colors bg-[#F8F7F3]"
            >
              <span className="font-serif text-[32px] md:text-[44px] font-bold text-[#068140]/20 leading-none block mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-600 text-[13px] md:text-[15px] leading-snug">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust & Differentiation ───────────────────────────────────────────────────

export function TrustSection() {
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
              The Prudentia approach<br />
              <em className="italic text-[#6ee89a]">to real performance.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/75 text-[17px] leading-relaxed mb-8 max-w-lg"
            >
              Prudentia goes beyond content delivery. Every programme is built around how people actually perform on the job — connecting learning directly to outcomes that matter.
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

export function ECCouncilSection() {
  return (
    <section className="relative overflow-hidden bg-[#002747]" style={{ minHeight: '560px' }}>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] text-white mb-6"
            >
              From Awareness<br />
              to{' '}
              <em className="italic text-[#6ee89a]">Advanced Defense.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[17px] text-white/55 leading-relaxed mb-10 max-w-md"
            >
              Certified cybersecurity capability for your entire workforce — from first-line awareness to advanced threat response.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex items-start gap-6 py-6 group hover:bg-white/3 px-2 -mx-2 rounded-xl transition-colors"
              >
                <span className="font-serif text-[28px] font-bold text-[#068140]/40 group-hover:text-[#068140]/80 transition-colors leading-none mt-0.5 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-white font-semibold text-[17px] mb-1.5 leading-snug">{f.title}</h4>
                  <p className="text-white/55 text-[15px] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
        {/* Mobile-only CTA — sits after the feature list */}
        <a href="#contact" className="mt-8 md:hidden inline-flex items-center gap-2.5 btn-primary font-bold px-8 py-4 rounded-full text-sm tracking-wide group">
          Explore Cybersecurity Training
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

// ── Skillsoft Percipio ────────────────────────────────────────────────────────

export function SkillsoftSection() {

  const platformStats = [
    { value: '200K+', label: 'Learning Assets' },
    { value: 'AI',    label: 'Personalized Paths' },
    { value: '8 wks', label: 'Avg. Time to Deploy' },
    { value: '100%',  label: 'Cloud-Managed' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] py-20 lg:py-28">
      {/* Cyan accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00a3e0] via-[#00558F] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] text-[#002747] mb-6"
            >
              Enterprise Learning<br />
              <em className="italic text-[#00558F]">as a Subscription.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[17px] text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              A fully managed LXP deployed in weeks. AI-personalized learning journeys, 200,000+ assets, and real-time skill intelligence — zero infrastructure required.
            </motion.p>

            {/* Platform stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
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
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-[#002747] text-white font-bold px-8 py-4 rounded-full hover:bg-[#00558F] transition-colors text-sm tracking-wide group"
            >
              Explore the LXP Platform
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: features as clean rows */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="bg-white rounded-3xl border border-[#002747]/8 shadow-[0_8px_40px_-8px_rgba(0,39,71,0.1)] overflow-hidden"
          >
            {skillsoftFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-start gap-5 px-7 py-6 ${i < skillsoftFeatures.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-[#f0f9ff] transition-colors group`}
              >
                <div className="w-1 self-stretch rounded-full bg-[#00a3e0]/20 group-hover:bg-[#00a3e0] transition-colors shrink-0 mt-1" />
                <div>
                  <h4 className="text-[#002747] font-semibold text-[17px] mb-1.5 leading-snug">{f.title}</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
        {/* Mobile-only CTA */}
        <a href="#contact" className="mt-8 md:hidden inline-flex items-center gap-2.5 bg-[#002747] text-white font-bold px-8 py-4 rounded-full hover:bg-[#00558F] transition-colors text-sm tracking-wide group">
          Explore the LXP Platform
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

// ── SAP Academy Partnership ───────────────────────────────────────────────────

export function SAPSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Top accent bar — SAP blue */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0070D2] via-[#004C97] to-transparent" />
      {/* Subtle blue glow — top right */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"
        style={{ background: 'radial-gradient(ellipse, rgba(0,112,210,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-[1280px] mx-auto px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0070D2]/8 border border-[#0070D2]/20 rounded-full mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-[#0070D2]" />
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0070D2]">In Partnership with SAP Academy</span>
        </motion.div>

        {/* Main 2-col */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* Left: heading + desc + CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] text-[#002747] mb-6"
            >
              Bridging Academia<br />
              <em className="italic text-[#0070D2]">&amp; Enterprise.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[17px] text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              As an authorised SAP Academy partner, Prudentia helps universities and enterprises build comprehensive SAP curricula — closing the gap between academic theory and real-world ERP practice.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              href="#contact"
              className="btn-primary inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-full text-sm tracking-wide group"
            >
              Explore SAP Training
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right: numbered feature list */}
          <div className="space-y-0 divide-y divide-gray-100">
            {sapFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex items-start gap-6 py-6 group hover:bg-[#F0F7FF] px-2 -mx-2 rounded-xl transition-colors"
              >
                <span className="font-serif text-[28px] font-bold text-[#0070D2]/30 group-hover:text-[#0070D2]/70 transition-colors leading-none mt-0.5 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-[#002747] font-semibold text-[17px] mb-1.5 leading-snug">{f.title}</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
        {/* Mobile-only CTA */}
        <a href="#contact" className="mt-8 md:hidden inline-flex items-center gap-2.5 btn-primary font-bold px-8 py-4 rounded-full text-sm tracking-wide group">
          Explore SAP Training
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

// ── Affiliations (consolidated 3-card summary) ────────────────────────────────

const affiliationCards = [
  {
    id: 'ec-council',
    accentColor: '#068140',
    logo: '/images/ec-council-logo.png',
    logoFallback: 'EC-Council',
    badge: 'Authorised Training Centre',
    headline: 'Globally Recognised\nCybersecurity Certifications',
    bullets: [
      'Certified Ethical Hacker (CEH)',
      'SOC Analyst (CSA)',
      'Certified Cloud Security Engineer (CCSE)',
      'EC-Council Incident Handler (ECIH)',
    ],
    cta: 'Explore Certifications',
    ctaHref: '#',
  },
  {
    id: 'skillsoft',
    accentColor: '#00a3e0',
    logo: '/images/skillsoft-logo.png',
    logoFallback: 'Skillsoft',
    badge: 'Content Partner',
    headline: '200,000+ Learning\nAssets on One Platform',
    bullets: [
      'AI-Driven Personalisation Engine',
      'Courses, Videos, Books & Labs',
      'Skill Intelligence & Analytics',
      'No Infrastructure Investment',
    ],
    cta: 'Explore Platform',
    ctaHref: '#',
  },
  {
    id: 'sap',
    accentColor: '#0070D2',
    logo: '/images/sap-logo.png',
    logoFallback: 'SAP',
    badge: 'SAP Academy Partner',
    headline: 'Enterprise ERP Training\nby Certified SAP Experts',
    bullets: [
      'Curriculum Development with Universities',
      'Hands-On Training in Live SAP Environments',
      'Full Tool Proficiency Across SAP Modules',
      'Industry-Recognised SAP Certifications',
    ],
    cta: 'Explore SAP Training',
    ctaHref: '#',
  },
];

// ARCHIVED — Option A: 3-Card Grid. Restore by uncommenting below.
// export function AffiliationsSection() { ... }

// ── Affiliations Tabbed (Option 3) ────────────────────────────────────────────

const tabsData = [
  {
    id: 'ec-council',
    label: 'EC-Council',
    sub: 'Cybersecurity Certifications',
    accentColor: '#068140',
    isDark: false,
    badge: 'In Partnership with EC-Council',
    badgeBg: 'rgba(6,129,64,0.08)',
    badgeBorder: 'rgba(6,129,64,0.20)',
    badgeText: '#068140',
    headlineTop: 'From Awareness',
    headlineBottom: 'to Advanced Defense.',
    italicColor: '#068140',
    desc: 'Certified cybersecurity capability for your entire workforce — from first-line awareness to advanced threat response.',
    features: null as null | {title:string;desc:string}[],
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(6,129,64,0.30)',
    featureNumHover: 'rgba(6,129,64,0.70)',
    cta: 'Explore Cybersecurity Training',
    ctaBg: '#068140',
    decorText: 'CYBER',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
  {
    id: 'skillsoft',
    label: 'Skillsoft',
    sub: 'Learning Experience Platform',
    accentColor: '#00a3e0',
    isDark: false,
    badge: 'Powered by Skillsoft Percipio',
    badgeBg: 'rgba(0,163,224,0.10)',
    badgeBorder: 'rgba(0,163,224,0.25)',
    badgeText: '#00558F',
    headlineTop: 'Enterprise Learning',
    headlineBottom: 'as a Subscription.',
    italicColor: '#00558F',
    desc: 'A fully managed LXP deployed in weeks. AI-personalized learning journeys, 200,000+ assets, and real-time skill intelligence — zero infrastructure required.',
    features: null as null | {title:string;desc:string}[],
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(0,163,224,0.4)',
    featureNumHover: 'rgba(0,163,224,0.8)',
    cta: 'Explore the LXP Platform',
    ctaBg: '#002747',
    decorText: '',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
  {
    id: 'sap',
    label: 'SAP Academy',
    sub: 'ERP & Enterprise Training',
    accentColor: '#0070D2',
    isDark: false,
    badge: 'In Partnership with SAP Academy',
    badgeBg: 'rgba(0,112,210,0.08)',
    badgeBorder: 'rgba(0,112,210,0.20)',
    badgeText: '#0070D2',
    headlineTop: 'Bridging Academia',
    headlineBottom: '& Enterprise.',
    italicColor: '#0070D2',
    desc: 'As an authorised SAP Academy partner, Prudentia helps universities and enterprises build comprehensive SAP curricula — closing the gap between academic theory and real-world ERP practice.',
    features: null as null | {title:string;desc:string}[],
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(0,112,210,0.30)',
    featureNumHover: 'rgba(0,112,210,0.70)',
    cta: 'Explore SAP Training',
    ctaBg: '#0070D2',
    decorText: 'SAP',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
];

export function AffiliationsTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [dir, setDir] = useState(1);

  const partners = tabsData.map((p, i) => ({
    ...p,
    features: i === 0 ? ecFeatures : i === 1 ? skillsoftFeatures : sapFeatures,
  }));

  const p = partners[activeTab];

  const switchTab = (i: number) => {
    setDir(i > activeTab ? 1 : -1);
    setActiveTab(i);
  };

  return (
    <section className="overflow-hidden">
      {/* Client preview label */}
      <div className="w-full bg-indigo-50 border-y border-indigo-200 py-2.5 text-center">
        <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-[0.2em]">Option 2 — Tabbed Layout</span>
      </div>

      {/* Section header */}
      <div className="bg-[#F8F7F3] pt-20 pb-10">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <SectionTag>Our Partnerships</SectionTag>
            <h2 className="mt-5 font-serif text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] text-[#002747]">
              Backed by World-Class Partners
            </h2>
            <p className="mt-4 text-gray-500 text-[16px] max-w-xl mx-auto leading-relaxed">
              Prudentia is authorised by leading global organisations — giving you access to certified programmes, premium content, and enterprise-grade platforms.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-[#EDECEA] py-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-4">
            {partners.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => switchTab(i)}
                className={`relative text-left rounded-2xl p-6 transition-all duration-300 outline-none group ${
                  activeTab === i
                    ? 'bg-white shadow-[0_8px_32px_-8px_rgba(0,39,71,0.16)]'
                    : 'bg-white/50 hover:bg-white/80 hover:shadow-[0_4px_16px_-4px_rgba(0,39,71,0.08)]'
                }`}
              >
                {/* Coloured top accent — active only */}
                {activeTab === i && (
                  <motion.div
                    layoutId="tab-accent-bar"
                    className="absolute top-0 left-5 right-5 h-[3px] rounded-b-full"
                    style={{ backgroundColor: tab.accentColor }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}

                {/* Icon dot */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    backgroundColor: activeTab === i ? tab.accentColor + '18' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: activeTab === i ? tab.accentColor : '#9ca3af' }}
                  />
                </div>

                {/* Text */}
                <span
                  className={`block text-[16px] font-semibold leading-tight mb-1.5 transition-colors duration-200 ${
                    activeTab === i ? 'text-[#002747]' : 'text-gray-500 group-hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </span>
                <span
                  className={`block text-[12px] leading-snug transition-colors duration-200 ${
                    activeTab === i ? 'text-gray-400' : 'text-gray-400/70'
                  }`}
                >
                  {tab.sub}
                </span>

                {/* Active chevron caret pointing down into panel */}
                {activeTab === i && (
                  <motion.div
                    layoutId="tab-caret"
                    className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 shadow-[2px_2px_4px_-1px_rgba(0,39,71,0.08)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={activeTab}
          custom={dir}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
          style={{ backgroundColor: p.panelBg }}
          className="relative overflow-hidden"
        >
          {/* Decorative text watermark */}
          {p.decorText && (
            <span
              className="absolute top-0 right-8 font-serif text-[8rem] font-bold leading-none select-none pointer-events-none"
              style={{ color: p.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,39,71,0.04)' }}
            >
              {p.decorText}
            </span>
          )}
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"
            style={{ background: `radial-gradient(ellipse, ${p.accentColor}14 0%, transparent 70%)`, filter: 'blur(90px)' }}
          />

          <div className="relative max-w-[1280px] mx-auto px-6 py-16 lg:py-24">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
              style={{ backgroundColor: p.badgeBg, border: `1px solid ${p.badgeBorder}` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accentColor }} />
              <span className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: p.badgeText }}>{p.badge}</span>
            </div>

            {/* 2-col grid */}
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

              {/* Left */}
              <div>
                <h2
                  className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[58px] leading-[1.05] mb-6"
                  style={{ color: p.headlineColor }}
                >
                  {p.headlineTop}<br />
                  <em className="italic" style={{ color: p.italicColor }}>{p.headlineBottom}</em>
                </h2>
                <p className="text-[17px] leading-relaxed mb-10 max-w-md" style={{ color: p.descColor }}>
                  {p.desc}
                </p>
                {/* Skillsoft mini-stats */}
                {activeTab === 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                    {[
                      { v: '200K+', l: 'Learning Assets' },
                      { v: 'AI', l: 'Personalized Paths' },
                      { v: '8 wks', l: 'Avg. Time to Deploy' },
                      { v: '45M+', l: 'Learners Globally' },
                    ].map(s => (
                      <div key={s.l} className="bg-white rounded-xl p-4 border border-[#002747]/8 shadow-sm">
                        <div className="font-serif text-[24px] font-bold leading-none mb-1" style={{ color: p.accentColor }}>{s.v}</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 leading-snug">{s.l}</div>
                      </div>
                    ))}
                  </div>
                )}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide group"
                  style={{ backgroundColor: p.ctaBg }}
                >
                  {p.cta}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Right: feature list */}
              <div
                className={`divide-y rounded-2xl overflow-hidden ${p.isDark ? '' : 'bg-white border border-[#002747]/8 shadow-[0_8px_40px_-8px_rgba(0,39,71,0.10)]'}`}
                style={{ borderColor: p.isDark ? 'transparent' : undefined, divideColor: p.featureDivider }}
              >
                {(p.features ?? []).map((f, fi) => (
                  <div
                    key={f.title}
                    className={`flex items-start gap-6 px-6 py-6 transition-colors group ${p.isDark ? 'hover:bg-white/5' : 'hover:bg-[#f5f9ff]'}`}
                    style={{ borderTop: fi > 0 ? `1px solid ${p.featureDivider}` : 'none' }}
                  >
                    <span
                      className="font-serif text-[28px] font-bold leading-none mt-0.5 shrink-0 w-8 transition-colors"
                      style={{ color: p.featureNumBase }}
                    >
                      {String(fi + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4
                        className="font-semibold text-[17px] mb-1.5 leading-snug"
                        style={{ color: p.isDark ? '#ffffff' : '#002747' }}
                      >
                        {f.title}
                      </h4>
                      <p className="text-[15px] leading-relaxed" style={{ color: p.isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ── Option B: Sticky Tab Bar ──────────────────────────────────────────────────

export function AffiliationsStickySection() {
  const [activeTab, setActiveTab] = useState(0);
  const [dir, setDir] = useState(1);

  const partners = tabsData.map((p, i) => ({
    ...p,
    features: i === 0 ? ecFeatures : i === 1 ? skillsoftFeatures : sapFeatures,
  }));

  const p = partners[activeTab];

  const switchTab = (i: number) => {
    setDir(i > activeTab ? 1 : -1);
    setActiveTab(i);
  };

  return (
    <section className="overflow-hidden">
      {/* Dark aurora header */}
      <div className="relative bg-[#002747] overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(6,129,64,0.32) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'aurora-float-1 16s ease-in-out infinite' }} />
        <div className="absolute bottom-[-15%] left-[10%] w-[600px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,85,143,0.25) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'aurora-float-2 22s ease-in-out infinite' }} />
        <div className="absolute top-[25%] left-[-5%] w-[450px] h-[320px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(6,129,64,0.18) 0%, transparent 70%)', filter: 'blur(90px)', animation: 'aurora-float-3 28s ease-in-out infinite' }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-14 pb-10 text-center">
          <SectionTag>Our Partnerships</SectionTag>
          <h2 className="mt-4 font-serif text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] text-white">
            Backed by World-Class Partners
          </h2>
          <p className="mt-3 text-white/50 text-[16px] max-w-xl mx-auto leading-relaxed">
            Prudentia is authorised by leading global organisations — giving you access to certified programmes, premium content, and enterprise-grade platforms.
          </p>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-[80px] z-20 bg-[#EDECEA] border-b border-[#D8D5CF]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-3 py-4">
            {partners.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => switchTab(i)}
                className={`relative text-left rounded-xl px-6 py-5 transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-white shadow-[0_4px_20px_-4px_rgba(0,39,71,0.14)]'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                {activeTab === i && (
                  <motion.div layoutId="sticky-tab-bar" className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full" style={{ backgroundColor: tab.accentColor }} transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                )}
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeTab === i ? tab.accentColor : '#d1d5db' }} />
                  <div>
                    <span className={`block text-[15px] font-semibold leading-tight ${activeTab === i ? 'text-[#002747]' : 'text-gray-500'}`}>{tab.label}</span>
                    <span className="block text-[12px] text-gray-400 mt-1">{tab.sub}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content panel — full natural height, no overflow hidden */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={activeTab}
          custom={dir}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: p.panelBg }}
        >
          <div className="max-w-[1280px] mx-auto px-6 py-8 lg:py-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: p.badgeBg, border: `1px solid ${p.badgeBorder}` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accentColor }} />
              <span className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: p.badgeText }}>{p.badge}</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="font-serif text-[28px] sm:text-[38px] lg:text-[52px] leading-[1.05] mb-6" style={{ color: p.headlineColor }}>
                  {p.headlineTop}<br />
                  <em className="italic" style={{ color: p.italicColor }}>{p.headlineBottom}</em>
                </h2>
                <p className="text-[17px] leading-relaxed mb-10 max-w-md" style={{ color: p.descColor }}>{p.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-2.5 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide group" style={{ backgroundColor: p.ctaBg }}>
                  {p.cta}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className={`rounded-2xl overflow-hidden self-start -mt-2 ${!p.isDark ? 'bg-white border border-[#002747]/8 shadow-[0_8px_40px_-8px_rgba(0,39,71,0.10)]' : ''}`}>
                {(p.features ?? []).map((f, fi) => (
                  <div key={f.title} className={`flex items-start gap-6 px-6 py-5 ${fi > 0 ? `border-t` : ''} transition-colors group ${p.isDark ? 'hover:bg-white/5' : 'hover:bg-[#f5f9ff]'}`} style={{ borderColor: p.featureDivider }}>
                    <span className="font-serif text-[26px] font-bold leading-none mt-0.5 shrink-0 w-8" style={{ color: p.featureNumBase }}>{String(fi + 1).padStart(2, '0')}</span>
                    <div>
                      <h4 className="font-semibold text-[16px] mb-1 leading-snug" style={{ color: p.isDark ? '#ffffff' : '#002747' }}>{f.title}</h4>
                      <p className="text-[14px] leading-relaxed" style={{ color: p.isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ── Option C: Side Tabs ────────────────────────────────────────────────────────

export function AffiliationsSideTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [dir, setDir] = useState(1);

  const partners = tabsData.map((p, i) => ({
    ...p,
    features: i === 0 ? ecFeatures : i === 1 ? skillsoftFeatures : sapFeatures,
  }));

  const p = partners[activeTab];

  const switchTab = (i: number) => {
    setDir(i > activeTab ? 1 : -1);
    setActiveTab(i);
  };

  return (
    <section className="bg-[#F8F7F3] overflow-hidden">
      {/* Label */}
      <div className="w-full bg-teal-50 border-y border-teal-200 py-2.5 text-center">
        <span className="text-[11px] font-bold text-teal-700 uppercase tracking-[0.2em]">Option C — Side Tabs</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-20">

        {/* Section header */}
        <div className="text-center mb-14">
          <SectionTag>Our Partnerships</SectionTag>
          <h2 className="mt-5 font-serif text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.15] text-[#002747]">
            Backed by World-Class Partners
          </h2>
          <p className="mt-4 text-gray-500 text-[16px] max-w-xl mx-auto leading-relaxed">
            Prudentia is authorised by leading global organisations — giving you access to certified programmes, premium content, and enterprise-grade platforms.
          </p>
        </div>

        {/* Side tabs grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Left: stacked tab cards */}
          <div className="flex flex-col gap-3">
            {partners.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => switchTab(i)}
                className={`relative text-left rounded-2xl p-5 transition-all duration-300 border ${
                  activeTab === i
                    ? 'bg-white shadow-[0_8px_32px_-8px_rgba(0,39,71,0.16)] border-transparent'
                    : 'bg-white/60 border-transparent hover:bg-white/90'
                }`}
              >
                {/* Left accent bar */}
                {activeTab === i && (
                  <motion.div layoutId="side-tab-accent" className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full" style={{ backgroundColor: tab.accentColor }} transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                )}
                <div className="pl-3">
                  {/* Dot + label */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-2 h-2 rounded-full shrink-0 transition-colors" style={{ backgroundColor: activeTab === i ? tab.accentColor : '#d1d5db' }} />
                    <span className={`text-[15px] font-semibold leading-tight ${activeTab === i ? 'text-[#002747]' : 'text-gray-500'}`}>{tab.label}</span>
                  </div>
                  <p className={`text-[12px] leading-snug pl-[18px] ${activeTab === i ? 'text-gray-500' : 'text-gray-400'}`}>{tab.sub}</p>
                  {/* Feature preview — visible only on active */}
                  {activeTab === i && (
                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 pl-[18px] space-y-1.5">
                      {(tab.features ?? (i === 0 ? ecFeatures : i === 1 ? skillsoftFeatures : sapFeatures)).map(f => (
                        <li key={f.title} className="flex items-center gap-2 text-[12px] text-gray-500">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: tab.accentColor }} />
                          {f.title}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: content panel */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={activeTab}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: p.panelBg }}
            >
              {/* Accent top border */}
              <div className="h-1" style={{ backgroundColor: p.accentColor }} />

              <div className="p-8 lg:p-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{ backgroundColor: p.badgeBg, border: `1px solid ${p.badgeBorder}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.accentColor }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: p.badgeText }}>{p.badge}</span>
                </div>

                <h2 className="font-serif text-[26px] lg:text-[36px] leading-[1.1] mb-4" style={{ color: p.headlineColor }}>
                  {p.headlineTop}<br />
                  <em className="italic" style={{ color: p.italicColor }}>{p.headlineBottom}</em>
                </h2>
                <p className="text-[15px] leading-relaxed mb-8" style={{ color: p.descColor }}>{p.desc}</p>

                {/* Feature list */}
                <div className={`rounded-xl overflow-hidden mb-8 ${!p.isDark ? 'border border-[#002747]/8' : ''}`}>
                  {(p.features ?? []).map((f, fi) => (
                    <div key={f.title} className={`flex items-start gap-4 px-5 py-4 ${fi > 0 ? 'border-t' : ''} ${p.isDark ? 'hover:bg-white/5' : 'hover:bg-[#f5f9ff]'} transition-colors`} style={{ borderColor: p.featureDivider }}>
                      <span className="font-serif text-[20px] font-bold leading-none mt-0.5 shrink-0 w-7" style={{ color: p.featureNumBase }}>{String(fi + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className="font-semibold text-[15px] mb-0.5" style={{ color: p.isDark ? '#ffffff' : '#002747' }}>{f.title}</h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: p.isDark ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="inline-flex items-center gap-2.5 text-white font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide group" style={{ backgroundColor: p.ctaBg }}>
                  {p.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export function TestimonialsSection() {
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
        <div className="flex flex-col lg:grid lg:grid-cols-[340px_1fr] gap-16 lg:gap-24 lg:items-center">

          {/* Left — label + heading + description (desktop also has nav) */}
          <div>
            <SectionTag>Client Stories</SectionTag>
            <h2 className="mt-5 font-serif text-[28px] sm:text-[36px] lg:text-[50px] leading-[1.1] text-[#002747]">
              Outcomes,<br />
              <em className="italic text-[#068140]">not just stories.</em>
            </h2>
            <p className="mt-5 text-gray-400 text-[15px] leading-relaxed max-w-[260px]">
              Every engagement measured against real business impact — not certificates issued.
            </p>

            {/* Arrow nav + counter — desktop only */}
            <div className="hidden lg:flex mt-10 items-center gap-4">
              <button onClick={prev} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200">
                <ChevronRight size={18} />
              </button>
              <span className="ml-2 font-serif text-[#002747]">
                <span className="text-[22px] font-bold">{String(active + 1).padStart(2, '0')}</span>
                <span className="text-gray-300 mx-1.5">/</span>
                <span className="text-sm text-gray-400">{String(testimonials.length).padStart(2, '0')}</span>
              </span>
            </div>

            {/* Progress bar — desktop only */}
            <div className="hidden lg:block mt-5 w-[180px] h-[2px] bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#068140] rounded-full" style={{ width: `${progress}%`, transition: paused ? 'none' : 'width 40ms linear' }} />
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

          {/* Mobile nav + progress — appears after quote */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={prev} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#002747] hover:bg-[#002747] hover:text-white transition-all duration-200">
              <ChevronRight size={18} />
            </button>
            <span className="ml-2 font-serif text-[#002747]">
              <span className="text-[22px] font-bold">{String(active + 1).padStart(2, '0')}</span>
              <span className="text-gray-300 mx-1.5">/</span>
              <span className="text-sm text-gray-400">{String(testimonials.length).padStart(2, '0')}</span>
            </span>
            <div className="ml-4 flex-1 h-[2px] bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#068140] rounded-full" style={{ width: `${progress}%`, transition: paused ? 'none' : 'width 40ms linear' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


// ── CTA Variant: Light ────────────────────────────────────────────────────────

export function CTAVariantLight() {
  return (
    <section className="relative bg-[#F8F7F3] overflow-hidden">
      {/* Subtle warm tint blob — top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#068140]/5 rounded-full blur-[160px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      {/* Large faint serif word */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden leading-none">
        <span className="font-serif font-bold text-[#002747] opacity-[0.04]"
          style={{ fontSize: 'clamp(80px,14vw,180px)', letterSpacing: '-0.03em' }}>
          LEARN
        </span>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

          {/* ── Left ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-6 h-0.5 bg-[#068140]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">Let's Work Together</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1] text-[#002747]"
            >
              Ready to Build a<br />
              <em className="italic" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #068140, #00558F)' }}>High-Performance</em><br />
              Learning Culture?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-gray-500 text-[16px] leading-relaxed max-w-lg"
            >
              Talk to our experts. We'll design a learning strategy tailored to your goals, your people, and your budget — no generic templates.
            </motion.p>

            {/* Three paths */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 grid sm:grid-cols-3 gap-3"
            >
              {[
                { label: 'Corporate Training',    desc: 'ILT, VILT & Blended' },
                { label: 'eLearning Development', desc: 'SCORM, Micro, Gamified' },
                { label: 'Translation',           desc: '40+ Languages, Fast TAT' },
              ].map(p => (
                <a key={p.label} href="#services"
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#068140]/40 hover:shadow-sm transition-all"
                >
                  <span className="text-[#002747] font-semibold text-[15px] group-hover:text-[#068140] transition-colors">{p.label}</span>
                  <span className="text-gray-400 text-[13px]">{p.desc}</span>
                </a>
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 pl-5 border-l-2 border-[#068140]"
            >
              <p className="text-gray-500 italic text-[15px] leading-relaxed">
                "Prudentia didn't just deliver training — they transformed how our teams think about learning."
              </p>
              <p className="mt-2 text-[#068140] text-[12px] font-semibold uppercase tracking-wider">— VP People & Culture, TechServe Global</p>
            </motion.blockquote>
          </div>

          {/* ── Right: form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,39,71,0.12)] overflow-hidden"
          >
            {/* Card top accent */}
            <div className="h-[3px] bg-gradient-to-r from-[#068140] to-[#00558F]" />

            <div className="p-8">
              <h3 className="font-serif text-[22px] text-[#002747] mb-1">Book a Free Consultation</h3>
              <p className="text-gray-400 text-sm mb-7">Response within 24 hours. No commitment required.</p>

              <div className="space-y-3">
                <input placeholder="Your name"
                  className="w-full px-4 py-3 text-sm bg-[#F8F7F3] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#068140] transition" />
                <input placeholder="Work email" type="email"
                  className="w-full px-4 py-3 text-sm bg-[#F8F7F3] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#068140] transition" />
                <input placeholder="Organisation"
                  className="w-full px-4 py-3 text-sm bg-[#F8F7F3] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#068140] transition" />
                <select className="w-full px-4 py-3 text-sm bg-[#F8F7F3] border border-gray-200 rounded-xl text-gray-500 focus:outline-none focus:border-[#068140] transition">
                  <option value="">I need help with…</option>
                  <option>Corporate Training</option>
                  <option>eLearning Development</option>
                  <option>Translation & Localisation</option>
                  <option>Certification Programme</option>
                  <option>Multiple Services</option>
                </select>
                <textarea rows={2} placeholder="Briefly describe your training needs…"
                  className="w-full px-4 py-3 text-sm bg-[#F8F7F3] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#068140] transition resize-none" />
              </div>

              <button className="mt-5 w-full btn-primary py-3.5 text-sm font-bold rounded-xl flex items-center justify-center gap-2 group">
                <span>Send My Request</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Direct contact strip */}
            <div className="border-t border-gray-100 bg-[#F8F7F3] px-8 py-5 flex flex-col sm:flex-row gap-4">
              <a href="mailto:info@prudentia.bizzinfo.in" className="flex items-center gap-2 text-gray-400 hover:text-[#002747] text-xs transition-colors">
                <Mail size={13} className="text-[#068140]" /> info@prudentia.bizzinfo.in
              </a>
              <a href="tel:+912066025600" className="flex items-center gap-2 text-gray-400 hover:text-[#002747] text-xs transition-colors">
                <Phone size={13} className="text-[#068140]" /> +91 20 6602 5600
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      className="relative lg:fixed lg:bottom-0 lg:left-0 lg:right-0 w-full bg-[#001528] overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Giant "PRUDENTIA" wordmark watermark — no repeating pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          className="font-serif font-bold leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 18vw, 240px)',
            letterSpacing: '-0.03em',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            color: 'transparent',
          }}
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity }}
        >
          PRUDENTIA
        </motion.span>
      </div>
      {/* Green wash — top left */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#068140]/10 rounded-full blur-[170px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      {/* Blue wash — bottom right */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#00558F]/12 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />
      {/* Thin gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#068140] via-[#00558F] to-transparent" />

      <div className="relative z-10">

        {/* ── Main grid ── */}
        <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-12">

            {/* Col 1: Brand */}
            <div>
              <img src="/images/logo-prudentia.png" alt="Prudentia" className="h-11 w-auto mb-5" />
              <p className="text-white/55 text-[15px] leading-relaxed max-w-[260px]">
                Real-world learning solutions that drive measurable performance for global organisations.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {[
                  { Icon: Linkedin, href: 'https://linkedin.com' },
                  { Icon: Twitter,  href: 'https://twitter.com' },
                  { Icon: Youtube,  href: 'https://youtube.com' },
                ].map(({ Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6ee89a]/70 mb-5">Services</h5>
              <ul className="space-y-3.5">
                {[
                  { label: 'Corporate Training',         href: '#services' },
                  { label: 'eLearning Development',      href: '#services' },
                  { label: 'Translation & Localisation', href: '#services' },
                  { label: 'Workshops & Bootcamps',      href: '#services' },
                  { label: 'Certification Programmes',   href: '#services' },
                ].map(item => (
                  <li key={item.label}>
                    <a href={item.href}
                      className="group flex items-center gap-2.5 text-white/55 text-[15px] hover:text-white transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#068140] shrink-0 group-hover:scale-150 transition-transform" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6ee89a]/70 mb-5">Company</h5>
              <ul className="space-y-3.5">
                {[
                  { label: 'About Us',     href: '#' },
                  { label: 'Case Studies', href: '#' },
                  { label: 'Clients',      href: '#' },
                  { label: 'Careers',      href: '#' },
                  { label: 'Contact Us',   href: '#contact' },
                ].map(item => (
                  <li key={item.label}>
                    <a href={item.href}
                      className="group flex items-center gap-2.5 text-white/55 text-[15px] hover:text-white transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#068140] shrink-0 group-hover:scale-150 transition-transform" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact + Stats */}
            <div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6ee89a]/70 mb-5">Get in Touch</h5>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:info@prudentia.net.in"
                    className="flex items-start gap-3 text-white/55 text-[15px] hover:text-white transition-colors group">
                    <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#068140]/25 transition-colors">
                      <Mail size={14} className="text-[#068140]" />
                    </span>
                    info@prudentia.net.in
                  </a>
                </li>
                <li>
                  <a href="tel:+919730021477"
                    className="flex items-start gap-3 text-white/55 text-[15px] hover:text-white transition-colors group">
                    <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#068140]/25 transition-colors">
                      <Phone size={14} className="text-[#068140]" />
                    </span>
                    +91 97300 21477
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/55 text-[15px]">
                    <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-[#068140]" />
                    </span>
                    <span>101, 1st Floor, Piyusha Society<br />Law College Road, Erandwane<br />Pune 411004, Maharashtra</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/55 text-[15px]">
                    <span className="w-8 h-8 rounded-lg bg-white/6 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={14} className="text-[#068140]" />
                    </span>
                    <span>Mon – Fri: 9:00 AM – 6:00 PM IST<br />Saturday: 9:00 AM – 1:00 PM IST</span>
                  </div>
                </li>
              </ul>

            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.08]">
          <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[13px]">
              © {new Date().getFullYear()} Prudentia Technology Solutions India Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(link => (
                <a key={link} href="#"
                  className="text-white/30 text-[13px] hover:text-white/65 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}


export default function Home1() {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, smoothWheel: true }}>
      {/* Content — z-1 sits above the fixed footer; bg-[#F8F7F3] prevents gaps showing footer behind sections */}
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar />
        <HeroSection />
        <ClientLogoStrip />
        <OutcomesSection />
        <ProcessSection />
          <WhySection />
        <BentoGallery />
        <AffiliationsStickySection />
        <TestimonialsSection />
        <CTAVariantLight />
      </div>
      {/* Transparent spacer — desktop only. Same height as footer. Scrolls past to uncover fixed footer beneath. */}
      <div className="hidden lg:block h-[480px] relative z-[1]" />
      <Footer />
    </ReactLenis>
  );
}
