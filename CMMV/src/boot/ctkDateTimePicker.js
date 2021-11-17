import { boot } from 'quasar/wrappers'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default boot(async ({ app }) => {
    // something to do
    app.component(VueCtkDateTimePicker)
  })
