<template>
  <div class="col-12 bg-light-gray-1">
    <main class="m-0">
      <b-card class="w-100">
        <loader :show="loading" />
        <div class="container-fluid p-0">
          <div class="row expand-h">
            <div class="col-12 p-0">
              <main class="m-2">
                <h1>MGM Evaluation</h1>
                <b-overlay v-if="mgmCategoryId" rounded="sm" class="mt-4">
                  <div>
                    <div class="">
                      <div class="row mb-5" v-if="mgmCategoryDetails">
                        <h1 class="col-12" style="font-size: 2.25rem;">
                          {{ mgmCategoryDetails.name }}
                        </h1>
                        <div class="col-12">
                          <div class="d-flex justify-content-between">
                            <p class="mb-4">
                              {{ mgmCategoryDetails.help }}
                            </p>
                            <div class="ms-5 pe-5" v-if="selectedTab === 0">
                              <button
                                class="btn btn-primary btn-lg btn-edit float-end text-nowrap"
                                type="button"
                                @click="onNewTest()"
                              >
                                New Test
                              </button>
                            </div>
                          </div>
                          <h3 style="margin-bottom: 0px;">
                            {{ mgmCategoryDetails.name + " MGMs" }}
                          </h3>
                          <div
                            class="mb-0"
                            v-for="(mgm, i) in sharedService.sortByAlphabatical(mgmCategoryDetails.mgms)"
                            :key="i"
                          >
                            <button
                              class="btn mgm-help-collapse ps-0"
                              :class="visible.includes(i) ? null : 'collapsed'"
                              :aria-expanded="visible.includes(i) ? 'true' : 'false'"
                              v-b-toggle="'mgm' + i"
                              @click="handleVisibility(i)"
                            >
                              <span v-html="rightArrowSvg" class="fs-6"></span>
                              <span class="visually-hidden">Toggle hidden content</span>
                              <strong
                                style="margin-left: 10px; color: #153c4d !important;"
                              >
                                <a style="color: #153c4d !important;">
                                  {{ mgm.name }}
                                </a>
                              </strong>
                            </button>
                            <b-collapse
                              :id="'mgm' + i"
                              class="mgm-help"
                            >
                                {{ mgm.help }}
                            </b-collapse>
                          </div>
                        </div>
                      </div>
                        <b-tabs 
                          v-model="selectedTab" 
                          nav-item-class="bsvn-tab"
                          nav-class="bsvn-tab-header"
                          nav-wrapper-class="bsvn-tab-header-wrapper"
                          card
                          class="mt-3"
                        >
                          <b-tab title="Test Results" />
                          <b-tab title="New Test" />
                        </b-tabs>
                      <dl
                        class="d-flex col-12 mt-3 mb-0 p-0"
                        v-if="selectedTab === 0"
                      >
                        <TestResults
                          :mgmCategory="mgmCategoryDetails"
                          :mgmCategoryId="mgmCategoryId"
                        />
                      </dl>
                      <dl 
                        class="d-flex col-12 mt-3 mb-0 pe-0" 
                        v-else
                      >
                        <div class="w-100 row div-test">
                          <NewTest
                            :mgmCategory="mgmCategoryDetails"
                            :mgmCategoryLoading="loading"
                            @changeTab="onChangeTab"
                          />
                        </div>
                      </dl>
                    </div>
                  </div>
                </b-overlay>
                <b-overlay v-else rounded="sm" class="mt-4">
                  <dl class="d-flex col-12 mt-3 mb-0 ps-0 pe-0">
                    <div class="row card-container">
                      <div
                        class="col-sm-4"
                        v-for="(category, i) in mgmCategories"
                        :key="i"
                      >
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">{{ category.name }}</h5>
                            <p class="card-text">
                              {{ category.description }}
                            </p>
                            <button
                              class="btn btn-primary btn"
                              @click="onView(category)"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dl>
                </b-overlay>
              </main>
            </div>
          </div>
        </div>
      </b-card>
    </main>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import config from "../../assets/constants/common-contant.js";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";
import NewTest from "./NewTest.vue";
import TestResults from "./TestResults.vue";

export default {
  name: "MGMevaluation",
  components: {
    Loader,
    NewTest,
    TestResults,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      mgmCategoryId: null,
      rightArrowSvg: config.common.icons["right_arrow"],
      selectedTab: 0,
      activeTab: "test-results",
      visible: [],
      mgmCategoryDetails: {}
    };
  },
  computed: {
    mgmCategories: sync("mgmCategories"),
  },
  props: {},
  methods: {
    onView(category) {
      const self = this;
      self.$router.push(`/mgm-evaluation/${category.id}`);
    },
    handleVisibility(index) {
      const self = this;
      if (self.visible.includes(index)) {
        self.visible = self.visible.filter((ele) => {
          return ele !== index;
        });
      } else {
        self.visible.push(index);
      }
    },
    onNewTest() {
      const self = this;
      self.activeTab = "new-test";
      self.selectedTab = 1;
    },
    onTestResults() {
      const self = this;
      self.activeTab = "test-results";
    },
    onConfluenceRoute(ev, mgmCategory) {
      ev.preventDefault();
      console.log("Clicked on mgmHelpRoute!!" + mgmCategory);
    },
    onChangeTab(index) {
      const self = this;
      self.selectedTab = index;
      if (index === 1) {
        self.activeTab = "new-test";
      } else {
        self.activeTab = "test-results";
      }
    },
    async networkCalls(mgmCategoryId) {
      const self = this;
      try {
        self.loading = true;
        const mgmCategoryDetailsResponse = await this.evaluationService.getDetailsMgmCategory(
          mgmCategoryId
        );
        self.mgmCategoryDetails = JSON.parse(
          JSON.stringify(mgmCategoryDetailsResponse.data)
        );
        self.loading = false;
      } catch (error) {
        console.log(error);
        self.loading = false;
        self.$toast.error(
          "Oops! Something went wrong.",
          self.sharedService.toastNotificationConfig
        );
      }
    },
  },
  mounted() {
    const self = this;
    self.mgmCategoryId = self.$route.params.mgmCategoryId;
    if (self.mgmCategoryId) {
      self.networkCalls(self.mgmCategoryId);
    }
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
main {
  margin-top: 0px;
}
.card {
  margin-bottom: 15px;
}
.row .card-container {
  width: calc(100% + 15px);
}
.div-test {
  padding-bottom: 15px;
}
.mgm-help {
  padding-left: 30px !important;
}
.mgm-help-collapse {
  box-shadow: none !important;
  &:hover {
    color: #153c4d !important;
  }
  &:focus, &:active {
    border-color: transparent !important;
  }
}
</style>
