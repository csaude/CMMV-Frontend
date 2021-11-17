<template>
  <q-layout view="hHh lpR fFf">
  <div class="q-pa-sm">
  <utente-registration
                v-if="this.showUtenteRegistrationScreen" :mobilizer="mobilizer" v-model:utenteUpdate="utente" v-model:indexEdit="indexEdit"
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
    <div class="q-pt-xl q-gutter-xl flex flex-center" style="row" v-if="this.optionButtons">
          <q-btn
            outline
            push
            wait-for-ripple
            dense
            color=“primary”
            padding="xl"
            class="text-primary"
            @click="this.optionButtons = false, this.docsDisplay = false, this.clientsManager = true">
             <div class="">
             <q-icon name="group" size="100px"/>
             <div>UTENTES</div>
             </div>
       </q-btn>
        <q-btn
              outline
              push
              wait-for-ripple
              dense
              color=“primary”
              padding="xl"
              class="text-primary"
              @click="this.optionButtons = false, this.clientsManager = false, this.docsDisplay = true">
              <div class="">
              <q-icon name="snippet_folder" size="100px"/>
              <div>MATERIAL EDUCATIVO</div>
              </div>
        </q-btn>
    </div>
     <div class="q-pa-md" style="max-width: 100%" v-if="this.clientsManager">
            <q-tabs
              v-model="tab"
                active-color="white"
                indicator-color="primary"
                align="justify"
                active-bg-color="primary"
                narrow-indicator
                style="border-radius: 2em; border-style: solid;border-color: #EE764E;"
                class="text-grey q-mb-lg">
              <!--q-tab name="pendentes" label="Pendentes"/-->
              <q-tab style="border-radius: 2em; border-style: solid; border-color: white;" name="associados" label="Associados"/>
              <q-tab style="border-radius: 2em; border-style: solid; border-color: white;" name="enviados" label="Enviados" />
            </q-tabs>
            <div class="q-gutter-y-sm">
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="slide-right"
                transition-next="slide-left"
                class="text-dark text-left"
                style="border-radius: 5%">
                <q-tab-panel name="pendentes">
                  <div class="text-h6">Pendentes</div>
                  <utentes-view-list :utentes="utentesPendente"/>
                </q-tab-panel>
                <q-tab-panel name="associados">
                  <utentes-view-list
                        v-if="this.mobilizer"
                        :mobilizer="mobilizer"
                        :utentes="utentesAssociados"
                        v-model:indexEdit="indexEdit"
                        v-model:utenteEdit="utente"
                        v-model:showUtenteULinkScreenProp="showUtenteULinkScreen"
                        v-model:showUtenteRegistrationScreen="showUtenteRegistrationScreen" />
                    <q-page-sticky position="bottom-left" :offset="[18, 18]">
                      <q-btn flat round color="primary" icon="west" @click="this.optionButtons = true, this.clientsManager = false, this.docsDisplay = false" />
                    </q-page-sticky>
                    <q-page-sticky position="bottom-right" :offset="[18, 18]">
                      <q-btn size="xl" fab icon="add" @click="showUtenteRegistrationScreen = true, this.indexEdit = 1" color="primary" />
                    </q-page-sticky>
                </q-tab-panel>
                <q-tab-panel name="enviados">
                <utentes-view-list :utentes="utentesEnviados"/>
                </q-tab-panel>
              </q-tab-panels>
            </div>
     </div>
    <div class="q-pa-md" style="max-width: 100%" v-if="this.docsDisplay">
      <q-separator />
        <view-docs/>
        <q-page-sticky position="bottom-left" :offset="[18, 18]">
          <q-btn flat round color="primary" icon="west" @click="this.optionButtons = true, this.clientsManager = false, this.docsDisplay = false" />
        </q-page-sticky>
    </div>
   </div>
  </q-layout>
</template>
<script>
import { ref } from 'vue'
import { useQuasar, QSpinnerIos } from 'quasar'
import Utente from 'src/store/models/utente/Utente'
import CommunityMobilizer from 'src/store/models/mobilizer/CommunityMobilizer'
import Clinic from 'src/store/models/clinic/Clinic'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
export default {
  setup () {
    const $q = useQuasar()
    return {
       tab: ref('associados'),
       leftDrawerOpen: ref(false),
       showUtenteRegistrationScreen: ref(false),
       showUtenteULinkScreen: ref(false),
       clientList: ref(false),
       optionButtons: ref(true),
       clientsManager: ref(false),
       docsDisplay: ref(false),
       indexEdit: 1,
       $q,
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
        }
      }
  },
  computed: {
     mobilizer: {
      get () {
        return CommunityMobilizer.query().with('utentes').find(this.$route.params.id)
      },
      set (mobilizer) {
        CommunityMobilizer.update(mobilizer)
      }
    },
    getAllNewClinics () {
      return Clinic.query().get()
    },
    utentesPendente () {
      return Utente.query()
                   .with('clinic.province')
                   .with('clinic.district.province')
                   .with('communityMobilizer')
                   .with('appointments.clinic.province')
                   .with('appointments.clinic.district.province')
                   .with('addresses')
                   .where('status', 'PENDENTE')
                   .orderBy('firstNames')
                   .get()
    },
     utentesAssociados () {
      return Utente.query()
                   .with('clinic.province')
                   .with('clinic.district.province')
                   .with('communityMobilizer')
                   .with('appointments.clinic.province')
                   .with('appointments.clinic.district.province')
                   .with('addresses')
                   .where('status', 'ASSOCIADO')
                   .orderBy('firstNames')
                   .get()
    },
     utentesEnviados () {
      return Utente.query()
                   .with('clinic.province')
                   .with('clinic.district.province')
                   .with('communityMobilizer')
                   .with('appointments.clinic.province')
                   .with('appointments.clinic.district.province')
                   .with('addresses')
                   .where('status', 'ENVIADO')
                   .orderBy('firstNames')
                   .get()
    }
  },
  methods: {
     async getAllUtente (offset) {
      await Utente.api().get('/utente/communityMobilizer/' + this.$route.params.id).then(resp => {
             offset = offset + 100
             console.log(resp.response.data)
              this.$q.loading.hide()
            // if (resp.response.data.length > 0) {
            //   setTimeout(this.getAllUtente(offset), 2)
            // }
        }).catch(error => {
           this.$q.loading.hide()
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
    async getAllProvinces (offset) {
        await Province.api().get('/province?offset=' + offset + '&max=100').then(resp => {
            offset = offset + 100
            // if (resp.response.data.length > 0) {
            //   setTimeout(this.getAllClinics(offset), 2)
            // }
            }).catch(error => {
                console.log(error)
            })
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
    },
     async getMobilizer () {
       await CommunityMobilizer.api().get('/communityMobilizer/' + localStorage.getItem('id_mobilizer')).then(resp => {
        }).catch(error => {
            console.log(error)
        })
     }
  },
  created () {
    this.$q.loading.show({
          spinner: QSpinnerIos,
          message: 'Por favor, aguarde...'
     })
    const offset = 0
    this.getMobilizer()
    this.getAllProvinces(offset)
    this.getAllDistricts(offset)
  },
  mounted () {
    const offset = 0
     this.$q.loading.show({
          spinner: QSpinnerIos,
          message: 'Por favor, aguarde...'
     })
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
