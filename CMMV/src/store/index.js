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
  })

// Request interceptor for API calls
axios.interceptors.request.use(
  async config => {
    config.headers = {
      Accept: 'application/json'
    }
    if (config.url === '/province' || config.url === '/district' || config.url === '/clinic') {
      delete config.headers.Authorization
    } else if (localStorage.getItem('id_token') != null) {
      config.headers['X-Auth-Token'] = [
        '', localStorage.getItem('id_token')
      ].join(' ')
    } else {
       console.log('>>VFF2 ' + JSON.parse(localStorage.getItem('id_token')) + '------------' + JSON.stringify(localStorage))
        delete config.headers.Authorization // ["Authorization"]
    }
    return config
  },
  error => {
    Promise.reject(error)
  })

  // Response interceptor for API calls
   axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config
    const rToken = localStorage.getItem('id_token')
  if (rToken.length > 10) {
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
          originalRequest._retry = true
      console.log('attempt to refresh token here -' + 'http://dev.fgh.org.mz:4110/api/oauth/access_token?grant_type=refresh_token&refresh_token=' + rToken)
      return axios.post('http://dev.fgh.org.mz:4110/api/oauth/access_token?grant_type=refresh_token&refresh_token=' + rToken)
        .then(({ data }) => {
          console.log('==got the following token back: ' + data.access_token + '___________________________________________')
          axios.defaults.headers.common['X-Auth-Token'] = data.access_token
      return axios(originalRequest)
        })
    }
  }
    return Promise.reject(error)
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
