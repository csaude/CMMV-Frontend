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
import Link from './models/link/Link'
import Message from './models/messages/Message'
import CommunityMobilizer from './models/mobilizer/CommunityMobilizer'
import Province from './models/province/Province'
import UserLogin from './models/userLogin/userLogin'

// Vue.use(Vuex)

VuexORM.use(VuexORMAxios, {
    axios,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    baseURL: 'http://localhost:8081/api'
  })

  const database = new VuexORM.Database()
    database.register(Utente)
    database.register(Address)
    database.register(Appoinment)
    database.register(Clinic)
    database.register(Country)
    database.register(District)
    database.register(InfoDocsOrImages)
    database.register(Link)
    database.register(Message)
    database.register(CommunityMobilizer)
    database.register(Province)
    database.register(UserLogin)

  export default new Vuex.Store({
    plugins: [VuexORM.install(database)]
  })
