import { Model } from '@vuex-orm/core'

export default class VMMCArticle extends Model {
  static entity = 'VMMCArticles'

  static fields () {
    return {
      id: this.attr(null),
      seq: this.attr(''),
      text: this.attr('')
    }
  }
}
