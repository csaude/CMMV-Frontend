<template>
  <q-page >
    <div class="row items-center q-mb-md bg-deep-orange-3">
        <div class="col q-my-sm">
            <q-btn
                flat
                round
                color="white"
                icon="chevron_left"
                @click="closeRegistrationVerification()"/>
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
                        ref="birthDate"
                        label="Data de Nascimento">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="utente.birthDate" mask="DD-MM-YYYY">
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
                        v-model="utente.age"
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
                    outlined
                    rounded
                    dense
                    class="col"
                    ref="bairro"
                    v-model="address.neighboorhood"
                    label="Bairro" />
            </div>
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    v-model="address.residence"
                    :rules="[ val => (val.length > 0) || 'Por favor indique a residência']"
                    lazy-rules
                    outlined
                    dense
                    ref="morada"
                    type="textarea"
                    label="Residência"
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
    </form>
  </q-page>
</template>

<script>
import Utente from 'src/store/models/utente/Utente'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
import { useQuasar, QSpinnerIos, date } from 'quasar'
import { ref } from 'vue'

export default {
  data () {
    const $q = useQuasar()
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
        editedIndex: '',
        address: {
            city: '',
            residence: ' ',
            neighboorhood: '',
            latitude: '',
            longitude: '',
            district: null,
            province: null
        },
        $q
    }
  },
    props: ['indexEdit', 'utenteUpdate', 'mobilizer', 'showUtenteRegistrationScreenProp'],
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
        console.log(this.utenteUpdate)
        if (this.indexEdit === 0) {
            this.utente = Object.assign({}, this.utenteUpdate)
            this.utente.birthDate = new Date(this.utenteUpdate.birthDate)
            this.utente.haspartner = ref(true)
            console.log(this.utente)
            if (this.utente.addresses.length > 0) {
                this.address = this.utente.addresses[0]
                this.address.district = District.query().with('province').find(this.address.district_id)
                this.address.province = this.address.district.province
                this.address.province_id = this.address.district.province.id
            }
        } else {
           this.utente = {
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
           }
        }
        this.$q.loading.show({
          spinner: QSpinnerIos,
          message: 'Por favor, aguarde...'
        })
        const offset = 0
        this.getAllProvinces(offset)
        this.getAllDistricts(offset)
    },
    mounted () {
    },
    computed: {
        calculateAge () {
            const valDate = this.utente.birthDate !== null && this.utente.birthDate !== undefined ? this.utente.birthDate : '01-01-' + new Date().getUTCFullYear()
            const initialDate = String(valDate).replace('-', '.').replace('-', '.')
            const pattern = /(\d{2})\.(\d{2})\.(\d{4})/
            const dt = new Date(initialDate.replace(pattern, '$3-$2-$1'))
            const idade = Math.floor((new Date() - dt) / 31557600000)
            return idade
        },
        calculateBirthDate () {
            const realYear = (new Date().getUTCFullYear()) - this.utente.age
            const birthDate = this.utente.age === 0 || this.utente.age === '' ? '' : new Date(String(realYear), '00', '01')
        return birthDate
        },
         provinces () {
            return Province.all()
        },
        districts () {
        if (this.address.province !== null) {
            return District.query().withAll().where('province_id', this.address.province.id).get()
        } else {
            return null
        }
        }
    },
    watch: {
        calculateAge: {
            handler: function (newVal) {
            this.utente.age = newVal !== 0 ? Number(newVal) : ''
            }
        },
        calculateBirthDate: {
            handler: function (newVal) {
            this.utente.birthDate = date.formatDate(newVal, 'DD-MM-YYYY')
            }
        }
    },
    methods: {
        calculateAge1 () {
          this.utente.age = this.calculateAge
        },
        closeRegistration (close) {
        this.$q.loading.show({
            spinner: QSpinnerIos,
            message: 'Por favor, aguarde...'
         })
            setTimeout(() => {
                this.$q.loading.hide()
                this.$emit('update:showUtenteRegistrationScreenProp', close)
            }, 100)
        },
        closeRegistrationVerification () {
            if ((this.address.province !== null && this.address.province !== undefined && this.address.province !== '') ||
                (this.address.residence !== null && this.address.residence !== undefined && this.address.residence.trim().length > 0) ||
                (this.utente.firstNames.length > 0) || (this.utente.lastNames.length > 0)) {
                    this.verificationDialog()
                } else {
                    this.$q.loading.show({
                    spinner: QSpinnerIos,
                    message: 'Por favor, aguarde...'
                    })
                    setTimeout(() => {
                        this.$q.loading.hide()
                        this.$emit('update:showUtenteRegistrationScreenProp', false)
                    }, 100)
            }
        },
        verificationDialog () {
            this.$q.dialog({
                title: 'Confirmação',
                message: 'Pretende voltar ao ecrã anterior?',
                ok: {
                label: 'OK',
                push: true,
                color: 'blue'
                },
                cancel: {
                label: 'Cancelar',
                push: true,
                color: 'negative'
                },
                persistent: true
            }).onOk(() => {
                 this.utente = {}
                 this.$emit('update:showUtenteRegistrationScreenProp', false)
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
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
                this.saveOrUpdateUtente()
            } else {
                this.$q.loading.hide()
            }
        },
        saveOrUpdateUtente () {
            console.log('this.utente.birthDate')
            console.log(this.utente.birthDate)
            this.address.city = this.address.district.description
            this.utente.addresses.push(this.address)
            this.utente.birthDate = new Date(date.formatDate(this.utente.birthDate, 'MM-DD-YYYY'))
            console.log(this.utente.birthDate)
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
            if (this.indexEdit === 1) {
                Utente.api().post('/utente', this.utente, this.$q.loading.show({
                                spinner: QSpinnerIos,
                                message: 'Por favor, aguarde...'
                                }))
                            .then(resp => {
                                console.log(resp.response)
                                this.$q.notify({
                                    message: 'O utente ' + this.utente.firstNames + ' ' + this.utente.lastNames + ' foi registado com sucesso.',
                                    color: 'teal'
                                })
                this.closeRegistration(false)
            }).catch(error => {
                console.log(error)
                this.closeRegistration(false)
            })
            } else {
                Utente.api().patch('/utente/' + this.utente.id, this.utente, this.$q.loading.show({
                                spinner: QSpinnerIos,
                                message: 'Por favor, aguarde...'
                                })).then(resp => {
                                    console.log(resp.response)
                                    Utente.update(this.utente)
                                this.$q.notify({
                                    message: 'O utente ' + this.utente.firstNames + ' ' + this.utente.lastNames + ' foi actualizado com sucesso.',
                                    color: 'teal'
                                })
                this.closeRegistration(false)
            }).catch(error => {
                console.log(error)
                this.closeRegistration(false)
            })
        }
    },
    editaUtente (utente) {
      this.editedIndex = 0
      this.utente = Object.assign({}, utente)
      console.log(utente)
    //   this.address.city = this.address.district.description
    //   this.utente.addresses.push(this.address)
    //   this.utente.birthDate = new Date(this.utente.birthDate)
    //   this.utente.communityMobilizer = this.mobilizer
    //   this.utente.communityMobilizer_id = this.mobilizer.id
    },
    async getAllProvinces (offset) {
        if (this.provinces.length <= 0) {
                await Province.api().get('/province?offset=' + offset + '&max=100').then(resp => {
                    offset = offset + 100
                    this.$q.loading.hide()
                }).catch(error => {
                    this.$q.loading.hide()
                    console.log(error)
                })
        }
    },
      async getAllDistricts (offset) {
        await District.api().get('/district?offset=' + offset + '&max=100').then(resp => {
            offset = offset + 100
             this.$q.loading.hide()
            // if (resp.response.data.length > 0) {
            //   setTimeout(this.getAllClinics(offset), 2)
            // }
            }).catch(error => {
               this.$q.loading.hide()
                console.log(error)
            })
    }
  }
}
</script>
