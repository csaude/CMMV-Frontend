<template>
  <q-card style="width: 700px; max-width: 80vw;" class="q-pt-lg">
        <form @submit.prevent="submitAppointment" >
            <q-card-section class="q-px-md">
               <div class="row">
                    <q-input outlined disable v-model="editedAppointment.utente.codigo" label="Código" dense class="col"/>
                    <q-input outlined disable v-model="editedAppointment.utente.firstNames" label="Nome" dense class="col q-ml-md"/>
               </div>
               <div class="row q-pt-md">
                    <q-input dense outlined v-model="editedAppointment.appointmentDate" mask="date" :rules="['date']" class="col">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="editedAppointment.appointmentDate">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <q-input dense outlined v-model="editedAppointment.time" mask="time" :rules="['time']" class="q-ml-md col">
                        <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="editedAppointment.time">
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-time>
                            </q-popup-proxy>
                        </q-icon>
                        </template>
                    </q-input>
               </div>
               <div class="row q-mb-md">
                    <q-input
                        class="col"
                        outlined
                        type="textarea"
                        label="Morada"
                        />
                </div>
            </q-card-section>
           <q-card-actions align="right" class="q-mb-md">
                <q-btn type="submit" label="Cancelar" color="primary" @click="$emit('close')"/>
                <q-btn type="submit" label="Submeter" color="primary" />
            </q-card-actions>
        </form>
    </q-card>
</template>

<script>
export default {
    props: ['appointment'],
    data () {
        return {
            editedAppointment: {}
        }
    },
    created () {
        this.editedAppointment = Object.assign({}, this.appointment)
    }

}
</script>

<style>

</style>
