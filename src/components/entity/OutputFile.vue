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
export default {
    name: "OutputFile"

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