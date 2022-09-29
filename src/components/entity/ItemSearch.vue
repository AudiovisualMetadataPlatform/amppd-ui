<template>
  <div class="item-search">
    <loader :show="loading" />
    <div class="container col-12">
      <div class="row expand-h">
        <div class="col-12 bg-light-gray-1 item-search-container">
          <main class="m-0">
            <div class="pad-all-3">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <h1 class="col-lg-12">
                      Item Search
                      <button
                        class="btn btn-primary btn-lg btn-edit float-right"
                        type="button"
                        @click="onSearch()"
                      >
                        Search Item
                      </button>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <Search
      searchType="item-search"
      :dataSource="searchSource"
      @handleSearchItems="searchItems"
      :errors="errors"
      :loading="loading"
    />
  </div>
</template>

<script>
import Search from "@/components/shared/Search.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import Loader from "@/components/shared/Loader.vue";
import ItemService from "../../service/item-service";

export default {
  name: "ItemSearch",
  components: {
    Search,
    Loader,
  },
  data() {
    return {
      loading: false,
      searchType: "",
      searchSource: [],
      workflowResultService: new WorkflowResultService(),
      itemService: new ItemService(),
      errors: {
        search_error: "",
        no_data_error: "",
      },
    };
  },
  computed: {},
  props: {},
  methods: {
    searchItems(searchWord) {
      this.refreshData(searchWord);
    },
    onSearch() {
      this.$bvModal.show("modal-lg");
    },
    async refreshData(searchWord = "") {
      const self = this;
      try {
        self.loading = true;
        if (searchWord) {
          self.errors.search_error = "";
          self.itemSource = await self.itemService.searchItemsByKeyword(
            searchWord
          );
          self.searchSource = self.itemSource._embedded["items"];
          if (!self.searchSource.length) {
            self.errors.no_data_error = "No data found";
          } else {
            self.errors.no_data_error = "";
          }
        } else {
          self.errors.no_data_error = "";
          self.errors.search_error = "Please enter a search keyword";
        }
        self.loading = false;
      } catch (error) {
        console.log(error);
        self.loading = false;
      }
    },
  },
  updated() {
    this.onSearch();
  },
  mounted() {
    this.onSearch();
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.item-search {
  width: calc(100% - 64px);
}
.item-search-container {
  margin: 0px 32px;
}
</style>
