<template>
  <div class="dropdown">
    <button
      class="btn btn-info dropdown-toggle"
      :class="{ show: this.displayFilter === true }"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      :aria-expanded="this.workflowDashboard.filtersEnabled.dateFilter ? 'true' : 'false'"
      v-on:click="setFilterFlags"
    >
      {{
        label ? label : parent === "TestResults" ? "Date" : "Date"
      }}
    </button>
    <div
      v-if="this.displayFilter === true" v-click-outside="closeFilter"
      class="dropdown-menu compact-form"
      :class="{ show: this.displayFilter === true }"
      aria-labelledby="dropdownMenuButton"
    >
      <form class="p-2">
        <div class="row align-items-center">
          <div class="col-3">
            <label for="fromDate" class="col-form-label col-form-label-sm">From</label>
          </div>
          <div class="col-auto">
            <datepicker
              v-model="fromDate"
              class="form-control form-control-sm col-sm-8 my-datepicker"
              format="MM/dd/yyyy"
              v-on:input="setDisabledDate()"></datepicker>
          </div>
          <div class="col-3">
            <label for="toDate" class="col-form-label col-form-label-sm">To</label>
          </div>
          <div class="col-auto">
          <datepicker
            v-model="toDate"
            class="form-control form-control-sm col-sm-8 my-datepicker"
            format="MM/dd/yyyy"
            :disabled-dates="state.disabledDates"></datepicker>
          </div>
          <div class="col-auto col-12">
            <button
              class="btn btn-info float-end m-2"
              @click="filterByDate($event)"
              >
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import sync from "@/helpers/sync";
import Datepicker from "vuejs3-datepicker";
import vClickOutside from "click-outside-vue3";
export default {
  name: "DateFilter",
  components: {
    Datepicker,
  },
  data() {
    return {
      displayFilter: false,
      fromDate: new Date(),
      toDate: new Date(),
      state: {
        disabledDates: {
          to: new Date(),
        },
      },
    };
  },
  props: {
    parent: {
      default: "",
    },
    label: {
      default: "",
    },
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
  },
  methods: {
    setFilterFlags() {
      this.displayFilter = !this.displayFilter;
      this.$emit("displayChanged", this.displayFilter);
    },
    setDisabledDate() {
      let self = this;
      self.state.disabledDates.to = new Date(self.fromDate);
    },
    closeFilter() {
      if(this.displayFilter) {
        this.displayFilter = false;
        this.$emit("displayChanged", this.displayFilter);
      }
    },
    filterByDate(e) {
      e.preventDefault();
      let self = this;
      self.fromDate.setHours(0, 0, 0, 0);
      self.toDate.setHours(23, 59, 59, 999);
      if (self.label === "Test Date") {
        self.workflowDashboard.searchQuery.filterByTestDates = [];
        self.workflowDashboard.searchQuery.filterByTestDates.push(
          new Date(self.fromDate)
        );
        self.workflowDashboard.searchQuery.filterByTestDates.push(
          new Date(self.toDate)
        );
      } else {
        self.workflowDashboard.searchQuery.filterByDates = [];
        self.workflowDashboard.searchQuery.filterByDates.push(
          new Date(self.fromDate)
        );
        self.workflowDashboard.searchQuery.filterByDates.push(
          new Date(self.toDate)
        );
      }
      this.displayFilter = false;
      this.$emit("displayChanged", this.displayFilter);
    },
    getMaxDate() {
      console.log("inside getMaxDate()");
      let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1, //January is 0
        year = today.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      today = year + "-" + month + "-" + day;
      console.log("todays date :" + today);
      return today;
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mounted() {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el;
  },
};
</script>

<style scoped>
input {
  width: -webkit-fill-available;
  border-radius: 4px;
}
.my-datepicker {
  border: none;
}
.btn-info {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}
#dropdownMenuButton:hover {
  background: #153c4d !important;
  border-color: #153c4d;
  color: #fff !important;
}
#dropdownMenuButton:hover:disabled {
  background: rgba(187, 187, 187, 0.856) !important;
  border-color: rgba(187, 187, 187, 0.856) !important;
  color: #153c4d !important;
}
</style>
