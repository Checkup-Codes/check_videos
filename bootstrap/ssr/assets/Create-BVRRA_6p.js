import { ref, onMounted, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const form = useForm({
      name: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      platform: "",
      version: "",
      license_key: "",
      is_subscription: false,
      subscription_duration: 0,
      download_url: "",
      system_requirements: ""
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
      _push(`<form${ssrRenderAttrs(_attrs)} data-v-1e357ec2><div class="grid grid-cols-6 gap-4 p-5" data-v-1e357ec2><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.name) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.name)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Slug</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.slug) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.slug)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Category</label><input${ssrRenderAttr("value", unref(form).category)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.category) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.category)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Price</label><input${ssrRenderAttr("value", unref(form).price)} type="number" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.price) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.price)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Description</label>`);
      _push(ssrRenderComponent(_component_ckeditor, {
        editor: unref(editor),
        modelValue: unref(form).description,
        "onUpdate:modelValue": ($event) => unref(form).description = $event,
        class: "h-96",
        config: editorConfig
      }, null, _parent));
      if (unref(form).errors.description) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Stock</label><input${ssrRenderAttr("value", unref(form).stock)} type="number" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.stock) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.stock)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Subscription Duration</label><input${ssrRenderAttr("value", unref(form).subscription_duration)} type="number" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.subscription_duration) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.subscription_duration)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>License Key</label><input${ssrRenderAttr("value", unref(form).license_key)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.license_key) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.license_key)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Version</label><input${ssrRenderAttr("value", unref(form).version)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.version) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.version)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Platform</label><input${ssrRenderAttr("value", unref(form).platform)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.platform) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.platform)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Download URL</label><input${ssrRenderAttr("value", unref(form).download_url)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.download_url) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.download_url)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-3" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>Is Subscription</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_subscription) ? ssrLooseContain(unref(form).is_subscription, null) : unref(form).is_subscription) ? " checked" : ""} type="checkbox" class="block rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.is_subscription) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.is_subscription)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-1e357ec2><label class="mb-1 block font-medium text-gray-800" data-v-1e357ec2>System Requirements</label><input${ssrRenderAttr("value", unref(form).system_requirements)} type="text" class="block w-full rounded-md border border-gray-300 p-2 text-gray-800 shadow-sm dark:border-gray-600" data-v-1e357ec2>`);
      if (unref(form).errors.system_requirements) {
        _push(`<div class="input-error" data-v-1e357ec2>${ssrInterpolate(unref(form).errors.system_requirements)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-span-6" data-v-1e357ec2><button type="submit" class="btn-primary" data-v-1e357ec2>Create</button></div></div></form>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/SoftwareProducts/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e357ec2"]]);
export {
  Create as default
};
