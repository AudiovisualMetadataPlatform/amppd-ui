<template>
  <div>
    <div class="file-selection ">
      <div class="sub-header-container">
        <span class="section-title"
          >Content Files to include in batch WF submission</span
        >
        <i id="addFile" class="fa fa-plus" v-on:click="showModal"></i>
      </div>
      <div class="file-container">
        <div
          v-for="(file, index) in files"
          v-bind:key="index"
          class="file"
          href="javascript:void(0)"
        >
          <span class="file-name">{{ file.name }}</span>
          <i
            class="remove-file fa fa-minus-circle"
            v-on:click="deleteFile(file.id)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
export default {
  name: "FileSelection",
  components: {},
  props: {},
  data() {
    return {
      isModalVisible: false,
      fileIndex: 1,
    };
  },
  computed: {
    files: sync("files"),
    isWorkflowModalVisible: sync("isWorkflowModalVisible"),
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      this.isWorkflowModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteFile(id) {
      let self = this;
      for (var i = 0; i < self.files.length; i++) {
        if (self.files[i].id === id) {
          self.files.splice(i, 1);
        }
      }
    },
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
</style>
