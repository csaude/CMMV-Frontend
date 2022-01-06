<template>
  <q-item clickable v-ripple>
        <q-item-section avatar top>
            <q-icon name="date_range" size="lg" color="grey-8"/>
        </q-item-section>

        <q-item-section>
            <q-item-label>&nbsp;{{appointment && this.formatDateShort(appointment.appointmentDate)}} &nbsp; </q-item-label>
            <q-item-label caption><span >Utente: {{appointment.utente && appointment.utente.firstNames}}
            <span >  &nbsp; &nbsp;Codigo&nbsp;:{{appointment.utente && appointment.utente.systemNumber}} </span> </span></q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-btn color="red" flat icon="delete" @click.stop="promptToConfirm(appointment)" />
        </q-item-section>
    </q-item>
</template>

<script>
import { date } from 'quasar'
import Appointment from 'src/store/models/appointment/Appointment'
import db from 'src/store/localbase'
export default {
    props: ['appointment'],
    methods: {
         finalize (reset) {
        this.timer = setTimeout(() => {
          reset()
        }, 100)
      },
        formatDateShort (value) {
            return date.formatDate(value, 'DD-MM')
        },
        promptToConfirm (appointmentToConfirm) {
             if (appointmentToConfirm.utente.syncStatus === 'S') {
        this.$q.dialog({
              title: 'Informação',
              message: 'Não Pode Editar a consulta uma vez que esta já foi sicronizada',
              ok: {
              label: 'OK',
              push: true,
              color: 'blue'
              },
              persistent: true
          }).onOk(() => {
           //   this.finalize(reset)
          })
             } else {
            this.$q.dialog({ title: 'Confirm', message: 'Deseja remover a confirmação?', cancel: true, persistent: true }).onOk(() => {
                appointmentToConfirm.status = 'PENDENTE'
            console.log(appointmentToConfirm)
                   Appointment.update({
        where: (appointment) => {
    return appointment.id === appointmentToConfirm.id
  },
        data: appointmentToConfirm
      })
            const appointmentLocalBase = JSON.parse(JSON.stringify(appointmentToConfirm))
             db.newDb().collection('appointments').doc({ id: appointmentToConfirm.id }).set(appointmentLocalBase)
   //         Appointment.api().patch('/appointment/' + appointmentToConfirm.id, appointmentToConfirm).then(resp => {
   //             console.log(resp.response.data)
   //             this.$emit('appointmentConfirm', resp.response.data)
   //         }).catch(error => {
    //            console.log(error)
     //       })
        })
        }
      }
}
}
</script>

<style>

</style>
