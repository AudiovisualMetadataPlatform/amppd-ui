<template>
  <div>
    <modal class="my-modal">
      <h5 slot="header">Authentication Required</h5>
      <div slot="body">
        Enter the editor password to view the page:
        <div class="form-input">
          <label class="form-errors" v-if="invalidInput"
            >Invalid password</label
          >
          <input
            v-model="userToken"
            type="text"
            v-on:keyup.enter="submitToken"
          />
        </div>
      </div>
      <div slot="footer">
        <input
          type="button"
          class="primary-button"
          value="Submit"
          v-on:click="submitToken"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import AmpHeader from "@/components/shared/Header.vue";
import Logout from "@/components/shared/Logout.vue";
import Modal from "@/components/shared/Modal.vue";
import { auth_token_required, auth_token_valid } from "@/service/hmgm-service";

export default {
  name: "TokenValidator",
  props: {
    datasetUrl: {
      type: String,
      required: true,
    },
    authString: {
      type: String,
      required: true,
    },
  },
  components: {
    AmpHeader,
    Logout,
    Modal,
  },
  data() {
    return {
      userToken: null,
      invalidInput: false,
    };
  },
  computed: {},
  methods: {
    async submitToken() {
      var valid = await auth_token_valid(
        this.authString,
        this.datasetUrl,
        this.userToken
      );
      console.log(valid);
      this.invalidInput = !valid;
      if (valid) {
        this.$emit("validAuth");
      }
    },
  },
};
</script>

<style scoped>
.my-modal {
  backdrop-filter: brightness(60%);
}
h2,
h3 {
  margin-top: 0;
}
.transcript-content {
  padding-top: 50px;
  margin-left: 45px;
  display: flex;
  flex-direction: column;
}
.header-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.action-buttons {
  display: flex;
  justify-content: flex-end;
}
.primary-button {
  float: right;
  background-color: #e9972d;
  color: #2c5b7f;
  font: bolder;
  padding: 10px 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  font-size: 12px;
  width: 150px;
}
.secondary-button {
  float: right;
  background-color: #ffffff;
  color: #2c5b7f;
  font: bolder;
  padding: 10px 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #e9972d;
  cursor: pointer;
  border-radius: 15px;
  font-size: 12px;
  width: 150px;
}
.modal-body .my-modal-body {
  height: auto !important;
  overflow: auto;
}
</style>
