<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
     <q-card key="material" class="my-card full-width q-pt-lg">
      <q-list bordered separator>
       <view-docs-or-images
          v-for="(docs, key) in docsI"
          :key="key"
          :file="docs"
          :id="key"></view-docs-or-images>
       </q-list>
      </q-card>
</transition-group>
</template>

<script>
import InfoDocsOrImages from '../../store/models/dorcOrImages/InfoDocsOrImages'
export default {
    props: ['docsOrImages'],
    data () {
        return {
            docsI: [
        {
          id: 1,
          name: 'Folheto de Convite'
        },
        {
          id: 2,
          name: 'Folheto Para Criancas'
        },
        {
          id: 2,
          name: 'Seriado Activista'
        }
      ]
        }
    },
    computed: {
        infoDocsOrImages () {
            return InfoDocsOrImages.all()
        }
    },
    mounted () {
        const offset = 0
        this.getInfoDocsOrImages(offset)
    },
   methods: {
       getInfoDocsOrImages (offset) {
            InfoDocsOrImages.api().get('/infoDocsOrImages?offset=' + offset + '&max=100').then(resp => {
                offset = offset + 100
                if (resp.response.data.length > 0) { setTimeout(this.getInfoDocsOrImages(offset), 2) }
            }).catch(error => {
                console.log(error)
            })
        }
   },
     components: {
    'view-docs-or-images': require('components/Home/ViewDocsOrImages.vue').default
  }
}
</script>
