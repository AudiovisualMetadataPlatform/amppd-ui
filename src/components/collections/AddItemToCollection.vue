<template>
  <div class="collection">
    <div class="container col-12">
      <div class="row expand-h">
        <Sidebar />
        <div class="col-10 bg-light-gray-1">
          <main>
            <Logout />
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <h1 class="card-title">Add Item</h1>
                      <p>
                        Adding Item to Collection:
                        <strong>{{ collectionDetails.name }}</strong>
                      </p>
                    </div>
                  </div>

                  <form>
                    <div class="form-group">
                      <label for="item-name">Item Name</label>
                      <input
                        v-model="itemName"
                        type="text"
                        class="form-control"
                        id="item-name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        id="description"
                        class="form-control"
                        v-model="description"
                      ></textarea>
                    </div>

                    <!-- <div class="form-row marg-b-2">
                      <div class="col">
                        <label for="created-by">Created by</label>
                        <input
                          type="text"
                          class="form-control"
                          id="created_by"
                          value="created_by"
                          disabled
                        />
                      </div>
                      <div class="col">
                        <label for="create-date">Date Created</label>
                        <input
                          type="date"
                          class="form-control"
                          id="create_date"
                          value="2017-12-01"
                          disabled
                        />
                      </div>
                    </div> -->

                    <!-- <div class="form-row marg-b-2">
                      <div class="col">
                        <label for="created-by">Modified by</label>
                        <input
                          type="text"
                          class="form-control"
                          id="modified_by"
                          value="Modified by"
                          disabled
                        />
                      </div>
                      <div class="col">
                        <label for="create-date">Modified Date </label>
                        <input
                          type="date"
                          class="form-control"
                          id="modified_date"
                          value="2019-06-01"
                          disabled
                        />
                      </div>
                    </div> -->

                    <div class="form-row marg-b-2">
                      <div class="col">
                        <label for="created-by">External Source</label>
                        <input
                          type="text"
                          class="form-control"
                          id="external_source"
                          v-model="externalSource"
                        />
                      </div>
                      <div class="col">
                        <label for="create-date">External Id</label>
                        <input
                          type="text"
                          class="form-control"
                          id="external_id"
                          value="external_id"
                          v-model="externalId"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 marg-b-2">
                        <!-- Progress Bar -->

                        <!-- Upload Finished -->
                        <div class="js-upload-finished">
                          <h4>Files</h4>

                          <div class="table-responsive">
                            <table
                              id="myTable"
                              data-detail-view="true"
                              class="table"
                            >
                              <thead>
                                <tr>
                                  <th data-sortable="false" data-field="id">
                                    File Label
                                  </th>
                                  <th data-sortable="false" data-field="id">
                                    Filename
                                  </th>
                                  <th data-sortable="false" data-field="type">
                                    Description
                                  </th>

                                  <th data-sortable="false" data-field="file">
                                    <span class="sr-only">Remove</span>
                                  </th>
                                </tr>
                                <!-- -->
                              </thead>
                              <tbody>
                                <tr v-if="displayFileName.length > 0">
                                  <td>
                                    <input
                                      type="text"
                                      value="Ei erant clita doctus usu"
                                      class="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      :value="displayFileName"
                                      class="form-control"
                                      disabled
                                    />
                                  </td>
                                  <td>
                                    <input type="text" class="form-control" />
                                  </td>

                                  <td>
                                    <button
                                      class="
                                        btn btn-link
                                        add-remove
                                        float-right
                                      "
                                    >
                                      <svg
                                        class="icon-minus"
                                        version="1.1"
                                        id="Layer_2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 311.5 311.5"
                                        style="
                                          enable-background: new 0 0 311.5 311.5;
                                        "
                                        xml:space="preserve"
                                      >
                                        <path
                                          class="circle-stroke"
                                          d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                  M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"
                                        ></path>
                                        <path
                                          class="minus-stroke"
                                          d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"
                                        ></path>
                                        <path
                                          class="plus-stroke"
                                          d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"
                                        ></path>
                                      </svg>
                                      Remove file
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!-- // -->

                          <!-- sdiv class="list-group">


                          <p class="list-group-item list-group-item-success"> <a href="#"><span class="badge alert-success pull-right">Aug 24, 2021 07:12:12 AM</span>amended-catalogue.mp3</a><button class="btn btn-link add-remove float-right">
                              <svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;"
                                xml:space="preserve">
                                <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                                <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                                <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                              </svg>
                              Remove file</button> </p>


                              <p class="list-group-item list-group-item-success"> <a href="#"><span class="badge alert-success pull-right">Aug 24, 2021 07:15:32 AM</span>amended-catalogue-03.mp3</a><button class="btn btn-link add-remove float-right">
                                  <svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;"
                                    xml:space="preserve">
                                    <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                                    <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                                    <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                                  </svg>
                                  Remove file</button></p>

                              <p class="list-group-item list-group-item-success"> <a href="#"><span class="badge alert-success pull-right">Aug 24, 2021 07:29:18 AM</span>amended-catalogue-13.mp3</a><button class="btn btn-link add-remove float-right">
                                  <svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;"
                                    xml:space="preserve">
                                    <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
              M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                                    <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                                    <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                                  </svg>
                                  Remove file</button></p>



                              <p class="list-group-item list-group-item-warning"> <a href="#" class=""><span class="badge  pull-right">Aug 24, 2021 07:39:16 AM</span>amended-catalogue-11s.mp3</a><button class="btn btn-link add-remove float-right">
                                  <svg class="icon-minus" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 311.5 311.5" style="enable-background:new 0 0 311.5 311.5;"
                                    xml:space="preserve">
                                    <path class="circle-stroke" d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
            M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"></path>
                                    <path class="minus-stroke" d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"></path>
                                    <path class="plus-stroke" d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"></path>
                                  </svg>
                                  Remove file</button> </p>







                        </div -->

                          <div v-if="progressInfos" class="marg-t-2 marg-b-2">
                            <small>Upload progress </small><br />
                            <div
                              class="progress"
                              v-for="(progressInfo, index) in progressInfos"
                              :key="index"
                            >
                              <div
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                :style="{
                                  width: progressInfo.percentage + '%',
                                }"
                              >
                                <span class="sr-only">{{
                                  progressInfo.percentage
                                }}</span>
                              </div>
                            </div>
                          </div>

                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <strong>Upload files</strong>
                            </div>
                            <div class="panel-body">
                              <div class="input-group image-preview">
                                <input
                                  type="file"
                                  class="form-control-file btn btn-light btn-lg"
                                  id="exampleFormControlFile1"
                                  ref="inputFile"
                                  value="Upload batch manifest"
                                  :disabled="inProgress"
                                  v-bind="filename"
                                  @change="
                                    filesChange(
                                      $event.target.name,
                                      $event.target.files
                                    );
                                    fileCount = $event.target.files.length;
                                  "
                                />
                              </div>
                              <!-- /input-group image-preview [TO HERE]-->

                              <br />

                              <!-- Drop Zone -->
                              <div class="upload-drop-zone" id="drop-zone">
                                Or drag and drop files here
                              </div>
                              <button type="button" @click="uploadFiles()">
                                upload files
                              </button>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between w-100">
                      <div>
                        <button
                          type="button"
                          @click="clear"
                          class="btn btn btn-outline btn-lg marg-all-1"
                        >
                          Clear
                        </button>
                      </div>
                      <div class="float-right">
                        <button
                          :disabled="disabled"
                          class="btn marg-all-1 btn btn-outline btn-lg"
                          @click="addNewItem"
                        >
                          <svg
                            class="icon-plus"
                            version="1.1"
                            id="Layer_2"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 311.5 311.5"
                            style="enable-background: new 0 0 311.5 311.5"
                            xml:space="preserve"
                          >
                            <path
                              class="circle-stroke"
                              d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"
                            />
                            <path
                              class="minus-stroke"
                              d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"
                            />
                            <path
                              class="plus-stroke"
                              d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"
                            />
                          </svg>

                          Add another item
                        </button>

                        <button
                          type="button"
                          v-if="
                            externalId != null &&
                            itemName != null &&
                            description != null &&
                            externalSource != null
                          "
                          class="marg-all-1 btn btn-primary btn-lg"
                          @click="addItem()"
                        >
                          Save
                        </button>
                        <button
                          disabled
                          v-else
                          class="marg-all-1 btn btn-primary btn-lg"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import UploadFilesService from "../../service/upload-file-service.js";
import CollectionDetailsItemCard from "./CollectionDetailsItemCard.vue";
import CollectionService from "../../service/collection-service.js";
// import Logout from "../shared/Logout.vue";

export default {
  name: "AddItemToCollection",
  components: {
    Sidebar,
    Logout,
    CollectionDetailsItemCard,
  },
  props: {
    // collectionDetails: Object,
  },
  data() {
    return {
      CollectionService: new CollectionService(),
      UploadFilesService: new UploadFilesService(),
      externalId: null,
      itemName: null,
      description: null,
      externalSource: null,
      disabled: true,
      // selectedFiles: undefined,
      progressInfos: [],
      // fileInfos: [],

      filename: "",
      batchSubmitted: false,
      uploadError: null,
      fileCount: 0,
      formData: new FormData(),
      displayFileName: "",
      // displayFileNameEnabled: false,
      unitName: "",

      inProgress: false,
      errors: [],
    };
  },
  computed: {
    collectionDetails: sync("collectionDetails"),
  },
  methods: {
    async filesChange(fieldName, fileList) {
      // handle file changes
      this.formData = new FormData();

      // This is another possible solution.  Read file on client side and submit as string
      // const reader = new FileReader();
      // reader.onload = e => console.log(e.target.result);
      // reader.readAsText(fileList[0]);

      // append the files to FormData
      for (var x = 0; x < fileList.length; x++) {

        this.displayFileName = fileList[x].name;

        this.formData.append("file", fileList[x], fileList[x].name);
      }
      this.formData.append("unitName", this.unitName);
    },

    uploadFiles() {
      this.upload(this.formData);
    },

    async upload(formData) {
      this.progressInfos = { percentage: 0, fileName: this.displayFileName };

      this.UploadFilesService.upload(formData, (event) => {
        this.progressInfos.percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;

          // return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos.percentage = 0;
          this.message = "Could not upload the file:" + this.displayFileName;
        });
    },

    selectFile() {
      let self = this;
      self.progressInfos = [];
      self.selectedFiles = event.target.files;
    },
    addNewItem() {
      let self = this;
      self.externalId = null;
      self.itemName = null;
      self.description = null;
      self.externalSource = null;
      self.disabled = true;
    },
    clear() {
      event.stopPropagation();
      let self = this;
      self.externalId = null;
      self.itemName = null;
      self.description = null;
      self.externalSource = null;
    },
    async addItem() {
      let self = this;
      let ItemDetails = {
        name: self.itemName,
        description: self.description,
        externalSource: self.externalSource,
        externalId: self.externalId,
        collection: self.collectionDetails._links.self.href,
      };
      this.CollectionService.addItem(ItemDetails).then((response) => {
        self.disabled = false;
      });
    },
  },
  mounted() {
    this.unitName = process.env.VUE_APP_AMP_UNIT;
    console.log("reached batchingest.vue");
    console.log("unitName = " + this.unitName);
  },
};
</script>

<style >
</style>