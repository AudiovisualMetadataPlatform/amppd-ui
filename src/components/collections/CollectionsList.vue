<template>
    <div>
        <b-card class="text-center m-3">
            <div class="row w-100">
                <div class="col-3 text-left">
                    <h2>Unit Collections</h2>
                </div>
                <div class="col-9 text-right">
                    <button
                        class="btn btn-primary btn-lg btn-edit mr-2"
                        type="button"
                        @click="onCreateCollection()"
                    >Create New Collection</button>
                    <button class="btn btn-primary btn-lg btn-edit" type="button">Search Collections</button>
                </div>
            </div>

            <div class="row" v-if="(collections && collections.length)">
                <b-card
                    class="m-3 w-100 text-left"
                    v-for="collection in collections"
                    :key="collection.id"
                >
                    <div class="col-12">
                        <div class="row">
                            <div class="col-11">
                                <h4>{{ collection.name }}</h4>
                                <p>{{ collection.description }}</p>
                            </div>
                            <div class="col-1 text-right">
                                <label
                                    class="switch"
                                    :title="collection.active ? 'Deactivate' : 'Activate'"
                                >
                                    <input type="checkbox" v-model="collection.active" />
                                    <span class="slider round"></span>
                                    
                                </label>
                                <div>
                                    <button
                                        :disabled="!collection.active"
                                        class="btn btn-primary btn"
                                        @click="onView(collection)"
                                    >View</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <label>Task Manager</label>
                                <p>{{ collection.taskManager }}</p>
                            </div>
                            <div class="col-2">
                                <label>Date Created:</label>
                                <p>{{ collection.createdDate | DDMMYYYY }}</p>
                            </div>
                            <div class="col-2">
                                <label>Created By</label>
                                <p>{{ collection.createdBy }}</p>
                            </div>
                            <div class="col-2">
                                <label>Modified By</label>
                                <p>{{ collection.modifiedBy }}</p>
                            </div>
                            <div class="col-2">
                                <label>Modified Date</label>
                                <p>{{ collection.modifiedDate | DDMMYYYY }}</p>
                            </div>
                        </div>
                    </div>
                </b-card>
            </div>
            <div class="col-12 text-left" v-if="(!collections || !collections.length)">
                <p>-No records found-</p>
            </div>
        </b-card>
    </div>
</template>

<script>
import CollectionService from "../../service/collection-service";
import { sync } from "vuex-pathify";
export default {
    name: "CollectionsList",
    components: {},
    data() {
        return {
            collectionService: new CollectionService(),
            collections: []
        }
    },
    props: {},
    computed: {
        selectedCollection: sync("selectedCollection")
    },
    methods: {
        async getCollectionByUnitId() {
            const self = this;
            self.collectionService.getCollectionByUnitId(33).then(response => {
                if (response && response._embedded) {
                    self.collections = response._embedded.collections;
                }

            });
        },
        onView(collection) {
            const self = this;
            debugger;
            self.selectedCollection = collection;
            self.$router.push("/collections/collection-details");
        },
        onCreateCollection() {
            const self = this;
            self.$router.push("/collections/create");
        }
    },
    mounted() {
        const self = this;
        self.getCollectionByUnitId();
    }

}
</script>

<style scoped>
@import "/amppd-ui/src/styles/style.css";
</style>
