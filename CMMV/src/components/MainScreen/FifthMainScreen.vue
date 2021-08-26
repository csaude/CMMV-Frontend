<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="fifthScreen">
    <img
            src="~src/assets/05OndeFazer.png"
            style="width: 100%; height: 300px"
            >
        <page-content
            title="Onde fazer a circuncisão"
            content="A circuncisão é feita na unidade sanitária que oferece os serviços de circuncisão;"
            content1="É seguro fazer a circuncisão na unidade sanitária porque o procedimento é feito por profissionais de saúde qualificados e usa-se anestesia para evitar a dor e leva medicamento para tomar quando anestesia passar e não sentir a dor;"
            content2="A circuncisão é feita de forma rápida e segura dura 30 minutos, depois de terminar  apessoa pode ir para casa, a pé ou de chapa;"
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
