<template>
    <div>
        <UserMessage />
        <div class="row q-mx-xl q-mt-md ">
            Hoje dia 30 Aug 2021
        </div>
        <div class="q-mx-xl">
            <q-toolbar >
                <q-tabs v-model="tab" shrink stretch>
                    <q-tab name="ConsultasDay" label="Consultas do dia" />
                    <q-tab name="ConsultasOther" label="Outras Consultas" />
                </q-tabs>
            </q-toolbar>
            <q-separator class="q-mx-md"/>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="ConsultasDay">
                    <q-table :rows="utentes" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                                </q-input>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="ConsultasOther">
                    <q-table :rows="appointmentsBDD" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
                        <template v-slot:top-right>
                            <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </template>
                    </q-table>
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import Appointment from '../../store/models/appointment/Appointment'
import Utente from '../../store/models/utente/Utente'
const columns = [
  {
    name: 'appointmentDate',
    required: true,
    label: 'Data',
    align: 'left',
    field: row => row.appointmentDate,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'time',
    required: true,
    label: 'Hora',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'code',
    required: true,
    label: 'Codigo',
    align: 'left',
    field: row => row.utente,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'nameUser',
    required: true,
    label: 'Nome do Utente',
    align: 'left',
    field: row => row.utente,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'arrivedUs',
    required: true,
    label: 'Chegou a US?',
    align: 'left',
  field: row => row.hasHappened,
    format: val => `${val}`,
    sortable: true
  }
]
export default {
  data () {
    return {
         appointmentsBD: [],
          columns,
            utentes: [
        {
          id: 1,
          firstname: 'Mario Kanda',
          selected: false,
          status: 'pending',
          cellphone: '8446425456',
           appointments: [
                {
                }
                ]
        },
        {
          id: 2,
          firstname: 'Muhammad Chona',
          selected: false,
           status: 'pending',
           cellphone: '8446425456',
            appointments: [
                {
                }
                ]
        },
        {
          id: 3,
          firstname: 'Chona',
          selected: false,
           status: 'pending',
           cellphone: '8446425456',
            appointments: [
                {
                }
                ]
        },
        {
          id: 4,
          firstname: 'Eurico',
          selected: false,
          status: 'associated',
          cellphone: '8446425456',
           appointments: [
                {
                }
                ]
        },
        {
          id: 5,
          firstname: 'Roxanne',
          selected: false,
           status: 'associated',
           cellphone: '8446425456',
            appointments: [
                {
                }
                ]
        },
        {
          id: 6,
          firstname: 'Sarah',
          selected: false,
           status: 'associated',
           cellphone: '8446425456',
            appointments: [
                {
                }
                ]
        },
        {
          id: 7,
          firstname: 'Themos',
          selected: false,
          status: 'sended',
          cellphone: '8446425456',
           appointments: [
                {
                    appointmentDate: '25/06/2021',
                    time: '13:03',
                    hasHappened: false,
                    confirmedByUS: false,
                    orderNumber: 6,
                    clinic: {
                        code: 'BOANE',
                        name: 'Boane'
                    }
                }
                ]
        }
      ],
      tab: ref('ConsultasDay')
    }
  },
  computed: {
        appointmentsBDD () {
         return Appointment.all()
      },
        UtenteBD () {
         return Utente.all()
      }
  },
       methods: {
    getAppointments () {
          Appointment.api().get('/appointment')
          // Utente.api().get('/utente')
       },
       fillUtenteOnAppointment () {
         this.appointmentsBDD.forEach(appointment => {
          this.UtenteBD.forEach(utente => {
            if (appointment.user_id === utente.id) {
                 appointment.user = utente
            }
          })
       })
       }
       },
       mounted () {
         this.getAppointments()
         this.fillUtenteOnAppointment()
    },
  components: {
      UserMessage: require('components/Clinic/UserMessage.vue').default
  }
}
</script>
