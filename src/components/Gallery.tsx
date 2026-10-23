import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Heart, Play, X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import type { Artwork } from "@/lib/artworks";

const ease = [0.22, 1, 0.36, 1] as const;

function useLikes() {
  const [likes, setLikes] = useState<string[]>([]);
  useEffect(() => { setLikes(JSON.parse(localStorage.getItem("likes") || "[]")); }, []);
  const toggle = (id: string) => setLikes((l) => {
    const n = l.includes(id) ? l.filter((x) => x !== id) : [...l, id];
    localStorage.setItem("likes", JSON.stringify(n));
    return n;
  });
  return { likes, toggle };
}

export function Masonry({ items }: { items: Artwork[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { likes, toggle } = useLikes();
  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
        {items.map((a, i) => (
          <motion.figure
            key={a.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: (i % 4) * 0.08 }}
            className="group relative mb-3 break-inside-avoid overflow-hidden rounded-3xl shadow-soft md:mb-5"
          >
            <button onClick={() => setOpen(i)} className="block w-full" aria-label={`View ${a.title}`}>
              <motion.img layoutId={`art-${a.id}`} src={a.src} alt={a.title} width={a.w} height={a.h} loading="lazy" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]" />
            </button>
            {a.type === "video" && (
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-overlay/60 px-2.5 py-1 text-xs text-primary-foreground backdrop-blur">
                <Play className="h-3 w-3 fill-current" /> {a.resolution}
              </span>
            )}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-script text-2xl text-primary-foreground">{a.title}</p>
              <p className="text-xs text-primary-foreground/80">{a.series}</p>
            </figcaption>
            <motion.button whileTap={{ scale: 1.4 }} transition={{ type: "spring", stiffness: 500 }} onClick={() => toggle(a.id)} aria-label="Like" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-card/80 backdrop-blur">
              <Heart className={`h-4 w-4 ${likes.includes(a.id) ? "fill-primary text-primary" : "text-foreground"}`} />
            </motion.button>
          </motion.figure>
        ))}
      </div>
      <Viewer items={items} index={open} setIndex={setOpen} liked={(id) => likes.includes(id)} toggle={toggle} />
    </>
  );
}

function Viewer({ items, index, setIndex, liked, toggle }: { items: Artwork[]; index: number | null; setIndex: (i: number | null) => void; liked: (id: string) => boolean; toggle: (id: string) => void }) {
  const a = index === null ? null : items[index];
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, items.length, setIndex]);
  return (
    <AnimatePresence>
      {a && index !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex flex-col bg-overlay/90 backdrop-blur-md md:flex-row">
          <div className="relative flex flex-1 items-center justify-center p-4 md:p-10" onClick={() => setIndex(null)}>
            <motion.img layoutId={`art-${a.id}`} src={a.src} alt={a.title} className="max-h-[70vh] max-w-full rounded-2xl object-contain md:max-h-[88vh]" onClick={(e) => e.stopPropagation()} />
            <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + items.length) % items.length); }} className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-card/20 text-primary-foreground"><ChevronLeft /></button>
            <button aria-label="Next" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % items.length); }} className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-card/20 text-primary-foreground"><ChevronRight /></button>
          </div>
          <motion.aside initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease, duration: 0.5 }} className="w-full bg-card p-6 md:w-96 md:overflow-y-auto">
            <div className="flex justify-between">
              <p className="text-xs uppercase tracking-widest text-primary">{a.series}</p>
              <button aria-label="Close" onClick={() => setIndex(null)}><X className="h-5 w-5" /></button>
            </div>
            <h2 className="mt-2 text-4xl">{a.title}</h2>
            <p className="font-script text-2xl text-primary">by {a.artist}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <dt className="text-muted-foreground">Character</dt><dd>{a.character}</dd>
              <dt className="text-muted-foreground">Resolution</dt><dd>{a.resolution}</dd>
              <dt className="text-muted-foreground">Type</dt><dd className="capitalize">{a.type}</dd>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {a.tags.map((t) => <span key={t} className="rounded-full bg-primary-soft px-3 py-1 text-xs text-accent-foreground">#{t}</span>)}
            </div>
            <div className="mt-8 flex gap-2">
              <button onClick={() => toggle(a.id)} className="btn-shine flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground">
                <Heart className={`h-4 w-4 ${liked(a.id) ? "fill-current" : ""}`} /> {liked(a.id) ? "Liked" : "Like"}
              </button>
              <a href={a.src} download aria-label="Download" className="grid h-11 w-11 place-items-center rounded-full border"><Download className="h-4 w-4" /></a>
              <button aria-label="Share" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="grid h-11 w-11 place-items-center rounded-full border"><Share2 className="h-4 w-4" /></button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
