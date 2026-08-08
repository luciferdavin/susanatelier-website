"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import Image from "next/image";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";

import { displaceSilk, SILK_T } from "./silk";

/**
 * SilkAtelier — the maison's 3D hero scene.
 *
 * A field of undulating deep-espresso silk, antique-gold zardozi thread
 * curves drifting through the air, floating gold dust, and the campaign
 * look standing in a brushed-metal frame — all gently parallaxed by the
 * pointer, with a slow camera recede as the page scrolls away.
 *
 * `lite` (small screens) trims geometry, dust and threadwork, lifts the
 * framed look above the headline, and caps pixel ratio.
 * Falls back to a static composition when WebGL is unavailable, and
 * renders a single still frame under prefers-reduced-motion.
 */

type MouseRef = MutableRefObject<[number, number]>;
type ScrollRef = MutableRefObject<number>;

/* ------------------------------------------------------------------ */
/*  Silk field                                                         */
/* ------------------------------------------------------------------ */

function SilkField({
  mouse,
  reduced,
  lite,
}: {
  mouse: MouseRef;
  reduced: boolean;
  lite: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const stillPainted = useRef(false);
  const invalidate = useThree((s) => s.invalidate);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(20, 11, lite ? 52 : 84, lite ? 30 : 52);
    displaceSilk(g, SILK_T);
    return g;
  }, [lite]);

  /* Reduced motion: paint exactly one still frame (a second invalidate on
     the first frame survives R3F's mount-time frame suppression, and the
     texture's Suspense resolve auto-invalidates for the framed look). */
  useEffect(() => {
    if (!reduced) return;
    const t = setTimeout(() => invalidate(), 150);
    return () => clearTimeout(t);
  }, [reduced, invalidate]);

  useFrame(({ clock, invalidate: inv }) => {
    if (!mesh.current) return;
    if (reduced) {
      if (!stillPainted.current) {
        stillPainted.current = true;
        inv();
      }
      return;
    }
    displaceSilk(mesh.current.geometry as THREE.PlaneGeometry, clock.elapsedTime * 0.32);
    mesh.current.rotation.z = mouse.current[0] * 0.03;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geo}
      position={[0, -1.85, -0.6]}
      rotation={[-1.1, 0, 0]}
    >
      <meshStandardMaterial
        color="#241505"
        metalness={0.52}
        roughness={0.46}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  The standing look — framed campaign portrait                       */
/* ------------------------------------------------------------------ */

function LookFrame({
  mouse,
  reduced,
  lite,
}: {
  mouse: MouseRef;
  reduced: boolean;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const tex = useLoader(THREE.TextureLoader, "/images/editorial/look-02.jpg");
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  }, [tex]);

  /* desktop: substantial frame at mid-right. lite (portrait): smaller,
     floating above the headline so it never fights the type. */
  const s = lite
    ? 0.38
    : Math.min(1, Math.max(0.58, viewport.width / 10.5));
  const fx = lite ? 0.6 : Math.min(2.3, Math.max(1.05, viewport.width * 0.255));
  const fy = lite ? 1.5 : 0.32;
  const fz = lite ? -0.4 : 0.35;

  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    const g = group.current;
    const t = clock.elapsedTime;
    const targetY = -0.16 + mouse.current[0] * 0.2;
    const targetX = 0.03 - mouse.current[1] * 0.1;
    g.rotation.y += (targetY - g.rotation.y) * 0.05;
    g.rotation.x += (targetX - g.rotation.x) * 0.05;
    g.rotation.z = Math.sin(t * 0.4) * 0.012;
    g.position.y = fy + Math.sin(t * 0.55) * 0.06;
  });

  return (
    <group
      ref={group}
      position={[fx, fy, fz]}
      rotation={[-0.03, -0.16, 0]}
      scale={s}
    >
      {/* brushed antique-gold frame */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.78, 4.08]} />
        <meshStandardMaterial color="#8A6324" metalness={0.9} roughness={0.32} />
      </mesh>
      {/* inner shadow slip */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[2.62, 3.92]} />
        <meshStandardMaterial color="#160C03" metalness={0.1} roughness={0.9} />
      </mesh>
      {/* the look */}
      <mesh>
        <planeGeometry args={[2.5, 3.75]} />
        <meshStandardMaterial map={tex} metalness={0.05} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Zardozi threads — gold curves drifting through the scene           */
/* ------------------------------------------------------------------ */

interface ThreadSpec {
  points: [number, number, number][];
  color: string;
  radius: number;
}

const THREADS: ThreadSpec[] = [
  {
    points: [
      [-5.2, 2.4, -1.4],
      [-2.2, 1.1, 0.6],
      [0.6, 2.1, 1.4],
      [3.4, 1.4, 0.2],
      [5.4, 2.6, -1.2],
    ],
    color: "#B08A3C",
    radius: 0.012,
  },
  {
    points: [
      [-5.6, 0.2, 0.8],
      [-2.8, -0.9, 1.8],
      [0.4, 0.4, 2.1],
      [3.0, -0.7, 1.0],
      [5.8, 0.6, -0.6],
    ],
    color: "#8A6324",
    radius: 0.009,
  },
  {
    points: [
      [-4.6, 3.2, -2.2],
      [-1.4, 2.6, -0.8],
      [1.8, 3.4, -0.4],
      [4.8, 2.9, -1.8],
    ],
    color: "#D9B36A",
    radius: 0.007,
  },
];

function Threads({
  mouse,
  reduced,
  lite,
}: {
  mouse: MouseRef;
  reduced: boolean;
  lite: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const meshes = useMemo(
    () =>
      THREADS.slice(0, lite ? 2 : THREADS.length).map((t) => {
        const curve = new THREE.CatmullRomCurve3(
          t.points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
        );
        return {
          geometry: new THREE.TubeGeometry(curve, lite ? 96 : 140, t.radius, 8, false),
          color: t.color,
        };
      }),
    [lite]
  );

  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    const g = group.current;
    const t = clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.12) * 0.16 + mouse.current[0] * 0.1;
    g.rotation.x = Math.cos(t * 0.09) * 0.05 + mouse.current[1] * -0.05;
    g.position.y = Math.sin(t * 0.3) * 0.12;
  });

  return (
    <group ref={group}>
      {meshes.map((m, i) => (
        <mesh key={i} geometry={m.geometry}>
          <meshStandardMaterial
            color={m.color}
            metalness={1}
            roughness={0.22}
            emissive={m.color}
            emissiveIntensity={0.28}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold dust                                                          */
/* ------------------------------------------------------------------ */

function GoldDust({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const N = lite ? 48 : 110;
    const arr = new Float32Array(N * 3);
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (rand() - 0.5) * 10;
      arr[i * 3 + 1] = (rand() - 0.5) * 6;
      arr[i * 3 + 2] = (rand() - 0.5) * 4.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [lite]);

  useFrame(({ clock }) => {
    if (!points.current || reduced) return;
    points.current.rotation.y = clock.elapsedTime * 0.02;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.22) * 0.3;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#E0C389"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig — pointer parallax + a slow recede on scroll            */
/* ------------------------------------------------------------------ */

function Rig({
  mouse,
  scroll,
  intro,
  reduced,
}: {
  mouse: MouseRef;
  scroll: ScrollRef;
  intro: ScrollRef;
  reduced: boolean;
}) {
  const snapped = useRef(false);
  const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  useFrame(({ camera }) => {
    if (reduced) {
      camera.lookAt(0, 0.15, 0);
      return;
    }
    /* The entrance: begin close and low, almost inside the cloth, and
       breathe out to the room-wide framing over ~3s. Scroll recede and
       pointer parallax layer on top, faded in by the same ease. */
    if (!snapped.current) {
      snapped.current = true;
      camera.position.set(0, -0.55, 5.5);
    }
    const [mx, my] = mouse.current;
    const p = scroll.current; // 0 → hero pinned, 1 → hero scrolled away
    const i = easeOut(intro.current); // 0 → sealed, 1 → open
    const lerp = (a: number, b: number) => a + (b - a) * i;
    camera.position.x += (mx * 0.42 * i - camera.position.x) * 0.045;
    camera.position.y +=
      (lerp(-0.55, 0.15 - my * 0.3 + p * 0.62) - camera.position.y) * 0.045;
    camera.position.z += (lerp(5.5, 7.4 + p * 1.25) - camera.position.z) * 0.08;
    camera.lookAt(0, lerp(0.5, 0.15 + p * 0.55), 0);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene + canvas                                                     */
/* ------------------------------------------------------------------ */

function HeroFallback() {
  return (
    <div className="hero-3d-fallback">
      <div className="hero-3d-fallback-frame">
        <Image
          src="/images/editorial/look-02.jpg"
          alt=""
          fill
          sizes="(max-width: 900px) 30vw, 30vw"
          priority
        />
      </div>
    </div>
  );
}

export default function SilkAtelier({ lite = false }: { lite?: boolean }) {
  const reduced = useSafeReducedMotion() ?? false;
  const mouse = useRef<[number, number]>([0, 0]);
  const scroll = useRef(0);
  const intro = useRef(reduced ? 1 : 0);
  /* Pause rendering when the hero scrolls out of view — the scene is
     fullscreen WebGL; there is no reason to pay for it offscreen. */
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* Intro dolly — starts as the preloader lifts on first visit
     (~2.6s), almost immediately when arriving via client nav. */
  useEffect(() => {
    if (reduced) {
      intro.current = 1;
      return;
    }
    let raf = 0;
    const booted = Boolean((window as any).__SA_LOADED);
    const t0 = performance.now() + (booted ? 350 : 2600);
    const tick = (now: number) => {
      intro.current = Math.min(1, Math.max(0, (now - t0) / 3000));
      if (intro.current < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = hero ? hero.clientHeight : window.innerHeight;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const host = document.querySelector(".hero");
    if (!host || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.15, 7.4], fov: 42 }}
      dpr={lite ? [1, 1.35] : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : onScreen ? "always" : "never"}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ position: "absolute", inset: 0 }}
      fallback={<HeroFallback />}
    >
      <fog attach="fog" args={["#160C03", 7.5, 15.5]} />
      <ambientLight intensity={0.55} color="#F5EAE1" />
      <directionalLight position={[5, 4, 6]} intensity={1.35} color="#F5EAE1" />
      <pointLight
        position={[-6, 1.5, 2.5]}
        intensity={26}
        distance={24}
        decay={2}
        color="#A87C2F"
      />
      <spotLight
        position={[2.8, 3.6, 5]}
        angle={0.55}
        penumbra={0.9}
        intensity={70}
        distance={30}
        color="#E4D3B8"
      />
      <SilkField mouse={mouse} reduced={reduced} lite={lite} />
      <LookFrame mouse={mouse} reduced={reduced} lite={lite} />
      <Threads mouse={mouse} reduced={reduced} lite={lite} />
      <GoldDust reduced={reduced} lite={lite} />
      <Rig mouse={mouse} scroll={scroll} intro={intro} reduced={reduced} />
    </Canvas>
  );
}
