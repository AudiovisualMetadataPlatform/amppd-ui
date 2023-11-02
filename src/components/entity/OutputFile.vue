<template>
  <div class="w-100">
    <loader :show="showLoader" />
    <b-card class="text-left">
      <div class="d-flex">
        <div class="col-lg">
          <h2 class="card-title">Output Files</h2>
        </div>
        <button
          v-if="accessControl._workflowresult._update"
          class="btn btn-primary btn float-right"
          type="button"
          @click="onAliasSave"
        >
          Save
        </button>
      </div>
      <div class="table-responsive">
        <table id="myTable" data-detail-view="true" class="table dataTable">
          <thead>
            <tr>
              <sortable-header
                v-for="column in OUTPUT_FILE_HEADERS"
                :key="column.field"
                :property-name="column.field"
                :sort-rule="sortRule"
                @sort="sortQuery"
                :label="column.label"
              />
            </tr>
            <!-- -->
          </thead>
          <tbody>
            <!-- -->
            <tr v-for="output in listOfOutputList" :key="output.id">
              <td>
                 <!-- <input type="text" :value="12/28/2021" class="form-control" disabled /> -->
                <p>{{ new Date(output.dateCreated) | LOCAL_DATE_VALUE }}</p>
              </td>
              <td>
                <!-- <input
                    type="text"
                    :value="output.submitter"
                    class="form-control"
                    disabled
                /> -->
                {{ output.submitter }}
              </td>
              <td>
                <!-- <input
                    type="text"
                    :value="output.workflowName"
                    class="form-control"
                    disabled
                /> -->
                {{ output.workflowName }}
              </td>

              <td>
                <!-- <input
                    type="text"
                    :value="output.workflowStep"
                    class="form-control"
                    disabled
                /> -->
                {{ output.workflowStep }}
              </td>
              <td>
                <!-- <input
                    type="text"
                    :value="output.outputLink"
                    class="form-control"
                    disabled
                /> -->
                <a
                  @click="workflowResultService.getSymlinkContent(output, true, null, $event)"
                  class="complete-output"
                  target="_blank"
                  v-if="
                    output.outputPath != null &&
                      output.status == 'COMPLETE' &&
                      accessControl._workflowresult._read
                  "
                >
                  {{ output.outputName }}</a
                >
                <span v-else>{{ output.outputName }}</span>
              </td>
              <td>
                <input
                  type="text"
                  v-model="output.outputLabel"
                  class="form-control"
                  @change="onAliasChange($event, output.id, output.outputLabel)"
                  :disabled="!accessControl._workflowresult._update"
                />
              </td>
            </tr>

            <!-- -->
          </tbody>
        </table>
      </div>
    </b-card>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import Loader from "@/components/shared/Loader.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import config from "../../assets/constants/common-contant.js";
import SharedService from "../../service/shared-service.js";
import SortableHeader from "../shared/SortableHeader";
export default {
  name: "OutputFile",
  components: {
    SortableHeader,
    Loader,
  },
  computed: {
    selectedFile: sync("selectedFile"),
    accessControl: sync("accessControl"),
  },
  data() {
    return {
      sharedService: new SharedService(),
      workflowResultService: new WorkflowResultService(),
      OUTPUT_FILE_HEADERS: config.OUTPUT_FILE_HEADERS,
      sortRule: {
        columnName: "name",
        orderByDescending: true,
      },
      listOfOutputList: [],
      showLoader: false,
      aliasChanges: [],
    };
  },
  methods: {
    onAliasChange(ev, outputId, outputLabel) {
      const self = this;
      self.aliasChanges.push({ outputId, outputLabel });
    },
    async onAliasSave() {
      const self = this;
      try {
        for (let i = 0; i < self.aliasChanges.length; i++) {
          const response = await this.workflowResultService.updateWorkflowResult(
            self.aliasChanges[i].outputId,
            self.aliasChanges[i].outputLabel
          );
        }
        self.$bvToast.toast(
          "Output results have been updated successfully.",
          self.sharedService.successToastConfig
        );
        self.aliasChanges = [];
      } catch (error) {
        self.$bvToast.toast(
          "Unable to save changes. Please try again!",
          self.sharedService.erorrToastConfig
        );
      }
    },
    async getOutputFileList(
      pageNum = 1,
      sortRule = { columnName: "dateCreated", orderByDescending: false }
    ) {
      const self = this;
      const filters = {
        filterByFiles: [self.selectedFile.id],
        sortRule,
        pageNum,
      };
      self.showLoader = true;
      const response = await this.workflowResultService.getWorkflowResults(
        filters
      );
      self.showLoader = false;
      if (response.rows) {
        this.listOfOutputList = response.rows;
      }
    },
    sortQuery(sortRule) {
      const self = this;
      self.aliasChanges = [];
      this.sortRule = sortRule;
      this.getOutputFileList(1, sortRule);
    },
  },
  mounted() {
    this.getOutputFileList();
  },
};
</script>

<style scoped>
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.text-box {
  background-color: #e9ecef;
  opacity: 1;
}

td,
th {
  padding: 0.75rem !important;
}
</style>
