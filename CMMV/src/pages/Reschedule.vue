<template>
             <q-card class="q-pa-sm q-gutter-sm" style="width: 650px; max-width: 90vw ;">
            <q-card-section>
            <q-btn color="grey-7" round flat icon="close" justify-end v-close-popup />
                <div class="row q-mb-sm">
                <div class="col 1 flex-break">
                    <q-input
                        autofocus
                        ref="name"
                        class="col"
                        label="Codigo"
                        v-model="this.appointmentToSubmit.status"
                        outlined
                        disabled
                       readonly
                    >
                    </q-input>
                </div>
                <div class="col 2">
                    <q-input
                        autofocus
                        ref="name"
                        class="col"
                        label="Nome"
                        outlined
                        disabled
                       readonly
                    >
                    </q-input>
                </div>
                </div>
                <div class="row q-mb-sm">
                <div class="col 1 flex-break">
                    <q-input
                       v-model="this.appointmentToSubmit.appointmentDate"
                        label="Data"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="appointmentToSubmit.appointmentDate"
                                @click="clearDueDate"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="appointmentToSubmit.appointmentDate">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div
                    class="col 1 flex-break"
                >
                    <q-input
                        v-model="appointmentToSubmit.time"
                        label="Hora"
                        class="col"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="appointmentToSubmit.time"
                                @click="appointmentToSubmit.time = ''"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="appointmentToSubmit.time"  :hour-options="hourOptionsTime1"
                         :minute-options="minuteOptionsTime1">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                </div>
                <div >
    <q-input
      v-model="text"
      filled
      type="textarea"
      label="Notas"
    />
  </div>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn
                    color="white"
                    label="Cancelar"
                    type="cancel"
                    class="text-red"
                    dense
                    v-close-popup
                />
                <q-btn
                    color="red"
                    label="Submeter"
                    type="submit"
                />
            </q-card-actions>
             </q-card>
</template>
<script>
export default {
    props: ['appointment'],
     data () {
    return {
         appointmentToSubmit: {}
      }
  },
    computed: {
    },
        mounted () {
      this.appointmentToSubmit = Object.assign({}, this.appointment)
    }

}
</script>
