<template>
<transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
   <q-card key="us" class="my-card full-width">
        <q-card-section class="text-center q-py-lg ">
            <q-icon name="home" color="primary" size="lg"/>
            <div class="text-h5 q-py-xs text-grey-7">{{clinic.name}}</div>
        </q-card-section>
    </q-card>
</transition-group>
</template>

<script>
    export default {
        props: ['clinic'],
        data () {
            return {
                confirmed: false
            }
        }
    }
</script>

<style>

</style>
