<template>
  <q-page padding>
  <p>Registrar Utente</p>
  <p>Endereco</p>
  <combo-field v-model="address.province" :options="options" label="Provincia" />
  <br>
  <combo-field v-model="address.district" :options="options2" label="Distrito" />
  <br>
  <input-text-field v-model="address.residence" label="Morada" />
  <br>
    <div class="q-gutter-md row">
  <q-btn flat round dense color="primary" icon="my_location" size="30px"/>
   <input-text-field v-model="address.latitude" label="Latitude" disable />
    <input-text-field v-model="address.longitude" label="Longitude" disable />
  </div>
    <pre>{{address}}</pre>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
         options: [
        'Maputo Provincia', 'Maputo Cidade', 'Gaza', 'Inhambane', 'Manica', 'Sofala'
      ],
      options2: [
        'Kamaxaquene', 'Kamavota', 'Nicouadala', 'Kampfumo', 'Chimoio', 'Beura'
      ],
      address: {
        city: '',
        neighboorhood: '',
        residence: ' ',
        latitude: '544',
        longitude: '755',
        province: ''
      }
    }
  },
  components: {
       'combo-field': require('components/Shared/ComboField.vue').default,
       'input-text-field': require('components/Shared/InputFieldText.vue').default
  }
}
</script>
