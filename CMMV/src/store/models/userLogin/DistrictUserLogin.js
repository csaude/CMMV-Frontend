import District from '../district/District'
import Province from '../province/Province'
import { UserLogin } from './UserLoginHierarchy'

export class DistrictLogin extends UserLogin {
  static entity = 'districtLogins'
  static baseEntity = 'userLogins'

  static fields () {
    return {
        ...super.fields(),
        province_id: this.attr(''),
        district_id: this.attr(''),
        district: this.belongsTo(District, 'district_id'),
        province: this.belongsTo(Province, 'province_id')
    }
  }
}
