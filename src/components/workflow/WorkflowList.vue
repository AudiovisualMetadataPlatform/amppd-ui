<template>
    <div class="p-3 col-12 bg-light-gray-1">
        <main class="m-0">
            <b-card class="w-100">
                <h2 class>
                    Workflows
                    <button
                        id="btn-search"
                        class="ml-1 btn btn-primary btn-lg marg-b-4 float-right"
                        data-toggle="modal"
                        data-target=".bd-example-modal-lg-2"
                    >Search Workflows</button>
                    <a
                        class="btn btn-primary btn-lg marg-b-4 float-right"
                        href="#"
                        data-toggle="popover"
                        data-content="Link goes to galaxy"
                        data-original-title
                        title
                    >Create new Workflow</a>
                </h2>
                <div class="clearfix"></div>
                <!-- workflow -->
                <b-card
                    class="bg-light-gray"
                    v-for="(workflow, index) in listOfWorkflows"
                    :key="workflow.id"
                >
                    <div class="row">
                        <div class="col-lg-10">
                            <h3 contenteditable="true">{{ workflow.name }}</h3>
                            <p contenteditable="true">{{ workflow.description }}</p>
                        </div>
                        <div class="col-lg-2 text-right">
                            <a
                                class="btn btn-primary btn marg-t-5"
                                href="#"
                                data-toggle="popover"
                                data-content="Link goes to galaxy"
                                data-original-title
                                title
                            >Edit</a>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            Created By:
                            <br /> {{workflow.owner}}
                        </div>
                        <!-- <div class="col">
                            Creator:
                        </div> -->
                        <div class="col">
                            Date Created:
                            <br />{{workflow.createTime | LOCAL_DATE_VALUE}}
                        </div>
                        <div class="col">
                            Last Updated:
                            <br />{{workflow.updateTime | LOCAL_DATE_VALUE}}
                        </div>
                        <!-- <div class="col">
                            Version:
                        </div> -->
                        <div class="col" v-if="workflow.tags && workflow.tags.length">
                            <p class="mb-0">Tags:</p>
                            <span
                                class="badge badge-secondary"
                                v-for="tag in workflow.tags"
                                :key="tag"
                            >{{ tag }}</span>
                        </div>
                        <!-- <div class="col">
                            Input File Formats:
                            <br />
                            <span class="badge badge-secondary">Video</span>
                        <div class="col">
                            Input File Formats:
                            <br />
                            <span class="badge badge-secondary">Video</span>
                            <span class="badge badge-secondary">Audio</span>
                        </div>    <span class="badge badge-secondary">Audio</span>
                        </div>-->
                    </div>
                    <b-card class="mgm-card bg-light-gray-1">
                        <h3
                            class="w-100 mgm-h3 card-title bg-light-gray"
                            @click="getWorkflowDetails(index)"
                        >
                            <button
                                class="btn"
                                :class="workflow.visible ? null : 'collapsed'"
                                :aria-expanded="workflow.visible ? 'true' : 'false'"
                                :aria-controls="'mgm' + index"
                                style="font-size:24px; font-weight:400"
                                @click="workflow.visible = !workflow.visible;"
                            >
                                <span v-html="rightArrowSvg" style="font-size:24px"></span>
                                <span class="sr-only">Toggle hidden content</span>
                                <span class="pl-3">MGMs</span>
                            </button>
                        </h3>
                        <b-collapse
                            :id="'mgm' + index"
                            class="mgm-content"
                            v-model="workflow.visible"
                        >
                            <div
                                :class="{ 'p-2': (!workflow || !workflow.details || !workflow.details.length) }"
                            >
                                <b-overlay :show="(!workflow || !workflow.details)" rounded="sm" c>
                                    <b-navbar
                                        id="pills-tab-1"
                                        toggleable="lg"
                                        type="dark"
                                        class="nav-pills"
                                    >
                                        <span v-for="(node, i) in workflow.details" :key="i">
                                            <b-nav-item
                                                :class="(node && workflow.selectedNode === i) ? 'active' : ''"
                                                @click="onChangeNode(index, i)"
                                            >{{ node.nodeName }}</b-nav-item>
                                        </span>
                                    </b-navbar>

                                    <dl
                                        class="d-flex col-12 mt-3 mb-0"
                                        v-if="workflow && workflow.details && workflow.details.length"
                                    >
                                        <div
                                            class="mr-5 d-flex"
                                            v-for="(p, paramIndex) in workflow.details[workflow.selectedNode].params"
                                            :key="paramIndex"
                                        >
                                            <label class="font-weight-bold mb-0">{{ p.name }}:</label>
                                            <span class="ml-2">{{ p.value }}</span>
                                        </div>
                                    </dl>
                                </b-overlay>
                            </div>
                        </b-collapse>
                    </b-card>
                </b-card>
                <!-- end workflow // -->
            </b-card>
        </main>
    </div>
</template>
<script>
import WorkflowService from '../../service/workflow-service';
import config from '../../assets/constants/common-contant.js';
export default {
    name: "WorkflowList",
    data() {
        return {
            listOfWorkflows: [],
            workflowService: new WorkflowService(),
            rightArrowSvg: config.common.icons['right_arrow'],
        }
    },
    methods: {
        getWorkflowList() {
            const self = this;
            self.workflowService.getWorkflows().then(response => {
                self.listOfWorkflows = response.data;
            }).catch(e => {
                console.log(e, 'error');
            });
        },
        async getWorkflowDetails(index) {
            const self = this;
            if (!self.listOfWorkflows[index].visible) {
                self.selectedDetailIndex = 0;
                return;
            }

            if (!self.listOfWorkflows[index].details) {
                const workflowDetails = await this.workflowService.getWorkflowDetails(self.listOfWorkflows[index].id);
                self.listOfWorkflows[index].details = workflowDetails;
                self.listOfWorkflows[index].selectedNode = 0;
                this.$set(self.listOfWorkflows, index, self.listOfWorkflows[index]);
            }

        },
        onChangeNode(workflowIndex, nodeIndex) {
            const self = this;
            self.listOfWorkflows[workflowIndex].selectedNode = nodeIndex;
            this.$set(self.listOfWorkflows, workflowIndex, self.listOfWorkflows[workflowIndex]);
        }
    },
    mounted() {
        this.getWorkflowList();
    }
}
</script>

<style scoped>
.btn:focus {
    box-shadow: none !important;
}
.mgm-card {
    margin: 10px 0px !important;
}

.mgm-card .card-body {
    padding: 0px !important;
}

.mgm-h3 {
    padding: 0.75rem 1.25rem !important;
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin-bottom: 0px;
}

.mgm-card .collapse .card,
.mgm-card .collapse .card-body {
    /* padding: 10px !important; */
    border: 0px !important;
}

.mgm-content {
    padding: 1.25rem !important;
}
nav.nav-pills {
    justify-content: flex-start !important;
    padding: 0.5rem !important;
    background: #e9ecef !important;
    border-radius: 0.5rem !important;
    list-style: none;
}

.nav-pills .nav-item.active {
    background: #153c4d !important;
    color: white !important;
}

.nav-item.active .a:link,
.nav-item.active a {
    color: white !important;
}

a:link,
a {
    color: #153c4d !important;
}

.nav-pills .active {
    border-radius: 0.25rem !important;
}

a:hover {
    color: #f4871e;
    text-decoration: none;
}
.nav {
    list-style: none !important;
}
.bg-light-gray {
    background-color: rgba(0, 0, 0, 0.03) !important;
}
h3.card-title .btn {
    /* font-size: 1.5rem; */
    line-height: 1rem;
    text-decoration: none;
    color: #153c4d;
}

.nav-pills .nav-link {
    border-radius: 0.25rem;
}
.nav-link:focus,
.nav-link:hover {
    text-decoration: none;
}
a:hover {
    color: #f4871e !important;
    text-decoration: none;
}
</style>