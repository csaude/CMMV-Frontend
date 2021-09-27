<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
     <q-card key="material" class="my-card full-width q-pt-lg">
      <q-list bordered separator v-if="this.infoDocsOrImages.length > 0">
       <view-docs-or-images
          v-for="docs in this.infoDocsOrImages"
          :key="docs.id"
          :file="docs"
          :id="docs.id"/>
       </q-list>
       <q-list v-else separator>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-icon color="red" name="mood_bad" />
                  </q-item-section>
                <q-item-section class="text-left">Sem resultados na lista</q-item-section>
              </q-item>
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
        }
    },
    computed: {
        infoDocsOrImages () {
            return InfoDocsOrImages.query().where('forMobilizer', true)
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
