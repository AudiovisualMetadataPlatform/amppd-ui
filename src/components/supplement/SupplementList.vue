<template>
  <div
    class="container-fluid dataTables_wrapper"
    :class="baseUrl == 'unit' ? 'units' : 'collection'"
  >
    <loader :show="showLoader" />
    <div class="row">
      <div class="col-12 bg-light-gray-1">
        <main>
          <div class>
            <b-card class="m-4 text-left">
              <div class="d-flex w-100">
                <div class="col-3 text-left p-0">
                  <h1 v-if="baseUrl == 'supplement'">Supplemental File</h1>
                  <h2 v-else>
                    Supplemental Files
                  </h2>
                </div>
                <div
                  class="col-9 text-right p0 btn-grp"
                  v-if="baseUrl !== 'supplement'"
                >
                  <button
                    class="btn btn-primary btn-lg btn-edit mr-2"
                    v-if="canCreate()"
                    type="button"
                    @click="onCreate()"
                  >
                    Create New File
                  </button>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onSearch('listing-supplement')"
                  >
                    Search Files
                  </button>
                </div>
              </div>
              <SupplementFile v-if="baseUrl === 'supplement'" />
              <div class="row row-spl" v-else-if="records && records.length">
                <b-card
                  class="w-100 text-left b-card-spl"
                  v-for="elem in records"
                  :key="elem.id"
                >
                  <div class="col-12 p-0">
                    <div class="row">
                      <div class="col-11">
                        <h3>{{ elem.name }}</h3>
                        <p>{{ elem.description }}</p>
                      </div>
                      <div class="col-1 text-right">
                        <div>
                          <button
                            class="btn btn-primary btn"
                            @click="onView(elem)"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="baseUrl == 'list-supplement'">
                      <div class="row">
                        <div class="col">Unit: <br />{{ elem.unitName }}</div>
                        <div class="col" v-if="elem.collectionName">
                          Collection: <br />{{ elem.collectionName }}
                        </div>
                        <div class="col" v-if="elem.itemName">
                          Item: <br />{{ elem.itemName }}
                        </div>
                        <div class="col" v-if="elem.primaryfileName">
                          Content File: <br />{{ elem.primaryfileName }}
                        </div>
                        <div class="col">
                          Category: <br />{{ elem.category }}
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col">
                          Created By: <br />{{ elem.createdBy }}
                        </div>
                        <div class="col">
                          Modified Date: <br />{{
                            $filters.localDate(elem.modifiedDate)
                          }}
                        </div>
                        <div class="col">
                          Modified By: <br />{{ elem.modifiedBy }}
                        </div>
                      </div>
                    </div>
                  </div>
                </b-card>
              </div>
              <div class="col-12 text-left" v-else>
                <p>-No records found-</p>
              </div>
            </b-card>
          </div>
        </main>
      </div>
    </div>
    <Search
      :searchType="searchType"
      :dataSource="masterRecords"
      @myEvent="onSearchDone"
      isEntityList="true"
    />
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "@/service/shared-service";
import SupplementService from "@/service/supplement-service";
import Search from "@/components/shared/Search.vue";
import SupplementFile from "./SupplementFile.vue";
import { env } from "../../helpers/env.js";

export default {
  name: "SupplementList",
  components: {
    Loader,
    Search,
    SupplementFile,
  },
  data() {
    return {
      loading: false,
      sharedService: new SharedService(),
      supplementService: new SupplementService(),
      records: [],
      masterRecords: [],
      showLoader: false,
      searchType: "",
    };
  },
  computed: {
    acIsAdmin: sync("acIsAdmin"),
    acActions: sync("acActions"),
    baseUrl() {
      const self = this;
      if (
        window.location.hash.toLowerCase().indexOf("supplemental-files/") > -1
      ) {
        return "supplement";
      } else if (
        window.location.hash.toLowerCase().indexOf("supplemental-files") > -1
      ) {
        return "list-supplement";
      }
      return "";
    },
  },
  props: {},
  methods: {
    canCreate() {
      let actionKey = env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE") + "-" + env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT")
      return this.acIsAdmin || this.acActions.includes(actionKey);
    },
    onSearch(type) {
      this.searchType = type;
      this.$bvModal?.show("modal-lg");
    },
    onSearchDone(records) {
      this.records = records && records.length ? records : this.masterRecords;
    },
    async getSupplementalFiles() {
      const self = this;
      let supplementalFiles = {};
      await self.supplementService
        .getSupplementFiles()
        .then((res) => {
          supplementalFiles = res;
        })
        .catch((err) => {
          self.$bvToast.toast(
            "Unable to retrive Supplemental Files. Please try again!",
            self.sharedService.erorrToastConfig
          );
        });
      return supplementalFiles;
    },
    async getSupplementData() {
      const self = this;
      self.showLoader = true;
      const supplementalFilesResponse = await self.getSupplementalFiles(self);

      if (supplementalFilesResponse) {
        let supplementalFiles = supplementalFilesResponse;
        if (supplementalFiles.length) {
          self.records = self.sharedService.sortByAlphabatical(
            supplementalFiles
          );
          self.masterRecords = JSON.parse(JSON.stringify(self.records));
        }
        self.showLoader = false;
      } else {
        self.showLoader = false;
      }
    },
    /*
    async getSupplementData() {
      const self = this;
      self.showLoader = true;
      const supplementalFilesResponse = await self.getSupplementalFiles(self);

      // Temporary logic, need to update while using paging
      if (supplementalFilesResponse) {
        console.log(
          "totalElements:" + supplementalFilesResponse.page.totalElements
        );
        const tempSupplementalFilesResponse = await self.getSupplementalFiles(
          "0",
          supplementalFilesResponse.page.totalElements,
          self
        );

        let supplementalFiles = [];
        for (const property in tempSupplementalFilesResponse._embedded) {
          supplementalFiles.push(
            ...tempSupplementalFilesResponse._embedded[property]
          );
        }
        if (supplementalFiles.length) {
          self.records = self.sharedService.sortByAlphabatical(
            supplementalFiles
          );
          self.masterRecords = JSON.parse(JSON.stringify(self.records));
        }
        self.showLoader = false;
      } else {
        self.showLoader = false;
      }
    },
    */
    async getData() {
      const self = this;
      if (self.baseUrl === "list-supplement") {
        self.getSupplementData();
      }
    },
    async onView(objInstance) {
      const self = this;
      if (self.baseUrl === "list-supplement") {
        let typeValue = "";
        if (objInstance && objInstance.primaryfileName) {
          typeValue = "p-sup";
        } else if (objInstance && objInstance.itemName) {
          typeValue = "i-sup";
        } else if (objInstance && objInstance.collectionName) {
          typeValue = "c-sup";
        } else if (objInstance && objInstance.unitName) {
          typeValue = "u-sup";
        }
        self.$router.push(`/supplemental-files/${typeValue}/${objInstance.id}`);
      }
    },
    onCreate() {
      const self = this;
      if (self.baseUrl === "list-supplement")
        self.$router.push("/supplemental-files/add");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";

.btn-grp {
  margin-bottom: 33px !important;
  padding-right: 0px !important;
}
.b-card-spl {
  background-color: #fafafa !important;
  margin: 0px 0px 8px 0px !important;
}
.b-card-spl > div:first-child {
  padding: 8px !important;
}
.row-spl {
  margin: 0px !important;
}
</style>
