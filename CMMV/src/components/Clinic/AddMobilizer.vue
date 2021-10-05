<template>
  <q-card style="width: 700px; max-width: 80vw;" class="q-pt-lg">
        <form @submit.prevent="submitMobilizer" >
            <q-card-section class="q-px-md">
               <div class="row">
                    <q-input outlined disable v-model="currClinic.name" label="Unidade sanitaria" dense class="col"/>
               </div>
               <div class="row q-mt-md">
                <input-text-field
                    ref="nome"
                    square
                    v-model="mobilizer.firstNames"
                    :rules="[ val => val.length >= 3 || 'O nome indicado é inválido']"
                    lazy-rules
                    class="col fild-radius"
                    label="Nome" />
            </div>
            <div class="row">
                <input-text-field
                    class="col"
                    ref="apelido"
                    square
                    v-model="mobilizer.lastNames"
                    :rules="[ val => val.length >= 2 || 'O apelido indicado é inválido']"
                    lazy-rules
                    label="Apelido" />
            </div>
            <div class="row">
                <input-number-phone-field
                    class="col"
                    ref="phone"
                    square
                    mask="#########"
                    fill-mask
                    v-model="mobilizer.cellNumber"
                    label="Numero de Telefone" />

                <input-number-phone-field
                    class="col q-ml-md"
                    ref="cellNumber2"
                    mask="#########"
                    square
                    fill-mask
                    v-model="mobilizer.cellNumber2"
                    label="Numero de Telefone 2" />
            </div>
             <div class="row q-mb-md">
                <combo-field
                    class="col"
                    v-model="province"
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
                    v-model="mobilizer.district"
                    :options="districts"
                    ref="district"
                    option-value="id"
                    option-label="description"
                    :rules="[ val => ( val != null) || ' Por favor indique a Distrito/Cidade']"
                    lazy-rules
                    label="Distrito/Cidade" />
            </div>
            </q-card-section>
           <q-card-actions align="right" class="q-mb-md">
                <q-btn label="Cancelar" color="primary" @click="$emit('close')"/>
                <q-btn type="submit" label="Submeter" color="primary" />
            </q-card-actions>
        </form>
        <pre>{{mobilizer}}</pre>
    </q-card>
</template>

<script>
import CommunityMobilizer from '../../store/models/mobilizer/CommunityMobilizer'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
export default {
    data () {
        return {
            mobilizer: {},
            province: null
        }
    },
     mounted () {
        const provinceOffset = 0
        this.getAllProvinces(provinceOffset)
    },
    computed: {
          provinces () {
            return Province.all()
        },
        districts () {
        if (this.province !== null) {
            return District.query().withAll().where('province_id', 1).get()
        } else {
            return null
        }
        }
    },
    created () {
        this.mobilizer.clinic = Object.assign({}, this.clinic)
    },
    methods: {
        submitMobilizer () {
            this.mobilizer.uuid = 'temp-uuid'
            console.log(this.mobilizer)
            CommunityMobilizer.api().post('/communityMobilizer', this.mobilizer).then(resp => {
                console.log(resp.response.data)
                this.$emit('close')
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
    },
    components: {
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
        'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default,
        'combo-field': require('components/Shared/ComboField.vue').default
    }

}
</script>

<style>
    .fild-radius {
        border-radius: 5px;
    }
</style>
