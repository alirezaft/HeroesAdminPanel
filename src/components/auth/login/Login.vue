<template>
  <div class="login" id="par">
    <h2>{{ $t('auth.welcome') }}</h2>
    <form name="login" id="LoginForm">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="User" name="username" required="required" v-model="Username" value="">
          <label class="control-label" for="User">{{ $t('Username') }}</label>
          <i class="bar"/>
        </div>
      </div>
      <div class="form-group">
          <div class="input-group">
          <input type="password" id="Pass" name="password" required="required" v-model="Password" value="">
          <label class="control-label" for="Pass">{{ $t('auth.password') }}</label>
          <i class="bar"/>
        </div>
      </div>
      <div class="justify--space-between">
        <button class="btn btn-primary" @click.stop.prevent="validateUser()">{{ $t('auth.login') }}</button>
      </div>
    </form>
    <div id="Alert">
    </div>
    <div id="warn">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Global from '../../../Global'
export default {
  name: 'login',

  data: function () {
    return {
      Username: '',
      Password: ''
    }
  },
  methods: {
    showAlert () {
      const alert = {
        template: '<div id="Alert"><vuestic-alert type="danger" :withCloseBtn="true" id="authfailalert"><span class="badge badge-pill badge-danger">Error</span>Username or password is incorrect. Please try again.</vuestic-alert></div>'
      }
      const a = Vue.extend(alert)
      const vm = new a().$mount('#Alert')
    },

    showEmptyFieldAlert () {
      const warn = {
        template: '<div id="warn"><vuestic-alert type="warning" :withCloseBtn="true" id="authfailalert"><span class="badge badge-pill badge-warning">Warning</span>Please fill all fields to proceed.</vuestic-alert></div>'
      }
      const b = Vue.extend(warn)
      const vm = new b().$mount('#warn')
    },

    validateUser () {
      if (this.Username === '' || this.Password === '') {
        this.showEmptyFieldAlert()
      } else {
        axios.post(Global.CP_BACK_DB_ADDR + '/auth', {
          username: this.Username,
          password: this.Password,
          headers: {
            'Origin': '5.253.27.99:5000',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Header': 'X-PINGOTHER, Content-Type'
          }
        })
          .then((response) => {
            const token = response.data.token
            this.$cookie.set('LoginToken', token, { expires: '5m' })
            console.log(this.$cookie.get('LoginToken'))
            this.$router.push({ name: 'dashboard' })
          }).catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
              this.showAlert()
            } else {
              alert('Server is unreachable. try again later.')
            }
          })
      }
    },

    togglepassmode () {
      var element = document.getElementById('Pass')

      if (element.getAttribute('type') === 'password') {
        element.setAttribute('type', 'text')
      } else {
        element.setAttribute('type', 'password')
      }
    }
  }
}

</script>

<style lang="scss">
.login {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      display: none;
    }
  }
  .pass{
    width : 100%;
    float : left;
  }

  .passwordtoggle{
    color : #383838;
    text-align: right;
    font-size: 11pt;
    float : right;
    position: relative;
  }

  .bar{
    float : bottom;
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  #authfailalert{
    position: fixed;
    bottom: 0%;
    width: 70%;
    z-index: 2;
  }
}

</style>
