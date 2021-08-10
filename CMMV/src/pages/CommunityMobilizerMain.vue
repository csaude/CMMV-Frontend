<template>
  <q-layout view="hHh lpR fFf">
   <div class="q-pa-md">
       <div class="column bg-red-4" style="height: 400px">
      <q-toolbar>
        <div class="col-auto">
            <q-btn color="black-7" round flat icon="more_vert" @click="toggleLeftDrawer">
            </q-btn>
          </div>
          </q-toolbar>
    </div>
 <div class="column bg-grey-4" style="height: 400px">
 <div class="row-1 q-pa-md q-gutter-sm fixed-center" >
 <img src="~src/assets/mobilizador.png">
  <div class="text-h4 text-weight-light center">{{communityMobilizer.firstnames + ' ' + communityMobilizer.lastname}}
  </div>
 </div>
  <div class="q-pa-md q-gutter-sm" v-if="materialTab">
    <q-btn color="white" text-color="black"  label="Material Educativo" class="absolute-center" style="width: 70%"/>
<br>
<br>
<br>
    <div class="q-mt-lg rounded-borders bordered">
            <informative-docs :docsOrImages="docsOrImages" />
        </div>
  </div>
   <div class="q-pa-md q-gutter-sm" v-if="utentesTab" style="width: 100%">
   <q-btn-group style="width: 100%">
      <q-btn color="primary" glossy label="Pendentes" @click="handler" style="width: 100%"/>
      <q-btn color="primary" glossy label="Associados" @click="handler1"  style="width: 100%"/>
      <q-btn color="primary" glossy label="Enviados"  @click="handler2"  style="width: 100%"/>
    </q-btn-group>
     <div class="q-pa-md" style="width: 100%">
      <utentes-list :utentes="pendings" v-if="pending"/>
    <utentes-list :utentes="associateds" v-if="associated" :name="call"/>
  <utentes-list :utentes="sendeds" v-if="sended"/>
  <div class="float-right">
  <br>
  <q-btn class="q-py-xs float-right" align="right"   padding="xs lg" unelevated rounded color="deep-orange" v-show="pending" label="Associar" />
  </div>
    </div>
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

export default {
  data () {
    const leftDrawerOpen = ref(false)
    return {
         pending: false,
          associated: false,
          sended: false,
          materialTab: false,
          utentesTab: false,
          pendings: [],
          associateds: [],
          sendeds: [],
      leftDrawerOpen,
       communityMobilizer: {
                    id: 7,
                    firstnames: 'Carlos',
                    lastname: 'Alberto',
                    cellNumber: '856321456',
                    cellNumber2: '846321952'
                },
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
       opcoes: [
        'Material Educativo', 'Utentes', 'Perfil', 'Alterar Senha'
      ],
       docsOrImages: [
        {
          id: 1,
          name: 'Folheto de Convite'
        },
        {
          id: 2,
          name: 'Folheto Para Criancas'
        },
        {
          id: 3,
          name: 'Seriado Activista'
        }
        ],
      utentes: [
        {
          id: 1,
          firstname: 'Mario Kanda',
          selected: false,
          status: 'pending',
          cellphone: '8446425456'
        },
        {
          id: 2,
          firstname: 'Muhammad Chona',
          selected: false,
           status: 'pending',
           cellphone: '8446425456'
        },
        {
          id: 3,
          firstname: 'Chona',
          selected: false,
           status: 'pending',
           cellphone: '8446425456'
        },
        {
          id: 4,
          firstname: 'Eurico',
          selected: false,
          status: 'associated',
          cellphone: '8446425456'
        },
        {
          id: 5,
          firstname: 'Roxanne',
          selected: false,
           status: 'associated',
           cellphone: '8446425456'
        },
        {
          id: 6,
          firstname: 'Sarah',
          selected: false,
           status: 'associated',
           cellphone: '8446425456'
        },
        {
          id: 7,
          firstname: 'Themos',
          selected: false,
          status: 'sended',
          cellphone: '8446425456',
           appointments: [
                {
                    appointmentDate: '25/06/2021',
                    time: '13:03',
                    hasHappened: false,
                    confirmedByUS: false,
                    orderNumber: 6,
                    clinic: {
                        code: 'BOANE',
                        name: 'Boane'
                    }
                }
                ]
        },
        {
          id: 8,
          firstname: 'Amrita',
          selected: false,
           status: 'sended',
           cellphone: '8446425456'
        },
        {
          id: 9,
          firstname: 'Sonia',
          selected: false,
           status: 'sended',
           cellphone: '8446425456'
        }
        ]
    }
  },
  methods: {
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
    getTab (tab) {
        if (tab === 'Material Educativo') {
            this.materialTab = true
            this.utentesTab = false
        }
         if (tab === 'Utentes') {
            this.materialTab = false
            this.utentesTab = true
        }
         this.toggleLeftDrawer()
    },
    getUtentesByStatus (utentes) {
      this.utentes.forEach(utente => {
        if (utente.status === 'pending') {
          return this.pendings.push(utente)
        } else if (utente.status === 'associated') {
          return this.associateds.push(utente)
        } else if (utente.status === 'sended') {
          return this.sendeds.push(utente)
        }
      })
    }
  },
  components: {
       'informative-docs': require('components/Home/MaterialEducativo.vue').default,
       'utentes-list': require('components/Shared/ViewUtenteList.vue').default
       },
        mounted () {
      this.getUtentesByStatus()
    }
}
</script>
