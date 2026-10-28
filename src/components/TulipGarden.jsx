import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Flower2,
  RotateCcw,
} from 'lucide-react';
import { tulips18, coupleInfo } from '../data/anniversaryData';
import { TulipIllustration } from './TulipIllustration';

const STAGE_FILTERS = [
  { id: 'all', label: 'Los 18 Meses (Todos)' },
  { id: 'first-6', label: 'Mes 1–6 · El Inicio' },
  { id: 'year-1', label: 'Mes 7–12 · Primer Año' },
  { id: 'year-1-5', label: 'Mes 13–18 · 1 Año y 6 Meses' },
];

export function TulipGarden() {
  const [selectedStage, setSelectedStage] = useState('all');
  const [bloomedMonths, setBloomedMonths] = useState(() => {
    try {
      const saved = localStorage.getItem('tulip_garden_bloomed_v1');
      return saved ? JSON.parse(saved) : [1, 18];
    } catch {
      return [1, 18];
    }
  });
  const [activeTulip, setActiveTulip] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('tulip_garden_bloomed_v1', JSON.stringify(bloomedMonths));
    } catch {
      // ignore storage errors
    }
  }, [bloomedMonths]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!activeTulip) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTulip(null);
      if (e.key === 'ArrowRight') handleNavigateModal(1);
      if (e.key === 'ArrowLeft') handleNavigateModal(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTulip, bloomedMonths]);

  const triggerPetalBurst = (originX = 0.5, originY = 0.6) => {
    confetti({
      particleCount: 28,
      spread: 65,
      origin: { x: originX, y: originY },
      colors: ['#F9DCE5', '#F4BFD0', '#EC95B2', '#FFFDFB', '#E06C93'],
      shapes: ['circle'],
      scalar: 0.9,
      ticks: 160,
    });
  };

  const handleSelectTulip = (tulip, event) => {
    const isAlreadyBloomed = bloomedMonths.includes(tulip.month);
    if (!isAlreadyBloomed) {
      setBloomedMonths((prev) => [...prev, tulip.month]);
      if (event?.clientX && event?.clientY) {
        triggerPetalBurst(
          event.clientX / window.innerWidth,
          event.clientY / window.innerHeight
        );
      } else {
        triggerPetalBurst();
      }
    }
    setActiveTulip(tulip);
  };

  const handleBloomAll = () => {
    setBloomedMonths(tulips18.map((t) => t.month));
    triggerPetalBurst(0.3, 0.6);
    setTimeout(() => triggerPetalBurst(0.7, 0.6), 180);
  };

  const handleResetGarden = () => {
    setBloomedMonths([]);
  };

  const handleNavigateModal = (direction) => {
    if (!activeTulip) return;
    const currentIndex = tulips18.findIndex((t) => t.month === activeTulip.month);
    const nextIndex = (currentIndex + direction + tulips18.length) % tulips18.length;
    const nextTulip = tulips18[nextIndex];
    if (!bloomedMonths.includes(nextTulip.month)) {
      setBloomedMonths((prev) => [...prev, nextTulip.month]);
    }
    setActiveTulip(nextTulip);
  };

  const filteredTulips =
    selectedStage === 'all'
      ? tulips18
      : tulips18.filter((t) => t.stage === selectedStage);

  const bloomProgress = Math.round((bloomedMonths.length / tulips18.length) * 100);

  return (
    <section id="jardin-18-tulipanes" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      {/* Subtle Decorative Background Glow */}
      <div className="max-w-7xl mx-auto">
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tulip-100/90 border border-tulip-200 text-tulip-700 text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Flower2 className="w-3.5 h-3.5 text-tulip-600" />
            1 Tulipán por cada Mes Juntos
          </span>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-slate-900">
            El Jardín de los{' '}
            <span className="italic font-normal text-tulip-600">18 Tulipanes</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Cada tulipán de este jardín guarda un recuerdo, un sentimiento o una razón por la que
            estos <strong className="font-semibold text-tulip-700">1 año , 6 meses y un día</strong> a tu
            lado han sido los más hermosos de mi vida.{' '}
            <span className="underline decoration-tulip-300 underline-offset-4">
              Toca cada tulipán para hacerlo florecer.
            </span>
          </p>
        </div>

        {/* Interactive Progress & Stage Filter Bar */}
        <div className="mt-10 bg-white/80 backdrop-blur-md rounded-2xl border border-tulip-200/70 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Bloom Progress Counter */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-700 mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-tulip-500" />
                  <span>
                    Tulipanes florecidos:{' '}
                    <strong className="text-tulip-700">
                      {bloomedMonths.length} de {tulips18.length}
                    </strong>
                  </span>
                </span>
                <span className="text-tulip-600 font-semibold">{bloomProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-tulip-100 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-tulip-300 via-tulip-400 to-tulip-600 transition-all duration-500"
                  style={{ width: `${bloomProgress}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleBloomAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-tulip-600 hover:bg-tulip-700 text-white text-xs sm:text-sm font-medium shadow-sm transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                Hacer florecer los 18
              </button>
              {bloomedMonths.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetGarden}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-tulip-200 bg-cream-50 hover:bg-tulip-50 text-slate-600 text-xs sm:text-sm font-medium transition-all"
                  title="Cerrar capullos para volver a descubrirlos"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reiniciar
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills by Milestone Stage */}
          <div className="mt-5 pt-4 border-t border-tulip-100 flex items-center gap-2 overflow-x-auto pb-1">
            {STAGE_FILTERS.map((tab) => {
              const isActive = selectedStage === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedStage(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-tulip-100 text-tulip-800 border border-tulip-300 shadow-xs'
                      : 'text-slate-600 hover:bg-tulip-50/70 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of 18 Interactive Tulips */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredTulips.map((tulip) => {
            const isBloomed = bloomedMonths.includes(tulip.month);
            const isMilestone = tulip.month === 1 || tulip.month === 6 || tulip.month === 12 || tulip.month === 18;

            return (
              <button
                key={tulip.month}
                type="button"
                onClick={(e) => handleSelectTulip(tulip, e)}
                className={`group relative flex flex-col items-center justify-between rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tulip-500 ${
                  isBloomed
                    ? 'bg-white/95 border border-tulip-300/80 shadow-md hover:shadow-xl'
                    : 'bg-white/60 hover:bg-white/90 border border-tulip-200/50 shadow-xs hover:shadow-md'
                } ${isMilestone ? 'ring-1 ring-tulip-300/60' : ''}`}
              >
                {/* Top Header Badge */}
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                      isMilestone
                        ? 'bg-tulip-600 text-white'
                        : isBloomed
                        ? 'bg-tulip-100 text-tulip-800'
                        : 'bg-cream-200/80 text-slate-600'
                    }`}
                  >
                    {tulip.label}
                  </span>

                  {isBloomed ? (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-sage-600"
                      title="Tulipán florecido"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-tulip-500" />
                    </span>
                  ) : (
                    <span className="text-[11px] text-tulip-400 group-hover:text-tulip-600 transition-colors">
                      Tocar 🌷
                    </span>
                  )}
                </div>

                {/* Animated SVG Tulip */}
                <div
                  className={`my-2 transition-transform duration-500 group-hover:scale-105 ${
                    tulip.month % 2 === 0 ? 'animate-sway' : 'animate-sway-slow'
                  }`}
                >
                  <TulipIllustration
                    variant={tulip.variant}
                    isBloomed={isBloomed}
                    size="sm"
                    idSuffix={`card-${tulip.month}`}
                  />
                </div>

                {/* Tulip Card Footer Title */}
                <div className="w-full pt-2 border-t border-tulip-100/80">
                  <p className="font-serif text-base font-semibold text-slate-900 line-clamp-1 group-hover:text-tulip-700 transition-colors">
                    {tulip.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {isBloomed ? tulip.dateHint : 'Haz clic para abrir el mensaje'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal: Botanical Tulip Letter Detail */}
      {activeTulip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveTulip(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tulip-modal-title"
        >
          <div
            className="relative w-full max-w-xl rounded-3xl bg-cream-50 border border-tulip-200 p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Soft Corner Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-tulip-200/50 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-tulip-100/60 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveTulip(null)}
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-tulip-100 text-slate-600 hover:text-tulip-800 border border-tulip-200 transition-colors"
              aria-label="Cerrar carta"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              {/* Illustrated Blooming Tulip on Left */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-b from-tulip-50/90 to-cream-100 rounded-2xl p-4 border border-tulip-200/60 shrink-0">
                <TulipIllustration
                  variant={activeTulip.variant}
                  isBloomed={true}
                  size="md"
                  idSuffix={`modal-${activeTulip.month}`}
                />
                <span className="mt-2 px-3 py-0.5 rounded-full bg-tulip-100 text-tulip-800 text-xs font-semibold">
                  Tulipán #{activeTulip.month} de 18
                </span>
              </div>

              {/* Message Content on Right */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-tulip-600">
                  <span>{activeTulip.label}</span>
                  <span>•</span>
                  <span>{activeTulip.dateHint}</span>
                </div>

                <h3
                  id="tulip-modal-title"
                  className="mt-1.5 text-2xl sm:text-3xl font-serif font-semibold text-slate-900"
                >
                  {activeTulip.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  “{activeTulip.reason}”
                </p>

                {/* Promise Box */}
                <div className="mt-5 p-3.5 rounded-xl bg-tulip-50/90 border border-tulip-200/80">
                  <p className="text-xs font-semibold uppercase tracking-wider text-tulip-700 flex items-center justify-center sm:justify-start gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-tulip-500 text-tulip-500" />
                    Promesa de este mes:
                  </p>
                  <p className="mt-1 font-handwriting text-xl text-slate-800">
                    {activeTulip.promise}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer: Previous / Next Tulip Navigation */}
            <div className="mt-7 pt-4 border-t border-tulip-200/70 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNavigateModal(-1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-tulip-50 border border-tulip-200 text-xs sm:text-sm font-medium text-slate-700 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Mes Anterior
              </button>

              <span className="text-xs text-slate-500 font-serif italic hidden sm:inline">
                {coupleInfo.yourName}
              </span>

              <button
                type="button"
                onClick={() => handleNavigateModal(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-tulip-600 hover:bg-tulip-700 text-xs sm:text-sm font-medium text-white shadow-xs transition-all"
              >
                Siguiente Mes
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
