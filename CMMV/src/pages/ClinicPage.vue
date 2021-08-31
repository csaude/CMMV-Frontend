<template>
    <q-page>
        <div >
            <q-header class="q-py-sm">
                <q-toolbar>
                    <q-tabs v-model="tab" class="absolute-center">
                        <q-tab name="dashboard" icon="pie_chart" label="Dashboard" />
                        <q-tab name="consulta" icon="date_range" label="Consulta" />
                        <q-tab name="reports" icon="show_chart" label="Relatórios" />
                        <q-tab name="mobilizer" icon="people_outline" label="Mobilizadores" />
                    </q-tabs>
                    <div class="absolute-right items-center q-mt-sm">
                    <span>Admin,</span>
                        <q-btn to="/auth" icon-right="account_circle" label="Sair" flat />
                        <q-btn flat icon="expand_more">
                            <q-menu
                            transition-show="scale"
                            transition-hide="scale"
                            >
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
                            </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
                </q-toolbar>


            </q-header>
        </div>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dashboard">
            <AppointmentSchedule :clinic="currClinic"/>
          </q-tab-panel>

          <q-tab-panel name="consulta">
            <AppointmentList :clinic="currClinic"/>
          </q-tab-panel>

          <q-tab-panel name="reports"></q-tab-panel>

          <q-tab-panel name="mobilizer">
            <MobilizerManagement :clinic="currClinic"/>
          </q-tab-panel>


        </q-tab-panels>
        <Footer></Footer>
    </q-page>
</template>

<script>
import { ref } from 'vue'
import Clinic from '../store/models/clinic/Clinic'
export default {
    data () {
        return {
            tab: ref('mobilizer')
        }
    },
    components: {
        Footer: require('components/Clinic/Footer.vue').default,
        AppointmentSchedule: require('components/Clinic/AppointmentSchedule.vue').default,
        MobilizerManagement: require('components/Clinic/MobilizerManagement.vue').default,
        AppointmentList: require('components/Clinic/ClinicAppointments.vue').default
    },
    methods: {
        getCurrClinic () {
            Clinic.api().get('/clinic/35').then(resp => {
                console.log(resp.response.data)
            })
        }
    },
    computed: {
        currClinic () {
            return Clinic.find(35)
        }
    },
    mounted () {
        this.getCurrClinic()
    }
}
</script>

<style>

</style>
