import a1 from "@/assets/art-1.jpg";
import a2 from "@/assets/art-2.jpg";
import a3 from "@/assets/art-3.jpg";
import a4 from "@/assets/art-4.jpg";
import a6 from "@/assets/art-6.jpg";
import a7 from "@/assets/art-7.jpg";
import a8 from "@/assets/art-8.jpg";

export type Artwork = {
  id: string;
  title: string;
  series: string;
  character: string;
  artist: string;
  tags: string[];
  src: string;
  w: number;
  h: number;
  resolution: string;
  type: "image" | "video";
};

export const artworks: Artwork[] = [
  { id: "sakura-wand", title: "Sakura Wand", series: "Petal Guardians", character: "Hana", artist: "Mirei", tags: ["sakura", "magical girl", "pink"], src: a1, w: 1024, h: 1280, resolution: "4K", type: "image" },
  { id: "neon-rain", title: "Neon Rain", series: "Kaze City", character: "Rin", artist: "Sora K.", tags: ["cyberpunk", "night", "rain"], src: a2, w: 1280, h: 832, resolution: "4K", type: "video" },
  { id: "sky-isles", title: "Isles of Dusk", series: "Skybound", character: "Kiko", artist: "Aoi", tags: ["fantasy", "scenery", "sunset"], src: a3, w: 832, h: 1280, resolution: "HD", type: "image" },
  { id: "moon-foxes", title: "Moonlit Foxes", series: "Spirit Blade", character: "Ren", artist: "Yuki", tags: ["samurai", "moon", "kitsune"], src: a4, w: 1024, h: 1024, resolution: "4K", type: "image" },
  { id: "galaxy-line", title: "Galaxy Line", series: "Starlight Express", character: "—", artist: "Hoshi", tags: ["night sky", "train", "scenery"], src: a6, w: 1280, h: 768, resolution: "4K", type: "video" },
  { id: "witch-library", title: "The Quiet Spell", series: "Lavender Academy", character: "Lili", artist: "Mirei", tags: ["witch", "cozy", "magic"], src: a7, w: 1024, h: 1280, resolution: "HD", type: "image" },
  { id: "torii-autumn", title: "Autumn Torii", series: "Shrine Tales", character: "Akane", artist: "Aoi", tags: ["shrine", "autumn", "lanterns"], src: a8, w: 1024, h: 1024, resolution: "4K", type: "image" },
];

export const allSeries = Array.from(new Set(artworks.map((a) => a.series)));

export function filterArtworks(list: Artwork[], query: string, kind: "all" | "image" | "video") {
  const q = query.trim().toLowerCase();
  return list.filter((a) => {
    if (kind !== "all" && a.type !== kind) return false;
    if (!q) return true;
    return [a.title, a.series, a.character, a.artist, ...a.tags].some((s) => s.toLowerCase().includes(q));
  });
}
