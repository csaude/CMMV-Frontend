<template>
  <q-page padding>
  <p>Registro Beneficiario</p>
   <div class=" absolute full-width full-height column">
        <div class="top text-center q-mb-xl">
            <img
                src="~src/assets/sucess.png"
                style="width: 100%; height: 100%"
                >
        </div>
        <div class="center text-center q-mb-xl">
         <page-content
            title="Parabens ! 
            O Seu Registo Foi Enviado com sucesso"
            content="Dentro de instantes o utente recebera uma mensagem com as credenciais de acesso."
            />
        </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
        hourOptionsTime1: [8, 9, 10, 11, 12, 13, 14],
        minuteOptionsTime1: [0],
      appointment: {
        date: '',
        time: ''
      }
    }
  },
  components: {
    'page-content': require('components/MainScreen/Content.vue').default
  }
}
</script>
