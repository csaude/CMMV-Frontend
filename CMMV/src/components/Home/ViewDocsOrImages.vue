<template>
      <q-item clickable v-ripple>
        <q-item-section> {{file.title}}</q-item-section>
        <q-item-section avatar >
         <q-btn flat color="primary"
          icon="file_download"
          no-caps
          v-if="showDownload"
          @click.stop="getInfoDocsOrImagesById(file.id)"/>
       </q-item-section>
      </q-item>
</template>
<script>
import InfoDocsOrImages from '../../store/models/dorcOrImages/InfoDocsOrImages'
export default {
    props: ['file', 'id', 'showDownload'],
    methods: {
      forceFileDownload (materialEducativo, title) {
        const bytes = btoa(new Uint8Array(materialEducativo.blop).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        const url = 'data:application/pdf;base64, ' + bytes
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', title)
        document.body.appendChild(link)
        link.click()
    },
     getInfoDocsOrImagesById (id) {
            InfoDocsOrImages.api().get('/infoDocsOrImages/' + id).then(resp => {
              //  offset = offset + 100
                console.log(resp.response.data)
                this.forceFileDownload(resp.response.data, resp.response.data.title + '.pdf')
                 this.$q.loading.hide()
            }).catch(error => {
                 this.$q.loading.hide()
                console.log(error)
            })
        }
  }
}
</script>
