<template>
  <q-page class=" absolute full-width full-height column" >
  <pageHeader :showPreviousButton="true" @previousScreen="$emit('previousScreen')"> Unidade Sanitaria</pageHeader>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="ConsultasDay" label="Consultas do dia" />
          <q-tab name="ConsultasOther" label="Outras Consultas" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="ConsultasDay" >
           <q-table title="Utentes" :rows="appointmentsToday" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single">
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
            <q-table title="Utentes" :rows="appointmentsOtherDays" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Procurar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
            </q-input>
      </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  </q-page>
</template>
<script>
import { date } from 'quasar'
import { ref } from 'vue'
import Appointment from '../store/models/appointment/Appointment'
import Utente from '../store/models/utente/Utente'
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
       pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
       }
}
</script>
