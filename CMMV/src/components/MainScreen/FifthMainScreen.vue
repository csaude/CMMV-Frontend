<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="fifthScreen">
    <img-component
        imgUrl="~src/assets/splash_img.png"
        />
        <page-content
            title="Onde fazer a circuncisão"
            content="A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado
            na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais"
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
        'img-component': require('components/MainScreen/MainScreenImg.vue').default,
        'page-content': require('components/MainScreen/Content.vue').default
    }
}
</script>

<style>

</style>
