import { ref, onMounted, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    });
    const editor = ClassicEditor;
    const editorConfig = {
      toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
      heading: {
        options: [
          { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
          { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
          { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" }
        ]
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ckeditor = resolveComponent("ckeditor");
      _push(`<form${ssrRenderAttrs(_attrs)} data-v-fb41f644><div class="grid grid-cols-6 gap-4 p-5" data-v-fb41f644><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.name) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.slug) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.slug)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Category</label><input${ssrRenderAttr("value", unref(form).category)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.category) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.category)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Price</label><input${ssrRenderAttr("value", unref(form).price)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.price) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.price)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Description</label>`);
      _push(ssrRenderComponent(_component_ckeditor, {
        editor: unref(editor),
        modelValue: unref(form).description,
        "onUpdate:modelValue": ($event) => unref(form).description = $event,
        class: "h-96",
        config: editorConfig
      }, null, _parent));
      if (unref(form).errors.description) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Stock</label><input${ssrRenderAttr("value", unref(form).stock)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.stock) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.stock)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Subscription Duration</label><input${ssrRenderAttr("value", unref(form).subscription_duration)} type="number" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.subscription_duration) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.subscription_duration)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>License Key</label><input${ssrRenderAttr("value", unref(form).license_key)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.license_key) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.license_key)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Version</label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.version) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.version)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Platform</label><input${ssrRenderAttr("value", unref(form).platform)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.platform) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.platform)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Download URL</label><input${ssrRenderAttr("value", unref(form).download_url)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.download_url) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.download_url)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>Is Subscription</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_subscription) ? ssrLooseContain(unref(form).is_subscription, null) : unref(form).is_subscription) ? " checked" : ""} type="checkbox" class="block rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.is_subscription) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.is_subscription)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-fb41f644><label class="mb-1 block font-medium" data-v-fb41f644>System Requirements</label><input${ssrRenderAttr("value", unref(form).system_requirements)} type="text" class="block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600" data-v-fb41f644>`);
      if (unref(form).errors.system_requirements) {
        _push(`<div class="input-error" data-v-fb41f644>${ssrInterpolate(unref(form).errors.system_requirements)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-fb41f644><button type="submit" class="btn-primary" data-v-fb41f644>Update</button></div></div></form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb41f644"]]);
export {
  Edit as default
};
