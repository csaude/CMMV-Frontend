<template>
      <q-item clickable v-ripple>
        <q-item-section> {{file.title}}</q-item-section>
        <q-item-section avatar >
         <q-btn flat color="primary"
          icon="file_download"
          no-caps
          @click.stop="forceFileDownload(file, file.title + '.pdf')"/>
       </q-item-section>
      </q-item>
</template>
<script>
export default {
    props: ['file', 'id'],
    methods: {
      forceFileDownload (materialEducativo, title) {
        const bytes = btoa(new Uint8Array(materialEducativo.blop).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        const url = 'data:application/pdf;base64, ' + bytes
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', title)
        document.body.appendChild(link)
        link.click()
    }
  }
}
</script>
