<template>
  <div class="q-pa-md q-gutter-md">
      <h4 bold>Marcacao de Consultas</h4>
      <q-scroll-area style="height:400px; max-width: 100%;">
        <q-list bordered class="rounded-borders q-pa-md q-gutter-md" >
      <q-item  v-for="appointment in appointmentsPending"
        :key="appointment.id">
        <q-item-section avatar>
          <p>{{appointment && this.formatDateShort(appointment.appointmentDate)}}</p>
        </q-item-section>

        <q-item-section top>
         <div class="q-gutter-m">
          <q-item-label lines="1">
            <span class="text-weight-medium" bold>Nova Marcacao</span>&nbsp;
            <span class="text-weight-medium" bold>   [&nbsp;{{appointment && this.formatDateShort(appointment.appointmentDate)}} - {{appointment && appointment.time}}&nbsp;]</span>
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2">
            <span >Utente: {{appointment.utente && appointment.utente.firstNames}}
            <span >  &nbsp; &nbsp; &nbsp; Codigo: {{appointment.utente && appointment.utente.systemNumber}}</span> </span>
          </q-item-label>
         </div>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
          <q-btn outline color="red" label="Confirmar" @click.stop="promptToConfirm(appointment)" />
           <q-btn outline color="red" label="Re-Marcar" @click="showEdit = true" />
          </div>
        </q-item-section>
        <q-dialog v-model="showEdit" >
            <reschedule :appointment="appointment" />
        </q-dialog>
      </q-item>
    </q-list>
      </q-scroll-area>
<br>
    <h4 bold>Consultas Marcadas</h4>
        <q-list bordered class="rounded-borders" >
      <q-item v-for="appointment in appointmentsBDD"
        :key="appointment.id">
         <q-item-section avatar top>
          <q-icon name="event" color="black" size="34px" />
        </q-item-section>
        <q-item-section top>
         <div class="q-gutter-m">
          <q-item-label lines="1">
            <span> </span>
            <span class="text-weight-medium" bold> &nbsp;{{appointment && this.formatDateShort(appointment.appointmentDate)}} &nbsp;- {{appointment && appointment.time}}</span>
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2">
            <span >Utente: {{appointment.utente && appointment.utente.firstNames}}
            <span >  &nbsp; &nbsp;Codigo&nbsp;:{{appointment.utente && appointment.utente.systemNumber}} </span> </span>
          </q-item-label>
         </div>
        </q-item-section>
        <q-item-section top side>
          <div class="text-black-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" dense square outline icon="close" />
          </div>
        </q-item-section>
   </q-item>
   </q-list>
  </div>
</template>

<script>
import { date } from 'quasar'
import { ref } from 'vue'
import Appointment from '../store/models/appointment/Appointment'
import Utente from '../store/models/utente/Utente'
import Clinic from '../store/models/clinic/Clinic'
export default {
  data () {
    return {
         appointmentsBD: [],
         appointmentsConfirmed: [],
        // appointmentsPending: [],
      tab: ref('mails'),
       alert: ref(false),
      showEdit: false
      }
  },
 computed: {
        appointmentsPending () {
          console.log(Appointment.query().with('utente').with('clinic').with('utente.address').with('utente.clinic').where((appointment) => { return appointment.status === 'PENDENTE' && appointment.appointmentDate !== '' }).get())
         return Appointment.query().with('utente').with('clinic').with('utente.address').with('utente.clinic').where((appointment) => { return appointment.status === 'PENDENTE' && appointment.appointmentDate !== '' }).get()
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
          Appointment.api().get('/appointment')
          // Utente.api().get('/utente')
       },
      handlerEdit () {
        this.showEdit = true
      },
      fillUtenteOnAppointment () {
      this.appointmentsPending.forEach(appointment => {
          this.UtenteBD.forEach(utente => {
            if (appointment.utente_id === utente.id && appointment.appointmentDate !== '') {
                 appointment.utente = utente
             }
          })
          if (appointment.status === 'PENDENTE') {
            this.appointmentsPending.push(appointment)
          }
       })
       },
       formatDate (value) {
            return date.formatDate(value, 'YYYY/MM/DD')
        },
        formatDateShort (value) {
            return date.formatDate(value, 'DD-MM')
        },
        promptToConfirm (appointmentToConfirm) {
      this.$q.dialog({ title: 'Confirm', message: 'Deseja Confirmar?', cancel: true, persistent: true }).onOk(() => {
        appointmentToConfirm.status = 'CONFIRMADO'
      appointmentToConfirm.utente = this.UtenteBD.find(utente => utente.id === appointmentToConfirm.utente_id)
      appointmentToConfirm.clinic_id = this.clinicDB.id
      appointmentToConfirm.clinic = this.clinicDB
      appointmentToConfirm.appointmentDate = new Date(appointmentToConfirm.appointmentDate)
       console.log(appointmentToConfirm)
        Appointment.api().post('/appointment/', appointmentToConfirm).then(resp => {
                console.log(resp.response.data)
                this.$emit('appointmentConfirm', resp.response.data)
            }).catch(error => {
                console.log(error)
            })
            })
      }
       },
       mounted () {
         this.getAppointments()
         this.fillUtenteOnAppointment()
    },
    components: {
       reschedule: require('pages/Reschedule.vue').default
       }
}
</script>
