import { onMounted } from "vue";
import gsap from "gsap";
function useGsapFadeIn(elRef, options = {}) {
  onMounted(() => {
    if (elRef.value) {
      gsap.fromTo(
        elRef.value,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", ...options }
      );
    }
  });
}
export {
  useGsapFadeIn as u
};
