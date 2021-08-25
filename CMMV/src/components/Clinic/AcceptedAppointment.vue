<template>
  <q-item clickable v-ripple>
        <q-item-section avatar top>
            <q-icon name="date_range" size="lg" color="grey-8"/>
        </q-item-section>

        <q-item-section>
            <q-item-label>30 Aug (9:00)</q-item-label>
            <q-item-label caption>Consulta Marcada [Codigo: MGIF21-008]</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-btn  color="red" flat  icon="delete" />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    props: ['appointment']
}
</script>

<style>

</style>
