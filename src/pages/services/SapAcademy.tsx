import { motion, useInView } from 'motion/react';
import {
  ArrowRight, Award, Database, Users, BarChart3,
  Package, TrendingUp, CheckCircle2, Wrench, Settings,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#0070D2';
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

const outcomes = [
  { stat: '8', label: 'SAP modules — functional, technical, and analytical tracks' },
  { stat: '500+', label: 'SAP professionals trained through Prudentia programmes' },
  { stat: 'S/4HANA', label: 'Curriculum aligned to the latest SAP platform' },
  { stat: '15+', label: 'Years as an authorised SAP Academy training partner' },
];

const erpStats = [
  { stat: '77%', label: 'Of global transaction revenue touches an SAP system — it is the ERP standard.', source: 'SAP SE' },
  { stat: '425K+', label: 'SAP customers across 180+ countries — demand for certified talent is constant.', source: 'SAP SE' },
  { stat: '3×', label: 'Higher average salary for SAP-certified consultants versus non-certified peers.', source: 'IT Salary Survey' },
  { stat: '2027', label: 'SAP ECC end-of-mainstream-maintenance driving mass S/4HANA migrations.', source: 'SAP Roadmap' },
];

const modules = [
  {
    code: 'SAP SD',
    name: 'Sales & Distribution',
    icon: TrendingUp,
    desc: 'Master the end-to-end order-to-cash process — from customer enquiry and quotation through delivery scheduling, billing, and account reconciliation. SAP SD is the commercial backbone of any SAP implementation and one of the most in-demand functional modules globally.',
    topics: [
      'Enterprise Structure & Organisational Units',
      'Customer Master Data & Partner Functions',
      'Sales Document Types & Item Categories',
      'Pricing Procedures & Condition Technique',
      'Order-to-Cash Process Flow',
      'Availability Check (ATP)',
      'Delivery Processing & Picking',
      'Shipping & Transportation Management',
      'Billing & Invoice Processing',
      'Credit & Risk Management',
      'Returns, Credits & Complaint Processing',
      'Revenue Account Determination',
    ],
  },
  {
    code: 'SAP MM',
    name: 'Materials Management',
    icon: Package,
    desc: 'Cover the complete procure-to-pay cycle — from purchase requisition and vendor selection through goods receipt, invoice verification, and stock valuation. SAP MM underpins procurement, inventory, and supply chain operations across every industry vertical.',
    topics: [
      'Material Master & Info Record',
      'Vendor Master Data',
      'Purchase Requisition & RFQ',
      'Purchase Order Processing',
      'Procurement for Stock & Consumption',
      'Goods Receipt & Storage Management',
      'Invoice Verification (MIRO)',
      'Inventory Management (MIGO)',
      'Special Procurement Types',
      'Account Determination & Valuation',
      'Vendor Evaluation',
      'MRP & Demand Planning Integration',
    ],
  },
  {
    code: 'SAP FICO',
    name: 'Finance & Controlling',
    icon: Database,
    desc: 'The most in-demand SAP module globally — covering the complete scope of financial accounting (FI) and management accounting (CO) on ECC and S/4HANA. FICO bridges the gap between operational transactions and financial reporting, giving organisations a single source of truth.',
    topics: [
      'General Ledger Accounting (GL)',
      'Accounts Receivable (AR)',
      'Accounts Payable (AP)',
      'Asset Accounting (AA)',
      'Bank Accounting & Reconciliation',
      'Cost Centre Accounting (CCA)',
      'Profit Centre Accounting (PCA)',
      'Internal Orders',
      'Product Costing & Material Ledger',
      'Profitability Analysis (CO-PA)',
      'Month-End & Year-End Closing',
      'Financial Statement Reporting',
    ],
  },
  {
    code: 'SAP HCM',
    name: 'Human Capital Management',
    icon: Users,
    desc: 'From hire to retire — SAP HCM covers every HR process including organisational management, payroll, time management, and personnel administration. Also covers the transition path to SAP SuccessFactors for organisations moving to cloud HR.',
    topics: [
      'Organisational Management Structure',
      'Personnel Administration',
      'Time Management & Absence Recording',
      'Payroll Processing & Off-Cycle Runs',
      'Benefits Administration',
      'Recruitment & Applicant Management',
      'Training & Event Management',
      'Employee Self-Service (ESS)',
      'Manager Self-Service (MSS)',
      'Personnel Development',
      'SAP SuccessFactors Overview',
      'Integration with FI Payroll Posting',
    ],
  },
  {
    code: 'SAP PP',
    name: 'Production Planning',
    icon: Settings,
    desc: 'Coordinate demand management, production scheduling, and shop floor execution — the backbone of manufacturing operations on SAP. SAP PP connects sales demand directly to material requirements, production orders, and shop floor confirmations in a closed-loop planning cycle.',
    topics: [
      'Bill of Materials (BOM)',
      'Work Centres & Routing',
      'Demand Management & SOP',
      'Material Requirements Planning (MRP)',
      'Planned Orders & Production Orders',
      'Shop Floor Control & Confirmation',
      'Capacity Planning & Levelling',
      'Batch Management',
      'Backflushing & Goods Movements',
      'Quality Management Integration',
      'PP-MM Integration (Goods Issues)',
      'Production Reporting & KPIs',
    ],
  },
  {
    code: 'SAP QM',
    name: 'Quality Management',
    icon: CheckCircle2,
    desc: 'Embed quality checkpoints across procurement, production, and customer delivery — with full traceability through inspection lots, control charts, and quality notifications. SAP QM enables organisations to meet ISO, GMP, and regulatory quality standards within the SAP environment.',
    topics: [
      'Quality Planning Master Data',
      'Inspection Plan & Characteristics',
      'Sampling Procedures',
      'Quality in Procurement (QI)',
      'In-Process Quality Inspections',
      'Control Charts & Statistical SPC',
      'Quality Notifications & Defect Tracking',
      'Audit Management',
      'Certificates of Analysis (CoA)',
      'Quality in Sales & Delivery',
      'Vendor Quality Evaluation',
      'QM Reporting & Dashboards',
    ],
  },
  {
    code: 'SAP PM',
    name: 'Plant Maintenance',
    icon: Wrench,
    desc: 'Manage the complete lifecycle of technical assets — from equipment master creation through preventive maintenance planning, work order execution, and integrated cost tracking in FICO. SAP PM reduces unplanned downtime and drives OEE improvement across manufacturing and utilities operations.',
    topics: [
      'Functional Locations & Equipment Master',
      'Maintenance Plans & Strategies',
      'Preventive Maintenance Scheduling',
      'Work Order Creation & Processing',
      'Breakdown Maintenance & Notifications',
      'Spare Parts Management (MM Integration)',
      'Refurbishment & Reconditioning Orders',
      'External Service Management',
      'Maintenance History & Reporting',
      'Cost Settlement to Cost Centres (FI Integration)',
      'Predictive Maintenance Overview',
      'Fleet Management',
    ],
  },
  {
    code: 'SAP BI',
    name: 'Business Intelligence & Analytics',
    icon: BarChart3,
    desc: 'Transform raw SAP transactional data into executive-grade reporting and dashboards — using SAP BW, SAP Analytics Cloud (SAC), and BusinessObjects. SAP BI bridges operational data from SD, MM, FICO, and PP into a single analytical layer for management decision-making.',
    topics: [
      'SAP BW Architecture & Data Flow',
      'InfoObjects, DSO & Cubes',
      'Data Extraction & Transformation (ETL)',
      'Process Chains & Data Loading',
      'BEx Query Designer',
      'SAP Analytics Cloud (SAC)',
      'Stories, Dashboards & Planning',
      'Predictive Scenarios in SAC',
      'Crystal Reports',
      'BusinessObjects (BO) Universe',
      'Integration with S/4HANA Embedded Analytics',
      'Reporting Governance & Authorisations',
    ],
  },
];

const careerTracks = [
  {
    icon: Database,
    title: 'Functional Consultant',
    tagline: 'The most in-demand SAP career globally',
    desc: 'Configure and implement SAP modules to meet business process requirements. Functional consultants translate business needs into SAP configuration — no deep programming required, but process expertise is essential.',
    path: [
      'Specialise in one core module (FICO, SD, MM, or HCM)',
      'Build cross-module process knowledge (SD↔MM, FICO↔CO)',
      'Obtain SAP module certification',
      'Gain S/4HANA migration project exposure',
      'Progress to Solution Architect or Practice Lead',
    ],
  },
  {
    icon: Settings,
    title: 'Technical Consultant (ABAP)',
    tagline: 'Builds and extends the SAP platform',
    desc: 'Develop custom SAP reports, interfaces, enhancements, and integrations using ABAP and the SAP technical stack. Technical consultants work closely with functional teams to deliver solutions the standard configuration cannot cover.',
    path: [
      'ABAP programming foundation (reports, BAPIs, RFCs)',
      'SAP architecture, BASIS, and transport management',
      'Enhancement framework, BADIs, and user exits',
      'Smartforms, ALV, and Workflow development',
      'S/4HANA technical stack and FIORI extensions',
    ],
  },
  {
    icon: Users,
    title: 'End User / Power User',
    tagline: 'Operational proficiency in your domain',
    desc: 'Designed for professionals who use SAP operationally — finance teams, procurement officers, HR administrators, and warehouse staff. Power users master the transactions relevant to their role and become internal SAP champions.',
    path: [
      'Single module focus aligned to job role',
      'Transaction-level proficiency (T-codes, variants, layouts)',
      'Reporting, output management, and authorisations',
      'Process integration overview (upstream/downstream)',
      'Troubleshooting common user issues',
    ],
  },
];

const process = [
  { num: '01', title: 'Module Selection & Role Mapping', desc: 'We align training to your team\'s actual job roles — not generic learning paths. An FICO accountant and an SD sales coordinator need completely different starting points and different depths.' },
  { num: '02', title: 'Curriculum Delivery on Live SAP Systems', desc: 'Training happens inside real SAP environments — not simulations or screenshots. Your team navigates actual T-codes, performs real transactions, and sees real data flow across integrated modules.' },
  { num: '03', title: 'Scenario-Based Business Exercises', desc: 'Every module includes end-to-end business scenario walkthroughs — complete order-to-cash cycles, month-end closing procedures, MRP runs. Theory is always grounded in practice.' },
  { num: '04', title: 'Assessment & Knowledge Gap Analysis', desc: 'Module assessments identify gaps before the certification exam. We re-drill weak areas until your team is exam-ready — not just classroom-ready. Individual performance tracked throughout.' },
  { num: '05', title: 'Certification Exam Support', desc: 'We manage SAP certification exam registration, vouchers, and scheduling. Targeted prep for the specific exam blueprint your team is sitting — domain weights, question formats, and time management.' },
  { num: '06', title: 'Post-Training Implementation Guidance', desc: 'We support your team during the critical first weeks of live application — go-live queries, advanced configuration questions, and escalation paths when real-world scenarios diverge from training.' },
];

function HeroSection() {
  return (
    <section className="relative bg-[#002747] pt-[136px] pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[180px] pointer-events-none -translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: `${ACCENT}18` }} />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" style={{ backgroundColor: `${ACCENT}12` }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, ${ACCENT}, transparent)` }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <Database size={12} style={{ color: ACCENT_LIGHT }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>In Partnership with SAP Academy</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['ERP expertise your', 'enterprise can build on.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #a8d8ff)` }}>enterprise can build on.</em>
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
            As an authorised SAP Academy partner, Prudentia delivers hands-on training across 8 SAP modules — in live SAP environments, by certified instructors, with a curriculum aligned to S/4HANA.
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
            <a href="/services/cybersecurity" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 rounded-full hover:border-white/35 transition-all">
              Cybersecurity Certifications <ArrowRight size={14} />
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

function WhySAPSection() {
  return (
    <section className="bg-[#001f38] py-20 border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>The Market Reality</span>
          <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-white mt-4 max-w-[640px]">
            SAP runs the world's largest enterprises. The talent gap is real.
          </h2>
          <p className="mt-4 text-[15px] text-white/45 max-w-[500px] leading-relaxed">
            SAP-certified professionals command premium salaries, have near-zero unemployment, and are in demand across every industry that runs enterprise operations.
          </p>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {erpStats.map((item, i) => (
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

function ModulesSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Training Modules</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Eight modules.<br />Every critical function.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[540px] leading-relaxed">
            Training takes place in live SAP environments — not simulations. Every module is built from SAP Academy's authorised curriculum and aligned to the current S/4HANA platform.
          </p>
        </FadeUp>

        <div className="space-y-6">
          {modules.map((mod, mi) => (
            <FadeUp key={mod.code} delay={mi * 0.04}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3" style={{ backgroundColor: `${ACCENT}06` }}>
                  <span className="font-mono text-[12px] font-bold text-white px-2.5 py-1 rounded-md" style={{ backgroundColor: ACCENT }}>{mod.code}</span>
                  <h3 className="text-[15px] font-bold text-[#002747] flex-1 min-w-[160px]">{mod.name}</h3>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ACCENT}12` }}>
                    <mod.icon size={16} style={{ color: ACCENT }} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="lg:w-[340px] flex-shrink-0">
                      <p className="text-[14px] text-gray-500 leading-relaxed">{mod.desc}</p>
                    </div>
                    <div className="mt-5 lg:mt-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">Topics Covered</p>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {mod.topics.map(topic => (
                          <div key={topic} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full flex-shrink-0 mt-[7px]" style={{ backgroundColor: ACCENT }} />
                            <span className="text-[12px] text-gray-600 leading-snug">{topic}</span>
                          </div>
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

function CareerTracksSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Career Tracks</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Three paths into<br />the SAP ecosystem.
          </h2>
          <p className="mt-5 text-[16px] text-gray-400 max-w-[480px] mx-auto leading-relaxed">
            Whether you're configuring, developing, or operating — Prudentia trains you for the track that matches your role and goals.
          </p>
        </FadeUp>
        <div className="grid lg:grid-cols-3 gap-6">
          {careerTracks.map((track, i) => (
            <FadeUp key={track.title} delay={i * 0.08}>
              <div className="p-7 rounded-2xl border border-gray-100 bg-[#F8F7F3] hover:bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${ACCENT}12` }}>
                  <track.icon size={20} style={{ color: ACCENT }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: ACCENT }}>{track.tagline}</span>
                <h3 className="text-[18px] font-bold text-[#002747] mb-3">{track.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5">{track.desc}</p>
                <div className="mt-auto space-y-2">
                  {track.path.map((step, si) => (
                    <div key={si} className="flex items-start gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white mt-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {si + 1}
                      </div>
                      <span className="text-[12px] text-gray-600 leading-snug">{step}</span>
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
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Training Journey</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            From enrolment<br />to certified expert.
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
            Ready to build<br />
            <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #a8d8ff)` }}>
              SAP-certified talent?
            </em>
          </h2>
          <p className="mt-5 text-[16px] text-white/45 leading-relaxed">
            Tell us which modules your team needs and we'll design a training programme that fits your implementation timeline, role structure, and certification goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Discuss Your Requirements <ArrowRight size={14} />
            </a>
            <a href="/services/cybersecurity" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white border border-white/20 rounded-full hover:border-white/40 transition-all">
              Cybersecurity Certifications <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function SapAcademy() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <WhySAPSection />
        <ModulesSection />
        <CareerTracksSection />
        <ProcessSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </>
  );
}
