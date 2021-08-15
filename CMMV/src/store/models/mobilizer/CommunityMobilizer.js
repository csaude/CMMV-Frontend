import { Model } from '@vuex-orm/core'
import Utente from '../utente/Utente'
import InfoDocsOrImages from '../dorcOrImages/InfoDocsOrImages'
import Clinic from '../clinic/Clinic'
import { MobilizerLogin } from '../userLogin/UserLoginHierarchy'

export default class CommunityMobilizer extends Model {
  static entity = 'communityMobilizers'

  static fields () {
    return {
      id: this.attr(null),
      firstNames: this.attr(''),
      lastNames: this.attr(''),
      cellNumber: this.attr(''),
      cellNumber2: this.attr(''),
      uuid: this.attr(''),
      clinic_id: this.attr(''),
      user_id: this.attr(''),

      // Relationships
      utentes: this.hasMany(Utente, 'mobilizer_id'),
      docsOrImages: this.hasMany(InfoDocsOrImages, 'docsOrImages_id'),
      clinic: this.belongsTo(Clinic, 'clinic_id'),
      user: this.hasOne(MobilizerLogin, 'user_id')
    }
  }
}
