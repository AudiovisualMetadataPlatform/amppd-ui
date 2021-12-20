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
                            <th data-sortable="false" data-field="id">Date</th>
                            <th data-sortable="false" data-field="id">Submitter</th>
                            <th data-sortable="false" data-field="type">Workflow Name</th>
                            <th data-sortable="false" data-field="type">Workflow Step</th>
                            <th data-sortable="false" data-field="type">Output Link</th>
                            <th data-sortable="false" data-field="type">Name</th>
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

                            <td></td>
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
export default {
    name: "OutputFile",
    computed: {
        selectedFile: sync("selectedFile")
    },
    data() {
        return {
            workflowResultService: new WorkflowResultService(),
            listOfOutputList: []
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