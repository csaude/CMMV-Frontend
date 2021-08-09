import { Model } from '@vuex-orm/core'
import Province from 'src/store/models/province/Province'
import Address from '../address/Address'

export default class District extends Model {
  static entity = 'districts'

  static fields () {
    return {
      id: this.attr(null),
      code: this.attr(''),
      description: this.attr(''),
      province_id: this.attr(''),

      // Relationshiops
      province: this.belongsTo(Province, 'province_id'),
      addresses: this.hasMany(Address, 'district_id')
    }
  }
}
