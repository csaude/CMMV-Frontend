<template>
  <q-page class=" absolute full-width full-height column">
  <div class="row q-px-md q-mt-lg">
        <q-btn flat round color="primary" icon="chevron_left" @click="$emit('previousScreen')"/>
    </div>
    <div class="row q-pa-xl texte-center q-mt-lg column">
        <div class="row text-center column text-h6 q-mb-md">BEM VINDO</div>
        <div class="row text-center column text-weight-medium">Sistema móvel para o <br/> acompanhamento de Circuncisão <br/>Masculina</div>
    </div>
    <div class="row q-mt-md text-center q-px-xl">
        <q-tabs
            v-model="tab"
            class="bg-grey-12 userTab col rounded-borders"
            dense
            align="center"
        >
            <q-tab class="text-primary" name="mobilizer" icon="manage_accounts" label="Mobilizador" />
            <q-tab class="text-grey-7" name="utente" icon="person" label="Utente" />
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
            <div class="row float-right">Esqueceu a senha?</div>
        </div>
        <div class="row column q-pa-xl">
            <q-btn
                class="q-py-sm"
                unelevated rounded
                color="primary"
                type="submit"
                label="Entrar" />
        </div>
    </form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { UtenteLogin } from '../../store/models/userLogin/UserLoginHierarchy'
import Utente from '../../store/models/utente/Utente'
export default {
    data () {
        return {
            isPwd: ref(true),
            tab: ref('utente'),
            user: {
                username: '',
                password: ''
            }
        }
    },
    mounted () {
      this.doLogin()
    },
    computed: {
        logedUser () {
            return UtenteLogin.find(34)
        }
    },
    methods: {
        doLogin () {
          UtenteLogin.api().get('/userLogin/34').then(resp => {
                console.log(resp.response.data)
            }).catch(error => {
                console.log(error)
            })
        },
        authUser () {
            this.$refs.user.validate()
            this.$refs.password.validate()
            if (!this.$refs.user.hasError && !this.$refs.password.hasError) {
                if (this.logedUser != null) {
                    if (this.logedUser.type === 'UTENTELOGIN') {
                        const utente = Utente.query()
                            .with(['addresses', 'user', 'clinic', 'appointments.clinic', 'communityMobilizer'])
                            .where('id', this.logedUser.utente_id)
                            .get()
                            console.log(utente)
                        this.$emit('goHome', utente)
                    }
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
