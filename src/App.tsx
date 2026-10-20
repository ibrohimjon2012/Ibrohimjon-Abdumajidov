/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Cpu,
  Bot,
  Code2,
  Send,
  Github,
  Instagram,
  ArrowRight,
  ExternalLink,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  Layers,
  ChevronRight,
  Mail,
  Play,
  RotateCcw
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  technologies: string[];
  gradient: string;
  accentColor: string;
  features: string[];
  schematic: string;
  status: string;
}

interface Skill {
  name: string;
  category: 'code' | 'robotics' | 'tools';
  description: string;
  level: string;
  icon: React.ReactNode;
  tags: string[];
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'code' | 'robotics'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Interactive Simulator in Hero
  const [activeTab, setActiveTab] = useState<'code' | 'sensor'>('code');
  const [sensorDistance, setSensorDistance] = useState(42);
  const [isScanning, setIsScanning] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2200);
  };

  // Ultrasonic sensor simulator effect
  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setSensorDistance(Math.floor(Math.random() * 85) + 10);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const projects: Project[] = [
    {
      id: 'smart-home',
      title: 'Aqlli Uy Tizimi (Smart Home Hub)',
      shortDesc: 'Arduino va harorat datchiklari orqali xona iqlimi va yoritishni avtomatik boshqaruvchi mikrokontroller tizimi.',
      fullDesc: 'Ushbu loyiha uy ichidagi qulaylik va xavfsizlikni avtomatlashtirish uchun mo\'ljallangan. Tizim xona harorati belgilangan me\'yordan oshganda ventilyatorni avtomatik yoqadi, yorug\'lik sensori (LDR) orqali kechqurun chiroqlarni yoqadi va LCD ekranda joriy ko\'rsatkichlarni doimiy chiqarib turadi.',
      category: 'Robototexnika & IoT',
      technologies: ['Arduino Uno', 'C++', 'DHT11 Sensor', 'LDR Yorug\'lik datchigi', 'LCD 1602'],
      gradient: 'from-cyan-950/70 via-blue-900/40 to-slate-900',
      accentColor: 'text-cyan-400 border-cyan-500/30',
      features: [
        'DHT11 sensori yordamida harorat va namlikni real vaqtda o\'lchash',
        'Fotoqarshilik (LDR) asosida qorong\'uda avtomatik yoritish faollashuvi',
        'I2C protokoli orqali LCD ekranga holat ma\'lumotlarini uzatish',
        'Favqulodda harorat ko\'tarilganda akustik signal (buzzer) ogohlantirishi'
      ],
      schematic: 'DHT11 (Pin 2) -> Arduino Uno -> Relay Module (Pin 7) -> 12V Fan\nLDR (A0) -> Komparator -> Tranzistor Switch -> LED Matrix',
      status: 'Muvaffaqiyatli sinovdan o\'tgan'
    },
    {
      id: 'obstacle-robot',
      title: 'To\'siqlardan Qochuvchi Avtonom Robot',
      shortDesc: 'Ultratovushli masofa o\'lchagich va servo motor yordamida to\'siqlarni aylanib o\'tuvchi 4 g\'ildirakli avtonom robot.',
      fullDesc: 'HC-SR04 ultratovush sensori yordamida harakat yo\'lidagi to\'siqlarni 30 sm masofadan aniq payqaydi. Agar oldinda to\'siq aniqlansa, miniatyura servo mexanizmi sensorni chap va o\'ngga burib eng ochiq yo\'nalishni hisoblab chiqadi va motor drayveri orqali mashinani buradi.',
      category: 'Robototexnika & Mexatronika',
      technologies: ['Arduino Nano', 'HC-SR04 Ultrasonic', 'L298N Driver', 'SG90 Servo', 'DC Motorlar'],
      gradient: 'from-violet-950/70 via-purple-900/40 to-slate-900',
      accentColor: 'text-violet-400 border-violet-500/30',
      features: [
        '30 sm masofagacha bo\'lgan to\'siqlarni ovoz to\'lqinlari bilan o\'lchash',
        'SG90 servo orqali 180 graduslik atrof-muhitni skanerlash',
        'L298N ikki kanalli drayveri yordamida 4 ta DC motorni PWM tezlikda boshqarish',
        'Avtonom navigatsiya algoritmi orqali berk ko\'chalardan orqaga qaytish'
      ],
      schematic: 'HC-SR04 (Trig: 9, Echo: 10) -> Arduino Nano -> SG90 (Pin 11)\nArduino Nano (PWM 5,6,3,2) -> L298N H-Bridge -> 4x TT Motor',
      status: 'Ishchi holatda'
    },
    {
      id: 'telegram-bot',
      title: 'Python Vazifalar & Eslatmalar Boti',
      shortDesc: 'O\'quv dars jadvali, kundalik rejalarni boshqaruvchi va ob-havo ma\'lumotlarini o\'z vaqtida yetkazuvchi Telegram boti.',
      fullDesc: 'Python tili va Telegram Bot API asosida yaratilgan dastur. Foydalanuvchiga dars jadvalini qulay ko\'rish, muhim eslatmalarni belgilash va vaqti kelganda avtomatik bildirishnoma yuborish imkonini beradi. Ma\'lumotlar xavfsiz JSON tuzilmasida saqlanadi.',
      category: 'Dasturlash & Avtomatlashtirish',
      technologies: ['Python 3', 'aiogram / pyTelegramBotAPI', 'Asyncio', 'JSON Storage', 'API Integratsiya'],
      gradient: 'from-blue-950/70 via-indigo-900/40 to-slate-900',
      accentColor: 'text-blue-400 border-blue-500/30',
      features: [
        'Dars jadvali va uy vazifalarini interaktiv menyular orqali boshqarish',
        'Kechikmasdan eslatuvchi fon taymerlari (Async cron scheduler)',
        'Ob-havo va kunlik tavsiyalar API integratsiyasi',
        'O\'zbek tilidagi qulay inline tugmalar va komandalar'
      ],
      schematic: 'Telegram Client -> Webhook/Polling -> Python Dispatcher -> Task Logic -> Scheduler Thread',
      status: 'Faol foydalanilmoqda'
    }
  ];

  const skills: Skill[] = [
    {
      name: 'Python',
      category: 'code',
      description: 'Algoritmlar, skriptlar, ma\'lumotlar bilan ishlash va Telegram botlar yaratish.',
      level: 'Amaliy bilim',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      tags: ['Sintaksis', 'OOP asoslari', 'Avtomatlashtirish']
    },
    {
      name: 'JavaScript',
      category: 'code',
      description: 'Interaktiv veb-sahifalar, DOM hodisalari va zamonaviy veb elementlar.',
      level: 'Amaliy bilim',
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      tags: ['ES6+', 'DOM', 'Interaktivlik']
    },
    {
      name: 'Arduino',
      category: 'robotics',
      description: 'Uno, Nano platalari bilan ishlash, sensorlar va aktuatorlarni ulash.',
      level: 'Yuqori qiziqish & Amaliyot',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      tags: ['C/C++', 'Mikrokontroller', 'PWM boshqaruv']
    },
    {
      name: 'Robototexnika',
      category: 'robotics',
      description: 'Avtonom harakatlanuvchi robotlar, datchiklar integratsiyasi va mexanika.',
      level: 'Loyiha tajribasi',
      icon: <Bot className="w-5 h-5 text-violet-400" />,
      tags: ['Sensorlar', 'Motor drayverlar', 'Kinematika']
    },
    {
      name: 'Elektronika & Sxemotexnika',
      category: 'robotics',
      description: 'Maket platasi (Breadboard), rezistorlar, tranzistorlar va sxemalarni yig\'ish.',
      level: 'Asosiy tushunchalar',
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      tags: ['Breadboard', 'Kuchlanish', 'Lehimlash']
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      description: 'Kodni versiyalash, o\'zgarishlarni kuzatish va loyihalarni onlayn saqlash.',
      level: 'Boshlang\'ich',
      icon: <Github className="w-5 h-5 text-slate-300" />,
      tags: ['Git commit', 'Repozitoriy', 'Open Source']
    }
  ];

  const filteredSkills = skills.filter(skill => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'code') return skill.category === 'code';
    if (activeFilter === 'robotics') return skill.category === 'robotics' || skill.category === 'tools';
    return true;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', contact: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-x-hidden">
      {/* Background Neon Glow Ambient Spots */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Cyber Grid Background Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* =========================================================================
          Top Bar: Strict 3-zone Top Bar Contract
          Zone 1: Brand title | Zone 2: 4 nav links | Zone 3: 1 primary action
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07090e]/85 border-b border-slate-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] transition-all">
              IA
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Ibrohimjon<span className="text-cyan-400">.dev</span>
            </span>
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#haqimda" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Men haqimda
            </a>
            <a href="#konikmalar" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Ko'nikmalar
            </a>
            <a href="#loyihalar" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Loyihalarim
            </a>
            <a href="#aloqa" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Aloqa
            </a>
          </nav>

          {/* Zone 3: 1 primary action & Mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#aloqa"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_18px_rgba(6,182,212,0.35)] transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Bog'lanish</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 bg-slate-900/60 focus:outline-none"
              aria-label="Menyuni ochish"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-6 py-4 space-y-3">
            <a
              href="#haqimda"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors"
            >
              Men haqimda
            </a>
            <a
              href="#konikmalar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors"
            >
              Ko'nikmalarim
            </a>
            <a
              href="#loyihalar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors"
            >
              Loyihalarim
            </a>
            <a
              href="#aloqa"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5 transition-colors"
            >
              Aloqa
            </a>
            <div className="pt-2">
              <a
                href="#aloqa"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Xabar qoldirish</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =========================================================================
            Hero Section
            Katta ism-familiya, sarlavha, "Loyihalarim" tugmasi, interaktiv simulator
           ========================================================================= */}
        <section className="relative pt-12 pb-20 md:py-24 border-b border-slate-800/60 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-6">
                {/* Clean unboxed kicker (no pill boxes) */}
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  <span>Salom, mening ismim</span>
                </div>

                {/* Big bold name */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Ibrohimjon{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
                    Abdumajidov
                  </span>
                </h1>

                {/* Subtitle requested by user */}
                <div className="text-xl sm:text-2xl font-semibold text-slate-200">
                  Yosh dasturchi va robototexnika ixlosmandi
                </div>

                {/* Intro summary */}
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                  Men 14 yoshdaman. Zamonaviy dasturlash, mikrokontrollerlar va avtonom robot tizimlarini yaratishga qiziqaman. Kod yozish va elektron komponentlarni birlashtirish orqali amaliy muammolarga yangi yechimlar yarataman.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#loyihalar"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Loyihalarim</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#aloqa"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl hover:text-white hover:border-slate-600 transition-all"
                  >
                    <span>Bog'lanish</span>
                  </a>
                </div>

                {/* Metadata details as clean unboxed typography */}
                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-cyan-400 font-semibold">14</span> yosh
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-violet-400 font-semibold">Coder</span> & Hardware
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="text-emerald-400 font-semibold">O'zbekiston</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Tech Terminal / Simulator */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-[#0c101b] border border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.12)] overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0e17] border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs font-mono text-slate-400">ibrohimjon@workspace:~$</span>
                    </div>

                    {/* Simulator Mode Tabs */}
                    <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeTab === 'code' ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Kod
                      </button>
                      <button
                        onClick={() => setActiveTab('sensor')}
                        className={`px-2.5 py-1 rounded-md transition-colors ${
                          activeTab === 'sensor' ? 'bg-violet-500/20 text-violet-300 font-medium' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sensor
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed min-h-[260px] flex flex-col justify-between">
                    {activeTab === 'code' ? (
                      <div className="space-y-2">
                        <p className="text-slate-500">// Ibrohimjon Abdumajidov - Dev Profil</p>
                        <p>
                          <span className="text-violet-400">class</span> <span className="text-cyan-400">YoungDeveloper</span>:
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">name</span> = <span className="text-emerald-300">"Ibrohimjon"</span>
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">age</span> = <span className="text-amber-300">14</span>
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">passions</span> = [<span className="text-emerald-300">"Python"</span>, <span className="text-emerald-300">"Arduino"</span>, <span className="text-emerald-300">"Robotics"</span>]
                        </p>
                        <p className="pl-4">
                          <span className="text-violet-400">def</span> <span className="text-sky-400">create_solution</span>(problem):
                        </p>
                        <p className="pl-8 text-cyan-300">
                          return build_hardware(code=passions, target=problem)
                        </p>
                        <div className="pt-2 text-slate-400 flex items-center gap-2">
                          <span className="text-emerald-400">➜</span>
                          <span>Holat: Yangi g'oyalar ustida ishlash davom etmoqda...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-slate-400">HC-SR04 Ultratovush Sensori:</span>
                          <button
                            onClick={() => setIsScanning(!isScanning)}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium rounded bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 border border-violet-500/40 transition-colors"
                          >
                            {isScanning ? (
                              <>
                                <RotateCcw className="w-3 h-3 animate-spin" />
                                <span>To'xtatish</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3" />
                                <span>Jonli Sinov</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">To'siqqacha masofa:</span>
                            <span className={`text-sm font-bold tabular-nums ${sensorDistance < 25 ? 'text-rose-400' : 'text-cyan-400'}`}>
                              {sensorDistance} sm
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                sensorDistance < 25 ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-400 to-violet-500'
                              }`}
                              style={{ width: `${Math.min(100, (sensorDistance / 90) * 100)}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                            <span>0 sm</span>
                            <span>
                              {sensorDistance < 25 ? (
                                <span className="text-rose-400 font-semibold">⚠️ To'siq yaqin! Motor burilishi faol</span>
                              ) : (
                                <span className="text-emerald-400">✓ Yo'l ochiq, oldinga harakat</span>
                              )}
                            </span>
                            <span>100 sm</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400">
                          Masofa o'lchov signali C++ algoritmi orqali hisoblanadi va motor drayveriga darhol komanda beradi.
                        </p>
                      </div>
                    )}

                    {/* Bottom Status Ribbon */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Rejim: Faol o'rganuvchi</span>
                      </span>
                      <span className="text-cyan-400">Arduino Uno & Python 3.12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="p-3 text-center sm:text-left">
                <div className="text-2xl font-bold font-mono text-cyan-400">14 yosh</div>
                <div className="text-xs text-slate-400 mt-1">Yosh iqtidorli coder</div>
              </div>
              <div className="p-3 text-center sm:text-left">
                <div className="text-2xl font-bold font-mono text-violet-400">3+ yil</div>
                <div className="text-xs text-slate-400 mt-1">Texnologiyaga qiziqish</div>
              </div>
              <div className="p-3 text-center sm:text-left">
                <div className="text-2xl font-bold font-mono text-sky-400">15+</div>
                <div className="text-xs text-slate-400 mt-1">Yig'ilgan sxemalar & kodlar</div>
              </div>
              <div className="p-3 text-center sm:text-left">
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">O'rganishga ishtiyoq</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            Men Haqimda (About Me) Section
            2-3 jumlalik tanishtiruv, maqsadlar, qadriyatlar
           ========================================================================= */}
        <section id="haqimda" className="py-20 border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                01. Shaxsiy Ma'lumot
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Men haqimda
              </h2>
              {/* 2-3 jumlalik qisqa tanishtiruv */}
              <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                Men Ibrohimjon Abdumajidov, 14 yoshdaman. Dasturlash va robototexnika sohasiga katta qiziqish bilan kirib kelgan yosh ijodkorman.
              </p>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Bo'sh vaqtimda Python orqali qiziqarli algoritmlar va Telegram botlar tuzaman, Arduino mikrokontrollerlari bilan har xil sensorli aqlli robotlar yasashni yaxshi ko'raman. Mening maqsadim — kelajakda O'zbekistonda ilg'or robototexnika va sun'iy intellekt texnologiyalarini rivojlantirishga hissa qo'shishdir.
              </p>
            </div>

            {/* 3 Pillars of Passion */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  Dasturlash va Mantiq
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Python va JavaScript orqali algoritmlarni tushunish, ma'lumotlar bilan ishlash va avtomatlashtirilgan dasturlar yozish.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/40 transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  Robototexnika & Arduino
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Datchiklar, motorlar va mikrosxemalarni dasturiy kod bilan uyg'unlashtirib, mustaqil harakatlanuvchi aqlli qurilmalar yaratish.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/40 transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  Doimiy Izlanish
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Har kuni yangi kutubxonalar, sxemalar va texnologiyalarni amaliyotda sinab ko'rish orqali bilimlarimni chuqurlashtirib boraman.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            Ko'nikmalarim (Skills) Section
            Python, JavaScript, Arduino, robototexnika va boshqalar
           ========================================================================= */}
        <section id="konikmalar" className="py-20 border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                  02. Texnologik Baza
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Ko'nikmalarim
                </h2>
                <p className="mt-2 text-slate-400 text-sm max-w-xl">
                  Men mustaqil o'rganayotgan va loyihalarimda faol ishlatayotgan asosiy vosita va texnologiyalar.
                </p>
              </div>

              {/* Interactive Filter Segmented Control */}
              <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl self-start md:self-auto">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeFilter === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Barchasi
                </button>
                <button
                  onClick={() => setActiveFilter('code')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeFilter === 'code'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dasturlash
                </button>
                <button
                  onClick={() => setActiveFilter('robotics')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeFilter === 'robotics'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Robototexnika & Uskunalar
                </button>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/70 transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {skill.icon}
                    </div>
                    {/* Clean unboxed metadata text without pill boxes */}
                    <span className="text-xs font-mono text-slate-400">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Clean unboxed text with typographic separators */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                    {skill.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-cyan-400/90">{tag}</span>
                        {idx < skill.tags.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            Loyihalarim (Projects) Section
            3 ta namunaviy loyiha kartochkasi (rasm o'rnida rangli blok, nomi, qisqa tavsifi)
           ========================================================================= */}
        <section id="loyihalar" className="py-20 border-b border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                03. Amaliy Tajriba
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Loyihalarim
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                O'z qo'lim bilan yaratgan, dasturiy ta'minot va apparat vositalarini uyg'unlashtirgan asosiy loyihalarim.
              </p>
            </div>

            {/* 3 Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all flex flex-col group"
                >
                  {/* Visual Container: Rangli texnologik blok (as requested: rasm o'rnida rangli blok) */}
                  <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} p-6 relative flex flex-col justify-between border-b border-slate-800/80 overflow-hidden`}>
                    {/* Futuristic Grid Accent */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                    {/* Top Row in Block */}
                    <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>0{index + 1} // MODEL</span>
                      </span>
                      <span className="text-slate-400">
                        {project.category}
                      </span>
                    </div>

                    {/* Central Tech Graphic Illustration */}
                    <div className="relative z-10 my-auto flex items-center justify-center">
                      <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
                        {index === 0 && <Cpu className="w-10 h-10 text-cyan-400" />}
                        {index === 1 && <Bot className="w-10 h-10 text-violet-400" />}
                        {index === 2 && <Terminal className="w-10 h-10 text-sky-400" />}
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Status: {project.status}</span>
                      <span className="text-cyan-400">v1.0</span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Project Name */}
                      <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                        {project.shortDesc}
                      </p>
                    </div>

                    {/* Technologies list as unboxed text */}
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1.5">Ishlatilgan vositalar:</div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <React.Fragment key={tech}>
                            <span className="text-slate-300 font-mono">{tech}</span>
                            {idx < 2 && idx < project.technologies.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Modal Opener */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white rounded-xl border border-slate-700 transition-all active:scale-[0.98]"
                    >
                      <span>Batafsil ma'lumot</span>
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-[0_0_50px_rgba(6,182,212,0.25)] text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    {selectedProject.category}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.fullDesc}
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Asosiy imkoniyatlari:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedProject.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schematic / Architecture */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-slate-500 font-semibold mb-1">// Sxema & Ulanish zanjiri:</div>
                <pre className="whitespace-pre-wrap font-mono text-cyan-300/90 leading-relaxed">
                  {selectedProject.schematic}
                </pre>
              </div>

              {/* Technologies */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Qo'llanilgan texnologiyalar:
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                  {selectedProject.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            Aloqa (Contact) Section
            Telegram, Instagram, GitHub havolalari, xabar qoldirish
           ========================================================================= */}
        <section id="aloqa" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                04. Aloqa & Hamkorlik
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Bog'lanish
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Mening loyihalarim, robototexnika yoki dasturlash bo'yicha savollaringiz bo'lsa, quyidagi tarmoqlar orqali bemalol bog'lanishingiz mumkin.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Social Links & Direct Buttons */}
              <div className="lg:col-span-5 space-y-4">
                {/* Telegram Button */}
                <a
                  href="https://t.me/ibrohimjon_coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-white group-hover:text-sky-400 transition-colors">
                        Telegram
                      </div>
                      <div className="text-xs font-mono text-slate-400">@ibrohimjon_coder</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                </a>

                {/* Instagram Button */}
                <a
                  href="https://instagram.com/ibrohimjon_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-white group-hover:text-pink-400 transition-colors">
                        Instagram
                      </div>
                      <div className="text-xs font-mono text-slate-400">@ibrohimjon_dev</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
                </a>

                {/* GitHub Button */}
                <a
                  href="https://github.com/ibrohimjon-abdumajidov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        GitHub
                      </div>
                      <div className="text-xs font-mono text-slate-400">github.com/ibrohimjon-abdumajidov</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Copy Email Card */}
                <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono">ibrohimjona337@gmail.com</span>
                  </div>
                  <button
                    onClick={() => handleCopy('ibrohimjona337@gmail.com', 'email')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copiedText === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Nusxalandi!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Nusxalash</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Quick Interactive Message Box */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 relative">
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    Menga to'g'ridan-to'g'ri xabar yuboring
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-6">
                    Fikr-mulohazalaringiz yoki hamkorlik takliflaringiz bo'lsa, qoldiring.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-emerald-300">Xabaringiz qabul qilindi!</div>
                      <p className="text-xs text-slate-400">
                        Rahmat! Tez orada siz bilan ko'rsatilgan kontakt orqali bog'lanaman.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">
                          Ismingiz:
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masalan: Sardor"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">
                          Aloqa uchun (Telegram yoki Email):
                        </label>
                        <input
                          type="text"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          placeholder="@username yoki email@domain.uz"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1.5">
                          Xabaringiz:
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Salom Ibrohimjon, loyihalaringiz juda qiziqarli..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Xabarni jo'natish</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          Footer
          Quiet copyright, site links, anti-slop restraint
         ========================================================================= */}
      <footer className="border-t border-slate-800/80 bg-[#05070b] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Ibrohimjon Abdumajidov. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-6">
            <a href="#haqimda" className="hover:text-slate-300 transition-colors">
              Men haqimda
            </a>
            <a href="#konikmalar" className="hover:text-slate-300 transition-colors">
              Ko'nikmalar
            </a>
            <a href="#loyihalar" className="hover:text-slate-300 transition-colors">
              Loyihalar
            </a>
            <a href="#aloqa" className="hover:text-slate-300 transition-colors">
              Aloqa
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
