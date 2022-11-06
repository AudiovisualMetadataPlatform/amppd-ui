<template>
  <div>
    <loader :show="loading" />
    <h3 class="m-b-0 m-t-2 mt-1">All {{ mgmCategory.name }} Test Results</h3>

    <select
      class="select custom-select mb-4 w-100 select-test"
      v-model="selectedMst.id"
      @change="onInputChange($event)"
      required
      disabled
      ><option value="default" disabled selected>Select a test...</option>
      <option v-for="(mst, i) in mgmCategory.msts" :key="i" :value="mst.id">{{
        mst.name
      }}</option>
    </select>
  </div>
</template>

<script>
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";
import WorkflowDashboard from "@/components/dashboard/Dashboard.vue";

export default {
  name: "TestResults",
  components: {
    Loader,
    WorkflowDashboard,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      selectedMst: { id: "default", detailBody: {} },
    };
  },
  computed: {},
  props: {
    mgmCategory: {
      default: {},
    },
  },
  methods: {
    onInputChange(ev) {
      const self = this;
      console.log("Selected MST: " + self.selectedMst.id);
    },
  },
  mounted() {},
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
/* .select-test {
  width: 30% !important;
} */
</style>
