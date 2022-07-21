<template>
  <div class="item-search">
    <loader :show="loading" />
    <div class="container col-12">
      <div class="row expand-h">
        <div class="col-12 bg-light-gray-1">
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
      v-if="searchSource.length"
      searchType="item-search"
      :dataSource="searchSource"
    />
  </div>
</template>

<script>
import Search from "@/components/shared/Search.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import Loader from "@/components/shared/Loader.vue";

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
    };
  },
  computed: {},
  props: {},
  methods: {
    onSearch() {
      this.$bvModal.show("modal-lg");
    },
    async refreshData() {
      const self = this;
      try {
        self.loading= true;
        self.itemSource = await this.workflowResultService.getWorkflowResults(
          {filterOnly: true, filterByRelevant: true}
        );
        self.searchSource = await self.itemSource.filters['items']
      } catch (error) {
        console.log(error)
        self.loading=false;
      }
    },
  },
  updated(){
    this.onSearch();
  },
  mounted(){
    this.refreshData()
  }
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.item-search{
  width: 100%;
}
</style>
