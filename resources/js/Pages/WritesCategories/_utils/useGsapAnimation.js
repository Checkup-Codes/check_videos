// useGsapAnimation.js
import { onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, MotionPathPlugin);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.7,
});

/**
 * useGsapFadeIn
 * Belirtilen elementi mount edildiğinde fade-in animasyonu ile gösterir.
 * @param {Ref} elRef - Animasyon uygulanacak elementin ref'i
 * @param {Object} options - GSAP animasyon ayarları (opsiyonel)
 */
export function useGsapFadeIn(elRef, options = {}) {
  onMounted(() => {
    if (elRef.value) {
      const delayMs = options.delayMs || 0;

      setTimeout(() => {
        gsap.fromTo(elRef.value, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ...options });
      }, delayMs);
    }
  });
}
