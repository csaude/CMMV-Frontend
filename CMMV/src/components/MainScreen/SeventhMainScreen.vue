<template>
  <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="seventhScreen">
    <img
            src="~src/assets/07Escolha.png"
            style="width: 100%; height: 300px"
            >
    <div class="row q-pa-md">
        <q-btn flat round color="primary" icon="west" @click="$emit('previousScreen')"/>
    </div>
    <page-content
        title="Faça uma escolha consciente"
        content="A circuncisão médica é gratuita, segura e rápida; "
        content1="Passe a palavra ao seu irmão/amigo/vizinho/parente,  com 15 à  49 anos de  idade."
        />
    <div class="absolute-bottom q-px-lg q-mb-lg">
        <div class="text-center q-mb-md">
            <q-btn class="full-width q-py-xs" unelevated rounded color="primary" label="Registar" @click="$emit('nextScreen')" />
        </div>
        <div class="text-center">
            <q-btn class="full-width q-py-xs" unelevated rounded color="primary" label="Entrar" @click="$emit('login')"/>
        </div>
    </div>
</div>
  </transition-group>
</template>

<script>
export default {
    components: {
        'page-content': require('components/MainScreen/Content.vue').default
    },
    methods: {}
}
</script>

<style>

</style>
