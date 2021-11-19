<template>
    <div class="container col-12 dataTables_wrapper">
    <div class="row expand-h">
      <Sidebar />
      <div class="col-10 bg-light-gray-1">
        <main class="main-margin-min">
          <Logout />
          <div class="pad-all-3">
            <Collection></Collection>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from "./Collection.vue";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
export default {
    components: {
        Collection,
        Logout,
        Sidebar
    }

}
</script>
