<template>
  <div class="collection">
    <div class="container col-12">
      <div class="row expand-h">
        <Sidebar />
        <div class="col-10 bg-light-gray-1">
          <main class="m-0">
            <Logout />
            <h1>Collection Details</h1>
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <h1 class="col-lg-12">{{ collectionDetails.name }}</h1>
                    <p class="text-muted col-lg-12">
                      {{ collectionDetails.description }}
                    </p>

                    <p class="col-lg-6 text-muted">
                      CREATED BY: {{ collectionDetails.createdBy }} <br />CREATE
                      DATE: {{ typeof collectionDetails.createdDate }}
                      <br />
                      MODIFIED BY: {{ collectionDetails.modifiedBy }}
                      <br />MODIFIED DATE: {{ collectionDetails.modifiedDate }}
                    </p>

                    <div class="form-group col-lg-6">
                      <label for="collection-name">Task Manager</label>
                      <select class="browser-default custom-select" disabled>
                        <option value="1">
                          {{ collectionDetails.taskManager }}
                        </option>
                        <option value="2">Jira</option>
                      </select>
                    </div>

                    <div class="container-fluid">
                      <div class="row">
                        <div class="col controls text-right">
                          <button
                            class="btn btn-outline-danger btn-lg marg-bot-1"
                          >
                            Delete
                          </button>
                          <button
                            class="btn btn-outline-primary btn-lg marg-bot-1"
                          >
                            Edit
                          </button>
                          <button class="btn btn-primary btn-lg marg-bot-1">
                            View workflow results
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- -->
                <div
                  v-for="(rec, index) in collectionDetails &&
                    collectionDetails.items"
                  :key="rec.id"
                  class="pad-all-3 my-collection"
                >
                  <!-- collection name/description -->
                  <CollectionDetailsItemCard :index="index" />
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
import CollectionDetailsService from "../../service/collection-detail-service";
import CollectionDetailsItemCard from "./CollectionDetailsItemCard.vue";

export default {
  name: "CollectionDetails",
  components: {
    Sidebar,
    Logout,
    CollectionDetailsItemCard,
  },
  props: {},
  data() {
    return {
      CollectionDetailsService: new CollectionDetailsService(),
    };
  },
  computed: {
    collectionDetails: sync("collectionDetails"),
    selectedCollection: sync("selectedCollection"),
  },
  methods: {
    async getCollectionDetails() {
      let self = this;

      this.CollectionDetailsService.getCollection(
        self.selectedCollection.id
      ).then((response) => {
        self.collectionDetails = response.data;
      });
      self.getCollectionItems();
    },
    async getCollectionItems() {
      let self = this;
      this.CollectionDetailsService.getCollectionItems(
        self.selectedCollection.id
      ).then((response) => {
        self.collectionDetails = {
          ...self.collectionDetails,
          items: response.data._embedded.items,
        };
      });
    },
  },
  mounted() {
    let self = this;
    self.getCollectionDetails();
  },
};
</script>
<style scoped>
@import "/amppd-ui/src/styles/style.css";
</style>
