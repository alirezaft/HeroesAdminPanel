
<template>
  <div class="dashboard">
    <!-- <div class="va-row btn-margin-row"> -->
      <!-- <button class="btn btn-primary">Make match</button>
      <button class="btn btn-danger">Something</button> -->
      <!-- <vuestic-chart :data="CPUReport" :options="options" type="line" ref="charte"/> -->
    <!-- </div> -->
      <vuestic-widget headerText="Resource monitor" id="chart-wrapper">
        <div id="ram-chart">
        <reactive-chart ref="rchart"/>
        <div class="vue-lists">
          <h3 id="ram-perc">{{RamPerc}}</h3>
          <!-- <p>%</p> -->
        </div>
      </div>
      <div id="cpu-chart">
        <cpu-chart ref="cchart"/>
        <div class="vue-lists">
          <h3 id="cpu-perc">{{CpuPerc}}</h3>
        </div>
      </div>
      </vuestic-widget>
  </div>

</template>

<script>
import io from 'socket.io-client'
import { setInterval, setTimeout } from 'timers'
// Logic of these charts (fetching data and sending requests) happen in the compnents
import ReactiveChart from '../statistics/charts/ReactiveChart'
import CpuChart from '../statistics/charts/CpuChart'

const CHART_COLOR = '#001144'

export default {
  components: { ReactiveChart, CpuChart },
  name: 'dashboard',
  data () {
    return {
      RamPerc: 'Initializing',
      CpuPerc: 'Initializing',
      i: 1,
      options: {
        responsive: true,
        maintainAspectRatio: false

      },
      CPUReport: {
        labels: [],
        datasets: [
          {
            label: 'CPU',
            backgroundColor: '#005500',
            data: [4, 10, 5, 17]
          }
        ]
      }
    }
  },
  methods: {},
  mounted () {
    this.$nextTick(() => {
      setInterval(() => {
      // console.log(this.$refs.rchart.methods.exportPerc())
        try {
          this.RamPerc = Math.round(this.$refs.rchart.exportPerc() * 100) / 100 + ' %'
          this.CpuPerc = Math.round(this.$refs.cchart.exportPerc() * 100) / 100 + ' %'
        } catch (err) {

        }
      }, 200)
    })
  }
}

</script>
<style lang="scss">
#chart-wrapper{
  overflow: hidden;
  margin-top: 12px
}
#ram-chart{
  width: 50%;
  height: 50%;
  float: left;
  // margin: 7px;
}
#cpu-chart{
  width: 50%;
  height: 50%;
  float: left;
}
#cpu-perc{
  text-align: center;
  -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
#ram-perc{
  // margin: 0 auto
  // left: 50%
  text-align: center;
  -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>
