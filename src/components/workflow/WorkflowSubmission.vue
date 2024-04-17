<template>
  <div class="container col-12 workflows">
    <loader :show="workflowSubmission.loading" />
    <div class="row">
      <!-- <Sidebar/> -->
      <div class="col-12 bg-light-gray-1">
        <main class="m-0">
          <!-- <Logout/> -->
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <div class="container-fluid">
                  <div class="row">
                    <SelectFiles />
                    <SelectWorkflow />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { sync } from "vuex-pathify";
import Sidebar from "@/components/navigation/Sidebar.vue";
import SelectFiles from "@/components/workflow/SelectFiles.vue";
import SelectWorkflow from "@/components/workflow/SelectWorkflow.vue";
import Loader from "@/components/shared/Loader.vue";
import Logout from "@/components/shared/Logout.vue";

export default {
  name: "WorkflowSubmission",
  components: {
    SelectFiles,
    SelectWorkflow,
    Sidebar,
    Loader,
    Logout,
  },
  mounted: function() {
    this.workflowSubmission.selectedFiles = new Map();
    this.workflowSubmission.updateSelectedFiles = 0;
  },
  computed: {
    workflowSubmission: sync("workflowSubmission"),
  },
};
</script>
<style scoped>
@import "../../styles/style.css";
.main-margin-min {
  margin: 0.5em !important;
}
</style>
