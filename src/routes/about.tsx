import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Artsstory" },
      { name: "description", content: "Artsstory is a small team curating high-quality, credited anime art. Learn about our content and DMCA policy." },
      { property: "og:title", content: "About — Artsstory" },
      { property: "og:description", content: "A small team curating credited anime art." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-32">
      <h1 className="text-6xl">About <em className="text-primary">Artsstory</em></h1>
      <p className="mt-6 text-lg text-muted-foreground">We're a small team of curators publishing only the finest anime illustrations and clips — in HD and 4K, always credited to the original artist with a source link.</p>
      <h2 className="mt-12 text-3xl">Content & takedowns</h2>
      <p className="mt-3 text-muted-foreground">We only post work we have rights to share or that is properly credited. If you own a piece and want it removed, email takedown@artsstory.tech and we'll act quickly.</p>
      <p className="font-script mt-10 text-4xl text-primary">— The Artsstory team</p>
    </main>
  );
}
