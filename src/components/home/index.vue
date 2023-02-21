<template>
  <div class="w-100 home-container">
    <loader :show="loading" />

    <div class="home tech-bg  ex-lg">
      <div class="home-body">
        <div class="overlay">
          <h2 class="amp-description">
            AMP, or Audiovisual Metadata Platform, is an open source software
            system that enables the efficient generation of metadata to support
            discovery and use of digitized and born-digital audio and moving
            image collections.
          </h2>
          <div class="container-fluid cards home-cards-container">
            <div class="row row-eq-height pad-all-2 bottom-btns">
              <div
                class="col-4 eq-height"
                v-for="card in cardList"
                :key="card.header"
              >
                <div class="card home-card">
                  <h5 class="card-header">
                    <span v-html="card.icon" class="mr-2 card-head"></span
                    >{{ card.header }}
                  </h5>
                  <div class="card-body">
                    <p class="card-text">{{ card.desc }}</p>
                    <a
                      class="btnbtn btn-link tab-link"
                      role="tab"
                      @click="routeToHelp($event, card.link)"
                      >{{ card.linkText ? card.linkText : "Learn more" }}
                    </a>
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
import { sync } from "vuex-pathify";
import { env } from "@/helpers/env";
import Loader from "@/components/shared/Loader.vue";
import config from "@/assets/constants/common-contant.js";
import SharedService from "@/service/shared-service";
import EvaluationService from "@/service/evaluation-service";
import ConfigPropertiesService from "@/service/config-properties-service";

export default {
  name: "Home",
  components: {
    Loader,
  },
  data() {
    return {
      loading: false,
      cardList: config.cards,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      configPropertiesService: new ConfigPropertiesService(),
    };
  },
  computed: {
    mgmCategories: sync("mgmCategories"),
  },
  props: {},
  methods: {
    routeToHelp(ev, envKey) {
      ev.preventDefault();
      const url = env.getEnv(envKey);
      if (envKey === "VUE_APP_DOC_AMP_MAIL_TO") window.location.href = url;
      else window.open(url, "helpwindow", "width=800, height=500");
    },
    async networkCalls() {
      const self = this;
      try {
        const configPropertiesResponse = await self.configPropertiesService.getConfigProperties();
        self.configProperties = configPropertiesResponse.data;

        //MGM Evaluation menus
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.networkCalls();

    const uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    let batchIngestHtml = document.getElementById("/batch/ingest");
    if (batchIngestHtml) {
      if (!uEntity || (uEntity && !uEntity.currentUnit)) {
        //BATCH INGEST: Disable batch ingest nav
        batchIngestHtml = batchIngestHtml.childNodes[0];
        batchIngestHtml.ariaDisabled = "true";
        batchIngestHtml.classList.add("disabled");
      } else {
        //BATCH INGEST: Enable batch ingest nav
        batchIngestHtml = batchIngestHtml.childNodes[0];
        batchIngestHtml.ariaDisabled = null;
        batchIngestHtml.classList.remove("disabled");
      }
    }
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
html {
  height: 100%;
}
body,
.container {
  min-height: 100%;
}
.home-container {
  margin-top: 3px;
}
.tech-bg {
  background-image: url("/assets/img/home.jpg");
  background-repeat: no-repeat;
}
.home-body {
  padding: 3.5rem;
}
.amp-description {
  font-size: 2.3rem;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px #000;
}
.home-cards-container {
  padding: 0rem 4rem !important;
}
.home-card {
  height: 17rem;
}
.row-eq-height {
  padding-top: 0;
  margin-top: -5px;
}
.tab-link {
  cursor: pointer;
}
.card-head > svg {
  margin-top: -1px;
  fill: #153c4d;
}
</style>
