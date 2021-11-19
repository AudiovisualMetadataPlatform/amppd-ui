<template>
    <div class="container col-12 dataTables_wrapper">
        <div class="row">
            <Sidebar />
            <div class="col-10 bg-light-gray-1">
                <main class="main-margin-min">
                    <Logout />
                    <div class="pad-all-3">
                          <b-card class="text-left">
                            <Collection></Collection>
                            <ItemsList></ItemsList>
                        </b-card>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Collection from "./Collection.vue";
import ItemsList from "../items/ItemsList.vue";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';

export default {
    name: "CollectionsLandingPage",
    components: {
        Collection,
        ItemsList,
        Logout,
        Sidebar
    },
    data() {
        return {}
    },
    computed: {},
}
</script>