"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const VIDEOS = {
  dark: "/videos/dark.mp4",
  light: "/videos/light.mp4",
};

const VideoBackground = () => {
  const { mode } = useContext(ThemeContext);
  const videoRef = useRef(null);
  const [src, setSrc] = useState(VIDEOS[mode]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const target = VIDEOS[mode];
    if (target === src) return;

    setFading(true);
    const fadeOut = setTimeout(() => {
      setSrc(target);
      setFading(false);
    }, 250);

    return () => clearTimeout(fadeOut);
  }, [mode, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [src]);

  return (
    <div
      className={`video-background${fading ? " video-background--fading" : ""}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="video-overlay" />
    </div>
  );
};

export default VideoBackground;
