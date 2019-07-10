<template>
  <v-app id="inspire">
    <v-content>      
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" v-if="showLoginForm" @submit.prevent>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model.trim="loginForm.email"
                    prepend-icon="email"
                    name="email"
                    id="email"
                    label="E-mail"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model.trim="loginForm.password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="primary" @click="toggleForm">Criar Conta</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Entrar</v-btn>
              </v-card-actions>
            </v-card>

            <!-- SignUp -->
            <v-card class="elevation-12" v-else @submit.prevent>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Cadastro Usuário</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="name"
                    v-model.trim="signupForm.name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="Nome"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    v-model.trim="signupForm.email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    v-model.trim="signupForm.password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                  ></v-text-field>
                  <v-layout row>
                    <v-flex xs2 sm2 md2>
                      <v-text-field
                        name="ddd"
                        label="DDD"
                        return-masked-value
                        mask="(##)"
                        required
                        v-model="ddd"
                        v-model.trim="signupForm.ddd"
                        :error-messages="dddErrors"
                        @input="$v.ddd.$touch()"
                        @blur="$v.ddd.$touch()"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs9 sm9 md9 offset-xs1>
                      <v-text-field
                        name="phone"
                        label="Telefone"
                        return-masked-value
                        mask="#####-####"
                        required
                        v-model="phone"
                        v-model.trim="signupForm.phone"
                        :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-btn color="primary" @click="toggleForm">Voltar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="signup">Criar</v-btn>
                  </v-card-actions>
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
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

const fb = require("../../config/firebaseConfig");

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required },
    ddd: { required },
    phone: { required }
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
        ddd: "",
        phone: ""
      },
      showLoginForm: true,
      performingRequest: false,
      errorMsg: ''
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Nome é obrigatório!");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail é obrigatório!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Senha é obrigatório!");
      return errors;
    },
    dddErrors() {
      const errors = [];
      if (!this.$v.ddd.$dirty) return errors;
      !this.$v.ddd.required && errors.push("DDD é obrigatório!");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("Telefone é obrigatório!");
      return errors;
    }
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    login() {
      this.performingRequest = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.performingRequest = false;
          this.errorMsg = ('Usuário', user.user.uid);
          console.log('Usuário', user.user.uid);
          this.$router.push("/searchuser");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    signup() {
      this.performingRequest = true;
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(user => {
          console.log(user);
          this.$store.commit("setCurrentUser", user.user);
          // create user obj
          fb.usersCollection
            .doc(user.user.uid)
            .set({
              nome: this.signupForm.name,
              email: this.signupForm.email,
              password: this.signupForm.password,
              telefone: {
                ddd: this.signupForm.ddd,
                phone: this.signupForm.phone,  
              }
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.performingRequest = false;
              this.$router.push("/searchuser");
              console.log("added")
            })
            .catch(err => {
              console.log(err);
              this.performingRequest = false;
              this.errorMsg = err.message;
            });
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>

