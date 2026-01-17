"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Video } from "@/types/video";
import Image from "next/image";

interface VideoCardProps {
  video: Video;
  index: number;
  onClick: () => void;
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  // Determine aspect ratio class based on video orientation
  const aspectClass = video.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6 group cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden rounded-xl bg-gray-light/5 border border-gray-light/30 shadow-sm ${aspectClass}`}>
        {/* Thumbnail Image or Placeholder */}
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-light/10 to-gray-light/5 flex items-center justify-center">
            <Play className="w-20 h-20 text-gray-light/30" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
