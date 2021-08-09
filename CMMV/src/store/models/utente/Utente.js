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
      firstNames: this.attr(''),
      lastNames: this.attr(''),
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
      mobilizer_id: this.attr(''),
      user_id: this.attr(''),

      // Relationships
      address: this.belongsTo(Address, 'address_id'),
      mobilizer: this.belongsTo(CommunityMobilizer, 'mobilizer_id'),
      infoDocsImages: this.hasMany(InfoDocsOrImages, 'info_docs_or_images_id'),
      messages: this.hasMany(Message, 'utente_id'),
      appointments: this.hasMany(Appointment, 'utente_id'),
      userLogin: this.belongsTo(UserLogin, 'user_id')
    }
  }

  getFullName () {
    return this.firstnames + ' ' + this.lastname
  }
}
