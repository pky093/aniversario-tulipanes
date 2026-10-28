import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Heart,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Upload,
  RotateCcw,
  Volume2,
  VolumeX,
  Film,
  Maximize2,
  X,
} from 'lucide-react';
import { defaultLeidiPortraits, coupleInfo } from '../data/anniversaryData';

// Detect .jpeg, .jpg, .png, .webp, or .mp4 inside /public/leidi/ (supports leidi1..8 or foto1..8)
async function resolveLeidiSlotMedia(slot, fallbackUrl) {
  if (!slot) return { url: fallbackUrl, mediaType: 'image' };

  const candidates = [
    { url: `/leidi/leidi${slot}.jpeg`, type: 'image' },
    { url: `/leidi/leidi${slot}.jpg`, type: 'image' },
    { url: `/leidi/foto${slot}.jpeg`, type: 'image' },
    { url: `/leidi/foto${slot}.jpg`, type: 'image' },
    { url: `/leidi/leidi${slot}.png`, type: 'image' },
    { url: `/leidi/foto${slot}.png`, type: 'image' },
    { url: `/leidi/leidi${slot}.webp`, type: 'image' },
    { url: `/leidi/leidi${slot}.mp4`, type: 'video' },
    { url: `/leidi/foto${slot}.mp4`, type: 'video' },
    { url: `/leidi/video${slot}.mp4`, type: 'video' },
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

function MiniPolaroid3D({
  item,
  onSelectExpand,
  isEditMode = false,
  onReplaceMedia,
}) {
  const cardRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const isVideo = isVideoSource(item.image, item.mediaType);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -11;
    const rotateY = ((x - centerX) / centerX) * 11;
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
      onReplaceMedia(item.id, objectUrl, 'video');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onReplaceMedia(item.id, reader.result, 'image');
      }
    };
    reader.readAsDataURL(file);
  };

  const combinedTransform = `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${
    tilt.rotateY
  }deg) scale3d(${tilt.active ? 1.04 : 1}, ${tilt.active ? 1.04 : 1}, 1)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelectExpand}
      className="relative w-full max-w-[235px] h-[315px] select-none cursor-pointer group"
    >
      <div
        className="w-full h-full preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: combinedTransform }}
      >
        <div className="absolute inset-0 polaroid-paper rounded-2xl p-2.5 pb-4 flex flex-col justify-between">
          {/* Dynamic 3D Glare */}
          {tilt.active && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.48) 0%, transparent 65%)`,
              }}
            />
          )}

          {/* Mini Washi Tape */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-tulip-200/80 backdrop-blur-xs rotate-1 rounded-xs border border-white/70 z-20 pointer-events-none" />

          {/* Mini Polaroid Photo/Video Frame */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-tulip-50 border border-tulip-100">
            {isVideo ? (
              <video
                src={item.image}
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.image}
                alt={item.phrase}
                onError={(e) => {
                  if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                    e.currentTarget.src = item.fallbackImage;
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Top Badge */}
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-tulip-800 shadow-2xs inline-flex items-center gap-1">
              {isVideo && <Film className="w-2.5 h-2.5 text-tulip-600" />}
              {item.badge}
            </span>

            {/* Video Sound Button */}
            {isVideo && !isEditMode && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoMuted((p) => !p);
                }}
                className="absolute top-2 right-2 z-20 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/70 text-white"
              >
                {isVideoMuted ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3 text-tulip-300" />
                )}
              </button>
            )}

            {/* Hover Expand Pill */}
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/65 group-hover:bg-tulip-600 text-[10px] font-medium text-white transition-colors">
              <Maximize2 className="w-2.5 h-2.5" />
              Ver nota
            </span>

            {/* Quick Upload Button in Edit Mode */}
            {isEditMode && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tulip-600 hover:bg-tulip-700 text-white text-[10px] font-semibold shadow-md cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                Subir
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/*,video/mp4,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Mini Polaroid Compliment Phrase */}
          <div className="pt-2 px-1 text-center flex-1 flex flex-col justify-center">
            <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight group-hover:text-tulip-700 transition-colors">
              “{item.phrase}”
            </h3>
            <p className="mt-0.5 font-handwriting text-base text-tulip-700 leading-snug line-clamp-2">
              {item.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeidiMiniGallery() {
  const [portraits, setPortraits] = useState(defaultLeidiPortraits);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Detect files in /public/leidi/ on mount
  useEffect(() => {
    let cancelled = false;
    async function loadLeidiMedia() {
      const resolved = await Promise.all(
        defaultLeidiPortraits.map(async (item) => {
          const found = await resolveLeidiSlotMedia(item.slot, item.fallbackImage);
          return {
            ...item,
            image: found.url,
            mediaType: found.mediaType,
          };
        })
      );
      if (!cancelled) {
        setPortraits(resolved);
      }
    }
    loadLeidiMedia();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keyboard navigation in expanded modal
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setExpandedIndex(null);
      if (e.key === 'ArrowRight') {
        setIsModalFlipped(false);
        setExpandedIndex((prev) => (prev + 1) % portraits.length);
      }
      if (e.key === 'ArrowLeft') {
        setIsModalFlipped(false);
        setExpandedIndex((prev) => (prev - 1 + portraits.length) % portraits.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedIndex, portraits.length]);

  const handleReplaceMedia = (id, newUrl, mediaType = 'image') => {
    setPortraits((prev) =>
      prev.map((p) => (p.id === id ? { ...p, image: newUrl, mediaType } : p))
    );
  };

  const handleReloadFolder = async () => {
    const resolved = await Promise.all(
      defaultLeidiPortraits.map(async (item) => {
        const found = await resolveLeidiSlotMedia(item.slot, item.fallbackImage);
        return {
          ...item,
          image: found.url,
          mediaType: found.mediaType,
        };
      })
    );
    setPortraits(resolved);
  };

  const expandedItem = expandedIndex !== null ? portraits[expandedIndex] : null;
  const expandedIsVideo = expandedItem
    ? isVideoSource(expandedItem.image, expandedItem.mediaType)
    : false;

  return (
    <section
      id="galeria-leidi"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 via-tulip-50/50 to-cream-100 border-t border-tulip-100"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tulip-100/90 border border-tulip-200 text-tulip-800 text-xs font-semibold tracking-widest uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-tulip-600" />
            Solo Tú
          </span>

          <h2 className="mt-4 text-3xl sm:text-5xl font-serif font-semibold tracking-tight text-slate-900">
            La Mujer Más Hermosa:{' '}
            <span className="italic font-normal text-tulip-600">
              {coupleInfo.partnerName}
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Un rincón dedicado únicamente a tu belleza, tu ternura y tu luz.{' '}
            <strong className="font-semibold text-tulip-700">
              Toca cualquiera de tus mini-Polaroids
            </strong>{' '}
            para verla en grande junto con lo que pienso cada vez que te miro.
          </p>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditMode((p) => !p)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                isEditMode
                  ? 'bg-tulip-100 border-tulip-400 text-tulip-900'
                  : 'bg-white hover:bg-tulip-50 border-tulip-200 text-slate-700'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-tulip-600" />
              {isEditMode ? 'Listo' : 'Subir fotos de Leidi (JPEG / MP4)'}
            </button>

            <button
              type="button"
              onClick={handleReloadFolder}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-tulip-50 border border-tulip-200 text-xs text-slate-600 hover:text-tulip-700"
              title="Escanear carpeta public/leidi/"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Actualizar carpeta
            </button>
          </div>
        </div>

        {/* 4-Column Grid of Smaller Mini-Polaroids */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {portraits.map((item, idx) => (
            <div
              key={item.id}
              className="w-full flex justify-center transition-transform duration-300"
              style={{ transform: `rotate(${item.rotation || 0}deg)` }}
            >
              <MiniPolaroid3D
                item={item}
                onSelectExpand={() => {
                  setIsModalFlipped(false);
                  setExpandedIndex(idx);
                }}
                isEditMode={isEditMode}
                onReplaceMedia={handleReplaceMedia}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= EXPANDED CENTER MODAL FOR LEIDI'S PORTRAIT + REVERSO ================= */}
      {expandedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-md animate-fadeIn cursor-pointer"
          onClick={() => setExpandedIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-medium text-white/85">
                🌸 Para Leidi ({expandedIndex + 1} de {portraits.length}) · Clic fuera para minimizar
              </span>

              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md transition-all"
              >
                <X className="w-4 h-4" />
                Minimizar
              </button>
            </div>

            {/* Side-by-Side Photo + Reverso */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Left: Enlarged Mini Polaroid */}
              <div className="md:col-span-6 flex justify-center">
                <div
                  onClick={() => setIsModalFlipped((f) => !f)}
                  className="w-full max-w-sm perspective-1400 cursor-pointer"
                >
                  <div
                    className="relative w-full min-h-[420px] preserve-3d transition-transform duration-700 ease-out"
                    style={{
                      transform: isModalFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden polaroid-paper rounded-3xl p-4 pb-6 flex flex-col justify-between shadow-2xl">
                      <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-slate-950/5 border border-tulip-100">
                        {expandedIsVideo ? (
                          <video
                            src={expandedItem.image}
                            controls
                            autoPlay
                            loop
                            playsInline
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-full object-contain bg-black"
                          />
                        ) : (
                          <img
                            src={expandedItem.image}
                            alt={expandedItem.phrase}
                            onError={(e) => {
                              if (
                                expandedItem.fallbackImage &&
                                e.currentTarget.src !== expandedItem.fallbackImage
                              ) {
                                e.currentTarget.src = expandedItem.fallbackImage;
                              }
                            }}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-tulip-800 shadow-xs">
                          {expandedItem.badge}
                        </span>
                      </div>

                      <div className="pt-4 text-center">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                          “{expandedItem.phrase}”
                        </h3>
                        <p className="mt-1 font-handwriting text-xl text-tulip-700">
                          {expandedItem.caption}
                        </p>
                      </div>
                    </div>

                    {/* Back (when flipped) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 polaroid-back-paper rounded-3xl p-6 flex flex-col justify-between border border-tulip-200 shadow-2xl">
                      <span className="text-xs font-semibold uppercase tracking-widest text-tulip-600">
                        {expandedItem.badge}
                      </span>
                      <div className="my-auto py-3 lined-note">
                        <p className="font-handwriting text-2xl text-slate-800 leading-8">
                          “{expandedItem.secretBackNote}”
                        </p>
                      </div>
                      <span className="text-xs text-tulip-600 font-semibold flex items-center justify-end gap-1">
                        <RotateCw className="w-3.5 h-3.5" />
                        Volver a la foto
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Reverso Card Always Visible */}
              <div className="md:col-span-6 flex flex-col justify-between polaroid-back-paper rounded-3xl p-6 sm:p-7 border border-tulip-200 shadow-2xl">
                <div>
                  <div className="flex items-start justify-between gap-3 border-b border-tulip-200/80 pb-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-tulip-600">
                        <Heart className="w-3.5 h-3.5 fill-tulip-500 text-tulip-500" />
                        {expandedItem.badge}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                        “{expandedItem.phrase}”
                      </h3>
                    </div>

                    <div className="w-12 h-14 rounded-xl border-2 border-dashed border-tulip-300 bg-tulip-50 flex flex-col items-center justify-center p-1 rotate-3 shrink-0">
                      <span className="text-lg">🌷</span>
                      <span className="text-[9px] font-bold text-tulip-700 uppercase">
                        Leidi
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 py-2 lined-note">
                    <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-8">
                      “{expandedItem.secretBackNote}”
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-tulip-200/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalFlipped(false);
                      setExpandedIndex(
                        (prev) => (prev - 1 + portraits.length) % portraits.length
                      );
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white hover:bg-tulip-50 border border-tulip-200 text-xs font-medium text-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>

                  <span className="font-serif italic text-xs text-tulip-800">
                    {coupleInfo.yourName}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalFlipped(false);
                      setExpandedIndex((prev) => (prev + 1) % portraits.length);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-tulip-600 hover:bg-tulip-700 text-xs font-medium text-white"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
