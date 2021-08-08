import { Model } from '@vuex-orm/core'
import Appointment from '../appointment/Appointment'
import CommunityMobilizer from '../mobilizer/CommunityMobilizer'

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



      // Relationships
      appointments: this.hasMany(Appointment, 'clinic_id'),
      communityMobilizers: this.hasMany(CommunityMobilizer, 'clinic_id')
    }
  }
}
