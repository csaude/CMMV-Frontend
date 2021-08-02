import { Model } from '@vuex-orm/core'
import Link from '../link/Link'
import Utente from '../utente/Utente'
import InfoDocsOrImages from '../dorcOrImages/InfoDocsOrImages'

export default class CommunityMobilizer extends Model {
  static entity = 'communityMobilizers'

  static fields () {
    return {
      id: this.attr(null),
      firstnames: this.attr(''),
      lastname: this.attr(''),
      uuid: this.attr(''),

      // Relationships
      utentes: this.hasMany(Utente, 'community_mobilizer_id'),
      info_docs_or_images: this.hasMany(InfoDocsOrImages, 'info_docs_or_images_id'),
      links: this.hasMany(Link, 'community_mobilizer_id')
    }
  }
}
