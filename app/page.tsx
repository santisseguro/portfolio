import Hero from "@/components/Hero";
import VideoGrid from "@/components/VideoGrid";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { getVideosFromSheet } from "@/lib/googleSheets";
import { videos } from "@/data/videos";

// Fisher-Yates shuffle algorithm to randomize array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function Home() {
  // Try to fetch from Google Sheets, fallback to local data
  let portfolioVideos = await getVideosFromSheet();

  // If Google Sheets fails or returns empty, use local data as fallback
  if (portfolioVideos.length === 0) {
    portfolioVideos = videos;
  }

  // Select the video from client "Atlin" for the hero section
  const featuredVideo = portfolioVideos.find(v => v.client === "Atlin");

  // Randomize the order of videos
  portfolioVideos = shuffleArray(portfolioVideos);

  return (
    <main className="min-h-screen bg-background">
      <SmoothScroll />
      <Navigation />
      <div id="home">
        <Hero featuredVideo={featuredVideo} />
      </div>
      <div id="projects">
        <VideoGrid videos={portfolioVideos} />
      </div>
    </main>
  );
}
