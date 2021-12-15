<template>
    <div class="col-12 p-0 fl-right" v-if="breadCrumbs && breadCrumbs.length">
        <b-breadcrumb :items="breadCrumbs"></b-breadcrumb>
    </div>
</template>
<script>
export default {
    name: "BreadCrumbs",
    computed: {
        breadCrumbs() {
            let pathArray = this.$route.path.split('/')
            pathArray.shift()
            let breadCrumbs = []
            // needed to handle the intermediary entries for nested vue routes
            let breadcrumb = ''
            let lastIndexFound = 0
            for (let i = 0; i < pathArray.length; ++i) {
                breadcrumb = `${breadcrumb}${'/'}${pathArray[i]}`
                if (this.$route.matched[i] &&
                    Object.hasOwnProperty.call(this.$route.matched[i], 'meta') &&
                    Object.hasOwnProperty.call(this.$route.matched[i].meta, 'breadCrumb')) {
                    breadCrumbs = this.$route.matched[i].meta.breadCrumb;
                }
            }
            
            return breadCrumbs
        }
    }
}
</script>
<style scoped>
.breadcrumb {
    justify-content: right;
}
</style>