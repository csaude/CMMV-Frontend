<template>
    <q-layout view="hHh lpR fFf">
     <div class="q-pa-sm">
            <q-header class="q-py-sm">
                <q-toolbar>
                 <q-toolbar-title>
                    <div class="text-weight- q-mt-md qmr-sr text-weight-bold"> Unidade Sanitária CMMV </div>
                    <div class="text-weight-thin " v-if=" this.displayClinic() !== null"> {{ this.displayClinic().name }}</div>
                </q-toolbar-title>
                    <div class="absolute-right items-center q-mt-sm">
                        <q-avatar size="lg">
                        <img src="~assets/userLogedIn.jpg" />
                        </q-avatar>
                        <q-btn flat icon="expand_more">
                            <q-menu transition-show="scale" transition-hide="scale">
                            <q-list style="min-width: 120px">
                                <q-item clickable>
                                    <q-item-section @click="showChangePasswordScreen = true" clickable>Alterar Senha</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section clickable @click="verificationDialog">Sicronizar</q-item-section>
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
            <UserMessage :userName="username" />
            </div>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="dashboard">
                <AppointmentSchedule />
              </q-tab-panel>
              <q-tab-panel name="consulta">
                <AppointmentList />
              </q-tab-panel>
              <!--    <q-tab-panel name="clinics" >
                <AddClinic  />
              </q-tab-panel>  -->
              <q-tab-panel name="configuracoes" >
                <Settings  />
              </q-tab-panel>
             <!--  <q-tab-panel name="mobilizer" >
                <MobilizerManagement  />
              </q-tab-panel> -->
          </q-tab-panels>
            <q-footer>
                <q-toolbar>
                    <q-tabs v-model="tab" class="absolute-center">
                        <q-tab name="dashboard" icon="pie_chart" label="Dashboard" />
                        <q-tab name="consulta" icon="date_range" label="Consulta" />
                        <!--q-tab name="reports" icon="show_chart" label="Relatórios" /-->
                        <!--q-tab name="mobilizer" icon="people_outline" label="Mobilizadores" /-->
                        <!-- <q-tab name="clinics" icon="local_hospital" label="Adicionar Clinica" /> -->
                        <q-tab name="configuracoes" icon="settings" label="Definições" />
                    </q-tabs>
                </q-toolbar>
            </q-footer>
    </div>
     <q-dialog persistent v-model="showChangePasswordScreen">
          <changePassword
            @close="showChangePasswordScreen = false" />
      </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Clinic from 'src/store/models/clinic/Clinic'
import SyncronizingService from '../services/SyncronizingService'
export default {
    data () {
        return {
            tab: ref('dashboard'),
            backToDashBoard: ref(true),
            showChangePasswordScreen: ref(false),
            username: {}
        }
    },
    components: {
        // Footer: require('components/Clinic/Footer.vue').default,
        AppointmentSchedule: require('components/Clinic/AppointmentSchedule.vue').default,
        AppointmentList: require('components/Clinic/ClinicAppointments.vue').default,
   //     AddClinic: require('components/Clinic/AddClinic.vue').default,
        Settings: require('components/Clinic/Settings.vue').default,
      //      MobilizerManagement: require('components/Clinic/MobilizerManagement.vue').default,
        UserMessage: require('components/Clinic/UserMessage.vue').default,
          changePassword: require('components/Shared/ChangePassword.vue').default
    },
    methods: {
        displayClinic () {
            return Clinic.query().find(localStorage.getItem('id_clinicUser'))
        },
        getUserName () {
            this.username = localStorage.getItem('username')
        },
         verificationDialog () {
            this.$q.dialog({
                title: 'Confirmação',
                message: 'Tem Certeza que deseja efectuar a sincronização , Os dados Enviados ja não poderão ser editados?',
                ok: {
                label: 'OK',
                push: true,
                color: 'blue'
                },
                cancel: {
                label: 'Cancelar',
                push: true,
                color: 'negative'
                },
                persistent: true
            }).onOk(() => {
               // this.sendUtente()
                // this.$emit('update:showUtenteRegistrationScreenProp', false)
               SyncronizingService.sendAppointmentsClinicData()
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        }
    },
    computed: {
    },
    mounted () {
        this.getUserName()
    }
}
</script>

<style>

</style>
