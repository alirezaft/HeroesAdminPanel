<template>
    <div>
        <p>ighdijfijgpjgmeriogjirogjriogjd</p>
        <v-stage :config="viewConfig">
            <v-layer id="main-layer">

            </v-layer>
        </v-stage>
    </div>
</template>

<script>
import konva from 'vue-konva'
import axios from 'axios'
import bson from 'bson'
import Global from '../../Global'
export default {
  name: 'ActionViewer',
  data () {
    return {
      id: '',
      viewConfig: {
        width: 700,
        height: 500
      }
    }
  },
  methods: {
    initialize (id) {
      this.id = this.$router.params
    },
  },
  mounted () {
    console.log('Component has been mounted')
    axios.post(Global.CP_BACK_DB_ADDR + '/getActoins', {
      matchId: this.id,
      headers: {
        // 'Origin': '5.253.27.99:5000',
        // 'Access-Control-Request-Method': 'POST',
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>
