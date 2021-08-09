<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="ConsultasDay" label="Consultas do dia" />
          <q-tab name="ConsultasOther" label="Outras Consultas" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="ConsultasDay">
           <q-table title="Utentes" :rows="utentes" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
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
            <q-table title="Utentes" :rows="rows" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
    <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
            </q-input>
      </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'appointmentDate',
    required: true,
    label: 'Data',
    align: 'left',
    field: row => row.appointments === 'undefined' ? ' ' : row.appointments[0].appointmentDate,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'time',
    required: true,
    label: 'Hora',
    align: 'left',
    field: row => row.appointments === 'undefined' ? ' ' : row.appointments[0].time,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'code',
    required: true,
    label: 'Codigo',
    align: 'left',
    field: row => row.cellphone,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'nameUser',
    required: true,
    label: 'Nome do Utente',
    align: 'left',
    field: row => row.firstname,
    format: val => `${val}`,
    sortable: true
  },
   {
    name: 'arrivedUs',
    required: true,
    label: 'Chegou a US?',
    align: 'left',
  field: row => row.appointments === 'undefined' ? ' ' : row.appointments[0].hasHappened,
    format: val => `${val}`,
    sortable: true
  }
]
export default {
  setup () {
    return {
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
      tab: ref('mails')
    }
  }
}
</script>
