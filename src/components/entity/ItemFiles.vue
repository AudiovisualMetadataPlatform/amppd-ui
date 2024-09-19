<template>
  <div class="w-100">
    <loader :show="showLoader" />
    <b-card class="text-left">
      <h2 class="mb-3">Content Files</h2>
      <table
        class="table"
        v-if="
          primaryFiles._embedded.primaryfiles &&
            primaryFiles._embedded.primaryfiles.length
        "
      >
        <thead>
          <th>File Label</th>
          <th>Filename</th>
          <th>Description</th>
          <th></th>
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
                class="btn btn-primary btn float-right"
                @click="onView(file)"
                v-if="!file.file && accessControl._primaryfile._read"
              >
                View
              </button>
              <button
                class="btn btn-primary btn float-right"
                @click="saveFile(file, index)"
                v-if="file.file && accessControl._primaryfile._create"
              >
                Save
              </button>
              <button
                class="btn btn-link add-remove float-right mr-1"
                v-if="accessControl._primaryfile._delete"
                @click="removeFile(index)"
              >
                <span v-html="removeIcon" class="pr-1"></span>Remove File
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
            <span class="sr-only">60% Complete</span>
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
          <div class="d-flex w-100 mt-3">
            <div class="input-group image-preview col-11 p-0 mr-1">
              <!-- <label for="exampleFormControlFile1" class="form-control-file btn btn-light btn-lg"><button>Browse</button></label> -->
              <input
                type="file"
                class="form-control-file btn btn-light btn-lg"
                id="exampleFormControlFile1"
                value="Upload"
                ref="fileupload"
                @change="getFile"
              />
            </div>
            <div class="col-1 p-0" style="padding: 5px !important;">
              <button
                class="btn btn-primary btn-lg float-right"
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
      return window.location.hash.toLowerCase().indexOf("add-item") > -1;
    },
  },
  methods: {
    onCancel() {
      var result = confirm("Are you sure want to cancel!");
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
        });
    },
    getFile(e) {
      const self = this;
      self.files = e.target.files || e.dataTransfer.files;
    },
    getDropFile(e) {
      const self = this;
      self.dropFiles = e.dataTransfer.files;
      //  self.dropFileName = self.dropFiles[0].name;
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
        self.$bvToast.toast(
          "Item details cannot be found to add content file",
          self.sharedService.erorrToastConfig
        );
        return;
      } else if (!self.selectedItem.id && self.selectedItem.selectedItemId) {
        self.selectedItem.id = self.selectedItem.selectedItemId;
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
          this.$set(self.primaryFiles._embedded.primaryfiles, index, el.data);
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
              self.$bvToast.toast(el, self.sharedService.erorrToastConfig)
            );
          } else {
            self.$bvToast.toast(
              "Something went wrong.Please try again!",
              self.sharedService.erorrToastConfig
            );
          }
        });
    },
    removeFile(index) {
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
            self.$bvToast.toast("Item added successfully", {
              title: "Notification",
              appendToast: true,
              variant: "success",
              autoHideDelay: 5000,
            });
            self.$router.push("/collection/details");
          })
          .catch((error) => {
            self.$bvToast.toast("Failed to add an Item", {
              title: "Notification",
              appendToast: true,
              variant: "danger",
              autoHideDelay: 5000,
            });
          });
      } else {
        self.itemService
          .updateItem(self.selectedItem)
          .then((reponse) => {
            self.$bvToast.toast("Item updated successfully", {
              title: "Notification",
              appendToast: true,
              variant: "success",
              autoHideDelay: 5000,
            });
          })
          .catch((error) => {
            self.$bvToast.toast("Failed to add an Item", {
              title: "Notification",
              appendToast: true,
              variant: "danger",
              autoHideDelay: 5000,
            });
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
      const self = this;
      const confirmMessage = await self.sharedService.showConfirmationWindow(
        self.$bvModal
      );
      if (confirmMessage) {
        self.showLoader = true;
        self.fileService
          .removePrimaryFile(file.id)
          .then((success) => {
            self.showLoader = false;
            self.primaryFiles._embedded.primaryfiles.splice(index, 1);
            self.$bvToast.toast(
              "Content file has been removed successfully.",
              self.sharedService.successToastConfig
            );
          })
          .catch((err) => {
            self.showLoader = false;
            self.$bvToast.toast(
              "Unable to remove a content file. Please try again later!",
              self.sharedService.erorrToastConfig
            );
          });
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
.btn-primary {
  background: #f4871e !important;
  border-color: #f4871e !important;
  color: #153c4d !important;
}

.btn-primary:hover,
.btn-secondary:hover,
.btn-outline-primary:hover {
  background: #153c4d !important;
  border-color: #153c4d v;
  color: #fff !important;
}
</style>
