<template>
  <div class="mgm-evaluation">
    <loader :show="loading" />
    <div class="container col-12">
      <div class="row expand-h">
        <div class="col-12 bg-light-gray-1">
          <main>
            <h1>MGM Evaluation</h1>
            <b-overlay rounded="sm" c>
              <b-navbar
                id="pills-tab-1"
                toggleable="lg"
                type="dark"
                class="mb-3 nav-pills"
              >
                <b-nav-item
                  :class="selectedCategory === 0 ? 'active' : ''"
                  @click="onChangeCategory(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                </b-nav-item>
                <span v-for="(category, i) in mgmCategories" :key="i">
                  <b-nav-item
                    :class="
                      category && selectedCategory === i + 1 ? 'active' : ''
                    "
                    @click="onChangeCategory(i + 1, category)"
                    >{{ category.name }}</b-nav-item
                  >
                </span>
              </b-navbar>

              <dl
                class="d-flex col-12 mt-3 mb-0 pr-0"
                v-if="selectedCategory === 0"
              >
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
                          @click="onView(category, i + 1)"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </dl>
              <div v-else>
                <div class="">
                  <div class="row">
                    <h2 class="col-12">{{ mgmCategoryDetails.name }}</h2>
                    <div class="col-7">
                      <p>
                        {{ mgmCategoryDetails.help }}
                        <br />
                        <a
                          style="pointer-events: none"
                          class="a-link"
                          @click="onConfluenceRoute($event, mgmCategoryDetails)"
                        >
                          <svg
                            style="padding-bottom: 4px"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                            ></path></svg
                          >Confluence documentation
                        </a>
                      </p>
                      <h3>Tools</h3>
                      <p
                        v-for="(mgm, i) in sharedService.sortByAlphabatical(
                          mgmCategoryDetails.mgms
                        )"
                        :key="i"
                        class="a-link"
                        @click="mgmHelpRoute(mgm)"
                        style="pointer-events: none"
                      >
                        <strong>
                          <a>{{ mgm.name }}</a>
                        </strong>
                        <br />
                        {{ mgm.help }}
                      </p>
                    </div>
                    <div
                      class="col-5 nav nav-pills bg-none action-btn-grp"
                      style="display: block"
                      id="pills-tab-1"
                      role="tablist"
                    >
                      <button
                        class="btn btn-primary btn-lg btn-edit mr-4 float-right"
                        type="button"
                        @click="onTestResults()"
                        :class="{ 'active-tab': activeTab === 'test-results' }"
                        disabled
                      >
                        Test Results
                      </button>
                      <button
                        class="btn btn-primary btn-lg btn-edit float-right btn-new-test"
                        type="button"
                        @click="onNewTest()"
                        :class="{ 'active-tab': activeTab === 'new-test' }"
                      >
                        + New Test
                      </button>
                    </div>
                  </div>
                  <div class="row div-test">
                    <NewTest
                      v-if="activeTab === 'new-test'"
                      :mgmCategory="mgmCategoryDetails"
                      :mgmCategoryLoading="loading"
                    />
                    <TestResults v-else-if="activeTab === 'test-results'" />
                  </div>
                </div>
              </div>
            </b-overlay>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      mgmCategories: [],
      selectedCategory: 0,
      activeTab: "new-test",
    };
  },
  computed: {},
  props: {},
  methods: {
    onNewTest() {
      const self = this;
      self.activeTab = "new-test";
    },
    onTestResults() {
      const self = this;
      self.activeTab = "test-results";
    },
    onConfluenceRoute(ev, mgmCategory) {
      ev.preventDefault();
      console.log("Clicked on mgmHelpRoute!!" + mgmCategory);
      // const url = "";
      // window.open(url, "helpwindow", "width=800, height=500");
    },
    mgmHelpRoute(mgm) {
      console.log("Clicked on mgmHelpRoute!!" + mgm);
    },
    async getMgmCategories() {
      const self = this;
      try {
        self.loading = true;
        self.mgmCategoryResponse = await this.evaluationService.getMgmCategories();
        self.sortedMgmCategories = self.sharedService.sortByAlphabatical(
          self.mgmCategoryResponse.data._embedded.mgmCategories
        );
        self.filteredMgmCategories = self.sortedMgmCategories.filter((item) =>
          parseInt(item.mstsCount, 10)
        );
        self.mgmCategories = JSON.parse(
          JSON.stringify(self.filteredMgmCategories)
        );
        self.loading = false;
      } catch (error) {
        console.log(error);
        self.loading = false;
        self.$bvToast.toast(
          "Oops! Something went wrong. Please contact Administrator.",
          self.sharedService.erorrToastConfig
        );
      }
    },
    onChangeCategory(categoryIndex, categoryObj) {
      const self = this;
      self.selectedCategory = categoryIndex;
      if (self.selectedCategory !== 0) self.onView(categoryObj, categoryIndex);
    },
    async onView(objInstance, tab) {
      const self = this;
      self.selectedCategory = tab;
      try {
        self.loading = true;
        const mgmCategoryDetailsResponse = await this.evaluationService.getDetailsMgmCategory(
          objInstance.id
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
    this.getMgmCategories();
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
.mgm-evaluation {
  width: 100%;
}
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
  padding: 0.5rem !important;
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
  padding: 15px;
}
</style>
