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
                  <h1 class="card-title">Create a new collection</h1>
                  <form>
                    <div class="form-group">
                      <label for="collection-name">Collection Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="collection-name"
                        v-model="collectionName"
                      />
                     
                    </div>
                     <p v-if="error!=null">{{this.error[0].message}}<p>
                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        id="description"
                        class="form-control"
                        v-model="description"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="collection-name">Task Manager</label>
                      <select
                        class="browser-default custom-select"
                        v-model="taskManager"
                      >
                        <option value="Trello">Trello</option>
                        <option value="Jira">Jira</option>
                      </select>
                    </div>
                    <div>
                      <!-- <a
                        href="/#/collections/add-item-to-collection"
                        class="btn btn-outline-primary"
                        >Add items to collection</a
                      > -->
                      <button
                        type="submit"
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
// import { sync } from "vuex-pathify";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import CollectionDetailsService from "../../service/collection-detail-service";
import CollectionDetailsItemCard from "./CollectionDetailsItemCard.vue";
import CollectionService from "../../service/collection-service.js";

export default {
  name: "CreateCollection",
  components: {
    Sidebar,
    Logout,
    CollectionDetailsItemCard,
  },
  props: {
    collectionDetails: Object,
  },
  data() {
    return {
      CollectionService: new CollectionService(),
      today: new Date(),
      collectionName: null,
      description: null,
      taskManager: null,
      error:null,
    };
  },
  computed: {
    // userDetails: sync("userDetails"),
  },
  methods: {
    async saveCollection() {
      let self = this;
      let CollectionDetails = {
        name: this.collectionName,
        description: this.description,
        externalSource: "MCO",
        externalId: "1234567890",
        taskManager: this.taskManager,
        unit: "http://localhost:8200/rest/units/2",
      };

      this.CollectionService.createCollection(CollectionDetails).then(
        (response) => {
        
          this.error=null;
        }
      ).catch(err => {
            this.error = err.response.data.validationErrors;
           
          })
    },
  },
  mounted() {
    let self = this;
  },
};
</script>

<style >
</style>