<template>
  <q-page padding>
  <p>Mobilizador Comunitario</p>
   <q-btn-group>
      <q-btn color="primary" glossy label="Pendentes" @click="handler" id="btnPending" />
      <q-btn color="primary" glossy label="Associados" @click="handler1" id="btnAssociated"  />
      <q-btn color="primary" glossy label="Enviados"  @click="handler2" id="btnSended" />
    </q-btn-group>
      <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator v-show="pending" icon="call">
      <q-item clickable v-ripple  v-for="pendente in pendentes" :key="pendente" @click="!check1">
        <q-item-section  > {{pendente}}</q-item-section>
        <q-item-section rounded avatar>
           <q-checkbox v-model="check1" />
        </q-item-section>
      </q-item>
       </q-list>
    <q-list bordered separator v-show="associated">
      <q-item clickable v-ripple  v-for="associados in associados" :key="associados" >
        <q-item-section> {{associados}}</q-item-section>
         <q-item-section avatar>
          <q-icon color="primary" name="call" />
        </q-item-section>
      </q-item>
       </q-list>
    <q-list bordered separator v-show="sended">
      <q-item clickable v-ripple  v-for="enviado in enviados" :key="enviado" >
        <q-item-section> {{enviado}}</q-item-section>
      </q-item>
       </q-list>
  </div>
    <pre>{{address}}</pre>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
          pending: false,
          associated: false,
          sended: false,
         options: [
        'Maputo Provincia', 'Maputo Cidade', 'Gaza', 'Inhambane', 'Manica', 'Sofala'
      ],
      options2: [
        'Kamaxaquene', 'Kamavota', 'Nicouadala', 'Kampfumo', 'Chimoio', 'Beura'
      ],
       pendentes: [
        'Mario Kanda', 'Muhammad Chona', 'Chona', 'Voloide', 'Colaco'
      ],
       associados: [
        'Eurico', 'Roxanne', 'Sarah'
      ],
      enviados: [
        'Themos', 'Amrita', 'Sonia'
      ],
      address: {
        city: '',
        neighboorhood: '',
        residence: ' ',
        latitude: '544',
        longitude: '755',
        province: ''
      }
    }
  },
   methods: {
    handler () {
         this.pending = true
         this.sended = false
         this.associated = false
    },
    handler1 () {
        this.pending = false
        this.associated = true
        this.sended = false
    },
    handler2 () {
         this.pending = false
         this.sended = true
         this.associated = false
    }
  },
  components: {
  }
}
</script>
