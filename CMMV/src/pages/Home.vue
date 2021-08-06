<template>
  <q-page class=" absolute full-width full-height column" >
    <div class="q-pa-md">
        <div class="row q-mb-xl">
            <div class="col-4 q-pa-md ">
                <img class="rounded-borders"
                    src="~src/assets/splash_img.png"
                    style="width: 120%; height: 150px"
                    >
            </div>
            <div class="col-8 q-px-xl q-mt-xl">
                <div class="text-h6 q-pb-sm text-grey-9">{{utente.firstnames}}</div>
                <div class="row items-center">
                    <q-icon name="call" size="sm" color="grey-5" />
                    <div class=" text-subtitle1 q-px-xs text-grey-7" >Nr Telemóvel:</div>
                    <div class=" text-subtitle1 " >{{utente.cellNumber}}</div>
                </div>
                <div class="row items-center">
                    <q-icon name="textsms" size="sm" color="grey-5" />
                    <div class=" text-subtitle1 q-px-xs text-grey-7" >Nr WhatsApp:</div>
                    <div class=" text-subtitle1" >{{utente.whatsappNumber}}</div>
                </div>
                <div class="row items-center q-mt-sm">
                        <q-icon name="fmd_good" size="sm" color="grey-5" />
                        <div class="q-px-sm text-grey-7">{{utente.address.city}}</div>
                </div>
            </div>
        </div>
        <div class=" q-my-md row text-h6 text-deep-orange text-weight-bold">Detalhes do Beneficiário</div>
        <div class="row">
            <div class="col q-ma-xs">
                <q-card class="my-card text-center " :class="{'bg-orange-1' : usTab}">
                    <q-card-section>
                        <q-btn flat round color="deep-orange" size="30px" icon="add" @click="changeTab('us')" />
                        <div class=" text-deep-orange">Unidade Sanitária</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col q-ma-xs">
                <q-card class="my-card text-center" :class="{'bg-orange-1' : mobilizerTab}">
                    <q-card-section>
                        <q-btn flat round color="deep-orange" size="30px" icon="add"  @click="changeTab('mobilizador')"/>
                        <div class=" text-deep-orange">Visualizar Mobilizador</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col q-ma-xs">
                <q-card class="my-card text-center" :class="{'bg-orange-1' : consultaTab}">
                    <q-card-section>
                        <q-btn flat round color="deep-orange" size="30px" icon="add"  @click="changeTab('consulta')"/>
                        <div class=" text-deep-orange">Marcação de Consulta</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col q-ma-xs">
                <q-card class="my-card text-center" :class="{'bg-orange-1' : materialTab}">
                    <q-card-section>
                        <q-btn flat round color="deep-orange" size="30px" icon="add"  @click="changeTab('informativeMaterial')"/>
                        <div class=" text-deep-orange">Material Educativo</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row q-mt-lg rounded-borders bordered">
            <noMobilizer
                v-if="mobilizerTab && utente.link.community_mobilizer === null"/>
            <mobilizer
                :mobilizer="utente.link.community_mobilizer"
                v-if="mobilizerTab && utente.link.community_mobilizer != null"/>
            <consulta
                :appointment="utente.appointments[0]"
                v-if="consultaTab" />
            <us
                :clinic="utente.link.clinic"
                v-if="usTab"/>
            <informative-docs v-if="materialTab" :docsOrImages="docsOrImages" />
        </div>
    </div>
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
  </q-page>
</template>

<script>
import { ref } from 'vue'
// import Utente from '../store/models/utente/Utente'
export default {
     data () {
        return {
        tab: ref('home'),
        noMobilizerTab: false,
        mobilizerTab: false,
        usTab: true,
        consultaTab: false,
        materialTab: false,
        utente: {
            firstnames: 'Jonas Antonio',
            lastname: 'Musculo',
            birthDate: '02/25/2001',
            cellNumber: '846253984',
            whatsappNumber: '846315932',
            preferedLanguage: 'Portugues',
            documentType: 'BI',
            documentNumber: '5236222235F',
            systemNumber: 2216,
            haspartner: true,
            address: {
                city: 'Boane',
                neighboorhood: '25 de Junho',
                residence: 'casa 25',
                latitude: '25689233',
                longitude: '896325566',
                district: {
                    id: 1
                }
            }
    }
  },
  methods: {
      changeTab (selectedTab) {
        this.mobilizerTab = false
        this.usTab = false
        this.consultaTab = false
        this.materialTab = false
        if (selectedTab === 'us') {
            this.usTab = true
        } else if (selectedTab === 'mobilizador') {
            this.mobilizerTab = true
        } else if (selectedTab === 'consulta') {
            this.consultaTab = true
        } else if (selectedTab === 'informativeMaterial') {
            this.materialTab = true
        }
      }
  },
  computed: {},
  mounted () {},
  components: {
      noMobilizer: require('components/Home/NoMobilizer.vue').default,
      mobilizer: require('components/Home/Mobilizer.vue').default,
      consulta: require('components/Home/Consulta.vue').default,
      us: require('components/Home/SanitaryUnit.vue').default,
       'informative-docs': require('components/Home/MaterialEducativo.vue').default
  }
}
</script>

<style>

</style>
