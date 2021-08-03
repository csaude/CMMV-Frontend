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
                label="Utilizador"
                stack-label  />
        </div>
        <div class="row q-mb-md">
            <q-input
                class="col"
                ref="password"
                rounded
                outlined
                label="Senha"
                lazy-rules
                type="password"
                stack-label  />
        </div>
        <div class="row float-right">Esqueceu a senha?</div>
    </div>
    <div class="row column q-pa-xl">
        <q-btn class="q-py-sm" unelevated rounded color="deep-orange" label="Entrar" />
    </div>
  </q-page>
</template>

<script>
export default {

}
</script>

<style>

</style>
