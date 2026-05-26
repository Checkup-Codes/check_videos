import { computed, onMounted, onUnmounted, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext, nextTick } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import html2pdf from "html2pdf.js";
import _sfc_main$1 from "./ProjectsPageFrame-CSu_aWks.js";
import { _ as _sfc_main$2 } from "./ZoomableImage-iVeXa9el.js";
import { r as registerProjectPdfExport, d as unregisterProjectPdfExport } from "../ssr.js";
/* empty css                      */
import "./CheckScreen-ChCDBWK6.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const project = computed(() => page.props.project || {});
    const isGuestView = computed(() => !!page.props.isGuestView);
    const getPublicServiceDescription = (service) => {
      var _a, _b, _c;
      const guestHtml = (_b = (_a = service.pivot) == null ? void 0 : _a.guest_description) == null ? void 0 : _b.trim();
      if (guestHtml) {
        return guestHtml;
      }
      const catalogHtml = (_c = service.description) == null ? void 0 : _c.trim();
      return catalogHtml || "";
    };
    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      };
      return classes[status] || classes.pending;
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "Beklemede",
        active: "Aktif",
        completed: "Tamamlandı",
        cancelled: "İptal Edildi"
      };
      return labels[status] || "Bilinmiyor";
    };
    const getPaymentStatusClass = (status) => {
      const classes = {
        unpaid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        partial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      };
      return classes[status] || classes.unpaid;
    };
    const getPaymentStatusLabel = (status) => {
      const labels = {
        unpaid: "Ödenmedi",
        partial: "Kısmi Ödendi",
        paid: "Ödendi"
      };
      return labels[status] || "Bilinmiyor";
    };
    const formatPrice = (price) => {
      if (!price) return "0";
      return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const getServiceCompletionPercentage = (service) => {
      if (!service.todos || service.todos.length === 0) return 0;
      const completed = service.todos.filter((t) => t.is_completed).length;
      return Math.round(completed / service.todos.length * 100);
    };
    const exportToPDF = async () => {
      var _a;
      await nextTick();
      const element = document.getElementById("project-detail-content");
      if (!element) {
        alert("PDF oluşturulamadı: İçerik bulunamadı");
        return;
      }
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `proje-${((_a = project.value.project_name) == null ? void 0 : _a.toLowerCase().replace(/\s+/g, "-")) || "detay"}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: "#ffffff",
          logging: false
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        }
      };
      try {
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error("PDF export error:", error);
        alert("PDF oluşturulurken bir hata oluştu: " + error.message);
      }
    };
    onMounted(() => {
      if (!isGuestView.value) {
        registerProjectPdfExport(exportToPDF);
      }
    });
    onUnmounted(() => {
      unregisterProjectPdfExport(exportToPDF);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-lg font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.project_name)}</h1>`);
            if (!isGuestView.value && project.value.customer) {
              _push2(`<p class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.first_name)} ${ssrInterpolate(project.value.customer.last_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("h1", { class: "text-lg font-semibold text-foreground" }, toDisplayString(project.value.project_name), 1),
              !isGuestView.value && project.value.customer ? (openBlock(), createBlock("p", {
                key: 0,
                class: "text-xs text-muted-foreground"
              }, toDisplayString(project.value.customer.first_name) + " " + toDisplayString(project.value.customer.last_name), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="space-y-4" id="project-detail-content"${_scopeId}>`);
            if ((_a = project.value.images) == null ? void 0 : _a.length) {
              _push2(`<div class="flex gap-2 overflow-x-auto pb-1"${_scopeId}><!--[-->`);
              ssrRenderList(project.value.images, (image, imageIndex) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: image.id,
                  src: image.image_path,
                  alt: image.alt_text || project.value.project_name,
                  gallery: project.value.images,
                  index: imageIndex,
                  "wrapper-class": isGuestView.value ? "h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-border sm:h-40 sm:w-40" : "h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border",
                  "img-class": "h-full w-full object-cover"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isGuestView.value) {
              _push2(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId}><h3 class="mb-3 text-xs font-semibold text-foreground"${_scopeId}>Verilen Hizmetler</h3>`);
              if ((_b = project.value.services) == null ? void 0 : _b.length) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(project.value.services, (service) => {
                  _push2(`<div class="rounded-lg border border-border bg-background p-4"${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(service.name)}</h4>`);
                  if (getPublicServiceDescription(service)) {
                    _push2(`<div class="quill-content prose prose-sm dark:prose-invert mt-3 max-w-none text-sm"${_scopeId}>${getPublicServiceDescription(service) ?? ""}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<p class="text-sm text-muted-foreground"${_scopeId}>Bu projede henüz hizmet bilgisi yok.</p>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!--[-->`);
              if (project.value.category) {
                _push2(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId}><h3 class="mb-3 text-xs font-semibold text-foreground"${_scopeId}>Kategori Bağlantısı</h3><div class="flex items-center justify-between rounded-md bg-muted/30 p-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"${_scopeId}></path></svg><span class="text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(project.value.category.name)}</span></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/categories/${project.value.category.slug}`,
                  class: "text-xs text-primary hover:underline"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Görüntüle → `);
                    } else {
                      return [
                        createTextVNode(" Görüntüle → ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="rounded-lg border border-border bg-card p-4"${_scopeId}><h3 class="mb-3 text-xs font-semibold text-foreground"${_scopeId}>Müşteri Bilgileri</h3>`);
              if (project.value.customer) {
                _push2(`<div class="grid grid-cols-1 gap-3 rounded-md bg-muted/30 p-3 md:grid-cols-3"${_scopeId}><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Ad Soyad</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.first_name)} ${ssrInterpolate(project.value.customer.last_name)}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>E-posta</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.email)}</p></div><div${_scopeId}><h4 class="text-xs font-medium text-muted-foreground"${_scopeId}>Telefon</h4><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(project.value.customer.phone || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="rounded-lg border border-border bg-card p-4"${_scopeId}><h3 class="mb-3 text-xs font-semibold text-foreground"${_scopeId}>Hizmetler</h3>`);
              if ((_c = project.value.services) == null ? void 0 : _c.length) {
                _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(project.value.services, (service) => {
                  var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
                  _push2(`<div class="rounded-lg border border-border bg-background p-4"${_scopeId}><div class="flex items-center justify-between gap-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5"${_scopeId}><svg class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(service.name)}</h4></div></div><div class="flex items-center gap-2"${_scopeId}><span class="${ssrRenderClass([getStatusClass((_a2 = service.pivot) == null ? void 0 : _a2.status), "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel((_b2 = service.pivot) == null ? void 0 : _b2.status))}</span><span class="${ssrRenderClass([getPaymentStatusClass((_c2 = service.pivot) == null ? void 0 : _c2.payment_status), "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getPaymentStatusLabel((_d2 = service.pivot) == null ? void 0 : _d2.payment_status))}</span></div></div>`);
                  if (getPublicServiceDescription(service)) {
                    _push2(`<div class="mt-3 rounded-md border border-border/60 bg-muted/20 p-3"${_scopeId}><h5 class="mb-2 text-xs font-medium text-muted-foreground"${_scopeId}>Ziyaretçi açıklaması</h5><div class="quill-content prose prose-sm dark:prose-invert max-w-none text-sm"${_scopeId}>${getPublicServiceDescription(service) ?? ""}</div></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="mt-3 space-y-3 border-t border-border pt-3"${_scopeId}><div class="grid grid-cols-2 gap-3 md:grid-cols-3"${_scopeId}>`);
                  if ((_e2 = service.pivot) == null ? void 0 : _e2.price) {
                    _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Fiyat</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatPrice(service.pivot.price))} ₺</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if ((_f2 = service.pivot) == null ? void 0 : _f2.service_start_date) {
                    _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Başlangıç</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatDate(service.pivot.service_start_date))}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if ((_g = service.pivot) == null ? void 0 : _g.service_end_date) {
                    _push2(`<div${_scopeId}><h5 class="text-xs font-medium text-muted-foreground"${_scopeId}>Bitiş</h5><p class="mt-1 text-sm font-semibold text-foreground"${_scopeId}>${ssrInterpolate(formatDate(service.pivot.service_end_date))}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if ((_h = service.pivot) == null ? void 0 : _h.notes) {
                    _push2(`<div class="rounded-md bg-muted/30 p-2.5"${_scopeId}><h5 class="mb-1 text-xs font-medium text-muted-foreground"${_scopeId}>İç notlar</h5><p class="whitespace-pre-wrap text-xs text-foreground"${_scopeId}>${ssrInterpolate(service.pivot.notes)}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="space-y-2 border-t border-border pt-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h5 class="text-xs font-medium text-foreground"${_scopeId}>TO-DO&#39;lar</h5><span class="text-xs font-semibold text-foreground"${_scopeId}>${ssrInterpolate(getServiceCompletionPercentage(service))}% </span></div>`);
                  if ((_i = service.todos) == null ? void 0 : _i.length) {
                    _push2(`<div class="space-y-1.5"${_scopeId}><!--[-->`);
                    ssrRenderList(service.todos, (todo) => {
                      _push2(`<div class="flex items-center gap-2 rounded-md border border-input bg-background p-2"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(todo.is_completed) ? " checked" : ""} disabled class="h-3.5 w-3.5 rounded border-input text-primary"${_scopeId}><span class="${ssrRenderClass([todo.is_completed ? "text-muted-foreground line-through" : "text-foreground", "flex-1 text-xs"])}"${_scopeId}>${ssrInterpolate(todo.title)}</span>`);
                      if (todo.completed_at) {
                        _push2(`<span class="text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(formatDate(todo.completed_at))}</span>`);
                      } else {
                        _push2(`<!---->`);
                      }
                      _push2(`</div>`);
                    });
                    _push2(`<!--]--></div>`);
                  } else {
                    _push2(`<div class="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/20 p-2.5 text-xs text-muted-foreground"${_scopeId}><span${_scopeId}>Henüz TO-DO eklenmemiş</span></div>`);
                  }
                  _push2(`</div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground"${_scopeId}><span${_scopeId}>Bu projeye atanmış hizmet bulunmuyor</span></div>`);
              }
              _push2(`</div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "space-y-4",
                id: "project-detail-content"
              }, [
                ((_d = project.value.images) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex gap-2 overflow-x-auto pb-1"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(project.value.images, (image, imageIndex) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      key: image.id,
                      src: image.image_path,
                      alt: image.alt_text || project.value.project_name,
                      gallery: project.value.images,
                      index: imageIndex,
                      "wrapper-class": isGuestView.value ? "h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-border sm:h-40 sm:w-40" : "h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border",
                      "img-class": "h-full w-full object-cover"
                    }, null, 8, ["src", "alt", "gallery", "index", "wrapper-class"]);
                  }), 128))
                ])) : createCommentVNode("", true),
                isGuestView.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-lg border border-border bg-card p-4"
                }, [
                  createVNode("h3", { class: "mb-3 text-xs font-semibold text-foreground" }, "Verilen Hizmetler"),
                  ((_e = project.value.services) == null ? void 0 : _e.length) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(project.value.services, (service) => {
                      return openBlock(), createBlock("div", {
                        key: service.id,
                        class: "rounded-lg border border-border bg-background p-4"
                      }, [
                        createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(service.name), 1),
                        getPublicServiceDescription(service) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "quill-content prose prose-sm dark:prose-invert mt-3 max-w-none text-sm",
                          innerHTML: getPublicServiceDescription(service)
                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    class: "text-sm text-muted-foreground"
                  }, "Bu projede henüz hizmet bilgisi yok."))
                ])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                  project.value.category ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-border bg-card p-4"
                  }, [
                    createVNode("h3", { class: "mb-3 text-xs font-semibold text-foreground" }, "Kategori Bağlantısı"),
                    createVNode("div", { class: "flex items-center justify-between rounded-md bg-muted/30 p-3" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        (openBlock(), createBlock("svg", {
                          class: "h-4 w-4 text-muted-foreground",
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
                        createVNode("span", { class: "text-sm font-medium text-foreground" }, toDisplayString(project.value.category.name), 1)
                      ]),
                      createVNode(unref(Link), {
                        href: `/categories/${project.value.category.slug}`,
                        class: "text-xs text-primary hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Görüntüle → ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-4" }, [
                    createVNode("h3", { class: "mb-3 text-xs font-semibold text-foreground" }, "Müşteri Bilgileri"),
                    project.value.customer ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-1 gap-3 rounded-md bg-muted/30 p-3 md:grid-cols-3"
                    }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Ad Soyad"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.first_name) + " " + toDisplayString(project.value.customer.last_name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "E-posta"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.email), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-xs font-medium text-muted-foreground" }, "Telefon"),
                        createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(project.value.customer.phone || "-"), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "rounded-lg border border-border bg-card p-4" }, [
                    createVNode("h3", { class: "mb-3 text-xs font-semibold text-foreground" }, "Hizmetler"),
                    ((_f = project.value.services) == null ? void 0 : _f.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(project.value.services, (service) => {
                        var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
                        return openBlock(), createBlock("div", {
                          key: service.id,
                          class: "rounded-lg border border-border bg-background p-4"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between gap-3" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "h-4 w-4 text-primary",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                  })
                                ]))
                              ]),
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-semibold text-foreground" }, toDisplayString(service.name), 1)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", getStatusClass((_a2 = service.pivot) == null ? void 0 : _a2.status)]
                              }, toDisplayString(getStatusLabel((_b2 = service.pivot) == null ? void 0 : _b2.status)), 3),
                              createVNode("span", {
                                class: ["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", getPaymentStatusClass((_c2 = service.pivot) == null ? void 0 : _c2.payment_status)]
                              }, toDisplayString(getPaymentStatusLabel((_d2 = service.pivot) == null ? void 0 : _d2.payment_status)), 3)
                            ])
                          ]),
                          getPublicServiceDescription(service) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-3 rounded-md border border-border/60 bg-muted/20 p-3"
                          }, [
                            createVNode("h5", { class: "mb-2 text-xs font-medium text-muted-foreground" }, "Ziyaretçi açıklaması"),
                            createVNode("div", {
                              class: "quill-content prose prose-sm dark:prose-invert max-w-none text-sm",
                              innerHTML: getPublicServiceDescription(service)
                            }, null, 8, ["innerHTML"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mt-3 space-y-3 border-t border-border pt-3" }, [
                            createVNode("div", { class: "grid grid-cols-2 gap-3 md:grid-cols-3" }, [
                              ((_e2 = service.pivot) == null ? void 0 : _e2.price) ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Fiyat"),
                                createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatPrice(service.pivot.price)) + " ₺", 1)
                              ])) : createCommentVNode("", true),
                              ((_f2 = service.pivot) == null ? void 0 : _f2.service_start_date) ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Başlangıç"),
                                createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatDate(service.pivot.service_start_date)), 1)
                              ])) : createCommentVNode("", true),
                              ((_g = service.pivot) == null ? void 0 : _g.service_end_date) ? (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode("h5", { class: "text-xs font-medium text-muted-foreground" }, "Bitiş"),
                                createVNode("p", { class: "mt-1 text-sm font-semibold text-foreground" }, toDisplayString(formatDate(service.pivot.service_end_date)), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            ((_h = service.pivot) == null ? void 0 : _h.notes) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "rounded-md bg-muted/30 p-2.5"
                            }, [
                              createVNode("h5", { class: "mb-1 text-xs font-medium text-muted-foreground" }, "İç notlar"),
                              createVNode("p", { class: "whitespace-pre-wrap text-xs text-foreground" }, toDisplayString(service.pivot.notes), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "space-y-2 border-t border-border pt-3" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("h5", { class: "text-xs font-medium text-foreground" }, "TO-DO'lar"),
                                createVNode("span", { class: "text-xs font-semibold text-foreground" }, toDisplayString(getServiceCompletionPercentage(service)) + "% ", 1)
                              ]),
                              ((_i = service.todos) == null ? void 0 : _i.length) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-1.5"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(service.todos, (todo) => {
                                  return openBlock(), createBlock("div", {
                                    key: todo.id,
                                    class: "flex items-center gap-2 rounded-md border border-input bg-background p-2"
                                  }, [
                                    createVNode("input", {
                                      type: "checkbox",
                                      checked: todo.is_completed,
                                      disabled: "",
                                      class: "h-3.5 w-3.5 rounded border-input text-primary"
                                    }, null, 8, ["checked"]),
                                    createVNode("span", {
                                      class: ["flex-1 text-xs", todo.is_completed ? "text-muted-foreground line-through" : "text-foreground"]
                                    }, toDisplayString(todo.title), 3),
                                    todo.completed_at ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-xs text-muted-foreground"
                                    }, toDisplayString(formatDate(todo.completed_at)), 1)) : createCommentVNode("", true)
                                  ]);
                                }), 128))
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/20 p-2.5 text-xs text-muted-foreground"
                              }, [
                                createVNode("span", null, "Henüz TO-DO eklenmemiş")
                              ]))
                            ])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground"
                    }, [
                      createVNode("span", null, "Bu projeye atanmış hizmet bulunmuyor")
                    ]))
                  ])
                ], 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
