<template>
  <div class="w-100 home-container">

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
                    <span v-html="card.icon" class="me-2 card-head"></span
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
import sync from "@/helpers/sync";
import { env } from "@/helpers/env";
import config from "@/assets/constants/common-contant.js";
import SharedService from "@/service/shared-service";

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      cardList: config.cards,
    };
  },
  props: {},
  methods: {
    routeToHelp(ev, envKey) {
      ev.preventDefault();
      const url = env.getEnv(envKey);
      if (envKey === "VUE_APP_DOC_AMP_MAIL_TO") window.location.href = url;
      else window.open(url, "helpwindow", "width=800, height=500");
    },
  },
  mounted() {
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
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
  background-image: url("../../assets/home.jpg");
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
  min-height: 17rem;
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
