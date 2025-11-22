import { ref, computed, watch, onMounted, nextTick, onBeforeUnmount, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { useStore } from "vuex";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const store = useStore();
    const seoTitle = ref(props.screen.seo.title);
    const seoDescription = ref(props.screen.seo.description);
    const logoPath = ref(props.screen.seo.logo);
    const logoAlt = ref("Logo");
    const canvasRef = ref(null);
    const canvasContainer = ref(null);
    const isLoading = ref(false);
    let animationFrameId = null;
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let canvas = null;
    let ctx = null;
    const isDarkTheme = computed(() => store.getters["Theme/isDarkTheme"]);
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.distance = 0;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        if (this.distance < maxDistance) {
          const force = (maxDistance - this.distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 10;
          const moveY = Math.sin(angle) * force * 10;
          this.x -= moveX;
          this.y -= moveY;
        } else {
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
        if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
      }
      draw() {
        if (!ctx) return;
        const isDark = isDarkTheme.value;
        const opacity = Math.max(0.1, 1 - this.distance / 100);
        ctx.fillStyle = isDark ? `rgba(148, 163, 184, ${opacity * 0.4})` : `rgba(100, 116, 139, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const initCanvas = () => {
      if (!canvasRef.value || !canvasContainer.value) return;
      canvas = canvasRef.value;
      ctx = canvas.getContext("2d");
      const resizeCanvas = () => {
        const rect = canvasContainer.value.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      const particleCount = Math.floor(canvas.width * canvas.height / 15e3);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };
      canvasContainer.value.addEventListener("mousemove", handleMouseMove);
      const handleMouseLeave = () => {
        mouse.x = -1e3;
        mouse.y = -1e3;
      };
      canvasContainer.value.addEventListener("mouseleave", handleMouseLeave);
      animate();
    };
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = isDarkTheme.value;
      ctx.fillStyle = isDark ? "rgba(10, 10, 10, 0.01)" : "rgba(250, 250, 250, 0.01)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      const isDarkMode = isDarkTheme.value;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.1;
            ctx.strokeStyle = isDarkMode ? `rgba(148, 163, 184, ${opacity})` : `rgba(100, 116, 139, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    watch(
      isDarkTheme,
      () => {
      },
      { immediate: false }
    );
    onMounted(async () => {
      document.body.style.overflow = "hidden";
      await nextTick();
      setTimeout(() => {
        initCanvas();
      }, 100);
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (ctx) {
        ctx.clearRect(0, 0, (canvas == null ? void 0 : canvas.width) || 0, (canvas == null ? void 0 : canvas.height) || 0);
      }
      particles = [];
      mouse = { x: 0, y: 0 };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "canvasContainer",
        ref: canvasContainer,
        class: "relative min-h-[calc(100vh-3rem)] w-full overflow-hidden"
      }, _attrs))} data-v-9fd54c13><canvas class="absolute inset-0 h-full w-full" data-v-9fd54c13></canvas><section class="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center px-4 py-12 sm:py-16" data-v-9fd54c13><div class="mx-auto max-w-6xl text-center" data-v-9fd54c13><div class="mb-8 flex justify-center" data-v-9fd54c13><div class="relative h-64 w-64 sm:h-80 sm:w-80" data-v-9fd54c13>`);
      if (!isLoading.value) {
        _push(`<!--[-->`);
        if (logoPath.value) {
          _push(`<img${ssrRenderAttr("src", logoPath.value)}${ssrRenderAttr("alt", logoAlt.value)} class="h-full w-full rounded-full object-cover shadow-2xl ring-4 ring-primary/20 transition-all duration-500 hover:scale-105 hover:ring-primary/40" data-v-9fd54c13>`);
        } else {
          _push(`<div class="flex h-full w-full items-center justify-center rounded-full bg-primary/10 shadow-2xl ring-4 ring-primary/20 transition-all duration-500 hover:scale-105 hover:ring-primary/40" data-v-9fd54c13><span class="text-7xl font-bold text-primary sm:text-8xl" data-v-9fd54c13>${ssrInterpolate(seoTitle.value.charAt(0).toUpperCase())}</span></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="animate-pulse" data-v-9fd54c13><div class="h-full w-full rounded-full bg-muted" data-v-9fd54c13><div class="animate-shimmer h-full w-full rounded-full bg-gradient-to-r from-muted via-background to-muted" data-v-9fd54c13></div></div></div>`);
      }
      _push(`</div></div>`);
      if (!isLoading.value) {
        _push(`<div class="space-y-6" data-v-9fd54c13><h1 class="animate-fade-in-down text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl" data-v-9fd54c13>${ssrInterpolate(seoTitle.value)}</h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl" data-v-9fd54c13>${ssrInterpolate(seoDescription.value)}</p><div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6" data-v-9fd54c13>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/writes",
          class: "btn btn-primary btn-lg w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9fd54c13${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-9fd54c13${_scopeId}></path></svg> Yazıları Keşfet `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "mr-2 h-5 w-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  })
                ])),
                createTextVNode(" Yazıları Keşfet ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/categories",
          class: "btn btn-outline btn-lg w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9fd54c13${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-9fd54c13${_scopeId}></path></svg> Kategoriler `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "mr-2 h-5 w-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  })
                ])),
                createTextVNode(" Kategoriler ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="space-y-6" data-v-9fd54c13><div class="mx-auto h-12 w-64 animate-pulse rounded bg-muted sm:h-16 sm:w-96" data-v-9fd54c13></div><div class="mx-auto h-6 w-96 animate-pulse rounded bg-muted sm:h-8 sm:w-[500px]" data-v-9fd54c13></div><div class="flex justify-center gap-4" data-v-9fd54c13><div class="h-12 w-32 animate-pulse rounded bg-muted" data-v-9fd54c13></div><div class="h-12 w-32 animate-pulse rounded bg-muted" data-v-9fd54c13></div></div></div>`);
      }
      _push(`</div></section><section class="relative z-10 border-t border-border bg-background/80 py-20 backdrop-blur-sm" data-v-9fd54c13><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-v-9fd54c13><div class="text-center" data-v-9fd54c13><h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-v-9fd54c13>Özellikler</h2><p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" data-v-9fd54c13> Modern ve kullanıcı dostu içerik yönetim sistemi </p></div><div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" data-v-9fd54c13><div class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" data-v-9fd54c13><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary" data-v-9fd54c13><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9fd54c13><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-9fd54c13></path></svg></div><h3 class="mb-2 text-xl font-semibold text-card-foreground" data-v-9fd54c13>Zengin İçerik</h3><p class="text-muted-foreground" data-v-9fd54c13> Kategorize edilmiş, detaylı ve güncel içeriklerle bilgiye kolayca ulaşın. </p></div><div class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" data-v-9fd54c13><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary" data-v-9fd54c13><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9fd54c13><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" data-v-9fd54c13></path></svg></div><h3 class="mb-2 text-xl font-semibold text-card-foreground" data-v-9fd54c13>Modern Tasarım</h3><p class="text-muted-foreground" data-v-9fd54c13>Shadcn UI ile tasarlanmış, dark mode destekli modern ve şık arayüz.</p></div><div class="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" data-v-9fd54c13><div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary" data-v-9fd54c13><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9fd54c13><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-9fd54c13></path></svg></div><h3 class="mb-2 text-xl font-semibold text-card-foreground" data-v-9fd54c13>Hızlı Erişim</h3><p class="text-muted-foreground" data-v-9fd54c13>Optimize edilmiş performans ile içeriklere hızlı ve sorunsuz erişim.</p></div></div></div></section><section class="relative z-10 border-t border-border bg-muted/30 py-20" data-v-9fd54c13><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-v-9fd54c13><div class="grid grid-cols-2 gap-8 sm:grid-cols-4" data-v-9fd54c13><div class="text-center" data-v-9fd54c13><div class="text-4xl font-bold text-primary sm:text-5xl" data-v-9fd54c13>100+</div><div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base" data-v-9fd54c13>İçerik</div></div><div class="text-center" data-v-9fd54c13><div class="text-4xl font-bold text-primary sm:text-5xl" data-v-9fd54c13>50+</div><div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base" data-v-9fd54c13>Kategori</div></div><div class="text-center" data-v-9fd54c13><div class="text-4xl font-bold text-primary sm:text-5xl" data-v-9fd54c13>24/7</div><div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base" data-v-9fd54c13>Erişim</div></div><div class="text-center" data-v-9fd54c13><div class="text-4xl font-bold text-primary sm:text-5xl" data-v-9fd54c13>100%</div><div class="mt-2 text-sm font-medium text-muted-foreground sm:text-base" data-v-9fd54c13>Ücretsiz</div></div></div></div></section><section class="relative z-10 border-t border-border bg-background py-20" data-v-9fd54c13><div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8" data-v-9fd54c13><h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" data-v-9fd54c13>Hemen Başlayın</h2><p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground" data-v-9fd54c13> İçerikleri keşfedin ve bilgiye ulaşmanın en kolay yolunu deneyin. </p><div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" data-v-9fd54c13>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/writes",
        class: "btn btn-primary btn-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tüm Yazıları Görüntüle `);
          } else {
            return [
              createTextVNode(" Tüm Yazıları Görüntüle ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/categories",
        class: "btn btn-outline btn-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kategorilere Göz At `);
          } else {
            return [
              createTextVNode(" Kategorilere Göz At ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9fd54c13"]]);
export {
  Index as default
};
