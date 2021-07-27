import { Model } from '@vuex-orm/core'
import Appointment from '../appointment/Appointment'
import Link from '../link/Link'

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
      links: this.hasMany(Link, 'clinic_id'),
      appointments: this.hasMany(Appointment, 'clinic_id')
    }
  }
}
