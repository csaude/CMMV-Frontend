<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
   <q-card key="consulta" class="my-card full-width q-pa-sm">
        <div class="row text-h6">Consulta marcada</div>
        <div class="row q-mt-lg">
            <div class="col-8 q-pa-sm">
                <div class="row text-subtitle1 text-weight-bold">Detalhes da Marcação</div>
                <div v-if="appointment.confirmedByUS" class="row text-grey-7">Confirmação aceite pela US</div>
                <div v-else  class="row text-grey-7">Confirmação pendente na US</div>

                <div class="col-8 q-pa-sm">
                    <div class="row items-center q-mb-md">
                        <q-icon name="person_outline" size="sm" color="deep-orange" />
                        <div class="q-px-sm text-grey-7">Ordem:</div>
                        <div class="text-grey-7">{{appointment.orderNumber}}</div>

                        <q-space />
                        <q-icon name="date_range" size="sm" color="deep-orange" />
                            <div class="q-px-sm text-grey-7">{{appointment.appointmentDate}}</div>
                    </div>
                    <div class="row items-center ">
                        <q-icon name="schedule" size="sm" color="deep-orange" />
                        <div class="q-px-sm text-grey-7">{{appointment.time}}</div>

                        <q-space />
                        <q-icon name="fmd_good" size="sm" color="deep-orange" />
                            <div class="q-px-sm text-grey-7">{{appointment.clinic.name}}</div>
                    </div>
                </div>
            </div>
            <div class="col-4 q-pa-sm">
                <q-btn v-if="appointment.confirmedByUS" flat round color="deep-orange" class="no-pointer-events float-right" disabled size="40px" icon="check" />
                <q-btn v-else rounded color="deep-orange" class="float-right" size="md" label="Re-marcar"  />

            </div>
        </div>
    </q-card>
    </transition-group>
</template>

<script>
    export default {
        props: ['appointment'],
        data () {
            return {
                confirmed: false
            }
        }
    }
</script>

<style>

</style>
