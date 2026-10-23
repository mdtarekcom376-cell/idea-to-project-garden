import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { artworks, allSeries } from "@/lib/artworks";
import { Masonry } from "@/components/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artsstory — A world of magical anime moments" },
      { name: "description", content: "A curated gallery of HD and 4K anime art and videos. Browse, search, like and save magical moments." },
      { property: "og:title", content: "Artsstory — A world of magical anime moments" },
      { property: "og:description", content: "Curated HD & 4K anime art gallery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const words = ["Magical", "Dreamy", "Colorful"];
const slides = [artworks[0], artworks[2], artworks[3], artworks[5]];
const ease = [0.22, 1, 0.36, 1] as const;

function Index() {
  const [w, setW] = useState(0);
  const [s, setS] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  useEffect(() => {
    const t1 = setInterval(() => setW((v) => (v + 1) % words.length), 2600);
    const t2 = setInterval(() => setS((v) => (v + 1) % slides.length), 6000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <main>
      <section className="bg-hero relative overflow-hidden pt-24 md:pt-28">
        <div className="aurora pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-4 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ease, duration: 0.6 }} className="text-xs uppercase tracking-[0.3em] text-primary">
              Curated anime art · HD & 4K
            </motion.p>
            <h1 className="mt-4 text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]">
              {["A", "World", "of"].map((t, i) => (
                <motion.span key={t} className="mr-[0.25em] inline-block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ease, duration: 0.7, delay: 0.1 + i * 0.1 }}>{t}</motion.span>
              ))}
              <br />
              <span className="relative inline-block min-w-[5ch] italic text-primary">
                <AnimatePresence mode="wait">
                  <motion.span key={words[w]} className="inline-block" initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: -90, opacity: 0 }} transition={{ ease, duration: 0.5 }}>
                    {words[w]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              <motion.span className="inline-block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ease, duration: 0.7, delay: 0.5 }}>Moments</motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ease, duration: 0.7, delay: 0.6 }} className="mt-6 max-w-md text-muted-foreground">
              Hand-picked illustrations and cinematic clips from the worlds you love — quality over quantity, always credited.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ease, duration: 0.7, delay: 0.75 }}>
              <Link to="/gallery" className="btn-shine group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-soft">
                Explore the gallery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div style={{ y }} className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <AnimatePresence>
              <motion.img
                key={slides[s].id}
                src={slides[s].src}
                alt={slides[s].title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease }}
                className="absolute inset-0 h-full w-full rounded-[2rem] object-cover shadow-soft"
              />
            </AnimatePresence>
            <p className="font-script absolute -bottom-6 -left-4 rotate-[-6deg] text-3xl text-primary">"{slides[s].title}"</p>
            <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col gap-3 md:-right-10">
              {slides.map((sl, i) => (
                <button key={sl.id} onClick={() => setS(i)} aria-label={`Slide ${i + 1}`} className={`text-xs tabular-nums transition-colors ${i === s ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  0{i + 1}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pt-16 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease, duration: 0.6 }} className="text-5xl">
            Featured <em className="text-primary">Artworks</em>
          </motion.h2>
          <Link to="/gallery" className="group inline-flex items-center gap-1 text-sm text-primary">View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <Masonry items={artworks} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pt-20 md:px-8">
        <h2 className="mb-6 text-4xl">Series</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allSeries.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease, delay: i * 0.06 }}>
              <Link to="/gallery" search={{ q: name }} className="block whitespace-nowrap rounded-full border bg-card px-5 py-2.5 text-sm transition-colors hover:bg-primary-soft">{name}</Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
