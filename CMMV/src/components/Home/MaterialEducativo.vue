<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
     <q-card key="material" class="my-card full-width q-pt-lg">
      <q-list bordered separator>
       <view-docs-or-images
          v-for="(docsOrImage, key) in docsOrImages"
          :key="key"
          :docsOrImage="docsOrImage"
          :id="key"></view-docs-or-images>
       </q-list>
      </q-card>
</transition-group>
</template>

<script>
export default {
    props: ['docsOrImages'],
     components: {
    'view-docs-or-images': require('components/Home/ViewDocsOrImages.vue').default
  }
}
</script>
