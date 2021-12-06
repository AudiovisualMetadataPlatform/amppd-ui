<template>
  <div class="container col-12 dataTables_wrapper">
    <div class="row">
      <Sidebar />

      <!-- Router -->
        <router-view :key="$route.fullPath"/>
      <!-- /Router -->

      <!-- Contextual Help Button-->
      <div id="help">
        <a class="icn-help btn-help" href="https://wiki.dlib.indiana.edu/display/AMP/The+Dashboard" rel="external-new-window" target="_blank">
      <span class="sr-only"><title>Help, opens a new window for help topics for this page.</title></span>
          <span v-html="helpSvg"></span></a>
      </div>
      </div>
  </div>
</template>
<script>
import Sidebar from '@/components/navigation/Sidebar.vue';
import config from './assets/constants/common-contant.js';
export default {
  components: {
    Sidebar
  },
  data() {
    return {
      helpSvg: config.common.icons['help'],
    }
  }
}
</script>




