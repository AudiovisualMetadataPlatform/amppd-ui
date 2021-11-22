<template>
    <div class="container col-12 dataTables_wrapper">
        <div class="row">
            <Sidebar />
            <div class="col-10 bg-light-gray-1">
                <main class="main-margin-min">
                    <Logout />
                    <!-- Header - Details page -->
                    <div class="mt-4">
                        <span v-if="baseUrl == 'unit'">
                            <Unit></Unit>
                        </span>
                        <span v-if="baseUrl == 'collection'">
                            <Collection />
                        </span>
                    </div>
                    <!-- Header - Details page Ends here-->

                </main>
            </div>
        </div>
    </div>
</template>

<script>

import { sync } from "vuex-pathify";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
import CollectionService from '../../service/collection-service';
import UnitService from '../../service/unit-service';
import Unit from './Unit.vue';
import Collection from "./Collection.vue";
export default {
    name: "CreateEntity",
    components: {
        Logout,
        Sidebar,
        Unit,
        Collection
    },
    props: [],
    data() {
        return {
            unitService: new UnitService(),
            collectionService: new CollectionService(),
            records: []
        }
    },
    computed: {
        selectedCollection: sync("selectedCollection"),
        selectedUnit: sync("selectedUnit"),
        selectedItem: sync("selectedItem"),
        baseUrl() {
            const self = this;
            if (window.location.hash.toLowerCase().indexOf('unit') > -1) {
                return "unit";
            } else if (window.location.hash.toLowerCase().indexOf('collection') > -1) {
                return "collection";
            }
            return "";
        }
    },
    methods: {
        
    },
    mounted() {
        const self = this;
    }

}
</script>

<style scoped>
@import "/amppd-ui/src/styles/style.css";
</style>
