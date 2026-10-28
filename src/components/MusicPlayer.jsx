import React, { useState, useRef, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  ChevronDown,
  Disc3,
} from 'lucide-react';
import { musicConfig } from '../data/anniversaryData';

export function MusicPlayer() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(musicConfig.defaultVolume ?? 0.6);
  const [isExpanded, setIsExpanded] = useState(false);
  const [songTitle, setSongTitle] = useState(musicConfig.title);
  const [audioSrc, setAudioSrc] = useState(musicConfig.audioUrl);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-play immediately when the page opens, with instant fallback on first gesture if browser blocks cold autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = musicConfig.defaultVolume ?? 0.6;

    let started = false;

    const tryPlay = async () => {
      if (started || !audioRef.current) return;
      try {
        await audioRef.current.play();
        started = true;
        setIsPlaying(true);
        removeUnlockListeners();
      } catch {
        // Browser waits for first interaction
      }
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
      window.removeEventListener('scroll', tryPlay);
    };

    // 1. Try playing immediately on page load
    tryPlay();

    // 2. Also unlock on the very first touch/click/scroll if browser blocked cold autoplay
    window.addEventListener('click', tryPlay, { passive: true });
    window.addEventListener('touchstart', tryPlay, { passive: true });
    window.addEventListener('pointerdown', tryPlay, { passive: true });
    window.addEventListener('keydown', tryPlay, { passive: true });
    window.addEventListener('scroll', tryPlay, { passive: true });

    return () => {
      removeUnlockListeners();
    };
  }, []);

  // Lower volume gently when the final anniversary video opens, restore when closed
  useEffect(() => {
    const handleVideoOpen = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = Math.min(volume, 0.15);
      }
    };
    const handleVideoClose = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = volume;
      }
    };

    window.addEventListener('anniversary-video-open', handleVideoOpen);
    window.addEventListener('anniversary-video-close', handleVideoClose);
    return () => {
      window.removeEventListener('anniversary-video-open', handleVideoOpen);
      window.removeEventListener('anniversary-video-close', handleVideoClose);
    };
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // ignore
      }
    }
  };

  const handleUploadMp3 = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    setSongTitle(cleanName);
    setAudioSrc(objectUrl);

    setTimeout(async () => {
      if (audioRef.current) {
        audioRef.current.load();
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // user can press play
        }
      }
    }, 80);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start">
      {/* HTML5 Audio Element with autoPlay */}
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Expanded Music Control Card */}
      {isExpanded && (
        <div className="mb-3 w-72 rounded-2xl bg-white/95 backdrop-blur-md border border-tulip-200 p-4 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-tulip-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-tr from-tulip-500 to-tulip-300 flex items-center justify-center text-white shrink-0 shadow-xs ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <Disc3 className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {songTitle}
                </p>
                <p className="text-[11px] text-tulip-600 truncate">
                  {musicConfig.artist}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-tulip-50"
              aria-label="Minimizar reproductor"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="mt-3 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="text-slate-600 hover:text-tulip-600 transition-colors"
              aria-label="Silenciar o activar sonido"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-tulip-600" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setIsMuted(false);
                setVolume(parseFloat(e.target.value));
              }}
              className="w-full accent-tulip-600 h-1.5 bg-tulip-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Upload Custom MP3 File Button */}
          <div className="mt-3 pt-3 border-t border-tulip-100 flex items-center justify-between gap-2">
            <label className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-tulip-50 hover:bg-tulip-100 border border-tulip-200 text-tulip-800 text-xs font-semibold cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5 text-tulip-600" />
              <span>Cambiar canción (.mp3)</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleUploadMp3}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {/* Floating Compact Pill (Bottom-left so Windows watermark never covers it) */}
      <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-tulip-200 shadow-lg">
        <button
          type="button"
          onClick={togglePlay}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
            isPlaying
              ? 'bg-tulip-600 text-white shadow-xs'
              : 'bg-tulip-100 hover:bg-tulip-200 text-tulip-900'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Amarte por mil años más 🎹</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Reproducir Música 🎵</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded((e) => !e)}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cream-100 hover:bg-tulip-50 text-slate-700 hover:text-tulip-700 transition-colors"
          title="Volumen y opciones de música"
          aria-label="Opciones de música"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <Music className="w-4 h-4 text-tulip-600" />
          )}
        </button>
      </div>
    </div>
  );
}
