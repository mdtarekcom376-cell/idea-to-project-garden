import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { artworks, filterArtworks } from "@/lib/artworks";
import { Masonry } from "@/components/Gallery";

export const Route = createFileRoute("/gallery")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : undefined }),
  head: () => ({
    meta: [
      { title: "Gallery — Artsstory" },
      { name: "description", content: "Browse and search the full Artsstory collection of anime illustrations and videos." },
      { property: "og:title", content: "Gallery — Artsstory" },
      { property: "og:description", content: "Search anime art by series, character and tag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const kinds = ["all", "image", "video"] as const;

function GalleryPage() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [kind, setKind] = useState<(typeof kinds)[number]>("all");
  const items = filterArtworks(artworks, q, kind);
  return (
    <main className="mx-auto max-w-[1440px] px-4 pt-28 md:px-8">
      <h1 className="text-5xl md:text-7xl">Our Magical <em className="text-primary">Gallery</em></h1>
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {kinds.map((k) => (
            <button key={k} onClick={() => setKind(k)} className={`min-h-11 rounded-full px-5 text-sm capitalize transition-colors ${kind === k ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-primary-soft"}`}>
              {k === "all" ? "All" : k + "s"}
            </button>
          ))}
        </div>
        <label className="flex min-h-11 items-center gap-2 rounded-full border bg-card px-4 md:w-80">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search series, character, tag…" className="w-full bg-transparent text-sm outline-none" />
        </label>
      </div>
      <div className="mt-8">
        {items.length ? <Masonry items={items} /> : <p className="py-20 text-center text-muted-foreground">No artworks match "{q}".</p>}
      </div>
    </main>
  );
}
