import { ref, getCurrentInstance, onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { SplitText } from "gsap/SplitText.js";
import { TextPlugin } from "gsap/TextPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
let pluginsRegistered = false;
const registerPlugins = () => {
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, MotionPathPlugin);
    pluginsRegistered = true;
  }
};
gsap.defaults({
  ease: "power2.out",
  duration: 0.7
});
function useGsapFadeIn(elRef, options = {}) {
  const isAnimating = ref(false);
  const instance = getCurrentInstance();
  if (!instance) {
    console.warn("useGsapFadeIn: No active component instance found");
    return;
  }
  onMounted(() => {
    if (elRef.value && elRef.value instanceof Element && !isAnimating.value) {
      registerPlugins();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimating.value) {
              isAnimating.value = true;
              gsap.fromTo(
                elRef.value,
                {
                  opacity: 0,
                  y: 20,
                  clearProps: "all"
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: options.duration || 0.6,
                  ease: options.ease || "power2.out",
                  onComplete: () => {
                    isAnimating.value = false;
                  }
                }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px"
        }
      );
      observer.observe(elRef.value);
      return () => {
        observer.disconnect();
        if (isAnimating.value) {
          gsap.killTweensOf(elRef.value);
        }
      };
    }
  });
}
export {
  useGsapFadeIn as u
};
