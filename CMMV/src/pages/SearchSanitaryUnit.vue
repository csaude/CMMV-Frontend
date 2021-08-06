<template>
  <q-page>
  <p>Associe-se a Uma Unidade Sanitaria  </p>
    <div class="q-pa-md absolute full-width full-height column">
 <div class="q-pa-md">
    <q-table title="Clinics" :rows="rows" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
            </q-input>
      </template>
    </q-table>
  </div>
<buttone  label="Associar" @click="$emit('nextScreen')" />
  </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'


const columns = [
  {
    name: 'name',
    required: true,
    label: 'Clinic',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'distance', align: 'center', label: 'Distancia', field: 'distance', sortable: true }
]


const rows = [
  {
    name: 'CS 1 Maio',
    distance: '1km',
    selected: false
  },
  {
     name: 'CS 2 Maio',
    distance: '2.5km',
     selected: false
  },
  {
    name: 'CS 3 Maio',
    distance: '1.5km',
     selected: false
  }]
export default {
  data () {
    return {
      columns,
      rows,
       clinics: [
        {
          id: 1,
          name: 'CS 1 Maio',
          distance: '2km',
          selected: false
        },
        {
           id: 2,
          name: 'CS 2 Maio',
          distance: '2.5km',
           selected: false
        },
        {
          id: 3,
          name: 'CS 3 Maio',
          distance: '1.5km',
           selected: false
        }
      ],
       filter: ref(''),
       selected: ref([])
    }
  },
  computed: {
  },
  mounted () {
  },
  components: {
     buttone: require('components/Shared/Button.vue').default
  }
}
</script>

