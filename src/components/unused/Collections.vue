<template>
  <div class="collection dataTables_wrapper">
    <div class="container-fluid">
      <div class="row expand-h">
        <Sidebar />
        <div class="col-10 bg-light-gray-1">
          <main class="m-0">
            <Logout />
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-title">Create a new collection</h1>
                  <a
                    href="create-new.html"
                    class="btn btn-primary btn-lg marg-top-bot-4"
                    >Start</a
                  >
                  <!-- -->
                  <!-- <a href="create-new.html" class="btn btn-primary btn-lg marg-top-bot-4">Searcg</a> -->
                  <!-- // -->
                </div>
              </div>
            </div>
            <div
              class="pad-all-3 my-collection"
              v-if="Collections && Collections._embedded.collections.length > 0"
            >
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">My collections</h2>
                  <!-- collection name/description -->
                  <div
                    v-for="rec in Collections._embedded.collections"
                    :key="rec.id"
                    class="card bg-light-gray-1 pad-all-1"
                  >
                    <div class="container">
                      <div class="row">
                        <div class="col-md-10">
                          <h3>{{ rec.name }}</h3>
                          <p>
                            {{ rec.description }}
                          </p>
                        </div>
                        <div class="col-md-2 text-right">
                          <label
                            class="switch"
                            :title="rec.active ? 'Deactivate' : 'Activate'"
                          >
                            <input
                              type="checkbox"
                              v-model="rec.active"
                              v-on:click="toggleCollectionActive(rec)"
                            />
                            <span class="slider round"></span>
                          </label>
                          <button
                            :disabled="!rec.active"
                            class="btn btn-primary btn marg-t-5"
                            @click="onClickHandler(rec.id)"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <pagination
                    v-if="Collections._embedded.collections"
                    :pageNum="Collections.page.number"
                    :resultsPerPage="Number.parseInt(Collections.page.size)"
                    :totalResults="Collections.page.totalElements"
                    :maxPages="1"
                    @paginate="paginate"
                  />
                </div>
              </div>
            </div>
            <div class="pad-all-3 my-collection" v-else>
              <loader v-if="Collections.loading" :show="Collections.loading" />
              <div v-else colspan="8" class="no-results">No results</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import CollectionService from "../../service/collection-service";
import Pagination from "../shared/Pagination";
import Loader from "@/components/shared/Loader.vue";

export default {
  name: "Collections",
  components: {
    Sidebar,
    Logout,
    Pagination,
    Loader,
  },
  props: {},
  data() {
    return {
      collectionService: new CollectionService(),
    };
  },
  computed: {
    Collections: sync("Collections"),
    selectedCollection: sync("selectedCollection"),
  },
  methods: {
    async toggleCollectionActive(collection) {
      collection.active = !collection.active;
      this.collectionService.activateCollection(
        collection.id,
        collection.active
      );
    },
    onClickHandler(id) {
      let self = this;
      self.selectedCollection = id;
      self.$router.push("/collections/collection-details");
    },
    async getCollections(a, b) {
      let self = this;
      self.Collections.loading = true;
      this.collectionService.getCollectionPage(a, b).then((response) => {
        self.Collections = response.data;
        self.Collections.page.number = self.Collections.page.number + 1;
        self.Collections.loading = false;
      });
    },
    paginate(page_number) {
      this.Collections.page.number = page_number;
      this.getCollections(
        this.Collections.page.number - 1,
        this.Collections.page.size
      );
    },
  },
  mounted() {
    let self = this;
    self.getCollections();
  },
};
</script>

<style scoped>
@import "../../styles/style.css";
</style>
