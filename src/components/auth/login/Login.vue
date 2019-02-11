<template>
  <div class="login">
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
          <!--button @click.stop.prevent="togglepassmode()">SHOW</button-->
          <i class="bar"/>
        </div>
      </div>
      <div class="justify--space-between">
        <button class="btn btn-primary" @click.stop.prevent="validateUser()">{{ $t('auth.login') }}</button>
      </div>

    </form>
    <vuestic-danger type="danger" :withCloseBtn="true" id="authfailalert" hidden>
      <span class="badge badge-pill badge-danger">Error</span>
        Username or password is incorrect. Please try again.
    </vuestic-danger>
  </div>
</template>

<script>
import axios from 'axios'
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
      document.getElementById('authfailalert').removeAttribute('hidden')
      // Can be replaced with toast
    },

    /* togglepassmode(){
      var currentMode = document.getElementById("Pass").getAttribute("type");

      if(currentMode == "password"){
        document.getElementById("Pass").setAttribute("type", "text");
      }else{
        document.getElementById("Pass").setAttribute("type", "password");
      }
    }, */

    validateUser () {
      axios.post('http://193.176.243.42:254/auth', {
        username: this.Username,
        password: this.Password
      })
        .then((response) => {
          const token = response.data.token
          this.$cookie.set('LoginToken', token, { expires: '5m' })
          console.log(this.$cookie.get('LoginToken'))
          this.$router.push({ name: 'dashboard' })
        }).catch((error) => {
          if (error.response.status === 401) {
            alert('Username or password is incorrect.')
          }
        })
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

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
