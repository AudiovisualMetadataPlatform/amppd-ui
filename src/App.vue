<template>
  <div class="container col-12 dataTables_wrapper">
    <div class="row">
      <Sidebar />

      <!-- Router -->
        <router-view :key="$route.fullPath"/>
      <!-- /Router -->

      <!-- Contextual Help Button-->
      <div id="help">
        <a class="icn-help btn-help" href="#" rel="external-new-window" target="popup" @click="routeToHelp($event);">
      <span class="sr-only"><title>Help, opens a new window for help topics for this page.</title></span>
          <span v-html="helpSvg"></span></a>
      </div>
      </div>
  </div>
</template>
<script>
import Sidebar from '@/components/navigation/Sidebar.vue';
import config from './assets/constants/common-contant.js';
import { env } from "./helpers/env.js";
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      helpSvg: config.common.icons['help'],
      userGuideUrl: env.getUserGuideUrl()
    }
  },
  methods: {
    routeToHelp(ev) {
      ev.preventDefault();
      if(this.$route.meta && this.$route.meta.helpUrl) {
        window.open(this.userGuideUrl + this.$route.meta.helpUrl, 'helpwindow', 'width=800, height=500');
      }
      return ;
      
    }
  }
}
</script>
<style lang="css">
/* @import '/amppd-ui/src/styles/style.css'; */
</style>




