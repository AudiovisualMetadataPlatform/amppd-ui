<template>
    <div>
        <b-modal size="lg" id="modal-lg" centered @show="processModalData()">
            <template #modal-header="{}">
            <!-- Emulate built in modal header close button action -->
            
            <h5 class="text-capitalize" v-if="!isEntityList">{{type}}</h5>
            <h5 class="text-capitalize" v-if="isEntityList">Search</h5>
            </template>

            <template #default="{}">
                 <form class="mb-2 col-12 d-flex p-0" @submit.prevent="onFilterUserInput">
                    <div class="input-group mb-3">
                 <input type="text" class="form-control"  @input="populteValues" placeholder="Search here" v-model="userSearchValue">
                 <div class="input-group-append">
                   <button class="btn btn-success" type="submit">Go</button>
                 </div>
               </div>
                    <!-- <typeahead :source="typeaheadSearchItems" filter-key="items" filter-type="contains" :start-at="1" @selection="addItem"
							id="colFormLabelSearch" class="col-10 form-control bootstrap-typeahead" placeholder="Search here"/> -->
                            <!-- <button class="btn btn-outline-success my-2 my-sm-0 col-2" type="button">Search</button> -->
                </form>
                <h6>Selected: <span v-if="type && selectedFilters[type]">{{selectedFilters[type].length}}</span></h6>
                <div class="scrollDiv w-100">
                    <table class="w-100 table table-striped">
                    <thead>
                        <th>
                            <label><input class="selectAll" type="checkbox" v-model="selectAll" :value="selectAll" id="selectAll" @change="onSelectAllChange($event)"><span class="selectAll pl-1">Select All</span></label>
                        </th>
                        <template v-if="!isEntityList">
                            <th v-if="type === 'collections' || type === 'units'">Unit</th>
                            <th v-if="type === 'collections'">Collection</th>
                            <th v-if="type === 'workflows'">Workflow</th>
                            <th v-if="type === 'outputs'">Output</th>
                            <th v-if="(type === 'workflows' || type === 'collections')">Date Created</th>
                        </template>
                        <template v-if="isEntityList">
                            <th colspan="2" v-if="type === 'listing-collection'">Collection</th>
                            <th colspan="2" v-if="type === 'listing-item'">Item</th>
                            <th colspan="2">Description</th>
                            <th v-if="type === 'listing-item'">External Id</th>
                        </template>
                    </thead>
                    <tbody>
                        <tr v-for="source in clonedDataSource" :key="source.id">
                            <td colspan="1">
                                <input class="selectAll" type="checkbox" v-model="selectedRecords" :value="source.id" @change="onChange($event, source)">
                            </td>
                            <template v-if="!isEntityList">
                                <td v-if="type === 'collections' || type === 'units'">{{ source.unitName }}</td>
                                <td v-if="type === 'collections'">{{ source.collectionName }}</td>
                                <td v-if="type === 'workflows'">{{ source.workflowName }}</td>
                                <td v-if="type === 'outputs'">{{ source.outputName}}</td>
                                <td v-if="(type === 'workflows' || type === 'collections')">{{source.dateCreated | LOCAL_DATE_VALUE}}</td>
                            </template>
                            <template v-if="isEntityList">
                                <td colspan="1">{{source.name}}</td>
                                <td colspan="3">{{source.description}}</td>
                                <td v-if="type === 'listing-item'">{{source.externalId}}</td>
                            </template>

                        </tr>
                    </tbody>
                </table>
                </div>
                
            </template>

            <template #modal-footer="{ok, hide}">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <button class="btn btn-outline" @click="hide()">
                Cancel
            </button>
            <button size="sm" class="btn btn-primary" @click="ok(); onDone()">
                Done
            </button>
            
            </template>
        </b-modal>
    </div>
</template>

<script>
import { sync } from "vuex-pathify";
import SharedService from "../../service/shared-service";
import Typeahead from '../shared/TypeAhead.vue';

export default {
    props: {
        searchType: {
            default: ""
        },
        dataSource: {
            default: []
        },
        isEntityList: {
            default: false
        }
    },
    components:{
        Typeahead
    },
    computed:{
        modifiedDataSource() {
            return [];
        },
        type: {
            get(){
             return this.searchType;
           },
           set(value){
             return value;
           } 
        },
        selectedFilters: sync("selectedFilters"),
        workflowDashboard: sync("workflowDashboard")
    },

    data() {
        return {
            sharedService: new SharedService(),
            userSearchValue: "",
            typeaheadSearchItems: [],
            searchProps: [],
            clonedDataSource: [],
            selectedRecords: [],
            selectAll: false,
            searchDataSourceMap: new Map()
            // type: JSON.parse(this.searchType)
            
        }
        
    },
    created() {
        this.getTypeaheadSearchItems();
        this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
    },
    // watch: {
    //   type(v) {
    //       this.type = v;
    //       this.processModalData()
    //   }
    // },
    methods: {
        onSelectAllChange(ev) {
            const self = this;
            if(ev.srcElement.checked) {
                self.selectedRecords = this.clonedDataSource.map(el=> el.id);
                self.selectedFilters[self.type] = JSON.parse(JSON.stringify(this.clonedDataSource));
            } else {
                self.selectedRecords = [];
                self.selectedFilters[self.type] = [];
                this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
            }
            return;
        },
        onChange(ev, record) {
            const self = this;
            if(ev.srcElement.checked) {
                self.selectedFilters[self.type] = self.selectedFilters[self.type] || [];
                if(!self.selectedFilters[self.type].find(el => el.id === record.id))
                    self.selectedFilters[self.type].push(this.clonedDataSource.find(el=> el.id === record.id));
            } else {
                // self.selectedRecords.splice(this.selectedRecords.indexOf(record.id), 1);
                self.selectedFilters[self.type].splice(self.selectedFilters[self.type].indexOf(el => el.id === record.id), 1);
                if(self.selectedRecords.length !== self.clonedDataSource.length) self.selectAll= false;
            }
        },
        onFilterUserInput() {
            const self = this;
            if(!self.userSearchValue) return;

            const temp = [];
            const tempDataSource = this.searchDataSourceMap.get(self.type);
            tempDataSource.filter(o =>
                // Object.keys(o).some(k => o[k] && o[k].toLowerCase().includes(self.userSearchValue.toLowerCase())));
                self.searchProps.filter(el => {
                    if(o[el] && o[el].toLowerCase().indexOf(self.userSearchValue.toLowerCase()) >-1) {
                        if(!temp.find(e => e.id === o.id))  temp.push(o);
                    }
                }));
            
            self.clonedDataSource = temp;
        },
        populteValues() {
            if(!this.userSearchValue) {
                this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
                // const tempDataSource = this.searchDataSourceMap.get(this.type);
                // if(tempDataSource) 
                //     this.clonedDataSource = JSON.parse(JSON.stringify(tempDataSource));
                this.selectAll= (this.selectedRecords.length === this.dataSource.length);
            }
        },
        getTypeaheadSearchItems() {
            const self = this;
            self.searchProps = [];
            switch(self.type){
                case 'collections':
                    self.searchProps = ["collectionName", "unitName"]
                    break;
                case 'units':
                    self.searchProps = ["unitName"]
                    break; 
                case 'workflows':
                    self.searchProps = ["workflowName"]
                    break;   
                case 'outputs':
                    self.searchProps = ["outputName"]
                    break;
                case 'listing-collection':
                case 'listing-item':
                    self.searchProps = ["name"]
                    break            
            }
            // self.dataSource.map(el=> {
            //     self.searchProps.map(prop => {
            //         if(el[prop]&& self.typeaheadSearchItems.indexOf(el[prop] ===-1)) {
            //             self.typeaheadSearchItems.push(el[prop]);
            //         }
            //     })
            // });
        },
        addItem(item) {
            const sefl = this;
            sefl.selectedFilters[self.type] = sefl.selectedFilters[self.type] || [];
            if(sefl.selectedFilters[self.type].indexOf(item) === -1) sefl.selectedFilters[self.type].push(item); 
        },
        onDone() {
            switch(this.type) {
                case 'collections':
                    this.workflowDashboard.searchQuery.filterByCollections = this.selectedFilters[this.type].map(el => el.collectionName);
                    break;
                case 'workflows':
                    this.workflowDashboard.searchQuery.filterByWorkflows = this.selectedFilters[this.type].map(el => el.workflowName);
                    break;    
                case 'outputs':
                    this.workflowDashboard.searchQuery.filterByOutputs = this.selectedFilters[this.type].map(el => el.outputName);
                    break; 
                case 'units':
                    this.workflowDashboard.searchQuery.filterByUnits = this.selectedFilters[this.type].map(el => el.unitName);
                    break;
                case 'listing-collection':
                case 'listing-item':
                    this.$emit('myEvent', (this.selectedFilters[this.type] && this.selectedFilters[this.type].length) ? JSON.parse(JSON.stringify(this.selectedFilters[this.type])): []);
                    break;            
            }
            this.userSearchValue = "";
            this.type = "";
            this.selectAll= (this.selectedRecords.length === this.dataSource.length);
            this.populteValues();
             
        },
        processModalData() {
            const self = this;
            this.populteValues();
            this.getTypeaheadSearchItems(); 
            this.clonedDataSource = self.sharedService.sortByAlphabatical(JSON.parse(JSON.stringify(this.dataSource)), self.searchProps[0], false);
            // To get the distinct values 
            // if(this.searchDataSourceMap.get(this.type)) {
            //     this.clonedDataSource = this.searchDataSourceMap.get(this.type);
            // } else {
            //     // this.clonedDataSource = [...new Map(this.clonedDataSource.map(item =>[item[this.searchProps[0]], item])).values()];
            //     this.searchDataSourceMap.set(this.type, this.clonedDataSource);
            // }
            this.selectedRecords = (this.selectedFilters[this.type] && this.selectedFilters[this.type].length) ? this.selectedFilters[this.type].map(el => el.id) : [];
            this.selectAll= (this.selectedRecords.length === this.clonedDataSource.length)
        }
    }
}
</script>

<style scoped>
table tbody tr:nth-of-type(odd) {
    background-color: rgba(0,0,0,.05);
}
.table td, .table th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    font-size: 0.8em
}
.table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    table-layout: fixed;
}
.modal-body .scrollDiv, .scrollDiv {
    height: 250px;
    overflow-y: scroll;
}
.bootstrap-typeahead{
		height: calc(2.25rem + 1px);
		padding: 0rem 0rem;
  }
</style>