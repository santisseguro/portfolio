"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { Video } from "@/types/video";

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface HeroProps {
  featuredVideo?: Video;
}

export default function Hero({ featuredVideo }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!featuredVideo?.videoUrl.includes("youtube.com") && !featuredVideo?.videoUrl.includes("youtu.be")) {
      return;
    }

    const videoId = getYouTubeVideoId(featuredVideo.videoUrl);
    if (!videoId) return;

    // Function to initialize player
    const initializePlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              // Ensure video loops
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      }
    };

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Load YouTube IFrame API script if not already loaded
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      // Initialize player when API is ready
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [featuredVideo]);

  const getYouTubeVideoId = (url: string) => {
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    if (url.includes("youtube.com")) {
      return url.split("v=")[1]?.split("&")[0];
    }
    return null;
  };

  const handleMuteToggle = () => {
    // Handle YouTube player
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
    // Handle HTML5 video
    else if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const isYouTube = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const isLocalVideo = (url: string) => {
    return url.startsWith("/videos/");
  };

  // Function to get video embed URL for non-YouTube videos
  const getVideoEmbed = (url: string) => {
    // Google Drive - with autoplay parameters
    if (url.includes("drive.google.com/file")) {
      const fileId = url.split("/d/")[1]?.split("/")[0];
      if (fileId) {
        // Use preview with autoplay parameter (note: Google Drive autoplay is limited)
        return `https://drive.google.com/file/d/${fileId}/preview?autoplay=1&loop=1`;
      }
      return url;
    }
    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&controls=0&background=1`;
    }
    return url;
  };

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Animated accent background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          {/* Profile Photo with Green Indicator */}
          <motion.div
            className="relative w-24 h-24 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/profile.png"
                alt="Santiago Seguro Profile"
                fill
                className="object-cover rotate-90"
              />
            </div>
            {/* Green online indicator - positioned outside */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-apple-green rounded-full border-4 border-background" />
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-gray-dark2 to-foreground bg-clip-text text-transparent">
              Santiago Seguro
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-mid mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Video Editor & Motion Designer
          </motion.p>

          {/* Pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-50">
              <span className="text-base leading-none">🤘</span>
              <span className="text-base font-semibold text-amber-900 leading-none">40+ Clients</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50">
              <span className="text-base leading-none">💼</span>
              <span className="text-base font-semibold text-amber-900 leading-none">50+ Projects</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50">
              <span className="text-base leading-none">⏱️</span>
              <span className="text-base font-semibold text-blue-900 leading-none">5+ Years</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50">
              <span className="text-base leading-none">🇦🇷</span>
              <span className="text-base font-semibold text-sky-900 leading-none">Argentina</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - This Week's Showcased Work */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-3"
          >
            <p className="text-sm font-semibold text-gray-mid uppercase tracking-wider">
              Today&apos;s Showcased Work
            </p>
          </motion.div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-light/30">
            {featuredVideo ? (
              <>
                {isYouTube(featuredVideo.videoUrl) ? (
                  <div
                    id="youtube-player"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : isLocalVideo(featuredVideo.videoUrl) ? (
                  <video
                    ref={videoRef}
                    src={featuredVideo.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={getVideoEmbed(featuredVideo.videoUrl)}
                    title={featuredVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 w-full h-full"
                  />
                )}

                {/* Mute/Unmute Button - For YouTube and Local Videos */}
                {((isYouTube(featuredVideo.videoUrl) && player) || isLocalVideo(featuredVideo.videoUrl)) && (
                  <motion.button
                    onClick={handleMuteToggle}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-light/10 to-gray-light/5 flex items-center justify-center">
                <p className="text-gray-mid">Loading featured work...</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
