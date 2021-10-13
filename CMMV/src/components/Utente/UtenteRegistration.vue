<template>
  <q-page >
    <div class="row items-center q-mb-md bg-deep-orange-3">
        <div class="col q-my-sm">
            <q-btn
                flat
                round
                color="white"
                icon="chevron_left"
                @click="closeRegistration(false)"/>
        </div>
         <div class="row text-white text-weight-bolder justify-center">
            Registar Utente
        </div>
        <div class="col"><q-space /></div>
    </div>
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
                    v-model="address.province"
                    :options="provinces"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    ref="province"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => ( val != null ) || ' Por favor indique a província']"
                    lazy-rules
                    label="Província" />
            </div>
            <div class="row q-mb-md">
                <combo-field
                    class="col"
                     transition-show="flip-up"
                    transition-hide="flip-down"
                    v-model="address.district"
                    :options="districts"
                    ref="district"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => ( val != null) || ' Por favor indique a Distrito/Cidade']"
                    lazy-rules
                    label="Distrito/Cidade" />
            </div>
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    v-model="address.residence"
                    :rules="[ val => (val.length > 0) || 'Por favor indique a morada']"
                    lazy-rules
                    outlined
                    dense
                    ref="morada"
                    type="textarea"
                    label="Morada"
                    />
            </div>
            <!--div class="row q-mb-md" >
                <div class="col-2">
                    <q-btn push  dense color="white" text-color="black" round icon="my_location" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="address.latitude" label="Latitude" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="address.longitude" label="Longitude" />
                </div>
            </div-->
        </div>
          <div class="absolute-bottom">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn size="xl" fab icon="save" type="submit" color="primary" />
          </q-page-sticky>
        </div>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="100px" color="primary" />
      </q-inner-loading>
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
            addresses: [],
            communityMobilizer: {}
        },
        currUtente: {},
        selectedProvince: '',
        address: {
            city: '',
            residence: ' ',
            latitude: '',
            longitude: '',
            district: null,
            province: null
        },
        visible: false
    }
  },
    props: ['mobilizer', 'showUtenteRegistrationScreenProp'],
    emits: ['update:showUtenteRegistrationScreenProp'],
    components: {
        'combo-field': require('components/Shared/ComboField.vue').default,
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
        'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default,
        'input-number-field': require('components/Shared/InputNumberField.vue').default
        // buttone: require('components/Shared/Button.vue').default,
        // pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
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
        if (this.address.province !== null) {
            return District.query().withAll().where('province_id', 1).get()
        } else {
            return null
        }
        }
    },
    methods: {
        calculateAge1 () {
          this.utente.age = this.calculateAge
        },
        closeRegistration (close) {
            setTimeout(() => {
          this.visible = false
         this.$emit('update:showUtenteRegistrationScreenProp', close)
        }, 2000)
        },
        validateUtente () {
            this.$refs.nome.$refs.ref.validate()
            this.$refs.apelido.$refs.ref.validate()
            this.$refs.phone.$refs.ref.validate()
            this.$refs.whatsapp.$refs.ref.validate()
            this.$refs.age.$refs.ref.validate()
            this.$refs.morada.validate()
            if (!this.$refs.nome.hasError && !this.$refs.apelido.hasError &&
                !this.$refs.phone.hasError && !this.$refs.whatsapp.hasError &&
                !this.$refs.age.hasError && !this.$refs.district.hasError &&
                !this.$refs.morada.hasError) {
                this.saveUtente()
            }
        },
        saveUtente () {
        this.visible = true
        this.address.city = this.address.district.description
        this.utente.addresses.push(this.address)
        this.utente.birthDate = new Date(this.utente.birthDate)
        this.utente.communityMobilizer = this.mobilizer
        this.utente.communityMobilizer_id = this.mobilizer.id

        if (this.utente.communityMobilizer !== null) {
             this.utente.status = 'ASSOCIADO'
        }
        if (this.utente.haspartner === 'true') {
            this.utente.haspartner = true
        } else {
            this.utente.haspartner = false
        }
        Utente.api().post('/utente', this.utente).then(resp => {
            this.closeRegistration(false)
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
