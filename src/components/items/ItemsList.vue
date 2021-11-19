<template>
    <div>
        <b-card class="text-center m-3">
            <div class="row w-100">
                <div class="col-3 text-left">
                    <h2>Collection Items</h2>
                </div>
                <div class="col-9 text-right p-0">
                    <button
                        class="btn btn-primary btn-lg btn-edit mr-2"
                        type="button"
                    >Create New Item</button>
                    <button class="btn btn-primary btn-lg btn-edit" type="button">Search Items</button>
                </div>
            </div>

            <div class="row" v-if="(Items && Items._embedded.items && Items._embedded.items.length)">
                <b-card
                    class="m-3 w-100 text-left"
                    v-for="item in Items._embedded.items"
                    :key="item.id"
                >
                    <div class="col-12">
                        <div class="row">
                            <div class="col-11">
                                <h4>{{ item.name }}</h4>
                                <p>{{ item.description }}</p>
                            </div>
                            <div class="col-1 p-0 text-right">
                                <div>
                                    <button
                                        class="btn btn-primary btn"
                                        @click="onView(item)"
                                    >View</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-2">
                                <label>Source Name</label>
                                <p>{{ item.externalSource }}</p>
                            </div>
                            <div class="col-2">
                                <label>Source Id</label>
                                <p>{{ item.externalId }}</p>
                            </div>
                            <div class="col-2">
                                <label>Date Created:</label>
                                <p>{{ item.createdDate | DDMMYYYY }}</p>
                            </div>
                            <div class="col-2">
                                <label>Created By</label>
                                <p>{{ item.createdBy }}</p>
                            </div>
                            <div class="col-2">
                                <label>Modified By</label>
                                <p>{{ item.modifiedBy }}</p>
                            </div>
                            <div class="col-2">
                                <label>Modified Date</label>
                                <p>{{ item.modifiedDate | DDMMYYYY }}</p>
                            </div>
                        </div>
                    </div>
                </b-card>
                <!-- <pagination
                    v-if="Items._embedded.items"
                    :pageNum="Items.page.number"
                    :resultsPerPage="Number.parseInt(Items.page.size)"
                    :totalResults="Items.page.totalElements"
                    :maxPages="1"
                    @paginate="paginate"
                  /> -->
            </div>
            <div class="col-12 text-left" v-if="(!Items._embedded.items || !Items._embedded.items.length)">
                <p>-No records found-</p>
            </div>
        </b-card>
    </div>
</template>
<script>
import { sync } from 'vuex-pathify';
import ItemService from '../../service/item-service';
import Pagination from "../shared/Pagination";

export default {
    name: "ItemsList",
    components: {
        Pagination
    },
    props: {},
    data() {
        return {
            itemService: new ItemService()
        }
    },
    computed: {
        Items: sync("Items"),
        selectedItem: sync("selectedItem")
    },
    methods: {
        onCancel() {
        var result = confirm("Are you sure want to cancel!")
        if(result) this.showEdit = !this.showEdit;
        },
        getItems(pageNumber, size) {
            const self = this;
            self.itemService.getAllItems(3708, pageNumber, size).then(response => {
                self.Items = response.data;
            });
        },
        paginate(page_number) {
            this.Items.page.number = page_number;
            this.getItems(
                this.Items.page.number - 1,
                this.Items.page.size
            );
        },
        onView(item) {
            const self = this;
            self.selectedItem = item;
            self.$router.push("/collections/items/details");
        }
    },
    mounted() {
        const self = this;
        self.getItems();
    }
}
</script>