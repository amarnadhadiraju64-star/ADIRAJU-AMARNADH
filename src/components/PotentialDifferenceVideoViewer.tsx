import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Zap,
  Hand,
  Film,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  X,
  BookOpen,
  LayoutGrid
} from 'lucide-react';

interface PotentialDifferenceVideoViewerProps {
  className?: string;
}

export const PotentialDifferenceVideoViewer: React.FC<PotentialDifferenceVideoViewerProps> = ({
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active tab: 'all' shows BOTH the Photo & Video together side-by-side!
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'photo' | 'interactive'>('all');

  // Video playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(4);

  // Photo modal & zoom state
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState<boolean>(false);
  const [photoZoom, setPhotoZoom] = useState<number>(1);

  // Interactive mode state
  const [interactiveProgress, setInteractiveProgress] = useState<number>(0.5); // 0 = start, 1 = at Point B
  const [isAutoAnimating, setIsAutoAnimating] = useState<boolean>(false);

  // Video controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  // Interactive physics
  const appliedForce = 10;
  const displacement = interactiveProgress * 0.2;
  const workDone = appliedForce * displacement;
  const chargeQ = 1;
  const potentialDiff = workDone / chargeQ;

  const chargeSvgX = 460 - interactiveProgress * 260;
  const chargeSvgY = 250;
  const fingerTipX = chargeSvgX + 8;
  const fingerTipY = chargeSvgY + 12;

  useEffect(() => {
    let animId: number;
    if (isAutoAnimating && activeTab === 'interactive') {
      const step = () => {
        setInteractiveProgress((prev) => {
          if (prev >= 1) return 0;
          return Math.min(1, prev + 0.012);
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoAnimating, activeTab]);

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border-2 border-amber-400/40 bg-slate-950 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Top Banner Header matching the uploaded photo and video */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-slate-800 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Visual Demonstration &amp; Study Photo</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                పొటెన్షియల్ డిఫరెన్స్ (Potential Difference)
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>థియరీ &amp; కాన్సెప్ట్స్: పొటెన్షియల్ డిఫరెన్స్</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Work done on unit charge to displace it from A to B:{' '}
              <strong className="text-amber-300 font-mono">W = F × S</strong>,{' '}
              <strong className="text-emerald-400 font-mono">V = W / q</strong>,{' '}
              <strong className="text-cyan-300 font-mono">1V = 1J / 1C</strong>
            </p>
          </div>

          {/* Tab Selector: All-in-One / Video / Photo / Interactive */}
          <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto bg-slate-900/90 border border-slate-700/80 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>⚡ Both Video &amp; Photo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>📹 Video</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('photo')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'photo'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>🖼️ Photo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interactive'
                  ? 'bg-emerald-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>🖐️ Push</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. DUAL SHOWCASE (PHOTO & VIDEO SIDE-BY-SIDE / STACKED) */}
      {/* ======================================================== */}
      {activeTab === 'all' && (
        <div className="p-3 sm:p-5 space-y-4 bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {/* Left Card: Uploaded Study Photo */}
            <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Classroom Study Chart (Uploaded Photo)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsPhotoLightboxOpen(true)}
                  className="text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3 text-amber-400" />
                  <span>Enlarge</span>
                </button>
              </div>

              <div
                onClick={() => setIsPhotoLightboxOpen(true)}
                className="flex-1 bg-stone-900/80 flex items-center justify-center p-2 cursor-pointer group relative overflow-hidden"
              >
                <img
                  src="/images/potential_difference_photo.png"
                  alt="Potential Difference Study Chart"
                  className="w-full h-auto max-h-[360px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors pointer-events-none" />
                <span className="absolute bottom-3 right-3 bg-slate-950/80 text-[10px] text-amber-300 px-2 py-0.5 rounded border border-amber-400/30 backdrop-blur-xs">
                  🔍 Click to Zoom Chart
                </span>
              </div>
            </div>

            {/* Right Card: Uploaded Animated Video */}
            <div className="flex flex-col bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Animated Physics Demonstration (Uploaded Video)</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded">
                  HD H.264
                </span>
              </div>

              <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[220px]">
                <video
                  ref={videoRef}
                  src="/videos/potential_difference.mp4"
                  poster="/videos/potential_difference_poster.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full max-h-[360px] object-contain cursor-pointer"
                />
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                  </button>
                )}
              </div>

              {/* Video mini controls */}
              <div className="bg-slate-900/95 border-t border-slate-800 p-2 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="px-2 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-slate-950" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 1.5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => changeSpeed(s)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold cursor-pointer ${
                        playbackSpeed === s
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer ml-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Annotation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Unit Charge</span>
              <span className="font-mono font-bold text-amber-300 text-sm">q = 1 C</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Path Traversed</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">A → B (Dist S)</span>
            </div>
            <div className="bg-slate-900 border border-amber-500/30 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">Work Formula</span>
              <span className="font-mono font-black text-amber-300 text-sm">W = F × S</span>
            </div>
            <div className="bg-slate-900 border border-emerald-500/30 p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Potential Difference</span>
              <span className="font-mono font-black text-emerald-300 text-sm">V = W / q (1V = 1J/1C)</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. FULL VIDEO VIEW */}
      {/* ======================================================== */}
      {activeTab === 'video' && (
        <div className="relative bg-slate-950 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/potential_difference.mp4"
              poster="/videos/potential_difference_poster.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
              >
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </button>
            )}

            <div className="absolute top-3 left-3 pointer-events-none bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] text-amber-300 font-bold backdrop-blur-xs shadow-md">
              <span>⚡ W = F × S → V = W / q</span>
            </div>
          </div>

          {/* Video Control Bar */}
          <div className="w-full bg-slate-900/95 border-t border-slate-800 p-2.5 sm:p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-10 text-right">{currentTime.toFixed(1)}s</span>
              <input
                type="range"
                min="0"
                max={duration || 4}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="w-10 text-left">{(duration || 4).toFixed(1)}s</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors cursor-pointer flex items-center gap-1 text-xs px-2.5"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  title="Replay Video"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-semibold mr-1 hidden sm:inline">Speed:</span>
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => changeSpeed(s)}
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                      playbackSpeed === s
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleFullscreen}
                  title="Fullscreen"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer ml-1"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. FULL PHOTO VIEW */}
      {/* ======================================================== */}
      {activeTab === 'photo' && (
        <div className="bg-slate-950 p-3 sm:p-5 flex flex-col items-center">
          <div className="relative w-full max-w-[760px] rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-stone-900 shadow-2xl group">
            <img
              src="/images/potential_difference_photo.png"
              alt="Potential Difference Study Chart"
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              loading="eager"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
              <button
                type="button"
                onClick={() => setIsPhotoLightboxOpen(true)}
                className="px-2.5 py-1 text-xs font-bold text-amber-300 hover:text-white bg-amber-400/20 hover:bg-amber-400/30 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Enlarge Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. INTERACTIVE PUSH VIEW */}
      {/* ======================================================== */}
      {activeTab === 'interactive' && (
        <div className="bg-slate-950 p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full max-w-[640px] aspect-[16/11] rounded-xl overflow-hidden border border-slate-800 bg-[#f8fafc] relative shadow-inner">
            <svg viewBox="0 0 640 440" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="interactiveFieldGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#eff6ff" />
                  <stop offset="100%" stopColor="#dbeafe" />
                </radialGradient>
                <filter id="interactiveHandShadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.25" />
                </filter>
              </defs>

              <rect x="0" y="0" width="640" height="54" fill="#0f172a" />
              <text x="320" y="24" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#facc15" textAnchor="middle">
                థియరీ &amp; కాన్సెప్ట్స్: పొటెన్షియల్ డిఫరెన్స్ (V = W / q)
              </text>
              <text x="320" y="44" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                Move charge (+q) into electric field against electrostatic force: W = F × S
              </text>

              <ellipse cx="320" cy="245" rx="270" ry="155" fill="url(#interactiveFieldGrad)" stroke="#60a5fa" strokeWidth="2.5" />

              <rect x="365" y="110" width="180" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" opacity="0.95" />
              <text x="455" y="138" fontFamily="Georgia, serif" fontSize="21" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                W = F × S
              </text>

              <g transform="translate(200, 250)">
                <circle cx="0" cy="0" r="8" fill="#dc2626" />
                <circle cx="0" cy="0" r="16" fill="#ef4444" fillOpacity="0.25" />
                <text x="-18" y="7" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#0f172a" textAnchor="end">B</text>
                <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#dc2626" textAnchor="middle">Point B</text>
              </g>

              <text x="65" y="380" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#0f172a">
                Electric field
              </text>

              {interactiveProgress > 0.05 && (
                <g>
                  <line x1={chargeSvgX - 25} y1={chargeSvgY} x2={chargeSvgX - 25 - interactiveProgress * 80} y2={chargeSvgY} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  <polygon
                    points={`${chargeSvgX - 25 - interactiveProgress * 80 - 2},${chargeSvgY} ${chargeSvgX - 25 - interactiveProgress * 80 + 8},${chargeSvgY - 6} ${chargeSvgX - 25 - interactiveProgress * 80 + 8},${chargeSvgY + 6}`}
                    fill="#2563eb"
                  />
                  <text x={chargeSvgX - 25 - (interactiveProgress * 80) / 2} y={chargeSvgY - 10} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">
                    F_ext = 10 N
                  </text>
                </g>
              )}

              <g transform={`translate(${chargeSvgX}, ${chargeSvgY})`}>
                <circle cx="0" cy="0" r="24" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="17" fill="#ef4444" />
                <text x="0" y="7" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">+</text>
                <text x="24" y="10" fontFamily="Georgia, serif" fontSize="26" fontStyle="italic" fontWeight="bold" fill="#7f1d1d">q</text>
              </g>

              <g transform={`translate(${fingerTipX}, ${fingerTipY})`} filter="url(#interactiveHandShadow)">
                <path d="M 50 140 C 60 170, 110 200, 170 200 C 210 200, 240 180, 230 130 C 220 70, 170 60, 130 65 C 105 70, 80 85, 70 95 Z" fill="#fca582" stroke="#7c2d12" strokeWidth="2.5" />
                <path d="M 75 90 C 85 75, 120 75, 120 100 C 120 115, 95 125, 75 110 Z" fill="#f87171" fillOpacity="0.2" stroke="#7c2d12" strokeWidth="2" />
                <path d="M 90 115 C 100 105, 135 105, 135 125 C 135 140, 110 148, 90 135 Z" fill="#f87171" fillOpacity="0.2" stroke="#7c2d12" strokeWidth="2" />
                <path d="M 105 138 C 115 130, 145 130, 145 150 C 145 165, 120 170, 105 158 Z" fill="#f87171" fillOpacity="0.2" stroke="#7c2d12" strokeWidth="2" />
                <path d="M 0 0 C 6 -12, 22 -14, 30 -6 C 42 6, 52 24, 65 48 C 75 68, 85 88, 92 110 C 78 120, 64 110, 52 90 C 40 70, 28 45, 16 25 C 8 12, -4 6, 0 0 Z" fill="#fca582" stroke="#7c2d12" strokeWidth="2.8" />
                <path d="M 6 -4 C 14 -10, 22 -6, 24 2 C 22 8, 14 6, 8 2 Z" fill="#ffedd5" stroke="#9a3412" strokeWidth="1.2" />
                <path d="M 32 20 Q 38 24 44 26" stroke="#9a3412" strokeWidth="1.5" fill="none" />
                <path d="M 52 56 Q 60 60 68 64" stroke="#9a3412" strokeWidth="1.5" fill="none" />
                <path d="M 28 85 C 18 100, 25 125, 45 140 C 60 150, 75 140, 70 120 C 65 100, 45 80, 28 85 Z" fill="#fca582" stroke="#7c2d12" strokeWidth="2" />
              </g>

              <rect x="0" y="405" width="640" height="35" fill="#0f172a" />
              <text x="320" y="427" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#93c5fd" textAnchor="middle">
                {interactiveProgress >= 0.95
                  ? '🎯 Target Point B Reached! Full Work Done W = F × S Accumulated!'
                  : '🖐️ Drag slider below or click Auto-Push to displace charge (+q) into Point B'}
              </text>
            </svg>
          </div>

          {/* Real-time Meters */}
          <div className="w-full max-w-[640px] mt-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Displacement (S)</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white">{(displacement * 100).toFixed(0)} cm</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Applied Force (F)</span>
                <span className="text-sm sm:text-base font-mono font-bold text-amber-300">10 N</span>
              </div>
              <div className="bg-slate-900 border border-amber-500/30 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Work Done (W = F·S)</span>
                <span className="text-sm sm:text-base font-mono font-black text-amber-300">{workDone.toFixed(2)} J</span>
              </div>
              <div className="bg-slate-900 border border-emerald-500/30 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Potential (V = W/q)</span>
                <span className="text-sm sm:text-base font-mono font-black text-emerald-300">{potentialDiff.toFixed(2)} V</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>🖐️ Push Finger into Point B:</span>
                  <span className="font-mono text-amber-400">{Math.round(interactiveProgress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={interactiveProgress}
                  onChange={(e) => {
                    setIsAutoAnimating(false);
                    setInteractiveProgress(parseFloat(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoAnimating(!isAutoAnimating)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isAutoAnimating
                      ? 'bg-rose-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {isAutoAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoAnimating ? 'Stop Animation' : 'Auto Push'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoAnimating(false);
                    setInteractiveProgress(0);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  title="Reset Position"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Physics Derivation & Educational Callouts */}
      <div className="bg-slate-900/80 border-t border-slate-800 p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>తెలుగు వివరణ (AP SSC Exam Concept):</span>
            </span>
            <p className="text-slate-200">
              ఏకాంక ధన ఆవేశాన్ని (<strong className="text-white">q</strong>) విద్యుత్ క్షేత్రంలో ప్రారంభ బిందువు <strong className="text-white">A</strong> నుండి తుది బిందువు <strong className="text-white">B</strong> వద్దకు విద్యుత్ బలానికి వ్యతిరేకంగా జరపడానికి చేసిన పనిని (<strong className="text-amber-300">W = F × S</strong>) <strong>పొటెన్షియల్ డిఫరెన్స్ (V)</strong> అంటారు.
            </p>
            <div className="font-mono text-emerald-300 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
              <span>సూత్రం: V = W / q</span>
              <span>1V = 1J / 1C</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scientific Derivation &amp; Formula:</span>
            </span>
            <p className="text-slate-200">
              Electric potential difference is the work done (<strong className="text-amber-300 font-mono">W = F × S</strong>) on unit positive charge <strong className="text-white font-mono">q</strong> to displace it from point A to point B:
            </p>
            <div className="font-mono text-cyan-300 font-bold bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
              <span>Formula: V = W / q</span>
              <span>1 Volt = 1 Joule / 1 Coulomb (1 V = 1 J / 1 C)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo */}
      {isPhotoLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-sm sm:text-base">
                థియరీ &amp; కాన్సెప్ట్స్: పొటెన్షియల్ డిఫరెన్స్ (Study Chart)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPhotoZoom((z) => Math.max(0.75, z - 0.25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">
                {Math.round(photoZoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setPhotoZoom((z) => Math.min(2.5, z + 0.25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhotoZoom(1);
                  setIsPhotoLightboxOpen(false);
                }}
                className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white cursor-pointer ml-2"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full max-w-5xl flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src="/images/potential_difference_photo.png"
              alt="Potential Difference High-Res Study Chart"
              style={{ transform: `scale(${photoZoom})` }}
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};
