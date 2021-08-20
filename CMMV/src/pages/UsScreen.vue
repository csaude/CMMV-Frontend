 <template>
   <q-page class="absolute full-width full-height column">
 <pageHeader :showPreviousButton="false" @previousScreen="$emit('previousScreen')"> Unidade Sanitaria</pageHeader>
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
            <q-table title="Utentes" :rows="appointmentsBDD" :columns="columns" row-key="name" flat bordered :filter="filter"  selection="single" v-model:selected="selected">
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
    <q-dialog  v-if="showEditTask">
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
    </q-dialog>
  </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import Appointment from '../store/models/appointment/Appointment'
import Utente from '../store/models/utente/Utente'
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
    field: row => row.utente.firstname,
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
      tab: ref('mails')
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
       pageHeader: require('components/Utente/UtenteRegistrationHeader.vue').default
       }
}
</script>
