<template>
  <q-page class="absolute full-width full-height column">
    <pageHeader :showPreviousButton="true" @previousScreen="$emit('previousScreen')" > Registo do Beneficiário</pageHeader>
    <form @submit.prevent="saveUtente">
        <div class="q-px-sm">
            <div class="row q-my-lg">Endereco</div>
            <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="selectedProvince"
                    :options="provinces"
                    option-value="id"
                    option-label="description"
                    label="Provincia" />
            </div>
            <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="address.district"
                    :options="districts"
                    ref="district"
                    option-value="id"
                    option-label="description"
                    label="Distrito/Cidade" />
            </div>
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    v-model="address.residence"
                    :rules="[ val => !!val || 'Por favor indique a morada']"
                    lazy-rules
                    rounded
                    outlined
                    ref="morada"
                    type="textarea"
                    label="Morada"
                    />
            </div>
            <div class="row q-mb-md" >
                <div class="col-2 q-pa-md">
                    <q-btn push  dense color="white" text-color="black" round icon="my_location" />
                </div>
                <div class="col-5 q-pl-md">
                    <input-text-field v-model="address.latitude" label="Latitude" />
                </div>
                <div class="col-5 q-pl-md">
                    <input-text-field v-model="address.longitude" label="Longitude" />
                </div>
            </div>
        </div>
        <div class="absolute-bottom q-px-sm q-mb-lg">
            <div class="text-center q-mb-md">
                <buttone  label="Enviar" type="submit" />
            </div>
        </div>
    </form>
  </q-page>
</template>
<script>
import District from '../../store/models/district/District'
import Province from '../../store/models/province/Province'
import Utente from '../../store/models/utente/Utente'
export default {
    props: ['utente'],
    data () {
        return {
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
    computed: {
        provinces () {
            return Province.all()
        },
        districts () {
            return District.query().where('province_id', this.selectedProvince.id).get()
        }
    },
    methods: {
        getAllProvinces (offset) {
            if (this.provinces.length <= 0) {
                    Province.api().get('/province?offset=' + offset + '&max=100').then(resp => {
                        offset = offset + 100
                        if (resp.response.data.length > 0) { setTimeout(this.getAllProvinces(offset), 2) }
                    }).catch(error => {
                        console.log(error)
                    })
            }
        },
        saveUtente () {
            this.$refs.district.$refs.ref.validate()
            this.$refs.morada.validate()
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
        }
    },
    mounted () {
        const offset = 0
        this.getAllProvinces(offset)
    },
    components: {
        'combo-field': require('components/Shared/ComboField.vue').default,
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
        pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default,
        buttone: require('components/Shared/Button.vue').default
    },
    created () {
        this.currUtente = Object.assign({}, this.utente)
    }
}
</script>
