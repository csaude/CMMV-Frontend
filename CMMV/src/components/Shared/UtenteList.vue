<template>
      <q-item clickable v-ripple rounded>
        <q-item-section> {{utente.firstname}}
         <q-item-label caption v-if="sended"> {{utente.cellphone}}
          <div class="row q-pa-md flex-break q-py-md">
          <q-icon name="event" />  {{utente.appointments[0].appointmentDate}}    <br>
          <q-icon name="schedule" />  {{utente.appointments[0].time}}
          <q-icon name="place" />  {{utente.appointments[0].clinic.name}}</div></q-item-label>
        </q-item-section>
        <q-item-section avatar >
       <q-icon name="call" color="primary" v-if="associated"/>
    </q-item-section>
    <q-item-section rounded avatar v-if="pending">
           <q-checkbox v-model="check1" />
        </q-item-section>
      </q-item>
</template>
<script>
export default {
    props: ['utente', 'name'],
    methods: {
    showPending () {
    if (this.utente.status === 'pending') {
        this.pending = true
      } else if (this.utente.status === 'associated') {
         this.associated = true
      } else if (this.utente.status === 'sended') {
         this.sended = true
      }
    }
     },
     data () {
       let pending, sended, associated
       return {
         pending, sended, associated
    }
    },
    mounted () {
      this.showPending()
    }
     }
</script>
