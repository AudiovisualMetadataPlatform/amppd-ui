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
                        <tr v-for="output in listOfOutputList" :key="output.id">
                            <td>
                                <!-- <input type="text" :value="12/28/2021" class="form-control" disabled /> --> <p >{{ new Date(output.dateCreated) | dateFormat('YYYY-MM-DD') }}</p>
                            </td>
                            <td>
                                <!-- <input
                                    type="text"
                                    :value="output.submitter"
                                    class="form-control"
                                    disabled
                                /> -->
                                {{output.submitter}}
                            </td>
                            <td>
                                <!-- <input
                                    type="text"
                                    :value="output.workflowName"
                                    class="form-control"
                                    disabled
                                /> -->
                                {{output.workflowName}}
                            </td>

                            <td>
                                <!-- <input
                                    type="text"
                                    :value="output.workflowStep"
                                    class="form-control"
                                    disabled
                                /> -->
                                {{output.workflowStep}}
                            </td>
                            <td>
                                <!-- <input
                                    type="text"
                                    :value="output.outputLink"
                                    class="form-control"
                                    disabled
                                /> -->
                                {{output.outputLink}}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    :value="output.outputName"
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
import { sync } from 'vuex-pathify';
import WorkflowResultService from '../../service/workflow-result-service';
import config from '../../assets/constants/common-contant.js';
import SharedService from '../../service/shared-service.js';
import SortableHeader from '../shared/SortableHeader';
export default {
    name: "OutputFile",
    components: {
        SortableHeader
    },
    computed: {
        selectedFile: sync("selectedFile")
    },
    data() {
        return {
            sharedService: new SharedService(),
            workflowResultService: new WorkflowResultService(),
            OUTPUT_FILE_HEADERS: config.OUTPUT_FILE_HEADERS,
            sortRule: {
              columnName: 'name',
              orderByDescending: true
            },
            listOfOutputList: [],
        }
    },
    methods: {
        async getOutputFileList() {
            const self = this;
            const filters = {filterByFiles: [self.selectedFile.name]};
            const response = await this.workflowResultService.getWorkflowResults(filters);
            if(response.rows) {
                this.listOfOutputList = response.rows;
            }
            
        },
        sortQuery(sortRule) {
            const self = this;
            this.sortRule = sortRule;
            if(sortRule.columnName) {
                self.outputFiles = this.sharedService.findDataAndSort(self.outputFiles, sortRule.columnName, sortRule.orderByDescending);
            }
        }
    }, 
    mounted() {
        this.getOutputFileList();
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
.text-box {
    background-color: #e9ecef;
    opacity: 1;
}

td, th {
    padding: 0.75rem !important;
}
</style>