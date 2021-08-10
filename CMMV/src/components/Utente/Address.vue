<template>
  <q-page class="absolute full-width full-height column">
    <pageHeader :showPreviousButton="true" @previousScreen="$emit('previousScreen')" />
    <div class="q-px-sm">
        <div class="row q-my-lg">Endereco</div>
        <div class="row q-mb-md">
            <combo-field
                class="col"
                v-model="address.province"
                :options="options"
                label="Provincia" />
        </div>
        <div class="row q-mb-md">
            <combo-field
                class="col"
                v-model="address.district.description"
                :options="options2"
                label="Distrito/Cidade" />
        </div>
        <div class="row q-mb-md">
            <q-input
                class="col"
                v-model="address.residence"
                rounded
                outlined
                type="textarea"
                label="Morada"
                />
        </div>
        <div class="row q-mb-md" >
            <div class="col-2 q-pa-md">
                <q-btn push  dense color="white" text-color="black" round icon="my_location" />
            </div>
            <div class="col-5 q-pl-md">
                <input-text-field v-model="address.latitude" label="Latitude" disable />
            </div>
            <div class="col-5 q-pl-md">
                <input-text-field v-model="address.longitude" label="Longitude" disable />
            </div>
        </div>
    </div>
    <div class="absolute-bottom q-px-sm q-mb-lg">
        <div class="text-center q-mb-md">
            <buttone  label="Enviar" @click="$emit('saveUtente')" />
        </div>
    </div>
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
        district: {
            id: '',
            description: ''
        }
      }
    }
  },
  mounted () {

  },
  components: {
       'combo-field': require('components/Shared/ComboField.vue').default,
       'input-text-field': require('components/Shared/InputFieldText.vue').default,
       pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default,
       buttone: require('components/Shared/Button.vue').default
  }
}
</script>
