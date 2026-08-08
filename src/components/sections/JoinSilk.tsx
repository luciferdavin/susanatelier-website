"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const SilkBackdrop = dynamic(() => import("@/components/three/SilkBackdrop"), {
  ssr: false,
});

/**
 * JoinSilk — the closing 3D moment. Live silk fills the waitlist section
 * so the page ends on the same cloth it opened with. Never mounts under
 * prefers-reduced-motion; fades in only after its first painted frame;
 * render loop pauses offscreen (handled inside SilkBackdrop).
 */
export default function JoinSilk() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  if (reduced) return null;
  return (
    <SilkBackdrop
      className={ready ? "join-3d join-3d--on" : "join-3d"}
      onReady={() => setReady(true)}
    />
  );
}
