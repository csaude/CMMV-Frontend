<template>
      <q-list bordered separator>
       <utente-list
          v-for="(utente, key) in utentes"
          :key="key"
          :utente="utente"
          :id="key"
          :name="name"
          :value="value"
           v-on:listenerChild="listenerChild">
          </utente-list>
       </q-list>
</template>

<script>
export default {
    props: ['utentes', 'name', 'value'],
    methods: {
    listenerChild (childUtente) {
      this.utente = childUtente
      this.$emit('listenerChild', this.utente)
    }
    },
     components: {
    'utente-list': require('components/Shared/UtenteList.vue').default
  }
}
</script>
