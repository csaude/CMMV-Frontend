<template>
  <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top">

        <div key="app-to-accept">

            <UserMessage />

            <div class="row q-mx-xl q-mt-md text-bold">
                Marcação de Consultas (2)
            </div>

            <q-list
                bordered
                separator
                class="rounded-borders q-mx-xl q-mt-md" >
                <PendingApp />
            </q-list>

            <div class="row q-mx-xl q-mt-lg text-bold">
                Consultas Marcadas (3)
            </div>

            <q-list
                bordered
                separator
                class="rounded-borders q-mx-xl q-mt-md" >
                <AcceptedApp />
            </q-list>
        </div>
    </transition-group>
</template>

<script>
export default {
    components: {
        PendingApp: require('components/Clinic/PendingAppointment.vue').default,
        UserMessage: require('components/Clinic/UserMessage.vue').default,
        AcceptedApp: require('components/Clinic/AcceptedAppointment.vue').default
    }
}
</script>

<style>

</style>
