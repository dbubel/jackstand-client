<template>
  <div class="columns">
    <div class="column is-3"></div>
    <div class="column is-6">
      <div class="box">
        <h1 class="title">Password Generator</h1>
        <h2 class="subtitle">
          Generate a random string in your browser to be used a secure password
        </h2>
        <b-field label="Password Length">
          <b-slider v-model="passwordLength" :max="128"></b-slider>
        </b-field>
        <code>{{ randomPassword }}</code>
        <br />
        <br />
        <b-button @click="generates">Generate</b-button>
      </div>
    </div>
    <div class="column is-3"></div>
  </div>
</template>

<script>
import { RandomString } from "../js/RandomString";
export default {
  data() {
    return {
      randomPassword: "",
      passwordLength: 0,
    };
  },
  methods: {
    generates() {
      this.randomPassword = RandomString(parseInt(this.passwordLength));
    },
  },
};
</script>

<style>
code {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
