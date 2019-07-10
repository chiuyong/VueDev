<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Buscar Usuário</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="User ID"
                    name="userid"
                    v-model="userid"
                    v-model.trim="userForm.userid"
                  ></v-text-field>
                  <v-btn @click="search">Buscar</v-btn>
                  <v-btn @click="logout">Logout</v-btn>
                </v-form>
                <transition name="fade">
                  <div v-if="performingRequest" class="loading">
                    <p align-center>Loading...</p>
                  </div>
                </transition>
                <transition name="fade">
                  <div v-if="errorMsg !== ''" class="error-msg">
                    <p center>{{ errorMsg }}</p>
                  </div>
                </transition>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const fb = require("../../config/firebaseConfig");

export default {
  data() {
    return {
      userForm: {
        userid: ""
      },      
      performingRequest: false,
      errorMsg: ''
    };
  },
  methods: {
    search() {
      this.performingRequest = true;
      fb.usersCollection.doc(this.userForm.userid).get()
        .then(doc => {
          if (!doc.exists) {
            this.performingRequest = false;
            this.errorMsg = 'Não Autorizado';
            console.log('Não Autorizado');
          } else {
            this.performingRequest = false;
            this.errorMsg = ('Document data:', doc.data());
            console.log('Document data:', doc.data());
          }
        })
        .catch(err => {
          this.performingRequest = false;
          this.errorMsg = err.message;
          console.log('Error getting document', err);
        });
    },
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/signin')
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>