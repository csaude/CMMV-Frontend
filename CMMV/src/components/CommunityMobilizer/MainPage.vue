<template>
  <q-layout view="hHh lpR fFf">
  <div class="q-pa-sm">
  <utente-registration
                v-if="this.showUtenteRegistrationScreen" :mobilizer="mobilizer"
                v-model:showUtenteRegistrationScreenProp="showUtenteRegistrationScreen"/>
   </div>
   <div v-if="!this.showUtenteRegistrationScreen">
    <q-card :square="false" class="q-mt-sm qmr-sr">
    <div class="column bg-primary" style="height: 190px">
        <q-toolbar>
          <div class="col-auto q-py-sm">
              <q-btn color="black-7" round flat icon="more_vert" @click="leftDrawerOpen = !leftDrawerOpen">
              </q-btn>
          </div>
        </q-toolbar>
    </div>
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="text-gray-8" >
      <q-card class="bg-primary" v-if="this.mobilizer !== null">
        <q-card-section class="flex flex-center q-ma-lg" avatar>
          <q-avatar class="q-py-lg" size="90px">
            <img src="../../assets/User-Profile.png">
          </q-avatar>
        </q-card-section>
          <div class="text-h6 text-white text-weight-bolder text-center">{{this.mobilizer.firstNames}} {{this.mobilizer.lastNames}}</div>
          <div class="text-subtitle2 text-white text-center">{{ this.mobilizer.cellNumber }}</div>
      </q-card>

      <q-list padding class="q-my-lg">
      <q-item to="/" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon name="manage_accounts" class="round"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Perfil</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon name="vpn_key" class="round"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Alterar Senha</q-item-label>
        </q-item-section>
      </q-item>
        <q-separator/>
            <q-item active-class="absolute q-item-no-link-highlighting" clickable v-close-popup @click="onItemClick" to="/">
            <q-item-section avatar>
                <q-icon color="red" name="power_settings_new"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
    <q-card-section>
      <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center justify-center">
              <q-btn
                  round
                  size="50px"
                  class="absolute bg-white"
                  style="middle: 12px; transform: translateY(-30%);">
                  <q-avatar size="150px">
                    <q-img src="../../assets/User-Profile.png"/>
                  </q-avatar>
              </q-btn>
      </div>
    </q-card-section>
     <q-card-section class="q-pt-xl">
        <div class="text-h5 text-center" v-if="this.mobilizer !== null">
         {{this.mobilizer.firstNames}} {{this.mobilizer.lastNames}}
        </div>
        <div class="text-h6 text-grey text-center">
          Mobilizador Comunitário
        </div>
      </q-card-section>
    </q-card>
    <q-space/>
    <div class="q-pt-sm" style="row">
      <q-list>
      <q-expansion-item
          group="MobilizerGroup"
          popup default-opened
          icon="groups"
          header-class="text-primary"
          label="Utentes">
        <q-separator />
       <q-tabs
        v-model="tab"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          class="text-grey q-mb-lg">
        <!--q-tab name="pendentes" label="Pendentes" /-->
        <q-tab name="associados" label="Associados" />
        <q-tab name="enviados" label="Enviados" />
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
          class="text-dark text-left"
          style="border-radius: 5%">
          <!--q-tab-panel name="pendentes">
            <div class="text-h6">Pendentes</div>
            <utentes-view-list :utentes="utentesPendente"/>
          </q-tab-panel-->
          <q-tab-panel name="associados">
            <utentes-view-list v-if="this.mobilizer" :utentes="utentesAssociados" v-model:showUtenteULinkScreenProp="showUtenteULinkScreen" />
              <div class="row justify-center">
                <q-btn size="xl" fab icon="add" @click="showUtenteRegistrationScreen = true" color="primary" />
              </div>
          </q-tab-panel>
          <q-tab-panel name="enviados">
           <utentes-view-list :utentes="utentesEnviados"/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      </q-expansion-item>
      <q-expansion-item
            group="MobilizerGroup"
            popup icon="snippet_folder"
            header-class="text-primary"
            label="Material Educativo">
        <q-separator />
        <view-docs/>
      </q-expansion-item>
    </q-list>
    </div>
   </div>
  </q-layout>
</template>
<script>
import { ref } from 'vue'
import Utente from 'src/store/models/utente/Utente'
import CommunityMobilizer from 'src/store/models/mobilizer/CommunityMobilizer'
import Clinic from 'src/store/models/clinic/Clinic'
export default {
  setup () {
    return {
       tab: ref('associados'),
       leftDrawerOpen: ref(false),
       showUtenteRegistrationScreen: ref(false),
       showUtenteULinkScreen: ref(false),
       clientList: ref(false)
      }
  },
  computed: {
     mobilizer: {
      get () {
        return CommunityMobilizer.query().with('utentes').find(this.$route.params.id)
      },
      set (mobilizer) {
        this.$emit('update:jurisdicao', '')
        CommunityMobilizer.update(mobilizer)
      }
    },
    getAllNewClinics () {
      return Clinic.query().get()
    },
    utentesPendente () {
      return Utente.query()
                   .with('clinic')
                   .with('communityMobilizer')
                   .with('appointments.clinic')
                   .where('status', 'PENDENTE')
                   .get()
    },
     utentesAssociados () {
      return Utente.query()
                   .with('clinic')
                   .with('communityMobilizer')
                   .with('appointments.clinic')
                   .where('status', 'ASSOCIADO')
                   .get()
    },
     utentesEnviados () {
      return Utente.query()
                   .with('clinic')
                   .with('communityMobilizer')
                   .with('appointments.clinic')
                   .where('status', 'ENVIADO')
                   .get()
    }
  },
  methods: {
     async getAllUtente (offset) {
      await Utente.api().get('/utente/communityMobilizer/' + this.$route.params.id).then(resp => {
             offset = offset + 100
            // if (resp.response.data.length > 0) {
            //   setTimeout(this.getAllUtente(offset), 2)
            // }
        }).catch(error => {
            console.log(error)
        })
     },
     async getAllClinics (offset) {
        await Clinic.api().get('/clinic?offset=' + offset + '&max=100').then(resp => {
            offset = offset + 100
            // if (resp.response.data.length > 0) {
            //   setTimeout(this.getAllClinics(offset), 2)
            // }
            }).catch(error => {
                console.log(error)
            })
    },
     async getMobilizer () {
       await CommunityMobilizer.api().get('/communityMobilizer/' + localStorage.getItem('id_mobilizer')).then(resp => {
        }).catch(error => {
            console.log(error)
        })
     }
  },
  created () {
  },
  mounted () {
    const offset = 0
    this.getMobilizer()
    this.getAllClinics(offset)
    this.getAllUtente(offset)
  },
  components: {
     'utente-registration': require('components/Utente/UtenteRegistration.vue').default,
     'utentes-view-list': require('components/Shared/ViewUtenteList.vue').default,
     'view-docs': require('components/Home/MaterialEducativo.vue').default
    }
}
</script>
<style>
.scroll-area{
display : flex;
flex-grow: 1;
}
</style>
