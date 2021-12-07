<template>
  <div class="container col-12 dataTables_wrapper">
    <div class="row">
      <Sidebar />
      <router-view :key="$route.fullPath"/>
      </div>
  </div>
</template>
<script>
import Sidebar from '@/components/navigation/Sidebar.vue';
export default {
  components: {
    Sidebar
  }
}
</script>




