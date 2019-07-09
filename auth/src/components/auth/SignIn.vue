<template>
<v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer></v-spacer>              
              </v-toolbar>
              <v-card-text>
                <v-form>                  
                  <v-text-field prepend-icon="email" name="login" label="E-mail" type="text"></v-text-field>                  
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-btn color="primary">Sign Up</v-btn>
                <v-btn color="primary">Buscar User</v-btn>
                <v-spacer></v-spacer>                
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      }
    }
  }</script>

