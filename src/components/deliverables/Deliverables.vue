<template> 
  <div class="deliverables">
  <loader :show="loading"/>
  <div class="container col-12" v-bind:class="[{ modalOpen: showModal }, 'container', 'col-12']">   
      <div class="row expand-h">        
      <Sidebar/>    
      <div class="col-10 bg-light-gray-1">
        <main class="main-margin-min">
          <Logout/>
          <div class="pad-all-3">
            <div class="card">
              <div class="card-body">
                <h1 class="card-title">AMP Deliverables</h1>
                <button v-bind:disabled="!canBagFinalSelection" class=" btn btn-primary marg-bot-4" data-toggle="modal" data-target=".bd-example-modal-lg">Bag Final Selection</button>
                  <div>
                  <h2 class="sub-title">Source Item: <span>{{sourceItem.itemName}}</span></h2>
                  <h2 class="sub-title">Source Filename: <span>{{sourceItem.primaryFileLabel}}</span></h2>
                  </div>
                  <div class="table-responsive">
                  <button v-on:click="searchModal" id="btn-search-modal" class=" btn btn-primary marg-bot-4" data-toggle="modal" data-target=".bd-example-modal-lg-2">Search</button>       
                  
                  <div class="final-choice-top"><span class="txt-v">Show Final Choices Only</span>
                    <label class="switch" title="Final Choice"><span class="sr-only">Final Choice</span>
                      <input type="checkbox" v-on:click="filterByFinal">
                      <span class="slider round"></span>
                    </label>
                  </div>    
                  <div id="myTable_wrapper" class="dataTables_wrapper no-footer">
                    <div class="dataTables_length" id="myTable_length">
                      <label>Show <select name="myTable_length" aria-controls="myTable" class="" v-model="searchQuery.resultsPerPage"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label>
                    </div>

                  <table id="myTable" class="table dataTable no-footer">
                    <thead>
                      <tr>
                        <sortable-header v-for="column in columns" :key="column.field"
                                :property-name="column.field"
                                :sort-rule="searchQuery.sortRule"
                                @sort="sortQuery"
                                :label="column.label" />
                      </tr>
                    </thead>
                    <tbody v-if="rows && rows.length>0">
                      <tr v-for="rec in rows"
                        :key="rec.id">
                        <td>{{ new Date(rec.date) | dateFormat('YYYY-MM-DD') }}</td>
                        <td>{{ rec.submitter }}</td>
                        <td>{{ rec.workflowName }}</td>
                        <td>{{ rec.workflowStep }}</td>
                        <td v-if="rec.outputPath == null">{{ rec.outputFile }}</td>
                        <td v-else-if="rec.outputPath != null"><a v-bind:href="getOutputUrl(rec)" target="_blank">{{ rec.outputFile }}</a></td>
                        <td>
                          <label class="switch" title="Final Choice">
                              <span class="sr-only">Final Choice</span>
                                <input type="checkbox" v-model="rec.isFinal"  v-on:click="setIsFinal(rec.id)">
                              <span class="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="8" class="no-results">No results</td>
                      </tr>
                    </tbody>
                  </table>
                  <pagination v-if="searchQuery"
                        :pageNum="searchQuery.pageNum"
                        :resultsPerPage="Number.parseInt(searchQuery.resultsPerPage)"
                        :totalResults="totalResults"
                        :maxPages="3"
                        @paginate="paginate" />
                </div>
                  </div>
              </div>
            </div>
          </div>
          <modal class="my-modal" v-if="showModal" @close="showModal=false ">
            <h3 slot="header">
              Search
            </h3>
            <div slot="body">
              <div class="input-group mb-3">
                <input v-model="searchWord" type="text" class="form-control" placeholder="Search" 
                v-on:keyup.enter="searchKeyUp"
                v-on:keyup.down="onArrowDown"
                ref="searchInput"
                tabindex="0"
                >
                <div class="input-group-append">
                  <button v-on:click="searchFiles" class="btn btn-success" type="button">Go</button>
                </div>
              </div>
              <div class="scrollDiv">
             <table id="myTable" data-detail-view="true" class="table" ref="tbl">
               <thead>
                 <tr>
                   <th data-sortable="true" data-field="type">Source items</th>
                   <th data-sortable="true" data-field="item">Source filenames</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(item, index) in searchedItems" 
                      v-bind:key="index" 
                      :ref="'row'+index"
                      tabindex="0"
                      v-on:keyup.down="onArrowDown"
                      v-on:keyup.up="onArrowUp"
                      v-on:click="rowClicked(index)" 
                      v-bind:class="{ highlight: rowSelected(item.primaryFileId) }"
                      >
                   <td>{{item.itemName}}</td>
                   <td>{{item.primaryFileLabel}}</td>
                 </tr>
               </tbody>
             </table>
            </div>
            </div>
            <slot slot="footer" class="my-modal-footer">
              <button type="button" class="btn btn-outline pull-left" data-dismiss="modal"  v-on:click="close()" aria-label="Close">Cancel</button>
              <button type="button" class="btn btn-primary" v-on:click="done()">Done</button>
            </slot>
          </modal>
        </main>
      </div>    
    </div>  
    
  </div>  
  </div>
</template>  
<script>
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue'
import Modal from '@/components/shared/Modal.vue'
import WorkflowService from '../../service/workflow-service';
import DashboardService from '../../service/dashboard-service';
import SortableHeader from '../shared/SortableHeader';
import Pagination from '../shared/Pagination';
import Loader from '@/components/shared/Loader.vue';

export default {
  name: 'Deliverables',
  components:{
    Sidebar,
    Logout,
    Modal,
    SortableHeader,
    Pagination,
    Loader
  },
  data(){
    return {
      workflowService: new WorkflowService(),
      dashboardService: new DashboardService(),
      sourceItem: {itemName: "None", primaryFileLabel: "None"},
      showModal: false,
      searchWord: "",
      searchedItems: [],
      selectedItems: [],
      selectedIndex: -1,
      finalItems: [],
      rows: [],
      totalResults: 0,
      loading: false,
      canBagFinalSelection: false,
      columns:[
        {label: 'Date', field: 'date'},
        {label: 'Submitter', field: 'submitter'},
        {label: 'Workflow Name', field: 'workflowName'},
        {label: 'Workflow Step', field: 'workflowStep'},
        {label: 'Output File', field: 'outputFile'},
        {label: 'Final', field: 'isFinal'}
      ],
      searchQuery: {
            sortRule: {
              columnName: 'outputFile',
              orderByDescending: false
            },
            pageNum: 1,
            resultsPerPage: 10,
            filterBySubmitters:[],
            filterByDates:[],
            filterByWorkflows:[],
            filterByItems:[],
            filterByFiles:[],
            filterBySteps:[],
            filterByStatuses:[],
            filterBySearchTerm:[],
            filterByFinal: false
          },
    }
  },
  methods:{
    reset(){
      this.sourceItem  = {itemName: "None", primaryFileLabel: "None"};
    },
    async paginate(page_number){
      this.searchQuery.pageNum = page_number;
      await this.getResults();
    },
    async filterByFinal(){
      this.searchQuery.pageNum = 1;
      this.searchQuery.filterByFinal = !this.searchQuery.filterByFinal;
      await this.getResults();
    },
    async sortQuery(sortRule){
      this.searchQuery.sortRule = sortRule;
      this.searchQuery.pageNum = 1;
      await this.getResults();
    },
    getSourceUrl(rec) {
      const BASE_URL = process.env.VUE_APP_AMP_URL;
      const url = `${BASE_URL}/primaryfiles/${rec.primaryfileId}/media`;
      return url; 
    },
    onArrowDown(e) {
      e.preventDefault();
      let self = this;
      if(self.selectedIndex < self.searchedItems.length -1){
        self.selectedIndex++;
        self.setPrimaryfileId(self.selectedIndex);
        this.$nextTick(() => this.scroll())
      }
    },
    onArrowUp(e) {
      e.preventDefault();
      let self = this;
      if(self.selectedIndex > 0){
        self.selectedIndex--;
        self.setPrimaryfileId(self.selectedIndex);
        this.$nextTick(() => this.scroll())
      }
    },
    scroll() {
        var thisElement = this.$refs['row'+this.selectedIndex];
        thisElement[0].focus();
        thisElement[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); 
    },
    getOutputUrl(rec) {
      const BASE_URL = process.env.VUE_APP_AMP_URL;
      const url = `${BASE_URL}/dashboard/${rec.id}/output`;
      return url; 
    },
    rowSelected(primaryFileId){
      return this.selectedItems.includes(primaryFileId);
    },
    rowClicked(selIndex){
      let self = this;
      this.selectedIndex = selIndex;
      self.setPrimaryfileId(selIndex);
    },
    setPrimaryfileId(index){
      let self = this;
      self.selectedItems = [];
      var primaryfile = self.searchedItems[index];
      self.selectedItems.push(primaryfile.primaryFileId);
    },
    close(){
      this.showModal = false;
      this.selectedItems = [];
    },
    async done(){
      this.showModal = false;
      if (this.selectedItems.length > 0){
        this.setItems();
        await this.getResults();
      }
    },
    async setIsFinal(dashboardResultId){
      for(var r = 0; r < this.rows.length; r++){
        if(this.rows[r].id==dashboardResultId){
          var thisRow = this.rows[r];
          if(!thisRow.isFinal){
            thisRow.isFinal = false;
          }
          thisRow.isFinal = !thisRow.isFinal;
          this.dashboardService.setIsFinal(dashboardResultId, thisRow.isFinal);
          break;
        }
      }
    },
    async searchKeyUp(e){
      if (e.keyCode === 13) {
        this.searchFiles();
      }
    },
    async searchFiles() {
        let self = this;
        self.selectedIndex = -1;
        self.selectedItems = [];
        self.searchedItems = [];
        self.loading = true;
        if(self.searchWord.length >0){
          var result = await self.workflowService.searchFiles(this.searchWord, '000');
          if(result && result.rows){
            for(var i=0; i < result.rows.length; i++){
              var thisItem = result.rows[i];
              for(var p=0; p < thisItem.primaryFiles.length; p++){
                var thisPrimaryFile = thisItem.primaryFiles[p];
                self.searchedItems.push(
                  {
                    itemName: thisItem.itemName,
                    primaryFileId: thisPrimaryFile.id,
                    primaryFileLabel: thisPrimaryFile.name
                  }
                );
              }
            } 
          }
        }
        else {
          self.searchedItems = []
        }
        self.loading = false;
    },
    setItems(){
      let self = this;
      this.searchQuery.filterByItems = [];
      this.searchQuery.filterByFiles = [];
      for(var s = 0; s < this.selectedItems.length; s++){
        for(var i = 0; i < this.searchedItems.length; i++){
          var thisItem = this.searchedItems[i];
          if(thisItem.primaryFileId === this.selectedItems[s]){
            this.searchQuery.filterByItems.push(thisItem.itemName);
            this.searchQuery.filterByFiles.push(thisItem.primaryFileLabel);
            this.sourceItem = thisItem;
          }
        }
      }
    },
    async getResults(){
      let self = this;
      if(self.sourceItem.itemName == "None"){
        return;
      }
      self.loading = true;
      var result = await this.dashboardService.getDashboardResults(self.searchQuery);
      self.rows = result.rows;
      self.totalResults = result.totalResults;
      self.loading = false;
    },
    searchModal(){
      let self = this;
      self.showModal = true;
      self.selectedIndex = -1;
      self.$nextTick(() => self.$refs.searchInput.focus());
    }
  },
  mounted(){
  }
}
</script>


<style scoped>
@import '/amppd-ui/src/styles/style.css';
  .sub-title {
    font-size: 1.2em;
    float: left;
    font-weight: bold;
    padding: 0;
    margin: 0 1em 0 0;
}
  .sub-title span {
    font-weight:normal
  }
  #btn-search-modal {
      position: absolute;
      right: 0;
      top: .5em;
      z-index: 1001;
  }
  .table-responsive {
    position: relative;
    padding-top: 19px;
}
.final-choice-top {
    z-index: 1001;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 170px;
}
.modalOpen {
    position: fixed;
}
.final-choice-top {
    z-index: 1001;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 170px;
}
#myTable{
    z-index: 20;
}

  @media screen and (max-width: 700px) {
    #btn-search-modal{
      position:relative;
      display:block;
      margin-bottom:10px;
    }
    .final-choice-top{
      position:relative;
      display:block;
      left: 0;
      margin-bottom:10px;
    }
    #myTable_length {
        float: none;
        text-align: left !important;
    }
  }
  .no-results{
    text-align: center;
    font-weight: 700;
  } 
</style>