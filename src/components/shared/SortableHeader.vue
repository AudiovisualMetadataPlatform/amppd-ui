<template>
  <th class="pointer" @click="sort()">
    <div class="d-flex">
      <slot>{{ label || propertyName }}</slot>
      <div
        style="width: 20px; height: 20px"
        class="ml-2"
        :class="[
          {
            sorting: !isSorted,
            sorting_desc: isSorted && sortRule.orderByDescending,
            sorting_asc: isSorted && !sortRule.orderByDescending,
          },
        ]"
      ></div>
    </div>
  </th>
</template>

<script>
export default {
  name: "SortableHeader",
  props: {
    label: String,
    propertyName: {
      type: String,
      required: true,
    },
    sortRule: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSorted() {
      return this.sortRule.columnName === this.propertyName;
    },
  },
  methods: {
    sort() {
      let sortRule = Object.assign({}, this.sortRule);
      if (sortRule.columnName === this.propertyName) {
        sortRule.orderByDescending = !sortRule.orderByDescending;
      } else {
        sortRule.orderByDescending = false;
        sortRule.columnName = this.propertyName;
      }
      this.$emit("sort", sortRule);
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
