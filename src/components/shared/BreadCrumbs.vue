<template>
  <div class="col-12 p-1" v-if="breadCrumbs && breadCrumbs.length">
    <b-breadcrumb class="float-end" :items="breadCrumbs" />
  </div>
</template>
<script>
export default {
  name: "BreadCrumbs",
  computed: {
    breadCrumbs() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      let breadCrumbs = [];
      // needed to handle the intermediary entries for nested vue routes
      let breadcrumb = "";
      for (let i = 0; i < pathArray.length; ++i) {
        breadcrumb = `${breadcrumb}${"/"}${pathArray[i]}`;
        if (
          this.$route.matched[i] &&
          Object.hasOwnProperty.call(this.$route.matched[i], "meta") &&
          Object.hasOwnProperty.call(this.$route.matched[i].meta, "breadCrumb")
        ) {
          breadCrumbs = this.$route.matched[i].meta.breadCrumb;
        }
      }

      return breadCrumbs;
    },
  },
};
</script>
<style>
.breadcrumb li.breadcrumb-item a {
  color: #153c4d !important;
  text-decoration: none !important;
}

.breadcrumb li.breadcrumb-item a:hover {
  color: #f4871e !important;
}
</style>
