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
            <q-tab style="border-radius: 2em; border-style: solid; border-color: white;" name="clinic" icon="local_hospital" label="Unidade Sanitária" />
        </q-tabs>
    </div>
    <form @submit.prevent="authUser">
        <div class="q-pa-xl">
            <div class="row q-mb-md">
                <q-input
                    class="col"
                    ref="user"
                    v-model="username"
                    outlined
                    type="text"
                    :rules="[ val => val.length >= 3 || 'O nome do utilizador deve ter um minimo de 3 caracteres']"
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
                    v-model="password"
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
                    :loading="submitting"
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
import UsersService from '../../services/UsersService'
import Clinic from 'src/store/models/clinic/Clinic'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
// import CommunityMobilizer from '../../store/models/mobilizer/CommunityMobilizer'
 import db from 'src/store/localbase'
import bcrypt from 'bcryptjs'
import { Notify } from 'quasar'
// import Localbase from 'localbase'
// const db = new Localbase('db')
export default {
    data () {
        return {
            isPwd: ref(true),
            tab: ref('mobilizer'),
            username: '',
            password: '',
            submitting: false,
            province: '',
            district: '',
            clinic: ''
        }
    },
    mounted () {
      //  const offset = 0
        Province.apiGetAll()
         District.apiGetAll()
         Clinic.apiGetAll()
      //  this.getAllClinic(offset)
    },
    computed: {
        displayClinics () {
     if (this.district !== null) {
            return Clinic.query().has('code').withAll().where('district_id', this.district.id).get()
        } else {
            return null
        }
        },
          provinces () {
            return Province.query().has('code').get()
        },
        districts () {
        if (this.province !== null) {
            return District.query().has('code').withAll().where('province_id', this.province.id).get()
        } else {
           // this.district = null
            return null
        }
        }
    },
     components: {
    },
    methods: {
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
            console.log({ username: this.username, password: this.password })
            this.$refs.user.validate()
            this.$refs.password.validate()
            if (!this.$refs.user.hasError && !this.$refs.password.hasError) {
                this.submitting = true
     db.newDb().collection('users').get().then(users => {
             if (users.length > 0) {
       const username = users[0].username
       const passwordLocal = users[0].password
      // const role = users[0].role
       console.log(passwordLocal.substring(8))
    const match = bcrypt.compareSync(this.password, passwordLocal.substring(8))
          if (username === this.username && match) {
             // if(password === bcrypt.hash)
          //   var salt = bcrypt.genSaltSync(12)
     // var hash = bcrypt.hashSync(this.password, salt)
           this.verifiyRoleAndUser(users)
               } else {
                    Notify.create({
            icon: 'announcement',
            message: 'Utilizador ou a senha invalida',
            type: 'negative',
            progress: true,
            timeout: 3000,
            position: 'top',
            color: 'negative',
            textColor: 'white',
            classes: 'glossy'
          })
             this.submitting = false
          }
             } else {
                UsersService.login({
                    username: this.username,
                    password: this.password
                }).then((response) => {
                    this.submitting = false
                        console.log('Login >>>>>>>>', response)
                        localStorage.setItem('id_token', response.response.data.access_token)
                         localStorage.setItem('idLogin', response.response.data.mainEntity)
                         localStorage.setItem('idUser', response.response.data.id)
                        localStorage.setItem('orgaoId', response.response.data.orgaoId)
                        localStorage.setItem('refresh_token', response.response.data.refresh_token)
                        localStorage.setItem('username', response.response.data.username)
                         localStorage.setItem('password', response.response.data.password)
                          localStorage.setItem('role', response.response.data.roles[0])
                            if (this.tab === 'mobilizer' && response.response.data.roles[0] === 'ROLE_MOBILIZER') {
                                  db.newDb().collection('users').add({
                                 id_token: response.response.data.access_token,
                          orgaoId: response.response.data.orgaoId,
                          refresh_token: response.response.data.refresh_token,
                           username: response.response.data.username,
                            password: response.response.data.password,
                            idLogin: response.response.data.mainEntity,
                            idUser: response.response.data.id,
                            role: response.response.data.roles[0]
                                  })
                                 const clinics = Clinic.query().has('code').get()
              clinics.forEach(clinic => {
                  db.newDb().collection('clinics').add(
                       clinic)
                    })
                      const provinces = Province.query().has('code').get()
              provinces.forEach(province => {
                  db.newDb().collection('provinces').add(
                       province)
                    })
                    const districts = District.query().has('code').get()
              districts.forEach(district => {
                  db.newDb().collection('districts').add(
                       district)
                    })
                     // CommunityMobilizer.apiFetchById(localStorage.getItem('idLogin'))
                            localStorage.setItem('id_mobilizer', localStorage.getItem('idLogin'))
                                this.$router.push({ path: '/mobilizerHome/' + localStorage.getItem('idLogin') })
                            } else if (this.tab === 'clinic' && response.response.data.roles[0] === 'ROLE_USER') {
                              localStorage.setItem('id_clinicUser', localStorage.getItem('idLogin'))
                  db.newDb().collection('users').add({
                                 id_token: response.response.data.access_token,
                          orgaoId: response.response.data.orgaoId,
                          refresh_token: response.response.data.refresh_token,
                           username: response.response.data.username,
                            password: response.response.data.password,
                            idLogin: response.response.data.mainEntity,
                             idUser: response.response.data.id,
                             role: response.response.data.roles[0]
                                  })
                                 const clinic = Clinic.query().has('code').where('id', this.clinic.id).get()
                                // const clinicLocalBase = JSON.parse(JSON.stringify(clinic))
                  db.newDb().collection('clinics').add(
                      clinic[0])
                      const province = Province.query().has('code').where('id', this.province.id).get()
                  db.newDb().collection('provinces').add(
                       province[0]
                       )
                    const district = District.query().has('code').where('id', this.district.id).get()
                  db.newDb().collection('districts').add(
                       district[0])
                                this.$router.push({ path: '/clinicHome/' + localStorage.getItem('idLogin') })
                            } else if (this.tab === 'clinic' && response.response.data.roles[0] === 'ROLE_ADMIN') {
                                localStorage.setItem('id_clinicUser', 1)
                                this.$router.push({ path: '/clinicHome/' + 1 })
                            } else {
                                Notify.create({
            icon: 'announcement',
            message: 'Perfil do utilizador nao condiz com a aba selecionada',
            type: 'negative',
            progress: true,
            timeout: 3000,
            position: 'top',
            color: 'negative',
            textColor: 'white',
            classes: 'glossy'
          })
           this.submitting = false
                            }
                }).catch(error => {
                    console.log(error)
                    this.submitting = false
                    if (error.request.response != null) {
                        const arrayErrors = JSON.parse(error.request.response)
                        if (arrayErrors.total == null) {
                        this.listErrors.push(arrayErrors.message)
                        } else {
                        arrayErrors._embedded.errors.forEach(element => {
                            this.listErrors.push(element.message)
                        })
                        }
                        console.log(this.listErrors)
                    }
                })
             }
           })
            }
        },
        verifiyRoleAndUser (users) {
       if (users[0].role === 'ROLE_MOBILIZER' && this.tab === 'mobilizer') {
             localStorage.setItem('id_mobilizer', users[0].idLogin)
              this.$router.push({ path: '/mobilizerHome/' + users[0].idLogin })
               } else if (users[0].role === 'ROLE_USER' && this.tab === 'clinic') {
                     this.$router.push({ path: '/clinicHome/' + localStorage.getItem('idLogin') })
               } else {
                   Notify.create({
            icon: 'announcement',
            message: 'Perfil do utilizador nao condiz com a aba selecionada',
            type: 'negative',
            progress: true,
            timeout: 3000,
            position: 'top',
            color: 'negative',
            textColor: 'white',
            classes: 'glossy'
          })
           this.submitting = false
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
