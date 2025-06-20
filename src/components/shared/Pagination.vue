<template>
  <div class="pagination-wrapper" v-if="totalResults > 0">
    <div class="dataTables_info" v-if="showTotalText">
      <label>{{ totalText }}</label>
    </div>
    <ul
      class="pagination dataTables_paginate paging_simple_numbers"
      v-if="numPages > 1"
    >
      <li
        @click="paginate(currentPage - 1)"
        :class="['page-arrow page-number-item', { 'disable-page-item': currentPage <= 1 }]"
      >
        <button class="page-number-link text-center">Previous</button>
      </li>
      <li
        v-for="p in pages"
        v-bind:class="['page-number-item', { active: p == currentPage }]"
        @click="paginate(p)"
        :key="p"
      >
        <button class="page-number-link">{{ p }}</button>
      </li>
      <li
        @click="paginate(currentPage + 1)"
        :class="['page-arrow page-number-item', { 'disable-page-item': currentPage >= numPages }]"
      >
        <button class="page-number-link text-center">Next</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalResults: {
      type: Number,
      required: true,
    },
    resultsPerPage: {
      type: Number,
      default: 10,
      coerce: (str) => Number.parseInt(str),
    },
    maxPages: {
      type: Number,
      default: 4,
    },
    pageNum: Number,
    showTotalText: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    totalText() {
      let total = this.totalResults;
      let start =
        this.currentPage > 1
          ? (this.currentPage - 1) * this.resultsPerPage + 1
          : 1;
      let end = this.currentPage * this.resultsPerPage;
      end = end > total ? total : end;
      return `Showing ${start.toLocaleString()} - ${end.toLocaleString()} of ${total.toLocaleString()}`;
    },
  },
  data() {
    return {
      currentPage: 1,
      pages: [],
      numPages: 1,
      showGoToStart: false,
      showGoToEnd: false,
    };
  },
  methods: {
    updateResult(result) {
      // Get pagingation data
      let numPages = Math.ceil(this.totalResults / this.resultsPerPage);
      let start = 1,
        end = numPages;
      let pages = [];
      let max = this.maxPages;
      let middle = Math.floor(max / 2);
      // Limit to show only X page numbers at a time.
      if (numPages > max) {
        // Active page should be third number, unless it is within 2 pages of
        // the first or last page, then adjust accordingly
        start = this.currentPage - middle;
        end = this.currentPage + (max - middle - 1);
        if (start < 1) start = 1;
        if (end <= max) end = max > numPages ? numPages : max;
        if (end > numPages) end = numPages;
        if (start > end - (max - 1)) start = end - (max - 1);
      }
      // Add the page numbers to an array for v-for loop
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      this.pages = pages;
      this.result = result;
      this.numPages = numPages;
      this.showGoToStart = start > 1;
      this.showGoToEnd = end < numPages;
    },
    paginate(pageNum, suppressEvent = false) {
      //if(pageNum === this.currentPage) return;
      if (pageNum < 1 || pageNum > this.numPages) return;
      this.currentPage = pageNum;
      if (!suppressEvent) {
        this.$emit("paginate", pageNum);
      }
      this.updateResult();
    },
  },
  mounted() {
    this.updateResult();
  },
  watch: {
    pageNum(newPage) {
      if (newPage !== this.currentPage) {
        this.paginate(newPage, true);
      }
    },

    resultsPerPage() {
      this.paginate(1, false);
    },
    totalResults() {
      this.updateResult();
    },
  },
};
</script>

<style scoped>
.align-right {
  text-align: right;
}
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
}
.pagination-wrapper ul {
  margin-top: 0;
  display: flex;
  justify-self: end;
  align-items: center;
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
.disable-page-item {
  pointer-events: none;
}
ul.pagination .page-number-item:last-child .page-number-link {
  border-top-right-radius: 0.2em;
  border-bottom-right-radius: 0.2em;
}
ul.pagination .page-number-item:first-child .page-number-link {
  border-top-left-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
}
ul li button.page-number-link {
  color: #163c4d !important;
  border: 1px solid #dee2e6;
  background-color: white;
  display: block;
  cursor: pointer;
  padding: 0.375em 0.75em;
  font-size: 0.85em;
}
ul li.page-number-item.active button.page-number-link{
  background-color: #163c4d !important;
  color: white !important
}
</style>
