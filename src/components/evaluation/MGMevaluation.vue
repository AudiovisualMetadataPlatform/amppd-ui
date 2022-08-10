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
                class="nav-pills"
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
                    disabled
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
                          @click="onView(category)"
                          disabled
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
  </div>
</template>

<script>
import Loader from "@/components/shared/Loader.vue";
import SharedService from "../../service/shared-service";
import EvaluationService from "../../service/evaluation-service";

export default {
  name: "MGMevaluation",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      mgmCategories: [],
      selectedCategory: 0,
    };
  },
  computed: {},
  props: {},
  methods: {
    async refreshData() {
      const self = this;
      try {
        self.loading = true;
        self.mgmCategoryResponse = await this.evaluationService.getMgmCategories();
        self.sortedMgmCategories = self.sharedService.sortByAlphabatical(
          self.mgmCategoryResponse.data._embedded.mgmCategories
        );
        self.mgmCategories = JSON.parse(
          JSON.stringify(self.sortedMgmCategories)
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
      if (self.selectedCategory !== 0) self.onView(categoryObj);
    },
    onView(objInstance) {
      const self = this;
      console.log(objInstance);
    },
  },
  mounted() {
    this.refreshData();
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
.card{
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
</style>
