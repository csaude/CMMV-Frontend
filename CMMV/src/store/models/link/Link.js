import { Model } from '@vuex-orm/core'
import Clinic from '../clinic/Clinic'
import CommunityMobilizer from '../mobilizer/CommunityMobilizer'
import Utente from '../utente/Utente'

export default class Link extends Model {
  static entity = 'links'

  static fields () {
    return {
      id: this.attr(null),
      dateLink: this.attr(''),
      utente_id: this.attr(''),
      community_mobilizer_id: this.attr(''),
      clinic_id: this.attr(''),
 
      // Relationships
      utente: this.belongsTo(Utente, 'utente_id'),
      community_mobilizer: this.belongsTo(CommunityMobilizer, 'community_mobilizer_id'),
      clinic: this.belongsTo(Clinic, 'clinic_id'),
    }
  }
}