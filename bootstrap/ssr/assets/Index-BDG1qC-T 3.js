import { ref, onMounted, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import _sfc_main$1 from "./SPPrice-DDe_ZJN3.js";
import _sfc_main$2 from "./SPSpaces-C-9fwGUn.js";
import _sfc_main$3 from "./SPAddress-C4B-URBw.js";
import Box from "./Box-CvUfE-UW.js";
import _sfc_main$4 from "./ConfirmModal-8bTg5PxV.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "axios";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    softwareProducts: Array
  },
  setup(__props) {
    const { props } = usePage();
    const isDeleteModalVisible = ref(false);
    const productToDelete = ref(null);
    const showDeleteModal = (product) => {
      productToDelete.value = product;
      isDeleteModalVisible.value = true;
    };
    const deleteProduct = () => {
      Inertia.delete(route("software-products.destroy", { software_product: productToDelete.value }), {
        onSuccess: () => {
          softwareProducts.value = softwareProducts.value.filter((product) => product.id !== productToDelete.value.id);
          isDeleteModalVisible.value = false;
        }
      });
    };
    const flashSuccess = ref(props.flash.success);
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (flashSuccess.value) {
        _push(`<div class="fixed right-4 top-4 z-50"><div class="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert"><strong class="font-bold">Success! </strong><span class="block sm:inline">${ssrInterpolate(flashSuccess.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between px-7 py-5"><h1 class="text-2xl font-bold">Yazılım Ürünleri</h1>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("software-products.create"),
        class: "text-md text-right font-semibold underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Yeni Ekle`);
          } else {
            return [
              createTextVNode("Yeni Ekle")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 xl:grid-cols-2"><!--[-->`);
      ssrRenderList(__props.softwareProducts, (softwareProduct) => {
        _push(ssrRenderComponent(Box, {
          key: softwareProduct.slug,
          class: "relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex justify-between"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("software-products.show", { software_product: softwareProduct })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      price: softwareProduct.price,
                      class: "text-2xl font-bold text-gray-700"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      product: softwareProduct,
                      class: "text-lg text-gray-700"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      product: softwareProduct,
                      class: "text-gray-700"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$1, {
                        price: softwareProduct.price,
                        class: "text-2xl font-bold text-gray-700"
                      }, null, 8, ["price"]),
                      createVNode(_sfc_main$2, {
                        product: softwareProduct,
                        class: "text-lg text-gray-700"
                      }, null, 8, ["product"]),
                      createVNode(_sfc_main$3, {
                        product: softwareProduct,
                        class: "text-gray-700"
                      }, null, 8, ["product"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="items-center space-y-2 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("software-products.show", { software_product: softwareProduct }),
                class: "btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="rounded-sm border-[1px] px-2 py-1"${_scopeId2}>Show</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "rounded-sm border-[1px] px-2 py-1" }, "Show")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="flex space-x-1"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("software-products.edit", { software_product: softwareProduct }),
                class: "btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="rounded-sm border-[1px] px-4 py-1"${_scopeId2}>Edit</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "rounded-sm border-[1px] px-4 py-1" }, "Edit")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="rounded-sm border-[1px] px-2 py-1"${_scopeId}><button class="btn-secondary"${_scopeId}>Delete</button></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("software-products.show", { software_product: softwareProduct })
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1, {
                        price: softwareProduct.price,
                        class: "text-2xl font-bold text-gray-700"
                      }, null, 8, ["price"]),
                      createVNode(_sfc_main$2, {
                        product: softwareProduct,
                        class: "text-lg text-gray-700"
                      }, null, 8, ["product"]),
                      createVNode(_sfc_main$3, {
                        product: softwareProduct,
                        class: "text-gray-700"
                      }, null, 8, ["product"])
                    ]),
                    _: 2
                  }, 1032, ["href"]),
                  createVNode("div", { class: "items-center space-y-2 text-center" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("software-products.show", { software_product: softwareProduct }),
                      class: "btn-primary"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "rounded-sm border-[1px] px-2 py-1" }, "Show")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "flex space-x-1" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("software-products.edit", { software_product: softwareProduct }),
                        class: "btn-primary"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "rounded-sm border-[1px] px-4 py-1" }, "Edit")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("div", { class: "rounded-sm border-[1px] px-2 py-1" }, [
                        createVNode("button", {
                          onClick: ($event) => showDeleteModal(softwareProduct),
                          class: "btn-secondary"
                        }, "Delete", 8, ["onClick"])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (isDeleteModalVisible.value) {
        _push(ssrRenderComponent(_sfc_main$4, {
          title: "Delete Product",
          message: "Are you sure you want to delete this product?",
          isVisible: isDeleteModalVisible.value,
          onConfirm: deleteProduct,
          onCancel: ($event) => isDeleteModalVisible.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
