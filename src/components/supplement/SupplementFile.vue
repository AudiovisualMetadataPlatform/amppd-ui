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
                    <span
                      class="input-group-btn"
                      v-if="canUpdate"
                    >
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
                    :disabled="!canUpdate"
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
                    :disabled="!canUpdate"
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
                    :disabled="!canUpdate"
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
              class="select custom-select w-100"
              v-model="supplement.fileDetails.unit"
              @change="onInputChange('unit', true)"
              required
              :class="{
                'error-border': submitted && !supplement.fileDetails.unit,
              }"
              :disabled="!canUpdate"
              ><option value="" disabled selected>- Choose Unit -</option>
              <option
                v-for="option in supplement.allUnits"
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
              @change="onInputChange('collection', true)"
              :disabled="
                !supplement.showCollectionList ||
                  !canUpdate
              "
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
              @change="onInputChange('item', true)"
              :disabled="
                !supplement.showItemList || !canUpdate
              "
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
            <label for="primary-file-name">Content File</label>
            <select
              class="select custom-select w-100"
              v-model="supplement.fileDetails.primaryFile"
              @change="onInputChange('primaryFile', true)"
              :disabled="
                !supplement.showPrimaryFileList ||
                  !canUpdate
              "
              ><option value="" disabled selected
                >- Choose Content File -</option
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
          v-if="canUpdate"
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
import { env } from "@/helpers/env";
import UnitService from "@/service/unit-service";
import ItemService from "@/service/item-service";
import CollectionService from "@/service/collection-service";
import PrimaryFileService from "@/service/primary-file-service";
import SupplementService from "@/service/supplement-service";
import SharedService from "@/service/shared-service";
import Loader from "@/components/shared/Loader.vue";
import ConfigPropertiesService from "@/service/config-properties-service";
import AccessControlService from "@/service/access-control-service";

export default {
  name: "SupplementFile",
  components: {
    Loader,
  },
  data() {
    return {
      unitService: new UnitService(),
      itemService: new ItemService(),
      sharedService: new SharedService(),
      fileService: new PrimaryFileService(),
      collectionService: new CollectionService(),
      supplementService: new SupplementService(),
      accessControlService: new AccessControlService(),
      configPropertiesService: new ConfigPropertiesService(),
      loading: false,
      superLoading: false,
      supplement: {
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
      moveSupplement: false,
      allUnits: [],
      canCreate: false,
      canUpdate: false,
    };
  },
  computed: {
    acIsAdmin: sync("acIsAdmin"),
    acUnitsActions: sync("acUnitsActions"),
    configProperties: sync("configProperties"),
  },
  props: {},
  methods: {
    async networkCalls() {
      const self = this;
      try {
        self.loading = true;

        // retrieve configProperties if not yet done
        if (!self.configProperties || Object.keys(self.configProperties).length === 0) {
          self.configProperties = await self.configPropertiesService.getConfigProperties();        
        }

        // retrieve accessible units for create/update
        await self.accessControlService.getPermissionsUnits("Create", "Supplement").then((res) => {
          self.allUnits = res.data;
          self.supplement["allUnits"] = self.sharedService.sortByAlphabatical(self.allUnits);
          self.canCreate = self.acIsAdmin || res.data && res.data.length > 0
          self.canUpdate = self.acIsAdmin || self.action !== "view" && self.canCreate;                
        });

        self.loading = false;    
      } catch (error) {
        self.loading = false;
        console.log(error);
      }
    },

    async viewSupplementNetworkCalls() {
      const self = this;
      try {
        self.superLoading = true;
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
                  case "p-sup": // Primaryfile Supplement
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.supplement.fileDetails.item = r.itemId;
                        self.onInputChange("item").then(() => {
                          self.supplement.fileDetails.primaryFile =
                            r.primaryfileId;
                          self.superLoading = false;
                        });
                      });
                    });
                    self.supplement.fileDetails.primaryFile = r.primaryfileId;
                    break;
                  case "i-sup": // Item Supplement
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.supplement.fileDetails.item = r.itemId;
                        self.onInputChange("item").then(() => {
                          self.superLoading = false;
                        });
                      });
                    });
                    break;
                  case "c-sup": // Collection Supplement
                    self.supplement.fileDetails.unit = r.unitId;
                    self.onInputChange("unit").then(() => {
                      self.supplement.fileDetails.collection = r.collectionId;
                      self.onInputChange("collection").then(() => {
                        self.superLoading = false;
                      });
                    });
                    break;
                  case "u-sup": // Unit Supplement
                    self.supplement.fileDetails.unit = res._embedded.unit.id;
                    self.onInputChange("unit").then(() => {
                      self.superLoading = false;
                    });
                    break;
                  default:
                    break;
                }            
                self.canUpdate = self.acIsAdmin; 
                if (!self.canUpdate) {
                  let actions = self.acUnitsActions.filter((ua) => ua.unitId == r.unitId)[0].actions;
                  let actionType = env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE");
                  let targetType = env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT");
                  console.log("actions:" + actions);
                  self.canUpdate = actions.filter((a) => a.targetType == targetType && a.actionType == actionType).length > 0;
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
      console.log("SupplementFile.filesChange -----  files.length = " + self.supplement["files"].length);
      self.supplement[
        "allCategories"
      ] = this.configProperties.supplementCategories;
      self.supplement["allUnits"] = self.sharedService.sortByAlphabatical(
        this.allUnits
      );
      const uploadDetailsBody = document.getElementById("upload-details-body");
      uploadDetailsBody.style.display = "block";
      self.supplement.fileDetails.file = self.supplement.files[0];
      self.supplement.fileDetails.originalFilename = self.supplement.files[0].name;
      console.log("SupplementFile.filesChange -----  file.size = " + self.supplement.fileDetails.file.size);
    },

    async onInputChange(type, directCall = false) {
      const self = this;
      self.entityType = type;
      self.entityId = self.supplement.fileDetails[type];
      const action = self.action === "view" || self.action === "replace";
      if (directCall && action) {
        self.moveSupplement = true;
      }
      try {
        switch (type) {
          case "unit":
            self.loading = true;
            await self.collectionService
              .getCollectionByUnitId(self.entityId)
              .then((res) => {
                self.supplement.collectionList = self.sharedService.sortByAlphabatical(
                  res._embedded.collections
                );
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
                self.supplement.itemList = self.sharedService.sortByAlphabatical(
                  res.data._embedded.items
                );
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
                self.supplement.primaryFileList = self.sharedService.sortByAlphabatical(
                  res.data._embedded.primaryfiles
                );
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

    successMessage() {
      const self = this;
      self.$bvToast.toast(
        "Supplemental file has been successfully updated.",
        self.sharedService.successToastConfig
      );
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
          let newUrlType = "";
          let formDataKey = "";
          if (self.entityType === "unit") {
            apiType = "units";
            newUrlType = "u-sup";
            formDataKey = "unitSupplement";
          } else if (self.entityType === "collection") {
            apiType = "collections";
            newUrlType = "c-sup";
            formDataKey = "collectionSupplement";
          } else if (self.entityType === "item") {
            apiType = "items";
            newUrlType = "i-sup";
            formDataKey = "itemSupplement";
          } else if (self.entityType === "primaryFile") {
            apiType = "primaryfiles";
            newUrlType = "p-sup";
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
          await self.supplementService
            .addSupplement(apiType, self.entityId, formData)
            .then((response) => {
              self.$router
                .push(`/supplemental-files/${newUrlType}/${response.id}`)
                .then(() => {
                  self.$bvToast.toast(
                    "Supplemental file has been successfully created.",
                    self.sharedService.successToastConfig
                  );
                });
            });
          self.loading = false;
        } else if (self.action === "replace" || self.action === "view") {
          //API call for view supplement page
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

          if (self.moveSupplement) {
            let newEntityType = "";
            let newUrlType = "";
            if (self.entityType === "unit") {
              newEntityType = "Unit";
              newUrlType = "u-sup";
            } else if (self.entityType === "collection") {
              newEntityType = "Collection";
              newUrlType = "c-sup";
            } else if (self.entityType === "item") {
              newEntityType = "Item";
              newUrlType = "i-sup";
            } else if (self.entityType === "primaryFile") {
              newEntityType = "Primaryfile";
              newUrlType = "p-sup";
            }

            if (self.action === "replace") {
              //API call in the case: file + data update + move
              await self.supplementService
                .replaceSupplementFile(
                  self.viewApiType,
                  self.supplementId,
                  updatedFormData
                )
                .then((res) => {
                  self.supplementService
                    .updateSupplement(
                      self.viewApiType,
                      self.supplementId,
                      updatedData
                    )
                    .then((r) => {
                      const newEntityId = self.entityId;
                      self.supplementService
                        .moveSupplementFile(
                          self.viewApiType,
                          self.supplementId,
                          newEntityId,
                          newEntityType
                        )
                        .then((response) => {
                          self.loading = false;
                          self.moveSupplement = false;
                          self.action = "view";
                          self.$router
                            .push(
                              `/supplemental-files/${newUrlType}/${response.id}`
                            )
                            .then(() => {
                              self.successMessage();
                            })
                            .catch(() => {
                              self.successMessage();
                            });
                        });
                    });
                });
            } else if (self.action === "view") {
              //API call in the case: data update + move
              await self.supplementService
                .updateSupplement(
                  self.viewApiType,
                  self.supplementId,
                  updatedData
                )
                .then((r) => {
                  const newEntityId = self.entityId;
                  self.supplementService
                    .moveSupplementFile(
                      self.viewApiType,
                      self.supplementId,
                      newEntityId,
                      newEntityType
                    )
                    .then((response) => {
                      self.loading = false;
                      self.moveSupplement = false;
                      self.$router
                        .push(
                          `/supplemental-files/${newUrlType}/${response.id}`
                        )
                        .then(() => {
                          self.successMessage();
                        })
                        .catch(() => {
                          self.successMessage();
                        });
                    });
                });
            }
          } else if (self.action === "replace") {
            //API call in the case: file + data update
            await self.supplementService
              .replaceSupplementFile(
                self.viewApiType,
                self.supplementId,
                updatedFormData
              )
              .then((res) => {
                self.supplementService
                  .updateSupplement(
                    self.viewApiType,
                    self.supplementId,
                    updatedData
                  )
                  .then((response) => {
                    self.loading = false;
                    self.action = "view";
                    self.successMessage();
                  });
              });
          } else if (self.action === "view") {
            //API call in the case: data update
            await self.supplementService
              .updateSupplement(
                self.viewApiType,
                self.supplementId,
                updatedData
              )
              .then((response) => {
                self.loading = false;
                self.successMessage();
              });
          }
        }
        self.moveSupplement = false;
      } catch (error) {
        self.moveSupplement = false;
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
    self.supplementType = self.$route.params.supplementType;
    self.supplementId = self.$route.params.supplementId;
    if (self.supplementType && self.supplementId) {
      self.action = "view";
      const uploadDetailsBody = document.getElementById("upload-details-body");
      uploadDetailsBody.style.display = "block";
    }
    self.networkCalls().then(() => {
      if (self.action === "view") {
        self.viewSupplementNetworkCalls();
      }
    });
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
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
