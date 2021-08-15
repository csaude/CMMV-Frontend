import { Model } from '@vuex-orm/core'
import { MobilizerLogin, UtenteLogin } from './UserLoginHierarchy'

export class UserLogin extends Model {
  static entity = 'userLogins'

  static types () {
    return {
        UTENTELOGIN: UtenteLogin,
        MOBILIZERLOGIN: MobilizerLogin
    }
  }

  static fields () {
    return {
      id: this.attr(null),
      username: this.attr(''),
      password: this.attr(''),
      type: this.attr('USERLOGIN')
    }
  }
}
