<template>

  <div class="collections">
  <div class="container col-12">
    <div class="row expand-h">
      <Sidebar/>
      <div class="col-10 bg-light-gray-1">
        <header class="bg-white"> <a href="#">
            <svg data-prefix="fas" data-icon="user-circle" class="float-right icon-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path class="icon-dark-1" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
            </svg></a>
        </header>
        <main>
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">AMP Dashboard</h1>
                <button class="btn-sm btn btn-primary marg-bot-4" v-on:click="startWorkflow">Start a new workflow</button>
                
                <div>
                </div>
                <div class="container-fluid">
                  <div class="row filter-btns">
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Date range
                      </button>
                      <div class="dropdown-menu compact-form" aria-labelledby="dropdownMenuButton">
                        <form class="">
                          <div class="form-group row">
                            <label for="colFormLabelFrom" class="col-sm-4 col-form-label col-form-label-sm text-right">From</label>
                            <div class="col-sm-8">
                              <input type="date" class="form-control form-control-sm" id="colFormLabelFrom">
                            </div>
                          </div>
                          <div class="form-group row">
                            <label for="colFormLabelFrom2" class="col-sm-4 col-form-label col-form-label-sm text-right">To</label>
                            <div class="col-sm-8">
                              <input type="date" class="form-control form-control-sm" id="colFormLabelFrom2">
                            </div>
                          </div>
                          <div class="form-group row">
                            <div class="col-sm-12">
                              <button class="btn btn-info float-right">Filter</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Submitter
                      </button>
                      <div class="dropdown-menu compact-form" aria-labelledby="dropdownMenuButton">
                        <form class="">
                          <div class="container-fluid">
                            <label for="colFormLabelSearch" class=" bold">Submitter Name</label>
                            <div class="input-group mb-3">
                              <input id="colFormLabelSearch" type="text" class="form-control" placeholder="Search Submitter Name">
                              <div class="input-group-append">
                                <button class="btn btn-outline" id="btn-search" type="submit"> <svg class="svg-search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                    <title>search</title>
                                    <path d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z" />
                                  </svg></button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div class="container">
                          <div class="card p-2">
                            <strong>Selected Submitters</strong>
                            <div>
                              <button class="btn btn-outline">
                                <svg class="user-remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                  <path d="M30.3 30.8l-4.1 4.1c-0.6 0.6-0.8 1.3-0.8 2.1 0 0.8 0.3 1.5 0.8 2.1l1.9 1.9c-0.3 0-0.7 0.1-1 0.1H7c-1.8 0-3.3-0.5-4.4-1.6 -1.1-1.1-1.7-2.5-1.7-4.3 0-0.8 0-1.6 0.1-2.4 0.1-0.8 0.2-1.6 0.3-2.5 0.2-0.9 0.4-1.7 0.6-2.5 0.2-0.8 0.6-1.5 1-2.2 0.4-0.7 0.9-1.3 1.4-1.9 0.5-0.5 1.2-0.9 2-1.2C7.1 22.1 7.9 22 8.8 22c0.3 0 0.6 0.1 0.9 0.4 2.3 1.9 4.8 2.8 7.3 2.8s4.9-0.9 7.3-2.8c0.3-0.3 0.6-0.4 0.9-0.4 0.4 0 0.9 0 1.3 0.1 -0.4 0.4-0.7 0.8-0.9 1.1s-0.3 0.8-0.3 1.3c0 0.8 0.3 1.5 0.8 2.1L30.3 30.8zM23.2 20.9c-1.7 1.7-3.8 2.6-6.2 2.6 -2.4 0-4.5-0.9-6.2-2.6 -1.7-1.7-2.6-3.8-2.6-6.2s0.9-4.5 2.6-6.2c1.7-1.7 3.8-2.6 6.2-2.6 2.4 0 4.5 0.9 6.2 2.6 1.7 1.7 2.6 3.8 2.6 6.2S25 19.1 23.2 20.9zM41.7 30.8l5.7 5.7c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5l-3.1 3.1c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-5.7-5.7 -5.7 5.7c-0.1 0.1-0.3 0.2-0.5 0.2 -0.2 0-0.4-0.1-0.5-0.2l-3.1-3.1c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l5.7-5.7 -5.7-5.7c-0.1-0.1-0.2-0.3-0.2-0.5 0-0.2 0.1-0.4 0.2-0.5l3.1-3.1c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l5.7 5.7 5.7-5.7c0.1-0.1 0.3-0.2 0.5-0.2 0.2 0 0.4 0.1 0.5 0.2l3.1 3.1c0.1 0.1 0.2 0.3 0.2 0.5 0 0.2-0.1 0.4-0.2 0.5L41.7 30.8z" /></svg>
                                Cyndi Lauper
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Workflow name
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <!-- -->
                        <form class="compact-form">
                          <div class="container-fluid ">
                            <div class="form-check p-1">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                              <label class="form-check-label" for="defaultCheck1">
                                Automated transcription
                              </label>
                            </div>
                            <div class="form-check p-1">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck3">
                              <label class="form-check-label" for="defaultCheck3">
                                Transcript review
                              </label>
                            </div>
                            <div class="form-check p-1">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck4">
                              <label class="form-check-label" for="defaultCheck4">
                                Named entity recognition
                              </label>
                            </div>
                            <div class="form-check p-1">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck5">
                              <label class="form-check-label" for="defaultCheck5">
                                Segmentation
                              </label>
                            </div>
                            <div class="form-check p-1">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck6">
                              <label class="form-check-label" for="defaultCheck6">
                                Natural language processing
                              </label>
                            </div>
                            <div class="row">
                              <div class="container">
                                <div class="col-md-2"></div>
                                <div class="col-md-2 offset-md-8">
                                  <button class="btn btn-secondary ">Done</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        <!-- //-->
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Source Item
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Source file
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton4">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Workflow step
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton6" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Status
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton6">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                    <!-- -->
                    <!-- -->
                    <div class="dropdown">
                      <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton7" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Search
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton7">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                    <!-- -->
                  </div>
                  <div class="row spacer">
                  </div>
                </div>
                <DashboardTable/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import { sync } from 'vuex-pathify'
import WorkflowService from '../../service/workflow-service';
import Sidebar from '@/components/navigation/Sidebar.vue';
import DashboardTable from '@/components/workflow/DashboardTable.vue';

export default {
  name: 'Workflow',
  components:{
    Sidebar,
    DashboardTable
  },
  data(){
    return {
      workflowSubmitted: false,
      bundle: null,
      workflowService: new WorkflowService()
    }
  },
  computed:{
  },
  props: {
  },
  methods:{
    startWorkflow(){
      this.$router.push('/workflow/submit');
    }

  },
  mounted(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spacer{
    height: 24px;
  }
</style>
