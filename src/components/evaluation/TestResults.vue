<template>
  <div>
    <loader :show="loading" />
    <div>Test Results Part</div>
  </div>
</template>

<script>
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";

export default {
  name: "TestResults",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
    };
  },
  computed: {},
  props: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
</style>
