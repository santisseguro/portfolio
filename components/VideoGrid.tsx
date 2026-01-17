"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import VideoCard from "./VideoCard";
import VideoLightbox from "./VideoLightbox";
import FilterButtons from "./FilterButtons";
import { Video } from "@/types/video";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Extract unique tags from all videos and add "All" option
  const categories = useMemo(() => {
    const allTags = videos.flatMap((video) => video.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return ["All", ...uniqueTags.sort()];
  }, [videos]);

  // Filter videos based on active filter
  const filteredVideos = useMemo(() => {
    if (activeFilter === "All") return videos;
    return videos.filter((video) => video.tags.includes(activeFilter));
  }, [videos, activeFilter]);

  // Responsive breakpoints for masonry columns
  const breakpointColumns = {
    default: 3,
    1280: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Selected Work
        </h2>

        {/* Filter Buttons */}
        <FilterButtons
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Video Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <VideoLightbox
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
