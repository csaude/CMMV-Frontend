<template>
    <transition-group
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft absolute-top"
        >
  <div key="thirdScreen">
    <img
            src="~src/assets/03Vantagensmaior15.png"
            style="width: 100%; height: 300px"
            >
        <div class="q-ma-lg">
            <div class="row q-mb-lg">
                <q-item-label class="text-h5">As vantagens da circuncisão</q-item-label>
            </div>
            <div class="row">
                <ul>
                    <li>Facilita a higiene do pénis;</li>
                    <li>Previne infecções urinárias</li>
                    <li>Diminui o risco de contrair doenças de transmissão sexual, in­cluindo a infecção pelo HIV/SIDA;</li>
                    <li>Resolve problemas ligados ao prepúcio (dificuldade ou impossi­bilidade de puxar o prepúcio para trás, de forma a expor a cabeça do pénis);</li>
                    <li>Diminui o risco de desenvolvimento do cancro do pénis;</li>
                    <li>Reduz o risco de desenvolvimento do cancro do colo do útero na parceira.</li>
                </ul>
            </div>
        </div>
          <navigation-buttons
            @nextScreen="$emit('nextScreen')"
            @previousScreen="$emit('previousScreen')" />
    </div>
    </transition-group>
</template>

<script>
export default {
    components: {
        'navigation-buttons': require('components/MainScreen/NavigationButtons.vue').default
    }
}
</script>

<style>

</style>
