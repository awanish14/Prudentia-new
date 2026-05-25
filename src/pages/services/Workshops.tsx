import { motion, useInView } from 'motion/react';

import {
  ArrowRight, Users, Lightbulb, Zap, Target,
  CheckCircle2, Calendar, Clock, MessageSquare, Star,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#0d9488';
const ACCENT_LIGHT = '#5eead4';

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

const workshopTypes = [
  {
    icon: Lightbulb,
    title: 'Design Thinking & Innovation',
    duration: '1–2 days',
    format: 'In-person / Virtual',
    desc: 'Structured creative problem-solving for cross-functional teams — empathy mapping, ideation, rapid prototyping, and stakeholder testing.',
  },
  {
    icon: Users,
    title: 'Leadership & Team Dynamics',
    duration: '1–3 days',
    format: 'In-person preferred',
    desc: 'Self-awareness, influence, conflict resolution, and high-performance team behaviours for managers navigating change and complexity.',
  },
  {
    icon: Target,
    title: 'Strategic Communication',
    duration: 'Half-day to 1 day',
    format: 'In-person / Virtual',
    desc: 'Presentation skills, executive presence, written communication, and stakeholder narrative — built through live practice and real-time coaching.',
  },
  {
    icon: Zap,
    title: 'Change Readiness & Resilience',
    duration: '1 day',
    format: 'In-person preferred',
    desc: 'Helping teams understand, accept, and accelerate through organisational change — built on neuroscience of change frameworks.',
  },
  {
    icon: Star,
    title: 'Customer Centricity',
    duration: 'Half-day to 1 day',
    format: 'In-person / Virtual',
    desc: 'Customer journey mapping, experience design, and service excellence for customer-facing teams and the leaders who manage them.',
  },
  {
    icon: Calendar,
    title: 'Custom Workshop Design',
    duration: 'Tailored to your need',
    format: 'Any format',
    desc: 'Have a specific challenge or initiative? We design workshops from scratch — built around your context, your culture, and your desired shift.',
  },
];

const outcomes = [
  { stat: '500+', label: 'Corporate clients served across 15+ industries' },
  { stat: '40%', label: 'Avg. improvement in participant effectiveness scores' },
  { stat: '1 day', label: 'Minimum turnaround for urgent custom workshop briefs' },
  { stat: '25+', label: 'Countries reached through virtual and in-person delivery' },
];

const differentiators = [
  'Every workshop is designed for your specific business context, not adapted from a library module.',
  'Our facilitators hold professional coaching certifications — not just subject matter expertise.',
  'We measure and report shifts in mindset and behaviour, not just post-session happiness scores.',
  'Available in-person anywhere in India and virtual globally — in 15+ languages.',
  'Modular design allows single workshops to be sequenced into multi-month leadership journeys.',
  'Post-workshop integration support — action planning, manager briefings, and 30-day follow-up.',
];

const formats = [
  { icon: Users, label: 'In-Person', desc: 'Maximum energy and experiential learning — ideal for leadership cohorts, team off-sites, and culture interventions.', tag: 'Full impact' },
  { icon: Clock, label: 'Virtual Live', desc: 'Full-day or half-day facilitated sessions via Zoom or Teams — with breakout rooms, digital whiteboards, and live polls.', tag: 'Global reach' },
  { icon: Zap, label: 'Hybrid', desc: 'Blended cohorts with in-room and remote participants — designed so no one feels like a second-class attendee.', tag: 'Flexible' },
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
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: '#06814018' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0d9488] via-[#068140] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>Workshops & Bootcamps</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['One day.', 'Real shift.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #068140)` }}>Real shift.</em>
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
            High-energy, context-specific workshops that create genuine behavioural shifts — not
            just post-session enthusiasm. Designed for your team, your challenge, your moment.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Brief Us on Your Workshop</span> <ArrowRight size={14} />
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

function WorkshopTypesSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Workshop Catalogue</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Off-the-shelf is a myth.<br />These are starting points.
          </h2>
          <p className="mt-5 text-[17px] text-gray-500 max-w-[520px] leading-relaxed">
            Each workshop below is customised to your organisation's context before delivery. Nothing runs verbatim.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workshopTypes.map((w, i) => (
            <FadeUp key={w.title} delay={i * 0.07}>
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shrink-0" style={{ backgroundColor: `${ACCENT}12` }}>
                  <w.icon size={20} style={{ color: ACCENT }} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{w.duration}</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">{w.format}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#002747] mb-2">{w.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed flex-1">{w.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormatsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Delivery Formats</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Your team, your format.
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-6">
          {formats.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.08}>
              <div className="bg-[#F8F7F3] rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ACCENT}12` }}>
                    <f.icon size={18} style={{ color: ACCENT }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-full" style={{ color: ACCENT, backgroundColor: `${ACCENT}12` }}>{f.tag}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-[#002747] mb-3">{f.label}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <FadeUp>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${ACCENT_LIGHT}90` }}>Why Choose Us</span>
            <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-white mt-4">
              What makes our<br /><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #068140)` }}>workshops different.</em>
            </h2>
            <p className="mt-5 text-[17px] text-white/45 leading-relaxed">
              We design for behavioural transfer, not just learner satisfaction scores. The distinction matters when you're investing in your people.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="space-y-3">
              {differentiators.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/8 transition-colors"
                >
                  <CheckCircle2 size={14} style={{ color: ACCENT_LIGHT }} className="shrink-0 mt-0.5" />
                  <span className="text-[15px] text-white/65 leading-relaxed">{d}</span>
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
            Got a team challenge?<br /><em className="italic">Let's design the workshop.</em>
          </h2>
          <p className="mt-5 text-[17px] text-gray-500 leading-relaxed">
            Share what you're trying to shift — mindset, skill, behaviour — and we'll come back with a workshop design proposal within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Send Us Your Brief <ArrowRight size={14} />
            </a>
            <a href="/services/translation" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#002747] border border-[#002747]/20 rounded-full hover:bg-[#002747] hover:text-white transition-all">
              Translation Services <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Workshops() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <WorkshopTypesSection />
        <FormatsSection />
        <DifferentiatorsSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </>
  );
}
