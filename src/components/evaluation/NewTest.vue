<template>
  <div class="new-test">
    <loader :show="loading" />
    <div class="tab-pane fade active show" role="tabpanel" id="collapse-test">
      <div class="row" v-show="mgmCategory.msts && mgmCategory.msts.length">
        <div
          class="col-4 nav bg-none nav-pills v-pills-body"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <h3 class="col-12 hdr-3">Select a New Test</h3>
          <b-overlay rounded="sm">
            <b-navbar
              id="pills-tab-1"
              toggleable="lg"
              type="dark"
              class="nav flex-column nav-pills col-12 mst-items"
            >
              <span
                class="mst-span"
                v-for="(mst, i) in mgmCategory.msts"
                :key="i"
              >
                <b-nav-item
                  :class="mst && selectedMst.index === i ? 'active' : ''"
                  @click="onChangeMst(i, mst)"
                  >{{ mst.name }}</b-nav-item
                >
              </span>
            </b-navbar>
          </b-overlay>
        </div>
        <div class="col-8 tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active v-pills-card"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div class="card">
              <div class="card-body">
                <div class="description stt-word">
                  <h4>{{ selectedMst.body.name }}</h4>
                  <span class='span-html' v-html="selectedMst.body.description"></span>
                  <p>
                    Short Description of the "Ground Truth Template" and
                    requirements,

                    <a
                      class="a-link"
                      @click="onGroundtruthInfo($event, selectedMst.body)"
                      >link to more ground truth information</a
                    >.
                  </p>
                  <p>
                    <a
                      class="a-link"
                      @click="downloadGroundtruthTemplate($event, selectedMst.body)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-file-earmark-arrow-down-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"
                        ></path>
                      </svg>
                      Download the Ground Truth Template
                    </a>
                  </p>
                  <div class="form-group marg-t-2">
                    <label for="descriptiona">Parameters</label>
                    <textarea
                      id="descriptiona"
                      class="form-control"
                      spellcheck="false"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";

export default {
  name: "NewTest",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      selectedMst: { index: 0, body: {} },
    };
  },
  computed: {},
  props: {
    mgmCategory: {
      default: {},
    },
  },
  methods: {
    onChangeMst(mstIndex, mstObj) {
      const self = this;
      self.selectedMst.index = mstIndex;
      self.selectedMst.body = mstObj;
    },
    onGroundtruthInfo(ev, mstObj) {
      console.log(mstObj);
    },
    downloadGroundtruthTemplate(ev, mstObj) {
      console.log(mstObj);
    },
  },
  mounted() {
    const self = this;
    if (self.selectedMst.index === 0) {
      self.selectedMst.body = self.mgmCategory.msts[0];
    }
  },
  watch: {
    mgmCategory: function() {
      const self = this;
      if (self.selectedMst.index === 0) {
        self.selectedMst.body = self.mgmCategory.msts[0];
      }
    },
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.new-test {
  padding: 0px 15px;
}

.pulse,
.tab-pane .hdr-3 {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-iteration-count: 1s;
}

.hdr-3 {
  width: 300px;
  color: #153c4d;
  font-size: xl-large;
  font-weight: bold;
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
    color: #153c4d;
  }
  50% {
    opacity: 1;
    transform: scale3d(1.12, 1.12, 1.12);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
    color: #153c4d;
  }
}

.v-pills-card {
  padding-top: 40px !important;
}
.v-pills-body {
  display: block !important;
}
.mst-items {
  align-items: flex-start !important;
}
.mst-span {
  width: 100%;
}
.span-html > ul{
  padding-left: 1.5rem;
}
</style>
