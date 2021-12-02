<template>
<div class="w-100">
    <b-card class="text-left" v-if="!isCreatePage">
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
                            <button class="btn btn-link add-remove float-right mr-1"><span v-html="removeIcon" class="pr-1"></span>Remove file</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-2 mb-2" v-if="false">
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
                            @change="uploadFile"
                        />
                    </div>
                    <!-- /input-group image-preview [TO HERE]-->

                    <br />

                    <!-- Drop Zone -->
                    <div
                        class="upload-drop-zone"
                        id="drop-zone"
                        @drop="uploadFile"
                    >Or drag and drop files here</div>
                    <br />
                </div>
            </div>
            <div class="d-flex justify-content-between w-100" v-if="!isCreatePage ">
                <div></div>
                <div class="float-right">
                    <button type="submit" class="btn btn btn-outline btn-lg marg-all-1">Clear</button>
                    <button
                        type="submit"
                        class="btn marg-all-1 btn btn-outline btn-lg"
                    >Add another item</button>

                    <button type="submit" class="marg-all-1 btn btn-primary btn-lg">Save</button>
                </div>
            </div>
        </b-card>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify';
import { env } from '../../helpers/env';
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
import ItemService from '../../service/item-service';
import PrimaryFileService from "../../service/primary-file-service";
import SharedService from '../../service/shared-service';
import config from '../../assets/constants/common-contant.js';

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
            itemService: new ItemService(),
            sharedService: new SharedService(),
            showEdit: true,
            removeIcon: config.common.icons['remove'],
            files: []
        }
    },
    computed: {
        Items: sync("Items"),
        selectedItem: sync("selectedItem"),
        selectedCollection: sync("selectedCollection"),
        PrimaryFiles: sync("PrimaryFiles"),
        isCreatePage() {
            return (window.location.hash.toLowerCase().indexOf('add-item') > -1)
        }
    },
    methods: {
        onCancel() {
            var result = confirm("Are you sure want to cancel!")
            if (result) this.showEdit = !this.showEdit;
        },
        async getPrimaryFiles() {
            const self = this;
            self.fileService.getPrimaryFiles(6079).then(response => {
                self.PrimaryFiles = response.data;
                if(self.PrimaryFiles) {
                    self.PrimaryFiles = self.sharedService.sortByAlphabatical(self.PrimaryFiles);
                }
            });
        },
        uploadFile(e) {
            const fileList = (e.target.files || e.dataTransfer.files);
            // const fileList = (e.target.files);
            const formData = new FormData(); 
            fileList.forEach(file => {
                this.files.push(file);
                formData.append('file', file, file.name);
            });
            this.fileService.uploadFile(this.selectedItem.id, formData).then(el => {}).catch(error => {console.log(error, "error")});
        },
        getFile(e) {
            
        },
        onSaveItem() {
            const self = this;
            if(self.isCreatePage){
                self.selectedItem = {
                    ...self.selectedItem,
                    collection: env.getAmpUrl() + `/collections/${self.selectedCollection.id}`
                }
                self.itemService.addItemToCollection(self.selectedItem).then(reponse => {
                    self.$bvToast.toast("Item added successfully", {title: 'Notification',appendToast: true,variant:"success", autoHideDelay:5000});
                    self.$router.push("/collection/details");
                }).catch(error => {
                    self.$bvToast.toast("Failed to add an Item", {title: 'Notification',appendToast: true,variant:"danger", autoHideDelay:5000});
                });
            } else {
                self.itemService.updateItem(self.selectedItem).then(reponse => {
                    self.$bvToast.toast("Item updated successfully", {title: 'Notification',appendToast: true,variant:"success", autoHideDelay:5000});
                }).catch(error => {
                   self.$bvToast.toast("Failed to add an Item", {title: 'Notification',appendToast: true,variant:"danger", autoHideDelay:5000});
                   
                });
            }
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
.btn-primary {
  background: #F4871E !important;
  border-color: #F4871E !important;
  color: #153c4d !important; }

.btn-primary:hover, .btn-secondary:hover, .btn-outline-primary:hover {
  background: #153c4d !important;
  border-color: #153c4d v;
  color: #fff !important; }
</style>