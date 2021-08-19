<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
    <div key="main" class=" absolute full-width full-height column">
        <div class="row">
            <q-img
                src="~src/assets/Main_Screen.png"
                fit="cover"
                />
        </div>
        <div class=" absolute-bottom text-center q-mb-xl">
            <q-btn
                size="xl"
                unelevated round
                @click="$emit('nextScreen')"
                color="primary"
                icon="chevron_right" />
        </div>
    </div>
</transition-group>
</template>
<script>
export default {
}
</script>
<style>
</style>
