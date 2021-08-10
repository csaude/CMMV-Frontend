<template>
  <div class="q-pa-md q-gutter-md">
      <h4 bold>Marcacao de Consultas</h4>
        <q-list bordered class="rounded-borders" >
      <q-item>
        <q-item-section avatar>
          <p>Aug 30</p>
        </q-item-section>

        <q-item-section top>
         <div class="q-gutter-m">
          <q-item-label lines="1">
            <span class="text-weight-medium" bold>Nova Marcacao</span>&nbsp;
            <span class="text-weight-medium" bold>   [&nbsp;30 Aug - 9:00&nbsp;]</span>
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2">
            <span >Utente: Henry Ford
            <span >  &nbsp; &nbsp; &nbsp; Codigo: 123-457a</span> </span>
          </q-item-label>
         </div>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
          <q-btn outline color="red" label="Confirmar" />
           <q-btn outline color="red" label="Re-Marcar" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
<br>
    <h4 bold>Consultas Marcadas</h4>
        <q-list bordered class="rounded-borders" >
      <q-item>
         <q-item-section avatar top>
          <q-icon name="event" color="black" size="34px" />
        </q-item-section>
        <q-item-section top>
         <div class="q-gutter-m">
          <q-item-label lines="1">
            <span> </span>
            <span class="text-weight-medium" bold> &nbsp;30 Aug &nbsp;(9:00)</span>
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2">
            <span >Utente: Henry Ford
            <span >  &nbsp; &nbsp;Codigo&nbsp;:123-457a </span> </span>
          </q-item-label>
         </div>
        </q-item-section>
        <q-item-section top side>
          <div class="text-black-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" dense square outline icon="close" />
          </div>
        </q-item-section>
   </q-item>
   </q-list>
  </div>
</template>
