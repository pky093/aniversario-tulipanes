import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  LayoutGrid,
  MapPin,
  Calendar,
  Upload,
  RotateCcw,
  Volume2,
  VolumeX,
  Film,
  Maximize2,
  X,
  Heart,
} from 'lucide-react';
import { defaultMemories3D, coupleInfo } from '../data/anniversaryData';

// Helper to detect whether a local file (.jpeg, .jpg, .png, .webp, .mp4) exists in /public/fotos/
async function resolveSlotMedia(slot, fallbackUrl) {
  if (!slot) return { url: fallbackUrl, mediaType: 'image' };

  const candidates = [
    { url: `/fotos/foto${slot}.jpeg`, type: 'image' },
    { url: `/fotos/foto${slot}.jpg`, type: 'image' },
    { url: `/fotos/foto${slot}.JPEG`, type: 'image' },
    { url: `/fotos/foto${slot}.JPG`, type: 'image' },
    { url: `/fotos/foto${slot}.png`, type: 'image' },
    { url: `/fotos/foto${slot}.webp`, type: 'image' },
    { url: `/fotos/foto${slot}.mp4`, type: 'video' },
    { url: `/fotos/foto${slot}.MP4`, type: 'video' },
    { url: `/fotos/video${slot}.mp4`, type: 'video' },
  ];

  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate.url, { method: 'HEAD', cache: 'no-cache' });
      if (!res.ok) continue;
      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (candidate.type === 'image' && contentType.startsWith('image/')) {
        return { url: candidate.url, mediaType: 'image' };
      }
      if (candidate.type === 'video' && contentType.startsWith('video/')) {
        return { url: candidate.url, mediaType: 'video' };
      }
    } catch {
      // try next candidate
    }
  }

  return { url: fallbackUrl, mediaType: 'image' };
}

function isVideoSource(url = '', explicitType = '') {
  if (explicitType === 'video') return true;
  if (typeof url !== 'string') return false;
  if (url.startsWith('data:video/')) return true;
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);
}

function PolaroidCard3D({
  memory,
  onSelectExpand,
  enableMouseTilt = true,
  isEditMode = false,
  onReplaceMedia,
  className = '',
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const isVideo = isVideoSource(memory.image, memory.mediaType);

  const handleMouseMove = (e) => {
    if (!enableMouseTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !onReplaceMedia) return;

    const isFileVideo = file.type.startsWith('video/') || /\.mp4$/i.test(file.name);

    if (isFileVideo) {
      const objectUrl = URL.createObjectURL(file);
      onReplaceMedia(memory.id, objectUrl, 'video');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onReplaceMedia(memory.id, reader.result, 'image');
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleVideoSound = (e) => {
    e.stopPropagation();
    setIsVideoMuted((prev) => !prev);
  };

  const combinedTransform = `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${
    tilt.rotateY
  }deg) scale3d(${tilt.active ? 1.03 : 1}, ${tilt.active ? 1.03 : 1}, 1)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-72 sm:w-80 h-[440px] select-none cursor-pointer group ${className}`}
      onClick={onSelectExpand}
    >
      <div
        className="w-full h-full preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: combinedTransform }}
      >
        <div className="absolute inset-0 polaroid-paper rounded-2xl p-3.5 pb-5 flex flex-col justify-between">
          {/* Dynamic 3D Specular Light Glare */}
          {tilt.active && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, transparent 65%)`,
              }}
            />
          )}

          {/* Top Washi Tape Accent */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-tulip-200/75 backdrop-blur-xs -rotate-1 rounded-xs shadow-2xs border border-white/60 z-20 pointer-events-none" />

          {/* Photo or MP4 Video Frame */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden bg-tulip-50 border border-tulip-100">
            {isVideo ? (
              <video
                ref={videoRef}
                src={memory.image}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={memory.image}
                alt={memory.title}
                onError={(e) => {
                  if (memory.fallbackImage && e.currentTarget.src !== memory.fallbackImage) {
                    e.currentTarget.src = memory.fallbackImage;
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />

            {/* Date Pill on Photo/Video */}
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[11px] font-semibold text-tulip-800 shadow-xs inline-flex items-center gap-1">
              {isVideo && <Film className="w-3 h-3 text-tulip-600" />}
              {memory.date}
            </span>

            {/* Mute/Unmute Toggle when Polaroid contains an MP4 Video */}
            {isVideo && !isEditMode && (
              <button
                type="button"
                onClick={toggleVideoSound}
                className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-xs transition-all"
                title={isVideoMuted ? 'Activar sonido del video' : 'Silenciar video'}
              >
                {isVideoMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-tulip-300" />
                )}
              </button>
            )}

            {/* Expand Hint Badge */}
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 group-hover:bg-tulip-600 backdrop-blur-xs text-[11px] font-medium text-white transition-colors">
              <Maximize2 className="w-3 h-3" />
              Ver foto y reverso
            </span>

            {/* Optional Quick Upload Photo (.jpeg/.jpg/.png) or Video (.mp4) Button */}
            {isEditMode && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tulip-600 hover:bg-tulip-700 text-white text-xs font-semibold shadow-md cursor-pointer transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                Foto JPEG / MP4
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/*,video/mp4,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Polaroid Bottom Handwritten Area (Full 2-line support without ugly cutoffs) */}
          <div className="pt-2.5 px-1.5 text-center flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-900 leading-snug line-clamp-2">
                {memory.title}
              </h3>
              <p className="mt-1 font-handwriting text-lg sm:text-xl text-tulip-700 leading-tight line-clamp-2">
                {memory.caption}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <MapPin className="w-3 h-3 text-tulip-500 shrink-0" />
              <span className="truncate">{memory.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Gallery3D() {
  const [memories, setMemories] = useState(defaultMemories3D);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMemoryIndex, setExpandedMemoryIndex] = useState(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  // Automatically detect .jpeg, .jpg, .png, .webp, or .mp4 files in /public/fotos/ on mount
  useEffect(() => {
    let cancelled = false;

    async function detectAllMedia() {
      const resolved = await Promise.all(
        defaultMemories3D.map(async (item) => {
          const found = await resolveSlotMedia(item.slot, item.fallbackImage);
          return {
            ...item,
            image: found.url,
            mediaType: found.mediaType,
          };
        })
      );
      if (!cancelled) {
        setMemories(resolved);
      }
    }

    detectAllMedia();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-orbit for 3D carousel when active and modal is closed
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoPlaying || expandedMemoryIndex !== null) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % memories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [viewMode, isAutoPlaying, memories.length, expandedMemoryIndex]);

  // Keyboard navigation when a Polaroid is expanded in the center of the screen
  useEffect(() => {
    if (expandedMemoryIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setExpandedMemoryIndex(null);
      if (e.key === 'ArrowRight') {
        setIsModalFlipped(false);
        setExpandedMemoryIndex((prev) => (prev + 1) % memories.length);
      }
      if (e.key === 'ArrowLeft') {
        setIsModalFlipped(false);
        setExpandedMemoryIndex((prev) => (prev - 1 + memories.length) % memories.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedMemoryIndex, memories.length]);

  const handleOpenExpanded = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setIsModalFlipped(false);
    setExpandedMemoryIndex(index);
  };

  const handleCloseExpanded = () => {
    setExpandedMemoryIndex(null);
    setIsModalFlipped(false);
  };

  const handleReplaceMedia = (id, newUrl, mediaType = 'image') => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, image: newUrl, mediaType } : m))
    );
  };

  const handleReloadFromFolder = async () => {
    const resolved = await Promise.all(
      defaultMemories3D.map(async (item) => {
        const found = await resolveSlotMedia(item.slot, item.fallbackImage);
        return {
          ...item,
          image: found.url,
          mediaType: found.mediaType,
        };
      })
    );
    setMemories(resolved);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  // Compute 3D Coverflow transform for each item in Carousel mode
  const getCarouselItemStyle = (index) => {
    const total = memories.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        opacity: 0,
        pointerEvents: 'none',
        transform: `translateX(${diff * 180}px) translateZ(-400px) rotateY(0deg) scale(0.7)`,
        zIndex: 0,
      };
    }

    const translateX = diff * 235;
    const translateZ = -absDiff * 135;
    const rotateY = diff * -26;
    const scale = 1 - absDiff * 0.12;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.88 : 0.55;
    const zIndex = 20 - absDiff * 5;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const expandedMemory =
    expandedMemoryIndex !== null ? memories[expandedMemoryIndex] : null;
  const expandedIsVideo = expandedMemory
    ? isVideoSource(expandedMemory.image, expandedMemory.mediaType)
    : false;

  return (
    <section
      id="galeria-3d"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-tulip-50/70 via-cream-100 to-cream-50 border-t border-tulip-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-tulip-200 text-tulip-700 text-xs font-semibold tracking-widest uppercase shadow-xs">
            <Camera className="w-3.5 h-3.5 text-tulip-600" />
            Nuestros Recuerdos en 3D (JPEG y Videos MP4)
          </span>

          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-slate-900">
            Galería {' '}
            <span className="italic font-normal text-tulip-600">de los recuerdos</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Pasa el cursor sobre cada Polaroid para sentir el relieve en 3D y{' '}
            <strong className="font-semibold text-tulip-700">
              haz clic en cualquiera para agrandarla en el centro de la pantalla
            </strong>{' '}
            junto con su nota secreta del reverso.
          </p>
        </div>

        {/* Interactive 3D Controls Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* View Switcher: 3D Carousel vs 3D Tilt Table */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/90 border border-tulip-200 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-tulip-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              Carrusel 3D Giratorio
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-tulip-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Mesa de Polaroids 3D
            </button>
          </div>

          {/* Auto-orbit Toggle (Carousel mode) */}
          {viewMode === 'carousel' && (
            <button
              type="button"
              onClick={() => setIsAutoPlaying((p) => !p)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-tulip-50 border border-tulip-200 text-xs sm:text-sm font-medium text-slate-700 shadow-xs transition-all"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-tulip-600" />
                  Pausar giro
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-tulip-600" />
                  Auto-giro 3D
                </>
              )}
            </button>
          )}

          {/* Photo / Video Customizer Button */}
          <button
            type="button"
            onClick={() => setIsEditMode((p) => !p)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all shadow-xs ${
              isEditMode
                ? 'bg-tulip-100 border-tulip-400 text-tulip-900'
                : 'bg-white/90 hover:bg-tulip-50 border-tulip-200 text-slate-700'
            }`}
          >
            <Upload className="w-4 h-4 text-tulip-600" />
            {isEditMode ? 'Listo (Ocultar subida)' : 'Subir JPEG / Video MP4'}
          </button>

          <button
            type="button"
            onClick={handleReloadFromFolder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-tulip-200 text-xs text-slate-600 hover:text-tulip-700 shadow-xs"
            title="Volver a escanear la carpeta public/fotos/"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Actualizar carpeta
          </button>
        </div>

        {/* ================= MODE 1: 3D PERSPECTIVE CAROUSEL ================= */}
        {viewMode === 'carousel' ? (
          <div className="mt-10 relative">
            <div className="relative h-[470px] w-full flex items-center justify-center perspective-1400">
              <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                {memories.map((memory, index) => {
                  const style = getCarouselItemStyle(index);
                  const isCenter = index === activeIndex;

                  return (
                    <div
                      key={memory.id}
                      style={style}
                      className="absolute transition-all duration-700 ease-out"
                    >
                      <PolaroidCard3D
                        memory={memory}
                        onSelectExpand={() => {
                          if (isCenter) {
                            handleOpenExpanded(index);
                          } else {
                            setIsAutoPlaying(false);
                            setActiveIndex(index);
                          }
                        }}
                        enableMouseTilt={isCenter}
                        isEditMode={isEditMode}
                        onReplaceMedia={handleReplaceMedia}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel Controls & Indicators */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white hover:bg-tulip-50 border border-tulip-200 text-slate-700 hover:text-tulip-700 shadow-sm transition-all active:scale-95"
                aria-label="Recuerdo anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {memories.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === activeIndex
                        ? 'w-8 bg-tulip-600'
                        : 'w-2.5 bg-tulip-200 hover:bg-tulip-300'
                    }`}
                    aria-label={`Ir al recuerdo ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white hover:bg-tulip-50 border border-tulip-200 text-slate-700 hover:text-tulip-700 shadow-sm transition-all active:scale-95"
                aria-label="Siguiente recuerdo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Card Action Helper */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => handleOpenExpanded(activeIndex)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tulip-100/90 hover:bg-tulip-200/80 text-tulip-800 text-xs sm:text-sm font-semibold transition-all"
              >
                <Maximize2 className="w-4 h-4" />
                Agrandar Polaroid central y leer reverso
              </button>
            </div>
          </div>
        ) : (
          /* ================= MODE 2: 3D INTERACTIVE TILT TABLE GRID ================= */
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="transition-transform duration-300"
                style={{ transform: `rotate(${memory.rotation || 0}deg)` }}
              >
                <PolaroidCard3D
                  memory={memory}
                  onSelectExpand={() => handleOpenExpanded(index)}
                  enableMouseTilt={true}
                  isEditMode={isEditMode}
                  onReplaceMedia={handleReplaceMedia}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= EXPANDED CENTER MODAL: SINGLE POLAROID THAT FLIPS 180° ================= */}
      {expandedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-md animate-fadeIn cursor-pointer"
          onClick={handleCloseExpanded}
          role="dialog"
          aria-modal="true"
        >
          {/* Clicking anywhere outside this centered card minimizes it */}
          <div
            className="relative w-full max-w-md cursor-default flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar above the Polaroid */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-medium text-white/90 flex items-center gap-1.5">
                <span>🌷 Recuerdo {expandedMemoryIndex + 1} de {memories.length}</span>
                <span className="text-white/60">· Clic fuera para minimizar</span>
              </span>

              <button
                type="button"
                onClick={handleCloseExpanded}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md transition-all"
              >
                <X className="w-4 h-4" />
                Minimizar
              </button>
            </div>

            {/* Single Enlarged 3D Flipping Polaroid */}
            <div
              onClick={() => setIsModalFlipped((f) => !f)}
              className="w-full perspective-1400 cursor-pointer select-none"
              title="Haz clic en la tarjeta para girarla 180°"
            >
              <div
                className="relative w-full h-[500px] sm:h-[540px] preserve-3d transition-transform duration-700 ease-out"
                style={{
                  transform: isModalFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* ================= FRONT: ENLARGED PHOTO / VIDEO ================= */}
                <div className="absolute inset-0 backface-hidden polaroid-paper rounded-3xl p-4 sm:p-5 pb-6 flex flex-col justify-between shadow-2xl">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-tulip-200/80 backdrop-blur-xs -rotate-1 rounded-xs shadow-2xs border border-white/70 z-20 pointer-events-none" />

                  <div className="relative w-full h-76 sm:h-84 rounded-2xl overflow-hidden bg-slate-950/5 border border-tulip-100">
                    {expandedIsVideo ? (
                      <video
                        src={expandedMemory.image}
                        controls
                        autoPlay
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <img
                        src={expandedMemory.image}
                        alt={expandedMemory.title}
                        onError={(e) => {
                          if (
                            expandedMemory.fallbackImage &&
                            e.currentTarget.src !== expandedMemory.fallbackImage
                          ) {
                            e.currentTarget.src = expandedMemory.fallbackImage;
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-tulip-800 shadow-xs">
                      {expandedMemory.date}
                    </span>

                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-xs text-xs font-medium text-white shadow-xs">
                      <RotateCw className="w-3.5 h-3.5" />
                      Clic para girar al reverso
                    </span>
                  </div>

                  <div className="pt-4 px-2 text-center my-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 leading-snug">
                      {expandedMemory.title}
                    </h3>
                    <p className="mt-1.5 font-handwriting text-2xl text-tulip-700">
                      {expandedMemory.caption}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-tulip-500" />
                      <span>{expandedMemory.location}</span>
                    </div>
                  </div>
                </div>

                {/* ================= BACK: REVERSO DE LA POLAROID (180°) ================= */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 polaroid-back-paper rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-tulip-200 shadow-2xl">
                  <div className="flex items-start justify-between gap-3 border-b border-tulip-200/80 pb-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-tulip-600">
                        <Heart className="w-3.5 h-3.5 fill-tulip-500 text-tulip-500" />
                        Reverso de nuestra foto
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                        {expandedMemory.title}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-tulip-500" />
                        <span>{expandedMemory.date}</span>
                        <span>•</span>
                        <span>{expandedMemory.location}</span>
                      </p>
                    </div>

                    <div className="w-14 h-16 rounded-xl border-2 border-dashed border-tulip-300 bg-tulip-50/90 flex flex-col items-center justify-center text-center p-1.5 shrink-0 rotate-3 shadow-2xs">
                      <span className="text-xl leading-none">🌷</span>
                      <span className="text-[10px] font-bold tracking-tighter text-tulip-700 uppercase mt-1">
                        Para Leidi
                      </span>
                    </div>
                  </div>

                  <div className="my-auto py-4 lined-note">
                    <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-8">
                      “{expandedMemory.secretBackNote}”
                    </p>
                  </div>

                  <div className="pt-3 border-t border-tulip-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-serif italic text-sm text-tulip-800">
                      {coupleInfo.yourName}
                    </span>
                    <span className="text-tulip-600 font-semibold flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      Clic para volver a la foto
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls under the Enlarged Polaroid */}
            <div className="mt-4 w-full flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsModalFlipped(false);
                  setExpandedMemoryIndex(
                    (prev) => (prev - 1 + memories.length) % memories.length
                  );
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <button
                type="button"
                onClick={() => setIsModalFlipped((f) => !f)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-tulip-600 hover:bg-tulip-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                <RotateCw className="w-4 h-4" />
                {isModalFlipped ? 'Ver Foto Frontal' : 'Girar Polaroid (Ver Reverso)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsModalFlipped(false);
                  setExpandedMemoryIndex((prev) => (prev + 1) % memories.length);
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md transition-all"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
