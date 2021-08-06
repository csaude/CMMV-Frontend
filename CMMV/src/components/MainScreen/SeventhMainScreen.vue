<template>
  <transition-group
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
  <div key="seventhScreen">
    <img-component
        imgUrl="~src/assets/splash_img.png"
        />
    <div class="row q-pa-md">
        <q-btn flat round color="deep-orange" icon="west" @click="$emit('previousScreen')"/>
    </div>
    <page-content
        title="Faça uma escolha consciente"
        content="A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado
        na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais"
        />
    <div class="absolute-bottom q-px-lg q-mb-lg">
        <div class="text-center q-mb-md">
            <q-btn class="full-width q-py-xs" unelevated rounded color="deep-orange" label="Registar" @click="$emit('nextScreen')" />
        </div>
        <div class="text-center">
            <q-btn class="full-width q-py-xs" unelevated rounded color="deep-orange" label="Entrar" />
        </div>
    </div>
</div>
  </transition-group>
</template>

<script>
export default {
    components: {
        'img-component': require('components/MainScreen/MainScreenImg.vue').default,
        'page-content': require('components/MainScreen/Content.vue').default
    }
}
</script>

<style>

</style>
