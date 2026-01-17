"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Video } from "@/types/video";

interface VideoLightboxProps {
  video: Video;
  onClose: () => void;
}

export default function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Check if video is portrait (9:16)
  const isPortrait = video.aspectRatio === "9:16";

  // Check if URL is from Instagram
  const isInstagram = (url: string) => {
    return url.includes("instagram.com");
  };

  // Check if video is local (uploaded to /public/videos/)
  const isLocalVideo = (url: string) => {
    return url.startsWith("/videos/");
  };

  // Check if video is from Google Drive
  const isGoogleDrive = (url: string) => {
    return url.includes("drive.google.com/file");
  };

  // Get direct Google Drive video URL
  const getGoogleDriveDirectUrl = (url: string) => {
    const fileId = url.split("/d/")[1]?.split("/")[0];
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return url;
  };

  // Extract video ID and determine platform
  const getVideoEmbed = (url: string) => {
    // Google Drive - convert share URL to embed URL
    if (url.includes("drive.google.com/file")) {
      const fileId = url.split("/d/")[1]?.split("/")[0];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      return url;
    }
    // Instagram - use embed URL with captionless parameter
    if (url.includes("instagram.com")) {
      // Extract the reel ID from URL like https://www.instagram.com/reel/DSQA7tJCMlJ/
      const reelId = url.split("/reel/")[1]?.split("/")[0];
      if (reelId) {
        return `https://www.instagram.com/reel/${reelId}/embed/captioned`;
      }
      return url;
    }
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Content Container - Two Column Layout */}
        <motion.div
          className={`relative w-full max-w-7xl h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-light/30 overflow-hidden z-10 flex ${isPortrait ? 'flex-row-reverse' : ''}`}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Video Section - Left for 16:9, Right for 9:16 */}
          <div className={`flex flex-col p-6 bg-gray-50 ${isPortrait ? 'w-[40%] justify-center items-center' : 'w-[70%]'}`}>
            {/* Video */}
            {isPortrait ? (
              <div className="relative bg-black rounded-2xl overflow-hidden" style={{ height: '75vh', width: 'auto', aspectRatio: '9/16' }}>
                {isLocalVideo(video.videoUrl) ? (
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={getVideoEmbed(video.videoUrl)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            ) : (
              <>
                <div className="relative bg-black aspect-video rounded-2xl overflow-hidden w-full">
                  {isLocalVideo(video.videoUrl) ? (
                    <video
                      src={video.videoUrl}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={getVideoEmbed(video.videoUrl)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>

                {/* Timeline Section - Below Video (only for 16:9) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex-1 mt-6 mb-0 flex flex-col"
                >
                  <h4 className="text-xs font-bold text-gray-dark uppercase tracking-wider mb-3">
                    Timeline
                  </h4>
                  {video.timelineImage ? (
                    <div className="relative flex-1 rounded-2xl overflow-hidden bg-white">
                      <Image
                        src={video.timelineImage}
                        alt={`${video.title} timeline`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 rounded-2xl bg-white flex items-center justify-center">
                      <p className="text-gray-mid text-sm">Timeline not available</p>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </div>

          {/* Info Section - Right for 16:9, Left for 9:16 */}
          <div className={`flex flex-col overflow-y-auto ${isPortrait ? 'w-[60%]' : 'w-[30%]'}`}>
            {/* Title and Client */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border-b border-gray-light/30"
            >
              <h3 className="text-2xl font-bold text-gray-dark mb-1">{video.title}</h3>
              {video.client && (
                <p className="text-accent font-semibold text-base">{video.client}</p>
              )}
              <p className="text-gray-mid text-sm mt-2">{video.description}</p>
            </motion.div>

            {/* Software Used */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6"
            >
              <h4 className="text-xs font-bold text-gray-dark uppercase tracking-wider mb-3">
                Software Used
              </h4>
              {video.software && video.software.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {video.software.map((software) => (
                    <div
                      key={software.name}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                    >
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <Image
                          src={software.logo}
                          alt={software.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-dark">
                        {software.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-mid text-xs">Software details not available</p>
              )}
            </motion.div>

            {/* Timeline Section - Only for Portrait Videos */}
            {isPortrait && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 flex-1 flex flex-col"
              >
                <h4 className="text-xs font-bold text-gray-dark uppercase tracking-wider mb-3">
                  Timeline
                </h4>
                {video.timelineImage ? (
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-white min-h-[200px]">
                    <Image
                      src={video.timelineImage}
                      alt={`${video.title} timeline`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex-1 rounded-2xl bg-white flex items-center justify-center min-h-[200px]">
                    <p className="text-gray-mid text-sm">Timeline not available</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
