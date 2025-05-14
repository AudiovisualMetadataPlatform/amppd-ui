<template>
  <div>
    <modal class="my-modal">
      <template #header><h5>Authentication Required</h5></template>
      <template #body><div>
        Enter the editor password to view the page:
        <div class="form-input">
          <label class="form-errors form-label" v-if="!valid">
            Invalid password
          </label>
          <input
            v-model="userPass"
            type="text"
            v-on:keyup.enter="submitToken"
          />
        </div>
      </div>></template>
      <template #footer><div>
        <input
          type="button"
          class="primary-button"
          value="Submit"
          v-on:click="submitToken"
        />
      </div></template>
    </modal>
  </div>
</template>

<script>
import AmpHeader from "@/components/shared/AmpHeader.vue";
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
      userPass: null,
      valid: true,
    };
  },
  computed: {},
  methods: {
    async submitToken() {
      this.valid = await auth_token_valid(null, this.datasetUrl, this.userPass, this.authString);
      console.log("TokenValidator.submitToken: valid = " + this.valid);
      if (this.valid) {
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
