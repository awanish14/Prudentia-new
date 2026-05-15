import { motion, useInView } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  ArrowRight, Monitor, Code2, Globe, Zap,
  CheckCircle2, Layers, Play, BarChart3, MessageSquare, Cpu,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#00558F';
const ACCENT_LIGHT = '#7ec8f7';

function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const deliverables = [
  {
    icon: Layers,
    title: 'Custom eLearning Development',
    desc: "Modules designed from scratch for your audience — scenario-based, branching, gamified, or linear. We don't adapt templates; we build for your learning objectives.",
  },
  {
    icon: Code2,
    title: 'SCORM / xAPI / AICC Compliant',
    desc: 'All our output is standards-compliant. Publish to any LMS — Moodle, Cornerstone, SAP SuccessFactors, Skillsoft Percipio, or your proprietary platform.',
  },
  {
    icon: Globe,
    title: 'Multilingual Localisation',
    desc: 'We develop in 40+ languages with cultural adaptation that goes beyond translation — tone, visuals, and examples all adjusted for each target market.',
  },
  {
    icon: Monitor,
    title: 'Responsive & Mobile-First',
    desc: 'Built for every device your learners use — desktop, tablet, or phone. Offline capability and low-bandwidth modes available for field and frontline teams.',
  },
  {
    icon: Play,
    title: 'Video & Animation Production',
    desc: 'Explainer videos, talking-head recordings, whiteboard animations, and interactive video — produced in-house by our media team.',
  },
  {
    icon: BarChart3,
    title: 'LMS Implementation & Support',
    desc: "We don't just hand over SCORM packages. We help you set up, configure, and manage your LMS — and track learning data that actually matters.",
  },
];

const techStack = [
  { name: 'Articulate Storyline 360', category: 'Authoring' },
  { name: 'Adobe Captivate', category: 'Authoring' },
  { name: 'Rise 360', category: 'Rapid Development' },
  { name: 'Lectora', category: 'Authoring' },
  { name: 'SCORM / xAPI / AICC', category: 'Standards' },
  { name: 'Skillsoft Percipio', category: 'LXP (200K+ assets)' },
  { name: 'Moodle & Totara', category: 'LMS' },
  { name: 'SAP SuccessFactors LMS', category: 'LMS' },
];

const outcomes = [
  { stat: '40%', label: 'Avg. improvement in learner effectiveness scores' },
  { stat: '30%', label: 'Reduction in time-to-competency vs. classroom-only delivery' },
  { stat: '40+', label: 'Languages supported for localisation' },
  { stat: '200K+', label: 'Off-the-shelf assets via Skillsoft Percipio partnership' },
];

const process = [
  { num: '01', title: 'Content Strategy', desc: 'We map your source materials, SME knowledge, and learning objectives into a coherent curriculum architecture.' },
  { num: '02', title: 'Storyboard & Script', desc: 'Instructional designers write screen-by-screen storyboards with narration scripts and interaction specs before any build begins.' },
  { num: '03', title: 'Prototype Review', desc: 'A working module prototype in your chosen authoring tool — reviewed and approved before full production starts.' },
  { num: '04', title: 'Full Production', desc: 'Development, voiceover recording (50+ languages available), animation, and QA across devices and browsers.' },
  { num: '05', title: 'LMS Publishing', desc: 'We package, test, and publish to your LMS — with tracking configured to your reporting requirements.' },
  { num: '06', title: 'Iteration & Maintenance', desc: 'Products, regulations, and orgs change. We offer retainer-based update and maintenance cycles to keep content current.' },
];

function HeroSection() {
  return (
    <section className="relative bg-[#002747] pt-[120px] pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[180px] pointer-events-none -translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: `${ACCENT}15` }} />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: '#06814018' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00558F] via-[#068140] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>eLearning Development</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['Scale learning.', 'Don\'t compromise it.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #068140)` }}>Don't compromise it.</em>
                    : line}
                </motion.div>
              </div>
            ))}
          </h1>

          <motion.p
            className="mt-7 text-[17px] md:text-[19px] text-white/55 leading-relaxed max-w-[600px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Custom eLearning that your learners actually finish — and remember. Built on SCORM,
            xAPI, and AICC standards, deployable on any LMS, in 40+ languages.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Get a Sample Module</span> <ArrowRight size={14} />
            </a>
            <a href="/services/corporate-training" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              Corporate Training <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {outcomes.map(o => (
            <div key={o.stat} className="text-center sm:text-left">
              <div className="font-serif text-[36px] md:text-[42px] leading-none text-white">{o.stat}</div>
              <div className="text-[11px] text-white/40 mt-2 leading-snug">{o.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>What We Build</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            End-to-end eLearning.<br />Nothing outsourced.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[520px] leading-relaxed">
            Instructional design, media production, LMS deployment — one team, one point of contact, zero handoff chaos.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deliverables.map((d, i) => (
            <FadeUp key={d.title} delay={i * 0.07}>
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${ACCENT}12` }}>
                  <d.icon size={20} style={{ color: ACCENT }} />
                </div>
                <h3 className="text-[15px] font-semibold text-[#002747] mb-2">{d.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Our Tech Stack</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Industry-standard tools.<br />Expert hands.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.05}>
              <div className="bg-[#F8F7F3] rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center h-full flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ACCENT}12` }}>
                  <Cpu size={18} style={{ color: ACCENT }} />
                </div>
                <p className="text-[13px] font-semibold text-[#002747] leading-snug">{t.name}</p>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{t.category}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${ACCENT_LIGHT}90` }}>Development Process</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-white mt-4">
            From brief to live<br /><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #068140)` }}>in six stages.</em>
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {process.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.06}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 h-full relative">
                <span className="font-serif text-[52px] leading-none font-bold text-white/[0.04] absolute top-4 right-6 select-none">{step.num}</span>
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-[13px] font-bold mb-4" style={{ backgroundColor: ACCENT }}>
                  {step.num}
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}>
            <MessageSquare size={24} style={{ color: ACCENT }} />
          </div>
          <h2 className="font-serif text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-[#002747]">
            Let's build your<br /><em className="italic">eLearning roadmap.</em>
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 leading-relaxed">
            Share a brief and we'll come back with a scoping proposal — complete with recommended tools, timelines, and a sample interaction design.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Start the Conversation <ArrowRight size={14} />
            </a>
            <a href="/services/certification" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#002747] border border-[#002747]/20 rounded-full hover:bg-[#002747] hover:text-white transition-all">
              Explore Certification <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function ELearning() {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, smoothWheel: true }}>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <DeliverablesSection />
        <TechStackSection />
        <ProcessSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </ReactLenis>
  );
}
