// useGsapAnimation.js
// Minimal composable for GSAP animations in Vue 3
// Provides a fade-in effect for any element ref

import { onMounted } from 'vue';
import gsap from 'gsap';

/**
 * useGsapFadeIn
 * Animates a given element with a fade-in effect on mount.
 * @param {Ref} elRef - The element ref to animate
 * @param {Object} options - Optional GSAP animation parameters
 */
export function useGsapFadeIn(elRef, options = {}) {
  onMounted(() => {
    if (elRef.value) {
      gsap.fromTo(
        elRef.value,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', ...options }
      );
    }
  });
} 