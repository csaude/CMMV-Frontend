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
                @nextScreen="proccedToAddress"/>
            <Address
                v-if="showAddressScreen"
                @saveUtente="saveUtente"
                :utente="userParent"
                @previousScreen="showAddressScreen = !showAddressScreen, showEightScreen = true" />
            <SuccessRegistration
                v-if="showSuccessRegistration"
                :utente="userParent"
                @procced="goHome"/>
            <Login
                v-if="showLoginScreen"
                @goHome="goHome"
                @previousScreen="showLoginScreen = false, showSeventhScreen = true" />
            <Home
                v-if="showHomeScreen"
                :utente="userParent"
                @makeAppointment="makeAppointment"
                @rescheduleAppointment="rescheduleAppointment"
                @searchClinic="searchClinic"/>
            <clinicSearch
                v-if="showClinicSearchScreen"
                @associarClinic="associarClinic"
                :utente="userParent"/>
            <appointment
                v-if="showAppointmentScreen"
                :utente="userParent"
                :appointmentToUpdate="currAppointment"
                @goHome="goHome"/>
        </div>
    </q-page>
</template>
<script>
import Address from '../store/models/address/Address'
import Appointment from '../store/models/appointment/Appointment'
import Clinic from '../store/models/clinic/Clinic'
import CommunityMobilizer from '../store/models/mobilizer/CommunityMobilizer'
import Utente from '../store/models/utente/Utente'
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
            showHomeScreen: false,
            showClinicSearchScreen: false,
            showAppointmentScreen: false,
            userParent: '',
            currAppointment: '',
            componentParam: ''
        }
    },
    mounted () {},
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
        Login: require('components/Shared/Login.vue').default,
        Home: require('components/Utente/Home.vue').default,
        clinicSearch: require('components/Utente/SearchSanitaryUnit.vue').default,
        appointment: require('components/Utente/Appointment.vue').default
    },
    methods: {
        saveUtente (utente) {
            this.userParent = utente
            this.showAddressScreen = false
            this.showSuccessRegistration = true
        },
        proccedToAddress (utente) {
            this.userParent = utente
            this.showEightScreen = false
            this.showAddressScreen = true
        },
        goHome (userParent) {
            let utente = {}
            Utente.api().get('/utente/' + userParent.id).then(resp => {
                console.log(resp.response.data)
            }).catch(error => {
                console.log(error)
            })
            utente = Utente.find(userParent.id)
            utente.address = Address.query().where('utente_id', userParent.id).get()[0]
            utente.mobilizer = CommunityMobilizer.find(userParent.mobilizer_id)
            utente.appointments = Appointment.query().where('utente_id', userParent.id).get()
            if (utente.clinic_id > 0 && utente.clinic === null) {
                utente.clinic = Clinic.find(utente.clinic_id)
            }
            console.log(userParent)
            this.userParent = utente
            this.showSuccessRegistration = false
            this.showLoginScreen = false
            this.showAppointmentScreen = false
            this.showHomeScreen = true
        },
        searchClinic (utente) {
            this.userParent = utente
            this.showClinicSearchScreen = true
            this.showHomeScreen = false
        },
        associarClinic (utente) {
            this.userParent = utente
            this.showClinicSearchScreen = false
            this.showHomeScreen = true
        },
        makeAppointment (utente) {
            this.userParent = utente
            this.showHomeScreen = false
            this.showAppointmentScreen = true
        },
        rescheduleAppointment (appointment) {
            this.currAppointment = appointment
            this.showHomeScreen = false
            this.showAppointmentScreen = true
        }
    }
}
</script>
<style lang="scss">
</style>
