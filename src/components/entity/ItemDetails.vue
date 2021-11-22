<template>
<div class="container col-12 dataTables_wrapper">
    <div class="row expand-h">
      <Sidebar />
      <div class="col-10 bg-light-gray-1">
        <main class="main-margin-min">
          <Logout />
          <div class="pad-all-3">
            <b-card class="m-3 text-left">
            <div v-if="!selectedItem">
                <h2>Add item</h2>
                <!-- <p v-if="selectedCollection">Adding item to Collection: {{selectedCollection.name}}</p> -->
            </div>
            <h2 v-if="selectedItem">Item Details</h2>
            <form name="itemForm" class="form">
                <div class="col-12 text-left form-group p-0">
                    <label>Item Name</label>
                    <input type="text" class="form-control w-100" v-model="selectedItem.name" />
                </div>

                <div class="col-12 text-left form-group p-0">
                    <label>Description</label>
                    <textarea class="form-control w-100" v-model="selectedItem.description"></textarea>
                </div>

                <div class="row">
                    <div class="col-6 p-0">
                        <div class="col-12 text-left form-group">
                            <label>Created By</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="selectedItem.createdBy"
                                :disabled="true"
                            />
                        </div>
                        <div class="col-12 text-left form-group">
                            <label>Modified By</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="selectedItem.modifiedBy"
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
                                v-model="selectedItem.createdDate"
                                :disabled="true"
                            />
                        </div>
                        <div class="col-12 text-left form-group">
                            <label>Modified Date</label>
                            <input
                                type="text"
                                class="form-control w-100"
                                v-model="selectedItem.modifiedDate"
                                :disabled="true"
                            />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6 text-left form-group">
                        <label>External Source</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            v-model="selectedItem.externalSource"
                        />
                    </div>
                    <div class="col-6 text-left form-group">
                        <label>External Id</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            v-model="selectedItem.externalId"
                        />
                    </div>
                </div>

                <div class="w-100 text-right p-0">
                    <div v-if="!showEdit">
                        <button
                            class="btn btn-outline btn-lg btn-edit mr-2"
                            type="button"
                            @click="onCancel"
                        >Cancel</button>
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
        </b-card>

        <b-card class="m-3 text-left">
            <h2 class="mb-3">Files</h2>
            <table
                class="table"
                v-if="PrimaryFiles._embedded.primaryfiles && PrimaryFiles._embedded.primaryfiles.length"
            >
                <thead>
                    <th>File Label</th>
                    <th>Filename</th>
                    <th>Description</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="file in PrimaryFiles._embedded.primaryfiles" :key="file.id">
                        <td>
                            <input type="text" class="w-100" v-model="file.name" />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="w-100"
                                v-model="file.originalFilename"
                                :disabled="true"
                            />
                        </td>
                        <td>
                            <input type="text" class="w-100" v-model="file.description" />
                        </td>
                        <td>
                            <a
                                href="/collections/file.html"
                                class="btn btn-primary btn float-right"
                            >View</a>
                            <button class="btn btn-link add-remove float-right mr-1">Remove file</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-2 mb-2">
                <small>Upload progress</small>
                <br />
                <div class="progress">
                    <div
                        class="progress-bar"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 60%;"
                    >
                        <span class="sr-only">60% Complete</span>
                    </div>
                </div>
            </div>

            <div class="mt-3 panel panel-default" @dragover.prevent @drop.prevent>
                <div class="panel-heading">
                    <strong>Upload files</strong>
                </div>
                <div class="panel-body">
                    <div class="input-group image-preview">
                        <input
                            type="file"
                            class="form-control-file btn btn-light btn-lg"
                            id="exampleFormControlFile1"
                            value="Upload batch manifest"
                        />
                    </div>
                    <!-- /input-group image-preview [TO HERE]-->

                    <br />

                    <!-- Drop Zone -->
                    <div
                        class="upload-drop-zone"
                        id="drop-zone"
                        @drop="dragFile"
                    >Or drag and drop files here</div>
                    <br />
                </div>
            </div>
            <div class="d-flex justify-content-between w-100">
                <div>
                    <button type="submit" class="btn btn btn-outline btn-lg marg-all-1">Clear</button>
                </div>
                <div class="float-right">
                    <button
                        type="submit"
                        class="btn marg-all-1 btn btn-outline btn-lg"
                    >Add another item</button>

                    <button type="submit" class="marg-all-1 btn btn-primary btn-lg">Save</button>
                </div>
            </div>
        </b-card>
          </div>

          
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify';
import PrimaryFileService from "../../service/primary-file-service";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';

export default {
    Name: "ItemDetails",
    components: {
        Logout,
        Sidebar
    },
    props: {},
    data() {
        return {
            fileService: new PrimaryFileService(),
            showEdit: true
        }
    },
    computed: {
        Items: sync("Items"),
        selectedItem: sync("selectedItem"),
        selectedCollection: sync("selectedCollection"),
        PrimaryFiles: sync("PrimaryFiles")
    },
    methods: {
        onCancel() {
            var result = confirm("Are you sure want to cancel!")
            if (result) this.showEdit = !this.showEdit;
        },
        async getPrimaryFiles() {
            const self = this;
            self.fileService.getPrimaryFiles(self.selectedItem.id).then(response => {
                self.PrimaryFiles = response.data;
            });
        },
        dragFile(e) {
            console.log(e.dataTransfer.files, 'files');
        }
    },
    mounted() {
        const self = this;
        if (self.selectedItem && self.selectedItem.id)
            self.getPrimaryFiles();
    }
}
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
</style>