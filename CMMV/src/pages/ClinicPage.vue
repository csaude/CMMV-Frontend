<template>
    <q-layout view="hHh lpR fFf">
     <div class="q-pa-sm">
            <q-header class="q-py-sm">
                <q-toolbar>
                 <q-toolbar-title>
                    <div class="text-weight- q-mt-md qmr-sr text-weight-bold"> Ponto de Serviço CMMV </div>
                    <div class="text-weight-thin " v-if=" this.displayClinic() !== null"> {{ this.displayClinic().name }}</div>
                </q-toolbar-title>
                    <div class="absolute-right items-center q-mt-sm">
                        <q-avatar size="lg">
                        <img src="~assets/userLogedIn.jpg" />
                        </q-avatar>
                        <q-btn flat icon="expand_more">
                            <q-menu transition-show="scale" transition-hide="scale">
                            <q-list style="min-width: 100px">
                                <q-item clickable>
                                    <q-item-section>Perfil</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Mobilizadores</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Utilizadores</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>Conteúdos</q-item-section>
                                </q-item>
                                <q-separator/>
                                <q-item to="/" clickable>
                                    <q-item-section>Sair</q-item-section>
                                </q-item>
                            </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
                </q-toolbar>
            </q-header>
            <div class="q-gutter-y-lg">
            <UserMessage />
            </div>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="dashboard">
                <AppointmentSchedule />
              </q-tab-panel>
              <q-tab-panel name="consulta">
                <AppointmentList />
              </q-tab-panel>
          </q-tab-panels>
            <q-footer>
                <q-toolbar>
                    <q-tabs v-model="tab" class="absolute-center">
                        <q-tab name="dashboard" icon="pie_chart" label="Dashboard" />
                        <q-tab name="consulta" icon="date_range" label="Consulta" />
                        <q-tab name="reports" icon="show_chart" label="Relatórios" />
                        <q-tab name="mobilizer" icon="people_outline" label="Mobilizadores" />
                    </q-tabs>
                </q-toolbar>
            </q-footer>
    </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Clinic from 'src/store/models/clinic/Clinic'

export default {
    data () {
        return {
            tab: ref('dashboard')
        }
    },
    components: {
        // Footer: require('components/Clinic/Footer.vue').default,
        AppointmentSchedule: require('components/Clinic/AppointmentSchedule.vue').default,
        AppointmentList: require('components/Clinic/ClinicAppointments.vue').default,
        UserMessage: require('components/Clinic/UserMessage.vue').default
    },
    methods: {
        displayClinic () {
            return Clinic.query().find(localStorage.getItem('id_clinicUser'))
        }
    }
}
</script>

<style>

</style>
