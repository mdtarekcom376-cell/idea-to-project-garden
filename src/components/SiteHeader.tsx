import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Sparkles, Home, LayoutGrid, Info } from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/gallery", label: "Gallery", icon: LayoutGrid },
  { to: "/about", label: "About", icon: Info },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
  });
  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-xl tracking-[0.25em] uppercase">Artsstory</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/gallery" className="btn-shine hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground md:inline-block">
            Explore
          </Link>
        </div>
      </motion.header>
      <nav className="glass fixed inset-x-0 bottom-0 z-50 flex justify-around border-t py-2 md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="flex min-h-11 min-w-16 flex-col items-center justify-center text-xs text-muted-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
            <n.icon className="h-5 w-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t pb-24 md:pb-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl">A world of magical moments.</p>
          <p className="font-script text-2xl text-primary">artsstory.tech</p>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Artsstory · All artworks credited to their artists · DMCA: takedown@artsstory.tech</p>
      </div>
    </footer>
  );
}
