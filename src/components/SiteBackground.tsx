"use client";

import { Particles } from "@/components/ui/particles";

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Particles
        className="absolute inset-0 h-full w-full opacity-80 dark:opacity-50"
        quantity={155}
        size={0.55}
        color="#71717a"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(113,113,122,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
    </div>
  );
}
