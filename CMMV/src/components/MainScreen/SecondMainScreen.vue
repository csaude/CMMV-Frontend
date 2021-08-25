<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="secondScreen">
        <img
            src="~src/assets/02Definicao.png"
            style="width: 100%; height: 300px"
            >
        <page-content
            title="O que é a circuncisão"
            content="Circuncisão masculina médica é uma pequena cirurgia que consiste na retirada da pele que cobre a cabeça do pénis (prepúcio)."
            />
       <navigation-buttons
            @nextScreen="$emit('nextScreen')"
            @previousScreen="$emit('previousScreen')" />
    </div>
    </transition-group>
</template>

<script>
export default {
    components: {
        'navigation-buttons': require('components/MainScreen/NavigationButtons.vue').default,
        'page-content': require('components/MainScreen/Content.vue').default
    }
}
</script>

<style>

</style>
