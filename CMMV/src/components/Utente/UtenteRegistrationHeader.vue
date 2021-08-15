<template>
  <div class="row items-center q-mb-md bg-deep-orange-3">
        <div class="col">
            <q-btn
                v-if="showPreviousButton"
                flat
                round
                color="white"
                icon="chevron_left"
                @click="$emit('previousScreen')"/>
        </div>
        <div class="col-8 text-center q-mt-md"><p class="col text-white">Registro do Beneficiario</p></div>
        <div class="col"><q-space /></div>
    </div>
</template>

<script>
export default {
    props: ['showPreviousButton']
}
</script>

<style>

</style>
