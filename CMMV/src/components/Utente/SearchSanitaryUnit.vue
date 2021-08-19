<template>
  <q-page>
  <p>Associe-se a Uma Unidade Sanitaria  </p>
    <div class="q-pa-md absolute full-width full-height column">
 <div class="q-pa-md">
    <q-table title="" :rows="clinics" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
            </q-input>
      </template>
    </q-table>
  </div>
<buttone  label="Associar" @click="associar" />
  </div>

  </q-page>
</template>

<script>
import { ref } from 'vue'
import Clinic from '../../store/models/clinic/Clinic'
import Utente from '../../store/models/utente/Utente'
import District from '../../store/models/district/District'


const columns = [
  {
    name: 'name',
    required: true,
    label: 'Unidade Sanitária',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'distance', align: 'center', label: 'Distancia', field: 'distance', sortable: true }
]
export default {
    props: ['utente'],
    data () {
        return {
            columns,
            filter: ref(''),
            selected: ref([]),
            relatedUtente: null
        }
    },
    computed: {
        clinics () {
            return Clinic.all()
        }
    },
    methods: {
        getAllClinics (offset) {
            Clinic.api().get('/clinic?offset=' + offset + '&max=100').then(resp => {
                offset = offset + 100
                if (resp.response.data.length > 0) { setTimeout(this.getAllClinics(offset), 2) }
            }).catch(error => {
                console.log(error)
            })
        },
        associar () {
            this.relatedUtente = this.utente
            this.relatedUtente.clinic = this.selected[0]
            this.relatedUtente.address.district = District.find(this.relatedUtente.address.district_id)
            Utente.api().post('/utente', this.relatedUtente).then(resp => {
                this.$emit('associarClinic', this.relatedUtente)
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted () {
        const offset = 0
        this.getAllClinics(offset)
    },
    components: {
        buttone: require('components/Shared/Button.vue').default
    }
}
</script>

