<template>
    <div class="container col-12">
        <b-card>
            <h2 v-if="isCreatePage">Create a new collection</h2>
            <h2 v-if="!isCreatePage">Collection Details</h2>
            <form name="collectionForm" class="form mt-5">
                <div class="row">
                    <div class="col-6 text-left form-group">
                        <label>Collection Name</label>
                        <input type="text" class="form-control w-100" v-model="collection.name" :disabled="showEdit"/>
                    </div>
                    <div class="col-6 text-left form-group">
                        <label>Task Manager</label>
                        <select class="select custom-select w-100" v-model="collection.taskManager" :disabled="showEdit">
                            <option v-for="option in listOfTaskManager" :key="option">{{ option }}</option>
                        </select>
                    </div>
                </div>

                <div class="col-12 text-left form-group p-0">
                    <label>Description</label>
                    <textarea class="form-control w-100" v-model="collection.description" :disabled="showEdit"></textarea>
                </div>

                <div class="row">
                    <div class="col-6 p-0">
                        <div class="col-12 text-left form-group">
                            <label>Created By</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="collection.createdBy"
                                :disabled="!isCreatePage"
                            />
                        </div>
                        <div class="col-12 text-left form-group">
                            <label>Modified By</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="collection.modifiedBy"
                                :disabled="!isCreatePage"
                            />
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="col-12 text-left form-group">
                            <label>Date Created</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="collection.createdDate"
                                :disabled="!isCreatePage"
                            />
                        </div>
                        <div class="col-12 text-left form-group">
                            <label>Modified Date</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="collection.modifiedDate"
                                :disabled="!isCreatePage"
                            />
                        </div>
                    </div>
                </div>

                <div class="w-100 text-right p-0">
                    <div v-if="!showEdit">
                        <button class="btn btn-outline btn-lg btn-edit mr-2" type="button" @click="onCancel">Cancel</button>
                        <button
                            class="btn btn-outline-primary btn-lg btn-edit mr-2"
                            type="button"
                            v-if="isCreatePage"
                        >Add items to collection</button>
                        <button class="btn btn-primary btn-lg btn-edit" type="button" @click="onCreateCollection" v-if="isCreatePage">Create</button>
                        <button class="btn btn-primary btn-lg btn-edit" type="button" @click="onUpdateCollection" v-if="!isCreatePage">Save</button>
                    </div>
                    <button
                        class="btn btn-primary btn-lg btn-edit"
                        type="button"
                        @click="showEdit = !showEdit"
                        v-if="showEdit"
                    >Edit</button>
                </div>
            </form>
        </b-card>
    </div>
</template>

<script>
import { sync } from 'vuex-pathify';
import { env } from '../../helpers/env';
import CollectionService from '../../service/collection-service';
export default {
    name: "Collection",
    components: {},
    props: {},
    data() {
        return {
            collection: {},
            showEdit: true,
            collectionService: new CollectionService()
        }
    },
    computed: {
        listOfTaskManager() {
            return ["Trello", "Jira"];

        },
        isCreatePage() {
            const self = this;
            if (window.location.hash.toLowerCase().indexOf('create') > -1) {
                self.showEdit = false;
                return true;
            } 
            return false;
        },
        selectedUnit: sync("selectedUnit"),
        selectedCollection: sync("selectedCollection")
    },
    methods: {
        onCancel() {
        var result = confirm("Are you sure want to cancel!")
        if(result) this.showEdit = !this.showEdit;
        },
        async getCollectionDetails() {
            const self = this;
            self.collectionService.getCollectionPage().then(response => {
                self.collection = response;
            });
        },
        async onCreateCollection() {
            
            const self = this;
            self.collection.unit = env.getAmpUrl() + `/units/${self.selectedUnit.id}`;
            self.collectionService.createCollection(self.collection).then(reponse => {
                alert("Collection created successfully")
            }).catch(error => alert("Collection creation failed!"));
        },
        async onUpdateCollection() {
            const self = this;
            self.collectionService.updateCollection(self.collection).then(reponse => {
                alert("Collection updated successfully");
                self.showEdit = !self.showEdit;
            }).catch(error => alert("Collection updation failed!"));
        },
    },
    mounted() {
        const self = this;
        if(!self.isCreatePage)
            self.collection = self.selectedCollection;
            // self.getCollectionDetails();
    }
}
</script>