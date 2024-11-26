<template>
  <div class="relative mb-6">
    <label :class="labelClass">{{ label }}</label>
    <div
      ref="quillEditor"
      class="h-96 rounded-md border border-gray-300 bg-gray-100 p-3 shadow-inner focus-within:border-indigo-500"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const props = defineProps({
  label: String,
  labelClass: {
    type: String,
    default: 'block font-semibold mb-2 text-sm text-gray-700',
  },
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const quillEditor = ref(null);

onMounted(() => {
  const quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ script: 'sub' }, { script: 'super' }],
        // [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],
        // [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        // ['link', 'image', 'video'],
        // ['clean'],
      ],
    },
  });

  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML);
  });

  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue;
  }
});
</script>
