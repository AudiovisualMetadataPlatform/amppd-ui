<template>
  <div
    class="container col-12 dataTables_wrapper"
    :class="baseUrl == 'unit' ? 'units' : 'collection'"
  >
    <loader :show="showLoader" />
    <div class="row">
      <!-- <Sidebar /> -->
      <div class="col-12 bg-light-gray-1">
        <main :class="!unitEntity.currentUnit ? 'mb-3' : 'mb-5'">
          <!-- Header - Details page -->

          <b-card
            class="text-center mt-5 mb-3"
            :class="
              baseUrl === 'file' && entity.mediaType === 'video'
                ? 'extra-padding mb-5'
                : unitEntity.currentUnit
                ? 'mb-5'
                : 'mb-3'
            "
          >
            <h1 class="text-left">
              <span class="text-capitalize">{{
                baseUrl === "file" ? "Content File" : baseUrl
              }}</span>
              Details
              <button
                v-if="baseUrl === 'item' && entity.parentType === 'item-search'"
                class="btn btn-primary btn-lg float-right"
                type="button"
                @click="handleSearchItem()"
              >
                Search Item
              </button>
            </h1>
            <div class="primary-file">
              <div class="media-player" v-if="baseUrl === 'file'">
                <div v-if="entity.mediaSource">
                  <mediaelement
                    ref="vPlay"
                    :type="entity.mediaType"
                    :autoplay="false"
                    :forceLive="false"
                    preload="auto"
                    :source="entity.mediaSource"
                    width="100%"
                    height="495.4px"
                  ></mediaelement>
                </div>
                <div class="float-left" v-if="baseUrl === 'file'">
                  <b-button
                    v-b-toggle.collapse-1
                    variant="outline-primary"
                    class="btn-lg media-info-btn"
                  >
                    <span v-html="infoSvg"></span>
                    Media Information
                  </b-button>
                </div>
                <b-collapse
                  v-if="selectedFile.mediaInfo"
                  id="collapse-1"
                  class="mt-2 media-details"
                >
                  <textarea
                    v-model="mediaInfo"
                    disabled
                    class="textArea mt-2 mb-2"
                  ></textarea>
                </b-collapse>
              </div>
              <form name="unitForm" class="form">
                <div v-if="baseUrl === 'file'">
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>
                        <span class="text-capitalize">{{ baseUrl }}</span>
                        Name:
                      </label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.name"
                        :disabled="showEdit"
                        :class="{ 'error-border': submitted && !entity.name }"
                        @change="onInputChange"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Original Name:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.originalFilename"
                        :disabled="true"
                      />
                    </div>
                  </div>
                  <div class="col-12 text-left form-group p-0">
                    <label>Description:</label>
                    <textarea
                      class="form-control w-100"
                      v-model="entity.description"
                      :disabled="showEdit"
                      @change="onInputChange"
                    ></textarea>
                  </div>
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>Created By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.createdBy"
                        :disabled="true"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Date Created:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.createdDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>Modified By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.modifiedBy"
                        :disabled="true"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Modified Date:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="row">
                    <div
                      class="text-left form-group"
                      :class="baseUrl === 'collection' ? 'col-6' : 'col-12'"
                    >
                      <label>
                        <span class="text-capitalize">{{ baseUrl }}</span> Name:
                      </label>
                      <select
                        v-if="baseUrl == 'unit'"
                        class="select custom-select w-100"
                        v-model="unitEntity.currentUnit"
                        @change="onUnitChange"
                        required
                        id="unit-select"
                        ><option value="" disabled selected
                          >- Choose Unit -</option
                        >
                        <option
                          v-for="option in unitEntity.unitList"
                          :key="option.id"
                          :value="option.id"
                          >{{ option.name }}</option
                        >
                      </select>
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        v-model="entity.name"
                        :disabled="showEdit"
                        :class="{ 'error-border': submitted && !entity.name }"
                        @change="onInputChange"
                      />
                    </div>
                    <div
                      class="col-6 text-left form-group"
                      v-if="baseUrl === 'collection'"
                    >
                      <label>Task Manager:</label>
                      <select
                        class="select custom-select w-100"
                        v-model="entity.taskManager"
                        :disabled="showEdit"
                        :class="{
                          'error-border': submitted && !entity.taskManager,
                        }"
                        @change="onInputChange"
                      >
                        <option
                          v-for="option in listOfTaskManager"
                          :key="option"
                          >{{ option }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div
                    class="col-12 text-left form-group p-0"
                    v-if="baseUrl === 'file'"
                  >
                    <label>Original Name:</label>
                    <input
                      type="text"
                      class="form-control w-100"
                      v-model="entity.originalFilename"
                      :disabled="true"
                    />
                  </div>
                  <div
                    v-if="unitEntity.currentUnit"
                    class="col-12 text-left form-group p-0"
                  >
                    <label>Description:</label>
                    <textarea
                      class="form-control w-100"
                      v-model="entity.description"
                      :disabled="showEdit"
                      @change="onInputChange"
                    ></textarea>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Unit:</label>
                      <input
                        v-if="
                          (isCreatePage || selectedItem.selectedItemId) &&
                            selectedUnit
                        "
                        type="text"
                        class="form-control w-100"
                        v-model="selectedUnit.name"
                        :disabled="true"
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        v-model="entity.unitName"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Collection:</label>
                      <input
                        v-if="
                          (isCreatePage || selectedItem.selectedItemId) &&
                            selectedCollection
                        "
                        type="text"
                        class="form-control w-100"
                        v-model="selectedCollection.name"
                        :disabled="true"
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        :value="entity.collectionName"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Created By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.createdBy"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Date Created:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.createdDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Modified By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.modifiedBy"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Modified Date:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div
                    v-if="baseUrl !== 'item' && unitEntity.currentUnit"
                    class="col-12 p-0"
                  >
                    <div class="row">
                      <div class="col-3 text-left form-group">
                        <label>Created By:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="entity.createdBy"
                          :disabled="true"
                        />
                      </div>
                      <div class="col-3 text-left form-group">
                        <label>Date Created:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          :value="entity.createdDate | LOCAL_DATE_VALUE"
                          :disabled="true"
                        />
                      </div>
                      <div class="col-3 text-left form-group">
                        <label>Modified By:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="entity.modifiedBy"
                          :disabled="true"
                        />
                      </div>

                      <div class="col-3 text-left form-group">
                        <label>Modified Date:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>External Source:</label>
                      <!-- <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.externalSource"
                        :disabled="showEdit"
                        @change="onInputChange"
                    /> -->
                      <select
                        class="select custom-select w-100"
                        v-model="entity.externalSource"
                        @change="onInputChange"
                      >
                        <option
                          v-for="option in listOfExternalResources"
                          :key="option"
                          >{{ option }}</option
                        >
                      </select>
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>External Id:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.externalId"
                        :disabled="showEdit"
                        @change="onInputChange"
                      />
                    </div>
                  </div>
                </div>

                <div v-if="unitEntity.currentUnit" class="w-100 text-right p-0">
                  <!-- <div v-if="!showEdit"> -->
                  <!-- <button
                    class="btn btn-outline btn-lg btn-edit mr-2"
                    type="button"
                    @click="onCancel"
                  >Cancel</button>-->
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onUpdateEntityDetails"
                  >
                    Save
                  </button>
                  <!-- </div> -->
                  <!-- <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="showEdit = !showEdit"
                    v-if="showEdit"
                  >Edit</button>-->
                </div>
              </form>
            </div>
          </b-card>

          <!-- Header - Details page Ends here-->
          <div
            v-if="
              baseUrl === 'item' &&
                (selectedItem.id || selectedItem.selectedItemId)
            "
          >
            <ItemFiles></ItemFiles>
          </div>
          <div v-else-if="baseUrl === 'file'">
            <OutputFile />
          </div>
          <div
            class
            v-else-if="
              baseUrl !== 'item' && baseUrl !== 'file' && unitEntity.currentUnit
            "
          >
            <!-- Title ends here -->
            <b-card class="m-0 text-left">
              <!-- Title - Listing page -->
              <!-- <h3 v-if="baseUrl == 'unit' && !purpose">My Units</h3>
                            <h3 v-else-if="baseUrl == 'collection' && !purpose">My Collections</h3>-->

              <!-- Title - Unit Details page  -->
              <div class="d-flex w-100" v-if="baseUrl == 'unit'">
                <div class="col-3 text-left p-0">
                  <h2>Unit Collections</h2>
                </div>
                <div class="col-9 text-right p0 btn-grp">
                  <button
                    class="btn btn-primary btn-lg btn-edit mr-2"
                    type="button"
                    @click="onCreateCollection()"
                  >
                    Create New Collection
                  </button>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onSearch('listing-collection')"
                  >
                    Search Collections
                  </button>
                </div>
              </div>
              <!-- Title - Collection Details page  -->
              <div class="d-flex w-100" v-if="baseUrl == 'collection'">
                <div class="col-3 text-left">
                  <h2>Collection Items</h2>
                </div>
                <div class="col-9 text-right p-0 btn-grp">
                  <button
                    class="btn btn-primary btn-lg btn-edit mr-2"
                    type="button"
                    @click="onCreateItem"
                  >
                    Create New Item
                  </button>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onSearch('listing-item')"
                  >
                    Search Items
                  </button>
                </div>
              </div>
              <div class="row row-spl" v-if="records && records.length">
                <b-card
                  class="m-3 w-100 text-left b-card-spl"
                  v-for="elem in records"
                  :key="elem.id"
                >
                  <div class="col-12 p-0">
                    <div class="row">
                      <div class="col-11">
                        <h3>{{ elem.name }}</h3>
                        <p>{{ elem.description }}</p>
                      </div>
                      <div class="col-1 text-right">
                        <div
                          v-if="baseUrl == 'unit'"
                          class="d-flex float-right"
                        >
                          <span class="mr-1">Active</span>
                          <label
                            class="switch"
                            :title="elem.active ? 'Deactivate' : 'Activate'"
                          >
                            <input
                              type="checkbox"
                              v-model="elem.active"
                              v-on:click="toggleCollectionActive(elem)"
                            />
                            <span class="slider round"></span>
                          </label>
                        </div>
                        <div
                          v-if="
                            (elem.active && baseUrl == 'unit') ||
                              baseUrl !== 'unit'
                          "
                          class="float-right"
                        >
                          <button
                            class="btn btn-primary btn"
                            @click="onView(elem)"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Reusing same components for details page, so based on condition we are displaying the data -->
                    <div class="row w-100" v-if="purpose">
                      <div class="col-3" v-if="baseUrl == 'unit'">
                        <label>Task Manager</label>
                        <p class="mb-0">{{ elem.taskManager }}</p>
                      </div>
                      <div class="col-2" v-if="baseUrl == 'collection'">
                        <label>Source Name</label>
                        <p class="mb-0">{{ elem.externalSource }}</p>
                      </div>
                      <div class="col-2" v-if="baseUrl == 'collection'">
                        <label>Source Id</label>
                        <p class="mb-0">{{ elem.externalId }}</p>
                      </div>
                      <div class="col-2">
                        <label>Date Created:</label>
                        <p class="mb-0">
                          {{ elem.createdDate | LOCAL_DATE_VALUE }}
                        </p>
                      </div>
                      <div class="col-2">
                        <label>Created By</label>
                        <p class="mb-0">{{ elem.createdBy }}</p>
                      </div>
                      <div class="col-2">
                        <label>Modified By</label>
                        <p class="mb-0">{{ elem.modifiedBy }}</p>
                      </div>
                      <div class="col-2">
                        <label>Modified Date</label>
                        <p class="mb-0">
                          {{ elem.modifiedDate | LOCAL_DATE_VALUE }}
                        </p>
                      </div>
                    </div>
                  </div>
                </b-card>
              </div>
              <div class="col-12 text-left" v-else>
                <p>-No records found-</p>
              </div>
            </b-card>
          </div>
        </main>
      </div>
    </div>
    <Search
      :searchType="searchType"
      :dataSource="masterRecords"
      @myEvent="onSearchDone"
      isEntityList="true"
    />
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import config from "../../assets/constants/common-contant.js";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import Loader from "@/components/shared/Loader.vue";
import CollectionService from "../../service/collection-service";
import UnitService from "../../service/unit-service";
import SharedService from "../../service/shared-service";
import ItemService from "../../service/item-service";
import ItemFiles from "./ItemFiles.vue";
import OutputFile from "./OutputFile.vue";
import PrimaryFileService from "../../service/primary-file-service.js";
import Search from "@/components/shared/Search.vue";
import BaseService from "../../service/base-service";
import EntityService from "../../service/entity-service";
import { env } from "../../helpers/env";
import Mediaelement from "./Mediaelement.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import ConfigPropertiesService from "@/service/config-properties-service";
import EvaluationService from "@/service/evaluation-service";

export default {
  name: "EntityList",
  components: {
    Logout,
    Sidebar,
    Loader,
    ItemFiles,
    Search,
    OutputFile,
    mediaelement: Mediaelement,
  },
  props: [],
  data() {
    return {
      unitService: new UnitService(),
      collectionService: new CollectionService(),
      sharedService: new SharedService(),
      itemService: new ItemService(),
      baseService: new BaseService(),
      primaryFileService: new PrimaryFileService(),
      entityService: new EntityService(),
      workflowResultService: new WorkflowResultService(),
      configPropertiesService: new ConfigPropertiesService(),
      evaluationService: new EvaluationService(),
      records: [],
      masterRecords: [],
      showLoader: false,
      entity: {},
      showEdit: false,
      infoSvg: config.common.icons["info"],
      searchType: "",
      submitted: false,
      isDataChanged: false,
      defaultUnitId: "",
      unitEntity: { unitList: [], currentUnit: "" },
    };
  },
  computed: {
    selectedCollection: sync("selectedCollection"),
    selectedUnit: sync("selectedUnit"),
    selectedItem: sync("selectedItem"),
    selectedFile: sync("selectedFile"),
    itemConfigs: sync("itemConfigs"),
    configProperties: sync("configProperties"),
    mgmCategories: sync("mgmCategories"),
    baseUrl() {
      const self = this;
      if (window.location.hash.toLowerCase().indexOf("unit") > -1) {
        return "unit";
      } else if (window.location.hash.toLowerCase().indexOf("file") > -1) {
        return "file";
      } else if (
        window.location.hash.toLowerCase().indexOf("collection") > -1 &&
        window.location.hash.toLowerCase().indexOf("item") === -1
      ) {
        this.getItemsConfig();
        return "collection";
      } else if (window.location.hash.toLowerCase().indexOf("item") > -1) {
        return "item";
      }
      return "";
    },
    purpose() {
      return window.location.hash.toLowerCase().indexOf("details") > -1
        ? "details"
        : "";
    },
    isCreatePage() {
      return (
        window.location.hash.toLowerCase().indexOf("create") > -1 ||
        window.location.hash.toLowerCase().indexOf("add-item") > -1
      );
    },
    listOfTaskManager() {
      return this.itemConfigs.taskManagers;
    },
    listOfExternalResources() {
      return this.itemConfigs.externalSources;
    },
    mediaInfo() {
      return this.selectedFile && this.selectedFile.mediaInfo
        ? JSON.stringify(JSON.parse(this.selectedFile.mediaInfo), undefined, 4)
        : "";
    },
  },
  methods: {
    onUnitChange() {
      const self = this;
      sessionStorage.setItem(
        "unitEntity",
        JSON.stringify({ ...self.unitEntity })
      );
      self.getData();
    },
    async toggleCollectionActive(collection) {
      collection.active = !collection.active;
      this.collectionService.activateCollection(
        collection.id,
        collection.active
      );
    },
    async getAllUnits() {
      const self = this;
      try {
        self.showLoader = true;
        await self.unitService.getAllUnits().then(async (response) => {
          await self.unitService
            .getAllUnits("0", response.data.page.totalElements)
            .then((res) => {
              self.allUnits = res.data;
              self.unitEntity.unitList = self.sharedService.sortByAlphabatical(
                this.allUnits._embedded.units
              );
              self.showLoader = false;

              // self.unitEntity.unitList = [{ ...self.unitEntity.unitList[2] }]; //For single unit test scenario
              if (
                self.unitEntity.unitList &&
                self.unitEntity.unitList.length === 1
              ) {
                self.unitEntity.currentUnit = self.unitEntity.unitList[0].id;
                self.onUnitChange();
              } else {
                let uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
                if (!uEntity)
                  sessionStorage.setItem(
                    "unitEntity",
                    JSON.stringify({ ...self.unitEntity })
                  );
                const unitSelectHtml = document.getElementById("unit-select");
                if (unitSelectHtml) unitSelectHtml.focus();
              }
            });
        });
      } catch (error) {
        self.showLoader = false;
        console.log(error);
      }
    },
    async networkCalls() {
      const self = this;
      try {
        const configPropertiesResponse = await self.configPropertiesService.getConfigProperties();
        self.configProperties = configPropertiesResponse.data;

        //MGM Evaluation menus
        self.mgmCategoryResponse = await this.evaluationService.getMgmCategories();
        self.sortedMgmCategories = self.sharedService.sortByAlphabatical(
          self.mgmCategoryResponse.data._embedded.mgmCategories
        );
        self.filteredMgmCategories = self.sortedMgmCategories.filter((item) =>
          parseInt(item.mstsCount, 10)
        );
        self.mgmCategories = JSON.parse(
          JSON.stringify(self.filteredMgmCategories)
        );
        self.showLoader = false;
      } catch (error) {
        self.showLoader = false;
        console.log(error);
      }
    },
    async getData() {
      const self = this;
      if (self.baseUrl === "unit") {
        this.getUnitDetails();
      } else if (self.baseUrl === "collection") {
        self.entity = self.selectedCollection;
        if (self.selectedCollection && !self.isCreatePage)
          this.getCollectionItems();
        else {
          self.selectedCollection = self.entity = {};
          self.showLoader = false;
          self.showEdit = false;
        }
      } else if (self.baseUrl === "item") {
        self.entity = self.selectedItem;
        self.showLoader = false;
        if (self.isCreatePage) {
          self.selectedItem = self.entity = {};
          self.showEdit = false;
        }
      } else if (self.baseUrl === "file") {
        let mediaSourceUrl = self.workflowResultService.getSourceUrl(
          self.selectedFile.id
        );
        let mediaSourceType = await self.primaryFileService.getPrimaryFile(
          self.selectedFile.id
        );
        self.selectedFile["mediaInfo"] = mediaSourceType.mediaInfo;
        self.entity = self.selectedFile;
        self.entity["mediaSource"] = mediaSourceUrl;
        self.entity["mediaType"] = mediaSourceType.mimeType.substring(0, 5);
        self.showLoader = false;
      }
    },
    async getUnitDetails() {
      const self = this;
      const unitDetails = await self.entityService.getUnitDetails(
        self.unitEntity.currentUnit,
        self
      );
      if (unitDetails.response) {
        self.selectedUnit = unitDetails.response;
        self.entity = unitDetails.response;
        this.getUnitCollections();
      } else {
        self.showLoader = false;
      }
    },
    async getUnitCollections() {
      const self = this;
      self.collectionService
        .getCollectionByUnitId(self.selectedUnit.id)
        .then((response) => {
          self.showLoader = false;
          if (response && response && response._embedded) {
            self.records =
              response._embedded[Object.keys(response._embedded)[0]];
            self.records = self.sharedService.sortByAlphabatical(self.records);
            self.masterRecords = JSON.parse(JSON.stringify(self.records));
          }
        });
    },
    async getCollectionItems() {
      const self = this;
      self.itemService
        .getCollectionItems(self.selectedCollection.id)
        .then((response) => {
          self.showLoader = false;
          if (response && response.data && response.data._embedded) {
            self.records =
              response.data._embedded[Object.keys(response.data._embedded)[0]];
            self.records = self.sharedService.sortByAlphabatical(self.records);
            self.masterRecords = JSON.parse(JSON.stringify(self.records));
          }
        });
    },
    async onView(objInstance) {
      const self = this;
      if (self.baseUrl === "collection" && self.purpose) {
        self.selectedItem = objInstance;
        self.$router.push("/collections/items/details");
      } else if (self.baseUrl === "unit" && self.purpose) {
        self.selectedCollection = objInstance;
        self.$router.push("/collection/details");
      }
    },
    onCreateCollection() {
      const self = this;
      self.$router.push("/collection/create");
    },
    onCreateItem() {
      const self = this;
      self.$router.push("/collection/add-items");
    },
    onUpdateEntityDetails() {
      const self = this;
      self.entityService.onUpdateEntityDetails(self);
    },
    onCancel() {
      var result = confirm("Are you sure want to cancel!");
      if (result) this.showEdit = !this.showEdit;
    },
    onSearch(type) {
      this.searchType = type;
      this.$bvModal.show("modal-lg");
    },
    onSearchDone(records) {
      this.records = records && records.length ? records : this.masterRecords;
    },
    onInputChange(ev) {
      this.isDataChanged = true;
    },
    async getDefaultUnit() {
      const self = this;
      self.unitService
        .getDefaultUnit()
        .then((success) => {
          self.showLoader = false;
          if (
            success &&
            success._embedded &&
            success._embedded.units &&
            success._embedded.units.length
          ) {
            self.defaultUnitId = success._embedded.units[0].id;
            if (success._embedded.units.length > 1) {
              self.$bvToast.toast(
                "Received more than one unit details. Please contact administrator",
                self.sharedService.warningToastConfig
              );
            }
            self.getData();
          } else {
            self.$bvToast.toast(
              "Unable to retrive unit details. Please try again!",
              self.sharedService.erorrToastConfig
            );
          }
        })
        .catch((err) => {
          self.$bvToast.toast(
            "Unable to retrive unit details. Please try again!",
            self.sharedService.erorrToastConfig
          );
          self.showLoader = false;
        });
    },
    async getItemsConfig() {
      const self = this;
      self.entityService.getItemsConfig(self);
    },
    handleSearchItem() {
      this.$router.push("/collections/items/item-search");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDataChanged) {
      this.$bvModal
        .msgBoxConfirm(`Changes you have made may not be saved.`, {
          title: "Notification",
          size: "md",
          buttonSize: "sm",
          //   okVariant: 'danger',
          okTitle: "Leave",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: true,
          centered: false,
          noCloseOnBackdrop: true,
        })
        .then((value) => {
          if (value) next();
        })
        .catch((err) => {
          // An error occurred
        });
    } else {
      next();
    }
  },
  mounted() {
    const self = this;
    self.showLoader = true;
    if (self.baseUrl === "unit") {
      this.networkCalls(); //TODO: Need to move to "home" page once it'll be implemented.
    }
    // self.getDefaultUnit();

    // For unit details page
    const uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    if (!uEntity) {
      self.unitEntity = { unitList: [], currentUnit: "" };
      self.getAllUnits();
    } else {
      self.unitEntity = uEntity;
      self.getData();
    }

    let formHTML = document.getElementsByClassName("form")[0];
    if (formHTML && this.baseUrl === "file") {
      formHTML.style.width = "50%";
    } else if (formHTML) {
      formHTML.style.width = "100%";
    }
  },
};
</script>

<style scoped>
@import "/amppd-ui/src/styles/style.css";

.textArea {
  width: 100%;
  min-height: 30rem;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.8rem;
  line-height: 1.2;
}
.error-border {
  border: 1px solid red;
}
.flex-div {
  display: flex;
  justify-content: space-between;
}
.extra-padding {
  padding-bottom: 40px;
}
.float-left {
  position: relative;
  margin-top: 10px;
}
.media-info-btn {
  position: absolute;
}
.media-details {
  margin-top: 60px !important;
}
.primary-file {
  display: flex;
}
.media-player {
  width: 50%;
  margin-right: 15px;
}
video {
  margin-top: 0px;
  width: 100% !important;
}
.btn-grp {
  margin-bottom: 33px;
  padding-right: 0px;
}
.b-card-spl {
  background-color: #fafafa;
  margin: 0px 0px 8px 0px !important;
}
.b-card-spl > div:first-child {
  padding: 8px !important;
}
.row-spl {
  margin: 0px;
}
.switch {
  min-width: 45px;
}
</style>
