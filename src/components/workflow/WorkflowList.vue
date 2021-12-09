<template>
    <div class="p-3 w-100">
        <b-card class="w-100">
            <h2 class>
                Workflows
                <button
                    id="btn-search"
                    class="marg-lr-1 btn btn-primary btn-lg marg-b-4 float-right"
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
            <b-card v-for="workflow in listOfWorkflows" :key="workflow.id">
                <div class="row">
                        <div class="col-lg-10">
                            <h3 contenteditable="true">{{workflow.name}}</h3>
                            <p contenteditable="true">
                                {{workflow.description}}
                            </p>
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
                            <br />Ella Fitzgerald
                        </div>
                        <div class="col">
                            Creator:
                            <br />Gregg Allman
                        </div>
                        <div class="col">
                            Date Created:
                            <br />02/12/2021
                        </div>
                        <div class="col">
                            Last Updated:
                            <br />09/25/2021
                        </div>
                        <div class="col">
                            Version:
                            <br />2.5
                        </div>
                        <div class="col" v-if="workflow.tags && workflow.tags.length">
                            <p>Tags:</p>
                            <span class="badge badge-secondary" v-for="tag in workflow.tags" :key="tag">{{tag}}</span>
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
                        </div> -->
                    </div>
            </b-card>
            <!-- <div class="card bg-light-gray-1 pad-all-1">
                <div>
                    <div class="row">
                        <div class="col-lg-10">
                            <h3 contenteditable="true">Workflow Name</h3>
                            <p contenteditable="true">
                                Workflow description. Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
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
                            <br />Ella Fitzgerald
                        </div>
                        <div class="col">
                            Creator:
                            <br />Gregg Allman
                        </div>
                        <div class="col">
                            Date Created:
                            <br />02/12/2021
                        </div>
                        <div class="col">
                            Last Updated:
                            <br />09/25/2021
                        </div>
                        <div class="col">
                            Version:
                            <br />2.5
                        </div>
                        <div class="col">
                            Tags:
                            <br />
                            <span class="badge badge-secondary">Published</span>
                            <span class="badge badge-secondary">Outdated</span>
                            <span class="badge badge-secondary">In Process</span>
                        </div>
                        <div class="col">
                            Input File Formats:
                            <br />
                            <span class="badge badge-secondary">Video</span>
                            <span class="badge badge-secondary">Audio</span>
                        </div>
                    </div>
                    <div class="row marg-tb-2">
                        <div class="col">
                            <div id="accordion">
                                <div class="card">
                                    <div id="headingOne" class="card-header">
                                        <h3 class="mb-0 card-title">
                                            <button
                                                class="btn btn-link"
                                                data-toggle="collapse"
                                                data-target="#collapseOne"
                                                aria-expanded="false"
                                                aria-controls="collapseOne"
                                            >
                                                <svg
                                                    class="svg-inline dwn-arrow"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 320 512"
                                                >
                                                    <path
                                                        class="hotlink"
                                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                                    />
                                                </svg>
                                                <span class="sr-only">Toggle hidden content</span>
                                                MGMs
                                            </button>
                                        </h3>
                                    </div>
                                    <div
                                        id="collapseOne"
                                        class="collapse"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >
                                        <div class="card-body">
                                            <ul
                                                id="pills-tab"
                                                class="nav nav-pills mb-3"
                                                role="tablist"
                                            >
                                                <li class="nav-item" role="presentation">
                                                    <a
                                                        id="pills-home-tab"
                                                        class="nav-link active"
                                                        href="#pills-home"
                                                        data-toggle="pill"
                                                        role="tab"
                                                        aria-controls="pills-home"
                                                        aria-selected="true"
                                                    >Extract Audio</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a
                                                        id="pills-profile-tab"
                                                        class="nav-link"
                                                        href="#pills-profile"
                                                        data-toggle="pill"
                                                        role="tab"
                                                        aria-controls="pills-profile"
                                                        aria-selected="false"
                                                    >AWS speech to text</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a
                                                        id="pills-contact-tab"
                                                        class="nav-link"
                                                        href="#pills-contact"
                                                        data-toggle="pill"
                                                        role="tab"
                                                        aria-controls="pills-contact"
                                                        aria-selected="false"
                                                    >AWS Comprehend</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a
                                                        id="pills-vtt-tab"
                                                        class="nav-link"
                                                        href="#pills-VTT"
                                                        data-toggle="pill"
                                                        role="tab"
                                                        aria-controls="pills-profile"
                                                        aria-selected="false"
                                                    >VTT generator</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a
                                                        id="pills-ner-tab"
                                                        class="nav-link"
                                                        href="#pills-NER"
                                                        data-toggle="pill"
                                                        role="tab"
                                                        aria-controls="pills-contact"
                                                        aria-selected="false"
                                                    >NER to CSV</a>
                                                </li>
                                            </ul>
                                            <div id="pills-tabContent-1" class="tab-content">
                                                <div
                                                    id="pills-home"
                                                    class="tab-pane fade show active"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-home-tab"
                                                >
                                                    <div class="container-fluid">
                                                        <div class="row horizontal-dl">
                                                            <div class="col">
                                                                <dl
                                                                    class="d-flex flex-row flex-wrap"
                                                                >
                                                                    <dt class>Sample Rate:</dt>
                                                                    <dd class="marg-r-2">8khz</dd>
                                                                    <dt>Channels:</dt>
                                                                    <dd class="marg-r-2">Mono</dd>
                                                                    <dt>Sample Size:</dt>
                                                                    <dd
                                                                        class="marg-r-2"
                                                                    >16 bits per sample</dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    id="pills-profile"
                                                    class="tab-pane fade"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-profile-tab"
                                                >
                                                    <div class="container-fluid">
                                                        <div class="row horizontal-dl">
                                                            <div class="col">
                                                                <dl
                                                                    class="d-flex flex-row flex-wrap"
                                                                >
                                                                    <dt>Frame Quantity:</dt>
                                                                    <dd>60</dd>
                                                                    <dt>Frame Seconds:</dt>
                                                                    <dd>10</dd>
                                                                    <dt>Margin:</dt>
                                                                    <dd>10</dd>
                                                                    <dt>Number Of Columns:</dt>
                                                                    <dd>4</dd>
                                                                    <dt>Padding:</dt>
                                                                    <dd>3</dd>
                                                                    <dt>Photo Width:</dt>
                                                                    <dd>300</dd>
                                                                    <dt>Type:</dt>
                                                                    <dd>quantity</dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    id="pills-contact"
                                                    class="tab-pane fade"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-contact-tab"
                                                >... AWS Comprehend ..</div>
                                                <div
                                                    id="pills-VTT"
                                                    class="tab-pane fade"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-profile-tab"
                                                >... VTT generator ...</div>
                                                <div
                                                    id="pills-NER"
                                                    class="tab-pane fade"
                                                    role="tabpanel"
                                                    aria-labelledby="pills-contact-tab"
                                                >... NER to CSV ...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            
            <!-- end workflow // -->
        </b-card>
    </div>
</template>
<script>
import WorkflowService from '../../service/workflow-service';
export default {
    name: "WorkflowList",
    data() {
        return {
            listOfWorkflows: [],
            workflowService: new WorkflowService()
        }
    },
    methods: {
        getWorkflowList() {
            const self = this;
            self.workflowService.getWorkflows().then(response => {
                self.listOfWorkflows = response.data;
            }).catch(e =>{
                console.log(e, 'error');
            })
        }
    },
    mounted() {
        this.getWorkflowList();
    }
}
</script>