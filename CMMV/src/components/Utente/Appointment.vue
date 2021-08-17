<template>
  <q-page>
  <pageHeader :showPreviousButton="false" @previousScreen="$emit('previousScreen')" />
  <p>Marcacao Consulta</p>
    <p>Selecione a Data e Hora Preferida</p>
<div class="row">
   <div class="q-gutter-md">
    <q-date
      v-model="appointment.appointmentDate"
     :options="optionsFn"
    />
      <q-time
        v-model="appointment.time"
        :hour-options="hourOptionsTime1"
        :minute-options="minuteOptionsTime1"
      />
    </div>
</div>
<pre>{{utente}}</pre>
  </q-page>
</template>
<script>
import { date } from 'quasar'

export default {
     props: ['utente'],
  data () {
    return {
        hourOptionsTime1: [8, 9, 10, 11, 12, 13, 14],
        minuteOptionsTime1: [0],
        appointment: {
                appointmentDate: '',
                time: '',
                hasHappened: '',
                orderNumber: '',
                status: '',
                visitDate: ''
            },
      optionsFn (newDate) {
        return newDate >= date.formatDate(Date.now(), 'YYYY/MM/DD')
      }
    }
  },
  components: {
      pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
  }
}
</script>
