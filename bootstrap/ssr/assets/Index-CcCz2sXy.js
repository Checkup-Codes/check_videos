import { defineComponent, ref, computed, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives, vModelCheckbox, withModifiers, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrLooseContain } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-BxMNcEld.js";
import "vuex";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tenants: {},
    stats: {},
    mainDomain: {}
  },
  setup(__props) {
    const showCreateModal = ref(false);
    const showDeleteModal = ref(false);
    const isCreating = ref(false);
    const isDeleting = ref(false);
    const isCleaningUp = ref(false);
    const isRefreshing = ref(false);
    const createError = ref("");
    const tenantToDelete = ref(null);
    const form = ref({
      domain: "",
      copy_users: true,
      db_name: "",
      db_user: "",
      db_pass: ""
    });
    const checklist = ref({
      domainBought: false,
      domainParked: false,
      dnsWaited: false
    });
    const allChecklistComplete = computed(() => {
      return checklist.value.domainBought && checklist.value.domainParked && checklist.value.dnsWaited;
    });
    const createTenant = async () => {
      var _a;
      if (!form.value.domain) {
        createError.value = "Domain alanı zorunludur";
        return;
      }
      isCreating.value = true;
      createError.value = "";
      try {
        const response = await fetch("/tenants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
          },
          body: JSON.stringify(form.value)
        });
        const data = await response.json();
        if (data.success) {
          showCreateModal.value = false;
          form.value = {
            domain: "",
            copy_users: true,
            db_name: "",
            db_user: "",
            db_pass: ""
          };
          router.reload();
        } else {
          createError.value = data.message || "Tenant oluşturulamadı";
        }
      } catch (error) {
        createError.value = "Bir hata oluştu: " + error;
      } finally {
        isCreating.value = false;
      }
    };
    const confirmDelete = (tenant) => {
      tenantToDelete.value = tenant;
      showDeleteModal.value = true;
    };
    const deleteTenant = async () => {
      var _a;
      if (!tenantToDelete.value) return;
      isDeleting.value = true;
      try {
        const response = await fetch(`/tenants/${tenantToDelete.value.domain}`, {
          method: "DELETE",
          headers: {
            "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
          }
        });
        const data = await response.json();
        if (data.success) {
          showDeleteModal.value = false;
          tenantToDelete.value = null;
          router.reload();
        } else {
          alert("Hata: " + data.message);
        }
      } catch (error) {
        alert("Bir hata oluştu: " + error);
      } finally {
        isDeleting.value = false;
      }
    };
    const cleanupDots = async () => {
      var _a;
      if (!confirm("Boş nokta klasörlerini temizlemek istediğinize emin misiniz?")) {
        return;
      }
      isCleaningUp.value = true;
      try {
        const response = await fetch("/tenants/cleanup-dots", {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
          }
        });
        const data = await response.json();
        if (data.success) {
          alert("✅ Temizlik tamamlandı!");
          router.reload();
        } else {
          alert("Hata: " + data.message);
        }
      } catch (error) {
        alert("Bir hata oluştu: " + error);
      } finally {
        isCleaningUp.value = false;
      }
    };
    const refreshData = () => {
      isRefreshing.value = true;
      router.reload({
        onFinish: () => {
          isRefreshing.value = false;
        }
      });
    };
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1e3);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-slate-900 dark:text-white"${_scopeId}> 🏢 Domain Yönetimi </h1><p class="mt-2 text-slate-600 dark:text-slate-400"${_scopeId}> Tüm domain&#39;lerinizi buradan yönetin (ana domain dahil) </p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-slate-600 dark:text-slate-400"${_scopeId}>Toplam Domain</p><p class="text-3xl font-bold text-slate-900 dark:text-white mt-2"${_scopeId}>${ssrInterpolate(__props.stats.total_tenants)}</p><p class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId}> Ana domain dahil </p></div><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"${_scopeId}><span class="text-2xl"${_scopeId}>🏢</span></div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-slate-600 dark:text-slate-400"${_scopeId}>Database Boyutu</p><p class="text-3xl font-bold text-slate-900 dark:text-white mt-2"${_scopeId}>${ssrInterpolate(__props.stats.total_db_size_formatted)}</p></div><div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"${_scopeId}><span class="text-2xl"${_scopeId}>💾</span></div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-slate-600 dark:text-slate-400"${_scopeId}>Storage Boyutu</p><p class="text-3xl font-bold text-slate-900 dark:text-white mt-2"${_scopeId}>${ssrInterpolate(__props.stats.total_storage_size_formatted)}</p></div><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"${_scopeId}><span class="text-2xl"${_scopeId}>📁</span></div></div></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-slate-600 dark:text-slate-400"${_scopeId}>Toplam Dosya</p><p class="text-3xl font-bold text-slate-900 dark:text-white mt-2"${_scopeId}>${ssrInterpolate(__props.stats.total_files)}</p></div><div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center"${_scopeId}><span class="text-2xl"${_scopeId}>📄</span></div></div></div></div><div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-6"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><span class="text-3xl"${_scopeId}>ℹ️</span><div${_scopeId}><h3 class="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2"${_scopeId}> Yeni Tenant Eklemeden Önce </h3><ol class="space-y-2 text-sm text-blue-800 dark:text-blue-400"${_scopeId}><li class="flex items-start gap-2"${_scopeId}><span class="font-bold"${_scopeId}>1.</span><span${_scopeId}><strong${_scopeId}>Hostinger&#39;da domain satın al</strong> (örn: candundar.com)</span></li><li class="flex items-start gap-2"${_scopeId}><span class="font-bold"${_scopeId}>2.</span><span${_scopeId}><strong${_scopeId}>Domain&#39;i ${ssrInterpolate(__props.mainDomain)}&#39;e park et</strong> (DNS ayarları)</span></li><li class="flex items-start gap-2"${_scopeId}><span class="font-bold"${_scopeId}>3.</span><span${_scopeId}><strong${_scopeId}>5-10 dakika bekle</strong> (DNS yayılması için)</span></li><li class="flex items-start gap-2"${_scopeId}><span class="font-bold"${_scopeId}>4.</span><span${_scopeId}><strong${_scopeId}>Buradan tenant oluştur</strong> (aşağıdaki buton ile)</span></li></ol></div></div></div><div class="flex gap-4 mb-6"${_scopeId}><button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"${_scopeId}><span class="text-xl"${_scopeId}>➕</span> Yeni Tenant Ekle </button><button${ssrIncludeBooleanAttr(isCleaningUp.value) ? " disabled" : ""} class="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"${_scopeId}><span class="text-xl"${_scopeId}>🧹</span> ${ssrInterpolate(isCleaningUp.value ? "Temizleniyor..." : "Nokta Klasörlerini Temizle")}</button><button${ssrIncludeBooleanAttr(isRefreshing.value) ? " disabled" : ""} class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"${_scopeId}><span class="text-xl"${_scopeId}>🔄</span> ${ssrInterpolate(isRefreshing.value ? "Yenileniyor..." : "Yenile")}</button></div><div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700"${_scopeId}><tr${_scopeId}><th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Domain</th><th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>İsim</th><th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Database</th><th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Storage</th><th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>Oluşturulma</th><th class="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white"${_scopeId}>İşlemler</th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-700"${_scopeId}>`);
            if (__props.tenants.length === 0) {
              _push2(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50"${_scopeId}><td colspan="6" class="px-6 py-12 text-center"${_scopeId}><div class="flex flex-col items-center gap-4"${_scopeId}><div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center"${_scopeId}><span class="text-3xl"${_scopeId}>📦</span></div><div${_scopeId}><p class="text-lg font-medium text-slate-900 dark:text-white mb-1"${_scopeId}> Henüz tenant eklenmemiş </p><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Yeni bir tenant eklemek için yukarıdaki butonu kullanın </p></div></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.tenants, (tenant) => {
              _push2(`<tr class="${ssrRenderClass([{ "bg-blue-50 dark:bg-blue-900/20": tenant.type === "main" }, "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"])}"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><a${ssrRenderAttr("href", `https://${tenant.domain}`)} target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline font-medium"${_scopeId}>${ssrInterpolate(tenant.domain)}</a>`);
              if (tenant.type === "main") {
                _push2(`<span class="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded"${_scopeId}> ANA DOMAIN </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(tenant.name)}</td><td class="px-6 py-4"${_scopeId}><div class="text-sm"${_scopeId}><div class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(tenant.database.size_formatted)}</div><div class="text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(tenant.database.tables)} tablo </div></div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm"${_scopeId}><div class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(tenant.storage.size_formatted)}</div><div class="text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(tenant.storage.files)} dosya </div></div></td><td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(formatDate(tenant.created_at))}</td><td class="px-6 py-4 text-right"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><a${ssrRenderAttr("href", `/tenants/${tenant.domain}`)} class="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors"${_scopeId}> 📊 Detay </a>`);
              if (tenant.type !== "main") {
                _push2(`<button class="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"${_scopeId}> 🗑️ Sil </button>`);
              } else {
                _push2(`<span class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-lg text-sm font-medium cursor-not-allowed" title="Ana domain silinemez"${_scopeId}> 🔒 Korumalı </span>`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
            if (showCreateModal.value) {
              _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"${_scopeId}><div class="p-6 border-b border-slate-200 dark:border-slate-700"${_scopeId}><h2 class="text-2xl font-bold text-slate-900 dark:text-white"${_scopeId}> Yeni Tenant Ekle </h2><p class="mt-2 text-sm text-slate-600 dark:text-slate-400"${_scopeId}> Domain&#39;i Hostinger&#39;dan aldıktan ve park ettikten sonra buradan tenant oluşturun </p></div><div class="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700"${_scopeId}><h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-3"${_scopeId}> ✅ Kontrol Listesi (Tamamlandı mı?) </h3><div class="space-y-2 text-sm"${_scopeId}><label class="flex items-center gap-3 cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(checklist.value.domainBought) ? ssrLooseContain(checklist.value.domainBought, null) : checklist.value.domainBought) ? " checked" : ""} class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"${_scopeId}><span class="text-slate-700 dark:text-slate-300"${_scopeId}>Domain Hostinger&#39;dan satın alındı</span></label><label class="flex items-center gap-3 cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(checklist.value.domainParked) ? ssrLooseContain(checklist.value.domainParked, null) : checklist.value.domainParked) ? " checked" : ""} class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"${_scopeId}><span class="text-slate-700 dark:text-slate-300"${_scopeId}>Domain ${ssrInterpolate(__props.mainDomain)}&#39;e park edildi</span></label><label class="flex items-center gap-3 cursor-pointer"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(checklist.value.dnsWaited) ? ssrLooseContain(checklist.value.dnsWaited, null) : checklist.value.dnsWaited) ? " checked" : ""} class="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"${_scopeId}><span class="text-slate-700 dark:text-slate-300"${_scopeId}>DNS yayılması için 5-10 dakika beklendi</span></label></div>`);
              if (!allChecklistComplete.value) {
                _push2(`<div class="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"${_scopeId}><p class="text-xs text-yellow-800 dark:text-yellow-400"${_scopeId}> ⚠️ Tüm adımları tamamlamadan tenant oluşturursanız, domain çalışmayabilir. </p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><form class="p-6 space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Domain <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.value.domain)} type="text" placeholder="candundar.com" required class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"${_scopeId}><p class="mt-2 text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Örnek: candundar.com (www ve https olmadan) </p></div><div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(form.value.copy_users) ? ssrLooseContain(form.value.copy_users, null) : form.value.copy_users) ? " checked" : ""} type="checkbox" id="copy_users" class="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"${_scopeId}><label for="copy_users" class="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"${_scopeId}> Ana database&#39;den user verilerini kopyala </label></div><details class="border border-slate-200 dark:border-slate-700 rounded-lg"${_scopeId}><summary class="px-4 py-3 cursor-pointer font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg"${_scopeId}> Gelişmiş Ayarlar (Opsiyonel) </summary><div class="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Database Adı </label><input${ssrRenderAttr("value", form.value.db_name)} type="text" placeholder="Otomatik oluşturulacak" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Database Kullanıcı </label><input${ssrRenderAttr("value", form.value.db_user)} type="text" placeholder="Ana database kullanıcısı kullanılacak" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Database Şifre </label><input${ssrRenderAttr("value", form.value.db_pass)} type="password" placeholder="Ana database şifresi kullanılacak" class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"${_scopeId}></div></div></details>`);
              if (createError.value) {
                _push2(`<div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"${_scopeId}><p class="text-sm text-red-700 dark:text-red-400"${_scopeId}>${ssrInterpolate(createError.value)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex gap-3 pt-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(isCreating.value) ? " disabled" : ""} class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(isCreating.value ? "⏳ Oluşturuluyor..." : "✅ Tenant Oluştur")}</button><button type="button"${ssrIncludeBooleanAttr(isCreating.value) ? " disabled" : ""} class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"${_scopeId}> İptal </button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"${_scopeId}><div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full"${_scopeId}><div class="p-6"${_scopeId}><div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"${_scopeId}><span class="text-2xl"${_scopeId}>⚠️</span></div><h3 class="text-xl font-bold text-slate-900 dark:text-white text-center mb-2"${_scopeId}> Tenant Sil </h3><p class="text-slate-600 dark:text-slate-400 text-center mb-6"${_scopeId}><strong${_scopeId}>${ssrInterpolate((_a = tenantToDelete.value) == null ? void 0 : _a.domain)}</strong> tenant&#39;ını silmek istediğinize emin misiniz? </p><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6"${_scopeId}><p class="text-sm text-yellow-800 dark:text-yellow-400"${_scopeId}><strong${_scopeId}>Uyarı:</strong> .env dosyası ve storage klasörü silinecek. Database güvenlik için silinmeyecek (manuel silebilirsiniz). </p></div><div class="flex gap-3"${_scopeId}><button${ssrIncludeBooleanAttr(isDeleting.value) ? " disabled" : ""} class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"${_scopeId}>${ssrInterpolate(isDeleting.value ? "⏳ Siliniyor..." : "🗑️ Evet, Sil")}</button><button${ssrIncludeBooleanAttr(isDeleting.value) ? " disabled" : ""} class="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"${_scopeId}> İptal </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-8" }, [
                    createVNode("h1", { class: "text-3xl font-bold text-slate-900 dark:text-white" }, " 🏢 Domain Yönetimi "),
                    createVNode("p", { class: "mt-2 text-slate-600 dark:text-slate-400" }, " Tüm domain'lerinizi buradan yönetin (ana domain dahil) ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-slate-600 dark:text-slate-400" }, "Toplam Domain"),
                          createVNode("p", { class: "text-3xl font-bold text-slate-900 dark:text-white mt-2" }, toDisplayString(__props.stats.total_tenants), 1),
                          createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, " Ana domain dahil ")
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center" }, [
                          createVNode("span", { class: "text-2xl" }, "🏢")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-slate-600 dark:text-slate-400" }, "Database Boyutu"),
                          createVNode("p", { class: "text-3xl font-bold text-slate-900 dark:text-white mt-2" }, toDisplayString(__props.stats.total_db_size_formatted), 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center" }, [
                          createVNode("span", { class: "text-2xl" }, "💾")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-slate-600 dark:text-slate-400" }, "Storage Boyutu"),
                          createVNode("p", { class: "text-3xl font-bold text-slate-900 dark:text-white mt-2" }, toDisplayString(__props.stats.total_storage_size_formatted), 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center" }, [
                          createVNode("span", { class: "text-2xl" }, "📁")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-slate-600 dark:text-slate-400" }, "Toplam Dosya"),
                          createVNode("p", { class: "text-3xl font-bold text-slate-900 dark:text-white mt-2" }, toDisplayString(__props.stats.total_files), 1)
                        ]),
                        createVNode("div", { class: "w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center" }, [
                          createVNode("span", { class: "text-2xl" }, "📄")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-6" }, [
                    createVNode("div", { class: "flex items-start gap-4" }, [
                      createVNode("span", { class: "text-3xl" }, "ℹ️"),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2" }, " Yeni Tenant Eklemeden Önce "),
                        createVNode("ol", { class: "space-y-2 text-sm text-blue-800 dark:text-blue-400" }, [
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode("span", { class: "font-bold" }, "1."),
                            createVNode("span", null, [
                              createVNode("strong", null, "Hostinger'da domain satın al"),
                              createTextVNode(" (örn: candundar.com)")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode("span", { class: "font-bold" }, "2."),
                            createVNode("span", null, [
                              createVNode("strong", null, "Domain'i " + toDisplayString(__props.mainDomain) + "'e park et", 1),
                              createTextVNode(" (DNS ayarları)")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode("span", { class: "font-bold" }, "3."),
                            createVNode("span", null, [
                              createVNode("strong", null, "5-10 dakika bekle"),
                              createTextVNode(" (DNS yayılması için)")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode("span", { class: "font-bold" }, "4."),
                            createVNode("span", null, [
                              createVNode("strong", null, "Buradan tenant oluştur"),
                              createTextVNode(" (aşağıdaki buton ile)")
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-4 mb-6" }, [
                    createVNode("button", {
                      onClick: ($event) => showCreateModal.value = true,
                      class: "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    }, [
                      createVNode("span", { class: "text-xl" }, "➕"),
                      createTextVNode(" Yeni Tenant Ekle ")
                    ], 8, ["onClick"]),
                    createVNode("button", {
                      onClick: cleanupDots,
                      disabled: isCleaningUp.value,
                      class: "px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    }, [
                      createVNode("span", { class: "text-xl" }, "🧹"),
                      createTextVNode(" " + toDisplayString(isCleaningUp.value ? "Temizleniyor..." : "Nokta Klasörlerini Temizle"), 1)
                    ], 8, ["disabled"]),
                    createVNode("button", {
                      onClick: refreshData,
                      disabled: isRefreshing.value,
                      class: "px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    }, [
                      createVNode("span", { class: "text-xl" }, "🔄"),
                      createTextVNode(" " + toDisplayString(isRefreshing.value ? "Yenileniyor..." : "Yenile"), 1)
                    ], 8, ["disabled"])
                  ]),
                  createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden" }, [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Domain"),
                            createVNode("th", { class: "px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "İsim"),
                            createVNode("th", { class: "px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Database"),
                            createVNode("th", { class: "px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Storage"),
                            createVNode("th", { class: "px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white" }, "Oluşturulma"),
                            createVNode("th", { class: "px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white" }, "İşlemler")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-slate-200 dark:divide-slate-700" }, [
                          __props.tenants.length === 0 ? (openBlock(), createBlock("tr", {
                            key: 0,
                            class: "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "px-6 py-12 text-center"
                            }, [
                              createVNode("div", { class: "flex flex-col items-center gap-4" }, [
                                createVNode("div", { class: "w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center" }, [
                                  createVNode("span", { class: "text-3xl" }, "📦")
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-lg font-medium text-slate-900 dark:text-white mb-1" }, " Henüz tenant eklenmemiş "),
                                  createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Yeni bir tenant eklemek için yukarıdaki butonu kullanın ")
                                ])
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.tenants, (tenant) => {
                            return openBlock(), createBlock("tr", {
                              key: tenant.domain,
                              class: ["hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors", { "bg-blue-50 dark:bg-blue-900/20": tenant.type === "main" }]
                            }, [
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("a", {
                                    href: `https://${tenant.domain}`,
                                    target: "_blank",
                                    class: "text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                  }, toDisplayString(tenant.domain), 9, ["href"]),
                                  tenant.type === "main" ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded"
                                  }, " ANA DOMAIN ")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-slate-900 dark:text-white" }, toDisplayString(tenant.name), 1),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "text-sm" }, [
                                  createVNode("div", { class: "font-medium text-slate-900 dark:text-white" }, toDisplayString(tenant.database.size_formatted), 1),
                                  createVNode("div", { class: "text-slate-500 dark:text-slate-400" }, toDisplayString(tenant.database.tables) + " tablo ", 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "text-sm" }, [
                                  createVNode("div", { class: "font-medium text-slate-900 dark:text-white" }, toDisplayString(tenant.storage.size_formatted), 1),
                                  createVNode("div", { class: "text-slate-500 dark:text-slate-400" }, toDisplayString(tenant.storage.files) + " dosya ", 1)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-slate-600 dark:text-slate-400" }, toDisplayString(formatDate(tenant.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 text-right" }, [
                                createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                  createVNode("a", {
                                    href: `/tenants/${tenant.domain}`,
                                    class: "px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors"
                                  }, " 📊 Detay ", 8, ["href"]),
                                  tenant.type !== "main" ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => confirmDelete(tenant),
                                    class: "px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                                  }, " 🗑️ Sil ", 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-lg text-sm font-medium cursor-not-allowed",
                                    title: "Ana domain silinemez"
                                  }, " 🔒 Korumalı "))
                                ])
                              ])
                            ], 2);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  showCreateModal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" }, [
                      createVNode("div", { class: "p-6 border-b border-slate-200 dark:border-slate-700" }, [
                        createVNode("h2", { class: "text-2xl font-bold text-slate-900 dark:text-white" }, " Yeni Tenant Ekle "),
                        createVNode("p", { class: "mt-2 text-sm text-slate-600 dark:text-slate-400" }, " Domain'i Hostinger'dan aldıktan ve park ettikten sonra buradan tenant oluşturun ")
                      ]),
                      createVNode("div", { class: "p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700" }, [
                        createVNode("h3", { class: "text-sm font-semibold text-slate-900 dark:text-white mb-3" }, " ✅ Kontrol Listesi (Tamamlandı mı?) "),
                        createVNode("div", { class: "space-y-2 text-sm" }, [
                          createVNode("label", { class: "flex items-center gap-3 cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => checklist.value.domainBought = $event,
                              class: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, checklist.value.domainBought]
                            ]),
                            createVNode("span", { class: "text-slate-700 dark:text-slate-300" }, "Domain Hostinger'dan satın alındı")
                          ]),
                          createVNode("label", { class: "flex items-center gap-3 cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => checklist.value.domainParked = $event,
                              class: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, checklist.value.domainParked]
                            ]),
                            createVNode("span", { class: "text-slate-700 dark:text-slate-300" }, "Domain " + toDisplayString(__props.mainDomain) + "'e park edildi", 1)
                          ]),
                          createVNode("label", { class: "flex items-center gap-3 cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => checklist.value.dnsWaited = $event,
                              class: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, checklist.value.dnsWaited]
                            ]),
                            createVNode("span", { class: "text-slate-700 dark:text-slate-300" }, "DNS yayılması için 5-10 dakika beklendi")
                          ])
                        ]),
                        !allChecklistComplete.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                        }, [
                          createVNode("p", { class: "text-xs text-yellow-800 dark:text-yellow-400" }, " ⚠️ Tüm adımları tamamlamadan tenant oluşturursanız, domain çalışmayabilir. ")
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(createTenant, ["prevent"]),
                        class: "p-6 space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, [
                            createTextVNode(" Domain "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.value.domain = $event,
                            type: "text",
                            placeholder: "candundar.com",
                            required: "",
                            class: "w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.value.domain]
                          ]),
                          createVNode("p", { class: "mt-2 text-sm text-slate-500 dark:text-slate-400" }, " Örnek: candundar.com (www ve https olmadan) ")
                        ]),
                        createVNode("div", { class: "flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.value.copy_users = $event,
                            type: "checkbox",
                            id: "copy_users",
                            class: "w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, form.value.copy_users]
                          ]),
                          createVNode("label", {
                            for: "copy_users",
                            class: "text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                          }, " Ana database'den user verilerini kopyala ")
                        ]),
                        createVNode("details", { class: "border border-slate-200 dark:border-slate-700 rounded-lg" }, [
                          createVNode("summary", { class: "px-4 py-3 cursor-pointer font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg" }, " Gelişmiş Ayarlar (Opsiyonel) "),
                          createVNode("div", { class: "p-4 space-y-4 border-t border-slate-200 dark:border-slate-700" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Database Adı "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.db_name = $event,
                                type: "text",
                                placeholder: "Otomatik oluşturulacak",
                                class: "w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, form.value.db_name]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Database Kullanıcı "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.db_user = $event,
                                type: "text",
                                placeholder: "Ana database kullanıcısı kullanılacak",
                                class: "w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, form.value.db_user]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Database Şifre "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.db_pass = $event,
                                type: "password",
                                placeholder: "Ana database şifresi kullanılacak",
                                class: "w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, form.value.db_pass]
                              ])
                            ])
                          ])
                        ]),
                        createError.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                        }, [
                          createVNode("p", { class: "text-sm text-red-700 dark:text-red-400" }, toDisplayString(createError.value), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex gap-3 pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: isCreating.value,
                            class: "flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          }, toDisplayString(isCreating.value ? "⏳ Oluşturuluyor..." : "✅ Tenant Oluştur"), 9, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => showCreateModal.value = false,
                            disabled: isCreating.value,
                            class: "px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                          }, " İptal ", 8, ["onClick", "disabled"])
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  showDeleteModal.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  }, [
                    createVNode("div", { class: "bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4" }, [
                          createVNode("span", { class: "text-2xl" }, "⚠️")
                        ]),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 dark:text-white text-center mb-2" }, " Tenant Sil "),
                        createVNode("p", { class: "text-slate-600 dark:text-slate-400 text-center mb-6" }, [
                          createVNode("strong", null, toDisplayString((_b = tenantToDelete.value) == null ? void 0 : _b.domain), 1),
                          createTextVNode(" tenant'ını silmek istediğinize emin misiniz? ")
                        ]),
                        createVNode("div", { class: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6" }, [
                          createVNode("p", { class: "text-sm text-yellow-800 dark:text-yellow-400" }, [
                            createVNode("strong", null, "Uyarı:"),
                            createTextVNode(" .env dosyası ve storage klasörü silinecek. Database güvenlik için silinmeyecek (manuel silebilirsiniz). ")
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            onClick: deleteTenant,
                            disabled: isDeleting.value,
                            class: "flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                          }, toDisplayString(isDeleting.value ? "⏳ Siliniyor..." : "🗑️ Evet, Sil"), 9, ["disabled"]),
                          createVNode("button", {
                            onClick: ($event) => showDeleteModal.value = false,
                            disabled: isDeleting.value,
                            class: "px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                          }, " İptal ", 8, ["onClick", "disabled"])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Tenants/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
