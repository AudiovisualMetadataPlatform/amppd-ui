<template>
  <div>
    <loader :show="superLoading ? superLoading : loading" />
    <form>
      <div
        v-if="action !== 'view' || action === 'replace'"
        class="marg-t-2 panel panel-default hidden-container"
      >
        <div class="panel-heading"><strong>Upload files</strong></div>
        <div class="panel-body">
          <div class="mb-4 file-upload bg-light-gray-1">
            <label for="file-upload" class="file-upload-box">
              <input
                type="file"
                class="form-control-file btn btn-light btn-lg"
                id="exampleFormControlFile1"
                value="upload"
                @change="filesChange"
              />
            </label>
          </div>
        </div>
      </div>

      <div id="upload-details-body">
        <div class="marg-t-3 panel panel-default">
          <div class="hidden-container">
            <div>
              <hr />
              <div class="row">
                <div class="col-12 marg-b-1">
                  <label for="item-name">File Name</label>
                  <input
                    v-if="action === 'add' || action === 'replace'"
                    type="text"
                    class="form-control"
                    id="upload-name"
                    v-model="supplement.fileDetails.originalFilename"
                    disabled
                  />
                  <div v-else-if="action === 'view'" class="input-group">
                    <input
                      type="text"
                      class="form-control input-replace"
                      id="upload-name"
                      v-model="supplement.fileDetails.originalFilename"
                      disabled
                    />
                    <span class="input-group-btn">
                      <button
                        class="btn btn-outline btn-right add-remove float-right button-replace"
                        id="replaceFile"
                        @click="replaceFile($event)"
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
                          style="enable-background:new 0 0 311.5 311.5;"
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
                        Replace file
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-3 row">
                <div class="form-group  col-6">
                  <label for="sup-item-name">Supplemental File Name*</label>
                  <input
                    type="text"
                    class="form-control"
                    id="sup-item-name"
                    v-model="supplement.fileDetails.name"
                    autocomplete="off"
                    required
                    :class="{
                      'error-border': submitted && !supplement.fileDetails.name,
                    }"
                  />
                </div>
                <div class="form-group col-6">
                  <label for="category-name">Category*</label>
                  <select
                    class="select custom-select w-100"
                    v-model="supplement.fileDetails.category"
                    required
                    :class="{
                      'error-border':
                        submitted && !supplement.fileDetails.category,
                    }"
                  >
                    <option value="" disabled selected
                      >- Choose Category -</option
                    >
                    <option
                      v-for="option in configProperties.supplementCategories"
                      :key="option"
                      >{{ option }}</option
                    >
                  </select>
                </div>
              </div>
              <div class="row marg-b-2">
                <div class="col-12">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    class="form-control textArea"
                    v-model="supplement.fileDetails.description"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="form-group col-6">
            <label for="unit-name">Unit*</label>
            <select
              v-if="allUnits && allUnits._embedded"
              class="select custom-select w-100"
              v-model="supplement.fileDetails.unit"
              @change="onInputChange('unit')"
              :disabled="!supplement.showUnitList"
              required
              :class="{
                'error-border': submitted && !supplement.fileDetails.unit,
              }"
              ><option value="" disabled selected>- Choose Unit -</option>
              <option
                v-for="option in allUnits._embedded.units"
                :key="option.id"
                :value="option.id"
                >{{ option.name }}</option
              >
            </select>
          </div>
          <div class="form-group  col-6">
            <label for="collection-name">Collection</label>
            <select
              class="select custom-select w-100"
              v-model="supplement.fileDetails.collection"
              @change="onInputChange('collection')"
              :disabled="!supplement.showCollectionList"
              ><option value="" disabled selected>- Choose Collection -</option>
              <option
                v-for="option in supplement.collectionList"
                :key="option.id"
                :value="option.id"
                >{{ option.name }}</option
              >
            </select>
          </div>
        </div>
        <div class="row">
          <div class="form-group  col-6">
            <label for="item-name">Item</label>
            <select
              class="select custom-select w-100"
              v-model="supplement.fileDetails.item"
              @change="onInputChange('item')"
              :disabled="!supplement.showItemList"
              ><option value="" disabled selected>- Choose Item -</option>
              <option
                v-for="option in supplement.itemList"
                :key="option.id"
                :value="option.id"
                >{{ option.name }}</option
              >
            </select>
          </div>
          <div class="form-group  col-6">
            <label for="primary-file-name">Primary File</label>
            <select
              class="select custom-select w-100"
              v-model="supplement.fileDetails.primaryFile"
              @change="onInputChange('primaryFile')"
              :disabled="!supplement.showPrimaryFileList"
              ><option value="" disabled selected
                >- Choose Primary File -</option
              >
              <option
                v-for="option in supplement.primaryFileList"
                :key="option.id"
                :value="option.id"
                >{{ option.name }}</option
              >
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="created-by">Created by</label>
            <input
              type="text"
              class="form-control"
              id="created_by"
              v-model="supplement.fileDetails.createdBy"
              disabled
            />
          </div>
          <div class="col">
            <label for="create-date">Date Created</label>
            <input
              type="text"
              class="form-control"
              id="create_date"
              :value="supplement.fileDetails.createdDate | LOCAL_DATE_VALUE"
              disabled
            />
          </div>
          <div class="col">
            <label for="modified-by">Modified by</label>
            <input
              type="text"
              class="form-control"
              id="modified_by"
              v-model="supplement.fileDetails.modifiedBy"
              disabled
            />
          </div>
          <div class="col">
            <label for="modified-date">Modified Date </label>
            <input
              type="text"
              class="form-control"
              id="modified_date"
              :value="supplement.fileDetails.modifiedDate | LOCAL_DATE_VALUE"
              disabled
            />
          </div>
        </div>
        <button
          class="marg-tb-1 mt-2 float-right  btn btn-primary btn-lg btn-edit"
          @click="saveFile($event, supplement.fileDetails)"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import UnitService from "@/service/unit-service";
import ItemService from "@/service/item-service";
import CollectionService from "@/service/collection-service";
import PrimaryFileService from "@/service/primary-file-service";
import SupplementService from "@/service/supplement-service";
import SharedService from "@/service/shared-service";
import Loader from "@/components/shared/Loader.vue";
import ConfigPropertiesService from "@/service/config-properties-service";

export default {
  name: "AddSupplemental",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      superLoading: false,
      unitService: new UnitService(),
      itemService: new ItemService(),
      sharedService: new SharedService(),
      fileService: new PrimaryFileService(),
      collectionService: new CollectionService(),
      supplementService: new SupplementService(),
      configPropertiesService: new ConfigPropertiesService(),
      supplement: {
        showUnitList: true, //Need to remove: entity update @view page
        showCollectionList: false,
        collectionList: [],
        showItemList: false,
        itemList: [],
        showPrimaryFileList: false,
        primaryFileList: [],
        fileDetails: {
          originalFilename: "",
          unit: "",
          collection: "",
          item: "",
          primaryFile: "",
        },
      },
      action: "add",
      submitted: false,
    };
  },
  computed: {
    allUnits: sync("allUnits"),
    configProperties: sync("configProperties"),
  },
  props: {},
  methods: {
    async networkCalls() {
      const self = this;
      try {
        self.loading = true;
        const configPropertiesResponse = await self.configPropertiesService.getConfigProperties();
        self.configProperties = configPropertiesResponse.data;
        await self.unitService.getAllUnits().then(async (response) => {
          await self.unitService
            .getAllUnits("0", response.data.page.totalElements)
            .then((res) => {
              self.allUnits = res.data;
              self.loading = false;
            });
        });
      } catch (error) {
        self.loading = false;
        console.log(error);
      }
    },

    async viewSupplementNetworkCalls() {
      const self = this;
      try {
        self.superLoading = true;
        console.log(self.supplementType, self.supplementId, self.action);
        if (self.supplementType === "u-sup") {
          self.viewApiType = "unitSupplements";
        } else if (self.supplementType === "c-sup") {
          self.viewApiType = "collectionSupplements";
        } else if (self.supplementType === "i-sup") {
          self.viewApiType = "itemSupplements";
        } else if (self.supplementType === "p-sup") {
          self.viewApiType = "primaryfileSupplements";
        }

        self.supplementService
          .getSupplement(false, self.viewApiType, self.supplementId)
          .then((res) => {
            self.supplement.fileDetails = res;

            //Calling APIs for different entities and their children...
            self.supplementService
              .getSupplement(true, self.viewApiType, self.supplementId)
              .then((r) => {
                switch (self.supplementType) {
                  case "p-sup":
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.supplement.fileDetails.item = r.itemId;
                        self.onInputChange("item").then(() => {
                          self.supplement.fileDetails.primaryFile =
                            r.primaryfileId;
                          self.superLoading = false;

                          //Need to remove: entity update @view page;
                          self.supplement.showCollectionList = false;
                          self.supplement.showItemList = false;
                          self.supplement.showPrimaryFileList = false;
                        });
                      });
                    });
                    self.supplement.fileDetails.primaryFile = r.primaryfileId;
                    break;
                  case "i-sup":
                    console.log(r);
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.supplement.fileDetails.item = r.itemId;
                        self.onInputChange("item").then(() => {
                          self.superLoading = false;

                          //Need to remove: entity update @view page;
                          self.supplement.showCollectionList = false;
                          self.supplement.showItemList = false;
                          self.supplement.showPrimaryFileList = false;
                        });
                      });
                    });
                    break;
                  case "c-sup":
                    console.log(r);
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.superLoading = false;

                        //Need to remove: entity update @view page;
                        self.supplement.showCollectionList = false;
                        self.supplement.showItemList = false;
                      });
                    });
                    break;
                  case "u-sup":
                    self.supplement.fileDetails.unit = res._embedded.unit.id;
                    self.onInputChange("unit").then(() => {
                      self.superLoading = false;

                      //Need to remove: entity update @view page;
                      self.supplement.showCollectionList = false;
                    });
                    break;
                  default:
                    break;
                }
              });
          });
      } catch (error) {
        self.loading = false;
        self.superLoading = false;
        console.log(error);
      }
    },

    filesChange(e) {
      const self = this;
      self.supplement["files"] = e.target.files || e.dataTransfer.files;
      self.supplement[
        "allCategories"
      ] = this.configProperties.supplementCategories;
      self.supplement["allUnits"] = this.allUnits._embedded.units;
      const uploadDetailsBody = document.getElementById("upload-details-body");
      uploadDetailsBody.style.display = "block";

      self.supplement.fileDetails.file = self.supplement.files[0];
      self.supplement.fileDetails.originalFilename =
        self.supplement.files[0].name;
    },

    async onInputChange(type) {
      const self = this;
      self.entityType = type;
      self.entityId = self.supplement.fileDetails[type];
      try {
        switch (type) {
          case "unit":
            self.loading = true;
            await self.collectionService
              .getCollectionByUnitId(self.entityId)
              .then((res) => {
                self.supplement.collectionList = res._embedded.collections;
                self.supplement.fileDetails.collection = "";
                self.supplement.showCollectionList = true;
                self.supplement.showItemList = false;
                self.supplement.itemList = [];
                self.supplement.fileDetails.item = "";
                self.supplement.showPrimaryFileList = false;
                self.supplement.primaryFileList = [];
                self.supplement.fileDetails.primaryFile = "";
                self.loading = false;
              });
            break;
          case "collection":
            self.loading = true;
            await self.itemService
              .getCollectionItems(self.entityId)
              .then((res) => {
                self.supplement.itemList = res.data._embedded.items;
                self.supplement.fileDetails.item = "";
                self.supplement.showItemList = true;
                self.supplement.showPrimaryFileList = false;
                self.supplement.primaryFileList = [];
                self.supplement.fileDetails.primaryFile = "";
                self.loading = false;
              });
            break;
          case "item":
            self.loading = true;
            await self.fileService
              .getPrimaryFiles(self.entityId)
              .then((res) => {
                self.supplement.primaryFileList =
                  res.data._embedded.primaryfiles;
                self.supplement.fileDetails.primaryFile = "";
                self.supplement.showPrimaryFileList = true;
                self.loading = false;
              });
            break;

          default:
            break;
        }
      } catch (error) {
        self.loading = false;
        console.log(error);
      }
    },

    replaceFile(e) {
      const self = this;
      e.preventDefault();
      self.action = "replace";
      self.supplement.fileDetails.originalFilename = "";
    },

    async saveFile(e, data) {
      const self = this;
      e.preventDefault();
      self.submitted = true;
      if (!data.name || !data.category || !self.entityId) {
        self.$bvToast.toast(
          "Please provide required fields!",
          self.sharedService.erorrToastConfig
        );
        return;
      }
      if (self.action === "replace" && !data.file) {
        self.$bvToast.toast(
          "Please choose a file!",
          self.sharedService.erorrToastConfig
        );
        return;
      }

      try {
        self.loading = true;
        if (self.action === "add") {
          //API call for add supplement page
          let apiType = "";
          let formDataKey = "";
          if (self.entityType === "unit") {
            apiType = "units";
            formDataKey = "unitSupplement";
          } else if (self.entityType === "collection") {
            apiType = "collections";
            formDataKey = "collectionSupplement";
          } else if (self.entityType === "item") {
            apiType = "items";
            formDataKey = "itemSupplement";
          } else if (self.entityType === "primaryFile") {
            apiType = "primaryfiles";
            formDataKey = "primaryfileSupplement";
          }
          let formData = new FormData();
          formData.append(
            formDataKey,
            new Blob(
              [
                JSON.stringify({
                  name: data.name,
                  originalFilename: data.originalFilename,
                  description: data.description,
                  category: data.category,
                }),
              ],
              {
                type: "application/json",
              }
            )
          );
          formData.append("mediaFile", data.file);
          await self.supplementService.addSupplement(
            apiType,
            self.entityId,
            formData
          );
          self.loading = false;
          this.$router.push("/supplemental-files");
        } else if (self.action === "replace" || self.action === "view") {
          //API call for view supplement page
          console.log(self.supplementType, self.viewApiType, self.supplementId);
          let formDataKey = "";
          if (self.supplementType === "u-sup") {
            formDataKey = "unitSupplement";
          } else if (self.supplementType === "c-sup") {
            formDataKey = "collectionSupplement";
          } else if (self.supplementType === "i-sup") {
            formDataKey = "itemSupplement";
          } else if (self.supplementType === "p-sup") {
            formDataKey = "primaryfileSupplement";
          }
          let updatedFormData = new FormData();
          updatedFormData.append(
            formDataKey,
            new Blob(
              [
                JSON.stringify({
                  originalFilename: data.originalFilename,
                }),
              ],
              {
                type: "application/json",
              }
            )
          );
          updatedFormData.append("file", data.file);

          const updatedData = {
            name: data.name,
            description: data.description,
            category: data.category,
          };

          if (self.action === "replace") {
            //API call in the case: file + data update
            await self.supplementService
              .updateSupplementFile(
                self.viewApiType,
                self.supplementId,
                updatedFormData
              )
              .then((res) => {
                self.supplementService.updateSupplement(
                  self.viewApiType,
                  self.supplementId,
                  updatedData
                );
              });
          } else if (self.action === "view") {
            //API call in the case: data update
            await self.supplementService.updateSupplement(
              self.viewApiType,
              self.supplementId,
              updatedData
            );
          }

          self.loading = false;
          this.$router.push("/supplemental-files");
        }
      } catch (error) {
        self.loading = false;
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
      }
    },
  },
  mounted() {
    const self = this;
    self.networkCalls();
    self.supplementType = self.$route.params.supplementType;
    self.supplementId = self.$route.params.supplementId;
    if (self.supplementType && self.supplementId) {
      self.action = "view";
      const uploadDetailsBody = document.getElementById("upload-details-body");
      uploadDetailsBody.style.display = "block";
      self.viewSupplementNetworkCalls();
    }
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.file-upload {
  padding: 1em;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  transition: all 0.15s ease-in-out;
}
.file-upload-box {
  width: 100% !important;
}
#upload-details-body {
  display: none;
}
.input-replace {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
.button-replace {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  color: #f4871e !important;
}
.error-border {
  border: 1px solid red !important;
}
</style>
