import { ref, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Quill from "quill";
/* empty css                    */
import { _ as _export_sfc } from "../app2.js";
import "@inertiajs/progress";
import "@fortawesome/vue-fontawesome";
import "axios";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const softwareProduct = ref(props.softwareProduct || {});
    const form = useForm({
      name: softwareProduct.value.name || "",
      slug: softwareProduct.value.slug || "",
      description: softwareProduct.value.description || "",
      price: softwareProduct.value.price || 0,
      stock: softwareProduct.value.stock || 0,
      category: softwareProduct.value.category || "",
      platform: softwareProduct.value.platform || "",
      version: softwareProduct.value.version || "",
      license_key: softwareProduct.value.license_key || "",
      is_subscription: softwareProduct.value.is_subscription || false,
      subscription_duration: softwareProduct.value.subscription_duration || 0,
      download_url: softwareProduct.value.download_url || "",
      system_requirements: softwareProduct.value.system_requirements || ""
    });
    const flashSuccess = ref(props.flash);
    onMounted(() => {
      if (flashSuccess.value) {
        setTimeout(() => {
          flashSuccess.value = null;
        }, 3e3);
      }
      const quill = new Quill(quillEditor.value, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"]
          ]
        }
      });
      quill.root.innerHTML = form.description;
      quill.on("text-change", () => {
        form.description = quill.root.innerHTML;
      });
    });
    const quillEditor = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)} data-v-a1207abc><div class="grid grid-cols-6 gap-4 p-5" data-v-a1207abc><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.name) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.slug) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.slug)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Category</label><input${ssrRenderAttr("value", unref(form).category)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.category) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.category)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Price</label><input${ssrRenderAttr("value", unref(form).price)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.price) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.price)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Description</label><div class="h-96" data-v-a1207abc></div>`);
      if (unref(form).errors.description) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Stock</label><input${ssrRenderAttr("value", unref(form).stock)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.stock) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.stock)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Subscription Duration</label><input${ssrRenderAttr("value", unref(form).subscription_duration)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.subscription_duration) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.subscription_duration)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>License Key</label><input${ssrRenderAttr("value", unref(form).license_key)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.license_key) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.license_key)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Version</label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.version) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.version)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Platform</label><input${ssrRenderAttr("value", unref(form).platform)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.platform) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.platform)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Download URL</label><input${ssrRenderAttr("value", unref(form).download_url)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.download_url) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.download_url)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>Is Subscription</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_subscription) ? ssrLooseContain(unref(form).is_subscription, null) : unref(form).is_subscription) ? " checked" : ""} type="checkbox" class="block rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.is_subscription) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.is_subscription)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-a1207abc><label class="mb-1 block font-medium" data-v-a1207abc>System Requirements</label><input${ssrRenderAttr("value", unref(form).system_requirements)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-a1207abc>`);
      if (unref(form).errors.system_requirements) {
        _push(`<div class="input-error" data-v-a1207abc>${ssrInterpolate(unref(form).errors.system_requirements)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-a1207abc><button type="submit" class="btn-primary" data-v-a1207abc>Update</button></div></div></form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1207abc"]]);
export {
  Edit as default
};
