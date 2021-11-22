<template>
    <div class="container col-12 dataTables_wrapper">
        <div class="row">
            <Sidebar />
            <div class="col-10 bg-light-gray-1">
                <main class="main-margin-min">
                    <Logout />
                    <!-- Header - Details page -->
                    <div class="mt-4">
                        <span v-if="purpose && baseUrl == 'unit'">
                            <Unit></Unit>
                        </span>
                        <span v-if="purpose && baseUrl == 'collection'">
                            <Collection />
                        </span>
                    </div>
                    <!-- Header - Details page Ends here-->

                    <div class>
                        <!-- Title ends here -->
                        <b-card class="text-left m-3">
                            <!-- Title - Listing page -->
                            <h3 v-if="baseUrl == 'unit' && !purpose">My Units</h3>
                            <h3 v-else-if="baseUrl == 'collection' && !purpose">My Collections</h3>

                            <!-- Title - Unit Details page  -->
                            <div class="d-flex w-100" v-if="baseUrl == 'unit' && purpose">
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
                                    >Search Collections</button>
                                </div>
                            </div>
                            <!-- Title - Collection Details page  -->
                            <div class="row w-100" v-if="baseUrl == 'collection' && purpose">
                                <div class="col-3 text-left">
                                    <h2>Collection Items</h2>
                                </div>
                                <div class="col-9 text-right p-0">
                                    <button
                                        class="btn btn-primary btn-lg btn-edit mr-2"
                                        type="button"
                                    >Create New Item</button>
                                    <button
                                        class="btn btn-primary btn-lg btn-edit"
                                        type="button"
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
                                                >
                                                    <input type="checkbox" v-model="elem.active" />
                                                    <span class="slider round"></span>
                                                </label>
                                                <div>
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
    </div>
</template>

<script>

import { sync } from "vuex-pathify";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
import CollectionService from '../../service/collection-service';
import UnitService from '../../service/unit-service';
import Unit from './Unit.vue';
import Collection from "./Collection.vue";
export default {
    name: "ListingPage",
    components: {
        Logout,
        Sidebar,
        Unit,
        Collection
    },
    props: [],
    data() {
        return {
            unitService: new UnitService(),
            collectionService: new CollectionService(),
            records: []
        }
    },
    computed: {
        selectedCollection: sync("selectedCollection"),
        selectedUnit: sync("selectedUnit"),
        selectedItem: sync("selectedItem"),
        baseUrl() {
            const self = this;
            if (window.location.hash.toLowerCase().indexOf('unit') > -1) {
                return "unit";
            } else if (window.location.hash.toLowerCase().indexOf('collection') > -1) {
                return "collection";
            }
            return "";
        },
        purpose() {
            return window.location.hash.toLowerCase().indexOf('details') > -1 ? "details" : "";
        }
    },
    methods: {
        async getData() {
            const self = this;
            let method, service;
            if (self.baseUrl === "unit") {
                service = self.unitService;
                method = "getAllUnits";
            } else if (self.baseUrl === "collection") {
                service = self.collectionService;
                method = "getCollectionPage";
            }
            service[method]().then(response => {
                if (response && response.data && response.data._embedded) {
                    self.records = response.data._embedded[Object.keys(response.data._embedded)[0]];
                }

            });
        },
        onView(objInstance) {
            const self = this;
            if (self.baseUrl === "unit" && !self.purpose) {
                self.selectedUnit = objInstance;
                self.$router.push("/unit/details");
            } else if (self.baseUrl === "collection" && self.purpose) {
                self.selectedItem = objInstance;
                self.$router.push("/collections/items/details");
            } else if (self.baseUrl === "unit" && self.purpose) {
                self.selectedCollection = objInstance;
                self.$router.push("/collections/collection-details");
            } else if (self.baseUrl === "collection" && !self.purpose) {
                self.selectedCollection = objInstance;
                self.$router.push("/collection/details");
            }

        },
        onCreateCollection() {
            const self = this;
            self.$router.push("/collection/create");
        }
    },
    mounted() {
        const self = this;
        self.getData();
    }

}
</script>

<style scoped>
@import "/amppd-ui/src/styles/style.css";
</style>
