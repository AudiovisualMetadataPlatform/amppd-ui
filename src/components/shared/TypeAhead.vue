<template>
 <div>
        <input 
            v-model="query"
            type="text" 
            :placeholder="placeholder"
            @input="onChange"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
            :class="'form-control ' +customClass"
        >
        <ul v-show="isOpen" class="autocomplete-results" id="autocomplete-results">
            <li class="autocomplete-result"
            
                v-for="(result, i) in results"
                :ref="'typeahead'+i"
                :key="i"
                @click="setResult(result)"
                :class="{ 'is-active': i === arrowCounter }">
                {{ result }}
            </li>
        </ul>
        
		<!-- <p v-show="isEmpty">Sorry, but we can't find any match for given term :( </p>  -->       
    </div>
</template>

<script>
import { sync } from 'vuex-pathify';
export default {
    name: 'Typeahead',
    props: {
        source: {
            type: [Array],
            required: true
        },
        filterKey: {
            type: String,
            required: true
        },
        filterType: {
            type: String,
            default: 'starts',
            required: false
        },
        startAt: {
            type: Number,
            default: 1  
        },
        placeholder: {
            type: String,
            default: ''
        },
        customClass: {
            type:String,
            default: ''
        }

	},   
	data() {
        return {
            items: [],
            query: '',
            results : [],
            isLoading: false,
            arrowCounter: -1,
            isOpen: false
        }
	},	

    methods: {


        onChange() {
            let self = this;
            this.arrowCounter = -1;
            self.fetchItems();
            if(self.items.length > 0){
                console.log("calling filter results")
                self.results = self.filterResults();
                if(self.results.length > 0 && self.query != ''){
                    self.isOpen = true;
                }
                else {
                self.isOpen = false;
                }
            }
            else
                console.log("not calling filter results as items.length is:"+self.items.length); 
            console.log("query:"+self.query+" items[0]:"+self.items[0]);
            console.log("submitter results have been set to:"+self.results);  
        },
        filterResults() {
            let self = this;
            if(self.filterType=="starts"){
                return self.items.filter((item) => {
                    return item && item.toLowerCase().startsWith(self.query.toLowerCase());
                    });
            }
            else if(self.filterType=="contains") {
                return self.items.filter((item) => {
                    return item && item.toLowerCase().includes(self.query.toLowerCase());
                    });
            }
        },
        fetchItems() {
            let self = this;
            self.items = self.source;
            console.log("self.source is:"+self.source);
        },
        reset() {
            console.log("inside reset");
            this.query = '';
            this.isOpen = false;

        },
        setResult(result) {
            let self = this;
            self.query = result;
            self.isOpen = false;
            self.$emit('selection',result)
            self.query = '';
        },
        scroll() {
            var thisElement = this.$refs['typeahead'+this.arrowCounter];
            thisElement[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); 
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.results.length-1) {
                this.arrowCounter = this.arrowCounter + 1;
            }
            else
                this.arrowCounter = 0;
            this.$nextTick(() => this.scroll())
        },
        onArrowUp(evt) {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter -1;
            }
            else
                this.arrowCounter = this.results.length-1;
            this.$nextTick(() => this.scroll())
        },
        onEnter(evt) {
            let self = this;
            self.query = self.results[self.arrowCounter];
            self.isOpen = false;
            self.arrowCounter = -1;

            self.$emit('selection',self.query)
            self.query = '';

        }
    },
    mounted() {
        this.fetchItems();
    }
};
</script>

<style>
ul{
    padding-left:0;
    z-index: 20;
    
}
.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    overflow-y: scroll;
    border-radius: .25rem;
    /* display: flex; */
    border: 1px solid transparent;
    /*padding: .75rem 2rem;*/
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	background-color: white;
    border-color: #808080;
    position:relative;
    max-height: 200px;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
  .dataTables_wrapper .dataTables_filter input{
    margin-left: 0 !important;
  }


  .customSearchWidth {
    max-width: 200px !important;
    float: right !important;
  }
</style>