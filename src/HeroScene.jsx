import React, { useEffect, useRef } from 'react';
import { image, video } from './media';

const frameRate = 30;

function cameraPosition(x) {
  const left = 0.46;
  const right = 0.54;
  if (x < left) return Math.max(0, x / left * 0.5);
  if (x > right) return Math.min(1, 0.5 + (x - right) / (1 - right) * 0.5);
  return 0.5;
}

export default function HeroScene({ scene, heroRef, rangeRef, motion }) {
  const backgroundRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!motion) return;

    const hero = heroRef.current;
    const background = backgroundRef.current;
    const player = videoRef.current;
    const range = rangeRef.current;
    const download = new AbortController();
    let animationFrame = 0;
    let target = 0.5;
    let objectUrl;

    range.value = '50';

    function showFrame() {
      animationFrame = 0;
      if (player.seeking || player.readyState < 2 || !Number.isFinite(player.duration)
        || !player.seekable.length || player.seekable.end(0) === 0) return;

      // Keep the last seek inside the final video frame.
      const lastFrame = Math.max(0, Math.ceil(player.duration * frameRate) - 1);
      const seconds = Math.round(target * lastFrame) / frameRate;
      if (Math.abs(player.currentTime - seconds) >= 0.5 / frameRate) {
        player.currentTime = seconds;
        return;
      }
      background.dataset.ready = 'true';
    }

    function requestFrame() {
      if (!animationFrame) animationFrame = requestAnimationFrame(showFrame);
    }

    function updateFromMouse(event) {
      if (event.pointerType === 'touch' || event.target.closest('a, button, input, [data-camera-controls]')) return;
      const { left, width } = hero.getBoundingClientRect();
      target = cameraPosition((event.clientX - left) / width);
      range.value = String(Math.round(target * 100));
      requestFrame();
    }

    function updateFromRange() {
      target = Number(range.value) / 100;
      requestFrame();
    }

    async function loadClip() {
      const source = video(scene.clip);
      if (source.startsWith('blob:')) {
        player.src = source;
        return;
      }

      try {
        // A local Blob remains seekable even when the host omits HTTP byte ranges.
        const response = await fetch(source, { signal: download.signal });
        if (!response.ok) return;
        const bytes = await response.blob();
        if (download.signal.aborted) return;
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
        player.src = objectUrl;
      } catch {
        // Keep the matching poster visible when the clip cannot load.
      }
    }

    player.addEventListener('loadeddata', requestFrame);
    player.addEventListener('seeked', requestFrame);
    hero.addEventListener('pointermove', updateFromMouse);
    range.addEventListener('input', updateFromRange);
    loadClip();

    return () => {
      download.abort();
      cancelAnimationFrame(animationFrame);
      player.removeEventListener('loadeddata', requestFrame);
      player.removeEventListener('seeked', requestFrame);
      hero.removeEventListener('pointermove', updateFromMouse);
      range.removeEventListener('input', updateFromRange);
      delete background.dataset.ready;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [heroRef, motion, rangeRef, scene]);

  return (
    <div className="hero-camera" ref={backgroundRef} aria-hidden="true">
      <img className="hero-image" src={image(scene.poster)} alt="" fetchPriority="high" />
      {motion && <video className="hero-video" ref={videoRef} muted playsInline preload="auto" disablePictureInPicture disableRemotePlayback />}
    </div>
  );
}
