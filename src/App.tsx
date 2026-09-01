import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleDock, { DockItem } from './components/AppleDock';
import GooglyEyes from './components/GooglyEyes';
import StickerTag from './components/StickerTag';

// --- DATA STRUCTURES ---

interface Project {
  id: string;
  title: string;
  category: string;
  tool: string;
  year: string;
  image: string;
  link?: string;
  rotate: string;
  description: string;
}

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  color: string;
  iconBg: string;
  iconSvg: React.ReactNode;
  previewImage: string;
  previewTitle: string;
  previewSubtitle: string;
  description: string;
  tags: string[];
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  color: string;
  accentColor: string;
  rotate: string;
}

// 1. Projects
const PROJECTS: Project[] = [
  {
    id: 'synapse',
    title: 'SYNAPSE™ Autonomous AI Platform',
    category: 'Framer SaaS / Monochrome Luxury Design',
    tool: 'Framer / Rollup Runtime / Minimalist B&W',
    year: '2026',
    image: '/assets/synapse_thumb.jpg',
    link: '/synapse.html',
    rotate: 'rotate-[-1deg]',
    description: 'Black & white SaaS platform built directly from Framer template and component architecture featuring real-time interactive telemetry dashboards, animated metric rings, and zero badge clutter.'
  },
  {
    id: 'auracheats',
    title: 'AURA™ Streamproof Gaming Vault',
    category: 'Framer Component Architecture / E-Commerce',
    tool: 'Framer / Tailwind / GSAP / MercuryOS',
    year: '2026',
    image: '/assets/auracheats_thumb.jpg',
    link: '/auracheats.html',
    rotate: 'rotate-[1deg]',
    description: 'Ultra-modern gaming marketplace built with Framer Component Library architecture: Liquid Glass Pill Navigation, MercuryOS Dock, Line Menu TOC, Velocity Game Marquee, and Streamproof Split Slider.'
  },
  {
    id: 'essentia',
    title: 'Essentia™ Luxury Skincare',
    category: 'Framer 3D Product & Kinetic Scroll',
    tool: 'Framer / GSAP / Kinetic Physics',
    year: '2026',
    image: '/assets/essentia_thumb.jpg',
    link: '/essentia.html',
    rotate: 'rotate-[-1deg]',
    description: 'Award-winning Framer interactive skincare showcase featuring scroll-pinned 3D product cradling, dynamic camera zooms, ingredient accordions, and tactile micro-interactions.'
  },
  {
    id: 'studypro',
    title: 'Study Pro 3D Educational Store',
    category: 'E-Commerce / 3D Books & Flashcards',
    tool: '3D CSS / Tailwind / WhatsApp API',
    year: '2026',
    image: '/assets/project_studypro.png',
    link: '/studypro.html',
    rotate: 'rotate-[1.5deg]',
    description: 'High-converting educational bookstore for 179K+ Moroccan students with 3D interactive book physics, flip flashcards, and 1-click WhatsApp cash-on-delivery checkout.'
  },
  {
    id: 'salix',
    title: 'Salix AI Sales & ROI Platform',
    category: 'Framer SaaS Landing & Interactive UI',
    tool: 'Framer Motion / React',
    year: '2026',
    image: '/assets/project_salix.png',
    link: '/salix.html',
    rotate: 'rotate-[-1.5deg]',
    description: 'Ultra-modern SaaS marketing page with interactive dashboards, spring physics, dynamic CRM automation flows, and clean pricing architecture.'
  },
  {
    id: 'nanocheats',
    title: 'NanoCheats Gaming Storefront',
    category: 'Cyberpunk 3D Store & Realtime UI',
    tool: 'HTML5 Canvas / Tailwind / 3D CSS',
    year: '2026',
    image: '/assets/project_riftcheats.png',
    link: '/nanocheats.html',
    rotate: 'rotate-[1.5deg]',
    description: 'Electric OLED storefront with 3D cylindrical product carousel, streamproof split-slider comparison, live country purchase toasts, and interactive particle canvas.'
  },
  {
    id: 'riftcheats',
    title: 'RiftCheats Storefront',
    category: 'SellAuth Theme & 3D UI Client',
    tool: 'Tailwind / React',
    year: '2026',
    image: '/assets/project_riftcheats.png',
    link: '/demos/riftcheats.html',
    rotate: 'rotate-[-2deg]',
    description: 'Neon cyberpunk storefront experience featuring interactive 3D tilted cheat client controls, instant checkout, and pink ambient glows.'
  },
  {
    id: 'bearcheats',
    title: 'BearCheats Gaming Store',
    category: 'SellAuth Theme & Custom Invision',
    tool: 'Alpine.js / Tailwind',
    year: '2026',
    image: '/assets/project_bearcheats.png',
    link: 'https://bearcheats.net',
    rotate: 'rotate-[1.5deg]',
    description: 'High-conversion storefront with auto DeepSeek feature card parser, native orange palette, and instant faststart WebM hero video player.'
  },
  {
    id: 'waxyweb',
    title: 'WaxyWeb Platform',
    category: 'Branding & Website',
    tool: 'Figma / Next.js',
    year: '2026',
    image: '/assets/asset_3.png',
    rotate: 'rotate-[-1.5deg]',
    description: 'High-conversion SaaS marketing landing page with custom interactive 3D components and micro-interactions.'
  },
  {
    id: 'sunoma',
    title: 'Sunoma Beverage',
    category: 'Branding & Packaging',
    tool: 'Figma / 3D',
    year: '2026',
    image: '/assets/asset_13.png',
    rotate: 'rotate-[2deg]',
    description: 'Retro-modern packaging and interactive e-commerce product landing experience.'
  }
];

// 2. Services with Invision Live Previews
const SERVICES: ServiceItem[] = [
  {
    id: 'invision-storefronts',
    title: 'Invision & SellAuth Storefronts',
    category: 'E-COMMERCE / GAMING',
    color: 'bg-[#ffe8e8] hover:bg-[#ffd9d9] border-[#ffccd5]',
    iconBg: 'bg-[#f43f5e]',
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    previewImage: '/assets/project_riftcheats.png',
    previewTitle: 'RiftCheats Invision Theme',
    previewSubtitle: 'Live SellAuth Integration • Instant Checkout',
    description: 'High-converting custom Invision theme architecture with automated product card parsers, live status badges, and WebM video headers.',
    tags: ['SellAuth API', 'Invision V2', 'Tailwind', 'Alpine.js']
  },
  {
    id: 'website-design',
    title: 'Website & Landing Pages',
    category: 'WEB DESIGN & FIGMA',
    color: 'bg-[#ffeedd] hover:bg-[#ffe2cc] border-[#fed7aa]',
    iconBg: 'bg-[#f97316]',
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    previewImage: '/assets/project_bearcheats.png',
    previewTitle: 'BearCheats Gaming Portal',
    previewSubtitle: 'Figma to Code • 60 FPS Smooth Scroll',
    description: 'Bespoke marketing pages engineered to stop users in their tracks with clean layout rhythm, strong typographic hierarchy, and spring physics.',
    tags: ['Figma Native', 'Responsive 4K', 'SEO Ready', 'Speed Optimized']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Architecture & Systems',
    category: 'PRODUCT DESIGN',
    color: 'bg-[#e0f2fe] hover:bg-[#bae6fd] border-[#7dd3fc]',
    iconBg: 'bg-[#0284c7]',
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    previewImage: '/assets/asset_3.png',
    previewTitle: 'WaxyWeb Application UI',
    previewSubtitle: 'Design System & Component Tokens',
    description: 'Scalable design systems, interactive component libraries, user journeys, and dashboard interfaces that delight users on every interaction.',
    tags: ['Design Systems', 'Micro-Interactions', 'Prototyping', 'User Testing']
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Visuals',
    category: 'BRANDING & 3D',
    color: 'bg-[#fef9c3] hover:bg-[#fef08a] border-[#fde047]',
    iconBg: 'bg-[#eab308]',
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    previewImage: '/assets/asset_13.png',
    previewTitle: 'Sunoma Brand Showcase',
    previewSubtitle: 'Logomarks • Color Palettes • 3D Assets',
    description: 'Memorable brand guidelines, custom icon sets, 3D asset generation, and digital collateral that give your company an unforgettable identity.',
    tags: ['Logos & Marks', '3D Modeling', 'Color Systems', 'Asset Packs']
  },
  {
    id: 'custom-code',
    title: 'Custom Code & Animations',
    category: 'FRONTEND DEVELOPMENT',
    color: 'bg-[#f3e8ff] hover:bg-[#e9d5ff] border-[#d8b4fe]',
    iconBg: 'bg-[#9333ea]',
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    previewImage: '/assets/asset_4.png',
    previewTitle: 'Krem Digital Experience',
    previewSubtitle: 'Framer Motion • WebGL • Tailwind',
    description: 'Pixel-perfect web development with buttery smooth Framer Motion spring physics, Tailwind CSS v4, and seamless API integrations.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite']
  }
];

// 3. Custom Sticky Note FAQs
const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What can Webloom design?',
    answer: 'We design complete custom digital ecosystems: Invision/SellAuth gaming storefronts, SaaS web apps, high-converting landing pages, interactive product experiences, and comprehensive brand identity systems.',
    color: 'bg-[#ffe4e6]',
    accentColor: '#f43f5e',
    rotate: 'rotate-[-2deg]'
  },
  {
    id: 'faq-2',
    question: 'Do you build custom Invision & SellAuth themes?',
    answer: 'Yes! We specialize in high-converting Invision customizers and SellAuth storefronts featuring automated DeepSeek product parsers, live status alerts, instant WebM video heroes, and custom neon client previews.',
    color: 'bg-[#ecfccb]',
    accentColor: '#84cc16',
    rotate: 'rotate-[2deg]'
  },
  {
    id: 'faq-3',
    question: 'How fast can we start?',
    answer: 'Usually within 24 to 48 hours. Once we align on project scope and creative direction on Discord, we immediately kick off wireframes and initial design concepts.',
    color: 'bg-[#e0f2fe]',
    accentColor: '#0284c7',
    rotate: 'rotate-[-1.5deg]'
  },
  {
    id: 'faq-4',
    question: 'What do you need from me?',
    answer: 'Just your vision, brand name, any existing assets or references, and your target audience. We handle everything from typography, layouts, and copy polish to live interactive code.',
    color: 'bg-[#fef9c3]',
    accentColor: '#eab308',
    rotate: 'rotate-[1.5deg]'
  },
  {
    id: 'faq-5',
    question: 'Do you only design visuals or write code too?',
    answer: 'We do both! We provide production-ready React, Tailwind, and Alpine.js code with buttery-smooth spring animations, as well as ready-to-deploy SellAuth and Invision templates.',
    color: 'bg-[#dcfce7]',
    accentColor: '#22c55e',
    rotate: 'rotate-[-1deg]'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [activeFaq, setActiveFaq] = useState<FAQItem | null>(null);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText('webloom');
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-900 selection:bg-rose-500 selection:text-white relative">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="home" 
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/asset_1.png')" }}
      >
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* TOP NAVIGATION BAR */}
        <header className="relative z-30 w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Status Capsule */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg text-white">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-black/30">
              <img src="/assets/asset_0.svg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
              <div className="text-xs font-bold tracking-tight text-white uppercase">
                WEBLOOM • STUDIO
              </div>
            </div>
          </div>

          {/* CENTER LOGO: iOS-Style Glossy Cloud + WEBLOOM */}
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            {/* iOS Cloud Icon */}
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-white/60 pointer-events-none opacity-40" />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase drop-shadow-md">
              WEBLOOM
            </span>
          </div>

          {/* Book Project Button */}
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-xs tracking-wider uppercase shadow-xl hover:bg-rose-50 hover:scale-105 transition-all duration-200"
          >
            <span className="text-amber-500">✨</span>
            BOOK PROJECT
          </button>
        </header>

        {/* HERO CENTER HEADLINE & STICKERS */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center my-auto">
          
          {/* Eyeballs on Top-Right */}
          <div className="absolute top-0 right-8 md:right-24 hidden md:block w-24 h-12">
            <GooglyEyes eyeRadius={18} pupilRadius={7} gap={38} />
          </div>

          {/* Main Headline with Exact Mona Sans 900 Typography */}
          <div className="relative inline-block select-none">
            
            {/* Sticker 1: 3D Design (Purple) */}
            <div className="absolute -top-8 -left-4 md:-left-12 z-30 transform -rotate-6 hover:rotate-0 transition-transform duration-200">
              <StickerTag label="3D Design" variant="purple" rotate={-6} icon="box" />
            </div>

            {/* Sticker 2: Illustration (Pink) */}
            <div className="absolute top-12 -right-6 md:-right-16 z-30 transform rotate-6 hover:rotate-0 transition-transform duration-200">
              <StickerTag label="Illustration" variant="pink" rotate={6} icon="pen" />
            </div>

            {/* Sticker 3: UI/UX Design (Lime) */}
            <div className="absolute bottom-2 left-6 md:left-24 z-30 transform -rotate-3 hover:rotate-0 transition-transform duration-200">
              <StickerTag label="UI/UX Design" variant="lime" rotate={-3} icon="palette" />
            </div>

            <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-[110px] text-white leading-[0.88] tracking-[-0.045em] drop-shadow-2xl">
              DESIGN THAT<br />
              MAKES<br />
              PEOPLE<br />
              LOOK TWICE
            </h1>
          </div>
        </div>

        {/* HERO BOTTOM BAR (Quote & Stacked Deck) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-20 flex flex-col md:flex-row items-end justify-between gap-6">
          
          {/* Left Quote */}
          <div className="text-left text-white max-w-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-400" />
              Not just visuals.
            </div>
            <p className="text-lg md:text-xl font-extrabold tracking-tight text-white leading-snug">
              WE MAKE DIGITAL STOREFRONTS LOOK ALIVE & CONVERT.
            </p>
          </div>

          {/* Right: Featured Case Study Deck Card */}
          <div 
            onClick={() => scrollTo('work')}
            className="cursor-pointer group flex items-center gap-4 p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-200 text-white"
          >
            <img 
              src="/assets/project_riftcheats.png" 
              alt="RiftCheats" 
              className="w-16 h-12 rounded-xl object-cover border border-white/40 shadow-md group-hover:scale-105 transition-transform" 
            />
            <div className="text-left">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                <span>FIGMA / INVISION</span>
                <span>•</span>
                <span>2026</span>
              </div>
              <div className="text-sm font-extrabold text-white">RiftCheats Storefront</div>
              <div className="text-xs text-amber-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Case Studies ➔
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. ABOUT SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="about" className="relative w-full py-24 blueprint-bg border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="inline-block mb-6">
            <StickerTag label="About Webloom" variant="blue" rotate={-2} />
          </div>

          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-gray-900 mb-6 leading-tight">
            WE MAKE DESIGNS<br />PEOPLE REMEMBER
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 font-medium leading-relaxed mb-12">
            We design high-converting Invision storefronts, custom SellAuth platforms, and unforgettable brand systems that help digital products stand out, establish supreme trust, and drive massive sales.
          </p>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            
            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-200">
              <div className="w-3 h-3 rounded-full bg-rose-500 mb-4" />
              <div className="text-4xl font-black text-gray-900 mb-1">50+</div>
              <div className="text-sm font-bold text-gray-800 mb-2">Storefronts Built</div>
              <p className="text-xs text-gray-500 font-medium">Custom Invision and SellAuth gaming stores engineered for high sales.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-200">
              <div className="w-3 h-3 rounded-full bg-amber-500 mb-4" />
              <div className="text-4xl font-black text-gray-900 mb-1">$250k+</div>
              <div className="text-sm font-bold text-gray-800 mb-2">Client Revenue Generated</div>
              <p className="text-xs text-gray-500 font-medium">Optimized checkout flows with instant faststart media.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-200">
              <div className="w-3 h-3 rounded-full bg-sky-500 mb-4" />
              <div className="text-4xl font-black text-gray-900 mb-1">100%</div>
              <div className="text-sm font-bold text-gray-800 mb-2">Custom Code & Physics</div>
              <p className="text-xs text-gray-500 font-medium">Tailwind CSS, Alpine.js, React, and smooth 60 FPS animations.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform duration-200">
              <div className="w-3 h-3 rounded-full bg-lime-500 mb-4" />
              <div className="text-4xl font-black text-gray-900 mb-1">24/7</div>
              <div className="text-sm font-bold text-gray-800 mb-2">Discord Support</div>
              <p className="text-xs text-gray-500 font-medium">Instant collaboration and live previews directly in your server.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PROJECTS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="work" 
        className="relative w-full py-28 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/assets/asset_1.png')" }}
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <StickerTag label="Featured Work" variant="purple" rotate={-1} />
            </div>
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-white leading-tight drop-shadow-lg">
              PROJECTS THAT<br />TELL STORIES
            </h2>
          </div>

          {/* 4 macOS Window Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col ${project.rotate} transition-all duration-300`}
              >
                {/* macOS Window Controls */}
                <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500 tracking-wider">
                    {project.tool}
                  </div>
                </div>

                {/* Screenshot Container */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    {project.link ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-xs shadow-xl hover:bg-rose-50 flex items-center gap-1.5"
                      >
                        Visit Live Site ↗
                      </a>
                    ) : (
                      <button 
                        onClick={() => setModalOpen(true)}
                        className="px-5 py-2.5 rounded-full bg-white text-gray-900 font-bold text-xs shadow-xl hover:bg-rose-50"
                      >
                        Request Demo ➔
                      </button>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
                      <span>{project.category}</span>
                      <span className="text-gray-400">{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    {project.link ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        View Live Storefront ↗
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">Exclusive Client Customizer</span>
                    )}
                    <button 
                      onClick={() => setModalOpen(true)}
                      className="text-xs font-bold text-gray-900 hover:underline"
                    >
                      Inquire Similar ➔
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SERVICES SECTION WITH LIVE INVISION HOVER PREVIEWS */}
      {/* ------------------------------------------------------------- */}
      <section id="services" className="relative w-full py-24 blueprint-bg border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <StickerTag label="Capabilities" variant="lime" rotate={1} />
            </div>
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-gray-900 leading-tight">
              WHERE WE CAN<br />HELP YOU
            </h2>
            <p className="text-sm font-semibold text-gray-500 mt-2">
              Hover over each service to see interactive live Invision storefront demos!
            </p>
          </div>

          {/* List of Capability Cards */}
          <div className="space-y-4 relative">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
                className={`p-6 sm:p-8 rounded-3xl border ${service.color} transition-all duration-300 shadow-md cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-lg`}>
                    {service.iconSvg}
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 mb-0.5">
                      {service.category}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-xl mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/80 border border-black/5 text-[11px] font-bold text-gray-700 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* LIVE FLOATING INVISION DEMO HOVER MOCKUP */}
            <AnimatePresence>
              {hoveredService && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="fixed pointer-events-none z-50 bottom-24 right-8 md:right-16 w-80 sm:w-96 rounded-3xl bg-gray-900 text-white p-4 shadow-2xl border-2 border-white/20 backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-rose-400 mb-2">
                    <span>LIVE DEMO PREVIEW</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Invision Ready
                    </span>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 mb-3 bg-black">
                    <img 
                      src={hoveredService.previewImage} 
                      alt={hoveredService.previewTitle} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-sm font-extrabold text-white">{hoveredService.previewTitle}</div>
                  <div className="text-xs text-gray-400 font-medium">{hoveredService.previewSubtitle}</div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. REVIEWS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="reviews" className="relative w-full py-24 blueprint-bg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="inline-block mb-4">
            <StickerTag label="Testimonials" variant="pink" rotate={2} />
          </div>

          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-gray-900 mb-16 leading-tight">
            CLIENTS LIKED<br />THE PIXELS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform">
              <div>
                <div className="flex text-amber-400 mb-4 text-sm">★★★★★</div>
                <p className="text-sm text-gray-700 font-semibold leading-relaxed mb-6">
                  “Webloom transformed our SellAuth store. Conversions jumped immediately after deploying the new Invision customizer. Insanely clean work.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-sm">
                  AK
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Ayesha K.</div>
                  <div className="text-[11px] text-gray-500 font-medium">Creative Director</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100 flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform">
              <div>
                <div className="flex text-amber-400 mb-4 text-sm">★★★★★</div>
                <p className="text-sm text-gray-700 font-semibold leading-relaxed mb-6">
                  “The fastest turnaround and cleanest UI components we have ever received. The Discord collaboration was flawless.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                  DR
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Daniel R.</div>
                  <div className="text-[11px] text-gray-500 font-medium">Product Lead</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform">
              <div>
                <div className="flex text-amber-400 mb-4 text-sm">★★★★★</div>
                <p className="text-sm text-gray-700 font-semibold leading-relaxed mb-6">
                  “Unreal aesthetic quality. Our brand went from looking like an average template to feeling like an elite software provider.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-sm">
                  SM
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Sarah M.</div>
                  <div className="text-[11px] text-gray-500 font-medium">Founder</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. FAQ SECTION WITH BEAUTIFUL PASTEL STICKY NOTES */}
      {/* ------------------------------------------------------------- */}
      <section id="faqs" className="relative w-full py-28 blueprint-bg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          
          <div className="inline-block mb-4">
            <StickerTag label="FAQs" variant="lime" rotate={-1} />
          </div>

          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-gray-900 mb-16 leading-tight">
            ANSWER BEFORE<br />WE START
          </h2>

          {/* Sticky Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {FAQS.map((faq) => (
              <motion.div
                key={faq.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setActiveFaq(activeFaq?.id === faq.id ? null : faq)}
                className={`p-6 rounded-3xl ${faq.color} border border-black/10 shadow-xl cursor-pointer ${faq.rotate} transition-all duration-300 relative flex flex-col justify-between`}
              >
                {/* Paperclip top indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 rounded-full bg-white/70 border border-black/10 flex items-center justify-center text-xs font-bold">
                    📌
                  </div>
                  <span className="text-xs font-bold text-gray-600">
                    {activeFaq?.id === faq.id ? '✕ Close' : '+ Expand'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 font-pill">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-gray-500">
                  <span>Webloom FAQ</span>
                  <span style={{ color: faq.accentColor }}>Verified</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. CONTACT & DISCORD ONLY SECTION */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="contact" 
        className="relative w-full py-32 bg-cover bg-center overflow-hidden text-white"
        style={{ backgroundImage: "url('/assets/asset_1.png')" }}
      >
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          
          {/* DISCORD ONLY PILL BADGE */}
          <div className="flex justify-center mb-8">
            <button
              onClick={copyDiscord}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20"
            >
              {/* Discord SVG */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>{copiedDiscord ? 'Copied "webloom" to Clipboard! ✓' : 'Join Discord: webloom (Click to Copy)'}</span>
            </button>
          </div>

          <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-white leading-tight mb-8 drop-shadow-2xl">
            LET'S BUILD<br />SOMETHING<br />MEMORABLE
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white text-gray-900 font-extrabold text-sm tracking-wider uppercase shadow-2xl hover:bg-rose-50 hover:scale-105 transition-all duration-200"
            >
              Start a Project ➔
            </button>
            <button
              onClick={copyDiscord}
              className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white font-extrabold text-sm tracking-wider uppercase shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-200"
            >
              Add on Discord: webloom
            </button>
          </div>

          {/* Footer Navigation */}
          <footer className="mt-24 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-white/70 gap-4">
            <div>© 2026 WEBLOOM STUDIO. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <button onClick={() => scrollTo('about')} className="hover:text-white">ABOUT</button>
              <button onClick={() => scrollTo('work')} className="hover:text-white">PROJECTS</button>
              <button onClick={() => scrollTo('services')} className="hover:text-white">SERVICES</button>
              <button onClick={() => scrollTo('reviews')} className="hover:text-white">REVIEWS</button>
              <button onClick={() => scrollTo('faqs')} className="hover:text-white">FAQS</button>
            </div>
          </footer>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FIXED APPLE DOCK */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <div className="pointer-events-auto">
          <AppleDock 
            activeId={activeSection} 
            onSelect={(item: DockItem) => {
              setActiveSection(item.id);
              scrollTo(item.id);
            }} 
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 9. INQUIRY / BOOK PROJECT MODAL */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 text-gray-900"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-500">Contact Webloom</div>
                  <h3 className="text-2xl font-black">Let's Discuss Your Project</h3>
                </div>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center text-white font-bold">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Direct Discord Contact</div>
                      <div className="text-xs text-indigo-600 font-semibold">Username: webloom</div>
                    </div>
                  </div>
                  <button 
                    onClick={copyDiscord}
                    className="px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold shadow-sm"
                  >
                    {copiedDiscord ? 'Copied! ✓' : 'Copy Tag'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name or Handle</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alex / RiftCheats" 
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Project Type</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white">
                    <option>Custom Invision / SellAuth Storefront</option>
                    <option>Complete Website & Landing Page</option>
                    <option>UI/UX Design & Figma System</option>
                    <option>Brand Identity & 3D Visuals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Project Details</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell us what you're building, your timeline, and any reference links..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button 
                  onClick={() => {
                    alert('Thanks! Please also message us on Discord: webloom for instant reply.');
                    setModalOpen(false);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-extrabold text-sm shadow-xl transition-all"
                >
                  Send Inquiry ➔
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
