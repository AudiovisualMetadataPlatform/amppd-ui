<template>
  <div id="myTable_filter" class="dataTables_filter">
    <!-- <label>Search:</label> -->
    <!-- <typeahead :source="getItems" filter-key="searchValue" :start-at="1" @selection="addSearchTerm"
      filter-type="contains"
      id="colFormLabelSearch" class="form-control bootstrap-typeahead" placeholder="Search" :customClass= "'customSearchWidth'"/> -->
    <form
      @submit="
        $event.preventDefault();
        onSearchChange();
      "
    >
      <input
        type="text"
        placeholder="Search"
        v-model="userValue"
        class="form-control customSearchWidth"
      />
    </form>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import _ from "underscore";
import Typeahead from "../../shared/TypeAhead.vue";

export default {
  name: "SearchFilter",
  components: {
    Typeahead,
  },
  data() {
    return {
      searchValue: "",
      filterSuccess: false,
      userValue: "",
    };
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
    searchTermList: sync("workflowDashboard.searchResult.filters.searchTerms"),
    getItems() {
      if (!this.searchTermList) return [];
      return this.searchTermList;
    },
    searchTerms() {
      return this.workflowDashboard.searchQuery.filterBySearchTerms;
    },
  },
  props: {},
  methods: {
    addSearchTerm(term) {
      if (this.searchTerms.length > 0) {
        if (this.searchTerms.indexOf(term) == -1) this.searchTerms.push(term);
      } else this.searchTerms.push(term);
    },

    onSearchChange(event) {
      if (
        this.workflowDashboard.searchQuery.filterBySearchTerms &&
        this.workflowDashboard.searchQuery.filterBySearchTerms.length &&
        this.workflowDashboard.searchQuery.filterBySearchTerms[0] !=
          this.userValue
      ) {
        this.workflowDashboard.searchQuery.filterBySearchTerms = [
          this.userValue,
        ];
        if (!this.userValue) {
          this.workflowDashboard.searchQuery.filterBySearchTerms.splice(0, 1);
        }
      } else if (
        !this.workflowDashboard.searchQuery.filterBySearchTerms ||
        (!this.workflowDashboard.searchQuery.filterBySearchTerms.length &&
          this.userValue)
      ) {
        this.workflowDashboard.searchQuery.filterBySearchTerms = [
          this.userValue,
        ];
      }
    },
  },
  watch: {
    "$store.state.workflowDashboard.searchQuery.filterBySearchTerms": {
      deep: true,
      handler(ev) {
        if (!ev.length) {
          const self = this;
          self.userValue = "";
        }
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#search-input {
  display: inline;
}
.spacer {
  height: 24px;
}
.submitter {
  margin: 0.2rem;
}
.bootstrap-typeahead {
  height: calc(2.25rem + 1px);
  padding: 0rem 0rem;
  border: none;
}
#myTable_filter {
  display: flex;
  margin-bottom: 20px;
}
#myTable_filter label {
  margin: auto;
}
.dataTables_wrapper .dataTables_filter input {
  margin-left: 0 !important;
}
#colFormLabelSearch {
  width: 250px;
}
.dataTables_wrapper .dataTables_filter label {
  margin-right: 5px !important;
}
</style>
