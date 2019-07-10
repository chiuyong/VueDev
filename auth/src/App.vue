<template>
  <div id="app">
        <router-view/>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import SignIn from './components/auth/SignIn'
import SearchUser from './components/user/SearchUser'

export default {
  name: 'App',
  components: {
    SignIn,
    SearchUser
  },
  data () {
    return {
      //
    }
  }
}
</script>
