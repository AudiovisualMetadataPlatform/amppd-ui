<template>
  <div class="container col-12 dataTables_wrapper">
    <div class="row expand-h">
      <Sidebar />
      <div class="col-10 bg-light-gray-1">
        <main class="main-margin-min">
          <Logout />
          <div class="pad-all-3">
            <!-- Unit Content Stats here -->
            <b-card class="text-center m-5">
              <h2 class="text-left">Unit Details</h2>
              <form name="unitForm" class="form">
                <div class="col-12 text-left form-group p-0">
                  <label>Unit Name</label>
                  <input type="text" class="form-control w-100" v-model="unitDetails.name" />
                </div>
                <div class="col-12 text-left form-group p-0">
                  <label>Description</label>
                  <textarea class="form-control w-100" v-model="unitDetails.description"></textarea>
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
                    <button class="btn btn-primary btn-lg btn-edit" type="button">Save</button>
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
            <!-- <CollectionDetails /> -->
            <CollectionsList />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import CollectionsList from "../collections/CollectionsList.vue";
import UnitService from "../../service/unit-service";
import Sidebar from '@/components/navigation/Sidebar.vue';
import Logout from '@/components/shared/Logout.vue';

export default {
  name: "UnitLandingPage",
  components: {
    CollectionsList,
    Logout,
    Sidebar
  },
  props: {},
  data: function () {
    return {
      unitService: new UnitService(),
      unitDetails: {},
      showEdit: true
    }
  },
  computed: {},
  methods: {
    onCancel() {
      var result = confirm("Are you sure want to cancel!")
      if (result) this.showEdit = !this.showEdit;
    },

    async getUnitDetails() {
      let self = this;
      self.unitService.getUnitById(33, true).then(response => {
        self.unitDetails = response;
      });

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