"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const VIDEOS = {
  dark: { src: "/videos/dark.mp4", poster: "/videos/dark-poster.jpg" },
  light: { src: "/videos/light.mp4", poster: "/videos/light-poster.jpg" },
};

const STALL_MS = 3000;

const VideoBackground = () => {
  const { mode } = useContext(ThemeContext);
  const videoRef = useRef(null);
  const [video, setVideo] = useState(VIDEOS[mode]);
  const [fading, setFading] = useState(false);
  const [ready, setReady] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [canPreload, setCanPreload] = useState(false);
  const stallStrikes = useRef(0);

  /* Theme switch: fade out, swap source, fade back in */
  useEffect(() => {
    const target = VIDEOS[mode];
    if (target.src === video.src) return;

    setReady(false);
    setFading(true);
    const fadeOut = setTimeout(() => {
      setVideo(target);
      setFading(false);
    }, 250);

    return () => clearTimeout(fadeOut);
  }, [mode, video.src]);

  /* (Re)load and start playback whenever the source changes */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.load();
    videoEl.play().catch(() => {});
  }, [video.src]);

  const markReady = () => {
    setReady(true);
    setCanPreload(true);
  };

  /* Keep the icon truthful: it follows the video's real muted state */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const sync = () => setAudioEnabled(!videoEl.muted);
    videoEl.addEventListener("volumechange", sync);
    return () => videoEl.removeEventListener("volumechange", sync);
  }, [video.src]);

  /* Freeze recovery: stall watchdog, stall events, tab-return resume */
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let lastTime = videoEl.currentTime;
    let frozenSince = 0;

    const onTime = () => {
      if (videoEl.currentTime !== lastTime) {
        lastTime = videoEl.currentTime;
        frozenSince = 0;
        stallStrikes.current = 0;
      }
    };

    const tick = () => {
      if (
        !videoEl.paused &&
        videoEl.readyState >= 2 &&
        videoEl.currentTime === lastTime
      ) {
        frozenSince += 1000;
        if (frozenSince >= STALL_MS) {
          frozenSince = 0;
          stallStrikes.current += 1;
          if (stallStrikes.current >= 2) {
            videoEl.load();
            stallStrikes.current = 0;
          }
          videoEl.play().catch(() => {});
        }
      } else {
        frozenSince = 0;
      }
    };

    const nudge = () => {
      if (videoEl.paused || videoEl.ended) return;
      videoEl.play().catch(() => {});
    };

    const onEnded = () => videoEl.play().catch(() => {});

    const onVisible = () => {
      if (!document.hidden && videoEl.paused) videoEl.play().catch(() => {});
    };

    videoEl.addEventListener("timeupdate", onTime);
    videoEl.addEventListener("stalled", nudge);
    videoEl.addEventListener("waiting", nudge);
    videoEl.addEventListener("suspend", nudge);
    videoEl.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisible);
    const timer = window.setInterval(tick, 1000);

    return () => {
      videoEl.removeEventListener("timeupdate", onTime);
      videoEl.removeEventListener("stalled", nudge);
      videoEl.removeEventListener("waiting", nudge);
      videoEl.removeEventListener("suspend", nudge);
      videoEl.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, [video.src]);

  const toggleAudio = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    if (!videoEl.muted) {
      videoEl.play().catch(() => {
        videoEl.muted = true;
      });
    }
  };

  return (
    <>
      <div
        className={`video-background${fading ? " video-background--fading" : ""}${
          ready ? "" : " video-background--loading"
        }`}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={markReady}
          onCanPlay={markReady}
        >
          <source src={video.src} type="video/mp4" />
        </video>
        <video
          src={VIDEOS[mode === "dark" ? "light" : "dark"].src}
          preload={canPreload ? "auto" : "none"}
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          className="video-bg-preload"
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
