import Vuex from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import Utente from './models/utente/Utente'
import Address from './models/address/Address'
import Appoinment from './models/appointment/Appointment'
import Clinic from './models/clinic/Clinic'
import Country from './models/country/Country'
import District from './models/district/District'
import InfoDocsOrImages from './models/dorcOrImages/InfoDocsOrImages'
import Message from './models/messages/Message'
import CommunityMobilizer from './models/mobilizer/CommunityMobilizer'
import Province from './models/province/Province'
import { UserLogin, MobilizerLogin, UtenteLogin } from './models/userLogin/UserLoginHierarchy'
import VMMCArticle from './models/article/VMMCArticle'

// Vue.use(Vuex)

VuexORM.use(VuexORMAxios, {
    axios,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
     baseURL: 'http://dev.fgh.org.mz:4110/api'
    //  baseURL: 'http://localhost:8882/api'
  })

    const database = new VuexORM.Database()
    database.register(Utente)
    database.register(Address)
    database.register(Appoinment)
    database.register(Clinic)
    database.register(Country)
    database.register(District)
    database.register(InfoDocsOrImages)
    database.register(Message)
    database.register(CommunityMobilizer)
    database.register(Province)
    database.register(UserLogin)
    database.register(UtenteLogin)
    database.register(MobilizerLogin)
    database.register(VMMCArticle)

    export default function (/* { ssrContext } */) {
        const Store = new Vuex.Store({
          plugins: [VuexORM.install(database)],
          modules: {
            // example
          },

          // enable strict mode (adds overhead!)
          // for dev mode only
          strict: process.env.DEBUGGING
        })

        return Store
      }
