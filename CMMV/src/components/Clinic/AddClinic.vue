<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top">
  <div class="row q-py-lg q-mt-md text-weight-bold text-subtitle1">
         Cadastrar Clinica
        </div>
  <q-card  class="q-pt-lg">
        <form @submit.prevent="validateClinic" >
            <q-card-section class="q-px-md">
               <div class="row q-mt-md">
                <input-text-field
                    ref="nome"
                    square
                    v-model="newClinic.name"
                    :rules="[ val => val.length >= 3 || 'O nome indicado é inválido']"
                    lazy-rules
                    class="col fild-radius"
                    label="Nome" />
            </div>
              <div class="row q-mt-md">
                <input-text-field
                    ref="code"
                    square
                    v-model="newClinic.code"
                    :rules="[ val => !this.databaseCodes.includes(val) || 'o Codigo indicado ja existe']"
                    lazy-rules
                    class="col fild-radius"
                    label="Codigo" />
            </div>
             <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="newClinic.type"
                    :options="clinicTypes"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    ref="clinicType"
                    :rules="[ val => ( val.length > 0  ) || ' Por favor indique o tipo']"
                    lazy-rules
                    label="Tipo de Clinica" />
            </div>
             <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="newClinic.province"
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
                    v-model="newClinic.district"
                    :options="districts"
                    ref="district"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => ( val != null) || ' Por favor indique a Distrito/Cidade']"
                    lazy-rules
                    label="Distrito/Cidade" />
            </div>
             <div class="row q-mb-md" >
                <div class="col-2">
                    <q-btn push  dense color="white" text-color="black" round icon="my_location" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="newClinic.latitude" lazy-rules label="Latitude" ref="latitude" :rules="[ val => val.length > 0 || 'O nome indicado é inválido']" />
                </div>
                <div class="col-4 q-pl-md">
                    <input-text-field v-model="newClinic.longitude" lazy-rules label="Longitude" ref="longitude" :rules="[ val => val.length > 0 || 'O nome indicado é inválido']" />
                </div>
            </div>
            </q-card-section>
           <q-card-actions align="right" class="q-mb-md">
                <q-btn type="submit" label="Submeter" color="primary"/>
            </q-card-actions>
        </form>
        <pre>{{clinic}}</pre>
    </q-card>
</transition-group>
</template>

<script>
import Clinic from '../../store/models/clinic/Clinic'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'

export default {
      props: ['clinic', 'backToDashBoard'],
    data () {
        return {
            databaseCodes: [],
            currClinic: {},
            newClinic: {
                name: '',
                type: '',
                latitude: '',
                longitude: '',
                province: null,
                district: null
            },
            clinico: '',
             clinicTypes: [
              '', 'US', 'Clinicas Móveis', 'Hospital', 'Posto de Saúde'
            ]
        }
    },
    created () {
        this.currClinic = Object.assign({}, this.newClinic)
    },
      mounted () {
        const offset = 0
        const provinceOffset = 0
        this.getAllClinics(offset)
        this.getAllProvinces(provinceOffset)
        this.extractDatabaseCodes()
    },
    computed: {
         clinicos () {
            return Clinic.all()
        },
          provinces () {
            return Province.all()
        },
        districts () {
        if (this.newClinic.province !== null) {
            return District.query().withAll().where('province_id', 1).get()
        } else {
            return null
        }
        }
    },
    methods: {
 validateClinic () {
            this.$refs.nome.$refs.ref.validate()
             this.$refs.code.$refs.ref.validate()
            this.$refs.latitude.$refs.ref.validate()
            this.$refs.longitude.$refs.ref.validate()
            console.log(!this.$refs.nome.$refs.ref.validate() && !this.$refs.latitude.hasError && !this.$refs.longitude.hasError)
            if (this.$refs.nome.$refs.ref.validate() && this.$refs.latitude.$refs.ref.validate() && this.$refs.longitude.$refs.ref.validate() && this.$refs.code.$refs.ref.validate()) {
                this.submitClinic()
            }
        },
        submitClinic () {
            console.log(this.newClinic)
            Clinic.api().post('/clinic', this.newClinic).then(resp => {
                console.log(resp.response.data)
                this.$emit('update:backToDashBoard', true)
                alert('Clinica Cadastrada Com Sucesso')
            }).catch(error => {
                console.log(error)
            })
        },
        getAllClinics (offset) {
        if (this.clinicos.length <= 0) {
                Clinic.api().get('/clinic?offset=' + offset + '&max=100').then(resp => {
                    offset = offset + 100
                    if (resp.response.data.length > 0) { setTimeout(this.getAllClinics(offset), 2) }
                }).catch(error => {
                    console.log(error)
                })
        }
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
    },
    validateThis (code) {
      this.clinicos.forEach(element => {
            return element.code === code
             })
    },
    extractDatabaseCodes () {
        this.clinicos.forEach(element => {
            this.databaseCodes.push(element.code)
    })
    },
        navRedirect (e, go) {
      e.preventDefault() // we cancel the default navigation
      go({ query: { tab: '2', noScroll: true } })
    }
    },
    components: {
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
          'combo-field': require('components/Shared/ComboField.vue').default
      //  'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default
    }

}
</script>

<style>
    .fild-radius {
        border-radius: 5px;
    }
</style>
