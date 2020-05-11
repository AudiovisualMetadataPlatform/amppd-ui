<template>
	<div class="pagination-wrapper" v-if="numPages > 1">
			<div><label>{{totalText}}</label></div>
			<ul class="pagination">
				<li
					@click="paginate(currentPage - 1)"
					:class="['page-arrow', {'hide-page': currentPage <= 1}]"
				>
					<a href="javascript:void(0);">Previous</a>
				</li>
				<li
					v-for="p in pages"
					v-bind:class="{'active': p == currentPage}"
					@click="paginate(p)" :key="p"
				>
					<a href="javascript:void(0);">{{p}}</a>
				</li>
				<li
					@click="paginate(currentPage + 1)"
					:class="['page-arrow', {'hide-page': currentPage >= numPages}]"
				>
					<a href="javascript:void(0);">Next</a>
				</li>
			</ul>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		totalResults: {
			type: Number,
			required: true
		},
		resultsPerPage: {
			type: Number,
			default: 25
		},
        maxPages: {
            type: Number,
            default: 4
        },
        pageNum: Number
	},
	computed: {
		totalText() {
			let total = this.totalResults;
			let start = this.currentPage > 1
				? ((this.currentPage - 1) * this.resultsPerPage) + 1
				: 1;
            let end = this.currentPage * this.resultsPerPage;
            end = end > total ? total : end;
			return `Showing ${start.toLocaleString()} - ${end.toLocaleString()} of ${total.toLocaleString()}`;
		}
	},
	data() {
		return {
			currentPage: 1,
			pages: [],
            numPages: 1,
            showGoToStart: false,
            showGoToEnd: false
		}
	},
	methods: {
		updateResult(result) {
			// Get pagingation data
			let numPages = Math.ceil(this.totalResults / this.resultsPerPage);
			let start = 1, end = numPages;
			let pages = [];
            let max = this.maxPages;
            let middle = Math.floor(max / 2);
			// Limit to show only X page numbers at a time.
			if(numPages > max) {
				// Active page should be third number, unless it is within 2 pages of
				// the first or last page, then adjust accordingly
				start = this.currentPage - middle;
				end = this.currentPage + (max - middle - 1);
				if(start < 1) start = 1;
				if (end <= max) end = (max > numPages ? numPages : max);
				if (end > numPages) end = numPages;
				if(start > end - (max - 1)) start = end - (max - 1);
            }
			// Add the page numbers to an array for v-for loop
			for(let i = start; i <= end; i++) {
				pages.push(i);
			}
			this.pages = pages;
			this.result = result;
            this.numPages = numPages;
            this.showGoToStart = start > 1;
            this.showGoToEnd = end < numPages;
		},
		paginate(pageNum, suppressEvent = false) {
            if(pageNum === this.currentPage) return;
			if(pageNum < 1 || pageNum > this.numPages) return;
			this.currentPage = pageNum;
            if(!suppressEvent) {
                this.$emit('paginate', pageNum);
            }
            this.updateResult();
		},
	},
	mounted() {
		this.updateResult();
	},
	watch: {
        pageNum(newPage) {
            if(newPage !== this.currentPage) {
                this.paginate(newPage, true);
            }
		},
		
		resultsPerPage() {
            this.paginate(1, true);
		},
		totalResults() {
			this.updateResult();
		}
	}
}
</script>

<style scoped>
.align-right {
	text-align: right;
}
.pagination-wrapper{
    display: flex;
    justify-content: space-between;
}
.pagination-wrapper ul {
    margin-top: 0;
    display: flex;
    justify-self: end;
}
.pagination > li > a {
	width: 40px;
	text-align: center;
}
.pagination > li.page-arrow > a {
	width: auto;
	padding: 6px 10px;
	width: 30px;
}
.pagination > li.hide-page > a {
	color: #888;
}
.hide-page {
	pointer-events: none;
	opacity: 0.5;
}
</style>