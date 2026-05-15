import { motion, useInView } from 'motion/react';

import {
  ArrowRight, Globe, FileText, Mic, CheckCircle2,
  Languages, MessageSquare, Layers, Users, Zap,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Navbar, Footer } from '../Home1';

const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#c4b5fd';

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
    icon: FileText,
    title: 'eLearning Localisation',
    desc: 'SCORM/xAPI modules translated and culturally adapted — text, voiceover, graphics, and region-specific examples updated for every target market.',
  },
  {
    icon: Mic,
    title: 'Voiceover & Audio Production',
    desc: 'Native-language voice artists in 40+ languages. Studio-quality recording, editing, and sync — matched frame-accurately to existing audio timings.',
  },
  {
    icon: Globe,
    title: 'Corporate Document Translation',
    desc: 'Policies, handbooks, compliance documents, SOPs, and technical manuals — translated with domain-specific accuracy and consistent terminology.',
  },
  {
    icon: Languages,
    title: 'Subtitling & Closed Captions',
    desc: 'Timed subtitle files (SRT, VTT, ASS) for training videos, corporate communications, and marketing content in 40+ languages.',
  },
  {
    icon: Layers,
    title: 'Website & App Localisation',
    desc: 'UI strings, help content, and transactional copy adapted for cultural context — not just vocabulary. RTL language support included.',
  },
  {
    icon: Zap,
    title: 'Rapid Turnaround Projects',
    desc: 'Compliance deadlines, product launches, regulatory filings — we operate with dedicated project managers and quality reviewers for urgent briefs.',
  },
];

const languages = [
  'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
  'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Arabic', 'French',
  'Spanish', 'German', 'Portuguese', 'Japanese', 'Mandarin', 'Korean',
  'Bahasa Indonesia', 'Thai', 'Vietnamese', 'Russian', 'Italian', 'Dutch',
];

const outcomes = [
  { stat: '40+', label: 'Languages delivered by native translators' },
  { stat: '500+', label: 'Corporate clients served across India and global markets' },
  { stat: '15+', label: 'Years of localisation experience since 2008' },
  { stat: '25+', label: 'Countries reached through localised eLearning programmes' },
];

const process = [
  { num: '01', title: 'Source Content Review', desc: 'We audit your source files — formats, embedded media, font requirements, and cultural sensitivity before quoting.' },
  { num: '02', title: 'Terminology & Style Guide', desc: 'We build a glossary and style guide for your brand voice in each target language — consistency across every document.' },
  { num: '03', title: 'Translation & Adaptation', desc: 'Native translators with domain expertise — not generic linguists. Legal content stays legal, technical content stays accurate.' },
  { num: '04', title: 'Cultural Review', desc: 'A second native-language reviewer checks for tone, cultural fit, and regional appropriateness beyond literal accuracy.' },
  { num: '05', title: 'DTP & Integration', desc: 'For eLearning and multimedia, we handle file reconstruction — SCORM rebuild, voiceover sync, subtitle integration, and QA.' },
  { num: '06', title: 'Client Acceptance', desc: 'Final review with your regional stakeholder or SME before handoff — with one round of revisions included.' },
];

const qualityPillars = [
  { title: 'Native Translators Only', desc: 'Every language is handled by a native speaker — not a second-language professional. The difference is obvious to the reader.' },
  { title: 'Domain Specialists', desc: 'Our linguist network is segmented by domain: pharma, finance, tech, legal, HR. You don\'t get a generalist for a technical manual.' },
  { title: 'Three-Stage Review', desc: 'Translation → Cultural edit → Proofreading. Every deliverable passes three reviewers before it leaves our team.' },
  { title: 'Consistent Terminology', desc: 'Glossaries built and maintained per client. Your brand terms, product names, and regulatory language stay consistent across all documents.' },
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
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7c3aed] via-[#00558F] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT_LIGHT }}>Translation & Localisation</span>
        </motion.div>

        <div className="max-w-[820px]">
          <h1 className="font-serif text-[50px] sm:text-[64px] lg:text-[80px] leading-[1.0] tracking-tight text-white">
            {['Your content,', 'every language.'].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #00558F)` }}>every language.</em>
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
            40+ languages, native translators, domain-specific expertise. Translation that reads
            like it was written in the target language — not processed through it.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full">
              <span>Get a Quote</span> <ArrowRight size={14} />
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

function DeliverablesSection() {
  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>What We Translate</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            Every format.<br />Every language.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[520px] leading-relaxed">
            From eLearning SCORM packages to legal compliance documents — we handle the full spectrum of corporate content localisation.
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

function LanguagesSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Languages</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            40+ languages.<br />Native translators for each.
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 max-w-[500px] mx-auto leading-relaxed">
            A selection of the languages we cover — if yours isn't listed, ask us. Our network is broader than this page.
          </p>
        </FadeUp>

        <div className="flex flex-wrap gap-3 justify-center">
          {languages.map((lang, i) => (
            <FadeUp key={lang} delay={Math.floor(i / 4) * 0.05}>
              <span className="px-4 py-2 rounded-full bg-[#F8F7F3] border border-gray-100 text-[13px] font-medium text-[#002747] hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all cursor-default">
                {lang}
              </span>
            </FadeUp>
          ))}
          <FadeUp>
            <span className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-[13px] font-medium text-gray-400">
              + many more
            </span>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section className="bg-[#002747] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: `${ACCENT_LIGHT}90` }}>Quality Assurance</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-white mt-4">
            Translation that reads<br /><em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: `linear-gradient(to right, ${ACCENT_LIGHT}, #00558F)` }}>like it was written there.</em>
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {qualityPillars.map((q, i) => (
            <FadeUp key={q.title} delay={i * 0.07}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 h-full">
                <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: ACCENT_LIGHT }} />
                <h3 className="text-[15px] font-semibold text-white mb-2">{q.title}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed">{q.desc}</p>
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
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Our Process</span>
          <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.1] tracking-tight text-[#002747] mt-4">
            From source to<br />signed-off delivery.
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
    <section className="bg-white py-24">
      <div className="max-w-[760px] mx-auto px-6 text-center">
        <FadeUp>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}>
            <Languages size={24} style={{ color: ACCENT }} />
          </div>
          <h2 className="font-serif text-[36px] md:text-[48px] leading-[1.1] tracking-tight text-[#002747]">
            Ready to go global<br /><em className="italic">without losing your voice?</em>
          </h2>
          <p className="mt-5 text-[16px] text-gray-500 leading-relaxed">
            Share your source content, target languages, and timeline — we'll respond with a quote and a project plan within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full">
              Get a Quote <ArrowRight size={14} />
            </a>
            <a href="/services/elearning" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#002747] border border-[#002747]/20 rounded-full hover:bg-[#002747] hover:text-white transition-all">
              eLearning Development <ArrowRight size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function Translation() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <DeliverablesSection />
        <LanguagesSection />
        <QualitySection />
        <ProcessSection />
        <CTASection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1] pointer-events-none" />
      <Footer />
    </>
  );
}
