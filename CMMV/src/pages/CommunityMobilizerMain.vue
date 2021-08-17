<template>
  <q-layout view="hHh lpR fFf">
   <div class="q-pa-md">
       <div class="column bg-red-4" style="height: 450px">
      <q-toolbar>
        <div class="col-auto">
            <q-btn color="black-7" round flat icon="more_vert" @click="toggleLeftDrawer">
            </q-btn>
          </div>
          </q-toolbar>
    </div>
    <div class="column items-center bg-grey-4" style="height: 450px">
     <div class="col self-center">
       <img src="~src/assets/mobilizador.png">
  <div class="text-h4 text-weight-light">{{communityMobilizer.firstnames + ' ' + communityMobilizer.lastname}}
  </div>
      </div>
      <div class="col-9" v-if="materialTab" style="width: 90%">
    <q-btn color="white" text-color="black"  label="Material Educativo" class="col" style="width: 100%"/>
      <div class="q-mt-lg rounded-borders">
     <informative-docs :docsOrImages="infoDB" />
      </div>
      </div>
      <div class="col-9" v-if="utentesTab" style="width: 100%">
   <q-btn-group style="width: 100%">
      <q-btn color="primary" glossy label="Pendentes" @click="handler" style="width: 100%"/>
      <q-btn color="primary" glossy label="Associados" @click="handler1"  style="width: 100%"/>
      <q-btn color="primary" glossy label="Enviados"  @click="handler2"  style="width: 100%"/>
    </q-btn-group>
     <div class="q-pa-md" style="width: 100%">
      <utentes-list :utentes="pendings" v-if="pending" v-on:listenerChild="listenerChild"/>
    <utentes-list :utentes="associateds" v-if="associated" :name="call"/>
  <utentes-list :utentes="sendeds" v-if="sended"/>
  <div class="float-right">
  <br>
  <q-btn class="q-py-xs float-right" align="right"   padding="xs lg" unelevated rounded color="deep-orange" v-show="pending" label="Associar" @click="handlerAssociate" />
  </div>
     </div>
      </div>
       <div class="col-9" v-if="changePasswordTab" style="width: 90%">
           <q-input
                    v-model="communityMobilizer"
                    rounded
                    outlined
                    class="col"
                    label="Senha Actual"
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
                <q-input
                    v-model="communityMobilizer"
                    rounded
                    outlined
                    class="col"
                    label="Nova Senha"
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
                <q-input
                    v-model="communityMobilizer"
                    rounded
                    outlined
                    class="col"
                    label="Repeticao da Nova Senha"
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
                <q-btn  text-color="black"  label="Alterar" class="float-right" style="width: 50%" align="center" unelevated rounded color="deep-orange"/>
      </div>
          </div>
   </div>
    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" bordered>
     <q-btn color="grey-7" round flat icon="close"  />
      <div class="q-pa-md">
    <div class="q-gutter-md absolute-center vertical-top">
      <q-skeleton type="circle" size="100px" />
      <p>Carlos Alberto </p>
      <p>Mobilizador</p>
     <br>
      <q-list>
      <q-item clickable v-ripple  v-for="op in opcoes" :key="op" @click="getTab(op)">
        <q-item-section  > {{op}}</q-item-section>
      </q-item>
       </q-list>
     </div>
  </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="row">
        <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        class="text-grey-7 full-width absolute-bottom q-mb-xs"
      >
        <q-tab :ripple="false" name="home" icon="home" label="Inicio" />
        <q-tab :ripple="false" name="message" icon="message" label="Mensagens" />
        <q-tab :ripple="false" name="settings" icon="settings" label="Definições" />
      </q-tabs>
    </div>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import InfoDocsOrImages from '../store/models/dorcOrImages/InfoDocsOrImages'
import Utente from '../store/models/utente/Utente'
import CommunityMobilizer from '../store/models/mobilizer/CommunityMobilizer'

export default {
  data () {
    const leftDrawerOpen = ref(false)
    return {
         pending: false,
          associated: false,
          sended: false,
          materialTab: false,
          utentesTab: false,
          changePasswordTab: false,
          pendings: [],
          associateds: [],
          sendeds: [],
           selectedUtents: [],
      leftDrawerOpen,
       communityMobilizer: {},
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
       opcoes: [
        'Material Educativo', 'Utentes', 'Perfil', 'Alterar Senha'
      ]
    }
  },
  methods: {
    getDocsInfo () {
          InfoDocsOrImages.api().get('/infoDocsOrImages')
          Utente.api().get('/utente')
          CommunityMobilizer.api().get('/communityMobilizer')
      },
      getUtente () {
      },
    handler () {
         this.pending = true
         this.sended = false
         this.associated = false
    },
    handler1 () {
        this.pending = false
        this.associated = true
        this.sended = false
    },
    handler2 () {
         this.pending = false
         this.sended = true
         this.associated = false
    },
    listenerChild (reply) {
     if (this.selectedUtents.includes(reply)) {
        this.selectedUtents.pop(reply)
      } else {
     this.selectedUtents.push(reply)
           }
      },
    getTab (tab) {
        if (tab === 'Material Educativo') {
            this.materialTab = true
            this.utentesTab = false
            this.changePasswordTab = false
            this.communityMobilizer = this.communityMobilizerDb
        }
         if (tab === 'Utentes') {
            this.materialTab = false
            this.utentesTab = true
            this.changePasswordTab = false
            this.getUtentesByStatus(this.utenteDB)
        }
         if (tab === 'Alterar Senha') {
            this.materialTab = false
            this.utentesTab = false
            this.changePasswordTab = true
        }
         this.toggleLeftDrawer()
    },
    getUtentesByStatus (utenteDB) {
      this.pendings = []
      this.utenteDB.forEach(utente => {
        if (utente.status === 'PENDENTE') {
          return this.pendings.push(utente)
        } else if (utente.status === 'ASSOCIADO') {
          return this.associateds.push(utente)
        } else if (utente.status === 'ENVIADO') {
          return this.sendeds.push(utente)
        }
      })
    },
   handlerAssociate () {
     this.selectedUtents.forEach(utente => {
        // utente.communityMobilizer=communityMobilizerDb
        utente.status = 'ASSOCIADO'
      })
      this.listErrors = []
      this.submitting = true
      setTimeout(() => {
        this.submitting = false
      }, 300)
      Utente.api().put('/utente/' + this.selectedUtents[0].id).then(resp => {
        this.$q.notify({
          type: 'positive',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          timeout: 1000,
          position: 'bottom',
          classes: 'glossy',
          progress: true,
          message: 'A informação foi actualizada com successo!! [ ' + this.selectedUtents[0].id + ' ]'
        })
      })
   }
  },
  computed: {
      infoDB () {
        // console.log(this.InfoDocsOrImages.all)
        return InfoDocsOrImages.all()
      },
      utenteDB () {
        return Utente.all()
      },
        communityMobilizerDb () {
         return CommunityMobilizer.find(19)
      }
  },
  components: {
       'informative-docs': require('components/Home/MaterialEducativo.vue').default,
       'utentes-list': require('components/Shared/ViewUtenteList.vue').default
       },
        mounted () {
      this.getUtentesByStatus(this.utenteDB)
       this.getDocsInfo()
       this.getUtente()
       // this.communityMobilizer = this.communityMobilizerDb
    }
}
</script>
