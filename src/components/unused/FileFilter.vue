<template>
  <div class="dropdown">
    <button
      class="btn btn-info dropdown-toggle"
      :class="{ show: workflowDashboard.filtersEnabled.fileFilter === true }"
      type="button"
      id="dropdownMenuButton1"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="workflowDashboard.filtersEnabled.fileFilter ? 'true' : 'false'"
      v-on:click="setFilterFlags"
    >
      Source File
    </button>
    <div
      v-click-outside="closeFilter"
      class="dropdown-menu compact-form"
      :class="{ show: workflowDashboard.filtersEnabled.fileFilter === true }"
      aria-labelledby="dropdownMenuButton"
      x-placement="bottom-start"
      style="
        position: absolute;
        will-change: transform;
        top: 0px;
        left: 0px;
        transform: translate3d(0px, 38px, 0px);
      "
    >
      <form class="main-dropdown">
        <div class="container-fluid">
          <label for="colFormLabelSearch" class="bold form-label">Source File</label>
          <div class="input-group mb-3">
            <typeahead
              :source="getFiles"
              filter-key="file"
              filter-type="contains"
              :start-at="1"
              @selection="addFile"
              id="colFormLabelSearch"
              class="form-control bootstrap-typeahead"
              placeholder="Search Source File"
            />
            <button class="btn btn-outline input-group-text" id="btn-search" type="submit">
              <svg
                class="svg-search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <title>search</title>
                <path
                  d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div class="container">
        <div class="card p-2">
          <strong>Selected Files</strong>
          <div class="selected-file-cards">
            <!--loop through all the selected here -->
            <button
              class="btn btn-outline file"
              v-for="(file, index) in workflowDashboard.searchQuery
                .filterByFiles"
              v-bind:file="file"
              v-bind:index="index"
              v-bind:key="file.id"
            >
              <svg
                class="user-remove"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                @click="removeFile(index)"
              >
                <path
                  d="M30.3 30.8l-4.1 4.1c-0.6 0.6-0.8 1.3-0.8 2.1 0 0.8 0.3 1.5 0.8 2.1l1.9 1.9c-0.3 0-0.7 0.1-1 0.1H7c-1.8 0-3.3-0.5-4.4-1.6 -1.1-1.1-1.7-2.5-1.7-4.3 0-0.8 0-1.6 0.1-2.4 0.1-0.8 0.2-1.6 0.3-2.5 0.2-0.9 0.4-1.7 0.6-2.5 0.2-0.8 0.6-1.5 1-2.2 0.4-0.7 0.9-1.3 1.4-1.9 0.5-0.5 1.2-0.9 2-1.2C7.1 22.1 7.9 22 8.8 22c0.3 0 0.6 0.1 0.9 0.4 2.3 1.9 4.8 2.8 7.3 2.8s4.9-0.9 7.3-2.8c0.3-0.3 0.6-0.4 0.9-0.4 0.4 0 0.9 0 1.3 0.1 -0.4 0.4-0.7 0.8-0.9 1.1s-0.3 0.8-0.3 1.3c0 0.8 0.3 1.5 0.8 2.1L30.3 30.8zM23.2 20.9c-1.7 1.7-3.8 2.6-6.2 2.6 -2.4 0-4.5-0.9-6.2-2.6 -1.7-1.7-2.6-3.8-2.6-6.2s0.9-4.5 2.6-6.2c1.7-1.7 3.8-2.6 6.2-2.6 2.4 0 4.5 0.9 6.2 2.6 1.7 1.7 2.6 3.8 2.6 6.2S25 19.1 23.2 20.9zM41.7 30.8l5.7 5.7c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5l-3.1 3.1c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-5.7-5.7 -5.7 5.7c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-3.1-3.1c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l5.7-5.7 -5.7-5.7c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l3.1-3.1c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l5.7 5.7 5.7-5.7c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l3.1 3.1c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5L41.7 30.8z"
                ></path>
              </svg>
              {{ file }}
            </button>
          </div>
        </div>
      </div>
      <button class="btn btn-info" type="button" @click="closeFilter()">
        Done
      </button>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import _ from "underscore";
import Typeahead from "../../shared/TypeAhead.vue";
import vClickOutside from "click-outside-vue3";

export default {
  name: "FileFilter",
  components: {
    Typeahead,
  },
  data() {
    return {
      fileList: [],
      filterSuccess: false,
    };
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
    files: sync("workflowDashboard.searchResult.filters.files"),
    getFiles() {
      if (!this.files) return [];
      return this.files;
    },
    selectedFiles() {
      return this.workflowDashboard.searchQuery.filterByFiles;
    },
  },

  methods: {
    setFilterFlags() {
      this.workflowDashboard.filtersEnabled.fileFilter = !this.workflowDashboard
        .filtersEnabled.fileFilter;
      if (this.workflowDashboard.filtersEnabled.fileFilter) {
        this.workflowDashboard.filtersEnabled.dateFilter = false;
        this.workflowDashboard.filtersEnabled.submitterFilter = false;
        this.workflowDashboard.filtersEnabled.itemFilter = false;
        this.workflowDashboard.filtersEnabled.searchFilter = false;
        this.workflowDashboard.filtersEnabled.statusFilter = false;
        this.workflowDashboard.filtersEnabled.stepFilter = false;
        this.workflowDashboard.filtersEnabled.workflowFilter = false;
      }
    },
    addFile(file) {
      if (this.selectedFiles.length > 0) {
        if (this.selectedFiles.indexOf(file) == -1) {
          this.selectedFiles.push(file);
        } else {
          console.log("file already exists" + this.selectedFiles);
        }
      } else {
        this.selectedFiles.push(file);
      }
    },
    removeFile(index) {
      console.log("removing file at:" + index);
      var removed = this.selectedFiles.splice(index, 1);
      console.log(
        "selected files are: " +
          this.selectedFiles +
          ", and removed element is: " +
          removed
      );
    },
    closeFilter() {
      this.workflowDashboard.filtersEnabled.fileFilter = false;
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
  watch: {
    selectedFiles: function() {
      this.selectedFiles.length > 0
        ? (this.workflowDashboard.filtersEnabled.fileFilter = true)
        : (this.workflowDashboard.filtersEnabled.fileFilter = false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file {
  margin: 0.2rem;
}

.bootstrap-typeahead {
  height: calc(2.25rem + 1px);
  padding: 0rem 0rem;
}

.main-dropdown {
  height: 150px;
}

.selected-file-cards {
  max-height: 200px;
  overflow-y: scroll;
}
</style>
