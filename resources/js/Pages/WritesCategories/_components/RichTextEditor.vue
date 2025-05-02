<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="optional" class="label-text-alt opacity-70">Opsiyonel</span>
    </label>

    <div class="relative">
      <div
        ref="quillEditor"
        :class="['border-base-300 bg-base-100 min-h-[300px] rounded border p-3', { 'border-error': error }]"
      ></div>
    </div>

    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>

    <label v-if="hint && !error" class="label">
      <span class="label-text-alt">{{ hint }}</span>
    </label>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  optional: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '300px',
  },
});

const emit = defineEmits(['update:modelValue']);
const quillEditor = ref(null);
let quill;

onMounted(() => {
  quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
    placeholder: 'İçeriği buraya yazın...',
  });

  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML);
  });

  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue;
  }

  // Quill editörünün yüksekliğini ayarla
  quillEditor.value.style.height = props.height;
});
</script>

<style>
.ql-toolbar.ql-snow {
  border-color: hsl(var(--b3));
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: hsl(var(--b2));
}

.ql-container.ql-snow {
  border-color: hsl(var(--b3));
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.ql-editor {
  min-height: 12rem;
}

/* Dark mode compatibility */
[data-theme='dark'] .ql-toolbar.ql-snow,
[data-theme='dark'] .ql-container.ql-snow {
  border-color: hsl(var(--b3));
}

[data-theme='dark'] .ql-toolbar.ql-snow {
  background-color: hsl(var(--b2));
}

[data-theme='dark'] .ql-editor {
  color: hsl(var(--bc));
}

[data-theme='dark'] .ql-snow .ql-stroke {
  stroke: hsl(var(--bc));
}

[data-theme='dark'] .ql-snow .ql-fill {
  fill: hsl(var(--bc));
}

[data-theme='dark'] .ql-snow .ql-picker {
  color: hsl(var(--bc));
}

[data-theme='dark'] .ql-snow .ql-picker-options {
  background-color: hsl(var(--b1));
}
</style>
