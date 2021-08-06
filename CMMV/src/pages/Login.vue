<template>
  <q-page class=" absolute full-width full-height column">
  <div class="row q-px-md q-mt-lg">
        <q-btn flat round color="deep-orange" icon="chevron_left" />
    </div>
    <div class="row q-pa-xl texte-center q-mt-xl column">
        <div class="row text-center column text-h6 q-mb-md">BEM VINDO</div>
        <div class="row text-center column text-weight-medium">Sistema móvel para o <br/> acompanhamento de Circuncisão <br/>Masculina</div>
    </div>
    <div class="row q-mt-lg">
    </div>
    <div class="q-pa-xl">
        <div class="row q-mb-md">
            <q-input
                class="col"
                ref="user"
                outlined
                type="text"
                lazy-rules
                rounded
                label="Utilizador" >
                <template v-slot:append>
                    <q-icon name="person"  color="deep-orange"/>
                </template>
            </q-input>
        </div>
        <div class="row q-mb-md">
            <q-input v-model="password" rounded
                outlined
                class="col"
                label="Senha"
                :type="isPwd ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                        color="deep-orange"
                    />
                </template>
            </q-input>
        </div>
        <div class="row float-right">Esqueceu a senha?</div>
    </div>
    <div class="row column q-pa-xl">
        <q-btn class="q-py-sm" unelevated rounded color="deep-orange" label="Entrar" />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
    data () {
        return {
            isPwd: ref(true)
        }
    },
    methods: {}

}
</script>

<style>

</style>
