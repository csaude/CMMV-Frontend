<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top">
    <div key="main" class="row bg-light-green-2 absolute full-width full-height column">
        <div class="q-gutter-md row items-start">
            <q-img src="~src/assets/01MainScreen.jpg"
                   fit="cover">
                <div class="bg-transparent absolute-bottom-left">
                    <div>
                        <q-carousel
                            animated
                            v-model="slide"
                            infinite
                            :autoplay="autoplay"
                            transition-prev="slide-right"
                            transition-next="jump-left"
                            @mouseenter="autoplay = true"
                            @mouseleave="autoplay = true"
                            height="150px"
                            class="bg-transparent">
                            <q-carousel-slide :name="1">
                                <p :class="computedTitleClass + ' q-my-lg text-weight-bolder text-center text-dark text-wrap'"> Faz a Circuncisão </p>
                                <p :class="computedSubTitleClass + ' text-weight-bold text-center text-lime-10 text-wrap'"> Torna-te Um Novo Homem</p>
                            </q-carousel-slide>
                            <q-carousel-slide :name="2">
                                <p :class="computedTitleClass + ' q-my-lg text-weight-bolder text-center text-lime-10'"> Faz a Circuncisão </p>
                                <p :class="computedSubTitleClass + ' text-weight-bold text-center text-dark'"> Torna-te Um Novo Homem</p>
                            </q-carousel-slide>
                        </q-carousel>
                    </div>
                </div>
            </q-img>
        </div>
    </div>
    <div class="absolute-bottom flex flex-center q-my-lg">
    <q-fab
        v-model="fab"
        vertical-actions-align="center"
        color="primary"
        icon="keyboard_arrow_up"
        direction="up">
        <q-fab-action color="primary" @click="$emit('login')" icon="lock_open" label="Entrar" />
        <q-fab-action color="secondary" @click="$emit('nextScreen')" icon="chevron_right" label="Apresentação" />
      </q-fab>

        <!--q-btn
            size="xl"
            unelevated round
            @click="$emit('nextScreen')"
            color="primary"
            icon="chevron_right"/-->
    </div>
    <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
     <main-screen-instruction/>
    </transition>
</transition-group>
</template>
<script>
    import { ref } from 'vue'
        export default {
              setup () {
                return {
                    fab: ref(false),
                    slide: ref(1),
                    autoplay: ref(true)
                }
            },
            components: {
                'main-screen-instruction': require('components/UserInstructions/MainScreenInstruction.vue').default
             },
            computed: {
                computedTitleClass () {
                    return this.$q.platform.is.desktop ? 'text-h1-xl' : 'text-h5'
                },
                computedSubTitleClass () {
                    return this.$q.platform.is.desktop ? 'text-h2-xl' : 'text-h5'
                }
            },
            methods: {
            }
        }
</script>
