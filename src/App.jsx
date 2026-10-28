import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Flower2,
  Camera,
  ArrowDown,
  Wind,
  Clock,
  Film,
  X,
  Upload,
} from 'lucide-react';
import { coupleInfo, videoConfig } from './data/anniversaryData';
import { HeroTulipBouquet } from './components/TulipIllustration';
import { PetalCanvas } from './components/PetalCanvas';
import { TulipGarden } from './components/TulipGarden';
import { Gallery3D } from './components/Gallery3D';
import { LeidiMiniGallery } from './components/LeidiMiniGallery';
import { MusicPlayer } from './components/MusicPlayer';

function calculateElapsedTime(startISO) {
  const start = new Date(startISO);
  const now = new Date();

  const totalMs = Math.max(0, now.getTime() - start.getTime());
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    years,
    months,
    days,
    totalMonths,
    totalDays,
    hours,
    minutes,
    seconds,
  };
}

export default function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [elapsed, setElapsed] = useState(() =>
    calculateElapsedTime(coupleInfo.startDateISO)
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(videoConfig.videoUrl);
  const [videoMissing, setVideoMissing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateElapsedTime(coupleInfo.startDateISO));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const launchCelebrationShower = () => {
    const duration = 2200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#F9DCE5', '#F4BFD0', '#EC95B2', '#FFFDFB', '#E06C93'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#F9DCE5', '#F4BFD0', '#EC95B2', '#FFFDFB', '#E06C93'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpenCelebrationVideo = async () => {
    launchCelebrationShower();
    setIsVideoOpen(true);
    window.dispatchEvent(new CustomEvent('anniversary-video-open'));

    // Automatically check common video filenames in /video/ and /fotos/
    if (videoSrc.startsWith('blob:')) return;

    const candidates = [
      '/video/aniversario.mp4',
      '/video/video.mp4',
      '/video/leidi.mp4',
      '/fotos/aniversario.mp4',
      '/fotos/video.mp4',
    ];

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate, { method: 'HEAD', cache: 'no-cache' });
        if (!res.ok) continue;
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.startsWith('video/')) {
          setVideoSrc(candidate);
          setVideoMissing(false);
          return;
        }
      } catch {
        // try next
      }
    }
    setVideoMissing(true);
  };

  const handleCloseCelebrationVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoOpen(false);
    window.dispatchEvent(new CustomEvent('anniversary-video-close'));
  };

  const handleSelectCustomVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoMissing(false);
    setVideoSrc(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-slate-800 relative selection:bg-tulip-200 selection:text-tulip-900">
      {/* Ambient Floating Pastel Petals */}
      <PetalCanvas enabled={petalsEnabled} />

      {/* Floating Background Music Player */}
      <MusicPlayer />

      {/* Top Glassmorphism Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-50/80 border-b border-tulip-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#inicio"
            className="inline-flex items-center gap-2.5 group focus-visible:outline-none"
          >
            <span className="w-9 h-9 rounded-full bg-tulip-100 border border-tulip-200 flex items-center justify-center text-lg shadow-2xs group-hover:scale-105 transition-transform">
              🌷
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-lg leading-none text-slate-900">
                1 Año y 6 Meses
              </span>
              <span className="text-[11px] text-tulip-600 font-medium tracking-wider uppercase">
                Desde el 27 Abr 2025
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#inicio"
              className="hover:text-tulip-700 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#jardin-18-tulipanes"
              className="inline-flex items-center gap-1.5 hover:text-tulip-700 transition-colors"
            >
              <Flower2 className="w-4 h-4 text-tulip-500" />
              Los 18 Tulipanes
            </a>
            <a
              href="#galeria-3d"
              className="inline-flex items-center gap-1.5 hover:text-tulip-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-tulip-500" />
              Galería 3D
            </a>
            <a
              href="#galeria-leidi"
              className="inline-flex items-center gap-1.5 hover:text-tulip-700 transition-colors"
            >
              <Heart className="w-4 h-4 text-tulip-500" />
              Solo Tú, Leidi
            </a>
          </nav>

          {/* Right Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPetalsEnabled((p) => !p)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                petalsEnabled
                  ? 'bg-tulip-50 border-tulip-200 text-tulip-800'
                  : 'bg-white/70 border-slate-200 text-slate-500'
              }`}
              title="Activar o pausar caída de pétalos"
            >
              <Wind className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pétalos</span>
            </button>

            <button
              type="button"
              onClick={launchCelebrationShower}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-tulip-600 hover:bg-tulip-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lluvia de Amor</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main id="inicio" className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
          {/* Soft Pastel Background Blobs */}
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-tulip-200/35 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-tulip-100/50 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Editorial Typography & CTAs */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-tulip-200 shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-tulip-500 text-tulip-500" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-tulip-800">
                    {coupleInfo.milestoneBadge}
                  </span>
                </div>

                <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold tracking-tight text-slate-900 leading-[1.08]">
                  Para ti,{' '}
                  <span className="italic font-normal text-tulip-600">
                    {coupleInfo.partnerName}
                  </span>
                  :{' '}
                  <span className="block mt-1 text-3xl sm:text-5xl lg:text-6xl text-slate-800">
                    {coupleInfo.heroTitle}
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {coupleInfo.heroSubtitle}
                </p>

                {/* Primary & Secondary Navigation CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#jardin-18-tulipanes"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-tulip-600 hover:bg-tulip-700 text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <Flower2 className="w-5 h-5" />
                    Descubrir los 18 Tulipanes
                  </a>

                  <a
                    href="#galeria-3d"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-tulip-50 text-slate-800 border border-tulip-200 text-sm sm:text-base font-semibold shadow-xs transition-all"
                  >
                    <Camera className="w-5 h-5 text-tulip-600" />
                    Ver Galería
                  </a>
                </div>

                {/* Live Elapsed Time Box since April 27, 2025 */}
                <div className="mt-10 max-w-2xl mx-auto lg:mx-0 rounded-2xl bg-white/85 backdrop-blur-xs border border-tulip-200/80 p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-tulip-700 mb-3">
                    <Clock className="w-3.5 h-3.5 text-tulip-500" />
                    <span>
                      Tiempo exacto desde el {coupleInfo.startDateFormatted}:
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="rounded-xl bg-tulip-50/70 border border-tulip-100 p-2.5">
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-tulip-700">
                        {elapsed.years}a {elapsed.months}m {elapsed.days}d
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        Calendario Exacto
                      </div>
                    </div>

                    <div className="rounded-xl bg-tulip-50/70 border border-tulip-100 p-2.5">
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-tulip-700">
                        {elapsed.totalMonths} Meses
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        18 Tulipanes en Flor
                      </div>
                    </div>

                    <div className="rounded-xl bg-tulip-50/70 border border-tulip-100 p-2.5">
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-tulip-700">
                        {elapsed.totalDays} Días
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        Días Totales Juntos
                      </div>
                    </div>

                    <div className="rounded-xl bg-tulip-50/70 border border-tulip-100 p-2.5">
                      <div className="font-serif text-2xl sm:text-3xl font-bold text-tulip-700 tabular-nums">
                        {String(elapsed.hours).padStart(2, '0')}:
                        {String(elapsed.minutes).padStart(2, '0')}:
                        {String(elapsed.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        Horas · Min · Seg
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Hero Tulip Bouquet Centerpiece */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div
                  onClick={launchCelebrationShower}
                  className="relative p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-white/90 via-cream-50/90 to-tulip-50/80 border border-tulip-200/80 shadow-xl cursor-pointer group transition-transform duration-500 hover:scale-[1.02]"
                  title="Haz clic en el ramo para lanzar pétalos"
                >
                  <HeroTulipBouquet />

                  <div className="mt-4 text-center">
                    <p className="font-handwriting text-2xl text-tulip-800">
                      “Un ramo eterno que nunca se marchita”
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-500 group-hover:text-tulip-600 transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-tulip-500" />
                      Toca el ramo para celebrar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Cue */}
            <div className="mt-14 flex justify-center">
              <a
                href="#jardin-18-tulipanes"
                className="inline-flex flex-col items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-tulip-600 transition-colors"
              >
                <span>Recorre nuestro jardín</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-tulip-500" />
              </a>
            </div>
          </div>
        </section>

        {/* ================= SECTION 1: JARDÍN DE LOS 18 TULIPANES ================= */}
        <TulipGarden />

        {/* ================= SECTION 2: GALERÍA POLAROID 3D ================= */}
        <Gallery3D />

        {/* ================= SECTION 3: MINI GALERÍA SOLO DE LEIDI ================= */}
        <LeidiMiniGallery />
      </main>

      {/* ================= ROMANTIC FOOTER + FINAL VIDEO SURPRISE ================= */}
      <footer className="bg-white/90 border-t border-tulip-200/70 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tulip-100 border border-tulip-200 text-2xl mb-4">
            🌷
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900">
            Felices 1 Año y 6 Meses, {coupleInfo.partnerName}
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Desde el 27 de abril de 2025 hasta hoy: gracias por estos 18 meses llenos de ternura,
            complicidad y amor bonito. Que nuestra historia siga floreciendo siempre como tu jardín
            de tulipanes favorito.
          </p>

          <div className="mt-7">
            <button
              type="button"
              onClick={handleOpenCelebrationVideo}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-tulip-100 hover:bg-tulip-200 text-tulip-800 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-tulip-600 text-tulip-600" />
              <span>Celebrar nuestro aniversario</span>
              <Film className="w-4 h-4 text-tulip-700 ml-0.5" />
            </button>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            27 de Abril de 2025 — 27 de Octubre de 2026 · 18 Meses Juntos
          </p>
        </div>
      </footer>

      {/* ================= MODAL: FINAL SURPRISE VIDEO ================= */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={handleCloseCelebrationVideo}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-cream-50 border border-tulip-200 p-5 sm:p-8 shadow-2xl overflow-hidden text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseCelebrationVideo}
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-tulip-100 text-slate-700 hover:text-tulip-800 border border-tulip-200 transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tulip-100 text-tulip-800 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-tulip-600" />
              Sorpresa Final · 18 Meses
            </span>

            <h3 className="mt-3 font-serif text-2xl sm:text-4xl font-semibold text-slate-900">
              {videoConfig.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {videoConfig.subtitle}
            </p>

            {/* Video Container */}
            <div className="mt-5 relative rounded-2xl overflow-hidden bg-slate-950 border border-tulip-200 shadow-lg aspect-video flex items-center justify-center">
              {!videoMissing ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setVideoMissing(true)}
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <div className="p-6 text-center max-w-md mx-auto text-white">
                  <div className="w-12 h-12 rounded-full bg-tulip-500/20 border border-tulip-400/40 flex items-center justify-center mx-auto mb-3 text-2xl">
                    🎬
                  </div>
                  <p className="font-serif text-xl font-semibold text-tulip-100">
                    Coloca tu video de aniversario aquí
                  </p>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Guarda tu video en la carpeta{' '}
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-tulip-200">
                      public/video/aniversario.mp4
                    </code>{' '}
                    o selecciónalo ahora mismo desde tu PC para verlo:
                  </p>
                  <label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tulip-600 hover:bg-tulip-700 text-white text-xs sm:text-sm font-semibold cursor-pointer shadow-md transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Elegir video (.mp4)</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleSelectCustomVideo}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Bottom bar with option to change video */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-handwriting text-lg text-tulip-700">
                Te amo hoy y por mil años más, Leidi 🌷
              </span>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-tulip-50 border border-tulip-200 text-slate-600 hover:text-tulip-800 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-tulip-500" />
                <span>Probar otro video (.mp4)</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectCustomVideo}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
