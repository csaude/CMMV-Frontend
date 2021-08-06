<template>
  <q-page padding>
  <div class="q-pa-md absolute full-width full-height column">
    <p>Registrar Utente</p>
  <p>Dados Pessoais</p>
  <br>
     <input-text-field v-model="utente.name" label="Nome" />
   <br>
   <input-text-field v-model="utente.surname"  label="Apelido" />
   <br>
     <input-number-phone-field v-model="utente.phoneNumber" label="Numero de Telefone" />
   <br>
   <input-number-phone-field v-model="utente.whatsappNumber" label="Numero de Telemovel com Whatsapp" />
  <div class="column inline items-start example-container">
     <div class="example-cell" tabindex="0"> Tem Parceiro ?
      <q-radio v-model="utente.hasPartner" val="true" label="Sim" />
      <q-radio v-model="utente.hasPartner" val="false" label="Nao"/></div>
    </div>
     <br>
       <div class="q-pa-md" style="max-width: 700px" >
      <div style="max-width: 700px">
    <q-input rounded outlined v-model="utente.datebirth" mask="date" :rules="['date']" label="Data de Nascimento">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="utente.datebirth">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
      </div>
     <br>
     <div class="row">
    <input-number-field v-model="utente.age" label="Idade" :rules="[val => (val > 0 && val < 100) || 'Digite uma idade real']"  />
    </div>
  </div>
   <div class="absolute-bottom q-px-lg q-mb-lg">
        <div class="text-center q-mb-md">
            <buttone  label="Proximo" @click="$emit('nextScreen')" />
        </div>
    </div>
    <pre>{{utente}}</pre>
     </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      utente: {
        name: '',
        surname: '',
        datebirth: ' ',
        phoneNumber: ' ',
        whatsappNumber: ' ',
        age: '',
        hasPartner: ''
      }
    }
  },
  components: {
    'input-text-field': require('components/Shared/InputFieldText.vue').default,
    'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default,
    'input-number-field': require('components/Shared/InputNumberField.vue').default,
    buttone: require('components/Shared/Button.vue').default
  }
}
</script>
