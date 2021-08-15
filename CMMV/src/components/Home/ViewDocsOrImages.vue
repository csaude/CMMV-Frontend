<template>
      <q-item clickable v-ripple>
        <q-item-section> {{docsOrImage.title}}</q-item-section>
        <q-item-section avatar  >
       <q-icon name="file_download" color="red"/>
    </q-item-section>
      </q-item>
</template>
<script>
export default {
    props: ['docsOrImage', 'id']
}
</script>
