<template>
  <div class="container col-12 dataTables_wrapper mt-3">
    <b-card class="text-center mt-5 ">
              <h2 class="text-left">Unit Details</h2>
              <form name="unitForm" class="form">
                <div class="col-12 text-left form-group p-0">
                  <label>Unit Name</label>
                  <input type="text" class="form-control w-100" v-model="unitDetails.name" :disabled="showEdit"/>
                </div>
                <div class="col-12 text-left form-group p-0">
                  <label>Description</label>
                  <textarea class="form-control w-100" v-model="unitDetails.description" :disabled="showEdit"></textarea>
                </div>

                <div class="row">
                  <div class="col-6 p-0">
                    <div class="col-12 text-left form-group">
                      <label>Created By</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="unitDetails.createdBy"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-12 text-left form-group">
                      <label>Modified By</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="unitDetails.modifiedBy"
                        :disabled="true"
                      />
                    </div>
                  </div>
                  <div class="col-6 p-0">
                    <div class="col-12 text-left form-group">
                      <label>Date Created</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="unitDetails.createdDate"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-12 text-left form-group">
                      <label>Modified Date</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="unitDetails.modifiedDate"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>

                <div class="w-100 text-right p-0">
                  <div v-if="!showEdit">
                    <button
                      class="btn btn-outline btn-lg btn-edit mr-2"
                      type="button"
                      @click="onCancel"
                    >Cancel</button>
                    <button class="btn btn-primary btn-lg btn-edit" type="button" @click="updateUnitDetails">Save</button>
                  </div>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="showEdit = !showEdit"
                    v-if="showEdit"
                  >Edit</button>
                </div>
              </form>
            </b-card>
  </div>
</template>

<script>
import UnitService from "../../service/unit-service";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';
import { sync } from "vuex-pathify";

export default {
  name: "Unit",
  components: {
    Logout,
    Sidebar
},
  props: {},
  data: function () {
    return {
      unitService: new UnitService(),
      unitDetails: {},
      showEdit: true,
      purpose: "details"
    }
  },
  computed: {
    selectedUnit: sync("selectedUnit")
  },
  methods: {
    onCancel() {
      var result = confirm("Are you sure want to cancel!")
      if (result) this.showEdit = !this.showEdit;
    },

    async getUnitDetails() {
      let self = this;
      self.unitService.getUnitById(self.selectedUnit.id, true).then(response => {
        self.unitDetails = response;
      });

    },
    async updateUnitDetails() {
      const self =  this;
      self.unitService.updateUnitDetails(self.selectedUnit.id,self.unitDetails).then(response => {
        alert("updated successfully!");
      })
    }
  },
  mounted() {
    let self = this;
    self.getUnitDetails();
  }
};
</script>

<style scoped>
@import "/amppd-ui/src/styles/style.css";
</style>