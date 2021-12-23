<template>
    <div
        class="container col-12 dataTables_wrapper"
        :class="baseUrl == 'unit' ? 'units' : 'collection'"
    >
        <loader :show="showLoader" />
        <div class="row">
            <!-- <Sidebar /> -->
            <div class="col-12 bg-light-gray-1">
                <main class="main-margin-min">
                    <!-- Header - Details page -->

                    <b-card class="text-center mt-5">
                        <h2 class="text-left">
                            <span class="text-capitalize">{{ baseUrl }}</span> Details
                        </h2>
                        <form name="unitForm" class="form">
                            <div class="row">
                                <div
                                    class="text-left form-group"
                                    :class="baseUrl === 'collection' ? 'col-6' : 'col-12'"
                                >
                                    <label>
                                        <span class="text-capitalize">{{ baseUrl }}</span> Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control w-100"
                                        v-model="entity.name"
                                        :disabled="showEdit"
                                        :class="{'error-border' : (submitted && !entity.name) }"
                                        @change="onInputChange"
                                    />
                                </div>
                                <div
                                    class="col-6 text-left form-group"
                                    v-if="baseUrl === 'collection'"
                                >
                                    <label>Task Manager</label>
                                    <select
                                        class="select custom-select w-100"
                                        v-model="entity.taskManager"
                                        :disabled="showEdit"
                                        :class="{'error-border' : (submitted && !entity.taskManager) }"
                                        @change="onInputChange"
                                    >
                                        <option
                                            v-for="option in listOfTaskManager"
                                            :key="option"
                                        >{{ option }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 text-left form-group p-0" v-if="baseUrl === 'file'">
                                <label>Orginal Name</label>
                                <input
                                    type="text"
                                    class="form-control w-100"
                                    v-model="entity.originalFilename"
                                    :disabled="true"
                                />
                            </div>
                            <div class="col-12 text-left form-group p-0">
                                <label>Description</label>
                                <textarea
                                    class="form-control w-100"
                                    v-model="entity.description"
                                    :disabled="showEdit"
                                    @change="onInputChange"
                                ></textarea>
                            </div>

                            <div class="row">
                                <div class="col-6 p-0">
                                    <div class="col-12 text-left form-group">
                                        <label>Created By</label>
                                        <input
                                            type="text"
                                            class="form-control w-100"
                                            v-model="entity.createdBy"
                                            :disabled="true"
                                        />
                                    </div>
                                    <div class="col-12 text-left form-group">
                                        <label>Modified By</label>
                                        <input
                                            type="text"
                                            class="form-control w-100"
                                            v-model="entity.modifiedBy"
                                            :disabled="true"
                                        />
                                    </div>
                                </div>
                                <div class="col-6 p-0">
                                    <div class="col-12 text-left form-group">
                                        <label>Date Created</label>
                                        <input
                                            type="text"
                                            class="form-control w-100"
                                            v-model="entity.createdDate"
                                            :disabled="true"
                                        />
                                    </div>
                                    <div class="col-12 text-left form-group">
                                        <label>Modified Date</label>
                                        <input
                                            type="text"
                                            class="form-control w-100"
                                            v-model="entity.modifiedDate"
                                            :disabled="true"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row" v-if="baseUrl === 'item'">
                                <div class="col-6 text-left form-group">
                                    <label>External Source</label>
                                    <input
                                        type="text"
                                        class="form-control w-100"
                                        v-model="entity.externalSource"
                                        :disabled="showEdit"
                                        @change="onInputChange"
                                    />
                                </div>
                                <div class="col-6 text-left form-group">
                                    <label>External Id</label>
                                    <input
                                        type="text"
                                        class="form-control w-100"
                                        v-model="entity.externalId"
                                        :disabled="showEdit"
                                        @change="onInputChange"
                                    />
                                </div>
                            </div>

                            <div class="w-100 text-right p-0">
                                <div class="float-left" v-if="baseUrl === 'file'">
                                    <b-button v-b-toggle.collapse-1 variant="outline-primary" class="btn-lg">
                                        <span v-html="infoSvg"></span>
                                        Media Information
                                    </b-button>
                                </div>
                                <!-- <div v-if="!showEdit"> -->
                                    <!-- <button
                                        class="btn btn-outline btn-lg btn-edit mr-2"
                                        type="button"
                                        @click="onCancel"
                                    >Cancel</button> -->
                                    <button
                                        class="btn btn-primary btn-lg btn-edit"
                                        type="button"
                                        @click="onUpdateEntityDetails"
                                    >Save</button>
                                <!-- </div> -->
                                <!-- <button
                                    class="btn btn-primary btn-lg btn-edit"
                                    type="button"
                                    @click="showEdit = !showEdit"
                                    v-if="showEdit"
                                >Edit</button> -->
                            </div>

                            <b-collapse id="collapse-1" class="mt-2">
                                <textarea v-model="mediaInfo" disabled class="textArea mt-2 mb-2"></textarea>
                            </b-collapse>
                        </form>
                    </b-card>

                    <!-- Header - Details page Ends here-->
                    <div v-if="baseUrl === 'item'">
                        <ItemDetails></ItemDetails>
                    </div>
                    <div v-else-if="baseUrl === 'file'">
                        <OutputFile />
                    </div>
                    <div class v-else>
                        <!-- Title ends here -->
                        <b-card class="text-left m-3">
                            <!-- Title - Listing page -->
                            <!-- <h3 v-if="baseUrl == 'unit' && !purpose">My Units</h3>
                            <h3 v-else-if="baseUrl == 'collection' && !purpose">My Collections</h3>-->

                            <!-- Title - Unit Details page  -->
                            <div class="d-flex w-100" v-if="baseUrl == 'unit'">
                                <div class="col-3 text-left">
                                    <h2>Unit Collections</h2>
                                </div>
                                <div class="col-9 text-right p0">
                                    <button
                                        class="btn btn-primary btn-lg btn-edit mr-2"
                                        type="button"
                                        @click="onCreateCollection()"
                                    >Create New Collection</button>
                                    <button
                                        class="btn btn-primary btn-lg btn-edit"
                                        type="button"
                                        @click="onSearch('listing-collection')"
                                    >Search Collections</button>
                                </div>
                            </div>
                            <!-- Title - Collection Details page  -->
                            <div class="row w-100" v-if="baseUrl == 'collection'">
                                <div class="col-3 text-left">
                                    <h2>Collection Items</h2>
                                </div>
                                <div class="col-9 text-right p-0">
                                    <button
                                        class="btn btn-primary btn-lg btn-edit mr-2"
                                        type="button"
                                        @click="onCreateItem"
                                    >Create New Item</button>
                                    <button
                                        class="btn btn-primary btn-lg btn-edit"
                                        type="button"
                                        @click="onSearch('listing-item')"
                                    >Search Items</button>
                                </div>
                            </div>
                            <div class="row" v-if="(records && records.length)">
                                <b-card
                                    class="m-3 w-100 text-left"
                                    v-for="elem in records"
                                    :key="elem.id"
                                >
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-11">
                                                <h4>{{ elem.name }}</h4>
                                                <p>{{ elem.description }}</p>
                                            </div>
                                            <div class="col-1 text-right">
                                                <label
                                                    class="switch"
                                                    :title="elem.active ? 'Deactivate' : 'Activate'"
                                                    v-if="baseUrl == 'unit'"
                                                >
                                                    <input type="checkbox" v-model="elem.active" />
                                                    <span class="slider round"></span>
                                                </label>
                                                <div v-if="((elem.active && baseUrl == 'unit') || baseUrl !== 'unit')">
                                                    <button
                                                        class="btn btn-primary btn"
                                                        @click="onView(elem)"
                                                    >View</button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Reusing same components for details page, so based on condition we are displaying the data -->
                                        <div class="row w-100" v-if="purpose">
                                            <div class="col-3" v-if="baseUrl == 'unit'">
                                                <label>Task Manager</label>
                                                <p>{{ elem.taskManager }}</p>
                                            </div>
                                            <div class="col-2" v-if="baseUrl == 'collection'">
                                                <label>Source Name</label>
                                                <p>{{ elem.externalSource }}</p>
                                            </div>
                                            <div class="col-2" v-if="baseUrl == 'collection'">
                                                <label>Source Id</label>
                                                <p>{{ elem.externalId }}</p>
                                            </div>
                                            <div class="col-2">
                                                <label>Date Created:</label>
                                                <p>{{ elem.createdDate | DDMMYYYY }}</p>
                                            </div>
                                            <div class="col-2">
                                                <label>Created By</label>
                                                <p>{{ elem.createdBy }}</p>
                                            </div>
                                            <div class="col-2">
                                                <label>Modified By</label>
                                                <p>{{ elem.modifiedBy }}</p>
                                            </div>
                                            <div class="col-2">
                                                <label>Modified Date</label>
                                                <p>{{ elem.modifiedDate | DDMMYYYY }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                            <div class="col-12 text-left" v-if="(!records || !records.length)">
                                <p>-No records found-</p>
                            </div>
                        </b-card>
                    </div>
                </main>
            </div>
        </div>
        <Search :searchType="searchType" :dataSource="masterRecords" @myEvent="onSearchDone" isEntityList="true"/>
    </div>
</template>

<script>

import { sync } from "vuex-pathify";
import config from '../../assets/constants/common-contant.js';
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
import Loader from '@/components/shared/Loader.vue';
import CollectionService from '../../service/collection-service';
import UnitService from '../../service/unit-service';
import SharedService from '../../service/shared-service';
import ItemService from "../../service/item-service";
import ItemDetails from "./ItemDetails.vue";
import OutputFile from "./OutputFile.vue";
import PrimaryFileService from "../../service/primary-file-service.js";
import Search from "@/components/shared/Search.vue";
import BaseService from "../../service/base-service";
export default {
    name: "EntityList",
    components: {
    Logout,
    Sidebar,
    Loader,
    ItemDetails,
    Search,
    OutputFile
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
            records: [],
            masterRecords: [],
            showLoader: false,
            entity: {},
            showEdit: false,
            infoSvg: config.common.icons['info'],
            searchType: "",
            submitted: false,
            isDataChanged: false
        }
    },
    computed: {
        selectedCollection: sync("selectedCollection"),
        selectedUnit: sync("selectedUnit"),
        selectedItem: sync("selectedItem"),
        selectedFile: sync("selectedFile"),
        baseUrl() {
            const self = this;
            if (window.location.hash.toLowerCase().indexOf('unit') > -1) {
                return "unit";
            } else if (window.location.hash.toLowerCase().indexOf('file') > -1) {
                return "file";
            }
            else if (window.location.hash.toLowerCase().indexOf('collection') > -1 && window.location.hash.toLowerCase().indexOf('item') === -1) {
                return "collection";
            } else if (window.location.hash.toLowerCase().indexOf('item') > -1) {
                return "item";
            }
            return "";
        },
        purpose() {
            return window.location.hash.toLowerCase().indexOf('details') > -1 ? "details" : "";
        },
        isCreatePage() {
            return (window.location.hash.toLowerCase().indexOf('create') > -1 || window.location.hash.toLowerCase().indexOf('add-item') > -1)
        },
        listOfTaskManager() {
            return ["Trello", "Jira"];

        },
        mediaInfo() {
            return (this.selectedFile && this.selectedFile.mediaInfo) ? JSON.stringify(JSON.parse(this.selectedFile.mediaInfo), undefined, 4) : "";
        }
    },
    methods: {
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

            } else if (self.baseUrl === 'item') {
                self.entity = self.selectedItem;
                self.showLoader = false;
                if (self.isCreatePage) {
                    self.selectedItem = self.entity = {};
                    self.showEdit = false;
                }
            } else if (self.baseUrl === 'file') {
                self.entity = self.selectedFile;
                self.showLoader = false;
            }
        },
        async getUnitDetails() {
            const self = this;
            self.unitService.getUnitById(33).then(response => {
                self.selectedUnit = response;
                self.entity = response;
                this.getUnitCollections();
            });
        },
        async getUnitCollections() {
            const self = this;
            self.collectionService.getCollectionByUnitId(self.selectedUnit.id).then(response => {
                self.showLoader = false;
                if (response && response && response._embedded) {
                    self.records = response._embedded[Object.keys(response._embedded)[0]];
                    self.records = self.sharedService.sortByAlphabatical(self.records);
                    self.masterRecords = JSON.parse(JSON.stringify(self.records));
                }
            });
        },
        async getCollectionItems() {
            const self = this;
            self.itemService.getCollectionItems(self.selectedCollection.id).then(response => {
                self.showLoader = false;
                if (response && response.data && response.data._embedded) {
                    self.records = response.data._embedded[Object.keys(response.data._embedded)[0]];
                    self.records = self.sharedService.sortByAlphabatical(self.records);
                    self.masterRecords = JSON.parse(JSON.stringify(self.records));
                }
            });
        },
        onView(objInstance) {
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
            if (self.baseUrl === 'unit') {
                const self = this;
                self.unitService.updateUnitDetails(self.selectedUnit.id, self.entity).then(response => {
                    self.$bvToast.toast("Unit details updated successfully.", self.sharedService.successToastConfig);
                });
            } else if (self.baseUrl === 'collection') {
                self.submitted = true;

                // Collection Validation rules
                if (!self.entity.name || !self.entity.taskManager) {

                    self.$bvToast.toast("Please provide required fields!", self.sharedService.erorrToastConfig);
                    return false;

                }
                if (!self.isCreatePage) {

                    self.collectionService.updateCollection(self.entity).then(reponse => {
                        self.$bvToast.toast("Collection details updated successfully", self.sharedService.successToastConfig);
                        self.showEdit = !self.showEdit;
                        self.submitted = false;
                    }).catch(error => {
                        self.submitted = false;
                        if (error.response && error.response.data && error.response.data.validationErrors) {
                            const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                            errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                        } else {
                            self.$bvToast.toast("Collection creation failed!", self.sharedService.erorrToastConfig);
                        }
                    });
                } else {

                    self.entity.unit = self.baseService.API_URL + `/units/${self.selectedUnit.id}`;
                    self.collectionService.createCollection(self.entity).then(reponse => {
                        self.$bvToast.toast("Collection created successfully", self.sharedService.successToastConfig);
                        self.showEdit = !self.showEdit;
                        self.submitted = false;
                    }).catch(error => {
                        self.submitted = false;
                        if (error.response && error.response.data && error.response.data.validationErrors) {
                            const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                            errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                        } else {
                            self.$bvToast.toast("Collection creation failed!", self.sharedService.erorrToastConfig);
                        }
                    });
                }

            } else if (self.baseUrl === 'file') {
                self.primaryFileService.updatePrimaryFile(self.entity).then(reponse => {
                    self.$bvToast.toast("File details updated successfully", { title: 'Notification', appendToast: true, variant: "success", autoHideDelay: 5000 });
                    self.showEdit = !self.showEdit;
                }).catch(error => self.$bvToast.toast("File details updation failed!", { title: 'Notification', appendToast: true, variant: "danger", autoHideDelay: 5000 }));
            }
        },
        onCancel() {
            var result = confirm("Are you sure want to cancel!")
            if (result) this.showEdit = !this.showEdit;
        },
        onSearch(type) {
            this.searchType = type;
            this.$bvModal.show('modal-lg');
        },
        onSearchDone(records) {
            this.records = records && records.length ? records: this.masterRecords;
        },
        onInputChange(ev) {
            this.isDataChanged = true;
        }
        

    },
    beforeRouteLeave (to, from, next) {
      if(this.isDataChanged) {
          this.$bvModal.msgBoxConfirm(`Changes you have made may not be saved.`, {
          title: 'Notification',
          size: 'md',
          buttonSize: 'sm',
        //   okVariant: 'danger',
          okTitle: 'Leave',
          cancelTitle: 'Cancel',
          footerClass: 'p-2',
          hideHeaderClose: true,
          centered: false,
          noCloseOnBackdrop: true
        })
          .then(value => {
            if(value) next();
          })
          .catch(err => {
            // An error occurred
          })
      } else {
          next();
      }
    },
    mounted() {
        const self = this;
        self.showLoader = true;
        self.getData();
    }

}
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
</style>
