<template>
  <section>
    <div class="columns">
      <div class="column is-one-third">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="Image"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Welcome </strong>
                  <br />
                  <small>{{ userId }}@</small>
                  <br />
                  Hello world
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="column is-one-third"></div>
      <div class="trash column is-one-third">
        <b-button
          @click="addCredential"
          size="is-large"
          icon-left="plus-circle"
        >
          Add New Credential
        </b-button>
      </div>
    </div>

    <b-progress v-if="!loaded"></b-progress>
    <div class="box">
      <b-table
        hoverable
        detailed
        :show-detail-icon="showDetailIcon"
        :data="data"
      >
        <b-table-column field="service" label="Service Name" v-slot="props">
          {{ props.row.service }}
        </b-table-column>
        <b-table-column field="CreatedAt" label="CreatedAt" v-slot="props">
          {{ props.row.CreatedAt }}
        </b-table-column>
        <b-table-column field="" label="" v-slot="props">
          <b-button type="is-danger" icon-right="trash" @click="confirmCustomDelete(props.row.Uid)"/>
        </b-table-column>

        <template #detail="props">
          <div class="columns">
            <div class="column is-one-third">
              <div class="box">
                {{ props.row }}
                <b-field label="Username">
                  <b-input
                    v-bind:value="props.row.username"
                    maxlength="30"
                  ></b-input>
                </b-field>

                <b-field label="Password">
                  <b-input
                    type="password"
                    v-bind:value="props.row.password"
                    password-reveal
                  >
                  </b-input>
                </b-field>
              </div>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import "buefy/dist/buefy.css";
import { Encrypt, Decrypt } from "@/js/Aes";
import firebase from "firebase";
var crypto = require("crypto");

export default {
  data() {
    return {
      showDetailIcon: true,
      loaded: false,
      userId: "",
      data: [],
    };
  },
  methods: {
    addCredential() {
      this.$router.push("/addnewcredential");
    },
    confirmCustomDelete(credentialUid) {
          this.$buefy.dialog.confirm({
              title: 'Deleting credential',
              message: 'Are you sure you want to <b>delete</b> this credential? This action cannot be undone.',
              confirmText: 'Delete',
              type: 'is-danger',
              hasIcon: true,
              onConfirm: () => {

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
              .delete("/users/credentials/" + credentialUid, {})
              .then(() => {
                // response availbable here in arrow function
                this.$buefy.toast.open('Credential deleted!')
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



                }
          })
      },
  },
  mounted() {
    const pwhash = crypto.createHash("sha256").update("hello").digest("base64");
    var enc = Encrypt(pwhash, "hello world");
    console.log(JSON.stringify(enc));
    console.log(JSON.parse(JSON.stringify(enc)));
    console.log(Decrypt(pwhash, enc));
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
            .get("/users/credentials")
            .then((response) => {
              this.data = response.data;
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              // always executed
            });
        });
        this.loaded = true;
      } else {
        this.$router.push("/");
      }
    });
  },
};
</script>

<style lang="scss">
.trash {
  // padding: 0;
  // margin: 0;
  // width: 100%;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 3px solid green;
}

// body{
// max-width: 500px;
//   margin: auto;
// }
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-box-align: center;
//   text-align: center;
//   max-width: 500px;

// }

// a {
//   color: inherit;
// }
</style>
