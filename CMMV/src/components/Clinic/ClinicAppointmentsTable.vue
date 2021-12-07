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
                        v-if="(moment(new Date(), 'DD-MM-YYYY') < moment(visitDatePlusTwoDays(new Date(props.row.visitDate), 'DD-MM-YYYY')))"
                        @click="getSelectedString(props.row)"/>
             <q-checkbox v-model="props.row.hasHappened"
                        color="primary"
                        v-else-if="!props.row.hasHappened"
                        @click="getSelectedString(props.row)"/>
             <span v-if="props.row.hasHappened"> Sim
               <q-icon name="warning"
                style="font-size: 1em"
                color="primary"
                v-if="(new Date(new Date().setHours(0,0,0,0)).getTime() < new Date(visitDatePlusTwoDays(new Date(props.row.visitDate)).setHours(0,0,0,0)).getTime())">
                  <q-tooltip
                    transition-show="rotate"
                    transition-hide="rotate"
                    anchor="bottom middle"
                    self="center middle"
                  >
                      <strong>Após {{this.diffBlockDays(visitDatePlusTwoDays(new Date(props.row.visitDate)), new Date())}}</strong> não poderá <em>editar esta consulta</em>
                  </q-tooltip>
               </q-icon>
               </span>
            </q-td>
            </q-tr>
        </template>
    </q-table>

</template>
<script>
import { ref } from 'vue'
import { date } from 'quasar'
import moment from 'moment'
const { addToDate } = date

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
        filter: '',
        unit: 'days'
    }
  },
 computed: {
  },
  methods: {
    moment,
    diffBlockDays (visitPlus2, today) {
      const a = moment(visitPlus2)
      const b = moment(today)
      // return moment.utc(moment(a, 'DD/MM/YYYY HH:mm').diff(moment(b, 'DD/MM/YYYY HH:mm'))).format('HH:mm')
      const diff = a.diff(b, 'days')
      // return this.formatDateDDMMMYYYY(moment(visitPlus2).subtract(diff, 'days'))
      return date.formatDate(moment(visitPlus2).subtract(diff, 'days'), 'DD-MM-YYYY HH:mm')
    },
    visitDatePlusTwoDays (visitDate) {
      return addToDate(moment(visitDate).set('hour', '23').set('minute', '59').set('second', '59'), { days: 2 })
    },
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
    console.log(moment(date).format('YYYY-MM-DD'))
    const a = moment(this.formatDateDDMMMYYYY(this.visitDatePlusTwoDays(new Date())))
    const b = moment(date)
    console.log(a.diff(b, 'days'))
  },
    components: {
  }
}
</script>
