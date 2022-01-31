<template>
<div class="q-pt-xl">
        <q-table
        title="Mobilizadores"
        :rows="mobilizers"
        :columns="columns"
        row-key="id"
        :filter="filter"
        binary-state-sort
        >
        <template v-slot:top-right>
            <q-input outlined dense debounce="300" v-model="filter" placeholder="Pesquisa">
            <template v-slot:append>
                <q-icon name="search" />
            </template>
            </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="firstNames" :props="props">
              {{ props.row.firstNames }}
            </q-td>
            <q-td key="lastNames" :props="props">
              <div class="text-pre-wrap">{{ props.row.lastNames}}</div>
            </q-td>
             <q-td key="cellNumber" :props="props">
              <div class="text-pre-wrap">{{ props.row.cellNumber}}</div>
            </q-td>
            <q-td key="actions" :props="props">
             <div class="q-gutter-sm">
              <q-btn round icon="edit" color="orange" size=sm no-caps @click.stop="editMobilizer(props.row)">
                <q-tooltip class="bg-grey-5">Editar</q-tooltip>
                </q-btn>
              <!--q-btn round glossy icon="delete_forever" color="red" size=sm no-caps>
                <q-tooltip content-class="bg-red text-white shadow-4"
                          :offset="[10, 10]"
                          transition-show="rotate"
                          transition-hide="rotate">
                </q-tooltip>
                </q-btn-->
             </div>
            </q-td>
          </q-tr>
        </template>
        </q-table>
        <div class="absolute-bottom">
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn size="xl" fab icon="add" @click="addMobilizer" no-cap color="primary" />
          </q-page-sticky>
        </div>
          <q-dialog persistent v-model="showMobilizerRegistrationScreen">
          <addMobilizer
            :selectedMobilizer="mobilizer"
             :editMode=editMode
            @close="showMobilizerRegistrationScreen = false" />
      </q-dialog>
    <!--q-table title="Unidade Sanitária" :data="this.clinicos" :columns="columns" row-key="name" binary-state-sort :filter="filter">
      <template v-slot:top-right>
      <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Pesquisa">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
      <div class="q-pa-md q-gutter-sm">
      <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
        <q-btn outline rounded color="primary" icon="add" @click="show_dialog = true" no-caps/>
      </div>
      </template>
    </q-table-->
    </div>
</template>

<script>
import CommunityMobilizer from '../../store/models/mobilizer/CommunityMobilizer'
// import { MobilizerLogin } from '../../store/models/userLogin/MobilizerLogin'
import Province from 'src/store/models/province/Province'
import District from 'src/store/models/district/District'
import { QSpinnerIos } from 'quasar'
export default {
   props: ['backToDashBoard'],
    data () {
        return {
            mobilizer: new CommunityMobilizer(),
            mobilizerLogin: {},
            province: null,
               showMobilizerRegistrationScreen: false,
                editMode: false,
            columns: [
                { name: 'firstNames', align: 'left', label: 'Nome', field: row => row.firstNames, format: val => `${val}`, sortable: true },
                { name: 'lastNames', align: 'left', label: 'Apelido', field: row => row.lastNames, format: val => `${val}`, sortable: true },
                { name: 'cellNumber', align: 'left', label: 'Número de Telefone', field: row => row.cellNumber, format: val => `${val}`, sortable: true },
                { name: 'actions', label: 'Opções', align: 'left', field: 'actions' }
            ]
        }
    },
     mounted () {
        this.getAllProvinces()
      CommunityMobilizer.apiFetchByDistrictId(localStorage.getItem('idLogin'))
    },
    computed: {
        provinces () {
           return Province.query().orderBy('code').has('code').get()
        },
        districts () {
        if (this.address.province !== null) {
            return District.query().has('code').withAll().where('province_id', this.address.province.id).get()
        } else {
            return null
        }
        },
        mobilizers () {
            return CommunityMobilizer.query().has('firstNames').get()
        }
    },
    created () {
      this.showLoading()
        this.mobilizer.clinic = Object.assign({}, this.clinic)
    },
    methods: {
       addMobilizer () {
          this.mobilizer = new CommunityMobilizer()
         this.showMobilizerRegistrationScreen = true
           this.editMode = false
      },
      editMobilizer (mobilizer) {
        this.mobilizer = Object.assign({}, mobilizer)
         this.showMobilizerRegistrationScreen = true
         this.editMode = true
      },
        getAllProvinces (offset) {
        if (this.provinces.length <= 0) {
                Province.api().get('/province').then(resp => {
                    offset = offset + 100
                    if (resp.response.data.length > 0) { setTimeout(this.getAllProvinces(offset), 2) }
                }).catch(error => {
                    console.log(error)
                })
        }
    },
     showLoading () {
        this.$q.loading.show({
          spinner: QSpinnerIos,
          message: 'Por favor, aguarde...'
     })
        // hiding in 2s
        this.timer = setTimeout(() => {
         this.$q.loading.hide()
          this.timer = void 0
        }, 2000)
      }
    },
    components: {
         addMobilizer: require('components/Clinic/AddMobilizer.vue').default
    }

}
</script>

<style>
    .fild-radius {
        border-radius: 5px;
    }
</style>
