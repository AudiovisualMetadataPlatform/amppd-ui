<template>
  <div class="item-search">
    <loader :show="loading" />
    <div class="container-fluid">
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
                        class="btn btn-primary btn-lg btn-edit float-end"
                        type="button"
                        v-b-modal.modal-lg
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
      itemService: new ItemService(),
      loading: false,
      searchType: "",
      searchSource: [],
      errors: {
        search_error: "",
        no_data_error: "",
      },
    };
  },
  computed: {},
  props: {},
  methods: {
    // handler for handleSearchItems event emitted by child component (the Search pop-up ialog)
    searchItems(searchWord) {
      this.refreshData(searchWord);
    },

    // call item search API 
    async refreshData(searchWord = "") {
      const self = this;
      try {
        self.loading = true;
        if (searchWord) {
          self.errors.search_error = "";
          self.itemSource = await self.itemService.searchItemsByKeyword(
            searchWord
          );
          self.searchSource = self.itemSource;
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
};
</script>

<style lang="css">
@import "../../styles/style.css";
.item-search {
  width: calc(100% - 64px);
}
.item-search-container {
  margin: 0px 32px;
}
</style>
