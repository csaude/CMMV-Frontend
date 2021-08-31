<template>
    <div>
        <UserMessage />
        <div class="row q-mx-xl q-mt-md ">
            Hoje dia {{currDate}}
        </div>
        <div class="q-mx-xl">
            <q-toolbar >
                <q-tabs v-model="tab" shrink stretch>
                    <q-tab name="ConsultasDay" label="Consultas do dia" />
                    <q-tab name="ConsultasOther" label="Outras Consultas" />
                </q-tabs>
            </q-toolbar>
            <q-separator class="q-mx-md"/>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="ConsultasDay">
                    <q-table :rows="utentes" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                                </q-input>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="ConsultasOther">
                    <q-table :rows="appointmentsBDD" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
                        <template v-slot:top-right>
                            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </template>
                    </q-table>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { date } from 'quasar'
import { ref } from 'vue'
import Appointment from '../../store/models/appointment/Appointment'
import Utente from '../../store/models/utente/Utente'
const columns = [
  {
    name: 'appointmentDate',
    required: true,
    label: 'Data',
    align: 'left',
    field: row => date.formatDate(row.appointmentDate, 'DD/MM/YYYY'),
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'time',
    required: true,
    label: 'Hora',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'code',
    required: true,
    label: 'Codigo',
    align: 'left',
    field: row => row.utente,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'nameUser',
    required: true,
    label: 'Nome do Utente',
    align: 'left',
    field: row => row.utente != null ? row.utente.firstNames + ' ' + row.utente.lastNames : ' ',
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'arrivedUs',
    required: true,
    label: 'Chegou a US?',
    align: 'left',
    field: row => row.hasHappened === false ? 'Nao' : 'Sim',
    format: val => `${val}`,
    sortable: true
  }
]
export default {
  data () {
    return {
         appointmentsBD: [],
         appointmentsToday: [],
         appointmentsOtherDays: [],
          columns,
      tab: ref('mails')
      }
  },
 computed: {
        appointmentsBDD () {
         return Appointment.all()
      },
        UtenteBD () {
         return Utente.all()
      },
      currDate () {
          return date.formatDate(Date.now(), 'DD-MM-YYYY')
      }
  },
       methods: {
    getAppointments () {
          Appointment.api().get('/appointment')
          // Utente.api().get('/utente')
       },
       fillUtenteOnAppointment () {
         this.appointmentsBDD.forEach(appointment => {
          this.UtenteBD.forEach(utente => {
            if (appointment.utente_id === utente.id && appointment.appointmentDate !== '') {
                 appointment.utente = utente
             }
          })
          if (this.formatDate(appointment.appointmentDate) === this.formatDate(Date.now())) {
            this.appointmentsToday.push(appointment)
          } if (this.formatDate(appointment.appointmentDate) !== this.formatDate(Date.now())) {
            this.appointmentsOtherDays.push(appointment)
          }
       })
       },
       formatDate (value) {
            return date.formatDate(value, 'YYYY/MM/DD')
        }
       },
       mounted () {
         this.getAppointments()
         this.fillUtenteOnAppointment()
    },
    components: {
      UserMessage: require('components/Clinic/UserMessage.vue').default
  }
}
</script>
