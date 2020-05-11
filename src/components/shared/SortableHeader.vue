<template>
	<th
		:class="['st-header', {'st-sorted': isSorted}]"
		@click="sort()"
	>
		<slot><span>{{label||propertyName}}</span></slot>
		<span class="st-arrow invisible" v-if="!isSorted">&#x25B2;</span>
		<span class="st-arrow" v-if="isSorted && !sortRule.orderByDescending">&#x25B2;</span>
		<span class="st-arrow" v-if="isSorted && sortRule.orderByDescending">&#x25BC;</span>
	</th>
</template>

<script>
export default {
	name: 'SortableHeader',
	props: {
		label: String,
		propertyName: {
			type: String,
			required: true
		},
		sortRule: {
			type: Object,
			required: true
		}
	},
	computed: {
		isSorted() {
			return this.sortRule.columnName === this.propertyName;
		}
	},
	methods: {
		sort() {
			let sortRule = Object.assign({}, this.sortRule);
			if(sortRule.columnName === this.propertyName) {
				sortRule.orderByDescending = !sortRule.orderByDescending;
			} else {
				sortRule.orderByDescending = false;
				sortRule.columnName = this.propertyName;
			}
			this.$emit('sort', sortRule);
		}
	}
}
</script>

<style>
.st-header {
	cursor: pointer;
	user-select: none;
}
.st-header:hover {
    background-color: rgba(0,0,0,0.15);
}
.st-header.st-sorted {
    background-color: rgba(0,0,0,0.1)
}
.st-header.invisible {
    visibility: hidden;
}
.st-arrow {
	color: #888;
	font-size: 80%;
}
</style>