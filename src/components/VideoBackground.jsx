"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const VIDEO_SOURCES = {
  realistic: {
    light: {
      src: "/videos/snowy-sunny.mp4",
      poster: "/videos/posters/snowy-sunny.jpg",
    },
    dark: {
      src: "/videos/rainy-night.mp4",
      poster: "/videos/posters/rainy-night.jpg",
    },
  },
  animated: {
    light: {
      src: "/videos/daylight-animated.mp4",
      poster: "/videos/posters/daylight-animated.jpg",
    },
    dark: {
      src: "/videos/rainy-night-animated.mp4",
      poster: "/videos/posters/rainy-night-animated.jpg",
    },
  },
};

const ALL_VIDEO_URLS = [
  "/videos/snowy-sunny.mp4",
  "/videos/rainy-night.mp4",
  "/videos/daylight-animated.mp4",
  "/videos/rainy-night-animated.mp4",
];

const ALL_POSTER_URLS = [
  "/videos/posters/snowy-sunny.jpg",
  "/videos/posters/rainy-night.jpg",
  "/videos/posters/daylight-animated.jpg",
  "/videos/posters/rainy-night-animated.jpg",
];

const STALL_MS = 3000;

const layerStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
  transition: "opacity 0.8s ease-in-out",
};

const VideoBackground = () => {
  const { mode = "dark", bgMode = "realistic" } = useContext(ThemeContext);
  const currentMode = mode === "light" ? "light" : "dark";
  const currentBgMode = bgMode === "animated" ? "animated" : "realistic";

  const currentAsset = VIDEO_SOURCES[currentBgMode][currentMode];

  // Two video slots for smooth crossfade without keeping multiple videos active in memory
  const slot0Ref = useRef(null);
  const slot1Ref = useRef(null);

  const [activeSlot, setActiveSlot] = useState(0);
  const [slot0, setSlot0] = useState({ src: currentAsset.src, poster: currentAsset.poster });
  const [slot1, setSlot1] = useState({ src: "", poster: "" });

  const [ready, setReady] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioEnabledRef = useRef(false);

  const activeSrcRef = useRef(currentAsset.src);
  const switchTimeoutRef = useRef(null);

  // Keep audioEnabledRef in sync
  useEffect(() => {
    audioEnabledRef.current = audioEnabled;
  }, [audioEnabled]);

  // Pre-load all posters immediately and pre-warm remaining videos during idle
  useEffect(() => {
    // 1. Preload posters immediately so theme switching has instant visual backing
    ALL_POSTER_URLS.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // 2. Pre-warm remaining videos in browser HTTP cache when CPU/network is idle
    const prewarmVideos = () => {
      ALL_VIDEO_URLS.forEach((url) => {
        fetch(url, { priority: "low", cache: "force-cache" }).catch(() => {});
      });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(prewarmVideos, { timeout: 4000 });
        return () => window.cancelIdleCallback(id);
      } else {
        const timer = setTimeout(prewarmVideos, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Handle theme or bgMode change with graceful, ready-gated crossfade
  useEffect(() => {
    const nextAsset = VIDEO_SOURCES[currentBgMode][currentMode];
    if (nextAsset.src === activeSrcRef.current) return;

    activeSrcRef.current = nextAsset.src;
    const targetSlot = activeSlot === 0 ? 1 : 0;
    const targetRef = targetSlot === 0 ? slot0Ref : slot1Ref;
    const prevRef = activeSlot === 0 ? slot0Ref : slot1Ref;

    // Clear any pending switch cleanup
    if (switchTimeoutRef.current) {
      clearTimeout(switchTimeoutRef.current);
      switchTimeoutRef.current = null;
    }

    // Load new asset into target slot state
    if (targetSlot === 0) {
      setSlot0({ src: nextAsset.src, poster: nextAsset.poster });
    } else {
      setSlot1({ src: nextAsset.src, poster: nextAsset.poster });
    }

    const targetEl = targetRef.current;
    if (!targetEl) return;

    // Configure new target video
    targetEl.src = nextAsset.src;
    targetEl.volume = 1.0;
    targetEl.muted = !audioEnabledRef.current;

    let hasTransitioned = false;

    const performTransition = () => {
      if (hasTransitioned) return;
      hasTransitioned = true;

      // Start crossfade to new video
      setActiveSlot(targetSlot);
      setReady(true);

      // Once crossfade duration finishes (850ms), safely pause old video
      switchTimeoutRef.current = setTimeout(() => {
        const prevEl = prevRef.current;
        if (prevEl) {
          prevEl.pause();
          prevEl.muted = true;
        }
      }, 850);
    };

    // Listen for when target video can smoothly play
    const onTargetPlaying = () => {
      performTransition();
      targetEl.removeEventListener("playing", onTargetPlaying);
      targetEl.removeEventListener("canplay", onTargetCanPlay);
    };

    const onTargetCanPlay = () => {
      performTransition();
      targetEl.removeEventListener("playing", onTargetPlaying);
      targetEl.removeEventListener("canplay", onTargetCanPlay);
    };

    targetEl.addEventListener("playing", onTargetPlaying);
    targetEl.addEventListener("canplay", onTargetCanPlay);

    // Start playback attempt
    targetEl.play().catch(() => {
      targetEl.muted = true;
      targetEl.play().catch(() => {});
    });

    // Fallback: If network buffering takes >3.5s, transition anyway so poster displays
    const fallbackTimer = setTimeout(() => {
      performTransition();
      targetEl.removeEventListener("playing", onTargetPlaying);
      targetEl.removeEventListener("canplay", onTargetCanPlay);
    }, 3500);

    return () => {
      clearTimeout(fallbackTimer);
      targetEl.removeEventListener("playing", onTargetPlaying);
      targetEl.removeEventListener("canplay", onTargetCanPlay);
    };
  }, [currentMode, currentBgMode, activeSlot]);

  // Initial playback on mount
  useEffect(() => {
    const el = slot0Ref.current;
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
  }, []);

  // Freeze / stall recovery for both slots without destructive el.load() resets
  useEffect(() => {
    const els = [
      { key: "slot0", ref: slot0Ref },
      { key: "slot1", ref: slot1Ref },
    ];

    const cleanups = els.map(({ ref }) => {
      let lastTime = 0;
      let frozenSince = 0;

      const tick = () => {
        const el = ref.current;
        if (!el || el.paused || el.readyState < 2) return;

        if (el.currentTime === lastTime) {
          frozenSince += 1000;
          if (frozenSince >= STALL_MS) {
            frozenSince = 0;
            // Nudge play without resetting the network stream with load()
            el.play().catch(() => {});
          }
        } else {
          lastTime = el.currentTime;
          frozenSince = 0;
        }
      };

      const nudge = () => {
        const el = ref.current;
        if (el && !el.paused && !el.ended) return;
        if (el) el.play().catch(() => {});
      };

      const onVisible = () => {
        const activeRef = activeSlot === 0 ? slot0Ref : slot1Ref;
        const el = activeRef.current;
        if (!document.hidden && el && el.paused) {
          el.play().catch(() => {});
        }
      };

      const el = ref.current;
      if (el) {
        el.addEventListener("stalled", nudge);
        el.addEventListener("waiting", nudge);
      }
      document.addEventListener("visibilitychange", onVisible);
      const timer = window.setInterval(tick, 1000);

      return () => {
        if (el) {
          el.removeEventListener("stalled", nudge);
          el.removeEventListener("waiting", nudge);
        }
        document.removeEventListener("visibilitychange", onVisible);
        window.clearInterval(timer);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [activeSlot]);

  const markReady = () => setReady(true);

  const toggleAudio = () => {
    const activeRef = activeSlot === 0 ? slot0Ref : slot1Ref;
    const activeEl = activeRef.current;
    if (!activeEl) return;

    const nextAudioEnabled = !audioEnabled;
    activeEl.volume = 1.0;
    activeEl.muted = !nextAudioEnabled;
    setAudioEnabled(nextAudioEnabled);

    if (nextAudioEnabled) {
      const playPromise = activeEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          activeEl.muted = true;
          setAudioEnabled(false);
        });
      }
    }
  };

  return (
    <>
      <div
        className={`video-background${ready ? "" : " video-background--loading"}`}
        aria-hidden="true"
      >
        {/* Instant visual fallback: persistent backdrop image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentAsset.poster}
          alt=""
          aria-hidden="true"
          style={{
            ...layerStyle,
            zIndex: 0,
            opacity: 1,
          }}
        />
        <video
          ref={slot0Ref}
          src={slot0.src || undefined}
          autoPlay
          muted={!audioEnabled || activeSlot !== 0}
          loop
          playsInline
          preload="auto"
          poster={slot0.poster}
          onLoadedData={markReady}
          onCanPlay={markReady}
          style={{
            ...layerStyle,
            zIndex: activeSlot === 0 ? 2 : 1,
            opacity: activeSlot === 0 ? 1 : 0,
            pointerEvents: "none",
          }}
        />
        <video
          ref={slot1Ref}
          src={slot1.src || undefined}
          autoPlay
          muted={!audioEnabled || activeSlot !== 1}
          loop
          playsInline
          preload="auto"
          poster={slot1.poster}
          onLoadedData={markReady}
          onCanPlay={markReady}
          style={{
            ...layerStyle,
            zIndex: activeSlot === 1 ? 2 : 1,
            opacity: activeSlot === 1 ? 1 : 0,
            pointerEvents: "none",
          }}
        />
        <div className="video-overlay" />
      </div>
      <button
        type="button"
        onClick={toggleAudio}
        className="video-audio-toggle"
        aria-label={audioEnabled ? "Mute background video" : "Unmute background video"}
        title={audioEnabled ? "Mute" : "Unmute"}
      >
        {audioEnabled ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
    </>
  );
};

export default VideoBackground;
