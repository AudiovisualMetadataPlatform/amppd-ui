<template>
  <div class="collection dataTables_wrapper">
    <div class="container col-12">
      <div class="row expand-h">
        <Sidebar />
        <div class="col-10 bg-light-gray-1">
          <!-- main -->

          <main class="main-margin-min">
            <Logout />
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-title">
                    Edit collection
                  </h1>
                  <form>
                    <div class="form-group">
                      <label for="collection-name">Collection Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="collection-name"
                        value="test"
                        v-model="collectionDetails.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        id="description"
                        class="form-control"
                        v-model="collectionDetails.description"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="collection-name">Task Manager</label>
                      <select
                        class="browser-default custom-select"
                        v-model="collectionDetails.taskManager"
                      >
                        <option value="Trello">Trello</option>
                        <option value="Jira">Jira</option>
                      </select>
                    </div>
                    <div
                      v-if="this.collectionDetails"
                      class="form-row marg-bot-2"
                    >
                      <div class="col">
                        <label for="created-by">Created by</label>
                        <input
                          disabled
                          type="text"
                          class="form-control"
                          id="created-by"
                          :value="collectionDetails.createdBy"
                        />
                        <!-- :value="userDetails.username" -->
                      </div>
                      <div class="col">
                        <label for="create-date">Date Created</label>
                        <input
                          disabled
                          type="date"
                          class="form-control"
                          id="create-date"
                          :value=" new Date(collectionDetails.createdDate).getFullYear() + '-' + ('0' + (new Date(collectionDetails.createdDate).getMonth() + 1)).slice(-2) + '-' + ('0' + new Date(collectionDetails.createdDate).getDate()).slice(-2)"
                        />
                        <!-- :value="this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' + ('0' + this.today.getDate()).slice(-2)" -->
                      </div>
                    </div>

                    <div
                      v-if="this.collectionDetails"
                      class="form-row marg-bot-2"
                    >
                      <div class="col">
                        <label for="created-by">Modified by</label>
                        <input
                          disabled
                          type="text"
                          class="form-control"
                          id="modified-by"
                          :value="collectionDetails.modifiedBy"
                        />
                      </div>
                      <div class="col">
                        <label for="create-date">Modified Date </label>
                        <input
                          disabled
                          type="date"
                          class="form-control"
                          id="modified-date"
                          :value=" new Date(collectionDetails.modifiedDate).getFullYear() + '-' + ('0' + (new Date(collectionDetails.modifiedDate).getMonth() + 1)).slice(-2) + '-' + ('0' + new Date(collectionDetails.modifiedDate).getDate()).slice(-2)"
                        />
                      </div>
                    </div>

                    <div>
                      <a
                        href="/#/collections/add-item-to-collection"
                        class="btn btn-outline-primary"
                        >Add items to collection</a
                      >
                      <button
                      type="button"
                        class="btn btn-primary"
                        v-on:click="saveCollection()"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
// import CollectionDetailsService from "../../service/collection-detail-service";
// import CollectionDetailsItemCard from "./CollectionDetailsItemCard.vue";
import CollectionService from "../../service/collection-service.js";

export default {
  name: "EditCollection",
  components: {
    Sidebar,
    Logout,
    // CollectionDetailsItemCard,
  },
  props: {},
  computed: {
    collectionDetails: sync("collectionDetails"),
  },
  data() {
    return {
      CollectionService: new CollectionService(),
      collectionName: null,
      description: null,
      taskManager: null,
    };
  },

  methods: {
    async saveCollection() {
      let self = this;
      let CollectionDetail = {
        name: self.collectionDetails.name,
        description: self.collectionDetails.description
        // externalSource: "MCO",
        // externalId: this.collectionDetails.externalId,
        // taskManager: this.collectionDetails.taskManager,
        // unit: "http://localhost:8200/rest/units/2",
      };

      this.CollectionService.editCollection(self.collectionDetails.id,CollectionDetail).then(
        (response) => {
         
        }
      ).catch(err=>{})
      ;
    },
  },
  mounted() {
    let self = this;
  },
};
</script>

<style >
</style>