import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  stagger,
  animate,
  useInView,
  type MotionValue,
} from 'motion/react';
import { ArrowRight, CheckCircle2, Users, Building2, Target, X, TrendingUp, BookOpen, Globe, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import { cn } from './lib/utils';
import { ReactLenis } from 'lenis/react';

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedChars({ text, className, delay = 0, once = true }: {
  text: string; className?: string; delay?: number; once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10%' });
  const chars = text.split('');
  return (
    <span ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: '110%', rotateX: -80, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: '0%', rotateX: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: delay + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function AnimatedWords({ text, className, delay = 0, once = true }: {
  text: string; className?: string; delay?: number; once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10%' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={cn('inline', className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
function ScrambleText({ text, className, trigger }: { text: string; className?: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<number>(0);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    iterRef.current = 0;
    const totalFrames = text.length * 3;
    const tick = () => {
      iterRef.current++;
      const progress = iterRef.current / totalFrames;
      setDisplayed(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i / text.length < progress) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('')
      );
      if (iterRef.current < totalFrames) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, text]);

  return <span className={className}>{displayed}</span>;
}

function CountUp({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, to]);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

function MagneticButton({ children, className, onClick, type }: {
  children: React.ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit';
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.button ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} onClick={onClick} type={type}>
      {children}
    </motion.button>
  );
}


function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const onLeave = () => { rotateX.set(0); rotateY.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={cn('relative', className)}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 60 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 60 });

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [data-hover]')) setIsHovering(true);
    };
    const leave = () => setIsHovering(false);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter, true);
    document.addEventListener('mouseleave', leave, true);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter, true);
      document.removeEventListener('mouseleave', leave, true);
    };
  }, []);

  return (
    <>
      <motion.div className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}>
        <motion.div className="rounded-full bg-white"
          animate={{ width: isHovering ? 48 : 28, height: isHovering ? 48 : 28, opacity: isHovering ? 0.9 : 0.7 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} />
      </motion.div>
      <motion.div className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}>
        <div className="w-2 h-2 rounded-full bg-[#008A45] mix-blend-difference" />
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ORBS
// ─────────────────────────────────────────────────────────────────────────────

function FloatingOrbs() {
  const orbs = [
    { size: 400, x: '10%', y: '15%', color: '#008A4520', dur: 8 },
    { size: 300, x: '75%', y: '25%', color: '#00558F18', dur: 11 },
    { size: 500, x: '55%', y: '65%', color: '#008A4512', dur: 14 },
    { size: 250, x: '20%', y: '75%', color: '#00558F15', dur: 9 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div key={i} className="absolute rounded-full blur-3xl"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color, translateX: '-50%', translateY: '-50%' }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION REVEAL
// ─────────────────────────────────────────────────────────────────────────────

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  return (
    <img
      src="/images/logo-prudentia.png"
      alt="Prudentia — Technology Solutions India Pvt Ltd"
      draggable={false}
      className={`h-12 sm:h-14 md:h-16 lg:h-20 w-auto select-none ${light ? 'brightness-0 invert opacity-90' : ''}`}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Corporate Training', href: '/services/corporate-training' },
  { label: 'eLearning',          href: '/services/elearning' },
  { label: 'About',              href: '/about' },
  { label: 'Contact',            href: '/contact' },
];

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 xl:px-20 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <Logo />
          </div>

          <nav
            className="hidden lg:flex items-center gap-0.5 px-3 py-1.5 rounded-full border backdrop-blur-md"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.22)' }}
          >
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href}
                className="px-4 py-2 rounded-full text-[14px] font-bold uppercase tracking-widest transition-colors duration-200 whitespace-nowrap text-gray-800 hover:text-[#008A45] hover:bg-white/20">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <MagneticButton className="btn-primary hidden sm:flex px-7 py-[13px] text-[15px] font-bold uppercase tracking-[0.14em] gap-2.5 group">
              Book a Free Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2.5 rounded-full border backdrop-blur-sm transition-colors border-white/25 bg-white/10 text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Off-canvas mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#07111d]/70 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[340px] max-w-[88vw] z-[70] shadow-2xl flex flex-col lg:hidden overflow-hidden"
              style={{
                backgroundImage:
                  'linear-gradient(160deg, #07111d 0%, #001530 45%, #001220 100%)',
              }}
            >
              {/* Ambient brand glow */}
              <div className="absolute -top-32 -right-24 w-72 h-72 bg-[#008A45]/22 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-[#00558F]/24 rounded-full blur-[80px] pointer-events-none" />
              {/* Left green accent bar */}
              <div className="absolute inset-y-0 left-0 w-[3px] bg-[#008A45]" />

              {/* Header */}
              <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Logo light />
                <button onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center bg-white/8 border border-white/15 rounded-full text-white/85 hover:bg-white/15 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="relative flex flex-col px-4 py-6 gap-1.5 flex-1">
                {[{ label: 'Home (Original)', href: '/' }, { label: 'Home 1', href: '/home1.html' }, ...NAV_LINKS].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex items-center justify-between gap-3 py-4 px-4 text-[16px] font-semibold tracking-tight text-white/85 hover:text-white rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[15px] font-bold tracking-[0.2em] text-[#6ee89a]/70 group-hover:text-[#6ee89a] transition-colors">{String(i + 1).padStart(2, '0')}</span>
                      <span>{link.label}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/35 group-hover:text-[#6ee89a] group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Contact strip + CTA */}
              <div className="relative p-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-bold uppercase tracking-[0.18em] text-[#6ee89a]/80">Talk to us</span>
                  <a href="mailto:hello@prudentia.com" className="text-[15px] text-white/85 hover:text-white transition-colors">hello@prudentia.com</a>
                </div>
                <button className="w-full bg-gradient-to-r from-[#008A45] to-[#00558F] text-white py-3.5 px-5 rounded-xl text-[15px] font-bold uppercase tracking-[0.15em] gap-2.5 flex items-center justify-center shadow-[0_18px_40px_-12px_rgba(0,138,69,0.55)] hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all">
                  Book a Free Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-12 px-6 sm:px-10 xl:px-16">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img src="/images/hero-slide-1.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      {/* Dark overlay — preserves text legibility */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(6,24,38,0.97) 0%, rgba(6,24,38,0.90) 50%, rgba(6,24,38,0.70) 100%)' }} />
      {/* Green left accent bar */}
      <div className="absolute inset-y-0 left-0 w-[3px] z-[1] bg-[#068140]" />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#6ee89a 1px,transparent 1px),linear-gradient(90deg,#6ee89a 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-[2] max-w-[1280px] mx-auto h-full">
        <div
          className="grid gap-4 lg:gap-5"
          style={{
            gridTemplateColumns: '1fr 380px',
            gridTemplateRows: 'auto auto',
          }}
        >
          {/* ── Top-left: oversized headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end pb-4 col-span-2 lg:col-span-1"
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-6 h-0.5 bg-[#6ee89a]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]">Global Learning Partner</span>
            </div>
            <h1 className="font-serif text-[44px] sm:text-[60px] xl:text-[78px] leading-[1.0] tracking-tight text-white">
              Learning That<br />
              Actually{' '}
              <em className="italic text-transparent bg-clip-text bg-gradient-to-br from-[#6ee89a] to-[#00558F]">
                Changes
              </em><br />
              Behaviour.
            </h1>
            <p className="mt-5 text-[15px] text-white/55 leading-relaxed max-w-[480px]">
              We design training, eLearning and localisation programmes that drive real performance — not just attendance records.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton className="btn-primary inline-flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-full">
                Our Services
                <ArrowRight size={14} />
              </MagneticButton>
              <a href="#testimonials" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/40 hover:text-white transition-colors">
                Client Stories →
              </a>
            </div>
          </motion.div>

          {/* ── Top-right: tilted stat card ── */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, scale: 0.92 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col justify-between bg-[#002747] rounded-3xl p-7 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)] self-end border border-white/8"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]/70 mb-4">Our Track Record</p>
              <div className="space-y-5">
                {[
                  { v: '500+', l: 'Companies Trained' },
                  { v: '15+',  l: 'Industries Served' },
                  { v: '25+',  l: 'Countries Reached' },
                ].map(s => (
                  <div key={s.l} className="flex items-baseline gap-3">
                    <span className="font-serif text-[42px] text-white leading-none font-bold">{s.v}</span>
                    <span className="text-[11px] uppercase tracking-wider text-white/45 leading-tight">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-white/45 text-[11px] leading-relaxed">EC-Council · Skillsoft Percipio · SAP Academy</p>
            </div>
          </motion.div>

          {/* ── Bottom-left: compact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.05] rounded-3xl border border-white/10 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3)] p-6 col-span-2 lg:col-span-1 backdrop-blur-sm"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35 mb-4">Start the Conversation</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="Your name" className="px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/10 rounded-xl focus:outline-none focus:border-[#6ee89a] placeholder:text-white/25 text-white" />
              <input placeholder="work@company.com" type="email" className="px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/10 rounded-xl focus:outline-none focus:border-[#6ee89a] placeholder:text-white/25 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="Organisation" className="px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/10 rounded-xl focus:outline-none focus:border-[#6ee89a] placeholder:text-white/25 text-white" />
              <select className="px-3.5 py-2.5 text-sm bg-white/[0.07] border border-white/10 rounded-xl focus:outline-none focus:border-[#6ee89a] text-white/35">
                <option value="">Service…</option>
                <option>Corporate Training</option>
                <option>eLearning Development</option>
                <option>Translation &amp; Localisation</option>
                <option>Certification Programme</option>
              </select>
            </div>
            <button className="w-full btn-primary py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 group">
              Request Free Consultation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* ── Bottom-right: trust badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col justify-center gap-3 pl-4"
          >
            {[
              { label: 'SAP Academy Partner',     sub: 'Authorised ERP curriculum & certification' },
              { label: 'EC-Council Authorized',   sub: 'Global cybersecurity training' },
              { label: 'Skillsoft Percipio',      sub: '200K+ assets on the AI-powered LXP' },
            ].map(b => (
              <div key={b.label} className="flex items-start gap-3 py-3 px-4 bg-white/[0.06] border border-white/10 rounded-xl backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6ee89a] shrink-0 mt-1.5" />
                <div>
                  <p className="text-white text-[14px] font-semibold leading-tight">{b.label}</p>
                  <p className="text-white/45 text-[12px] mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OUTCOMES
// ─────────────────────────────────────────────────────────────────────────────

const OUTCOMES = [
  { num: '01', text: 'Skills that translate directly into performance' },
  { num: '02', text: 'Learning designed to stick — not just to pass' },
  { num: '03', text: 'Teams equipped for real-world execution' },
  { num: '04', text: 'Clear, measurable ROI from every engagement' },
];

function Outcomes() {
  return (
    <section className="bg-white px-6 sm:px-10 lg:px-16 xl:px-20 py-20 lg:py-28 border-l-[3px] border-[#008A45]">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008A45]" />
          <span className="text-[15px] font-bold uppercase tracking-[0.2em] text-gray-600">What We Deliver</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans font-bold tracking-tighter text-gray-900 leading-[1.02] mb-3 max-w-3xl">
          Learning that actually
        </h2>
        <p className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#008A45]/90 tracking-tight mb-6">
          moves the needle.
        </p>
        <p className="text-gray-500 text-[17px] leading-relaxed max-w-xl mb-14">
          Great learning transfers knowledge, builds capability, and drives real change in how people actually work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OUTCOMES.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#f8f7f3] rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_32px_-8px_rgba(0,39,71,0.12)] border border-transparent hover:border-gray-100 transition-all duration-300"
            >
              <span className="font-serif text-[42px] font-bold text-[#008A45]/15 leading-none block mb-4">{item.num}</span>
              <p className="text-gray-700 text-[15px] sm:text-[16px] leading-snug font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOLUTION
// ─────────────────────────────────────────────────────────────────────────────

function Solution() {
  const items = [
    { title: "Corporate Training", desc: "Structured programs for leadership, technical, and soft skills at every level.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", icon: TrendingUp },
    { title: "eLearning & LMS", desc: "Custom module development for scalable, engaging, and effective team learning.", img: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop", icon: BookOpen },
    { title: "Certification Programs", desc: "Microsoft, SAP, and industry-standard accreditations for real-world team roles.", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop", icon: CheckCircle2 },
    { title: "Workshops & Seminars", desc: "Intensive, scenario-based learning sessions designed for hands-on skill transfer.", img: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop", icon: Users },
    { title: "Translation & Localization", desc: "End-to-end multilingual learning deployment for global teams across all markets.", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2070&auto=format&fit=crop", icon: Globe },
  ];

  return (
    <section className="bg-white min-h-screen flex items-center overflow-hidden">
      <div className="w-full px-6 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-14 lg:py-16 flex flex-col gap-8 sm:gap-10 lg:gap-12">

        {/* Heading */}
        <SectionReveal className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans text-gray-900 tracking-tight leading-[1.1] mb-4 font-bold">
            Training Designed for{' '}
            <span className="italic font-serif text-[#008A45] font-normal">Real-World</span>{' '}
            Application.
          </h2>
          <p className="text-[15px] text-gray-500">Prudentia doesn't just deliver training. Prudentia builds capability.</p>
        </SectionReveal>

        {/* Card grid — 3 cols, 2 rows: 5 service cards + 1 dark card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-premium overflow-hidden group flex flex-col cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Photo — no title overlay */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content — icon straddles boundary, title + desc in white area */}
              <div className="relative flex flex-col p-5 pt-12 flex-1">
                {/* Icon: top-0 + -translate-y-1/2 = 50% in image, 50% in white */}
                <div className="absolute top-0 left-5 -translate-y-1/2 w-14 h-14 rounded-full bg-white border border-[#008A45]/25 flex items-center justify-center shrink-0 shadow-md transition-colors duration-300 group-hover:bg-[#008A45] group-hover:border-[#008A45]">
                  <item.icon className="w-6 h-6 text-[#008A45] transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="text-[21px] font-semibold text-gray-900 leading-snug mb-2">{item.title}</h3>
                <div className="w-7 h-px bg-gray-200 mb-3" />
                <p className="text-[15px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Dark card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#001829] rounded-2xl flex flex-col justify-between p-8 overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #6ee89a 0, #6ee89a 1px, transparent 0, transparent 50%)', backgroundSize: '18px 18px' }} />
            <div className="relative z-10 flex flex-col gap-1">
              <p className="text-[15px] uppercase font-bold tracking-widest text-[#6ee89a] mb-3">Every solution ensures:</p>
              <p className="font-serif text-[2rem] italic leading-tight text-white">Learn → Apply</p>
              <p className="font-serif text-[2rem] italic leading-tight text-white/35">Improve → Perform</p>
            </div>
            <MagneticButton className="relative z-10 mt-10 text-left text-[15px] font-medium group flex items-center justify-between w-full border-t border-white/10 pt-5 hover:text-[#6ee89a] transition-colors bg-transparent text-white">
              Talk to an Expert
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { num: "01", title: "Understand", desc: "Prudentia assesses skill gaps, roles, and business outcomes before creating a plan.", img: "/images/step-understand.jpg" },
    { num: "02", title: "Design", desc: "Learning strategies are meticulously aligned to real-world business use cases.", img: "/images/step-design.jpg" },
    { num: "03", title: "Deliver", desc: "Hybrid learning combining instructor-led, virtual, video-based, and interactive modules.", img: "/images/step-deliver.jpg" },
    { num: "04", title: "Apply", desc: "Real-world scenarios, business simulations, and case-based learning.", img: "/images/step-apply.jpg" },
    { num: "05", title: "Measure", desc: "Strict focus on post-training execution and performance gains, not mere attendance.", img: "/images/step-measure.jpg" },
  ];
  return (
    <section className="bg-white min-h-screen flex items-center overflow-hidden">
      <div className="w-full px-6 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-14 lg:py-16 flex flex-col gap-8 sm:gap-10 lg:gap-14">

        {/* Header — heading only, full breathing room */}
        <SectionReveal className="border-b border-gray-100 pb-5 sm:pb-8 lg:pb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans font-bold text-gray-900 tracking-tight leading-[1.1] max-w-3xl">
            <AnimatedWords text="A Structured Approach That" delay={0} />{' '}
            <span className="italic font-serif text-[#008A45] font-normal">
              <AnimatedWords text="Drives Real Results." delay={0.45} />
            </span>
          </h2>
        </SectionReveal>

        {/* Steps — horizontal row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative group flex flex-col gap-5 p-7 rounded-2xl border border-gray-200 bg-white shadow-[0_2px_16px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.13)] hover:border-[#008A45]/30 transition-all duration-300 overflow-hidden"
            >
              {/* Hover image overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `url(${step.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gray-200 z-10" />
              )}
              {/* Step number badge */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-[#f2faf6] border border-[#008A45]/20 group-hover:bg-[#008A45]/20 group-hover:border-[#008A45]/40 flex items-center justify-center shrink-0 transition-colors duration-300">
                <span className="text-[15px] font-bold text-[#008A45]">{step.num}</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                <p className="text-[15px] text-gray-500 group-hover:text-white/80 leading-relaxed transition-colors duration-300">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing strip — description (left) + CTA (right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 border-t border-gray-100 pt-8 md:pt-10"
        >
          <p className="text-[15px] md:text-[16px] text-gray-500 max-w-md leading-relaxed">
            We don't do boilerplate. Every program is engineered for your specific operational reality.
          </p>
          <MagneticButton className="btn-primary px-8 py-3.5 text-[15px] gap-2 group shrink-0 self-start md:self-end">
            Plan My Training
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OFFER BREAKDOWN (horizontal scroll)
// ─────────────────────────────────────────────────────────────────────────────

function OfferBreakdown() {
  const CARDS = [
    {
      tag: "Core",
      title: "Corporate Training",
      desc: "Leadership, compliance, technical, and critical soft skills — each module tied to a measurable business KPI.",
      icon: <TrendingUp className="w-5 h-5" />,
      accent: "#1DBF73",
      img: "/images/bento-corporate-training.jpg",
    },
    {
      tag: "Accredited",
      title: "Certification",
      desc: "Industry-recognized certifications aligned with real-world technical requirements and business outcomes.",
      icon: <CheckCircle2 className="w-5 h-5" />,
      accent: "#60a5fa",
      img: "/images/bento-certification.jpg",
    },
    {
      tag: "Custom",
      title: "eLearning",
      desc: "Custom content generation, seamless LMS integration, and highly interactive modules at scale.",
      icon: <BookOpen className="w-5 h-5" />,
      accent: "#1DBF73",
      img: "/images/bento-elearning.jpg",
    },
    {
      tag: "Live",
      title: "Workshops",
      desc: "Hands-on, scenario-based learning delivered in an intensive format by domain experts.",
      icon: <Users className="w-5 h-5" />,
      accent: "#60a5fa",
      img: "/images/bento-workshops.jpg",
    },
    {
      tag: "Global",
      title: "Localization",
      desc: "End-to-end multilingual learning across 40+ languages for global workforce deployment.",
      icon: <Globe className="w-5 h-5" />,
      accent: "#1DBF73",
      img: "/images/bento-localization.jpg",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 px-6 sm:px-8 md:px-16 lg:px-24 bg-white border-y border-gray-100">
      <SectionReveal className="mb-16">
        <p className="text-[15px] font-bold tracking-[0.28em] uppercase text-[#008A45] mb-5 flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-[#008A45]" />
          Full Capability Stack
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans font-bold tracking-tighter text-gray-900 max-w-3xl leading-[1.05]">
          Everything Needed to Build a{' '}
          <span className="italic font-serif text-[#008A45] font-normal">High-Performing Workforce</span>
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" style={{ gridAutoRows: '300px' }}>

        {/* ── Corporate Training — 2×2 large ── */}
        <motion.div
          className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl cursor-pointer group"
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={CARDS[0].img} alt={CARDS[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-all duration-500 group-hover:from-black/75" />
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[0].tag}
              </span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[0].icon}
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white mb-2">{CARDS[0].title}</h3>
              <p className="text-white/70 text-[15px] leading-relaxed max-w-sm mb-5">{CARDS[0].desc}</p>
              <motion.div className="w-9 h-9 rounded-full flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"
                whileHover={{ x: 4 }}>
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Certification & eLearning — 1×1 each ── */}
        {[CARDS[1], CARDS[2]].map((card, i) => (
          <motion.div key={i}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            whileHover={{ scale: 1.018 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={card.img} alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-all duration-500 group-hover:from-black/75" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                  {card.tag}
                </span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                  {card.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-sans font-medium tracking-tight text-white mb-1">{card.title}</h3>
                <p className="text-white/70 text-[15px] leading-relaxed mb-4">{card.desc}</p>
                <motion.div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"
                  whileHover={{ x: 3 }}>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── Workshops — 2×1 wide ── */}
        <motion.div
          className="md:col-span-2 relative overflow-hidden rounded-2xl cursor-pointer group"
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={CARDS[3].img} alt={CARDS[3].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-all duration-500 group-hover:from-black/75" />
          <div className="absolute inset-0 p-7 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[3].tag}
              </span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[3].icon}
              </div>
            </div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-white mb-2">{CARDS[3].title}</h3>
                <p className="text-white/70 text-[15px] leading-relaxed max-w-md">{CARDS[3].desc}</p>
              </div>
              <motion.div className="w-9 h-9 rounded-full flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 shrink-0"
                whileHover={{ x: 4 }}>
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Localization — 1×1 ── */}
        <motion.div
          className="relative overflow-hidden rounded-2xl cursor-pointer group"
          whileHover={{ scale: 1.018 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={CARDS[4].img} alt={CARDS[4].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-all duration-500 group-hover:from-black/75" />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[4].tag}
              </span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                {CARDS[4].icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-sans font-medium tracking-tight text-white mb-1">{CARDS[4].title}</h3>
              <p className="text-white/70 text-[15px] leading-relaxed mb-4">{CARDS[4].desc}</p>
              <motion.div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"
                whileHover={{ x: 3 }}>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EC-COUNCIL PARTNERSHIP
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// PARTNERSHIPS — Sticky Tab Bar (EC-Council · Skillsoft · SAP)
// ─────────────────────────────────────────────────────────────────────────────

const PARTNER_FEATURES = {
  ec: [
    { title: 'Certified Ethical Hacker (CEH)',           desc: 'Industry gold-standard offensive security certification' },
    { title: 'SOC Analyst (CSA)',                         desc: 'Blue-team operations and threat detection skills' },
    { title: 'Certified Cloud Security Engineer (CCSE)', desc: 'Advanced cloud security architecture and compliance' },
    { title: 'EC-Council Incident Handler (ECIH)',       desc: 'Incident response, digital forensics, and recovery' },
  ],
  skillsoft: [
    { title: 'AI-Driven Personalization Engine',  desc: "Adaptive journeys that match every learner's role and pace" },
    { title: '200,000+ Digital Learning Assets',  desc: 'Courses, videos, books, and labs across every domain' },
    { title: 'Skill Intelligence & Analytics',    desc: 'Real-time skill gap visibility and workforce benchmarks' },
    { title: 'No Infrastructure Investment',      desc: 'Fully managed SaaS — live in weeks, not months' },
  ],
  sap: [
    { title: 'Curriculum Development',     desc: 'Collaborating with universities to design comprehensive, industry-aligned SAP training courses.' },
    { title: 'Hands-On ERP Training',      desc: 'Real-life scenarios and practical exercises inside live SAP enterprise environments.' },
    { title: 'Full Tool Proficiency',      desc: 'Deep expertise across all SAP modules, tools, and end-to-end business workflows.' },
    { title: 'Professional Certification', desc: 'Industry-recognised SAP credentials that validate real-world competency and career readiness.' },
  ],
};

const PARTNERS_TABS = [
  {
    id: 'ec-council',
    label: 'EC-Council',
    sub: 'Cybersecurity Certifications',
    accentColor: '#068140',
    badge: 'In Partnership with EC-Council',
    badgeBg: 'rgba(6,129,64,0.08)',
    badgeBorder: 'rgba(6,129,64,0.20)',
    badgeText: '#068140',
    headlineTop: 'From Awareness',
    headlineBottom: 'to Advanced Defense.',
    italicColor: '#068140',
    desc: 'Certified cybersecurity capability for your entire workforce — from first-line awareness to advanced threat response.',
    features: PARTNER_FEATURES.ec,
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(6,129,64,0.30)',
    cta: 'Explore Cybersecurity Training',
    ctaBg: '#068140',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
  {
    id: 'skillsoft',
    label: 'Skillsoft',
    sub: 'Learning Experience Platform',
    accentColor: '#00a3e0',
    badge: 'Powered by Skillsoft Percipio',
    badgeBg: 'rgba(0,163,224,0.10)',
    badgeBorder: 'rgba(0,163,224,0.25)',
    badgeText: '#00558F',
    headlineTop: 'Enterprise Learning',
    headlineBottom: 'as a Subscription.',
    italicColor: '#00558F',
    desc: 'A fully managed LXP deployed in weeks. AI-personalized learning journeys, 200,000+ assets, and real-time skill intelligence — zero infrastructure required.',
    features: PARTNER_FEATURES.skillsoft,
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(0,163,224,0.4)',
    cta: 'Explore the LXP Platform',
    ctaBg: '#002747',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
  {
    id: 'sap',
    label: 'SAP Academy',
    sub: 'ERP & Enterprise Training',
    accentColor: '#0070D2',
    badge: 'In Partnership with SAP Academy',
    badgeBg: 'rgba(0,112,210,0.08)',
    badgeBorder: 'rgba(0,112,210,0.20)',
    badgeText: '#0070D2',
    headlineTop: 'Bridging Academia',
    headlineBottom: '& Enterprise.',
    italicColor: '#0070D2',
    desc: 'As an authorised SAP Academy partner, Prudentia helps universities and enterprises build comprehensive SAP curricula — closing the gap between academic theory and real-world ERP practice.',
    features: PARTNER_FEATURES.sap,
    featureDivider: '#f0f0f0',
    featureNumBase: 'rgba(0,112,210,0.30)',
    cta: 'Explore SAP Training',
    ctaBg: '#0070D2',
    panelBg: '#F8F7F3',
    headlineColor: '#002747',
    descColor: '#6b7280',
  },
];

function PartnershipsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [dir, setDir] = useState(1);

  const p = PARTNERS_TABS[activeTab];

  const switchTab = (i: number) => {
    setDir(i > activeTab ? 1 : -1);
    setActiveTab(i);
  };

  return (
    <section className="overflow-hidden">
      {/* Dark aurora header */}
      <div className="relative bg-[#002747] overflow-hidden">
        {/* Box grid pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#6ee89a 1px, transparent 1px), linear-gradient(90deg, #6ee89a 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(6,129,64,0.32) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'aurora-float-1 16s ease-in-out infinite' }} />
        <div className="absolute bottom-[-15%] left-[10%] w-[600px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,85,143,0.25) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'aurora-float-2 22s ease-in-out infinite' }} />
        <div className="absolute top-[25%] left-[-5%] w-[450px] h-[320px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(6,129,64,0.18) 0%, transparent 70%)', filter: 'blur(90px)', animation: 'aurora-float-3 28s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-40 text-center">
          <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#4ade80]">
            <span className="inline-block w-6 h-0.5 bg-[#4ade80] shrink-0" />
            Our Partnerships
          </span>
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
            {PARTNERS_TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => switchTab(i)}
                className={`relative text-left rounded-xl px-4 sm:px-6 py-4 sm:py-5 transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-white shadow-[0_4px_20px_-4px_rgba(0,39,71,0.14)]'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                {activeTab === i && (
                  <motion.div layoutId="partner-tab-indicator" className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full" style={{ backgroundColor: tab.accentColor }} transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                )}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeTab === i ? tab.accentColor : '#d1d5db' }} />
                  <div>
                    <span className={`block text-[13px] sm:text-[15px] font-semibold leading-tight ${activeTab === i ? 'text-[#002747]' : 'text-gray-500'}`}>{tab.label}</span>
                    <span className="hidden sm:block text-[12px] text-gray-400 mt-1">{tab.sub}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content panel */}
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
          <div className="max-w-[1280px] mx-auto px-6 py-10 lg:py-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: p.badgeBg, border: `1px solid ${p.badgeBorder}` }}>
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
              <div className="rounded-2xl overflow-hidden self-start -mt-2 bg-white border border-[#002747]/8 shadow-[0_8px_40px_-8px_rgba(0,39,71,0.10)]">
                {p.features.map((f, fi) => (
                  <div key={f.title} className={`flex items-start gap-6 px-6 py-5 ${fi > 0 ? 'border-t' : ''} hover:bg-[#f5f9ff] transition-colors`} style={{ borderColor: p.featureDivider }}>
                    <span className="font-serif text-[26px] font-bold leading-none mt-0.5 shrink-0 w-8" style={{ color: p.featureNumBase }}>{String(fi + 1).padStart(2, '0')}</span>
                    <div>
                      <h4 className="font-semibold text-[16px] mb-1 leading-snug" style={{ color: '#002747' }}>{f.title}</h4>
                      <p className="text-[14px] leading-relaxed text-gray-400">{f.desc}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — scrolling columns
// ─────────────────────────────────────────────────────────────────────────────

const TESTIMONIALS_DATA = [
  { text: "Prudentia's performance-first approach transformed our compliance training from a checkbox exercise into a program our employees genuinely retain and apply on the job.", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Priya Mehta", role: "Head of L&D · Infosys BPM" },
  { text: "We saw a 38% reduction in onboarding time within the first quarter after deploying Prudentia's structured learning paths. The ROI was immediately visible to leadership.", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "James Okonkwo", role: "VP People Operations · Standard Chartered" },
  { text: "What sets Prudentia apart is how they link every learning module to a specific business KPI. This is not training — it is business transformation through capability building.", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Anjali Sharma", role: "Chief Learning Officer · TCS" },
  { text: "Prudentia's SAP certification program gave our teams the practical skills to execute complex rollouts. Certification pass rates jumped from 61% to 94% in one cycle.", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "Marcus Webb", role: "Director of HR · Siemens India" },
  { text: "The custom eLearning modules Prudentia built for clinical soft skills were world-class. Our patient satisfaction scores improved by 22% within six months of rollout.", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Lena Kowalski", role: "Training Manager · Novartis Healthcare" },
  { text: "Safety compliance training by Prudentia is unlike anything we have experienced. They made dry regulatory content compelling and memorable — incident rates dropped by 31%.", image: "https://randomuser.me/api/portraits/men/6.jpg", name: "Rajiv Kapoor", role: "Director, Safety & HR · Reliance Industries" },
  { text: "Prudentia standardized our customer service training across 200+ stores while keeping content locally relevant. Customer satisfaction scores climbed 18 points in one year.", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Sarah Chen", role: "Chief People Officer · Walmart India" },
  { text: "Our Microsoft certification pass rate improved by 40% after Prudentia redesigned our preparation program. Simulation-based learning made all the difference for our engineers.", image: "https://randomuser.me/api/portraits/women/9.jpg", name: "Aditi Patel", role: "L&D Manager · Wipro Technologies" },
  { text: "Prudentia upskilled over 1,200 last-mile delivery staff across four languages in under three months. The localization quality and deployment speed were truly impressive.", image: "https://randomuser.me/api/portraits/men/10.jpg", name: "David Osei", role: "Head of Talent · DHL Express" },
  { text: "Prudentia's leadership development pipeline produced measurable results — 34% of participants received promotions within 18 months. That is a number our board celebrates.", image: "https://randomuser.me/api/portraits/women/11.jpg", name: "Meera Krishnan", role: "VP Human Resources · HDFC Bank" },
  { text: "Prudentia built us a completely bespoke learning journey for our consulting practice. The quality of instructional design matched and in some areas exceeded our global standards.", image: "https://randomuser.me/api/portraits/men/12.jpg", name: "Tom Harrison", role: "Learning Architect · Deloitte India" },
  { text: "Our cabin crew service training was already strong. Prudentia elevated it further with scenario-based virtual learning now considered a global best practice within Emirates.", image: "https://randomuser.me/api/portraits/women/13.jpg", name: "Fatima Al-Rashid", role: "Head of HR · Emirates Airlines India" },
  { text: "Prudentia trained over 800 engineers ahead of our new plant deployments, compressing a 12-week program into six weeks without any loss in quality or retention.", image: "https://randomuser.me/api/portraits/women/14.jpg", name: "Sunita Rao", role: "Training Lead · BHEL" },
  { text: "Sales force effectiveness training by Prudentia delivered a direct 27% improvement in conversion rates for our frontline retail teams within a single quarter.", image: "https://randomuser.me/api/portraits/men/15.jpg", name: "Kartik Iyer", role: "HR Business Partner · Marico" },
  { text: "Prudentia's digital transformation upskilling program was exactly what our workforce needed. They made complex technology adoption feel achievable and exciting for our teams.", image: "https://randomuser.me/api/portraits/women/16.jpg", name: "Elena Petrov", role: "Chief Learning Officer · ABB India" },
  { text: "The safety-first culture Prudentia helped us build across our plants is a point of organizational pride. Audit scores improved significantly and our teams are genuinely engaged.", image: "https://randomuser.me/api/portraits/men/17.jpg", name: "Arun Nair", role: "Director Training · Tata Steel" },
  { text: "Prudentia helped us scale instructor-led training to a fully blended digital model, tripling our throughput without increasing headcount. It was an operational breakthrough.", image: "https://randomuser.me/api/portraits/women/18.jpg", name: "Pooja Singh", role: "VP Talent · Byju's" },
  { text: "Deploying a consistent learning experience across our 40,000-strong India workforce is no small feat. Prudentia delivered that consistency while maintaining deep local relevance.", image: "https://randomuser.me/api/portraits/men/19.jpg", name: "Michael O'Brien", role: "Head of L&D · Accenture India" },
  { text: "Skill standardization on the production floor is notoriously difficult. Prudentia's structured learning paths and on-the-job reinforcement tools cut our defect rate by 19%.", image: "https://randomuser.me/api/portraits/women/20.jpg", name: "Nisha Gupta", role: "HR Director · Maruti Suzuki" },
  { text: "Prudentia's cross-functional leadership program created genuine alignment across our business units. Leaders who completed it consistently outperform their peers on every KPI.", image: "https://randomuser.me/api/portraits/men/21.jpg", name: "Ahmad Khalil", role: "Group HR Head · Mahindra Group" },
];

type TestimonialItem = typeof TESTIMONIALS_DATA[0];

function TestimonialsColumn({ testimonials, duration = 10, className }: {
  testimonials: TestimonialItem[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn('overflow-hidden flex-1 min-w-0', className)}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map((pass) => (
          <React.Fragment key={pass}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${pass}-${i}`}
                className="p-6 rounded-2xl border border-white/80 shadow-md shadow-[rgba(0,138,69,0.06)] w-full bg-white/75 backdrop-blur-sm"
              >
                <p className="text-gray-700 text-[15px] leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 text-[15px] tracking-tight leading-5 truncate">{name}</span>
                    <span className="text-[15px] text-gray-400 leading-5 truncate">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function Testimonials() {
  const firstCol  = TESTIMONIALS_DATA.slice(0, 5);
  const secondCol = TESTIMONIALS_DATA.slice(5, 10);
  const thirdCol  = TESTIMONIALS_DATA.slice(10, 15);
  const fourthCol = TESTIMONIALS_DATA.slice(15, 20);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#faf8f5] via-[#f4f9f6] to-[#ecf3f9] border-y border-gray-200/50 relative overflow-hidden">
      <div className="px-6 lg:px-16 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto text-center"
        >
          <span className="text-[#008A45] text-[15px] font-medium tracking-widest uppercase mb-4 block">Client Outcomes</span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans tracking-tighter font-bold text-gray-900 mb-4">
            Built on Real Outcomes.
            <br />
            <span className="text-[#008A45] font-serif italic font-normal">Not Assumptions.</span>
          </h2>
          <p className="text-gray-500 text-base">
            Organizations across industries trust Prudentia to build high-performing, capable workforces.
          </p>
        </motion.div>
      </div>

      {/* Four scrolling columns — full width, masked at top & bottom */}
      <div className="flex gap-6 px-6 lg:px-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn testimonials={firstCol} duration={28} />
        <TestimonialsColumn testimonials={secondCol} duration={36} className="hidden md:flex" />
        <TestimonialsColumn testimonials={thirdCol}  duration={32} className="hidden lg:flex" />
        <TestimonialsColumn testimonials={fourthCol} duration={42} className="hidden xl:flex" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRUST + DIFFERENTIATION (merged)
// ─────────────────────────────────────────────────────────────────────────────

const DIFFERENTIATORS = [
  "Real-world simulations instead of pure theory.",
  "Structured learning paths, not fragmented sessions.",
  "Hybrid delivery models designed for hyper-retention.",
  "Certifications aligned strictly with industry demands.",
  "Unwavering focus on measurable business impact.",
];

function TrustAndDifferentiation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-12%' });

  return (
    <section
      ref={sectionRef}
      className="relative lg:h-screen lg:min-h-[860px] w-full overflow-hidden flex items-center px-6 sm:px-8 md:px-16 lg:px-24 py-12 sm:py-16 border-t border-white/5"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-slide-2.jpg')" }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(7,17,29,0.96) 0%, rgba(0,21,48,0.88) 55%, rgba(0,85,143,0.60) 100%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(7,17,29,0.88) 0%, transparent 50%, rgba(7,17,29,0.32) 100%)' }} />
      <div className="absolute -top-40 -right-40 w-[42vw] h-[42vw] bg-[#008A45]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[36vw] h-[36vw] bg-[#00558F]/22 rounded-full blur-[120px] pointer-events-none" />
      {/* Left green accent bar — matches Hero / Problem */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-[#008A45] z-30" />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto flex flex-col gap-8 lg:gap-10">

        {/* Eyebrow + heading */}
        <div className="flex flex-col items-start max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ee89a]" />
            <span className="text-[15px] font-bold uppercase tracking-[0.18em] text-white/90">The Prudentia Difference</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans font-bold tracking-tighter leading-[1.05] text-white">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Why Most Training Fails
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="italic font-serif text-[#6ee89a] font-normal block mt-1"
            >
              — And Why Prudentia Delivers.
            </motion.span>
          </h2>
        </div>

        {/* Two-column body */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-14">
          {/* Left — framing + outcome callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-white/85 text-[17px] md:text-[18px] leading-relaxed max-w-xl">
              We bring extensive experience in training, consultancy, and virtual learning across industries globally. While most providers focus on{' '}
              <span className="text-white font-semibold">content delivery</span> — dumping information and hoping it sticks — we deliver something different.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.95 }}
              className="inline-flex"
            >
              <p className="font-serif italic text-2xl md:text-3xl leading-tight text-white bg-gradient-to-br from-[#008A45]/95 to-[#00558F]/95 px-6 py-4 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,138,69,0.55)] border border-[#6ee89a]/30">
                Prudentia focuses on{' '}
                <span className="not-italic font-sans font-semibold">performance outcomes.</span>
              </p>
            </motion.div>

            <p className="text-white/65 text-[15px] md:text-[16px] leading-relaxed max-w-md">
              We architect learning experiences that change behavior and drive measurable business impact.
            </p>
          </motion.div>

          {/* Right — differentiator checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6 md:p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#008A45]/15 rounded-full blur-[60px] pointer-events-none" />
            <p className="relative z-10 text-[15px] font-bold uppercase tracking-[0.18em] text-[#6ee89a] mb-5 md:mb-6">
              What makes the difference
            </p>
            <ul className="relative z-10 space-y-4 md:space-y-5">
              {DIFFERENTIATORS.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 md:gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#6ee89a] shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span className="text-[17px] md:text-[18px] text-white/90 font-medium leading-snug">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom stats / partners strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 border-t border-white/15 pt-6 md:pt-7"
        >
          <div className="flex items-baseline gap-3 md:gap-4">
            <CountUp to={500} suffix="+" className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white" />
            <span className="text-[15px] uppercase tracking-[0.15em] font-semibold text-white/70 leading-tight">
              Global<br />Organizations
            </span>
          </div>
          <div className="flex items-baseline gap-3 md:gap-4">
            <CountUp to={100} suffix="%" className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-[#6ee89a]" />
            <span className="text-[15px] uppercase tracking-[0.15em] font-semibold text-white/70 leading-tight">
              ROI<br />Focused
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl border border-[#6ee89a]/40 bg-white/5 backdrop-blur-md flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#6ee89a]" />
            </div>
            <div>
              <div className="text-[17px] font-semibold text-white leading-tight">Microsoft Learning Partner</div>
              <div className="text-[15px] text-white/65 leading-tight mt-0.5">SAP Education Partner</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// GLSL HILLS  — Three.js perlin-noise wave mesh, Prudentia light-theme colours
// ─────────────────────────────────────────────────────────────────────────────

function GLSLHills({ speed = 0.4, cameraZ = 125, planeSize = 256 }: {
  speed?: number; cameraZ?: number; planeSize?: number;
}) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, 1, 1, 10000);
    const clock    = new THREE.Clock();

    const uniforms: { time: THREE.IUniform<number> } = { time: { value: 0 } };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize),
      new THREE.RawShaderMaterial({
        uniforms,
        vertexShader: `
          #define GLSLIFY 1
          attribute vec3 position;
          uniform mat4 projectionMatrix;
          uniform mat4 modelViewMatrix;
          uniform float time;
          varying vec3 vPosition;

          mat4 rotateMatrixX(float radian) {
            return mat4(
              1.0,0.0,0.0,0.0,
              0.0,cos(radian),-sin(radian),0.0,
              0.0,sin(radian), cos(radian),0.0,
              0.0,0.0,0.0,1.0
            );
          }

          vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
          vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
          vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

          float cnoise(vec3 P){
            vec3 Pi0=floor(P); vec3 Pi1=Pi0+vec3(1.0);
            Pi0=mod289(Pi0); Pi1=mod289(Pi1);
            vec3 Pf0=fract(P); vec3 Pf1=Pf0-vec3(1.0);
            vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
            vec4 iy=vec4(Pi0.yy,Pi1.yy);
            vec4 iz0=Pi0.zzzz; vec4 iz1=Pi1.zzzz;
            vec4 ixy=permute(permute(ix)+iy);
            vec4 ixy0=permute(ixy+iz0); vec4 ixy1=permute(ixy+iz1);
            vec4 gx0=ixy0*(1.0/7.0); vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;
            gx0=fract(gx0); vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
            vec4 sz0=step(gz0,vec4(0.0));
            gx0-=sz0*(step(0.0,gx0)-0.5); gy0-=sz0*(step(0.0,gy0)-0.5);
            vec4 gx1=ixy1*(1.0/7.0); vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;
            gx1=fract(gx1); vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
            vec4 sz1=step(gz1,vec4(0.0));
            gx1-=sz1*(step(0.0,gx1)-0.5); gy1-=sz1*(step(0.0,gy1)-0.5);
            vec3 g000=vec3(gx0.x,gy0.x,gz0.x); vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010=vec3(gx0.z,gy0.z,gz0.z); vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001=vec3(gx1.x,gy1.x,gz1.x); vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011=vec3(gx1.z,gy1.z,gz1.z); vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
            vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
            g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
            vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
            g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
            float n000=dot(g000,Pf0); float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
            float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)); float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
            float n001=dot(g001,vec3(Pf0.xy,Pf1.z)); float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
            float n011=dot(g011,vec3(Pf0.x,Pf1.yz)); float n111=dot(g111,Pf1);
            vec3 fade_xyz=fade(Pf0);
            vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
            vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
            float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);
            return 2.2*n_xyz;
          }

          void main(void){
            vec3 p=(rotateMatrixX(radians(90.0))*vec4(position,1.0)).xyz;
            float s1=sin(radians(p.x/128.0*90.0));
            vec3 np=p+vec3(0.0,0.0,time*-30.0);
            float n1=cnoise(np*0.08); float n2=cnoise(np*0.06); float n3=cnoise(np*0.4);
            vec3 lp=p+vec3(0.0,
              n1*s1*8.0+n2*s1*8.0+n3*(abs(s1)*2.0+0.5)+pow(s1,2.0)*40.0,0.0);
            vPosition=lp;
            gl_Position=projectionMatrix*modelViewMatrix*vec4(lp,1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec3 vPosition;
          void main(void){
            float opacity=(96.0-length(vPosition))/256.0*0.55;
            vec3 color=vec3(0.55);
            gl_FragColor=vec4(color,opacity);
          }
        `,
        transparent: true,
      })
    );

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    let animId: number;
    const loop = () => {
      uniforms.time.value += clock.getDelta() * speed;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(loop);
    };

    renderer.setClearColor(0x000000, 0);
    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));
    scene.add(mesh);
    resize();
    loop();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, [speed, cameraZ, planeSize]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="h-screen flex items-center justify-center px-6 bg-white text-gray-900 text-center relative overflow-hidden border-t border-gray-100">
      <GLSLHills />
      <div className="max-w-3xl mx-auto relative z-10">
        <SectionReveal>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-sans tracking-tight leading-tight mb-8 font-bold">
            <AnimatedWords text="Your Workforce Performance" delay={0} />
            <br className="hidden md:block" />
            <span className="italic font-serif text-[#008A45] font-normal">
              <AnimatedWords text="Depends on What You Do Next." delay={0.5} />
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Skill gaps don't fix themselves. The longer the delay, the higher the cost. Start building a workforce that delivers measurable results.
          </p>

          {/* Trust signals — lifted from RiskReversal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-3">
            {["No forced programs", "No unnecessary upsells", "No one-size-fits-all approach"].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-2 text-[15px] font-medium text-gray-700">
                <div className="w-5 h-5 rounded-full bg-[#f0fdf4] border border-[#008A45]/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008A45]" />
                </div>
                {item}
              </motion.div>
            ))}
          </div>
          <p className="text-[15px] text-gray-400 font-medium tracking-wide mb-8">You decide after complete clarity.</p>

          <MagneticButton className="btn-primary px-10 py-3.5 text-base shadow-xl gap-3 h-[52px] group mx-auto">
            Book Your Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <p className="mt-6 text-[15px] text-gray-500 font-medium">Takes less than 2 minutes to get started.</p>
        </SectionReveal>
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// FOOTER — fixed, clip-revealed by scroll, 100vh, includes CTA + marquee
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  const { scrollY } = useScroll();
  const [range, setRange] = useState<[number, number]>([8000, 9000]);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const calc = () => {
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const end = docH - winH;
      setRange([Math.max(0, end - winH * 0.88), end]);
    };
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    calc();
    checkDesktop();
    const id = setTimeout(calc, 600);
    const ro = new ResizeObserver(() => { calc(); checkDesktop(); });
    ro.observe(document.documentElement);
    window.addEventListener('resize', checkDesktop);
    return () => {
      clearTimeout(id);
      ro.disconnect();
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  const [start, end] = range;
  const scale = useTransform(scrollY, [start, end], [0.92, 1]);
  const opacity = useTransform(scrollY, [start, end], [0, 1]);
  const blurPx = useTransform(scrollY, [start, start + (end - start) * 0.5], [16, 0]);
  const blurStyle = useTransform(blurPx, v => `blur(${Math.max(0, v)}px)`);

  const MARQUEE_ROW1 = [
    { text: "Global Workforce", green: false },
    { text: "Performance Engineering", green: true },
    { text: "Measurable ROI", green: false },
    { text: "Corporate Training", green: false },
    { text: "eLearning Development", green: true },
    { text: "Skill Gap Analysis", green: false },
  ];
  const MARQUEE_ROW2 = [
    { text: "Leadership Alignment", green: false },
    { text: "Compliance Strategy", green: true },
    { text: "Workforce Transformation", green: false },
    { text: "Learning Impact", green: false },
    { text: "Business KPIs", green: true },
    { text: "Translation & Localization", green: false },
  ];

  return (
    <footer
      className="relative lg:fixed lg:bottom-0 lg:left-0 lg:right-0 w-full lg:h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #061826 0%, #0A2A3A 50%, #0F3F3A 100%)', zIndex: 0 }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/footer-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
          mixBlendMode: 'overlay',
        }}
      />
      <motion.div style={isDesktop ? { scale, opacity, filter: blurStyle } : undefined} className="lg:h-full flex flex-col origin-bottom relative z-10">

        {/* ── TOP: Newsletter — white/light gradient zone ── */}
        <div
          className="lg:flex-[5] flex items-center border-b border-gray-200/60 px-6 sm:px-8 md:px-16 lg:px-24 py-12 lg:py-0"
          style={{ background: 'linear-gradient(135deg, #f4fbf7 0%, #f0f7fb 60%, #ffffff 100%)' }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-28 items-center">

            {/* Left — headline */}
            <div>
              <p className="text-[15px] font-bold tracking-[0.18em] uppercase text-[#008A45] mb-5">
                Stay Ahead. Stay Informed.
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold text-gray-900 leading-[1.08]">
                Insights that<br />drive{' '}
                <span className="font-serif italic text-[#008A45] font-normal">performance.</span>
              </h2>
            </div>

            {/* Right — subscribe form */}
            <div className="flex flex-col gap-6">
              <p className="text-gray-500 text-[17px] leading-relaxed max-w-sm">
                Subscribe to our newsletter and get the latest insights, trends, and updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full sm:flex-1 rounded-full px-6 py-4 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none bg-white border border-gray-200 shadow-sm transition-all focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45]/40"
                />
                <MagneticButton
                  className="relative inline-flex items-center justify-center overflow-hidden text-white font-medium rounded-[2px] transition-all duration-300 px-7 py-4 text-[15px] gap-2 group shrink-0 hover:opacity-90 hover:scale-[1.02] w-full sm:w-auto"
                  style={{ background: 'linear-gradient(90deg, #008A45 0%, #00558F 100%)' }}
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
              <p className="text-[15px] text-gray-400">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

          </div>
        </div>

        {/* ── MARQUEE DIVIDER ── */}
        <div
          className="relative overflow-hidden border-y border-white/10 py-4 sm:py-5 shrink-0 flex flex-col gap-2 sm:gap-3"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="marquee-track flex items-center w-max">
            {[...MARQUEE_ROW1, ...MARQUEE_ROW1, ...MARQUEE_ROW1].map((item, i) => (
              <span key={i} className="inline-flex items-center shrink-0">
                <span className={`text-lg sm:text-2xl lg:text-3xl font-black tracking-[0.12em] uppercase px-5 sm:px-8 whitespace-nowrap ${item.green ? 'text-[#1DBF73]' : 'text-white/70'}`}>
                  {item.text}
                </span>
                <span className="text-white/20 text-base sm:text-xl">•</span>
              </span>
            ))}
          </div>
          <div className="marquee-track-reverse flex items-center w-max">
            {[...MARQUEE_ROW2, ...MARQUEE_ROW2, ...MARQUEE_ROW2].map((item, i) => (
              <span key={i} className="inline-flex items-center shrink-0">
                <span className={`text-lg sm:text-2xl lg:text-3xl font-black tracking-[0.12em] uppercase px-5 sm:px-8 whitespace-nowrap ${item.green ? 'text-[#1DBF73]' : 'text-white/70'}`}>
                  {item.text}
                </span>
                <span className="text-white/20 text-base sm:text-xl">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── BOTTOM: Links grid ── */}
        <div className="lg:flex-[4] flex flex-col justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10">

            {/* Brand col */}
            <div className="flex flex-col gap-5">
              <Logo light />
              <p className="text-white/45 text-[15px] leading-relaxed max-w-[260px]">
                Transforming global workforces through performance engineering.
              </p>
              <div className="flex items-center gap-3">
                {[Linkedin, Twitter].map((Icon, i) => (
                  <motion.a key={i} href="#" whileHover={{ scale: 1.12, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-[#1DBF73] transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Icon className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Expertise col */}
            <div>
              <h4 className="text-[15px] font-bold tracking-widest uppercase text-white/30 mb-5">Expertise</h4>
              <ul className="space-y-3">
                {["Corporate Training", "eLearning Development", "Translation & Localization", "Compliance Strategy", "Leadership Alignment"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                    <a href="#" className="text-white/55 hover:text-[#1DBF73] text-[15px] transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Company col */}
            <div>
              <h4 className="text-[15px] font-bold tracking-widest uppercase text-white/30 mb-5">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Case Studies", "Insights & Research", "Contact"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                    <a href="#" className="text-white/55 hover:text-[#1DBF73] text-[15px] transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA box col — glass card */}
            <div
              className="rounded-2xl p-7 flex flex-col justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(16,58,74,0.6), rgba(10,120,80,0.35))',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,255,170,0.15)',
                boxShadow: '0 10px 40px rgba(0,255,170,0.08)',
              }}
            >
              <div>
                <p className="text-[15px] font-bold tracking-widest uppercase text-[#1DBF73] mb-3">Start Assessing</p>
                <p className="text-white/60 text-[15px] leading-relaxed">Uncover the gap between your training spend and actual business impact.</p>
              </div>
              <MagneticButton
                className="relative inline-flex items-center justify-center overflow-hidden font-semibold rounded-[2px] transition-all duration-300 mt-6 text-[15px] py-3 px-5 w-full hover:bg-gray-100 hover:scale-[1.02] text-gray-900 bg-white shadow-md"
              >
                Book Audit
              </MagneticButton>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between text-[15px] text-white/30 gap-2">
            <p>© 2026 Prudentia Technology Solutions India Pvt Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL TO TOP
// ─────────────────────────────────────────────────────────────────────────────

function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', v => setVisible(v > 500));
  }, [scrollY]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-[200] w-12 h-12 rounded-full bg-[#008A45] text-white shadow-xl shadow-[#008A45]/25 flex items-center justify-center hover:bg-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXIT INTENT
// ─────────────────────────────────────────────────────────────────────────────

function ExitIntent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) { triggered = true; setShow(true); }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.88, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-xl w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <button onClick={() => setShow(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-3xl font-sans tracking-tight text-gray-900 mb-2">Have a Question?</h3>
            <h4 className="text-xl text-gray-500 mb-6 font-serif italic">— Let's discuss your training needs.</h4>
            <form className="space-y-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45] transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45] transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">Work Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45] transition-colors" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">Company</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45] transition-colors" placeholder="Acme Corp" />
                </div>
              </div>
              <div>
                <label className="block text-[15px] font-medium text-gray-700 mb-1">How can we help?</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#008A45]/20 focus:border-[#008A45] transition-colors h-24 resize-none" placeholder="Tell us about your organization's learning goals..." />
              </div>
              <MagneticButton type="button" className="btn-primary w-full py-3.5 mt-2" onClick={() => setShow(false)}>
                Send Enquiry
              </MagneticButton>
            </form>
            <p className="text-center text-[15px] text-gray-500 font-medium">We typically reply within 24 hours.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
      <CustomCursor />
      <ScrollToTop />
      {/* Scrollable content sits above the fixed footer on desktop (z-index 1) */}
      <div
        className="bg-white min-h-screen selection:bg-[var(--color-prudentia-green)]/10 selection:text-[var(--color-prudentia-green-dark)] font-sans antialiased text-gray-900 lg:cursor-none"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="relative">
          <Navigation />
          <Hero />
        </div>
        <main>
          <Outcomes />
          <HowItWorks />
          <OfferBreakdown />
          <PartnershipsSection />
          <Testimonials />
          <TrustAndDifferentiation />
          <FinalCTA />
        </main>
      </div>
      <div className="hidden lg:block h-screen relative z-[1] pointer-events-none" />
      <Footer />
      <ExitIntent />
    </ReactLenis>
  );
}
