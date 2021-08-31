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
export default {
    props: ['clinic'],
    data () {
        return {
            currClinic: {},
            mobilizer: {}
        }
    },
    created () {
        this.currClinic = Object.assign({}, this.clinic)
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
        }
    },
    components: {
        'input-text-field': require('components/Shared/InputFieldText.vue').default,
        'input-number-phone-field': require('components/Shared/InputFieldPhoneNumber.vue').default
    }

}
</script>

<style>
    .fild-radius {
        border-radius: 5px;
    }
</style>
