"use client"
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

interface DotLottiePlayerProps {
  src: string;
  width?: string;
  height?: string;
}

const DotLottiePlayer: React.FC<DotLottiePlayerProps> = ({ src, width = '500px', height = '600px' }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      const player = document.createElement('dotlottie-player');
      player.setAttribute('src', src);
      player.setAttribute('background', 'transparent');
      player.setAttribute('speed', '1');
      player.setAttribute('loop', '');
      player.setAttribute('autoplay', '');
      player.style.width = width;
      player.style.height = height;
      playerRef.current.appendChild(player);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.innerHTML = '';
      }
    };
  }, [src, width, height]);

  return (
    <>
      <Script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />
      <div ref={playerRef} />
    </>
  );
};

export default DotLottiePlayer;