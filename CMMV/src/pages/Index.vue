<template>
    <q-page>
        <div class=" absolute full-width full-height column" >
            <main-screen v-if="showMainScreen" @nextScreen="showMainScreen = false, showSecondScreen = true"/>
            <second-screen
                v-if="showSecondScreen"
                @previousScreen="showSecondScreen = !showSecondScreen, showMainScreen = true"
                @nextScreen="showThirdScreen = true, showSecondScreen = false"/>
            <third-screen
                v-if="showThirdScreen"
                @previousScreen="showThirdScreen = !showThirdScreen, showSecondScreen = true"
                @nextScreen="showfourthScreen = true, showThirdScreen = false"/>
            <fourth-screen
                v-if="showfourthScreen"
                @previousScreen="showfourthScreen = !showfourthScreen, showThirdScreen = true"
                @nextScreen="showfifthScreen = true, showfourthScreen = false"/>
            <fifth-screen
                v-if="showfifthScreen"
                @previousScreen="showfifthScreen = !showfifthScreen, showfourthScreen = true"
                @nextScreen="showfifthScreen = false, showSixthScreen = true"/>
            <Sixth-screen
                v-if="showSixthScreen"
                @previousScreen="showSixthScreen = !showSixthScreen, showfifthScreen = true"
                @nextScreen="showSixthScreen = false, showSeventhScreen = true"/>
            <Seventh-screen
                v-if="showSeventhScreen"
                @previousScreen="showSeventhScreen = !showSeventhScreen, showSixthScreen = true"
                @nextScreen="showSeventhScreen = false"/>
        </div>
    </q-page>
</template>
<script>
export default {
    data () {
        return {
            showMainScreen: true,
            showSecondScreen: false,
            showThirdScreen: false,
            showfourthScreen: false,
            showfifthScreen: false,
            showSixthScreen: false,
            showSeventhScreen: false
        }
    },
    components: {
        'main-screen': require('components/MainScreen/MainScreen.vue').default,
        'second-screen': require('components/MainScreen/SecondMainScreen.vue').default,
        'third-screen': require('components/MainScreen/ThirdMainScreen.vue').default,
        'fourth-screen': require('components/MainScreen/FourthMainScreen.vue').default,
        'fifth-screen': require('components/MainScreen/FifthMainScreen.vue').default,
        'Sixth-screen': require('components/MainScreen/SixthMainScreen.vue').default,
        'Seventh-screen': require('components/MainScreen/SeventhMainScreen.vue').default
    },
    methods: {}
}
</script>
<style lang="scss">
</style>
