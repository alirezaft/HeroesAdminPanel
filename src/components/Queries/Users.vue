<template>
    <div>
        <!-- <div class="row filters-page__filter-bar-container">
            <filter-bar v-model="searchQuery" class="filters-page__filter-bar" label="Search"/>
        </div> -->
        <table class="table table-striped first-td-padding">
            <thead>
                <tr>
                    <td>index</td>
                    <td>username</td>
                    <td>exp</td>
                    <td>trophies</td>
                    <td>coins</td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr id="row">
                    <td>{{rows[0].index}}</td>
                    <td>{{rows[0].username}}</td>
                    <td>{{rows[0].experience}}</td>
                    <td>{{rows[0].trophies}}</td>
                    <td>{{rows[0].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.stop.prevent="showUser(0)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr id="row">
                    <td>{{rows[1].index}}</td>
                    <td>{{rows[1].username}}</td>
                    <td>{{rows[1].experience}}</td>
                    <td>{{rows[1].trophies}}</td>
                    <td>{{rows[1].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(1)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr id="row">
                    <td>{{rows[2].index}}</td>
                    <td>{{rows[2].username}}</td>
                    <td>{{rows[2].experience}}</td>
                    <td>{{rows[2].trophies}}</td>
                    <td>{{rows[2].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(2)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr>
                  <td>{{rows[3].index}}</td>
                    <td>{{rows[3].username}}</td>
                    <td>{{rows[3].experience}}</td>
                    <td>{{rows[3].trophies}}</td>
                    <td>{{rows[3].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(3)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>
                <tr>
                  <td>{{rows[4].index}}</td>
                    <td>{{rows[4].username}}</td>
                    <td>{{rows[4].experience}}</td>
                    <td>{{rows[4].trophies}}</td>
                    <td>{{rows[4].coins}}</td>
                    <td><button class="btn btn-primary btn-with-icon rounded-icon" id="info"
                    @click.prevent.stop="showUser(4)">
                        <div class="btn-with-icon-content" id="infoic">
                            <i class="entypo entypo-info"></i>
                        </div>
                    </button></td>
                </tr>

            </tbody>
        </table>
        <vuestic-modal :showsync="Show" ref="largeModal" v-bind:large="true"
            :cancelClass="'none'"
            :okText="'OK'">
                <vuestic-collapse id="Character-info">
                    <span slot="header">Characters</span>
                    <div slot="body">
                        <div class="va-row">
                            <div class="flex md6">
                                <ul class="vue-unordered" id="heroes-list">
                                  <li v-for="h in Heroes">{{h}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </vuestic-collapse>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Player ID</b></p>
                  <p id="pid">{{pid}}</p>
                </div>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Match IP</b></p>
                  <p id="pid">{{matchip}}</p>
                </div>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Current hero</b></p>
                  <p id="pid">{{currHero}}</p>
                </div>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Match ID</b></p>
                  <p id="pid">{{matchid}}</p>
                </div>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Clan</b></p>
                  <p id="pid">{{Clan}}</p>
                </div>
                <div id="pid-wrapper">
                  <p id="pid-head"><b>Tournament</b></p>
                  <p id="pid">{{Tournament}}</p>
                </div>
                <!-- <div id="pid-wrapper">
                  <p id="pid-head"><b>V</b></p>
                  <p id="pid">{{v}}</p>
                </div> -->
                <!-- <ul>
                  <li>
                </ul> -->
            </vuestic-modal>

    </div>
</template>

<script>
import axios from 'axios'
import Global from '../../Global'
export default {
  name: 'Users',
  data () {
    return {
      apiUrl: Global.CP_BACK_DB_ADDR + '/getUsers',
      index: 1,
      rows: [],
      searchQuery: '',
      Show: false,
      UserDetails: null,
      result: null,
      pointer: 0,
      // User data to be shown in the modal
      Heroes: ['', '', '', '', '', '', '', ''],
      pid: 0,
      matchip: 0,
      matchport: 0,
      currHero: '',
      matchid: '',
      Clan: '',
      Tournament: '',
      // v: ''
    }
  },
  methods: {
    mountTableRow (usr, exp, trp, coin) {
      console.log('PUTTING')
      const row = {
        template: `<tr><td>546</td><td>{{username}}</td><td>{{exper}}</td><td>{{trophy}}</td><td>{{coins}}</td></tr><div id="row"></div>`,
        data () {
          return {
            index: 1,
            username: usr,
            exper: exp,
            trophy: trp,
            coins: coin
          }
        }
      }
    },
    insertRow (usr, exp, trp, coin) {
      this.rows.push({
        index: this.index,
        username: usr,
        experience: exp,
        trophies: trp,
        coins: coin
      })
      this.index++
    },
    takeNextChunk (chunkNum) {
      // TODO: add pagination api to the server
    },
    getUserInfo (index) {
      this.UserDetails = this.result[index]
    },
    showUser (index) {
      this.pointer = index
      var tmpHeroes = this.checkForHeroes(index)
      if (tmpHeroes.length != 0) {
        this.Heroes = tmpHeroes
      }
      this.pid = this.result[index]._id
      if (this.result[index].matchIP) {
        this.matchip = this.result[index].matchIP
      } else {
        this.matchip = 'undefined'
      }
      console.log(this.matchip)
      this.matchport = this.result[index].matchPort
      this.currHero = this.result[index].currentHero
      if (this.result[index].matchId) {
        this.matchid = this.result[index].matchId
      } else {
        this.matchid = 'No match currently'
      }
      if (this.result[index].clan) {
        this.Clan = this.result[index].clan
      } else {
        this.Clan = 'No clan'
      }
      if (this.result[index].tournament) {
        this.Tournament = this.result[index].tournamnet
      } else {
        this.Tournament = 'No tournament'
      }
      // this.v = this.result[index].__v;

      this.$refs.largeModal.open()

      // this.getUserInfo(index);
    },
    checkForHeroes (index) {
      // this.Heroes.splice(0, this.Heroes.length)
      this.Heroes.length = 0
      var res = []
      var i = 0
      if (this.result[index].heroesProperties.IceMan.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Ice man: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Wizard: locked')
        i++
      }
      console.log(this.Heroes)
      if (this.result[index].heroesProperties.BlackHole.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Balckhole: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Black hole: locked')
        i++
      }
      if (this.result[index].heroesProperties.Wizard.isUnlocked == true) {
        // this.Heroes.splice(i, 0, 'Wizard: unlocked')
        this.$set(this.Heroes, i, 'Wizard: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Wizard: locked')
        i++
      }
      if (this.result[index].heroesProperties.Tank.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Tank: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Tank: locked')
        i++
      }
      if (this.result[index].heroesProperties.Healer.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Healer: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Healer: locked')
        i++
      }
      if (this.result[index].heroesProperties.Cloner.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Cloner: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Cloner: locked')
        i++
      }
      if (this.result[index].heroesProperties.Invoker.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Invoker: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Invoker: locked')
        i++
      }
      if (this.result[index].heroesProperties.ClockMan.isUnlocked == true) {
        this.$set(this.Heroes, i, 'Clock man: unlocked')
        i++
        // console.log('YAY!')
      } else {
        this.$set(this.Heroes, i, 'Clock man: locked')
        i++
      }
      // console.log(res)
      return res
    }
  },
  mounted () {
    axios.get('http://5.253.27.99:254/getUsers', {})
      .then((res) => {
        console.log(res.data)
        res.data.forEach(elm => {
          this.insertRow(elm.username, elm.experience, elm.trophies, elm.coins)
          console.log(elm.username)
          this.result = res.data
        })
        // console.log(this.rows)
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.replace({ name: 'login' })
        } else if (err.response.status === 403) {
          this.$router.replace()
        }
      })
  }
}
</script>

<style>
#pid-wrapper{
  overflow: hidden;
  margin: 12px;
}
#pid-head{
  font-weight: bold;
  float: left;
}
#pid{
  float: right;
}
#heroes-list{
  margin: 8px;
}
</style>
