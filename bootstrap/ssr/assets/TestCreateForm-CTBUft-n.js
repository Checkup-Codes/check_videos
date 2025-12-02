import { ref, computed, watch, onMounted, onUnmounted, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "TestCreateForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const flattenCategories = (categories2) => {
      const flat = [];
      const seenIds = /* @__PURE__ */ new Set();
      const traverse = (cats) => {
        if (!cats || !Array.isArray(cats)) return;
        cats.forEach((cat) => {
          if (cat && cat.id && !seenIds.has(cat.id)) {
            seenIds.add(cat.id);
            flat.push(cat);
            if (cat.children && Array.isArray(cat.children) && cat.children.length > 0) {
              traverse(cat.children);
            }
          }
        });
      };
      traverse(categories2);
      return flat;
    };
    const categoriesRaw = ref(props.categories || []);
    const categories = computed(() => flattenCategories(categoriesRaw.value));
    const categorySearch = ref("");
    const showCategoryList = ref(false);
    ref(null);
    const filteredCategories = computed(() => {
      if (!categorySearch.value) return categories.value.slice(0, 10);
      const search = categorySearch.value.toLowerCase();
      return categories.value.filter((cat) => cat.name.toLowerCase().includes(search)).slice(0, 10);
    });
    const publishDateObj = ref({
      date: "",
      time: ""
    });
    const form = useForm({
      title: "",
      slug: "",
      description: "",
      category_id: null,
      status: "draft",
      time_limit: null,
      published_at: null,
      questions: []
    });
    const addQuestion = () => {
      form.questions.push({
        question_text: "",
        question_type: "multiple_choice",
        points: 10,
        explanation: "",
        order: form.questions.length,
        options: [
          { option_text: "", is_correct: false, order: 0 },
          { option_text: "", is_correct: false, order: 1 },
          { option_text: "", is_correct: false, order: 2 },
          { option_text: "", is_correct: false, order: 3 }
        ]
      });
    };
    const errors = ref({});
    const validateForm = () => {
      errors.value = {};
      if (!form.title || form.title.trim() === "") {
        errors.value.title = "Başlık zorunludur.";
      }
      if (!form.slug || form.slug.trim() === "") {
        errors.value.slug = "Slug zorunludur.";
      }
      if (form.questions.length === 0) {
        errors.value.questions = "En az bir soru eklenmelidir.";
      }
      form.questions.forEach((question, qIndex) => {
        if (!question.question_text || question.question_text.trim() === "") {
          errors.value[`questions.${qIndex}.question_text`] = "Soru metni zorunludur.";
        }
        if (!question.options || question.options.length < 2) {
          errors.value[`questions.${qIndex}.options`] = "En az 2 şık eklenmelidir.";
        }
        const hasCorrectAnswer = question.options.some((opt) => opt.is_correct);
        if (!hasCorrectAnswer) {
          errors.value[`questions.${qIndex}.options`] = "En az bir doğru cevap seçilmelidir.";
        }
        question.options.forEach((option, oIndex) => {
          if (!option.option_text || option.option_text.trim() === "") {
            errors.value[`questions.${qIndex}.options.${oIndex}.option_text`] = "Şık metni zorunludur.";
          }
        });
      });
      return Object.keys(errors.value).length === 0;
    };
    const submitForm = () => {
      if (!validateForm()) {
        return;
      }
      if (publishDateObj.value.date && publishDateObj.value.time) {
        form.published_at = `${publishDateObj.value.date}T${publishDateObj.value.time}:00`;
      } else {
        form.published_at = null;
      }
      const questionsData = form.questions.map((q, index) => ({
        question_text: q.question_text,
        question_type: q.question_type || "multiple_choice",
        points: q.points || 10,
        explanation: q.explanation || null,
        order: index,
        options: q.options.map((opt, optIndex) => ({
          option_text: opt.option_text,
          is_correct: opt.is_correct || false,
          order: optIndex
        }))
      }));
      form.questions = questionsData;
      form.post(route("tests.store"), {
        onSuccess: (page) => {
          var _a, _b;
          if ((_b = (_a = page == null ? void 0 : page.props) == null ? void 0 : _a.test) == null ? void 0 : _b.slug) {
            router.visit(route("tests.show", { test: page.props.test.slug }));
          }
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
    if (form.questions.length === 0) {
      addQuestion();
    }
    watch(
      () => form.processing,
      (processing) => {
        window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing } }));
      }
    );
    let sidebarSubmitHandler = null;
    let sidebarResetHandler = null;
    const resetForm = () => {
      form.reset();
      form.processing = false;
      Object.keys(errors.value).forEach((key) => {
        errors.value[key] = "";
      });
      publishDateObj.value = { date: "", time: "" };
      categorySearch.value = "";
      form.category_id = null;
      form.questions = [];
      addQuestion();
    };
    onMounted(() => {
      form.processing = false;
      window.dispatchEvent(new CustomEvent("formProcessingState", { detail: { processing: false } }));
      sidebarSubmitHandler = () => {
        submitForm();
      };
      window.addEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      sidebarResetHandler = () => {
        resetForm();
      };
      window.addEventListener("sidebarFormReset", sidebarResetHandler);
    });
    onUnmounted(() => {
      if (sidebarSubmitHandler) {
        window.removeEventListener("sidebarFormSubmit", sidebarSubmitHandler);
      }
      if (sidebarResetHandler) {
        window.removeEventListener("sidebarFormReset", sidebarResetHandler);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 py-6" }, _attrs))}><div class="mb-6"><h1 class="text-3xl font-bold text-foreground">Yeni Test Oluştur</h1><p class="mt-2 text-sm text-muted-foreground">Test bilgilerini ve sorularını ekleyin</p></div><form class="space-y-6"><div class="space-y-4 rounded-lg border border-border bg-card p-6"><h2 class="text-xl font-semibold text-foreground">Test Bilgileri</h2><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div class="md:col-span-2"><label class="mb-1 block text-sm font-medium text-foreground">Test Başlığı *</label><input type="text"${ssrRenderAttr("value", unref(form).title)} placeholder="Test başlığını girin" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.title || unref(form).errors.title }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.title || unref(form).errors.title) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.title || unref(form).errors.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Slug *</label><input type="text"${ssrRenderAttr("value", unref(form).slug)} placeholder="test-slug" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.slug || unref(form).errors.slug }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.slug || unref(form).errors.slug) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.slug || unref(form).errors.slug)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Durum *</label><select class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.status || unref(form).errors.status }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Taslak</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "published") : ssrLooseEqual(unref(form).status, "published")) ? " selected" : ""}>Yayınlandı</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "private") : ssrLooseEqual(unref(form).status, "private")) ? " selected" : ""}>Gizli</option></select>`);
      if (errors.value.status || unref(form).errors.status) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.status || unref(form).errors.status)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="md:col-span-2"><label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label><textarea rows="3" placeholder="Test hakkında kısa bir açıklama" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.description || unref(form).errors.description }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description || unref(form).errors.description) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.description || unref(form).errors.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Kategori</label><div class="relative"><input type="text"${ssrRenderAttr("value", categorySearch.value)} placeholder="Kategori seçin..." class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.category_id || unref(form).errors.category_id }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}" tabindex="0">`);
      if (categorySearch.value) {
        _push(`<button class="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs hover:bg-accent"> ✕ </button>`);
      } else {
        _push(`<!---->`);
      }
      if (showCategoryList.value && filteredCategories.value.length > 0) {
        _push(`<ul tabindex="0" class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded border border-border bg-popover shadow-lg"><!--[-->`);
        ssrRenderList(filteredCategories.value, (category) => {
          _push(`<li class="cursor-pointer px-2 py-1.5 text-sm hover:bg-accent">${ssrInterpolate(category.name)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (errors.value.category_id || unref(form).errors.category_id) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.category_id || unref(form).errors.category_id)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Süre Limiti (dakika)</label><input type="number"${ssrRenderAttr("value", unref(form).time_limit)} min="0" placeholder="Boş bırakılabilir" class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.time_limit || unref(form).errors.time_limit }, "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}">`);
      if (errors.value.time_limit || unref(form).errors.time_limit) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.time_limit || unref(form).errors.time_limit)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="mb-1 block text-sm font-medium text-foreground">Yayınlama Tarihi</label><div class="flex gap-2"><input type="date"${ssrRenderAttr("value", publishDateObj.value.date)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at }, "flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"><input type="time"${ssrRenderAttr("value", publishDateObj.value.time)} class="${ssrRenderClass([{ "border-destructive focus-visible:ring-destructive": errors.value.published_at || unref(form).errors.published_at }, "flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"])}"></div>`);
      if (errors.value.published_at || unref(form).errors.published_at) {
        _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value.published_at || unref(form).errors.published_at)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="space-y-4 rounded-lg border border-border bg-card p-6"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-foreground">Sorular</h2><button type="button" class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Soru Ekle </button></div>`);
      if (unref(form).questions.length === 0) {
        _push(`<p class="text-sm text-muted-foreground"> Henüz soru eklenmedi. &quot;Soru Ekle&quot; butonuna tıklayarak soru ekleyin. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(form).questions, (question, questionIndex) => {
        _push(`<div class="space-y-4 rounded-lg border border-border bg-background p-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-foreground">Soru ${ssrInterpolate(questionIndex + 1)}</h3><button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="space-y-4"><div><label class="mb-1 block text-sm font-medium text-foreground">Soru Metni *</label><textarea rows="3" placeholder="Soruyu buraya yazın..." class="${ssrRenderClass([{
          "border-destructive focus-visible:ring-destructive": errors.value[`questions.${questionIndex}.question_text`] || unref(form).errors[`questions.${questionIndex}.question_text`]
        }, "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}">${ssrInterpolate(question.question_text)}</textarea>`);
        if (errors.value[`questions.${questionIndex}.question_text`] || unref(form).errors[`questions.${questionIndex}.question_text`]) {
          _push(`<p class="mt-1 text-xs text-destructive">${ssrInterpolate(errors.value[`questions.${questionIndex}.question_text`] || unref(form).errors[`questions.${questionIndex}.question_text`])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="mb-1 block text-sm font-medium text-foreground">Puan</label><input type="number"${ssrRenderAttr("value", question.points)} min="1" placeholder="10" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"></div><div><label class="mb-1 block text-sm font-medium text-foreground">Açıklama</label><input type="text"${ssrRenderAttr("value", question.explanation)} placeholder="Doğru cevap açıklaması (opsiyonel)" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"></div></div><div class="space-y-3"><div class="flex items-center justify-between"><label class="block text-sm font-medium text-foreground">Şıklar *</label><button type="button" class="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground hover:bg-accent"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Şık Ekle </button></div><!--[-->`);
        ssrRenderList(question.options, (option, optionIndex) => {
          _push(`<div class="flex items-start gap-3 rounded-lg border border-border bg-background p-3"><div class="flex-1 space-y-2"><div class="flex items-center gap-2"><span class="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">${ssrInterpolate(String.fromCharCode(65 + optionIndex))}</span><input type="text"${ssrRenderAttr("value", option.option_text)}${ssrRenderAttr("placeholder", `Şık ${optionIndex + 1} metni`)} class="${ssrRenderClass([{
            "border-destructive focus-visible:ring-destructive": errors.value[`questions.${questionIndex}.options.${optionIndex}.option_text`] || unref(form).errors[`questions.${questionIndex}.options.${optionIndex}.option_text`]
          }, "flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"])}"></div></div><div class="flex items-center gap-2"><label class="flex cursor-pointer items-center gap-2"><input type="radio"${ssrRenderAttr("name", `question-${questionIndex}-correct`)}${ssrIncludeBooleanAttr(option.is_correct) ? " checked" : ""} class="h-4 w-4 cursor-pointer text-primary focus:ring-primary"><span class="text-xs text-muted-foreground">Doğru</span></label>`);
          if (question.options.length > 2) {
            _push(`<button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        if (errors.value[`questions.${questionIndex}.options`] || unref(form).errors[`questions.${questionIndex}.options`]) {
          _push(`<p class="text-xs text-destructive">${ssrInterpolate(errors.value[`questions.${questionIndex}.options`] || unref(form).errors[`questions.${questionIndex}.options`])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex gap-4"><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">`);
      if (unref(form).processing) {
        _push(`<span>Kaydediliyor...</span>`);
      } else {
        _push(`<span>Testi Kaydet</span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/tests",
        class: "inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` İptal `);
          } else {
            return [
              createTextVNode(" İptal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/TestCategories/Tests/Create/TestCreateForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
