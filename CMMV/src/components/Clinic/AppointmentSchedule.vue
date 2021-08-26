<template>
  <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top">

        <div key="app-to-accept">

            <UserMessage />

            <div class="row q-mx-xl q-mt-md text-bold">
                Marcação de Consultas ({{appointmentsPending.length}})
            </div>

            <q-list
                bordered
                separator
                class="rounded-borders q-mx-xl q-mt-md"
                 v-for="appointment in appointmentsPending"
                :key="appointment.id" >
                <PendingApp :appointment="appointment" :utenteDb="this.UtenteBD" />
            </q-list>

            <div class="row q-mx-xl q-mt-lg text-bold">
                Consultas Marcadas ({{appointmentsConfirmed.length}})
            </div>

            <q-list
                bordered
                separator
                class="rounded-borders q-mx-xl q-mt-md"
                 v-for="appointment in appointmentsConfirmed"
                :key="appointment.id" >
                <AcceptedApp :appointment="appointment"/>
            </q-list>
        </div>
    </transition-group>
</template>

<script>
import { date } from 'quasar'
import Appointment from '../../store/models/appointment/Appointment'
import Utente from '../../store/models/utente/Utente'
import Clinic from '../../store/models/clinic/Clinic'
export default {
  data () {
    return {
         appointmentsBD: [],
      showEdit: false
      }
  },
 computed: {
        appointmentsPending () {
         return Appointment.query().with('utente').with('clinic').with('utente.address').with('utente.clinic').where((appointment) => { return appointment.status === 'PENDENTE' && appointment.appointmentDate !== '' }).get()
      },
      appointmentsConfirmed () {
         return Appointment.query().with('utente').with('clinic').with('utente.address').with('utente.clinic').where((appointment) => { return appointment.status === 'CONFIRMADO' && appointment.appointmentDate !== '' }).get()
      },
        UtenteBD () {
         return Utente.all()
      },
        clinicDB () {
         return Clinic.find(1)
      }
  },
       methods: {
    getAppointments () {
       // Buscar as consults pelo id da clinica logada
          Appointment.api().get('/appointment/clinic/' + 1)
          // Utente.api().get('/utente')
       },
      handlerEdit () {
        this.showEdit = true
      },
       formatDate (value) {
            return date.formatDate(value, 'YYYY/MM/DD')
        }
       },
       mounted () {
         this.getAppointments()
       //  this.fillUtenteOnAppointment()
    },
    components: {
      // reschedule: require('pages/Reschedule.vue').default,
         PendingApp: require('components/Clinic/PendingAppointment.vue').default,
        UserMessage: require('components/Clinic/UserMessage.vue').default,
        AcceptedApp: require('components/Clinic/AcceptedAppointment.vue').default
       }
}
</script>

