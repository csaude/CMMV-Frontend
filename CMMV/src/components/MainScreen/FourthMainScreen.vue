<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="fourthScreen">
    <img-component
        imgUrl="~src/assets/splash_img.png"
        />
        <page-content
            title="Vantagens da circuncisão a partir dos 15 anos de idade"
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
