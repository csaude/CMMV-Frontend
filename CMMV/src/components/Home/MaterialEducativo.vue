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
          :id="docs.id"
          :showDownload=showDownload />
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
import { useQuasar, QSpinnerIos } from 'quasar'
// import { ungzip } from 'pako'
export default {
    props: ['docsOrImages', 'showDownload'],
    data () {
         const $q = useQuasar()
        return {
        $q
        }
    },
    computed: {
        infoDocsOrImages () {
            return InfoDocsOrImages.query().where('forMobilizer', true).get()
        }
    },
    mounted () {
        this.$q.loading.show({
          spinner: QSpinnerIos,
          message: 'Por favor, aguarde...'
     })
        const offset = 0
        this.getInfoDocsOrImages(offset)
    },
   methods: {
       getInfoDocsOrImages (offset) {
            InfoDocsOrImages.api().get('/infoDocsOrImages').then(resp => {
              //  offset = offset + 100
                console.log(resp.response.data)
              //  const textEncoder = new TextEncoder()
   // const gzipedData = textEncoder.encode("H4sIAAAAAAAA//NIzcnJVyguSUzOzi9LLUrLyS/XUSjJSMzLLlZIyy9SSMwpT6wsVshIzSnIzEtXBACs78K6LwAAAA==");
    //  console.log('gzipeddata', gzipedData);
   // const ungzipedData = ungzip(resp.response.data)
    // console.log('ungziped data', ungzipedData)
                 this.$q.loading.hide()
            }).catch(error => {
                 this.$q.loading.hide()
                console.log(error)
            })
        }
   },
     components: {
    'view-docs-or-images': require('components/Home/ViewDocsOrImages.vue').default
  }
}
</script>
