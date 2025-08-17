// useGsapAnimation.js
import { onMounted, ref, getCurrentInstance } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Lazy load GSAP plugins only when needed
let pluginsRegistered = false;
const registerPlugins = () => {
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, MotionPathPlugin);
    pluginsRegistered = true;
  }
};

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
  const isAnimating = ref(false);
  const instance = getCurrentInstance();
  
  // Check if we're in a component context
  if (!instance) {
    console.warn('useGsapFadeIn: No active component instance found');
    return;
  }
  
  onMounted(() => {
    if (elRef.value && elRef.value instanceof Element && !isAnimating.value) {
      registerPlugins();
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isAnimating.value) {
            isAnimating.value = true;
            
            gsap.fromTo(
              elRef.value,
              { 
                opacity: 0, 
                y: 20,
                clearProps: 'all'
              },
              {
                opacity: 1,
                y: 0,
                duration: options.duration || 0.6,
                ease: options.ease || 'power2.out',
                onComplete: () => {
                  isAnimating.value = false;
                }
              }
            );
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });
      
      observer.observe(elRef.value);
      
      // Cleanup function
      return () => {
        observer.disconnect();
        if (isAnimating.value) {
          gsap.killTweensOf(elRef.value);
        }
      };
    }
  });
}

/**
 * useGsapStaggerFadeIn
 * Multiple elements with staggered fade-in animation
 * @param {Ref} containerRef - Container element ref
 * @param {string} selector - CSS selector for child elements
 * @param {Object} options - GSAP animation options
 */
export function useGsapStaggerFadeIn(containerRef, selector = '> *', options = {}) {
  const isAnimating = ref(false);
  const instance = getCurrentInstance();
  
  if (!instance) {
    console.warn('useGsapStaggerFadeIn: No active component instance found');
    return;
  }
  
  onMounted(() => {
    if (containerRef.value && containerRef.value instanceof Element && !isAnimating.value) {
      registerPlugins();
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isAnimating.value) {
            isAnimating.value = true;
            
            const elements = containerRef.value.querySelectorAll(selector);
            if (elements.length > 0) {
              gsap.fromTo(
                elements,
                { 
                  opacity: 0, 
                  y: 20,
                  clearProps: 'all'
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: options.duration || 0.6,
                  stagger: options.stagger || 0.1,
                  ease: options.ease || 'power2.out',
                  onComplete: () => {
                    isAnimating.value = false;
                  }
                }
              );
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '100px'
      });
      
      observer.observe(containerRef.value);
    }
  });
}

/**
 * useGsapScrollTrigger
 * Scroll-triggered animations with performance optimizations
 * @param {Ref} elementRef - Element to animate
 * @param {Object} animationConfig - Animation configuration
 * @param {Object} scrollConfig - ScrollTrigger configuration
 */
export function useGsapScrollTrigger(elementRef, animationConfig = {}, scrollConfig = {}) {
  const scrollTrigger = ref(null);
  const instance = getCurrentInstance();
  
  if (!instance) {
    console.warn('useGsapScrollTrigger: No active component instance found');
    return { scrollTrigger, kill: () => {} };
  }
  
  onMounted(() => {
    if (elementRef.value && elementRef.value instanceof Element) {
      registerPlugins();
      
      const defaultAnimation = {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out'
      };
      
      const defaultScrollConfig = {
        trigger: elementRef.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      };
      
      scrollTrigger.value = ScrollTrigger.create({
        ...defaultScrollConfig,
        ...scrollConfig,
        animation: gsap.fromTo(
          elementRef.value,
          { ...defaultAnimation, ...animationConfig.from },
          { 
            ...defaultAnimation, 
            ...animationConfig.to,
            scrollTrigger: scrollTrigger.value
          }
        )
      });
    }
  });
  
  return {
    scrollTrigger,
    kill: () => {
      if (scrollTrigger.value) {
        scrollTrigger.value.kill();
      }
    }
  };
}

/**
 * useGsapTextAnimation
 * Text animation with SplitText (lazy loaded)
 * @param {Ref} textRef - Text element ref
 * @param {Object} options - Animation options
 */
export function useGsapTextAnimation(textRef, options = {}) {
  const isAnimating = ref(false);
  const instance = getCurrentInstance();
  
  if (!instance) {
    console.warn('useGsapTextAnimation: No active component instance found');
    return;
  }
  
  onMounted(() => {
    if (textRef.value && textRef.value instanceof Element && !isAnimating.value) {
      registerPlugins();
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isAnimating.value) {
            isAnimating.value = true;
            
            try {
              const splitText = new SplitText(textRef.value, {
                type: options.type || 'chars,words',
                charsClass: options.charsClass || 'char',
                wordsClass: options.wordsClass || 'word'
              });
              
              gsap.fromTo(
                splitText.chars || splitText.words,
                {
                  opacity: 0,
                  y: 20,
                  rotationX: -90
                },
                {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  duration: options.duration || 0.8,
                  stagger: options.stagger || 0.02,
                  ease: options.ease || 'back.out(1.7)',
                  onComplete: () => {
                    isAnimating.value = false;
                    // Clean up SplitText
                    splitText.revert();
                  }
                }
              );
            } catch (error) {
              console.warn('SplitText not available, falling back to simple animation');
              // Fallback to simple animation
              gsap.fromTo(
                textRef.value,
                { opacity: 0, y: 20 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: options.duration || 0.8,
                  onComplete: () => {
                    isAnimating.value = false;
                  }
                }
              );
            }
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5,
        rootMargin: '50px'
      });
      
      observer.observe(textRef.value);
    }
  });
}

/**
 * Performance utility: Batch GSAP animations
 * @param {Array} animations - Array of animation functions
 * @param {Object} options - Batch options
 */
export function useGsapBatch(animations = [], options = {}) {
  const batchSize = options.batchSize || 3;
  const delay = options.delay || 100;
  
  const runBatch = () => {
    let currentIndex = 0;
    
    const runNextBatch = () => {
      const batch = animations.slice(currentIndex, currentIndex + batchSize);
      batch.forEach(animation => {
        if (typeof animation === 'function') {
          animation();
        }
      });
      
      currentIndex += batchSize;
      
      if (currentIndex < animations.length) {
        setTimeout(runNextBatch, delay);
      }
    };
    
    runNextBatch();
  };
  
  return { runBatch };
}

/**
 * Cleanup function for all GSAP animations
 */
export function cleanupGsapAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
}
