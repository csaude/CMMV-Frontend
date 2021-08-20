<template>
            <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
                <div class="row q-mb-sm">
                <div class="col 1 flex-break">
                    <q-input
                        v-model="appointment.appointmentDate"
                        autofocus
                        ref="name"
                        class="col"
                        label="Codigo"
                        outlined
                        disabled
                       readonly
                    >
                    </q-input>
                </div>
                <div class="col 2">
                    <q-input
                        v-model="appointment.time"
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
                        v-model="appointment.appointmentDate"
                        label="Data"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="appointment.appointmentDate"
                                @click="clearDueDate"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="appointment.appointmentDate">
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
                        v-model="appointment.time"
                        label="Hora"
                        class="col"
                        outlined
                    >
                        <template v-slot:append>
                            <q-icon
                                v-if="appointment.time"
                                @click="appointment.time = ''"
                                class="cursor-pointer"
                                name="close"
                            />
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="appointment.time"  :hour-options="hourOptionsTime1"
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
                />
                <q-btn
                    color="red"
                    label="Submeter"
                    type="submit"
                />
            </q-card-actions>
        </form>
</template>
<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
    data () {
        return {
            appointment: {
                appointmentDate: '',
                time: '',
                hasHappened: ''
            },
             hourOptionsTime1: [8, 9, 10, 11, 12, 13, 14],
        minuteOptionsTime1: [0],
      optionsFn (newDate) {
        return newDate >= date.formatDate(Date.now(), 'YYYY/MM/DD')
      }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask']),
        submitForm () {
            this.$refs.name.validate()
            if (!this.$refs.name.hasError) {
                this.submitTask()
            }
        },
        submitTask () {
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        },
        clearDueDate () {
            this.taskToSubmit.dueDate = ''
            this.taskToSubmit.dueTime = ''
        }
    }
}
</script>
