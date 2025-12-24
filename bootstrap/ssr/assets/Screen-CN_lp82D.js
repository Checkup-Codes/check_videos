import { computed, ref, onMounted, watch, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _sfc_main$1 } from "./CheckScreen-DjaYf9so.js";
import { _ as _sfc_main$3 } from "./TopScreen-DnNmtdW-.js";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const services = computed(() => props.services || []);
    const customers = computed(() => props.customers || []);
    const categories = computed(() => props.categories || []);
    const project = computed(() => props.project || {});
    const projectNameRef = ref(null);
    const customerIdRef = ref(null);
    const categoryIdRef = ref(null);
    const errors = ref({
      project_name: "",
      customer_id: "",
      category_id: "",
      services: ""
    });
    const servicesData = ref({});
    const selectedServices = ref([]);
    const servicesTodos = ref({});
    const initializeForm = () => {
      if (project.value.services && project.value.services.length > 0) {
        project.value.services.forEach((service) => {
          var _a, _b, _c, _d, _e, _f;
          selectedServices.value.push(service.id);
          servicesData.value[service.id] = {
            id: service.id,
            price: ((_a = service.pivot) == null ? void 0 : _a.price) || null,
            status: ((_b = service.pivot) == null ? void 0 : _b.status) || "pending",
            payment_status: ((_c = service.pivot) == null ? void 0 : _c.payment_status) || "unpaid",
            notes: ((_d = service.pivot) == null ? void 0 : _d.notes) || "",
            service_start_date: ((_e = service.pivot) == null ? void 0 : _e.service_start_date) || null,
            service_end_date: ((_f = service.pivot) == null ? void 0 : _f.service_end_date) || null
          };
          if (service.todos && service.todos.length > 0) {
            servicesTodos.value[service.id] = service.todos.map((todo) => ({
              id: todo.id,
              title: todo.title,
              is_completed: todo.is_completed || false,
              completed_at: todo.completed_at || null
            }));
          } else {
            servicesTodos.value[service.id] = [];
          }
        });
      }
    };
    const form = useForm({
      project_name: project.value.project_name || "",
      customer_id: project.value.customer_id || "",
      category_id: project.value.category_id || "",
      services: []
    });
    form.processing = false;
    onMounted(() => {
      initializeForm();
    });
    watch(() => project.value, () => {
      initializeForm();
    }, { deep: true });
    const getServiceData = (serviceId) => {
      if (!servicesData.value[serviceId]) {
        servicesData.value[serviceId] = {
          id: serviceId,
          price: null,
          status: "pending",
          payment_status: "unpaid",
          notes: "",
          service_start_date: null,
          service_end_date: null
        };
      }
      return servicesData.value[serviceId];
    };
    const getServiceTodos = (serviceId) => {
      if (!servicesTodos.value[serviceId]) {
        servicesTodos.value[serviceId] = [];
      }
      return servicesTodos.value[serviceId];
    };
    const addTodo = (serviceId) => {
      if (!servicesTodos.value[serviceId]) {
        servicesTodos.value[serviceId] = [];
      }
      servicesTodos.value[serviceId].push({
        id: null,
        title: "",
        is_completed: false,
        completed_at: null
      });
    };
    const removeTodo = async (serviceId, index) => {
      var _a;
      const todo = servicesTodos.value[serviceId][index];
      servicesTodos.value[serviceId].splice(index, 1);
      if (todo.id) {
        try {
          await axios.delete(`/project-service-todos/${todo.id}`, {
            headers: {
              "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
            }
          });
        } catch (error) {
          servicesTodos.value[serviceId].splice(index, 0, todo);
          console.error("Todo silinirken hata oluştu:", error);
        }
      }
    };
    const toggleTodo = async (serviceId, index) => {
      var _a;
      const todo = servicesTodos.value[serviceId][index];
      const previousState = todo.is_completed;
      const previousCompletedAt = todo.completed_at;
      todo.is_completed = !todo.is_completed;
      todo.completed_at = todo.is_completed ? (/* @__PURE__ */ new Date()).toISOString() : null;
      if (todo.id) {
        try {
          await axios.put(`/project-service-todos/${todo.id}`, {
            is_completed: todo.is_completed
          }, {
            headers: {
              "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
            }
          });
        } catch (error) {
          todo.is_completed = previousState;
          todo.completed_at = previousCompletedAt;
          console.error("Todo güncellenirken hata oluştu:", error);
        }
      }
    };
    const updateTodo = async (serviceId, index) => {
      var _a;
      const todo = servicesTodos.value[serviceId][index];
      if (!todo.title || !todo.title.trim()) {
        return;
      }
      const csrfToken = ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || "";
      if (todo.id) {
        try {
          await axios.put(`/project-service-todos/${todo.id}`, {
            title: todo.title
          }, {
            headers: {
              "X-CSRF-TOKEN": csrfToken
            }
          });
        } catch (error) {
          console.error("Todo güncellenirken hata oluştu:", error);
        }
      } else {
        try {
          const response = await axios.post("/project-service-todos", {
            project_id: project.value.id,
            service_id: serviceId,
            title: todo.title,
            is_completed: todo.is_completed || false
          }, {
            headers: {
              "X-CSRF-TOKEN": csrfToken
            }
          });
          if (response.data && response.data.id) {
            todo.id = response.data.id;
            if (response.data.completed_at) {
              todo.completed_at = response.data.completed_at;
            }
          }
        } catch (error) {
          console.error("Todo oluşturulurken hata oluştu:", error);
        }
      }
    };
    const getCompletionPercentage = (serviceId) => {
      const todos = getServiceTodos(serviceId);
      if (todos.length === 0) return 0;
      const completed = todos.filter((t) => t.is_completed).length;
      return Math.round(completed / todos.length * 100);
    };
    const handleServiceToggle = (serviceId) => {
      if (!selectedServices.value.includes(serviceId)) {
        delete servicesData.value[serviceId];
        delete servicesTodos.value[serviceId];
      }
    };
    const handleSubmit = () => {
      form.services = selectedServices.value.map((serviceId) => getServiceData(serviceId));
      form.put(`/projects/${project.value.id}`, {
        onSuccess: () => {
          selectedServices.value.forEach((serviceId) => {
            const todos = getServiceTodos(serviceId);
            todos.forEach((todo) => {
              if (!todo.id && todo.title && todo.title.trim()) {
                router.post("/project-service-todos", {
                  project_id: project.value.id,
                  service_id: serviceId,
                  title: todo.title,
                  is_completed: todo.is_completed || false
                }, {
                  preserveState: true,
                  preserveScroll: true
                });
              }
            });
          });
        },
        onError: (serverErrors) => {
          if (serverErrors) {
            Object.keys(serverErrors).forEach((key) => {
              if (errors.value.hasOwnProperty(key)) {
                errors.value[key] = serverErrors[key];
              }
            });
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              url: `/projects/${project.value.id}`
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, { title: "Projeyi Düzenle" }, null, _parent2, _scopeId));
            _push2(`<div class="rounded-lg border border-border bg-card shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="space-y-4"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Proje Bilgileri</h3><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Proje Adı</label><input${ssrRenderAttr("value", unref(form).project_name)} type="text" placeholder="Proje adını girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.project_name || unref(form).errors.project_name }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}>`);
            if (errors.value.project_name || unref(form).errors.project_name) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.project_name || unref(form).errors.project_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Müşteri Seçin</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.customer_id || unref(form).errors.customer_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" required${_scopeId}><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}${_scopeId}>Bir müşteri seçin</option><!--[-->`);
            ssrRenderList(customers.value, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, customer.id) : ssrLooseEqual(unref(form).customer_id, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.customer_id || unref(form).errors.customer_id) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.customer_id || unref(form).errors.customer_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="mb-1 block text-sm font-medium text-foreground"${_scopeId}>Kategori/Yazı Bağlantısı (Opsiyonel)</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.category_id || unref(form).errors.category_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Kategori seçin (opsiyonel)</option><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.category_id || unref(form).errors.category_id) {
              _push2(`<p class="mt-1 text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId}> Bu projeye ait yazıların bulunduğu kategoriyi seçin. Bu kategori altındaki tüm yazılar bu projeyle ilişkilendirilir. </p></div></div><div class="space-y-4 border-t border-border pt-6"${_scopeId}><h3 class="text-sm font-semibold text-foreground"${_scopeId}>Servisler</h3>`);
            if (!services.value || services.value.length === 0) {
              _push2(`<div class="flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>Henüz servis bulunmamaktadır.</span></div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(services.value, (service) => {
                _push2(`<div class="rounded-md border border-input bg-card p-4"${_scopeId}><label class="flex cursor-pointer items-center gap-3"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedServices.value) ? ssrLooseContain(selectedServices.value, service.id) : selectedServices.value) ? " checked" : ""} class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId}><div class="flex-1"${_scopeId}><span class="text-sm font-medium text-foreground"${_scopeId}>${ssrInterpolate(service.name)}</span>`);
                if (service.description) {
                  _push2(`<p class="mt-1 text-xs text-muted-foreground"${_scopeId}>${ssrInterpolate(service.description)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></label>`);
                if (selectedServices.value.includes(service.id)) {
                  _push2(`<div class="mt-4 space-y-3 border-t border-border pt-4 pl-7"${_scopeId}><div class="grid grid-cols-1 gap-3 md:grid-cols-2"${_scopeId}><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Projeye Özel Fiyat (₺)</label><input${ssrRenderAttr("value", getServiceData(service.id).price)} type="number" step="0.01" min="0" placeholder="Fiyat girin" class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Durum</label><select class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).status) ? ssrLooseContain(getServiceData(service.id).status, "pending") : ssrLooseEqual(getServiceData(service.id).status, "pending")) ? " selected" : ""}${_scopeId}>Beklemede</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).status) ? ssrLooseContain(getServiceData(service.id).status, "active") : ssrLooseEqual(getServiceData(service.id).status, "active")) ? " selected" : ""}${_scopeId}>Aktif</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).status) ? ssrLooseContain(getServiceData(service.id).status, "completed") : ssrLooseEqual(getServiceData(service.id).status, "completed")) ? " selected" : ""}${_scopeId}>Tamamlandı</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).status) ? ssrLooseContain(getServiceData(service.id).status, "cancelled") : ssrLooseEqual(getServiceData(service.id).status, "cancelled")) ? " selected" : ""}${_scopeId}>İptal Edildi</option></select></div><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Ödeme Durumu</label><select class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}><option value="unpaid"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).payment_status) ? ssrLooseContain(getServiceData(service.id).payment_status, "unpaid") : ssrLooseEqual(getServiceData(service.id).payment_status, "unpaid")) ? " selected" : ""}${_scopeId}>Ödenmedi</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).payment_status) ? ssrLooseContain(getServiceData(service.id).payment_status, "partial") : ssrLooseEqual(getServiceData(service.id).payment_status, "partial")) ? " selected" : ""}${_scopeId}>Kısmi Ödendi</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(getServiceData(service.id).payment_status) ? ssrLooseContain(getServiceData(service.id).payment_status, "paid") : ssrLooseEqual(getServiceData(service.id).payment_status, "paid")) ? " selected" : ""}${_scopeId}>Ödendi</option></select></div><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Hizmet Başlangıç Tarihi</label><input${ssrRenderAttr("value", getServiceData(service.id).service_start_date)} type="date" class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}></div><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Hizmet Bitiş Tarihi</label><input${ssrRenderAttr("value", getServiceData(service.id).service_end_date)} type="date" class="flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}></div></div><div${_scopeId}><label class="mb-1 block text-xs font-medium text-foreground"${_scopeId}>Notlar</label><textarea rows="3" placeholder="Bu servis hakkında notlar..." class="flex w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"${_scopeId}>${ssrInterpolate(getServiceData(service.id).notes)}</textarea></div><div class="space-y-3 border-t border-border pt-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><label class="block text-xs font-medium text-foreground"${_scopeId}>TO-DO&#39;lar</label><span class="text-xs text-muted-foreground"${_scopeId}> Tamamlanma: ${ssrInterpolate(getCompletionPercentage(service.id))}% </span></div><div class="space-y-2"${_scopeId}><!--[-->`);
                  ssrRenderList(getServiceTodos(service.id), (todo, index) => {
                    _push2(`<div class="flex items-center gap-2 rounded-md border border-input bg-background p-2"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(todo.is_completed) ? " checked" : ""} class="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"${_scopeId}><input${ssrRenderAttr("value", todo.title)} type="text" placeholder="Todo başlığı..." class="flex-1 border-none bg-transparent px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-0"${_scopeId}><button type="button" class="text-destructive hover:text-destructive/80"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div>`);
                  });
                  _push2(`<!--]--></div><button type="button" class="inline-flex h-7 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"${_scopeId}></path></svg> Yeni TO-DO Ekle </button></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (errors.value.services || unref(form).errors.services) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(errors.value.services || unref(form).errors.services)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end gap-2 border-t border-border pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: `/projects/${project.value.id}`,
              class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` İptal `);
                } else {
                  return [
                    createTextVNode(" İptal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit" class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Güncelleniyor..." : "Projeyi Güncelle")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(_sfc_main$2, {
                url: `/projects/${project.value.id}`
              }, null, 8, ["url"]),
              createVNode(_sfc_main$3, { title: "Projeyi Düzenle" }),
              createVNode("div", { class: "rounded-lg border border-border bg-card shadow-sm" }, [
                createVNode("div", { class: "p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(handleSubmit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Proje Bilgileri"),
                      createVNode("div", {
                        ref_key: "projectNameRef",
                        ref: projectNameRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Proje Adı"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).project_name = $event,
                          type: "text",
                          placeholder: "Proje adını girin",
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.project_name || unref(form).errors.project_name }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).project_name]
                        ]),
                        errors.value.project_name || unref(form).errors.project_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.project_name || unref(form).errors.project_name), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "customerIdRef",
                        ref: customerIdRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Müşteri Seçin"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.customer_id || unref(form).errors.customer_id }],
                          required: ""
                        }, [
                          createVNode("option", {
                            disabled: "",
                            value: ""
                          }, "Bir müşteri seçin"),
                          (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                            return openBlock(), createBlock("option", {
                              key: customer.id,
                              value: customer.id
                            }, toDisplayString(customer.first_name) + " " + toDisplayString(customer.last_name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).customer_id]
                        ]),
                        errors.value.customer_id || unref(form).errors.customer_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.customer_id || unref(form).errors.customer_id), 1)) : createCommentVNode("", true)
                      ], 512),
                      createVNode("div", {
                        ref_key: "categoryIdRef",
                        ref: categoryIdRef
                      }, [
                        createVNode("label", { class: "mb-1 block text-sm font-medium text-foreground" }, "Kategori/Yazı Bağlantısı (Opsiyonel)"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                          class: ["flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", { "border-destructive focus-visible:ring-destructive": errors.value.category_id || unref(form).errors.category_id }]
                        }, [
                          createVNode("option", { value: "" }, "Kategori seçin (opsiyonel)"),
                          (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).category_id]
                        ]),
                        errors.value.category_id || unref(form).errors.category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-destructive"
                        }, toDisplayString(errors.value.category_id || unref(form).errors.category_id), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-1 text-xs text-muted-foreground" }, " Bu projeye ait yazıların bulunduğu kategoriyi seçin. Bu kategori altındaki tüm yazılar bu projeyle ilişkilendirilir. ")
                      ], 512)
                    ]),
                    createVNode("div", { class: "space-y-4 border-t border-border pt-6" }, [
                      createVNode("h3", { class: "text-sm font-semibold text-foreground" }, "Servisler"),
                      !services.value || services.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center gap-3 rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          class: "h-5 w-5 shrink-0",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createVNode("span", null, "Henüz servis bulunmamaktadır.")
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-4"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                          return openBlock(), createBlock("div", {
                            key: service.id,
                            class: "rounded-md border border-input bg-card p-4"
                          }, [
                            createVNode("label", { class: "flex cursor-pointer items-center gap-3" }, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                value: service.id,
                                "onUpdate:modelValue": ($event) => selectedServices.value = $event,
                                onChange: ($event) => handleServiceToggle(service.id),
                                class: "h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              }, null, 40, ["value", "onUpdate:modelValue", "onChange"]), [
                                [vModelCheckbox, selectedServices.value]
                              ]),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("span", { class: "text-sm font-medium text-foreground" }, toDisplayString(service.name), 1),
                                service.description ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-muted-foreground"
                                }, toDisplayString(service.description), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            selectedServices.value.includes(service.id) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4 space-y-3 border-t border-border pt-4 pl-7"
                            }, [
                              createVNode("div", { class: "grid grid-cols-1 gap-3 md:grid-cols-2" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Projeye Özel Fiyat (₺)"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => getServiceData(service.id).price = $event,
                                    type: "number",
                                    step: "0.01",
                                    min: "0",
                                    placeholder: "Fiyat girin",
                                    class: "flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [
                                      vModelText,
                                      getServiceData(service.id).price,
                                      void 0,
                                      { number: true }
                                    ]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Durum"),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => getServiceData(service.id).status = $event,
                                    class: "flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  }, [
                                    createVNode("option", { value: "pending" }, "Beklemede"),
                                    createVNode("option", { value: "active" }, "Aktif"),
                                    createVNode("option", { value: "completed" }, "Tamamlandı"),
                                    createVNode("option", { value: "cancelled" }, "İptal Edildi")
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, getServiceData(service.id).status]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Ödeme Durumu"),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => getServiceData(service.id).payment_status = $event,
                                    class: "flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  }, [
                                    createVNode("option", { value: "unpaid" }, "Ödenmedi"),
                                    createVNode("option", { value: "partial" }, "Kısmi Ödendi"),
                                    createVNode("option", { value: "paid" }, "Ödendi")
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, getServiceData(service.id).payment_status]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Hizmet Başlangıç Tarihi"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => getServiceData(service.id).service_start_date = $event,
                                    type: "date",
                                    class: "flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, getServiceData(service.id).service_start_date]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Hizmet Bitiş Tarihi"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => getServiceData(service.id).service_end_date = $event,
                                    type: "date",
                                    class: "flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, getServiceData(service.id).service_end_date]
                                  ])
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "mb-1 block text-xs font-medium text-foreground" }, "Notlar"),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => getServiceData(service.id).notes = $event,
                                  rows: "3",
                                  placeholder: "Bu servis hakkında notlar...",
                                  class: "flex w-full rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, getServiceData(service.id).notes]
                                ])
                              ]),
                              createVNode("div", { class: "space-y-3 border-t border-border pt-4" }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("label", { class: "block text-xs font-medium text-foreground" }, "TO-DO'lar"),
                                  createVNode("span", { class: "text-xs text-muted-foreground" }, " Tamamlanma: " + toDisplayString(getCompletionPercentage(service.id)) + "% ", 1)
                                ]),
                                createVNode("div", { class: "space-y-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(getServiceTodos(service.id), (todo, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: todo.id || `temp-${index}`,
                                      class: "flex items-center gap-2 rounded-md border border-input bg-background p-2"
                                    }, [
                                      createVNode("input", {
                                        type: "checkbox",
                                        checked: todo.is_completed,
                                        onChange: ($event) => toggleTodo(service.id, index),
                                        class: "h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                      }, null, 40, ["checked", "onChange"]),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => todo.title = $event,
                                        type: "text",
                                        placeholder: "Todo başlığı...",
                                        class: "flex-1 border-none bg-transparent px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-0",
                                        onBlur: ($event) => updateTodo(service.id, index)
                                      }, null, 40, ["onUpdate:modelValue", "onBlur"]), [
                                        [vModelText, todo.title]
                                      ]),
                                      createVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeTodo(service.id, index),
                                        class: "text-destructive hover:text-destructive/80"
                                      }, [
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          class: "h-4 w-4",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor",
                                          "stroke-width": "2"
                                        }, [
                                          createVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            d: "M6 18L18 6M6 6l12 12"
                                          })
                                        ]))
                                      ], 8, ["onClick"])
                                    ]);
                                  }), 128))
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => addTodo(service.id),
                                  class: "inline-flex h-7 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "h-3 w-3",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    "stroke-width": "2"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M12 4.5v15m7.5-7.5h-15"
                                    })
                                  ])),
                                  createTextVNode(" Yeni TO-DO Ekle ")
                                ], 8, ["onClick"])
                              ])
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])),
                      errors.value.services || unref(form).errors.services ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-xs text-destructive"
                      }, toDisplayString(errors.value.services || unref(form).errors.services), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end gap-2 border-t border-border pt-4" }, [
                      createVNode(unref(Link), {
                        href: `/projects/${project.value.id}`,
                        class: "inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" İptal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        class: "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        disabled: unref(form).processing
                      }, [
                        unref(form).processing ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "h-4 w-4 animate-spin",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("circle", {
                            class: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            "stroke-width": "4"
                          }),
                          createVNode("path", {
                            class: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          })
                        ])) : (openBlock(), createBlock("svg", {
                          key: 1,
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "h-4 w-4",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M5 13l4 4L19 7"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Güncelleniyor..." : "Projeyi Güncelle"), 1)
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Projects/Project/Edit/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
