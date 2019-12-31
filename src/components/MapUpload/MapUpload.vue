<template>
    <div>
        <vuestic-widget headerText="New map upload">
            <vuestic-file-upload
                type="single"
                :file-types="'.json'"
                dropzone
                v-model="MapSlot"></vuestic-file-upload>
            <div class="va-row btn-margin-row">
                <button class="btn btn-primary" id="btn-upload" @click.stop.prevent="uploadMap()">Submit</button>
            </div>
        </vuestic-widget>
        <div id="Error"></div>
        <div id="success"></div>
        <div id="nofile"></div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Global from '../../Global'
export default {
  data () {
    return {
      MapSlot: []
    }
  },
  methods: {
    uploadMap () {
      if (this.MapSlot.length == 0) {
        this.showNoFileNotif()
      }
      var formData = new FormData()
      formData.append('MapFile', this.MapSlot[0])
      axios.post(Global.CP_BACK_REST_ADDR + '/uploadMap', formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            // 'Origin': '5.253.27.99:3001',
            // 'Access-Control-Request-Method': 'POST',
            // 'Access-Control-Request-Header': 'X-PINGOTHER, Content-Type'
          }
        })
        .then((res) => {
          console.log(res.headers)
          console.log(formData)
          if (res.data.Result == 'SUCCESS') {
            this.showMapUploadSuccess()
          } else {
            console.log('Maybe failed')
            this.showMapUploadFailure()
          }
        })
        .catch((err) => {
          console.log('Error occured: \n' + err)
          this.showMapUploadFailure()
        })
    },
    showMapUploadFailure () {
      let Error = {
        template: '<div id="Error"><vuestic-alert type="danger" :withCloseBtn="true" id="MapNotif"><span class="badge badge-pill badge-danger">Error</span>Failed to upload map. Please Try again.</vuestic-alert></div>'
      }

      const a = Vue.extend(Error)
      const vm = new a().$mount('#Error')
    },
    showMapUploadSuccess () {
      let succ = {
        template: '<div id="success"><vuestic-alert type="success" :withCloseBtn="true" id="MapNotif"><span class="badge badge-pill badge-success">Success</span>Map uploaded successfully.</vuestic-alert></div>'
      }
      console.log('Done :)')
      const a = Vue.extend(succ)
      const vm = new a().$mount('#success')
    },
    showNoFileNotif () {
      let nof = {
        template: '<div id="nofile"><vuestic-alert type="danger" :withCloseBtn="true" id="MapNotif"><span class="badge badge-pill badge-danger">Error</span>Please select a file to upload.</vuestic-alert></div>'
      }
      const a = Vue.extend(nof)
      const vm = new a().$mount('#nofile')
    }
  },
  mounted () {
    axios.defaults.withCredentials = true
  }
}
</script>

<style lang="scss">
#btn-upload{
    margin: 0 auto;
    margin-top: 5px;
}
#MapNotif{
    position: fixed;
    bottom: 0%;
    width: 70%;
    z-index: 2;
}
</style>
