<template>
    <apexchart
  style="max-width: 100%; "
  height="500"
  type="bar"
  :options="chartOptions"
  :series="series"
></apexchart>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Appointment from '../../store/models/appointment/Appointment'
 import moment from 'moment'
import Utente from '../../store/models/utente/Utente'
const monthsX = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEC']
const toDateStr = str => new Date(str.replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'))
const monthsEng = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
export default {
    mapUtentesRegistred: new Map(),
      mapAppointmentsDone: new Map(),
       monthsX,
       toDateStr,
       monthsEng,
     components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      chartOptions: { // ApexCharts options
        chart: {
          id: 'vue-chart-bar',
          stacked: true,
          stackType: '100%'
        },
        colors: ['#F44336', '#13c185', '#13a6c1', '#ffe433'],
         animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
         title: {
          text: 'Consultas',
          align: 'center',
          style: {
            color: '#000000'
          }
          },
           plotOptions: {
              bar: {
                borderRadius: 10
              }
           },
   stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0
},
fill: {
          opacity: 2
        },
         tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
         },
      dataLabels: {
          enabled: true
        },
         xaxis: {
      categories: [...monthsX]
      }
        }
      }
  },
  methods: {
    getAppointmentsDoneByMonth () {
    var monthsPresent = []
   const map = this.appointmentsDone.reduce((a, b) => {
  const m = toDateStr(b.appointmentDate).getMonth()
  console.log(m)
  a[m] = (a[m] || 0) + 1
  monthsPresent.push(monthsEng[+m])
     return a
}, {})
  let result = Object.entries(map).map(([key, data]) => ({ data, key: monthsEng[+key] }))
   var monthsNot = monthsEng.filter(item => !monthsPresent.includes(item))
   for (const item of monthsNot) {
     result.push(({ data: 0, key: item }))
   }
  result = result.sort(function (a, b) {
  // sort based on the value in the monthNames object
  return +moment(a.key, 'MMM') - moment(b.key, 'MMM')
})
  return result
  },
  getUtentesRegistredByMonth () {
       var monthsPresent = []
   const map = this.utentesRegistred.reduce((a, b) => {
  const m = toDateStr(b.registerDate).getMonth()
  a[m] = (a[m] || 0) + 1
  monthsPresent.push(monthsEng[+m])
     return a
}, {})
   let result = Object.entries(map).map(([key, data]) => ({ data, key: monthsEng[+key] }))
   var monthsNot = monthsEng.filter(item => !monthsPresent.includes(item))
   for (const item of monthsNot) {
     result.push(({ data: 0, key: item }))
   }
  result = result.sort(function (a, b) {
  // sort based on the value in the monthNames object
  return +moment(a.key, 'MMM') - moment(b.key, 'MMM')
})
  return result
  }
  },
  computed: {
    utentesRegistred () {
         return Utente.query()
                   .with('communityMobilizer')
                   .orderBy('firstNames')
                   .has('firstNames')
                   .get()
      },
       appointmentsDone () {
          return Appointment.query()
                           .where((appointment) => {
                                  return appointment.status === 'CONFIRMADO' &&
                                  appointment.visitDate !== '' &&
                                  appointment.visitDate !== null &&
                                  appointment.visitDate !== undefined &&
                                  appointment.hasHappened !== false
                                  })
                          .orderBy('appointmentDate', 'desc')
                          .get()
      },
        series () {
           var mapIter1 = this.mapAppointmentsDone.values()
         var arrDone = []
       for (const item of mapIter1) {
         arrDone.push(item.data)
         }
         var mapIterUtRegister = this.mapUtentesRegistred.values()
         var arrRegistred = []
       for (const item of mapIterUtRegister) {
         arrRegistred.push(item.data)
         }
    return [
       {
        name: 'Utentes Registrados',
        data: [...arrRegistred]
      },
       {
        name: 'Consultas Realizadas',
        data: [...arrDone]
      }
    ]
    }
  },
    created () {
  //  this.getAllUtentesByDistrictId(localStorage.getItem('idLogin'))
  //   this.getAllAppointmentsByDistrictId(localStorage.getItem('idLogin'))
    this.mapUtentesRegistred = this.getUtentesRegistredByMonth()
    this.mapAppointmentsDone = this.getAppointmentsDoneByMonth()
    }
}

</script>
