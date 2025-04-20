<template>
  <div class="w-100">
    <loader :show="showLoader" />
    <b-card class="text-start">
      <h2 class="mb-3">Content Files</h2>
      <table
        class="table"
        v-if="
          primaryFiles._embedded.primaryfiles &&
            primaryFiles._embedded.primaryfiles.length
        "
      >
        <thead>
          <tr>
          <th>File Label</th>
          <th>Filename</th>
          <th>Description</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(file, index) in primaryFiles._embedded.primaryfiles"
            :key="file.id"
          >
            <td>
              <input
                v-model="file.name"
                type="text"
                class="w-100 form-control"
                :disabled="!(file.file && accessControl._primaryfile._create)"
              />
            </td>
            <td>
              <input
                v-model="file.originalFilename"
                type="text"
                class="w-100 form-control"
                :disabled="true"
              />
            </td>
            <td>
              <input
                v-model="file.description"
                type="text"
                class="w-100 form-control"
                :disabled="!(file.file && accessControl._primaryfile._create)"
              />
            </td>
            <td>
              <button
                class="btn btn-primary btn float-end"
                @click="onView(file)"
                v-if="!file.file && accessControl._primaryfile._read"
              >
                View
              </button>
              <button
                class="btn btn-primary btn float-end"
                @click="saveFile(file, index)"
                v-if="file.file && accessControl._primaryfile._create"
              >
                Save
              </button>
              <button
                class="btn btn-danger float-end me-2"
                v-if="accessControl._primaryfile._delete"
                :disabled="file.id && !file.deletable"
                @click="deleteFile(index)"
              >
                Delete File
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-2 mb-2" v-if="false">
        <small>Upload progress</small>
        <br />
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 60%"
          >
            <span class="visually-hidden">60% Complete</span>
          </div>
        </div>
      </div>

      <div
        class="mt-3 panel panel-default"
        v-if="accessControl._item._update"
        @dragover.prevent
        @drop.prevent
      >
        <div class="panel-heading"
          v-if="accessControl._primaryfile._create"
        >
          <strong>Upload files</strong>
        </div>
        <div class="panel-body"
          v-if="accessControl._primaryfile._create"
        >
          <div class="d-flex mt-3">
            <div class="p-0 me-1 w-100">
              <input
                type="file"
                class="btn btn-light btn-lg w-100"
                ref="fileupload"
                @change="getFile"
              />
            </div>
            <div class="p-0 align-self-center">
              <button
                class="btn btn-primary btn-lg float-end"
                @click="uploadFile()"
                :disabled="dropFiles.length > 0"
              >
                Upload
              </button>
            </div>
          </div>

          <!-- /input-group image-preview [TO HERE]-->

          <br />

          <!-- Drop Zone -->
          <div class="upload-drop-zone" id="drop-zone" @drop="getDropFile">
            <span>Or drag and drop files here</span>
          </div>
          <br />
        </div>
      </div>
    </b-card>
    <!-- Remove file confirmation modal -->
    <b-modal 
      ref="confirmModal" 
      title="Confirmation" 
      @ok="handleConfirmModal(true)" 
      @cancel="handleConfirmModal(false)"
      centered
      size="md"
      footerClass="p-2"
    >
      <div v-if="deleteWarnings.statistics">
			  <p>{{ deleteWarnings.header }}</p>
        <ul>
          <li v-for="(entityCount) in deleteWarnings.statistics">
            {{ entityCount }}
          </li>
        </ul>
		  </div>
			<p>{{ deleteWarnings.question }} </p>
      <template #footer="{ ok, cancel }">
        <button type="button" class="btn btn-secondary btn-sm" @click="cancel();">No</button>
        <button type="button" class="btn btn-primary btn-sm" @click="ok();">Yes</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import { env } from "../../helpers/env";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import Loader from "@/components/shared/Loader.vue";
import ItemService from "../../service/item-service";
import PrimaryFileService from "../../service/primary-file-service";
import SharedService from "../../service/shared-service";
import config from "../../assets/constants/common-contant.js";

export default {
  Name: "ItemFiles",
  components: {
    Logout,
    Sidebar,
    Loader,
  },
  props: {},
  data() {
    return {
      fileService: new PrimaryFileService(),
      itemService: new ItemService(),
      sharedService: new SharedService(),
      showEdit: true,
      removeIcon: config.common.icons["remove"],
      files: [],
      showLoader: false,
      dropFiles: [],
      fileStatistics: {}, // DataentityStatistics for the primaryfile to be deleted
      // warnings to display in confirmation modal upon file deletion 
      deleteWarnings: { header: null, statistics: null, question: null },
      // object to hold info of the file to be removed
      fileToRemove: { file: null, index: null }
      // dropFileName: ""
    };
  },
  computed: {
    Items: sync("Items"),
    selectedItem: sync("selectedItem"),
    selectedCollection: sync("selectedCollection"),
    primaryFiles: sync("primaryFiles"),
    selectedFile: sync("selectedFile"),
    accessControl: sync("accessControl"),
    isCreatePage() {
      return window.location.href.toLowerCase().indexOf("add-item") > -1;
    },
  },
  methods: {
    getDeleteWarnings(fileStatistics) {
      let statistics = [], header = '', question = '';
      if (fileStatistics.countPrimaryfileSupplements) { 
        statistics.push(fileStatistics.countPrimaryfileSupplements + " primaryfile supplements");
      }
      if (fileStatistics.countWorkflowResults) { 
        statistics.push(fileStatistics.countWorkflowResults + " workflow results");
      }
      if (fileStatistics.countMgmEvaluationTests) { 
        statistics.push(fileStatistics.countMgmEvaluationTests + " evaluation test results");
      }
      if (statistics.length) {
        header = "Deleting this file will also delelte the following associated data:";
        question = "Do you want to continue?";
      }
      else {
        question = "Are you sure you want to delete this file?";
      }
      console.log("getDeleteWarnings question: " + question);
      return {header, statistics, question};
    },
    onCancel() {
      var result = confirm("Are you sure you want to cancel?");
      if (result) this.showEdit = !this.showEdit;
    },
    async getPrimaryFiles() {
      const self = this;
      self.fileService
        .getPrimaryFiles(self.selectedItem.id)
        .then((response) => {
          self.primaryFiles = response.data;
          if (self.primaryFiles) {
            self.primaryFiles._embedded.primaryfiles = self.sharedService.sortByAlphabatical(
              self.primaryFiles._embedded.primaryfiles
            );
          }
          console.log("ItemFiles.getPrimaryFiles: done for item " + self.selectedItem.id);
        });
    },
    getFile(e) {
      const self = this;
      self.files = e.target.files || e.dataTransfer.files;
    },
    getDropFile(e) {
      const self = this;
      self.dropFiles = e.dataTransfer.files;
      this.uploadFile();
    },
    uploadFile() {
      const self = this;
      const sourceFiles =
        self.files && self.files.length ? self.files : self.dropFiles;
      const source = Object.keys(sourceFiles).map((key) => sourceFiles[key]);
      source.forEach((file) => {
        const primaryFile = {
          name: file.name,
          originalFilename: file.name,
          description: "",
          file: file,
          id: file.filename,
        };
        self.primaryFiles._embedded.primaryfiles.push(primaryFile);
      });
      self.files = [];
      self.dropFiles = [];
      this.$refs.fileupload.value = "";
      self.dropFileName = "";
    },
    saveFile(data, index) {
      const self = this;
      if (!self.selectedItem.id && !self.selectedItem.selectedItemId) {
        self.$toast.error(
          "Item details cannot be found to add content file",
          self.sharedService.toastNotificationConfig
        );
        return;
      } else if (!self.selectedItem.id && self.selectedItem.selectedItemId) {
        self.selectedItem.id = self.selectedItem.selectedItemId;
        console.log("saveFile: selectedItem id is " + self.selectedItem.id);
      }

      const formData = new FormData();
      formData.append(
        "primaryfile",
        new Blob(
          [
            JSON.stringify({
              name: data.name,
              originalFilename: data.originalFilename,
              description: data.description,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      formData.append("mediaFile", data.file);
      self.showLoader = true;
      this.fileService
        .uploadFile(self.selectedItem.id, formData)
        .then((el) => {
          self.showLoader = false;
          self.primaryFiles._embedded.primaryfiles[index] = el.data;
          console.log("Saved file " + self.primaryFiles._embedded.primaryfiles[index]);
        })
        .catch((error) => {
          self.showLoader = false;
          if (
            error.response &&
            error.response.data &&
            error.response.data.validationErrors
          ) {
            const errorMessages = self.sharedService.extractErrorMessage(
              error.response.data.validationErrors
            );
            errorMessages.map((el) =>
              self.$toast.error(el, self.sharedService.toastNotificationConfig)
            );
            console.log("saveFile validationErrors: " + errorMessages);
          } else {
            self.$toast.error(
              "Something went wrong.Please try again!",
              self.sharedService.toastNotificationConfig
            );
            console.log("saveFile errors: " + error);
          }
        });
    },
    deleteFile(index) {
      const self = this;
      if (self.primaryFiles._embedded.primaryfiles[index].file)
        self.primaryFiles._embedded.primaryfiles.splice(index, 1);
      else
        this.onRemovePrimaryFile(
          self.primaryFiles._embedded.primaryfiles[index],
          index
        );
    },
    onSaveItem() {
      const self = this;
      if (self.isCreatePage) {
        self.selectedItem = {
          ...self.selectedItem,
          collection:
            env.getAmpUrl() + `/collections/${self.selectedCollection.id}`,
        };
        self.itemService
          .addItemToCollection(self.selectedItem)
          .then((reponse) => {
            self.$toast.success("Item added successfully", self.sharedService.toastNotificationConfig);
            self.$router.push("/collection/details");
          })
          .catch((error) => {
            self.$toast.error("Failed to add an Item", self.sharedService.toastNotificationConfig);
          });
      } else {
        self.itemService
          .updateItem(self.selectedItem)
          .then((reponse) => {
            self.$toast.success("Item updated successfully", self.sharedService.toastNotificationConfig);
          })
          .catch((error) => {
            self.$toast.error("Failed to add an Item", self.sharedService.toastNotificationConfig);
          });
      }
    },
    onView(file) {
      this.selectedFile = file;
      if (this.selectedItem.parentType === "item-search") {
        this.$router.push("/collections/items/item-search/details/file");
      } else {
        this.$router.push("/collections/file");
      }
    },
    async onRemovePrimaryFile(file, index) {
      // Set file info for the current file chosen to be removed
      this.fileToRemove = { file, index }
      this.fileStatistics = await this.fileService.getPrimaryfileStatistics(file.id);
      console.log("onRemovePrimaryFile: " + this.fileStatistics);
      this.deleteWarnings = this.getDeleteWarnings(this.fileStatistics);
      this.$refs.confirmModal.show();
    },
    async handleConfirmModal(confirmed) {
      const self = this;
      const { file, index } = self.fileToRemove;
      console.log("handleConfirmModal: confirmed = " + confirmed + ", file = " + file + ", index = " + index);
      // When clicked on 'Yes', and info of file to be removed are available remove file
      if (confirmed && file) {
        console.log("Removing file " + file + " at index " + index);
        self.showLoader = true;
        self.fileService
          .deletePrimaryFile(file.id)
          .then((success) => {
            self.showLoader = false;
            self.primaryFiles._embedded.primaryfiles.splice(index, 1);
            self.$toast.success(
              "Content file has been removed successfully.",
              self.sharedService.toastNotificationConfig
            );
          })
          .catch((err) => {
            self.showLoader = false;
            self.$toast.error(
              "Unable to remove a content file. Please try again later!",
              self.sharedService.toastNotificationConfig
            );
          });
      } else {
        console.log("Removing file action cancelled.");
        // When clicked on 'No', hide the modal
        this.$refs.confirmModal.hide();
      }
    },
  },
  beforeMount() {
    const self = this;
    if (self.isCreatePage) {
      self.selectedItem.id = null;
      self.primaryFiles._embedded.primaryfiles = [];
    }
  },
  mounted() {
    const self = this;
    if (self.selectedItem && self.selectedItem.id) self.getPrimaryFiles();
  },
};
</script>

<style>
.upload-drop-zone {
  color: #ccc;
  border-style: dashed;
  border-color: #ccc;
  line-height: 200px;
  text-align: center;
  height: 200px;
  border-width: 2px;
  margin-bottom: 20px;
}
.progress {
  display: -ms-flexbox;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}
.progress-bar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width 0.6s ease;
}

</style>
