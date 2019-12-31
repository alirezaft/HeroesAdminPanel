import { Line, mixins } from 'vue-chartjs'
import socketio from 'socket.io-client'
import Global from '../../../Global'
var { reactiveData } = mixins

var connected = false

var socket = socketio.connect(Global.CP_BACK_SOCK_ADDR)
socket.on('Connected', (message) => {
  connected = true
})
export default {
  extends: Line,
  mixins: [reactiveData],
  data: () => {
    return {
      i: 0,
      chartData: {
        labels: [],
        datasets: [{
          label: ['CPU utilization'],
          backgroundColor: 'rgba(00, 00, 55, 0.8)',
          borderColor: '#000055',
          data: [],
        }]
      },
      options: {
        height: 500,
        width: 500,
        elements: {
          point: {
            radius: 0
          }
        },
        animation: {
          duration: 0,
          easing: 'linear'
        },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [
            { ticks: {
              min: 0,
              max: 100
            } }
          ],
          xAxes: [{
            ticks: {
              min: 0,
              max: 150
            }
          }]
        }
      }
    }
  },
  created () {
    this.fillData()
    socket.on('ResourceReport', (message) => {
      var tmp = {
        labels: this.chartData.labels,
        datasets: [{
          label: this.chartData.datasets[0].label,
          backgroundColor: 'rgba(00, 00, 55, 0.8)',
          borderColor: '#000055',
          data: this.chartData.datasets[0].data
        }]
      }
      if (tmp.datasets[0].data.length > 150) {
        addWithShift(message.CpuUsage, tmp.datasets[0].data)
      } else {
        tmp.datasets[0].data.push(message.CpuUsage)
        tmp.labels.push('')
        this.i++
      }

      this.chartData = tmp
    })
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
    setInterval(() => {
      this.fillData()
    }, 200)
  },

  methods: {
    fillData () {
      if (connected) {
        socket.emit('ResourceReport', { status: 's' })
      }
    },
    exportPerc () {
      return this.chartData.datasets[0].data[this.chartData.datasets[0].data.length - 1]
    }
  }
}
function addWithShift (data, array) {
  for (var i = 0; i < array.length; i++) {
    if (i != array.length - 1) {
      array[i] = array[i + 1]
    } else {
      array[i] = data
    }
  }
}
