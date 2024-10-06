<template>
  <div id="excalidraw-container">
    <div id="excali"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  import('@excalidraw/excalidraw').then(({ Excalidraw }) => {
    import('react').then((React) => {
      import('react-dom').then((ReactDOM) => {
        ReactDOM.render(React.createElement(Excalidraw), document.getElementById('excali'));
      });
    });
  });
});
</script>

<style scoped>
#excalidraw-container {
  width: 100%;
  height: 600px;
}

#excali {
  width: 100%;
  height: 100%;
}
</style>
