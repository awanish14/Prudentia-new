import { motion, useInView } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  ArrowRight, Users, Target, BarChart3, Layers,
  CheckCircle2, Zap, Globe, BookOpen, TrendingUp, MessageSquare,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#068140';
const ACCENT_LIGHT = '#6ee89a';

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
    icon: Target,
    title: 'Needs Analysis & Competency Mapping',
    desc: 'We start with a deep diagnosis — mapping the gap between where your teams are and where your business needs them to be. No assumptions, no templates, no off-the-shelf guessing.',
  },
  {
    icon: Layers,
    title: 'Bespoke Programme Design',
    desc: 'Every programme is built from scratch for your organisation — industry-specific scenarios, real workflows, and content that reflects your culture and goals.',
  },
  {
    icon: Users,
    title: 'Facilitator-Led & Virtual Delivery',
    desc: 'Classroom, virtual, or blended — our experienced facilitators deliver sessions that spark genuine engagement, not passive attendance.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Outcomes',
    desc: 'Training tied to KPIs. We track knowledge retention, behaviour change, and business impact — and we report it back to you in plain numbers.',
  },
  {
    icon: Globe,
    title: 'Multi-Industry Expertise',
    desc: 'From BFSI and pharma to technology and manufacturing — our faculty has domain depth across 15+ industries, so context is never an afterthought.',
  },
  {
    icon: TrendingUp,
    title: 'Leadership & Soft Skills Development',
    desc: 'Communication, critical thinking, change management, and executive presence — built through structured practice, not slide decks.',
  },
];

const outcomes = [
  { stat: '40%', label: 'Avg. improvement in effectiveness scores post-training' },
  { stat: '30%', label: 'Reduction in time-to-competency for new hires' },
  { stat: '500+', label: 'Corporate clients trained since 2008' },
  { stat: '15+', label: 'Industries served across India and global markets' },
];

const process = [
  { num: '01', title: 'Discovery Call', desc: 'We understand your business context, workforce gaps, and training objectives before proposing anything.' },
  { num: '02', title: 'Competency Audit', desc: 'Structured assessments to baseline current capability levels across roles and departments.' },
  { num: '03', title: 'Programme Blueprint', desc: 'A detailed curriculum plan — topics, modalities, timelines, and measurable success criteria.' },
  { num: '04', title: 'Content Development', desc: 'Scenario-driven content built by our instructional designers, reviewed and approved by your SMEs.' },
  { num: '05', title: 'Delivery & Facilitation', desc: 'Expert facilitators deliver the programme with real-time adaptation to your team\'s learning pace.' },
  { num: '06', title: 'Measurement & Reporting', desc: 'Post-training assessments, manager feedback, and impact reports tied back to the original objectives.' },
];

const audiences = [
  'New hire onboarding cohorts',
  'Mid-level managers stepping into leadership',
  'Sales and customer-facing teams',
  'Technical professionals needing soft-skill uplift',
  'Senior leaders navigating organisational change',
  'Cross-functional teams undergoing transformation',
];

function HeroSection() {
  return (
    <section className="relative bg-[#002747] pt-[136px] pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[180px] pointer-events-none -translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: `${ACCENT}15` }} />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: '#00558F18' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#068140] via-[#00558F] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>Corporate Training</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['Training that moves', 'the needle.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #00558F)` }}>the needle.</em>
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
            Prudentia has trained 500+ companies since 2008. Not through generic slide decks —
            through outcome-first programmes built around your business goals, your industry,
            and your people.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Get a Training Proposal</span> <ArrowRight size={14} />
            </a>
            <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              About Prudentia <ArrowRight size={14} />
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
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>What We Deliver</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Every programme.<br />Purpose-built.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[520px] leading-relaxed">
            We don't do off-the-shelf. Every engagement starts with your objectives and ends with measurable results.
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

function ProcessSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>How We Work</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            A process built for<br />real organisations.
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.06}>
              <div className="relative p-6 rounded-2xl border border-gray-100 bg-[#F8F7F3] hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                <span className="font-serif text-[52px] leading-none font-bold text-[#002747]/5 absolute top-4 right-6 select-none">{step.num}</span>
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-[13px] font-bold mb-4 shrink-0" style={{ backgroundColor: ACCENT }}>
                  {step.num}
                </div>
                <h3 className="text-[15px] font-semibold text-[#002747] mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <FadeUp>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${ACCENT_LIGHT}90` }}>Who We Train</span>
            <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-white mt-4">
              Across seniority.<br /><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #00558F)` }}>Across functions.</em>
            </h2>
            <p className="mt-5 text-[16px] text-white/45 leading-relaxed max-w-[460px]">
              Our programmes are designed for the full talent lifecycle — from onboarding to C-suite leadership development.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 gap-3">
              {audiences.map((a, i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/8 transition-colors"
                >
                  <CheckCircle2 size={14} style={{ color: ACCENT_LIGHT }} className="shrink-0" />
                  <span className="text-[14px] text-white/70">{a}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>
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
            Ready to build a<br /><em className="italic">training programme that works?</em>
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 leading-relaxed">
            Share your objectives and we'll come back with a concrete proposal — no generic decks, no unnecessary jargon.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Request a Proposal <ArrowRight size={14} />
            </a>
            <a href="/about" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#002747] border border-[#002747]/20 rounded-full hover:bg-[#002747] hover:text-white transition-all">
              Learn About Us <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function CorporateTraining() {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, smoothWheel: true }}>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <DeliverablesSection />
        <ProcessSection />
        <AudienceSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </ReactLenis>
  );
}
