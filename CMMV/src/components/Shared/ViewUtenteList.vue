<template>
      <q-list bordered separator>
       <utente-list
          v-for="(utente, key) in utentes"
          :key="key"
          :utente="utente"
          :id="key"
          :name="name"></utente-list>
       </q-list>
</template>

<script>
export default {
    props: ['utentes', 'name'],
     components: {
    'utente-list': require('components/Shared/UtenteList.vue').default
  }
}
</script>
