<template>
  <q-page class="absolute full-width full-height column">

    <pageHeader :showPreviousButton="true" @previousScreen="$emit('previousScreen')"/>

    <div class="q-px-sm">
        <div class="row q-my-lg">Dados Pessoais</div>
        <div class="row">
            <input-text-field
                class="col"
                v-model="utente.firstNames"
                label="Nome" />
        </div>
        <div class="row">
            <input-text-field
                class="col"
                v-model="utente.lastName"
                label="Apelido" />
        </div>
        <div class="row">
            <input-number-phone-field
                class="col"
                v-model="utente.cellNumber"
                label="Numero de Telefone" />
        </div>
        <div class="row">
            <input-number-phone-field
                class="col"
                v-model="utente.whatsappNumber"
                label="Numero de Telemovel com Whatsapp" />
        </div>

        <div class="column inline items-start example-container q-mr-sm">
            <div class="example-cell" tabindex="0"> Tem Parceiro ?
                <q-radio keep-color color="orange" v-model="utente.hasPartner" val="true" label="Sim" />
                <q-radio keep-color color="orange" v-model="utente.hasPartner" val="false" label="Nao"/>
            </div>
        </div>
        <div class="row q-mt-md" >
            <div class="col-8 q-pr-sm">
                <q-input
                    rounded outlined
                    v-model="utente.birthDate"
                    mask="date"
                    :rules="['date']"
                    @input="calculateAge()"
                    label="Data de Nascimento">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="utente.birthDate" @input="calculateAge()">
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
            <div class="col-4 q-pl-sm">
                <input-number-field
                    v-model="age"
                    label="Idade"
                    :rules="[val => (val > 0 && val < 100) || 'Digite uma idade real']"  />
            </div>
        </div>
        <div class="absolute-bottom q-px-sm q-mb-lg">
            <div class="text-center q-mb-md">
                <buttone  label="Proximo" @click="$emit('nextScreen')" />
            </div>
        </div>
    </div>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
        age: '',
      utente: {
            firstNames: '',
            lastName: '',
            birthDate: '',
            cellNumber: '',
            whatsappNumber: '',
            preferedLanguage: '',
            documentType: '',
            documentNumber: '',
            systemNumber: '',
            haspartner: '',
            address: {
                city: '',
                neighboorhood: '',
                residence: '',
                latitude: '',
                longitude: '',
                district: {
                    id: ''
                }
            }
        }
    }
  },
  methods: {
    calculateAge () {
          this.age = Math.floor((new Date() - new Date(this.utente.birthDate)) / 31557600000)
          console.log(this.age)
        }
  },
  components: {
    'input-text-field': require('components/Shared/InputFieldText.vue').default,
    'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default,
    'input-number-field': require('components/Shared/InputNumberField.vue').default,
    buttone: require('components/Shared/Button.vue').default,
    pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
  }
}
</script>
