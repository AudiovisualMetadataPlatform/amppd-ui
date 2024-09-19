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
                            <div class="ml-5 pr-5" v-if="selectedTab === 0">
                              <button
                                class="btn btn-primary btn-lg btn-edit float-right"
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
                          <p
                            class="mb-0"
                            v-for="(mgm, i) in sharedService.sortByAlphabatical(
                              mgmCategoryDetails.mgms
                            )"
                            :key="i"
                            @click="getMgmHelp(index)"
                          >
                            <button
                              class="btn collaps-btn pl-0"
                              :class="visible.includes(i) ? null : 'collapsed'"
                              :aria-expanded="
                                visible.includes(i) ? 'true' : 'false'
                              "
                              :aria-controls="'mgm' + i"
                              @click="handleVisibility(i)"
                            >
                              <span
                                v-html="rightArrowSvg"
                                style="font-size:18px"
                              ></span>
                              <span class="sr-only">Toggle hidden content</span
                              ><strong
                                style="margin-left: 10px; color: #153c4d !important;"
                              >
                                <a style="color: #153c4d !important;">{{
                                  mgm.name
                                }}</a>
                              </strong>
                            </button>
                            <b-collapse
                              :id="'mgm' + i"
                              class="mgm-help"
                              :visible="visible.includes(i)"
                            >
                              {{ mgm.help }}
                            </b-collapse>
                          </p>
                        </div>
                      </div>
                      <b-navbar
                        id="pills-tab-1"
                        toggleable="lg"
                        type="dark"
                        class="mb-3 nav-pills"
                      >
                        <span
                          v-for="(item, i) in ['Test Results', 'New Test']"
                          :key="i"
                        >
                          <b-nav-item
                            :class="selectedTab === i ? 'active' : ''"
                            @click="onChangeTab(i)"
                            >{{ item }}</b-nav-item
                          >
                        </span>
                      </b-navbar>

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
                        class="d-flex col-12 mt-3 mb-0 pr-0" 
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
                  <dl class="d-flex col-12 mt-3 mb-0 pl-0 pr-0">
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
        self.$bvToast.toast(
          "Oops! Something went wrong.",
          self.sharedService.erorrToastConfig
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

nav.nav-pills {
  justify-content: flex-start !important;
  padding: 0.4rem !important;
  background: #e9ecef !important;
  border-radius: 0.5rem !important;
  list-style: none;
}
.nav-pills .nav-item.active {
  background: #153c4d !important;
  color: white !important;
}
.nav-item.active .a:link,
.nav-item.active a {
  color: white !important;
}
a:link,
a {
  color: #153c4d !important;
}
.nav-pills .active {
  border-radius: 0.25rem !important;
}
.nav-pills .nav-link {
  border-radius: 0.25rem;
}
a:hover {
  color: #f4871e !important;
  text-decoration: none;
}

.action-btn-grp {
  padding: 8px !important;
}
.btn-new-test {
  margin-right: 40px;
}
.a-link:hover {
  cursor: pointer;
}
.active-tab {
  background: #153c4d !important;
  color: white !important;
  border-color: #153c4d !important;
}
.div-test {
  padding-bottom: 15px;
}
.mgm-help {
  padding-left: 30px !important;
}
.collaps-btn {
  box-shadow: none !important;
}
.collaps-btn:hover {
  color: #153c4d !important;
}
</style>
