import { Model } from '@vuex-orm/core'
import Appointment from '../appointment/Appointment'
// import CommunityMobilizer from '../mobilizer/CommunityMobilizer'
import Utente from '../utente/Utente'
import District from '../district/District'


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
      // Relationships
      appointments: this.hasMany(Appointment, 'clinic_id'),
      // communityMobilizers: this.hasMany(CommunityMobilizer, 'clinic_id'),
      utentes: this.hasMany(Utente, 'clinic_id'),
      district: this.belongsTo(District, 'district_id')
    }
  }
}
