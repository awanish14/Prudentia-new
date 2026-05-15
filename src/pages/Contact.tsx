import { motion, useInView } from 'motion/react';

import {
  ArrowRight, Mail, Phone, MapPin, Clock,
  Check, AlertCircle, Loader,
} from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { Navbar, Footer } from './Home1';

// ── Helpers ───────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const inputClass =
  'w-full px-4 py-3 text-[15px] bg-[#F8F7F3] border border-gray-200 rounded-xl focus:outline-none focus:border-[#068140] focus:ring-2 focus:ring-[#068140]/15 placeholder:text-gray-300 text-gray-800 transition';

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2';

// ── Contact Form ──────────────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error';

function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('https://formspree.io/f/xyzdlwde', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState('success');
        setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data?.errors?.map((err: { message: string }) => err.message).join(' ') || 'Something went wrong. Please try again.';
        setErrorMsg(msg);
        setState('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#068140]/10 border border-[#068140]/25 flex items-center justify-center mb-5">
          <Check size={28} className="text-[#068140]" />
        </div>
        <h3 className="font-serif text-[26px] text-[#002747] mb-3">Message Sent!</h3>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[320px]">
          Thank you for reaching out. Our team will get back to you within 24 business hours.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-6 text-[13px] font-semibold text-[#068140] hover:text-[#002747] transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Company / Organisation</label>
          <input value={form.company} onChange={set('company')} placeholder="Where do you work?" className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Work Email *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 XXXXX XXXXX" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>I'm interested in</label>
        <select value={form.service} onChange={set('service')} className={inputClass}>
          <option value="">Select a service…</option>
          <option>Corporate Training</option>
          <option>eLearning Development</option>
          <option>Translation & Localisation</option>
          <option>Workshops & Bootcamps</option>
          <option>Cybersecurity — EC-Council</option>
          <option>SAP Academy Training</option>
          <option>Skillsoft Percipio LXP</option>
          <option>Multiple Services</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>How can we help?</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us about your team's learning goals, current challenges, or the programme you have in mind…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full flex items-center justify-center gap-2.5 bg-[#002747] hover:bg-[#00558F] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[15px] py-4 rounded-xl transition-colors group"
      >
        {state === 'loading'
          ? <><Loader size={17} className="animate-spin" /> Sending…</>
          : <><span>Send Message</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
        }
      </button>

      <p className="text-center text-[12px] text-gray-400">
        No commitment · We respond within 24 business hours
      </p>
    </form>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-[#002747] pt-[120px] pb-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#068140]/8 rounded-full blur-[160px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#068140] via-[#00558F] to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-7"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6ee89a]">Get in Touch</span>
        </motion.div>

        <div className="max-w-[640px]">
          <h1 className="font-serif text-[48px] sm:text-[62px] leading-[1.05] tracking-tight text-white">
            {["Let's start a", "conversation."].map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.18]">
                <motion.div
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.72, delay: 0.12 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1
                    ? <em className="italic" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #6ee89a, #00a8e8)' }}>conversation.</em>
                    : line}
                </motion.div>
              </div>
            ))}
          </h1>

          <motion.p
            className="mt-5 text-[16px] text-white/50 leading-relaxed max-w-[480px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Whether you're scoping a single programme or rethinking your entire L&D strategy —
            fill out the form and we'll come back with a tailored proposal, not a generic brochure.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function MainSection() {
  return (
    <section className="bg-[#F8F7F3] py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* Left: Form */}
          <FadeUp>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
              <h2 className="font-serif text-[26px] text-[#002747] mb-1">Send us a message</h2>
              <p className="text-[14px] text-gray-400 mb-8">We read every submission and respond personally.</p>
              <ContactForm />
            </div>
          </FadeUp>

          {/* Right: Info + Details */}
          <div className="space-y-5">

            {/* Contact details card */}
            <FadeUp delay={0.1}>
              <div className="bg-[#002747] rounded-2xl p-7 space-y-6">
                <h3 className="font-serif text-[20px] text-white">Contact Details</h3>

                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'info@prudentia.net.in',
                    href: 'mailto:info@prudentia.net.in',
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+91 97300 21477',
                    href: 'tel:+919730021477',
                  },
                  {
                    icon: MapPin,
                    label: 'Office',
                    value: '101, 1st Floor, Piyusha Society,\nLaw College Road, Erandwane,\nPune 411004, Maharashtra',
                    href: 'https://maps.google.com/?q=Piyusha+Society+Law+College+Road+Erandwane+Pune',
                  },
                  {
                    icon: Clock,
                    label: 'Business Hours',
                    value: 'Mon – Fri: 9:00 AM – 6:00 PM IST\nSaturday: 9:00 AM – 1:00 PM IST',
                    href: undefined,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#6ee89a]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 mb-1">{label}</p>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[14px] text-white/80 hover:text-white transition-colors whitespace-pre-line leading-relaxed">{value}</a>
                        : <p className="text-[14px] text-white/80 whitespace-pre-line leading-relaxed">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Response promise */}
            <FadeUp delay={0.15}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="text-[14px] font-semibold text-[#002747] mb-4">What happens next?</h4>
                <div className="space-y-3.5">
                  {[
                    { step: '01', text: 'We review your message within 1 business day' },
                    { step: '02', text: 'A consultant reaches out to understand your needs' },
                    { step: '03', text: 'We share a tailored proposal — no generic decks' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3.5">
                      <span className="font-serif text-[13px] font-bold text-[#068140]/60 shrink-0 mt-0.5 w-5">{step}</span>
                      <p className="text-[13px] text-gray-500 leading-snug">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Map embed */}
            <FadeUp delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[200px]">
                <iframe
                  title="Prudentia Office — Pune"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.521!2d73.8396!3d18.5102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf9b4b3e1d1f%3A0x8c2c1d1d1d1d1d1d!2sLaw%20College%20Rd%2C%20Erandwane%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <>
      <div className="relative z-[1] bg-[#F8F7F3]">
        <Navbar isSubpage />
        <HeroSection />
        <MainSection />
      </div>
      <div className="hidden lg:block h-[480px] relative z-[1]" />
      <Footer />
    </>
  );
}
