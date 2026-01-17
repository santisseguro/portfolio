import { Video } from "@/types/video";

// Software logo URLs mapping - Using latest icons
const softwareLogos: { [key: string]: string } = {
  // Adobe Creative Cloud
  "Premiere Pro": "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  "After Effects": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
  "Photoshop": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  "Illustrator": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",

  // Video Editing
  "DaVinci Resolve": "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",

  // Plugin/Extension
  "Nano Banana": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg", // Banana emoji as placeholder

  // AI Tools
  "Gemini": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  "ChatGPT": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "Claude": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg", // Robot emoji as placeholder for Claude

  // AI Video Generation
  "Flow": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f300.svg", // Cyclone emoji for Flow
  "Kling": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2728.svg", // Sparkles emoji for Kling
  "Sora": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f320.svg", // Shooting star for Sora
  "Veo": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ac.svg", // Clapper board for Veo
};

export async function getVideosFromSheet(): Promise<Video[]> {
  try {
    const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!SHEET_ID || !API_KEY) {
      console.error("Missing Google Sheets credentials");
      return [];
    }

    // Fetch data from Google Sheets
    const range = "Sheet1!A2:I1000"; // A to I to include Software column
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch from Google Sheets");
      return [];
    }

    const data = await response.json();
    const rows = data.values || [];

    // Transform rows into Video objects
    // Columns: Video URL, Title, Date, Client, Tags, Aspect Ratio, Thumbnail URL, ?, Software
    const videos: Video[] = rows
      .filter((row: string[]) => row[0]) // Filter out empty rows
      .map((row: string[], index: number) => {
        // Parse software string (comma-separated) into array
        const softwareNames = row[8] ? row[8].split(",").map((s) => s.trim()) : [];
        const software = softwareNames.map((name) => ({
          name,
          logo: softwareLogos[name] || "",
        }));

        // Generate thumbnail for Instagram or Google Drive if not provided
        const videoUrl = row[0] || "";
        let thumbnail = row[6] || "";

        // If no thumbnail and it's an Instagram video, generate thumbnail URL
        if (!thumbnail && videoUrl.includes("instagram.com")) {
          // Handle different Instagram URL formats:
          // https://www.instagram.com/reel/DSQA7tJCMlJ/
          // https://www.instagram.com/carestino_bebes/reel/DTitN-TlGtS/
          // https://www.instagram.com/reel/DTQQQ6ngQ2s/?hl=es
          const reelMatch = videoUrl.match(/\/reel\/([^/?]+)/);
          if (reelMatch && reelMatch[1]) {
            const reelId = reelMatch[1];
            // Instagram thumbnail format
            thumbnail = `https://www.instagram.com/p/${reelId}/media/?size=l`;
          }
        }

        // If no thumbnail and it's a Google Drive video, generate thumbnail URL
        if (!thumbnail && videoUrl.includes("drive.google.com/file")) {
          const fileId = videoUrl.split("/d/")[1]?.split("/")[0];
          if (fileId) {
            thumbnail = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
          }
        }

        return {
          id: String(index + 1),
          videoUrl: videoUrl,
          title: row[1] || "Untitled",
          description: "", // No description column in sheet
          client: row[3] || "",
          tags: row[4] ? row[4].split(",").map((t) => t.trim()) : [],
          aspectRatio: (row[5] || "16:9") as "16:9" | "9:16",
          thumbnail: thumbnail,
          timelineImage: undefined,
          software: software.length > 0 ? software : undefined,
        };
      });

    return videos;
  } catch (error) {
    console.error("Error fetching videos from Google Sheets:", error);
    return [];
  }
}
