<template>
  <div>
    <div class="row q-py-lg q-mt-md text-weight-bold text-subtitle1">
            <p>Definições</p>
        </div>
        <div class="">
            <q-toolbar >
                <q-tabs v-model="selectedTab" shrink stretch>
                  <q-tab name="Clinicas" label="Unidade Sanitária" />
                  <q-tab name="Utilizadores" label="Utilizadores" />
                    <q-tab name="Mobilizadores" label="Mobilizadores" />
                </q-tabs>
            </q-toolbar>
            <q-tab-panels
        v-model="selectedTab"
        dense
        no-caps
        inline-label
      >
              <q-tab-panel name="Clinicas">
                <addClinic> </addClinic>
              </q-tab-panel>
              <q-tab-panel name="Mobilizadores">
                <mobilizers> </mobilizers>
              </q-tab-panel>
              <q-tab-panel name="Utilizadores">
               <users> </users>
              </q-tab-panel>
               </q-tab-panels>
            <q-separator class="q-mx-md"/>
        </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Settings',
  setup () {
    return {
        selectedTab: ref('Clinicas')
    }
  },
  computed () {
  },
  mounted () {
  },
  methods: {
  },
   components: {
     addClinic: require('components/Clinic/AddClinic.vue').default,
      mobilizers: require('components/Clinic/Mobilizers.vue').defaut,
       users: require('components/Clinic/Users.vue').default
  }
}
</script>
