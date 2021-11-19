<template>
    <div class="container col-12">
        <h2 v-if="isCreatePage">Create a new collection</h2>
        <h2 v-if="!isCreatePage">Collection Details</h2>
        <form name="collectionForm" class="form">
            <div class="row">
                <div class="col-6 text-left form-group">
                    <label>Collection Name</label>
                    <input type="text" class="form-control w-100" v-model="collection.name" />
                </div>
                <div class="col-6 text-left form-group">
                    <label>Task Manager</label>
                    <select class="select custom-select w-100" v-model="collection.taskManager">
                        <option v-for="option in listOfTaskManager" :key="option">{{ option }}</option>
                    </select>
                </div>
            </div>

            <div class="col-12 text-left form-group p-0">
                <label>Description</label>
                <textarea class="form-control w-100" v-model="collection.description"></textarea>
            </div>

            <div class="row">
                <div class="col-6 p-0">
                    <div class="col-12 text-left form-group">
                        <label>Created By</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            v-model="collection.createdBy"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-12 text-left form-group">
                        <label>Modified By</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            v-model="collection.modifiedBy"
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
                            v-model="collection.createdDate"
                            :disabled="true"
                        />
                    </div>
                    <div class="col-12 text-left form-group">
                        <label>Modified Date</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            v-model="collection.modifiedDate"
                            :disabled="true"
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
                    <button class="btn btn-primary btn-lg btn-edit" type="button">Save</button>
                </div>
                <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="showEdit = !showEdit"
                    v-if="showEdit"
                >Edit</button>
            </div>
        </form>
    </div>
</template>

<script>
import CollectionService from '../../service/collection-service';
export default {
    name: "Collection",
    components: {},
    props: {},
    data() {
        return {
            collection: {},
            showEdit: true,
            isCreatePage: window.location.pathname.indexOf('create') > -1,
            collectionService: new CollectionService()
        }
    },
    computed: {
        listOfTaskManager() {
            return ["Trello", "Jira"];

        }
    },
    methods: {
        onCancel() {
        var result = confirm("Are you sure want to cancel!")
        if(result) this.showEdit = !this.showEdit;
        },
        async getCollectionDetails() {
            const self = this;
            self.collectionService.activateCollection(13, true).then(response => {
                self.collection = response;
            });
        }
    },
    mounted() {
        const self = this;
        if(!self.isCreatePage)
            self.getCollectionDetails();
    }
}
</script>