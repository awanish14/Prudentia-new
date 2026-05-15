import { motion, useInView } from 'motion/react';

import {
  ArrowRight, Globe, Users, Clock, Target, BookOpen,
  Shield, GraduationCap, Monitor, Linkedin, Mail, Phone, MapPin,
  CheckCircle2, TrendingUp, Lightbulb, Handshake, Star,
} from 'lucide-react';
import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Navbar, Footer } from './Home1';

// ── Hooks ─────────────────────────────────────────────────────────────────────

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

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { target: 500,  suffix: '+', label: 'Companies Served'  },
  { target: 15,   suffix: '+', label: 'Years Experience'  },
  { target: 25,   suffix: '+', label: 'Countries Reached' },
  { target: 98,   suffix: '%', label: 'Client Retention'  },
  { target: 1000, suffix: '+', label: 'Corporates Trained'},
  { target: 15,   suffix: '+', label: 'Industries Served' },
];

const milestones = [
  { year: '2008', label: 'Founded in Pune', desc: 'Started as a boutique corporate training consultancy with a single focus: making learning actually work.' },
  { year: '2011', label: 'eLearning Expansion', desc: 'Launched eLearning development practice, enabling clients to scale training globally without scaling costs.' },
  { year: '2017', label: 'Translation & Localisation', desc: 'Added a 40+ language localisation practice to serve multinational clients with culturally accurate content.' },
  { year: '2020', label: 'Global Partnerships', desc: 'Became authorised partners with SAP Academy, EC-Council, and Skillsoft Percipio.' },
  { year: '2024', label: 'AI-Powered Delivery', desc: 'Integrated AI-driven design and personalisation tools to deliver smarter, faster learning at scale.' },
];

const values = [
  { icon: Star,         title: 'Excellence',          desc: 'We deliver solutions that exceed expectations and drive measurable results — not just activity.' },
  { icon: Lightbulb,    title: 'Innovation',           desc: 'We leverage emerging technologies to create learning experiences that stay ahead of the curve.' },
  { icon: Handshake,    title: 'Partnership',          desc: 'We work as an extension of your team, committed to your outcomes as if they were our own.' },
  { icon: Globe,        title: 'Global Perspective',   desc: 'We understand cultural nuances and adapt solutions to resonate with every audience, everywhere.' },
  { icon: CheckCircle2, title: 'Integrity',            desc: 'We build trust through transparency, reliability, and ethical practices — every time.' },
];

const credentials = [
  { label: 'SAP Academy Partner',          sub: 'Authorised ERP curriculum & certification',     color: '#0070D2' },
  { label: 'EC-Council Authorised Partner',sub: 'CEH, CSA, CCSE, ECIH certification training',   color: '#c0392b' },
  { label: 'Skillsoft Percipio Partner',   sub: '200K+ assets on the AI-powered LXP',            color: '#00558F' },
];

const team: {
  photo?: string;
  name: string;
  designation: string;
  brief: string;
  linkedin?: string;
}[] = [
  {
    name: 'Placeholder Name',
    designation: 'Founder & CEO',
    brief: 'Over 20 years of experience in corporate learning, organisational development, and global L&D strategy.',
    linkedin: '#',
  },
  {
    name: 'Placeholder Name',
    designation: 'Head of eLearning',
    brief: 'Award-winning instructional designer leading a team of 15+ developers and content strategists.',
    linkedin: '#',
  },
  {
    name: 'Placeholder Name',
    designation: 'Director — Partnerships',
    brief: 'Manages strategic alliances with SAP Academy, EC-Council, Skillsoft, and enterprise clients globally.',
    linkedin: '#',
  },
  {
    name: 'Placeholder Name',
    designation: 'Head of Translation Services',
    brief: 'Linguist and project lead overseeing 40+ language localisation for global eLearning and corporate content.',
    linkedin: '#',
  },
];

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-[#002747] pt-[120px] pb-20 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <motion.span
          className="absolute font-serif font-bold leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 22vw, 320px)',
            letterSpacing: '-0.03em',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            color: 'transparent',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
        >
          PRUDENTIA
        </motion.span>
      </div>
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#068140]/8 rounded-full blur-[180px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-[#00558F]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#068140] via-[#00558F] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]">Est. 2008 · Pune, India</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[52px] sm:text-[68px] lg:text-[84px] leading-[1.0] tracking-tight text-white">
            {['Fifteen Years.', 'One Purpose.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #6ee89a, #00558F)' }}>One Purpose.</em></>
                    : line}
                </motion.div>
              </div>
            ))}
          </h1>

          <motion.p
            className="mt-7 text-[17px] md:text-[19px] text-white/55 leading-relaxed max-w-[600px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Prudentia Technology Solutions partners with global organisations to design and deliver
            learning that drives real, measurable performance — not just course completions.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/#contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Work With Us</span> <ArrowRight size={14} />
            </a>
            <a href="/#services" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              Our Services <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Trust badges row */}
        <motion.div
          className="mt-14 pt-10 border-t border-white/[0.08] flex flex-wrap gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {['98% Client Retention', 'SAP Academy Partner', 'EC-Council Authorised', '500+ Companies Served'].map(badge => (
            <span key={badge} className="flex items-center gap-2 text-[13px] font-medium text-white/50">
              <CheckCircle2 size={13} className="text-[#068140]" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ target, suffix, label, active, delay }: { target: number; suffix: string; label: string; active: boolean; delay: number }) {
  const count = useCountUp(target, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="text-center px-4"
    >
      <div className="font-serif text-[38px] md:text-[48px] leading-none text-white">{count}{suffix}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/45 mt-2">{label}</div>
    </motion.div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-[#001d36] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 divide-white/10 lg:divide-x">
          {stats.map(({ target, suffix, label }, i) => (
            <StatItem key={label} target={target} suffix={suffix} label={label} active={inView} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: narrative */}
          <div>
            <FadeUp>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">Our Story</span>
              <h2 className="font-serif text-[40px] md:text-[52px] leading-[1.08] tracking-tight text-[#002747] mt-4">
                From a small consultancy<br />to a <em className="italic">global L&D partner.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-8 space-y-5 text-[16px] text-gray-600 leading-relaxed">
              <p>
                Prudentia was founded in 2008 with a simple conviction: most corporate training fails
                not because of lack of effort, but because it was never designed around business
                outcomes. We set out to change that.
              </p>
              <p>
                What began as a boutique training consultancy in Pune has grown into a full-spectrum
                learning solutions company — serving 500+ organisations across 25+ countries, in
                industries from financial services and pharmaceuticals to technology and manufacturing.
              </p>
              <p>
                Today, Prudentia delivers corporate training, custom eLearning, translation &amp;
                localisation, cybersecurity certification, SAP Academy programmes, and AI-powered
                learning platforms — all under one roof, with the same obsessive focus on measurable
                performance that defined us from day one.
              </p>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-10">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#068140]/10 flex items-center justify-center">
                  <TrendingUp size={18} className="text-[#068140]" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#002747]">Outcome-First Philosophy</p>
                  <p className="text-[12px] text-gray-400">Every programme tied to measurable KPIs — not just attendance.</p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: milestones timeline */}
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <FadeUp key={m.year} delay={i * 0.07}>
                <div className="flex gap-5 group">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#002747]/15 flex items-center justify-center text-[11px] font-bold text-[#002747] shrink-0 group-hover:border-[#068140] group-hover:bg-[#068140] group-hover:text-white transition-all duration-300">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-[2px] flex-1 min-h-[28px] bg-[#002747]/10 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#068140] mb-1">{m.year}</p>
                    <p className="text-[15px] font-semibold text-[#002747] leading-snug">{m.label}</p>
                    <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeUp>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">Our Mission</span>
            <blockquote className="font-serif text-[32px] md:text-[44px] leading-[1.15] tracking-tight text-[#002747] mt-6">
              "To empower global organisations with learning solutions that{' '}
              <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #068140, #00558F)' }}>
                bridge skill gaps and drive measurable business performance.
              </em>"
            </blockquote>
            <p className="mt-6 text-[16px] text-gray-500 leading-relaxed">
              We measure success not by courses completed or hours clocked — but by the performance
              improvements that follow. That standard drives every decision we make.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">What Drives Us</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Core values, not just<br />corner-office posters.
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.07}>
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#002747]/5 flex items-center justify-center mb-5 group-hover:bg-[#068140]/10 transition-colors">
                  <v.icon size={20} className="text-[#002747] group-hover:text-[#068140] transition-colors" />
                </div>
                <h3 className="text-[15px] font-semibold text-[#002747] mb-2">{v.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">Leadership</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            The people behind<br />every outcome.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[520px] leading-relaxed">
            Our leadership team brings together decades of experience across corporate learning,
            instructional design, technology, and global operations.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="group bg-[#F8F7F3] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                {/* Photo area */}
                <div className="aspect-[4/3] bg-[#002747]/5 flex items-center justify-center relative overflow-hidden">
                  {member.photo
                    ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    : (
                      <div className="flex flex-col items-center gap-2 text-[#002747]/20">
                        <Users size={40} />
                        <span className="text-[11px] font-medium uppercase tracking-widest">Photo</span>
                      </div>
                    )
                  }
                  {/* LinkedIn overlay */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0A66C2] hover:text-white"
                    >
                      <Linkedin size={14} className="text-[#0A66C2] group-hover:text-white" />
                    </a>
                  )}
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#002747] leading-snug">{member.name}</h3>
                      <p className="text-[12px] font-medium text-[#068140] mt-0.5">{member.designation}</p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-8 h-8 rounded-full border border-[#002747]/10 flex items-center justify-center text-[#002747]/40 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                  <p className="mt-3 text-[13px] text-gray-500 leading-relaxed">{member.brief}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]/70">Certifications & Partnerships</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-white mt-4">
            Credentials that speak<br />for themselves.
          </h2>
          <p className="mt-5 text-[16px] text-white/45 max-w-[500px] mx-auto leading-relaxed">
            Every partnership is an authorised, vetted relationship — not a logo on a slide.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {credentials.map((c, i) => (
            <FadeUp key={c.label} delay={i * 0.07}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: c.color }} />
                <h3 className="text-[16px] font-semibold text-white leading-snug">{c.label}</h3>
                <p className="text-[13px] text-white/45 mt-2">{c.sub}</p>
              </div>
            </FadeUp>
          ))}

        </div>
      </div>
    </section>
  );
}

function ContactSnippet() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <FadeUp>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#068140]">Get in Touch</span>
            <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
              Let's build something<br /><em className="italic">remarkable together.</em>
            </h2>
            <p className="mt-5 text-[16px] text-gray-500 leading-relaxed max-w-[460px]">
              Whether you're scoping a single training programme or rethinking your entire L&D
              strategy, we're ready to talk. No obligation, no boilerplate proposals.
            </p>
            <a href="/#contact" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#002747] hover:bg-[#00558F] text-white text-sm font-semibold rounded-full transition-colors">
              Start a Conversation <ArrowRight size={14} />
            </a>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
              {[
                { icon: Mail,   label: 'Email',          value: 'info@prudentia.net.in',         href: 'mailto:info@prudentia.net.in' },
                { icon: Phone,  label: 'Phone',          value: '+91 97300 21477',               href: 'tel:+919730021477' },
                { icon: MapPin, label: 'Office',         value: '101, 1st Floor, Piyusha Society, Law College Road, Erandwane, Pune 411004, Maharashtra', href: undefined },
                { icon: Clock,  label: 'Business Hours', value: 'Mon – Fri: 9:00 AM – 6:00 PM IST\nSaturday: 9:00 AM – 1:00 PM IST', href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-5">
                  <div className="w-10 h-10 rounded-xl bg-[#002747]/5 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-[#002747]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-1">{label}</p>
                    {href
                      ? <a href={href} className="text-[15px] font-medium text-[#002747] hover:text-[#00558F] transition-colors">{value}</a>
                      : <p className="text-[15px] font-medium text-[#002747] whitespace-pre-line">{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <StatsSection />
        <StorySection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        <CredentialsSection />
        <ContactSnippet />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1]" />
      <Footer />
    </>
  );
}
