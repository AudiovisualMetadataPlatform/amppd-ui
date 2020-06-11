<template>
 <div>
        <input 
            v-model="query"
            type="text" 
            :placeholder="placeholder"
            class="form-control bootstrap-typeahead"
            @input="onChange"
            @keydown.down="onArrowDown"
            @keydown.up="onArrowUp"
            @keydown.enter="onEnter"
        >
        <ul v-show="isOpen" class="autocomplete-results" id="autocomplete-results">
            <li class="autocomplete-result"
                v-for="(result, i) in results"
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
//import WorkflowService from '../../../service/workflow-service';
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
        startAt: {
            type: Number,
            default: 1  
        },
        placeholder: {
            type: String,
            default: ''
        }
	},   
	data() {
        return {
            items: [],
            query: '',
            results : [],
            isLoading: false,
            arrowCounter: 0,
            isOpen: false
        }
	},	
    computed: {
        typeAheadResult: sync("typeAheadResult")
    },

    methods: {
        onChange() {
            let self = this;
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
                console.log("not calling filter results") 
            console.log("query:"+self.query+" items[0]:"+self.items[0]);
            console.log("submitter results have been set to:"+self.results);  
        },
        filterResults() {
            let self = this;
            return self.items.filter((item) => {
                return item.toLowerCase().startsWith(self.query.toLowerCase());
                });
        },
        fetchItems() {
            this.items = this.source;
        },
        reset() {
            this.query = ''
        },
        setResult(result) {
            this.query = result;
            this.isOpen = false;
            this.typeAheadResult.push(this.query);
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter -1;
            }
        },
        onEnter() {
            this.query = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
            this.typeAheadResult.push(this.query);
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
            this.isOpen = false;
            this.arrowCounter = -1;
            }
        }
    },
    mounted() {
        this.fetchItems();
        document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
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
    height: 100px;
    overflow-y: scroll;
    border-radius: .25rem;
    /* display: flex; */
    border: 1px solid transparent;
    /*padding: .75rem 2rem;*/
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	color: #fff;
    background-color: white;
    border-color: #808080;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }
 .submitter{
	margin:0.2rem;
    height: 500px;
  }
  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>