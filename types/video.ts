export interface Software {
  name: string;
  logo: string; // Path to logo image
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // YouTube or Vimeo URL
  aspectRatio: "16:9" | "9:16"; // Landscape or Portrait
  client?: string;
  software?: Software[]; // Array of software used
  timelineImage?: string; // Path to timeline screenshot
  tags: string[]; // Filter tags (e.g., "Commercial", "Social Media", "Documentary")
}
