<template>
      <q-item clickable v-ripple>
        <q-item-section> {{docsOrImage.name}}</q-item-section>
        <q-item-section avatar  >
       <q-icon name="file_download" color="primary"/>
    </q-item-section>
      </q-item>
</template>
<script>
export default {
    props: ['docsOrImage', 'id']
}
</script>
