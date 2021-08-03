import { Model } from '@vuex-orm/core'
import District from '../district/District'
import Utente from '../utente/Utente'

export default class Address extends Model {
  static entity = 'addresses'

  static fields () {
    return {
      id: this.attr(null),
      neighboorhood: this.attr(''),
      city: this.attr(''),
      residence: this.attr(''),
      latitude: this.attr(''),
      longitude: this.attr(''),
      district_id: this.attr(''),
      utente_id: this.attr(''),

      // Relationships
      district: this.belongsTo(District, 'district_id'),
      utente: this.belongsTo(Utente, 'utente_id')
    }
  }
}
