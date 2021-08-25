<template>
  <q-page class="absolute full-width full-height column">

    <pageHeader :showPreviousButton="true" @previousScreen="$emit('previousScreen')"> Registo do Beneficiário</pageHeader>
    <form @submit.prevent="validateUtente">
        <div class="q-px-sm">
            <div class="row q-my-lg">Dados Pessoais</div>
            <div class="row">
                <input-text-field
                    class="col"
                    ref="nome"
                    v-model="utente.firstNames"
                    :rules="[ val => val.length >= 3 || 'O nome indicado é inválido']"
                    lazy-rules
                    label="Nome" />
            </div>
            <div class="row">
                <input-text-field
                    class="col"
                    ref="apelido"
                    v-model="utente.lastNames"
                    :rules="[ val => val.length >= 2 || 'O apelido indicado é inválido']"
                    lazy-rules
                    label="Apelido" />
            </div>
            <div class="row">
                <input-number-phone-field
                    class="col"
                    ref="phone"
                    mask="#########"
                    fill-mask
                    v-model="utente.cellNumber"
                    label="Numero de Telefone" />
            </div>
            <div class="row">
                <input-number-phone-field
                    class="col"
                    ref="whatsapp"
                    mask="#########"
                    fill-mask
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
                        ref="birthDate"
                        :rules="['date']"
                        label="Data de Nascimento">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="utente.birthDate" >
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
                        ref="age"
                        :rules="[val => (val > 0 && val < 100) || 'Digite uma idade real']"
                        lazy-rules />
                </div>
            </div>
            <div class="absolute-bottom q-px-sm q-mb-lg">
                <div class="text-center q-mb-md">
                    <buttone  label="Proximo" type="submit" />
                </div>
            </div>
        </div>
    </form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
        age: '',
      utente: {
            firstNames: '',
            lastNames: '',
            birthDate: '',
            cellNumber: '',
            whatsappNumber: '',
            preferedLanguage: '',
            documentType: '',
            documentNumber: '',
            systemNumber: '',
            haspartner: '',
            status: 'PENDENTE',
            addresses: []
        }
    }
  },
  methods: {
    calculateAge () {
          this.age = Math.floor((new Date() - new Date(this.utente.birthDate)) / 31557600000)
        },
        validateUtente () {
            this.$refs.nome.$refs.ref.validate()
            this.$refs.apelido.$refs.ref.validate()
            this.$refs.phone.$refs.ref.validate()
            this.$refs.whatsapp.$refs.ref.validate()
            this.$refs.birthDate.validate()
            this.$refs.age.$refs.ref.validate()
            if (!this.$refs.nome.hasError && !this.$refs.apelido.hasError && !this.$refs.phone.hasError && !this.$refs.whatsapp.hasError && !this.$refs.birthDate.hasError && !this.$refs.age.hasError) {
                this.$emit('nextScreen', this.utente)
            }
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
