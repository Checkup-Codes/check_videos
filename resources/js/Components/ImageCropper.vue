<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <div class="w-full max-w-4xl rounded-xl bg-card shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 class="text-lg font-semibold text-foreground">Resmi Konumlandır</h3>
          <button @click="cancel" class="text-muted-foreground hover:text-foreground">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Crop Area -->
        <div class="relative bg-black p-6">
          <!-- Fixed aspect ratio container (16:9) -->
          <div 
            ref="cropArea"
            class="relative mx-auto aspect-video max-h-[50vh] overflow-hidden rounded-lg border-2 border-primary"
            @mousedown="startDrag"
            @touchstart="startDrag"
          >
            <img 
              ref="imageRef"
              :src="imageSrc" 
              :style="imageStyle"
              class="absolute cursor-move select-none"
              draggable="false"
              @load="onImageLoad"
            />
          </div>
          
          <!-- Zoom Control -->
          <div class="mt-4 flex items-center justify-center gap-4">
            <button 
              @click="zoomOut" 
              class="rounded-lg bg-muted p-2 text-foreground hover:bg-muted/80"
              :disabled="scale <= 1"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <input 
              type="range" 
              v-model="scale" 
              min="1" 
              max="3" 
              step="0.1"
              class="h-2 w-48 cursor-pointer appearance-none rounded-lg bg-muted"
            />
            <button 
              @click="zoomIn" 
              class="rounded-lg bg-muted p-2 text-foreground hover:bg-muted/80"
              :disabled="scale >= 3"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="border-t border-border px-6 py-3">
          <p class="text-center text-sm text-muted-foreground">
            Resmi sürükleyerek konumlandırın
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <button 
            @click="cancel" 
            class="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            İptal
          </button>
          <button 
            @click="crop" 
            class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  imageSrc: { type: String, default: '' },
});

const emit = defineEmits(['crop', 'cancel']);

const cropArea = ref(null);
const imageRef = ref(null);

const scale = ref(1);
const posX = ref(0);
const posY = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const imgWidth = ref(0);
const imgHeight = ref(0);

const imageStyle = computed(() => ({
  transform: `translate(${posX.value}px, ${posY.value}px) scale(${scale.value})`,
  transformOrigin: 'center center',
}));

const onImageLoad = () => {
  if (!imageRef.value || !cropArea.value) return;
  
  const img = imageRef.value;
  const container = cropArea.value;
  
  imgWidth.value = img.naturalWidth;
  imgHeight.value = img.naturalHeight;
  
  // Fit image to cover container
  const containerRatio = container.clientWidth / container.clientHeight;
  const imageRatio = img.naturalWidth / img.naturalHeight;
  
  if (imageRatio > containerRatio) {
    // Image is wider - fit by height
    img.style.height = '100%';
    img.style.width = 'auto';
  } else {
    // Image is taller - fit by width
    img.style.width = '100%';
    img.style.height = 'auto';
  }
  
  // Center image
  setTimeout(() => {
    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    posX.value = (containerRect.width - imgRect.width) / 2;
    posY.value = (containerRect.height - imgRect.height) / 2;
  }, 10);
};

const startDrag = (e) => {
  isDragging.value = true;
  const point = e.touches ? e.touches[0] : e;
  startX.value = point.clientX - posX.value;
  startY.value = point.clientY - posY.value;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  
  const point = e.touches ? e.touches[0] : e;
  posX.value = point.clientX - startX.value;
  posY.value = point.clientY - startY.value;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
};

const zoomIn = () => {
  if (scale.value < 3) scale.value = Math.min(3, scale.value + 0.2);
};

const zoomOut = () => {
  if (scale.value > 1) scale.value = Math.max(1, scale.value - 0.2);
};

const crop = () => {
  if (!cropArea.value || !imageRef.value) return;
  
  const container = cropArea.value;
  const img = imageRef.value;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Output size (16:9 aspect ratio)
  canvas.width = 1920;
  canvas.height = 1080;
  
  // Calculate source coordinates
  const containerRect = container.getBoundingClientRect();
  const imgRect = img.getBoundingClientRect();
  
  const scaleX = img.naturalWidth / imgRect.width;
  const scaleY = img.naturalHeight / imgRect.height;
  
  const sourceX = (containerRect.left - imgRect.left) * scaleX;
  const sourceY = (containerRect.top - imgRect.top) * scaleY;
  const sourceW = containerRect.width * scaleX;
  const sourceH = containerRect.height * scaleY;
  
  ctx.drawImage(
    img,
    sourceX, sourceY, sourceW, sourceH,
    0, 0, canvas.width, canvas.height
  );
  
  canvas.toBlob((blob) => {
    emit('crop', blob);
  }, 'image/jpeg', 0.9);
};

const cancel = () => {
  emit('cancel');
};

const reset = () => {
  scale.value = 1;
  posX.value = 0;
  posY.value = 0;
};

watch(() => props.show, (newVal) => {
  if (newVal) {
    reset();
  }
});

onUnmounted(() => {
  stopDrag();
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: none;
}
</style>
