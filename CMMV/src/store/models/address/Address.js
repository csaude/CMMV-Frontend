import { Model } from '@vuex-orm/core'
import District from '../district/District'
import Utente from '../utente/Utente'
import db from 'src/store/localbase'

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

  static localDbAdd (address) {
    return db.newDb().collection('addresses').add(address)
  }

  static localDbGetById (id) {
    return db.newDb().collection('addresses').doc({ id: id }).get()
  }

  static localDbGetAll () {
    return db.newDb().collection('addresses').get()
  }

  static localDbUpdate (address) {
    return db.newDb().collection('addresses').doc({ id: address.id }).set(address)
  }

  static localDbUpdateAll (addresses) {
    return db.newDb().collection('addresses').set(addresses)
  }

  static localDbDelete (address) {
    return db.newDb().collection('addresses').doc({ id: address.id }).delete()
  }

  static localDbDeleteAll () {
    return db.newDb().collection('addresses').delete()
  }
}
