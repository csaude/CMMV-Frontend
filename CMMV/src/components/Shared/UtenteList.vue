<template>
      <q-item clickable v-ripple rounded>
        <q-item-section> {{utente.firstNames}}
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
           <q-checkbox v-model="checked"  @click="checkUtente"/>
        </q-item-section>
      </q-item>
</template>
<script>
export default {
    props: ['utente', 'name'],
    methods: {
    showPending () {
    if (this.utente.status === 'PENDENTE') {
        this.pending = true
      } else if (this.utente.status === 'ASSOCIADO') {
         this.associated = true
      } else if (this.utente.status === 'ENVIADO') {
         this.sended = true
      }
    },
    checkUtente () {
      this.$emit('listenerChild', this.utente)
    }
    },
     data () {
       let pending, sended, associated
       const checked = false
       return {
         pending, sended, associated, checked
    }
    },
    mounted () {
      this.showPending()
     // this.check()
    },
    computed: {
    setUtenteChecked () {
      // Check if we need to reverse the list
      if (this.checked === true) {
       return this.utente.selected
      }
      return null
    }
  }
     }
</script>
