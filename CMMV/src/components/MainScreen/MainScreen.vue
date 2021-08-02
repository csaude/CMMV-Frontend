<template>
    <div class=" absolute full-width full-height column">
        <div class="row">
            <img
                src="~src/assets/Main_Screen.png"
                style="width: 100%; height: 100%"
                >
        </div>
        <div class=" absolute-bottom text-center q-mb-xl">
            <q-btn
            size="lg"
            unelevated round
            @click="$emit('nextScreen')"
            color="deep-orange"
            icon="chevron_right" />
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style>

</style>
