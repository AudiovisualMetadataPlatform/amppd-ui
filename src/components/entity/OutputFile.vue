<template>
    <div class="w-100">
        <b-card class="text-left">
            <div class="col-lg-12">
                <h2 class="card-title">Output Files</h2>
            </div>
            <div class="table-responsive">
                <table id="myTable" data-detail-view="true" class="table dataTable">
                    <thead>
                        <tr>
                           <sortable-header v-for="column in OUTPUT_FILE_HEADERS" :key="column.field"
                            :property-name="column.field"
                            :sort-rule="sortRule"
                            @sort="sortQuery"
                            :label="column.label" />
                        </tr>
                        <!-- -->
                    </thead>
                    <tbody>
                        <!-- -->
                        <tr>
                            <td>
                                <input type="text" value="12/28/2021" class="form-control" disabled />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value="Barry Manilow"
                                    class="form-control"
                                    disabled
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value="Lorem ipsum dolor sit amet, duo ea dicta quidam"
                                    class="form-control"
                                    disabled
                                />
                            </td>

                            <td>
                                <input
                                    type="text"
                                    value="Ei erant clita doctus usu"
                                    class="form-control"
                                    disabled
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value="filename.ext"
                                    class="form-control"
                                    disabled
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value="Lorem ipsum dolor sit amet, duo ea dicta quidam"
                                    class="form-control"
                                />
                            </td>

                        </tr>

                        <!-- -->
                    </tbody>
                </table>
            </div>
        </b-card>
    </div>
</template>
<script>

import config from '../../assets/constants/common-contant.js';
import SharedService from '../../service/shared-service.js';
import SortableHeader from '../shared/SortableHeader';
export default {
    name: "OutputFile",
    components: {
        SortableHeader
    },
    data() {
        return {
            sharedService: new SharedService(),
            OUTPUT_FILE_HEADERS: config.OUTPUT_FILE_HEADERS,
            sortRule: {
              columnName: 'name',
              orderByDescending: true
            },
            outputFiles: []
        }
    },
    methods: {
        sortQuery(sortRule) {
            const self = this;
            this.sortRule = sortRule;
            if(sortRule.columnName) {
                self.outputFiles = this.sharedService.findDataAndSort(self.outputFiles, sortRule.columnName, sortRule.orderByDescending);
            }
        }
    }

}
</script>

<style scoped>
.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>