"use client";

import { useRef, useState } from "react";
import { PlayCircleIcon } from "lucide-react";

export default function AboutProduct() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="w-full px-10 py-20 bg-black text-white">
      <div className="flex items-center justify-center">
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-neutral-700">
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
            >
              <PlayCircleIcon className="w-20 h-20 text-white" />
            </button>
          )}

          <video
            ref={videoRef}
            className="w-full h-auto object-contain"
            muted
            loop
            playsInline
            controls={isPlaying}
            poster="/assets/thumbnail.jpg"
          >
            <source src="/assets/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
