import { motion, useInView } from 'motion/react';

import {
  ArrowRight, Shield, Award, GraduationCap, CheckCircle2,
  BookOpen, Users, Target, MessageSquare, Cpu,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#c0392b';
const ACCENT_LIGHT = '#f5a49e';

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

const certifications = [
  {
    partner: 'EC-Council',
    color: '#c0392b',
    badge: 'Authorised Training Centre',
    programmes: [
      { code: 'CEH', name: 'Certified Ethical Hacker', desc: 'The world\'s leading ethical hacking certification — covering attack methodologies, tools, and countermeasures used by adversaries.' },
      { code: 'CSA', name: 'Certified SOC Analyst', desc: 'For security operations professionals — threat monitoring, detection, and response using industry-standard SIEM tooling.' },
      { code: 'CCSE', name: 'Certified Cloud Security Engineer', desc: 'Cloud-specific security for AWS, Azure, and GCP environments — architecture, policy, and incident response.' },
      { code: 'ECIH', name: 'EC-Council Incident Handler', desc: 'Structured incident handling and response — from triage and containment to post-incident recovery and forensics.' },
    ],
  },
  {
    partner: 'SAP Academy',
    color: '#0070D2',
    badge: 'Authorised Partner',
    programmes: [
      { code: 'SAP SD', name: 'Sales & Distribution', desc: 'End-to-end order management, pricing, billing, and customer account management on the SAP platform.' },
      { code: 'SAP MM', name: 'Materials Management', desc: 'Procurement, inventory management, invoice verification, and vendor evaluation in SAP.' },
      { code: 'SAP HR', name: 'Human Resources', desc: 'SAP HCM covering payroll, time management, org structure, and personnel administration.' },
      { code: 'SAP FICO', name: 'Finance & Controlling', desc: 'Financial accounting, management accounting, and reporting on SAP ECC and S/4HANA.' },
    ],
  },
];

const outcomes = [
  { stat: '20+', label: 'Active certification programmes across EC-Council & SAP' },
  { stat: '500+', label: 'Professionals certified through Prudentia programmes' },
  { stat: '98%', label: 'First-attempt pass rate across all certification tracks' },
  { stat: '15+', label: 'Years of authorised partnership experience' },
];

const process = [
  { num: '01', title: 'Eligibility & Track Selection', desc: 'We map your team\'s experience and goals to the right certification track — no mismatched enrolments.' },
  { num: '02', title: 'Official Curriculum Delivery', desc: 'Authorised content delivered by certified instructors, aligned exactly to the exam blueprint.' },
  { num: '03', title: 'Hands-On Lab Access', desc: 'Practice environments, virtual labs, and scenario-based exercises — not just theory.' },
  { num: '04', title: 'Exam Prep & Mock Tests', desc: 'Domain-by-domain revision, past paper analysis, and timed mock exams to build exam-day confidence.' },
  { num: '05', title: 'Voucher & Scheduling Support', desc: 'We handle exam voucher procurement and scheduling so your team can focus on preparation, not logistics.' },
  { num: '06', title: 'Post-Certification Pathways', desc: 'We help you plan the next certification in the sequence — and how to apply new skills on the job immediately.' },
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
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: '#0070D218' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c0392b] via-[#0070D2] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>Certification Training</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['Credentials that', 'open doors.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #0070D2)` }}>open doors.</em>
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
            Authorised EC-Council and SAP Academy training delivered by certified instructors —
            not resellers. Real labs, structured prep, and a 98% first-attempt pass rate.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Enrol Your Team</span> <ArrowRight size={14} />
            </a>
            <a href="/services/elearning" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              eLearning <ArrowRight size={14} />
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

function CertificationsSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Our Programmes</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Authorised. Verified.<br />Globally recognised.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[520px] leading-relaxed">
            We deliver directly from the partner curriculum — no third-party content, no modified syllabi.
          </p>
        </FadeUp>

        <div className="space-y-10">
          {certifications.map((cert, ci) => (
            <FadeUp key={cert.partner} delay={ci * 0.07}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ backgroundColor: `${cert.color}08` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }} />
                  <span className="text-[14px] font-bold text-[#002747]">{cert.partner}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ color: cert.color, borderColor: `${cert.color}30`, backgroundColor: `${cert.color}08` }}>
                    {cert.badge}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  {cert.programmes.map((prog, pi) => (
                    <div key={prog.code} className="p-5 hover:bg-[#F8F7F3] transition-colors group">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: cert.color }}>{prog.code}</span>
                      <h3 className="text-[14px] font-semibold text-[#002747] mt-1 mb-2 leading-snug">{prog.name}</h3>
                      <p className="text-[12px] text-gray-400 leading-relaxed">{prog.desc}</p>
                    </div>
                  ))}
                </div>
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
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Certification Journey</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            From enrolment<br />to credential.
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {process.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.06}>
              <div className="relative p-6 rounded-2xl border border-gray-100 bg-[#F8F7F3] hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                <span className="font-serif text-[52px] leading-none font-bold text-[#002747]/5 absolute top-4 right-6 select-none">{step.num}</span>
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-[13px] font-bold mb-4" style={{ backgroundColor: ACCENT }}>
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

function CTASection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}25` }}>
            <Award size={24} style={{ color: ACCENT_LIGHT }} />
          </div>
          <h2 className="font-serif text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-white">
            Ready to get your<br /><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #0070D2)` }}>team certified?</em>
          </h2>
          <p className="mt-5 text-[16px] text-white/45 leading-relaxed">
            Tell us which certification tracks you're targeting and we'll build a training schedule that works around your team's calendar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Discuss Your Requirements <ArrowRight size={14} />
            </a>
            <a href="/services/workshops" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white border border-white/20 rounded-full hover:border-white/40 transition-all">
              See Workshops <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Certification() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <CertificationsSection />
        <ProcessSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </>
  );
}
