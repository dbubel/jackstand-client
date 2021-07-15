<template>
  <div class="columns">
    <div class="column is-3"></div>
    <div class="column is-6">
      <div class="box">
        <h2 class="subtitle">Join PassWork</h2>
        <h1 class="title">Create your account</h1>
        <b-field label="Username">
          <b-input v-model="username" maxlength="30"> </b-input>
        </b-field>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="@" maxlength="30">
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="passwordOne" password-reveal>
          </b-input>
        </b-field>
        <b-field label="Confirm Password">
          <b-input type="password" v-model="passwordTwo" password-reveal>
          </b-input>
        </b-field>
        <b-button @click="onsubmit">Login</b-button>
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
      email: "",
      passwordOne: "",
      passwordTwo: "",
      username: "",
    };
  },
  methods: {
    onsubmit() {
      if (this.passwordOne != this.passwordTwo) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Passwords to not match!`,
          position: "is-bottom",
          type: "is-danger",
        });
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style></style>
