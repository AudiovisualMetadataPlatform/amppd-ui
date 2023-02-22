<template>
  <div class="logout">
    <a href="#" v-on:click="signout">
      <svg
        data-prefix="fas"
        data-icon="user-circle"
        class="float-right icon-user"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
      >
        <path
          class="icon-dark-1"
          d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
        ></path></svg
    ></a>

    <!-- <div class="right-pane"><button type = "button" v-on:click="signout()">Logout</button></div> -->
    <br />
  </div>
</template>

<script>
import { accountService } from "@/service/account-service";
import { sync } from "vuex-pathify";
import defaultState from "../../store/state";
export default {
  name: "logout",
  methods: {
    signout() {
      const self = this;
      if (
        self.$route.path === "/workflow/edit" &&
        localStorage.getItem("activeWorkflowSession")
      ) {
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
      } else {
        accountService.logout();
        self.isAuthenticated = false;
        this.$router.push("/account/login");
        // After successful logout we need to reset the state to prevent from showing old data
        this.$store.replaceState(defaultState);
      }
    },
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
  },
  mounted() {},
};
</script>

<style scoped>
.col,
.col-12,
.col-2,
.col-10,
.col-lg-12,
.col-lg-3,
.col-lg-9 {
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.col-12 {
  padding: 0px;
  flex: 0 0 100%;
  max-width: 100%;
}

.container.expand-h,
.expand-h,
.row.expand-h {
  height: 100%;
  min-height: 100%;
}

/* .container {
    margin:0px!important;
    margin-top: -8px;
  } */

.expand-h .col-2 {
  position: sticky;
  left: 0;
  top: 0;
  padding: 0;
}

.bg-dark-1 a,
.bg-dark-1 a:active,
.bg-dark-1 a:visited {
  color: #fff !important;
}

a {
  text-decoration: none;
  background-color: transparent;
}

a:link {
  color: #153c4d;
}

a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

.expand-h .col-10 {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}

.expand-h .col-10,
.expand-h .col-2 {
  margin-bottom: -9999px;
  padding-bottom: 9999px;
}

.bg-dark-1 {
  background-color: #153c4d;
}

.bg-light-gray-1 {
  background-color: #fafafa;
}

.col-2 {
  -ms-flex: 0 0 16.666667%;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
}

.col-10 {
  flex: 0 0 83.333333%;
  max-width: 83.333333%;
}

.bg-light-gray-1 header {
  height: auto;
  min-height: 4rem;
  padding: 0.5rem;
}

.bg-white {
  background: #fff;
}

/*.bg-white {
    background-color: #fff!important;
  }*/

header,
nav,
main {
  display: block;
}

/* @media screen and (max-width: 39em) #logo 
  {
    min-width: 100px;
    padding: 0;
  } */

#logo {
  max-width: 420px;
  width: 100%;
}

.logo-bg {
  fill: #153c4d;
}

.logo-fg {
  fill: #f4871e;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}

.svg-inline {
  width: 20px;
  height: auto;
}

:not(svg) {
  transform-origin: 0px 0px;
}

.icon-white {
  fill: #fff;
}

.icon-dark-1,
.svg-inline.dwn-arrow {
  fill: #fff !important;
}

/* .workflows .workflows, .collections .collections {
    background: #22617d;
  } */

svg.icon-user {
  width: 2.5rem;
}

.float-right {
  float: right !important;
}

.pad-all-3 {
  padding: 1.5rem;
}

.card {
  margin: 2.5rem auto;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.h1,
h1 {
  font-size: 2.5rem;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

nav ul {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
}

nav ul li {
  padding: 1rem;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: #000;
}

.marg-bot-4 {
  margin-bottom: 2rem;
}

.marg-t-2 {
  margin-top: 1rem;
}

.marg-t-5 {
  margin-top: 2.5rem;
}

.marg-bot-3 {
  margin-bottom: 1.5rem;
}

main {
  margin: 2em;
}

.form-control-file {
  display: block;
  width: 100%;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn-light {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
.btn-group-lg > .btn,
.btn-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.btn-outline-primary {
  background-color: transparent;
  background-image: none;
}

button {
  text-transform: none;
  font-size: inherit;
  line-height: inherit;
}

button,
input {
  overflow: visible;
  margin: 0;
  font-family: inherit;
}

button:hover {
  color: #f4871e;
  background-color: #153c4d;
}

input[type="file"] {
  border-radius: 0.3em;
  align-items: baseline;
}

.form-content {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-left: -5px;
}

.form-row > .col,
.form-row > [class*="col-"] {
  padding-right: 5px;
  padding-left: 5px;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}

.text-muted {
  color: #6c757d !important;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
  cursor: default;
  width: 100%;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.active-link {
  color: #153c4d;
}

.active-link:hover {
  color: #f4871e;
}

input {
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  cursor: text;
  font: 400 13.3333px Arial;
}

.form-errors {
  color: red;
  margin: 0% !important;
  font-size: 0.9rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

*,
::after,
::before {
  box-sizing: border-box;
}

body {
  background: #fff;
  height: 100%;
  min-height: 100%;
  margin-top: 0px !important;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #404040;
  text-align: left;
  display: block;
}
</style>
