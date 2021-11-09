<template>
    <q-table
      :rows="this.rows"
      :columns="columns"
      :filter="filter"
      virtual-scroll>
        <template v-slot:top-right>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
                </q-input>
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">
            <q-td v-if="props.row.hasHappened" key="visitDate" :props="props">
                {{ this.formatDateDDMMMYYYY(props.row.visitDate) }}
            </q-td>
            <q-td v-else key="appointmentDate" :props="props">
                {{ this.formatDateDDMMMYYYY(props.row.appointmentDate) }}
            </q-td>
            <q-td key="time" :props="props">
                {{ props.row.time }}
            </q-td>
            <q-td key="code" :props="props">
                {{ props.row.utente.systemNumber }}
            </q-td>
            <q-td key="nameUser" :props="props">
                {{ props.row.utente.firstNames }} {{ props.row.utente.lastNames }}
            </q-td>
            <q-td key="hasHappened" :props="props">
             <q-checkbox v-model="props.row.hasHappened"
                        color="primary"
                        v-if="(new Date(new Date(props.row.visitDate).setHours(0,0,0,0)).getTime() === new Date(new Date().setHours(0,0,0,0)).getTime())"
                        @click="getSelectedString(props.row)"/>
             <q-checkbox v-model="props.row.hasHappened"
                        color="primary"
                        v-else-if="!props.row.hasHappened"
                        @click="getSelectedString(props.row)"/>
             <span v-if="props.row.hasHappened"> Sim </span>
             <!--span v-else> Não </span-->
            </q-td>
            </q-tr>
        </template>
    </q-table>

</template>
<script>
import { ref } from 'vue'
import { date } from 'quasar'

export default {
  props: ['rows', 'columns', 'updateClinicAppoitment'],
  emits: ['update:appointment', 'update:rows'],
  setup () {
    const selected = ref([])
    const lastIndex = ref(null)
    const tableRef = ref(null)
    return {
        valOption: ref(true),
        lastIndex,
        tableRef,
        selected,
        filter: ''
    }
  },
 computed: {
  },
  methods: {
    getSelectedString (appointment) {
      const newAppointment = {}
        newAppointment.id = appointment.id
        newAppointment.hasHappened = appointment.hasHappened
      if (!appointment.hasHappened) {
        newAppointment.visitDate = null
      } else {
        newAppointment.visitDate = new Date()
      }
      this.updateClinicAppoitment(newAppointment)
      this.$emit('update:rows')

      if (!appointment.hasHappened) {
          this.$router.go(0)
      }
    },
    formatDateDDMMMYYYY (value) {
        return date.formatDate(value, 'DD MMM YYYY')
    }
  },
  mounted () {
  },
    components: {
  }
}
</script>
