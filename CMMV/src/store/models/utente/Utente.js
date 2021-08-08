import { Model } from '@vuex-orm/core'
import Address from '../address/Address'
import Appointment from '../appointment/Appointment'
import Message from '../messages/Message'
import CommunityMobilizer from '../mobilizer/CommunityMobilizer'
import InfoDocsOrImages from '../dorcOrImages/InfoDocsOrImages'
import UserLogin from '../userLogin/userLogin'

export default class Utente extends Model {
  static entity = 'utentes'

  static fields () {
    return {
      id: this.attr(null),
      firstnames: this.attr(''),
      lastname: this.attr(''),
      birthDate: this.attr(''),
      cellNumber: this.attr(''),
      whatsappNumber: this.attr(''),
      preferedLanguage: this.attr(''),
      documentType: this.attr(''),
      documentNumber: this.attr(''),
      systemNumber: this.attr(''),
      haspartner: this.attr(''),
      status: this.attr(''),
      address_id: this.attr(''),
      community_mobilizer_id: this.attr(''),

      // Relationships
      address: this.hasOne(Address, 'address_id'),
      community_mobilizer: this.belongsTo(CommunityMobilizer, 'community_mobilizer_id'),
      info_docs_or_images: this.hasMany(InfoDocsOrImages, 'info_docs_or_images_id'),
      messages: this.hasMany(Message, 'utente_id'),
      appointments: this.hasMany(Appointment, 'utente_id'),
      userLogin: this.hasOne(UserLogin, 'utente_id')
    }
  }

  getFullName () {
    return this.firstnames + ' ' + this.lastname
  }
}
