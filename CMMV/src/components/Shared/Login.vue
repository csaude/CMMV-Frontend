<template>
  <q-page >
   <q-card :square="false"
        style="background: radial-gradient(circle at left, #E9BFB1 10%, #EE764E 100%); border-bottom-left-radius: 100em; border-bottom-right-radius: 100em">
    <div class="row q-py-lg q-ml-lg">
        <q-btn flat round color="white" icon="chevron_left" @click="$emit('previousScreen')"/>
    </div>
    <div class="row q-pa-xl texte-center q-mt-lg column">
        <div style="font-family: 'Arial';font-size: 40px; font-weight: bold" class="row text-center column text-white q-mb-md">BEM VINDO</div>
        <div class="row text-center column text-white text-subtitle1 text-weight-bold">Sistema móvel para o <br/> acompanhamento de Circuncisão <br/>Masculina</div>
    </div>
   </q-card>

    <div class="row q-mt-md text-center q-px-xl">
        <q-tabs
            v-model="tab"
            dense
            class=" text-grey userTab col"
            active-color="white"
            indicator-color="primary"
            active-bg-color="primary"
            narrow-indicator
            style="border-radius: 2em; border-style: solid;border-color: #EE764E;"
            align="justify">
            <q-tab style="border-radius: 2em; border-style: solid; border-color: white;" name="mobilizer" icon="manage_accounts" label="Mobilizador" />
            <q-tab style="border-radius: 2em; border-style: solid; border-color: white;" name="clinic" icon="local_hospital" label="Unidade de Serviço" />
        </q-tabs>
    </div>
    <form @submit.prevent="authUser">
        <div class="q-pa-xl">
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    ref="user"
                    v-model="user.username"
                    outlined
                    type="text"
                    :rules="[ val => val.length >= 4 || 'O nome do utilizador deve ter um minimo de 4 caracteres']"
                    lazy-rules
                    rounded
                    label="Utilizador" >
                    <template v-slot:append>
                        <q-icon name="person"  color="primary"/>
                    </template>
                </q-input>
            </div>
            <div class="row q-mb-md">
                <q-input
                    v-model="user.password"
                    rounded
                    outlined
                    class="col"
                    label="Senha"
                    :rules="[ val => val.length >= 4 || 'A senha deve ter um minimo de 4 caracteres']"
                    ref="password"
                    :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                            color="primary"
                        />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <q-btn
                    class="full-width q-py-sm"
                    unelevated rounded
                    color="primary"
                    type="submit"
                    label="Entrar" />
            </div>
            <div class="row q-py-lg float-right">
            <span class="text-h7">Esqueceu as suas credenciais?
                <q-btn flat style="color: #FF0080" color="primary" label="Clique aqui." no-caps/></span>
            </div>
        </div>
    </form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { UtenteLogin } from '../../store/models/userLogin/UserLoginHierarchy'
import Clinic from 'src/store/models/clinic/Clinic'
export default {
    data () {
        return {
            isPwd: ref(true),
            tab: ref('mobilizer'),
            user: {
                username: '',
                password: ''
            }
        }
    },
    mounted () {
        const offset = 0
       // this.doLogin()
        this.getAllClinic(offset)
    },
    computed: {
        displayClinics () {
            return Clinic.all()
        }
    },
    methods: {
        doLogin () {
          UtenteLogin.api().get('/userLogin/1').then(resp => {
                console.log(resp.response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        getAllClinic (offset) {
            if (offset >= 0) {
                Clinic.api().get('/clinic?offset=' + offset + '&max=100').then(resp => {
                this.submitting = false
                offset = offset + 100
                if (resp.response.data.length > 0) {
                    setTimeout(this.getAllClinic(offset), 2)
                }
                }).catch(error => {
                console.log('Erro no code ' + error)
                })
            }
        },
        authUser () {
            this.$refs.user.validate()
            this.$refs.password.validate()
            if (!this.$refs.user.hasError && !this.$refs.password.hasError) {
                if (this.tab === 'mobilizer') {
                    localStorage.setItem('id_mobilizer', 1)
                    this.$router.push({ path: '/mobilizerHome/1' })
                } else {
                    localStorage.setItem('id_clinicUser', Clinic.query().first().id)
                    this.$router.push({ path: '/clinicHome/' + Clinic.query().first().id })
                }
            }
        }
    }

}
</script>

<style>
    .userTab {
        border: 1px solid gray-7;
    }
</style>
