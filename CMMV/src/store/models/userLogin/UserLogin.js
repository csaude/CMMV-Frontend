import { Model } from '@vuex-orm/core'

export class UserLogin extends Model {
  static entity = 'userLogins'

  static state () {
    return {
      fetching: false
    }
}
  // static types () {
  //   return {
  //       UTENTELOGIN: UtenteLogin,
  //       MOBILIZERLOGIN: MobilizerLogin
  //   }
  // }

  static fields () {
    return {
      id: this.attr(null),
      username: this.attr(''),
      password: this.attr(''),
      access_token: this.attr(''),
      refresh_token: this.attr('')
    }
  }
}
