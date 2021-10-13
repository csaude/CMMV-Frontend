<template>
<div class="row items-start">
    <q-card style="width: 100%; max-width:100vw; border-radius: 3%">
          <q-card-section>
            <q-list v-if="utentes.length > 0" separator>
             <q-scroll-area :visible="false" style="height: 300px; width: 100%; max-width:90vw;">
             <q-slide-item v-for="utente in utentes" :key="utente.id"  left-color="orange" right-color="red" @right="opt => onRight(opt,utente)">
                <template v-slot:right v-if="utente.status === 'ENVIADO'">
                  <q-icon name="highlight_off" color="white" />
                </template>
                <q-item>
                    <q-item-section avatar>
                      <q-avatar color="grey-6" text-color="white">
                        {{ utente.firstNames.charAt(0).toUpperCase() }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-bold">{{ utente.firstNames }} {{ utente.lastNames }}</q-item-label>
                      <q-item-label caption lines="1">{{ utente.cellNumber }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="utente.status === 'ASSOCIADO'">
                     <div class="text-orange">
                      <q-btn dense flat style="color: #FF0080" color="primary" label="Ligar a US" @click="activeUSForm(true, utente)" no-caps/>
                      <q-icon name="arrow_forward_ios" />
                    </div>
                  </q-item-section>
                    <q-item-section side v-else-if="utente.status === 'ENVIADO' && utente.appointments.length > 0">
                      <q-item-label class="text-bold">
                        Consulta
                          <span class="span-pendente" v-if="utente.appointments[0].status ==='PENDENTE'"> {{utente.appointments[0].status}} </span>
                          <span class="text-green-9" v-else> {{utente.appointments[0].status}} </span>
                      </q-item-label>
                     <div class="">
                      <q-icon name="event"/>  {{this.displayDate(utente.appointments[0].appointmentDate)}}
                      <q-icon name="schedule"/>  {{utente.appointments[0].time}}
                     </div>
                      <div class="">
                      <q-icon name="place"/>  {{utente.appointments[0].clinic.name}}
                    </div>
                  </q-item-section>
                </q-item>
              </q-slide-item>
             </q-scroll-area>
            </q-list>
            <q-list v-else separator>
                <q-item v-ripple>
                  <q-item-section avatar>
                    <q-icon color="red" name="mood_bad" />
                  </q-item-section>
                <q-item-section class="text-left">Sem resultados na lista</q-item-section>
              </q-item>
          </q-list>
          </q-card-section>
    </q-card>
    <utente-us-link v-model:showUtenteULinkScreen="show_dialog" v-model:utente="utente" :activeUSForm="activeUSForm"/>
</div>
</template>

<script>
import { ref } from 'vue'
import { date, useQuasar } from 'quasar'
// import Appointment from 'src/store/models/appointment/Appointment'
import Utente from 'src/store/models/utente/Utente'
import CommunityMobilizer from 'src/store/models/mobilizer/CommunityMobilizer'
export default {
    props: ['utentes', 'name', 'value', 'showUtenteULinkScreenProp', 'showUtenteRegistrationScreen'],
    emits: ['update:showUtenteULinkScreenProp', 'update:utentes', 'update:showUtenteRegistrationScreen'],
    setup () {
       const $q = useQuasar()
       let timer

      return {
        show_dialog: ref(false),
        utente: {},
        $q,
        timer,
        confirm: ref(false)
      }
    },
    methods: {
      finalize (reset) {
        this.timer = setTimeout(() => {
          reset()
        }, 1000)
      },
      async onRight ({ reset }, utente) {
         utente.appointments = []
         utente.status = 'ASSOCIADO'
         utente.communityMobilizer = CommunityMobilizer.find(localStorage.getItem('id_mobilizer'))
         utente.communityMobilizer_id = Number(localStorage.getItem('id_mobilizer'))
         await Utente.api().patch('/utente/' + utente.id, utente).then(resp => {
         this.$emit('update:utente', utente)
              this.$q.notify({
                  message: 'O utente ' + utente.firstNames + ' ' + utente.lastNames + ' foi removido da lista.',
                  color: 'teal'
              })
         }).catch(error => {
           this.$q.notify({
                  message: 'Aconteceu um erro inesperado.',
                  color: 'red'
          })
          this.finalize(reset)
          console.log('Erro no code ' + error)
        })
      },
      displayDate (newDate) {
        return date.formatDate(newDate, 'YYYY-MM-DD')
      },
      activeUSForm (open, utente) {
        Utente.update(utente)
        this.show_dialog = open
        this.utente = utente
        this.$emit('update:showUtenteULinkScreenProp', open)
        this.$emit('update:utente', utente)
      }
    },
     components: {
      'utente-us-link': require('components/Utente/SearchSanitaryUnit.vue').default
  }
}
</script>
<style scoped>
.span-pendente {
font-size: 15x;
font-weight: bold;
color: rgb(252, 4, 4);
animation: blink 1s linear infinite;
}
@keyframes blink {
0%{opacity: 0.1;}
50%{opacity: .5;}
100%{opacity: 1;}
}
</style>
