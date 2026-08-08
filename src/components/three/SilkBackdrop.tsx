"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { displaceSilk } from "./silk";

/**
 * SilkBackdrop — a narrow band of living silk used behind the quote.
 *
 * Progressive enhancement: the editorial photograph sits beneath as the
 * SSR/no-WebGL layer; once the scene has actually rendered its first
 * frame we call `onReady` so the parent can crossfade. Rendering pauses
 * while the band is offscreen, and the parent simply never mounts this
 * under prefers-reduced-motion.
 */

function BandSilk() {
  const mesh = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(26, 14, 64, 36);
    displaceSilk(g, 1.4);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    displaceSilk(
      mesh.current.geometry as THREE.PlaneGeometry,
      1.4 + clock.elapsedTime * 0.22
    );
  });

  return (
    <mesh
      ref={mesh}
      geometry={geo}
      position={[0, -0.4, -1.1]}
      rotation={[-1.02, 0, 0]}
    >
      <meshStandardMaterial
        color="#241505"
        metalness={0.55}
        roughness={0.44}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function BandDust() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const N = 42;
    const arr = new Float32Array(N * 3);
    let seed = 3;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (rand() - 0.5) * 12;
      arr[i * 3 + 1] = (rand() - 0.5) * 5;
      arr[i * 3 + 2] = (rand() - 0.5) * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.015;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.18) * 0.25;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#E0C389"
        size={0.024}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Fires once the first real frame has been drawn — never under
   frameloop="never", so the swap below is always safe. */
function FirstFrame({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady?.();
  });
  return null;
}

export default function SilkBackdrop({
  className,
  onReady,
}: {
  className?: string;
  onReady?: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOnScreen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.3, 7.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={onScreen ? "always" : "never"}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ position: "absolute", inset: 0 }}
        fallback={null}
      >
        <fog attach="fog" args={["#160C03", 8, 16]} />
        <ambientLight intensity={0.5} color="#F5EAE1" />
        <directionalLight position={[4, 3, 6]} intensity={1.05} color="#F5EAE1" />
        <pointLight
          position={[-5, 1, 3]}
          intensity={20}
          distance={22}
          decay={2}
          color="#A87C2F"
        />
        <BandSilk />
        <BandDust />
        <FirstFrame onReady={onReady} />
      </Canvas>
    </div>
  );
}
