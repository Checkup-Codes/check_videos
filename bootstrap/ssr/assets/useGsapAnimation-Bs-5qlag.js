import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { SplitText } from "gsap/SplitText.js";
import { TextPlugin } from "gsap/TextPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, MotionPathPlugin);
gsap.defaults({
  ease: "power2.out",
  duration: 0.7
});
function useGsapFadeIn(elRef, options = {}) {
  onMounted(() => {
    if (elRef.value) {
      const delayMs = options.delayMs || 0;
      setTimeout(() => {
        gsap.fromTo(
          elRef.value,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ...options }
        );
      }, delayMs);
    }
  });
}
export {
  useGsapFadeIn as u
};
