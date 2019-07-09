<template>
  <SignUp />
  
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SearchUser from './components/user/SearchUser'

export default {
  name: 'App',
  components: {
    SignIn,
    SignUp,
    SearchUser
  },
  data () {
    return {
      //
    }
  }
}
</script>
