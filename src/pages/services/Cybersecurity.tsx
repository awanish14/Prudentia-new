import { motion, useInView } from 'motion/react';
import {
  ArrowRight, Shield, Award, AlertTriangle, Lock,
  Users, Target, Eye, Search,
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

const outcomes = [
  { stat: '6', label: 'EC-Council programmes — entry to advanced' },
  { stat: '500+', label: 'Security professionals certified through Prudentia' },
  { stat: '98%', label: 'First-attempt pass rate across all certification tracks' },
  { stat: '15+', label: 'Years as an EC-Council Authorised Training Centre' },
];

const threatStats = [
  { stat: '4.4M', label: 'Unfilled cybersecurity jobs globally — the talent gap is widening.', source: 'ISC² 2023' },
  { stat: '$4.45M', label: 'Average cost of a data breach in 2024.', source: 'IBM Security' },
  { stat: '39 sec', label: 'Frequency of cyberattacks globally — one every 39 seconds.', source: 'Clark School, UMD' },
  { stat: '83%', label: 'Of organisations experienced more than one data breach in 2023.', source: 'IBM Security' },
];

const certifications = [
  {
    code: 'CEH',
    name: 'Certified Ethical Hacker',
    level: 'Intermediate',
    duration: '5 days · 40 hrs',
    badge: 'EC-Council Flagship',
    desc: 'The world\'s most trusted ethical hacking certification. CEH teaches you to think and act like an adversary — using the same tools, techniques, and methodologies that attackers use to compromise real organisations. Participants leave with a demonstrated ability to identify and exploit vulnerabilities before threat actors do.',
    domains: [
      'Footprinting & Reconnaissance',
      'Scanning Networks',
      'Enumeration',
      'Vulnerability Analysis',
      'System Hacking',
      'Malware Threats & Analysis',
      'Sniffing & Packet Analysis',
      'Social Engineering Attacks',
      'Denial-of-Service Attacks',
      'Session Hijacking',
      'Evading IDS, Firewalls & Honeypots',
      'Hacking Web Servers',
      'Hacking Web Applications',
      'SQL Injection',
      'Wireless Network Hacking',
      'Mobile Platform Hacking',
      'IoT & OT Hacking',
      'Cloud Computing Threats',
      'Cryptography',
      'Penetration Testing Methodology',
    ],
  },
  {
    code: 'CSA',
    name: 'Certified SOC Analyst',
    level: 'Entry – Intermediate',
    duration: '3 days · 24 hrs',
    badge: 'SOC Operations',
    desc: 'Built for Tier 1 and Tier 2 SOC professionals. CSA develops the detection, triage, and escalation skills needed to operate effectively inside a security operations centre — using real SIEM platforms, threat intelligence feeds, and structured incident workflows. The ideal entry point for anyone building a SOC career.',
    domains: [
      'SOC Fundamentals & Tier Structure',
      'Cyber Threat Intelligence',
      'Indicators of Compromise (IOCs)',
      'SIEM Platform Operations',
      'Log Collection & Correlation Rules',
      'Incident Detection & Alert Triage',
      'Alert Prioritisation & Escalation',
      'Threat Hunting Fundamentals',
      'Vulnerability Assessment',
      'Incident Response Basics',
    ],
  },
  {
    code: 'CCSE',
    name: 'Certified Cloud Security Engineer',
    level: 'Advanced',
    duration: '5 days · 40 hrs',
    badge: 'Cloud Security',
    desc: 'Designed for engineers securing production cloud environments. CCSE covers security architecture, policy enforcement, and incident response across AWS, Azure, and GCP — aligned to NIST, CIS, and platform-specific compliance frameworks. Builds the skills to design and audit secure cloud-native environments from the ground up.',
    domains: [
      'Cloud Security Architecture & Design',
      'AWS Security Controls & Services',
      'Microsoft Azure Security',
      'Google Cloud Platform Security',
      'Identity & Access Management (IAM)',
      'Data Protection & Encryption',
      'Network Security in the Cloud',
      'DevSecOps Fundamentals',
      'Cloud Compliance Frameworks',
      'Cloud Incident Response & Forensics',
    ],
  },
  {
    code: 'ECIH',
    name: 'EC-Council Incident Handler',
    level: 'Intermediate',
    duration: '3 days · 24 hrs',
    badge: 'Incident Response',
    desc: 'A structured, methodical approach to handling security incidents end to end. ECIH prepares teams to contain and eradicate active threats while preserving forensic evidence and maintaining legal defensibility — from first call to post-incident report. Aligned to global incident response standards and real breach playbooks.',
    domains: [
      'Incident Handling Lifecycle',
      'Forensic Readiness & First Response',
      'Network Security Incidents',
      'Malware Incident Handling',
      'Email Security Incidents',
      'Web Application Security Incidents',
      'Cloud Security Incidents',
      'Insider Threat Response',
      'Post-Incident Reporting & Review',
      'Business Continuity Integration',
    ],
  },
  {
    code: 'CND',
    name: 'Certified Network Defender',
    level: 'Entry – Intermediate',
    duration: '5 days · 40 hrs',
    badge: 'Network Defence',
    desc: 'The defensive counterpart to CEH. CND trains network administrators and IT security staff to build resilient, layered defences — hardened configurations, firewall policies, IDS/IPS tuning, and secure VPN architecture — against the attack vectors that penetration testers exploit. The right certification for the people who run the perimeter.',
    domains: [
      'Network Defence Fundamentals',
      'Network Security Threats & Vulnerabilities',
      'Network Security Controls & Protocols',
      'Firewall & IDS/IPS Policy Design',
      'Windows Security Administration',
      'Linux Security Hardening',
      'Mobile & IoT Device Security',
      'Data Security & VPN Configuration',
      'Network Traffic Monitoring & Analysis',
      'Enterprise Risk & Business Continuity',
    ],
  },
  {
    code: 'CHFI',
    name: 'Computer Hacking Forensic Investigator',
    level: 'Advanced',
    duration: '5 days · 40 hrs',
    badge: 'Digital Forensics',
    desc: 'The gold standard in digital forensics certification. CHFI teaches investigators to acquire, preserve, and analyse digital evidence to a standard admissible in legal proceedings — across Windows, Linux, cloud, mobile, and database environments. Covers the full investigation lifecycle from crime scene preservation to court-ready reporting.',
    domains: [
      'Computer Forensics Fundamentals',
      'Forensic Investigation Process',
      'Hard Disk & File System Analysis',
      'Data Acquisition & Duplication',
      'Anti-Forensics Techniques & Detection',
      'Windows Forensics',
      'Linux & macOS Forensics',
      'Network Forensics',
      'Database Forensics',
      'Cloud & Mobile Forensics',
    ],
  },
];

const audiences = [
  { icon: Shield, title: 'SOC Analysts (Tier 1–3)', desc: 'Build structured skills for threat monitoring, alert triage, and escalation in enterprise security operations centres.' },
  { icon: Lock, title: 'Network & System Administrators', desc: 'Gain defensive architecture knowledge to harden infrastructure and prevent lateral movement after initial compromise.' },
  { icon: Target, title: 'IT Managers & Security Leads', desc: 'Establish credentials that validate your authority to lead security strategy, compliance, and governance programmes.' },
  { icon: Users, title: 'Fresh Graduates Entering Cyber', desc: 'CEH and CSA are globally trusted entry points — giving you the verified skills employers look for on day one.' },
  { icon: AlertTriangle, title: 'Incident Response Teams', desc: 'Standardise your team\'s response methodology with ECIH — structured, evidence-preserving, and built for legal scrutiny.' },
  { icon: Eye, title: 'Cloud & DevOps Engineers', desc: 'Add a security layer to your cloud expertise with CCSE — threat models specific to AWS, Azure, and GCP environments.' },
  { icon: Search, title: 'Digital Forensics Investigators', desc: 'CHFI gives investigators the technical skills and legal framework to handle digital evidence with rigour and chain-of-custody integrity.' },
  { icon: Award, title: 'Compliance & Risk Professionals', desc: 'Demonstrate security awareness at a technical level — essential for roles that bridge IT, legal, and executive risk functions.' },
];

const process = [
  { num: '01', title: 'Track Selection & Eligibility Review', desc: 'We assess each participant\'s experience and map them to the right certification. A CEH candidate and a CHFI candidate have different prerequisites — we get this right before day one.' },
  { num: '02', title: 'Authorised Curriculum Delivery', desc: 'EC-Council official content delivered by certified instructors. Exam-blueprint aligned — every domain, every weighting, in full. No third-party resellers, no modified syllabi.' },
  { num: '03', title: 'Hands-On iLabs Access', desc: 'Live lab environments with real attack and defence tools — Wireshark, Metasploit, Nessus, SIEM platforms. Participants execute the techniques themselves, not just read about them.' },
  { num: '04', title: 'Domain-by-Domain Exam Prep', desc: 'Timed mock exams and past-paper analysis across all domains. We identify weak areas per participant and target them specifically until scores are consistently above the pass threshold.' },
  { num: '05', title: 'Voucher & Exam Scheduling', desc: 'We handle exam voucher procurement, registration, and rescheduling logistics. Your team stays focused on preparation, not administration.' },
  { num: '06', title: 'Post-Certification Pathways', desc: 'CEH is a starting point, not a destination. We map the natural certification progression and advise on how to apply new skills immediately within your organisation.' },
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
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: `${ACCENT}10` }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <Shield size={12} style={{ color: ACCENT_LIGHT }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>EC-Council Authorised Training Centre</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['Certify your entire', 'security workforce.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #ff8a80)` }}>security workforce.</em>
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
            As an EC-Council Authorised Training Centre, Prudentia delivers CEH, CSA, CCSE, ECIH, CND, and CHFI — with live labs, certified instructors, and a 98% first-attempt pass rate.
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
            <a href="/services/sap-academy" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              SAP Academy <ArrowRight size={14} />
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

function ThreatContextSection() {
  return (
    <section className="bg-[#001f38] py-20 border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>Why Certification Matters</span>
          <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-white mt-4 max-w-[640px]">
            The threat landscape is expanding faster than talent.
          </h2>
          <p className="mt-4 text-[15px] text-white/45 max-w-[500px] leading-relaxed">
            Certified security professionals are no longer a nice-to-have. They are the baseline requirement for any organisation that handles sensitive data, critical infrastructure, or customer trust.
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {threatStats.map((item, i) => (
            <FadeUp key={item.stat} delay={i * 0.07}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] h-full flex flex-col">
                <div className="font-serif text-[42px] leading-none text-white mb-3">{item.stat}</div>
                <p className="text-[13px] text-white/50 leading-relaxed flex-1">{item.label}</p>
                <span className="text-[10px] font-medium text-white/20 uppercase tracking-wider mt-3">{item.source}</span>
              </div>
            </FadeUp>
          ))}
        </div>
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
            Six certifications.<br />One authorised provider.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[540px] leading-relaxed">
            Every programme is delivered directly from EC-Council's official curriculum — no third-party resellers, no modified syllabi, no shortcuts on exam alignment.
          </p>
        </FadeUp>

        <div className="space-y-6">
          {certifications.map((cert, ci) => (
            <FadeUp key={cert.code} delay={ci * 0.05}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3" style={{ backgroundColor: `${ACCENT}06` }}>
                  <span className="font-mono text-[12px] font-bold text-white px-2.5 py-1 rounded-md" style={{ backgroundColor: ACCENT }}>{cert.code}</span>
                  <h3 className="text-[15px] font-bold text-[#002747] flex-1 min-w-[160px]">{cert.name}</h3>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border" style={{ color: ACCENT, borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}08` }}>{cert.badge}</span>
                  <span className="text-[11px] text-gray-400 hidden sm:inline">{cert.level}</span>
                  <span className="text-[11px] text-gray-300 hidden sm:inline">·</span>
                  <span className="text-[11px] text-gray-400 hidden sm:inline">{cert.duration}</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="lg:w-[340px] flex-shrink-0">
                      <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{cert.desc}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-gray-400 sm:hidden">
                        <span><span className="font-semibold text-[#002747]">Level:</span> {cert.level}</span>
                        <span><span className="font-semibold text-[#002747]">Duration:</span> {cert.duration}</span>
                      </div>
                    </div>
                    <div className="mt-5 lg:mt-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3">Domains Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.domains.map(domain => (
                          <span
                            key={domain}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F8F7F3] text-gray-600 border border-gray-100"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Who Is This For</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Built for every layer<br />of your security team.
          </h2>
          <p className="mt-5 text-[16px] text-gray-400 max-w-[480px] mx-auto leading-relaxed">
            From first-line SOC analysts to forensic investigators — each EC-Council certification is purpose-built for a specific security role.
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.05}>
              <div className="p-6 rounded-2xl border border-gray-100 bg-[#F8F7F3] hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${ACCENT}12` }}>
                  <a.icon size={18} style={{ color: ACCENT }} />
                </div>
                <h3 className="text-[14px] font-semibold text-[#002747] mb-2">{a.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{a.desc}</p>
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
    <section className="bg-[#F8F7F3] py-24">
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
              <div className="relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all duration-300 h-full">
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
            Ready to build a<br />
            <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #ff8a80)` }}>
              certified security team?
            </em>
          </h2>
          <p className="mt-5 text-[16px] text-white/45 leading-relaxed">
            Tell us which certification tracks you're targeting and we'll design a training schedule around your team's availability — classroom, virtual, or blended.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Book a Consultation <ArrowRight size={14} />
            </a>
            <a href="/services/sap-academy" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white border border-white/20 rounded-full hover:border-white/40 transition-all">
              Explore SAP Academy <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Cybersecurity() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <ThreatContextSection />
        <CertificationsSection />
        <AudienceSection />
        <ProcessSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </>
  );
}
