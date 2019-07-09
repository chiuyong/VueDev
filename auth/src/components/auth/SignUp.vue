<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Cadastro Usuário</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="Nome"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
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
                      :error-messages="phoneErrors"
                      @input="$v.phone.$touch()"
                      @blur="$v.phone.$touch()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-btn @click="submit">Cadastrar</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </v-form>
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
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required },
    ddd: { required },
    phone: { required }
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    ddd: "",
    phone: ""
  }),
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
    submit() {
      console.log({email: this.email, password: this.password})
      //this.$v.$touch();

    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>