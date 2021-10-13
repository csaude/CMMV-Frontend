import { Model } from '@vuex-orm/core'
// import CommunityMobilizer from '../mobilizer/CommunityMobilizer'
import Utente from '../utente/Utente'
import District from '../district/District'
import Province from '../province/Province'


export default class Clinic extends Model {
  static entity = 'clinics'

  static fields () {
    return {
      id: this.attr(null),
      code: this.attr(''),
      name: this.attr(''),
      type: this.attr(''),
      latitude: this.attr(''),
      longitude: this.attr(''),
      district_id: this.attr(''),
      province_id: this.attr(''),

      // Relationshiops
      province: this.belongsTo(Province, 'province_id'),
      district: this.belongsTo(District, 'district_id'),

      // appointments: this.hasMany(Appointment, 'clinic_id'),
      // communityMobilizers: this.hasMany(CommunityMobilizer, 'clinic_id'),
      utentes: this.hasMany(Utente, 'clinic_id')
    }
  }
}
