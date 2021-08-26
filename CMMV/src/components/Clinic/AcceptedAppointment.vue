<template>
  <q-item clickable v-ripple>
        <q-item-section avatar top>
            <q-icon name="date_range" size="lg" color="grey-8"/>
        </q-item-section>

        <q-item-section>
            <q-item-label>&nbsp;{{appointment && this.formatDateShort(appointment.appointmentDate)}} &nbsp;- {{appointment && appointment.time}} </q-item-label>
            <q-item-label caption><span >Utente: {{appointment.utente && appointment.utente.firstNames}}
            <span >  &nbsp; &nbsp;Codigo&nbsp;:{{appointment.utente && appointment.utente.systemNumber}} </span> </span></q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-btn  color="red" flat  icon="delete" />
        </q-item-section>
    </q-item>
</template>

<script>
import { date } from 'quasar'
export default {
    props: ['appointment'],
    methods: {
        formatDateShort (value) {
            return date.formatDate(value, 'DD-MM')
        }
}
}
</script>

<style>

</style>
