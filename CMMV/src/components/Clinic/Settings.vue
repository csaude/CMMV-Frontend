<template>
  <div>
    <div class="row q-py-lg q-mt-md text-weight-bold text-subtitle1">
            <p>Definições</p>
        </div>
        <div class="">
            <q-toolbar >
                <q-tabs v-model="tab" shrink stretch>
                  <q-tab name="Clinicas" label="Clinicas" />
                  <q-tab name="Mobilizadores" label="Mobilizadores" />
                  <q-tab name="Consultas" label="Consultas" />
                </q-tabs>
            </q-toolbar>
            <q-separator class="q-mx-md"/>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  setup () {
    return {}
  },
  computed () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
