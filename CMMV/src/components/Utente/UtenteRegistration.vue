<template>
  <q-page >
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
                    v-model="utente.cellNumber"
                    label="Número de Telefone" />
            </div>
            <div class="row">
                <input-number-phone-field
                    class="col"
                    ref="whatsapp"
                    mask="#########"
                    v-model="utente.whatsappNumber"
                    label="Número de Telemovel com Whatsapp" />
            </div>
            <div class="column inline items-start example-container q-mr-sm">
                <div class="example-cell" tabindex="0"> Tem Parceira(o) ?
                    <q-radio keep-color color="orange" v-model="utente.hasPartner" val="true" label="Sim" />
                    <q-radio keep-color color="orange" v-model="utente.hasPartner" val="false" label="Não"/>
                </div>
            </div>
            <div class="row q-mt-md" >
                <div class="col-8 q-pr-sm">
                    <q-input
                        dense
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
                        v-model="calculateAge"
                        label="Idade"
                        ref="age"
                        :number="calculateAge"
                        :rules="[val => (val > 14 && val < 100) || 'Digite uma idade real e maior que 14 anos de idade']"
                        lazy-rules />
                </div>
            </div>
            <div class="row q-my-lg">Endereco</div>
            <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="selectedProvince"
                    :options="provinces"
                    ref="province"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => val.length > 0 || 'Por favor indique a província']"
                    label="Província" />
            </div>
            <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="address.district"
                    :options="districts"
                    ref="district"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => !!val && val.length > 0 || 'Por favor indique o distrito']"
                    label="Distrito/Cidade" />
            </div>
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    v-model="address.residence"
                    :rules="[ val => val.length > 0 || 'Por favor indique a morada']"
                    lazy-rules
                    outlined
                    dense
                    ref="morada"
                    type="textarea"
                    label="Morada"
                    />
            </div>
            <div class="row q-mb-md" >
                <div class="col-2">
                    <q-btn push  dense color="white" text-color="black" round icon="my_location" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="address.latitude" label="Latitude" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="address.longitude" label="Longitude" />
                </div>
            </div>
        </div>
          <div class="absolute-bottomg">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn size="xl" fab icon="save" type="submit" color="primary" />
          </q-page-sticky>
        </div>
    </form>
  </q-page>
</template>

<script>
import Utente from 'src/store/models/utente/Utente'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
export default {
  data () {
    return {
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
            age: '',
            status: 'PENDENTE',
            addresses: []
        },
        currUtente: {},
        selectedProvince: '',
        address: {
            city: '',
            residence: ' ',
            latitude: '',
            longitude: '',
            district: null
        }
    }
  },
   components: {
        'combo-field': require('components/Shared/ComboField.vue').default,
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
        'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default,
        'input-number-field': require('components/Shared/InputNumberField.vue').default,
        //  buttone: require('components/Shared/Button.vue').default,
        pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
    },
    created () {
        this.currUtente = Object.assign({}, this.utente)
    },
    mounted () {
        const offset = 0
        this.getAllProvinces(offset)
    },
    computed: {
        calculateAge () {
        const idade = Math.floor((new Date() - new Date(this.utente.birthDate)) / 31557600000)
        return idade
        },
         provinces () {
            return Province.all()
        },
        districts () {
            return District.query().where('province_id', this.selectedProvince.id).get()
        }
    },
    methods: {
        calculateAge1 () {
          this.utente.age = this.calculateAge
        },
        validateUtente () {
            this.$refs.nome.$refs.ref.validate()
            this.$refs.apelido.$refs.ref.validate()
            this.$refs.phone.$refs.ref.validate()
            this.$refs.whatsapp.$refs.ref.validate()
            this.$refs.birthDate.validate()
            this.$refs.age.$refs.ref.validate()
            this.$refs.province.$refs.ref.validate()
            this.$refs.district.$refs.ref.validate()
            this.$refs.morada.validate()
            if (!this.$refs.nome.hasError && !this.$refs.apelido.hasError &&
                !this.$refs.phone.hasError && !this.$refs.whatsapp.hasError &&
                !this.$refs.birthDate.hasError && !this.$refs.age.hasError &&
                !this.$refs.district.hasError && !this.$refs.morada.hasError) {
                console.log(this.currUtente)
            }
        },
        saveUtente () {
        this.address.city = this.address.district.description
        this.currUtente.addresses.push(this.address)
        this.currUtente.birthDate = new Date(this.currUtente.birthDate)
        if (this.currUtente.haspartner === 'true') {
            this.currUtente.haspartner = true
        } else {
            this.currUtente.haspartner = false
        }
        console.log(this.currUtente)
        Utente.api().post('/utente', this.currUtente).then(resp => {
            this.$emit('saveUtente', resp.response.data)
            console.log(resp.response.data)
        }).catch(error => {
            console.log(error)
        })
    },
    getAllProvinces (offset) {
        if (this.provinces.length <= 0) {
                Province.api().get('/province?offset=' + offset + '&max=100').then(resp => {
                    offset = offset + 100
                    if (resp.response.data.length > 0) { setTimeout(this.getAllProvinces(offset), 2) }
                }).catch(error => {
                    console.log(error)
                })
        }
    }
  }
}
</script>
