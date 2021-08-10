<template>
    <q-page>
        <div class="  full-width full-height column" >
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
                @nextScreen="showSeventhScreen = false,showEightScreen=true"
                @login="showLoginScreen = true, showSeventhScreen = false"/>
            <utente-registration
                v-if="showEightScreen"
                @previousScreen="showEightScreen = !showEightScreen, showSeventhScreen = true"
                @nextScreen="showEightScreen = false, showAddressScreen = true"/>
            <Address
                v-if="showAddressScreen"
                @saveUtente="saveUtente()"
                @previousScreen="showAddressScreen = !showAddressScreen, showEightScreen = true" />
            <SuccessRegistration
                v-if="showSuccessRegistration"
                @procced="goToHome()"/>
            <Login
                v-if="showLoginScreen"
                @previousScreen="showLoginScreen = false, showSeventhScreen = true" />
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
            showSeventhScreen: false,
            showEightScreen: false,
            showAddressScreen: false,
            showSuccessRegistration: false,
            showLoginScreen: false,
            componentParam: ''
        }
    },
    mounted () {
        this.componentParam = this.$route.params.componentParam
        if (this.componentParam === 'showEightScreen') {
            this.showMainScreen = false
            this.showEightScreen = true
        }
    },
    components: {
        'main-screen': require('components/MainScreen/MainScreen.vue').default,
        'second-screen': require('components/MainScreen/SecondMainScreen.vue').default,
        'third-screen': require('components/MainScreen/ThirdMainScreen.vue').default,
        'fourth-screen': require('components/MainScreen/FourthMainScreen.vue').default,
        'fifth-screen': require('components/MainScreen/FifthMainScreen.vue').default,
        'Sixth-screen': require('components/MainScreen/SixthMainScreen.vue').default,
        'Seventh-screen': require('components/MainScreen/SeventhMainScreen.vue').default,
        'utente-registration': require('components/Utente/UtenteRegistration.vue').default,
        Address: require('components/Utente/Address.vue').default,
        SuccessRegistration: require('components/Utente/RegistredSucess.vue').default,
        Login: require('components/Shared/Login.vue').default
    },
    methods: {
        saveUtente () {
            this.showAddressScreen = false
            this.showSuccessRegistration = true
        },
        goToHome () {
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="scss">
</style>
