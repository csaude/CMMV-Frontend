import { Model } from '@vuex-orm/core'
import Utente from '../utente/Utente'

export default class Message extends Model {
  static entity = 'messages'

  static fields () {
    return {
      id: this.attr(null),
      description: this.attr(''),
      messageType: this.attr(''),
      smsDate: this.attr(''),
      utente_id: this.attr(''),

      // Relationships
      utente: this.belongsTo(Utente, 'utente_id'),
    }
  }
}