<template>
    <q-item clickable v-ripple>
        <q-item-section avatar top>
            <q-item-label>Aug 30</q-item-label>
            <q-item-label caption>2 days ago</q-item-label>
        </q-item-section>

        <q-item-section>
            <q-item-label>Nova marcação [30 Aug 2021 - 9:00]</q-item-label>
            <q-item-label caption>Utente: Marcos Ferão Codigo: MGIF21-008</q-item-label>
        </q-item-section>

        <q-item-section side>
            <div class="row">
                <q-btn outline color="primary" label="Confirmar" />
                <q-btn
                    class="q-ml-md"
                    outline
                    color="primary"
                    label="Re-marcar"
                    @click="showReshedule = true" />
            </div>
        </q-item-section>
        <q-dialog v-model="showReshedule">
          <resheduleApp :appointment="appointment" @close="showReshedule = false" />
        </q-dialog>
    </q-item>
</template>

<script>
export default {
    props: ['appointment'],
    data () {
        return {
            showReshedule: false
        }
    },
    components: {
        resheduleApp: require('components/Clinic/ResheduleAppoinment.vue').default
    }
}
</script>

<style>

</style>
