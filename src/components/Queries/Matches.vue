<template>
    <div>
        <router-view></router-view>
        <table class="table table-striped first-td-padding">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Match ID</td>
                    <td>Match IP</td>
                    <td>Match port</td>
                    <td>is Running</td>
                    <td>Team A score</td>
                    <td>Team B score</td>
                    <td>View</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{1}}</td>
                    <td>{{result[0]._id}}</td>
                    <td>{{result[0].matchIP}}</td>
                    <td>{{result[0].matchPort}}</td>
                    <td>{{result[0].isRunning}}</td>
                    <td>{{result[0].teamAScore}}</td>
                    <td>{{result[0].teamBScore}}</td>
                    <td>
                        <!-- <div class="flex sm6 lg6 xl3 justify--space-around"> -->
                            <button class="btn btn-primary btn-with-icon rounded-icon" id="view"
                            @click.stop.prevent="getMatchFinalView(0)">
                                <div class="btn-with-icon-content" id="viewic">
                                    <i class="fa fa-eye"></i>
                                </div>
                            </button>
                        <!-- </div> -->
                    </td>
                </tr>
                <tr>
                    <td>{{2}}</td>
                    <td>{{result[1]._id}}</td>
                    <td>{{result[1].matchIP}}</td>
                    <td>{{result[1].matchPort}}</td>
                    <td>{{result[1].isRunning}}</td>
                    <td>{{result[1].teamAScore}}</td>
                    <td>{{result[1].teamBScore}}</td>
                    <td>
                        <!-- <div class="flex sm6 lg6 xl3 justify--space-around"> -->
                            <button class="btn btn-primary btn-with-icon rounded-icon" id="view"
                            @click.stop.prevent="getMatchFinalView(1)">
                                <div class="btn-with-icon-content" id="viewic">
                                    <i class="fa fa-eye"></i>
                                </div>
                            </button>
                        <!-- </div> -->
                    </td>
                </tr>
                <tr>
                    <td>{{3}}</td>
                    <td>{{result[2]._id}}</td>
                    <td>{{result[2].matchIP}}</td>
                    <td>{{result[2].matchPort}}</td>
                    <td>{{result[2].isRunning}}</td>
                    <td>{{result[2].teamAScore}}</td>
                    <td>{{result[2].teamAScore}}</td>
                    <td>
                        <!-- <div class="flex sm6 lg6 xl3 justify--space-around"> -->
                            <button class="btn btn-primary btn-with-icon rounded-icon" id="view"
                            @click.stop.prevent="getMatchFinalView(2)">
                                <div class="btn-with-icon-content" id="viewic">
                                    <i class="fa fa-eye"></i>
                                </div>
                            </button>
                        <!-- </div> -->
                    </td>
                </tr>
                <tr>
                    <td>{{4}}</td>
                    <td>{{result[3]._id}}</td>
                    <td>{{result[3].matchIP}}</td>
                    <td>{{result[3].matchPort}}</td>
                    <td>{{result[3].isRunning}}</td>
                    <td>{{result[3].teamAScore}}</td>
                    <td>{{result[3].teamBScore}}</td>
                    <td>
                        <!-- <div class="flex sm6 lg6 xl3 justify--space-around"> -->
                            <button class="btn btn-primary btn-with-icon rounded-icon" id="view"
                            @click.stop.prevent="getMatchFinalView(3)">
                                <div class="btn-with-icon-content" id="viewic">
                                    <i class="fa fa-eye"></i>
                                </div>
                            </button>
                        <!-- </div> -->
                    </td>
                </tr>
                <tr>
                    <td>{{5}}</td>
                    <td>{{result[4]._id}}</td>
                    <td>{{result[4].matchIP}}</td>
                    <td>{{result[4].matchPort}}</td>
                    <td>{{result[4].isRunning}}</td>
                    <td>{{result[4].teamAScore}}</td>
                    <td>{{result[4].teamBScore}}</td>
                    <td>
                        <!-- <div class="flex sm6 lg6 xl3 justify--space-around"> -->
                            <button class="btn btn-primary btn-with-icon rounded-icon" id="view"
                            @click.stop.prevent="getMatchFinalView(4)">
                                <div class="btn-with-icon-content" id="viewic">
                                    <i class="fa fa-eye"></i>
                                </div>
                            </button>
                        <!-- </div> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import axios from 'axios'
import actionView from './ActionViewer'
import Global from '../../Global'
export default {
  name: 'Matches',
  data () {
    return {
      result: []
    }
  },
  methods: {
    fetchMatches () {
      axios.post(Global.CP_BACK_DB_ADDR + '/getMatches', {}, {
        headers: {
          'Origin': '5.253.27.99:5000',
          'Access-Control-Request-Method': 'POST',
          // 'Access-Control-Request-Header': 'X-PINGOTHER, Content-Type'

        }
      }).then((res) => {
        this.result = res.data
        bson
          .console.log(this.result)
      }).catch((err) => {
        console.error(err)
      })
    },
    getMatchFinalView (index) {
      // console.log('GIMME DA MATCH!!!')
      // axios.post('http://5.253.27.99:254/getActions', {matchId: this.result[index]._id,}, {
      //     headers: {
      //         'Origin': '5.253.27.99:5000',
      //         'Aceess-Control-Request-Method': 'POST',
      //         // 'Content-Type': 'x-www-form-urlencoded',
      //         // 'Access-Control-Request-Header': 'X-PINGOTHER, Content-Type'
      //     }
      // }).then((res) => {
      //     console.log(res.data);
      // }).catch((err) => {
      //     console.log(err)
      // })
      console.log('dkjfndsbd')
      this.$router.push({ name: 'ActionViewer', params: { MatchId: this.result[index]._id } })
    }
  },
  mounted () {
    this.fetchMatches()
  }
}
</script>

<style>
#viewic{
    scale: unset
}
#view{
    /* width: 30px;
    height: 30px; */
    /* scale: 10% */
}
</style>
