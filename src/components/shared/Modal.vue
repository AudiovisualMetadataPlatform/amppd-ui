<template>
  <div
    class="modal modal-open fade bd-example-modal-lg show"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    style="padding-right: 17px; display: block"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header my-modal-header">
          <slot name="header"> </slot>
        </div>
        <div class="modal-body my-modal-body">
          <slot name="body"> </slot>
        </div>
        <div class="modal-footer my-modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-info" @click="close()">
              Close
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "modal",
  data() {
    return {};
  },
  computed: {},
  methods: {
    close() {
      this.searchWord = "";
      this.$emit("close");
    },
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";

.my-modal-header {
  padding: 0.3rem 0.7rem;
}

.my-modal-body {
  height: fit-content;
  width: fit-content;
  max-height: 500px;
  max-width: 800px;
  overflow-y: auto;
  overflow-y: auto;
}

.my-modal-footer {
}

.input-text {
  height: calc(2.25rem + 1px);
  padding: 0.7rem 0.5rem;
  width: 90%;
}

.search-button {
  width: 10%;
  height: calc(2.25rem + 1px);
}
</style>
