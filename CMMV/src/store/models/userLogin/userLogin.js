import { Model } from '@vuex-orm/core'
import Utente from '../utente/Utente'
import CommunityMobilizer from '../mobilizer/CommunityMobilizer'


export default class UserLogin extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      username: this.attr(''),
      password: this.attr(''),

      // Relationships
      utente: this.hasOne(Utente, 'user_id'),
      mobilizer: this.hasOne(CommunityMobilizer, 'user_id')
    }
  }
}
