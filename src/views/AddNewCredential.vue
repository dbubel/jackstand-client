<template>
  <div class="columns">
    <div class="column is-3"></div>
    <div class="column is-6">
      <div class="box">
        <h2 class="subtitle"></h2>
        <h1 class="title">Create new Credential</h1>
        <b-field label="Username">
          <b-input v-model="username"> </b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="passwordOne" password-reveal>
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="passwordTwo" password-reveal>
          </b-input>
        </b-field>
        <b-field label="Service Name">
          <b-input v-model="serviceName"> </b-input>
        </b-field>
        <b-field label="Description">
          <b-input v-model="description"> </b-input>
        </b-field>
        <b-button @click="onsubmit">Create</b-button>
      </div>
    </div>
    <div class="column is-3"></div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      username: "",
      passwordOne: "",
      passwordTwo: "",
      serviceName: "",
      description: "",
    };
  },
  methods: {
    onsubmit() {
      if (this.passwordOne != this.passwordTwo) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Something's not good, also I'm on <b>bottom</b>`,
          position: "is-bottom",
          type: "is-danger",
        });
        return;
      }
      const axios = require("axios");

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userId = user.uid;

          user.getIdToken().then((token) => {
            const req = axios.create({
              baseURL: "https://pass.engineerbeard.com",
              headers: {
                Authorization: "Bearer " + token,
              },
            });

            req
              .post("/users/credentials", {
                service: this.serviceName,
                username: this.username,
                password: this.passwordTwo,
                description: this.description,
              })
              .then(() => {
                // response availbable here in arrow function
                this.$buefy.toast.open({
                  message: "Success!",
                  type: "is-success",
                });
                //   this.data = response.data;
                this.$router.push("/");
              })
              .catch((error) => {
                console.log(error);
              })
              .then(() => {
                // always executed
              });
          });
        } else {
          this.$router.push("/");
        }
      });
    },
    mounted() {},
  },
};
</script>

<style></style>
