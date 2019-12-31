<template>
    <div>
        <v-stage :config="configKonva">
            <v-layer>
            <v-circle :config="configCircle"></v-circle>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
import io from 'socket.io-client'
import Global from '../../Global'

const socket = io(Global.CP_BACK_SOCK_ADDR)

export default {
  name: 'Matches',
  data () {
    return {
      configKonva: {
        width: 800,
        height: 200
      },
      configCircle: {
        x: 10,
        y: 10,
        radius: 7,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      }
    }
  },
  methods: {

  },
  mounted () {

  }
}

</script>

<style>

</style>
