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
      utente_id: this.attr(''),
      community_mobilizer_id: this.attr(''),

      // Relationships
      utente: this.belongsTo(Utente, 'utente_id'),
      community_mobilizer: this.belongsTo(CommunityMobilizer, 'community_mobilizer_id')
    }
  }
}
