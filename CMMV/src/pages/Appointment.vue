<template>
  <q-page padding>
  <p>Marcacao Consulta</p>
    <p>Selecione a Data e Hora Preferida</p>
<div class="q-pa-md">
   <div class="q-gutter-md row items-start">
    <q-date
      v-model="appointment.date"
     :options="optionsFn"
    />
      <q-time
        v-model="appointment.time"
        :hour-options="hourOptionsTime1"
        :minute-options="minuteOptionsTime1"
      />
    </div>
</div>
    <pre>{{appointment}}</pre>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import { date } from 'quasar'

export default {
  data () {
    return {
       //newDate: ref('2020/02/01'),
        hourOptionsTime1: [8, 9, 10, 11, 12, 13, 14],
        minuteOptionsTime1: [0],
      appointment: {
        date: '',
        time: ''
      },
      optionsFn (newDate) {
        return newDate >= date.formatDate(Date.now(), 'YYYY/MM/DD')
      },
    }
  },
  components: {
  }
}
</script>
