import * as THREE from "three";

/**
 * The maison's silk — one shared displacement field used by the hero scene
 * and by the live backdrops (quote band). A cloth-warm sum of sines,
 * slow enough to feel like breath rather than water.
 */

export const SILK_T = 2.2; // the "beautiful moment" frozen for reduced motion

export function displaceSilk(geo: THREE.PlaneGeometry, t: number) {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z =
      Math.sin(x * 0.55 + t) * 0.42 +
      Math.sin(y * 0.85 + t * 1.25) * 0.3 +
      Math.sin((x + y) * 0.35 + t * 0.7) * 0.52 +
      Math.sin(x * 1.6 + y * 0.5 + t * 0.45) * 0.14;
    pos.setZ(i, z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}
