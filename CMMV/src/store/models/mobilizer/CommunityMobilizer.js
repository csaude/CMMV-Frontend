import { Model } from '@vuex-orm/core'
import Utente from '../utente/Utente'
import InfoDocsOrImages from '../dorcOrImages/InfoDocsOrImages'
import Clinic from '../clinic/Clinic'
import UserLogin from '../userLogin/userLogin'

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
      info_docs_or_images: this.hasMany(InfoDocsOrImages, 'info_docs_or_images_id'),
      clinic: this.belongsTo(Clinic, 'clinic_id'),
      userLogin: this.belongsTo(UserLogin, 'user_id')
    }
  }
}
