<template>
  <div>
    <b-modal
      size="lg"
      id="modal-lg"
      centered
      @show="processModalData()"
      :no-close-on-backdrop="type === 'item-search'"
    >
      <template #modal-header="{}">
        <!-- Emulate built in modal header close button action -->

        <h5 class="text-capitalize" v-if="!isEntityList">
          {{
            type === "item-search"
              ? "Items"
              : type === "primaryfiles"
              ? "Content Files"
              : type === "workflow-search"
              ? "Search Workflows"
              : type
          }}
        </h5>
        <h5 class="text-capitalize" v-if="isEntityList">Search</h5>
      </template>

      <template #default="{}">
        <div v-if="type === 'item-search'" class="form-group">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput100" class="sr-only"
                    >Search</label
                  >
                  <label
                    class="form-errors"
                    v-if="errors.search_error.length"
                    >{{ errors.search_error }}</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput100"
                    placeholder="Search"
                    v-model="searchWord"
                    autocomplete="off"
                    v-on:keyup.enter="searchKeyUp"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn search-btn"
                      type="button"
                      v-on:click="searchItems()"
                    >
                      <svg
                        data-v-6b33b2c4=""
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        class="svg-search"
                      >
                        <path
                          data-v-6b33b2c4=""
                          d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"
                        ></path>
                      </svg>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="form-errors no-data-error"
          v-if="type === 'item-search' && errors.no_data_error.length"
        >
          {{ errors.no_data_error }}
        </div>

        <form
          v-if="type !== 'item-search' && type !== 'workflow-search'"
          class="mb-2 col-12 d-flex p-0"
          @submit.prevent="onFilterUserInput"
        >
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              @input="populteValues"
              placeholder="Search here"
              v-model="userSearchValue"
            />
            <div class="input-group-append">
              <button class="btn btn-success" type="submit">Go</button>
            </div>
          </div>
          <!-- <typeahead :source="typeaheadSearchItems" filter-key="items" filter-type="contains" :start-at="1" @selection="addItem"
                    id="colFormLabelSearch" class="col-10 form-control bootstrap-typeahead" placeholder="Search here"/>-->
          <!-- <button class="btn btn-outline-success my-2 my-sm-0 col-2" type="button">Search</button> -->
        </form>
        <!-- <h6>
                    Selected:
                    <span v-if="type && selectedFilters[type]">{{ selectedFilters[type].length }}</span>
                </h6> -->

        <template v-if="type === 'statuses'">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="selectedRecords"
              :aria-describedby="ariaDescribedby"
              buttons
              button-variant="btn btn-lg btn-outline-primary status-btn"
              size="lg"
              name="buttons-2"
            >
              <b-form-checkbox
                v-for="source in clonedDataSource"
                :key="source.id"
                :value="source.id"
                @change="onChange($event.target, source)"
              >
                {{ source.statusName }}
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </template>

        <div
          id="toProcess"
          class="card"
          role="alert"
          v-if="
            type !== 'statuses' &&
              selectedFilters[type] &&
              selectedFilters[type].length
          "
        >
          <h5 class="pad-all-2 text-left">Selected</h5>
          <table class="w-100 table table-striped">
            <tbody>
              <template v-for="source in clonedDataSource">
                <tr
                  :key="source.id"
                  v-if="selectedRecords.indexOf(source.id) > -1"
                >
                  <td :colspan="type === 'listing-supplement' ? 3 : 1">
                    <input
                      class="selectAll"
                      type="checkbox"
                      v-model="selectedRecords"
                      :value="source.id"
                      @change="onChange($event, source)"
                    />
                  </td>
                  <template v-if="!isEntityList">
                    <td v-if="type === 'items' || type === 'primaryfiles'">
                      {{ source.itemName }}
                    </td>
                    <td v-if="type === 'primaryfiles'">
                      {{ source.primaryfileName }}
                    </td>
                    <td
                      v-if="
                        type === 'collections' ||
                          type === 'units' ||
                          type === 'items'
                      "
                    >
                      {{ source.unitName }}
                    </td>
                    <td v-if="type === 'collections' || type === 'items'">
                      {{ source.collectionName }}
                    </td>
                    <td v-if="type === 'workflows'">
                      {{ source.workflowName }}
                    </td>
                    <td v-if="type === 'outputs'">{{ source.outputName }}</td>
                    <!-- <td v-if="type === 'workflows' || type === 'collections'">
                      {{ source.dateCreated | LOCAL_DATE_VALUE }}
                    </td> -->
                    <td v-if="type === 'primaryfiles'">
                      {{ source.externalSource }}
                    </td>
                    <td v-if="type === 'primaryfiles'">
                      {{ source.externalId }}
                    </td>
                    <td v-if="type === 'submitters'">
                      {{ source.submitterName }}
                    </td>
                    <td v-if="type === 'steps'">
                      {{ source.stepName }}
                    </td>
                  </template>
                  <template v-if="isEntityList">
                    <td colspan="4">{{ source.name }}</td>
                    <td colspan="3" v-if="type === 'listing-supplement'">
                      {{ source.category }}
                    </td>
                    <td colspan="3" v-if="type === 'listing-supplement'">
                      {{ source.unitName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.collectionName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.itemName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.primaryfileName }}
                    </td>
                    <td colspan="4" v-if="type !== 'listing-supplement'">
                      {{ source.description }}
                    </td>
                    <td colspan="3" v-if="type === 'listing-item'">
                      {{ source.externalId }}
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div
          v-if="type !== 'statuses' && clonedDataSource.length && !loading"
          class="scrollDiv w-100"
          :class="
            type === 'item-search' || type === 'primaryfiles'
              ? 'items-area'
              : ''
          "
        >
          <table class="w-100 table table-striped">
            <thead>
              <th
                v-if="type !== 'item-search'"
                :class="type === 'listing-supplement' ? 'supSelectAll' : ''"
              >
                <label>
                  <input
                    class="selectAll"
                    type="checkbox"
                    v-model="selectAll"
                    :value="selectAll"
                    id="selectAll"
                    @change="onSelectAllChange($event)"
                  />
                  <span class="selectAll pl-1">Select All</span>
                </label>
              </th>
              <template v-if="!isEntityList">
                <th
                  v-if="
                    type === 'items' ||
                      type === 'primaryfiles' ||
                      type === 'item-search'
                  "
                >
                  Item
                </th>
                <th v-if="type === 'primaryfiles'">
                  Content File
                </th>
                <th
                  v-if="
                    type === 'collections' ||
                      type === 'units' ||
                      type === 'items' ||
                      type === 'item-search'
                  "
                >
                  Unit
                </th>
                <th
                  v-if="
                    type === 'collections' ||
                      type === 'items' ||
                      type === 'item-search'
                  "
                >
                  Collection
                </th>
                <th v-if="type === 'workflows'">Workflow</th>
                <th v-if="type === 'outputs'">Output</th>
                <!-- <th v-if="type === 'workflows' || type === 'collections'">
                  Date Created
                </th> -->
                <th v-if="type === 'primaryfiles'">External Source</th>
                <th v-if="type === 'primaryfiles' || type === 'item-search'">
                  External ID
                </th>
                <th v-if="type === 'submitters'">
                  Submitter
                </th>
                <th v-if="type === 'steps'">
                  Step
                </th>
              </template>
              <template v-if="isEntityList">
                <th colspan="4" v-if="type === 'listing-supplement'">
                  Title
                </th>
                <th colspan="3" v-if="type === 'listing-supplement'">
                  Category
                </th>
                <th colspan="3" v-if="type === 'listing-supplement'">
                  Unit
                </th>
                <th
                  colspan="4"
                  v-if="
                    type === 'listing-collection' ||
                      type === 'listing-supplement'
                  "
                >
                  Collection
                </th>
                <th
                  colspan="4"
                  v-if="
                    type === 'listing-item' || type === 'listing-supplement'
                  "
                >
                  Item
                </th>
                <th colspan="4" v-if="type === 'listing-supplement'">
                  Content File
                </th>
                <th colspan="4" v-if="type !== 'listing-supplement'">
                  Description
                </th>
                <th colspan="3" v-if="type === 'listing-item'">External Id</th>
              </template>
            </thead>
            <tbody>
              <template v-for="source in clonedDataSource">
                <tr
                  :key="source.id"
                  v-if="selectedRecords.indexOf(source.id) === -1"
                  @click="onChange($event, source)"
                  class=""
                  :class="
                    type === 'item-search'
                      ? source.id === selectedItemId
                        ? 'item-cls trActive'
                        : 'item-cls'
                      : ''
                  "
                >
                  <td v-if="type !== 'item-search'" colspan="1">
                    <input
                      class="selectAll"
                      type="checkbox"
                      v-model="selectedRecords"
                      :value="source.id"
                      @change="onChange($event, source)"
                    />
                  </td>
                  <template v-if="!isEntityList">
                    <td
                      v-if="
                        type === 'items' ||
                          type === 'primaryfiles' ||
                          type === 'item-search'
                      "
                    >
                      {{
                        type === "item-search" ? source.name : source.itemName
                      }}
                    </td>
                    <td v-if="type === 'primaryfiles'">
                      {{ source.primaryfileName }}
                    </td>
                    <td
                      v-if="
                        type === 'collections' ||
                          type === 'units' ||
                          type === 'items' ||
                          type === 'item-search'
                      "
                    >
                      {{ source.unitName }}
                    </td>
                    <td
                      v-if="
                        type === 'collections' ||
                          type === 'items' ||
                          type === 'item-search'
                      "
                    >
                      {{ source.collectionName }}
                    </td>
                    <td v-if="type === 'workflows'">
                      {{ source.workflowName }}
                    </td>
                    <td v-if="type === 'outputs'">{{ source.outputName }}</td>
                    <!-- <td v-if="type === 'workflows' || type === 'collections'">
                      {{ source.dateCreated | LOCAL_DATE_VALUE }}
                    </td> -->
                    <td v-if="type === 'primaryfiles'">
                      {{ source.externalSource }}
                    </td>
                    <td
                      v-if="type === 'primaryfiles' || type === 'item-search'"
                    >
                      {{ source.externalId }}
                    </td>
                    <td v-if="type === 'submitters'">
                      {{ source.submitterName }}
                    </td>
                    <td v-if="type === 'steps'">
                      {{ source.stepName }}
                    </td>
                  </template>
                  <template v-if="isEntityList">
                    <td colspan="4">{{ source.name }}</td>
                    <td colspan="3" v-if="type === 'listing-supplement'">
                      {{ source.category }}
                    </td>
                    <td colspan="3" v-if="type === 'listing-supplement'">
                      {{ source.unitName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.collectionName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.itemName }}
                    </td>
                    <td colspan="4" v-if="type === 'listing-supplement'">
                      {{ source.primaryfileName }}
                    </td>
                    <td colspan="4" v-if="type !== 'listing-supplement'">
                      {{ source.description }}
                    </td>
                    <td colspan="3" v-if="type === 'listing-item'">
                      {{ source.externalId }}
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <template v-if="type === 'workflow-search'">
          <div
            id="cloneable"
            class="form-row row cloneable"
            v-for="(row, searchIndex) in searchFields['rows']"
            :key="searchIndex"
          >
            <div class="form-group col-md-3" v-if="!searchIndex">
              <select
                id="selectOptions-"
                class="inputFilter form-control"
                v-model="searchFields['choosenField']"
                @change="onSearchFieldChange"
              >
                <option value="" disabled selected>- Choose Field -</option>
                <option
                  v-for="option in fields"
                  :key="option.name"
                  :value="option.name"
                  >{{ option.label }}</option
                >
              </select>
            </div>
            <div class="form-group col-md-3" v-else>
              <select
                id="selectOptions-"
                class="inputFilter form-control"
                :value="row"
                disabled
              >
                <option value="" disabled selected>- Choose Field -</option>
                <option
                  v-for="option in allSearchFields"
                  :key="option.name"
                  :value="option.name"
                  >{{ option.label }}</option
                >
              </select>
            </div>
            <div
              class="form-group col-md-4 dateRange"
              v-if="row === 'dateRange'"
            >
              <input
                class="form-control"
                type="date"
                id="startDate-"
                data-toggle="popover"
                data-trigger="hover"
                data-content="Start Date"
                data-placement="top"
                v-model="searchFields.dateRange.fromDate"
                format="MM/dd/yyyy"
                v-on:input="setDisabledDate()"
              />
            </div>
            <div
              class="form-group col-md-4 dateRange"
              v-if="row === 'dateRange'"
            >
              <div></div>
              <input
                class="form-control"
                type="date"
                id="endDate-"
                data-toggle="popover"
                data-trigger="hover"
                data-content="End Date"
                data-placement="top"
                v-model="searchFields.dateRange.toDate"
                format="MM/dd/yyyy"
                :min="
                  `${searchFields.dateRange.state.disabledDates.to.getFullYear()}-${(
                    '0' +
                    (searchFields.dateRange.state.disabledDates.to.getMonth() +
                      1)
                  ).slice(-2)}-${(
                    '0' +
                    (searchFields.dateRange.state.disabledDates.to.getDate() +
                      1)
                  ).slice(-2)}`
                "
              />
            </div>
            <div id="" class="form-group col-md-8 searchWorkflows" v-else>
              <input
                type="text"
                class="form-control"
                id="searchWorkflowsInput-"
                placeholder="Search Workflows"
                v-model="searchFields[row]"
                autocomplete="off"
                v-on:keyup.enter="searchWfKeyUp"
              />
            </div>
            <div
              class=" col-md-1 addRowBtn"
              v-if="searchIndex === 0 && searchFields['rows'].length !== 6"
              @click="handleAddRowBtn(searchFields.choosenField)"
            >
              <button
                id="addRow"
                class="btn btn-link marg-t-0 pad-all-0 addRow"
                data-toggle="popover"
                data-trigger="hover"
                data-content="Add a new row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  fill="currentColor"
                  class="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
                  />
                </svg>
              </button>
            </div>
            <div
              class=" col-md-1 btnRemove"
              v-if="searchFields['rows'].length > 1 && searchIndex !== 0"
              @click="handleRemoveRowBtn(searchIndex, row)"
            >
              <button
                class="btn btn-outline marg-t-0 pad-all-0 removeRow"
                data-toggle="popover"
                data-trigger="hover"
                data-content="Remove this row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  fill="#F4871E"
                  class="bi bi-dash-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    class="black"
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </template>

      <template #modal-footer="{ ok, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <button
          v-if="type !== 'statuses' && type !== 'workflow-search'"
          class="btn btn-outline"
          @click="
            hide();
            onCancel();
          "
        >
          Cancel
        </button>
        <button
          id="workflow-search-btn"
          v-if="type === 'workflow-search'"
          size="sm"
          class="btn btn-primary wf-search-btn"
          @click="
            ok();
            onDone();
          "
        >
          <svg
            data-v-4ae6b2fb=""
            data-v-6b33b2c4=""
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            class="svg-search wf-search"
          >
            <title data-v-4ae6b2fb="" data-v-6b33b2c4="">search</title>
            <path
              data-v-4ae6b2fb=""
              data-v-6b33b2c4=""
              d="M47.3 43.4c0 0.9-0.3 1.7-1 2.4 -0.7 0.7-1.5 1-2.4 1 -0.9 0-1.7-0.3-2.4-1l-9-9c-3.1 2.2-6.6 3.3-10.5 3.3 -2.5 0-4.9-0.5-7.2-1.5 -2.3-1-4.2-2.3-5.9-3.9s-3-3.6-3.9-5.9c-1-2.3-1.5-4.7-1.5-7.2 0-2.5 0.5-4.9 1.5-7.2 1-2.3 2.3-4.2 3.9-5.9s3.6-3 5.9-3.9c2.3-1 4.7-1.5 7.2-1.5 2.5 0 4.9 0.5 7.2 1.5 2.3 1 4.2 2.3 5.9 3.9s3 3.6 3.9 5.9c1 2.3 1.5 4.7 1.5 7.2 0 3.8-1.1 7.3-3.3 10.5l9 9C47 41.7 47.3 42.5 47.3 43.4zM30.4 29.9c2.3-2.3 3.4-5.1 3.4-8.3 0-3.2-1.1-6-3.4-8.3 -2.3-2.3-5.1-3.4-8.3-3.4 -3.2 0-6 1.1-8.3 3.4 -2.3 2.3-3.4 5.1-3.4 8.3 0 3.2 1.1 6 3.4 8.3 2.3 2.3 5.1 3.4 8.3 3.4C25.4 33.4 28.1 32.2 30.4 29.9z"
            ></path>
          </svg>
          Search
        </button>
        <button
          v-else-if="clonedDataSource.length && !loading"
          size="sm"
          class="btn btn-primary"
          :disabled="
            type === 'listing-collection' ||
            type === 'listing-item' ||
            type === 'listing-supplement'
              ? false
              : type === 'item-search'
              ? !selectedItemId
              : selectedRecords.length <= 0
              ? true
              : false
          "
          @click="
            ok();
            onDone();
          "
        >
          {{
            type === "item-search"
              ? "Select Item"
              : type !== "statuses"
              ? "Done"
              : "Search"
          }}
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import SharedService from "@/service/shared-service";
import Typeahead from "../shared/TypeAhead.vue";
import ItemService from "@/service/item-service";
import CollectionDetailsService from "@/service/collection-detail-service";
import AccessControlService from "@/service/access-control-service";

export default {
  props: {
    searchType: {
      default: "",
    },
    dataSource: {
      default: [],
    },
    isEntityList: {
      default: false,
    },
    errors: {
      search_error: "",
      no_data_error: "",
    },
    loading: {
      default: false,
    },
  },
  components: {
    Typeahead,
  },
  computed: {
    modifiedDataSource() {
      return [];
    },
    type: {
      get() {
        return this.searchType;
      },
      set(value) {
        return value;
      },
    },
    selectedFilters: sync("selectedFilters"),
    workflowDashboard: sync("workflowDashboard"),
    selectedItem: sync("selectedItem"),
    selectedUnit: sync("selectedUnit"),
    selectedCollection: sync("selectedCollection"),
    accessControl: sync("accessControl"),
  },

  data() {
    return {
      sharedService: new SharedService(),
      itemService: new ItemService(),
      collectionDetailsService: new CollectionDetailsService(),
      accessControlService: new AccessControlService(),
      userSearchValue: "",
      typeaheadSearchItems: [],
      searchProps: [],
      clonedDataSource: [],
      selectedRecords: [],
      selectAll: false,
      searchDataSourceMap: new Map(),
      selectedItemId: null,
      searchWord: "",
      allSearchFields: [
        { name: "annotations", label: "Annotations" },
        { name: "dateRange", label: "Updated Date Range" },
        { name: "name", label: "Name" },
        { name: "creator", label: "Owner" },
        { name: "tags", label: "Tags" },
      ],
      fields: [],
      searchFields: {
        rows: [""],
        choosenField: "",
        annotations: "",
        dateRange: {
          fromDate: "",
          toDate: "",
          state: {
            disabledDates: {
              to: new Date(),
            },
          },
        },
        name: "",
        creator: "",
        tags: "",
      },
      // type: JSON.parse(this.searchType)
    };
  },
  watch: {
    dataSource: function() {
      this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
    },
  },
  created() {
    this.getTypeaheadSearchItems();
    this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
  },
  mounted() {
    const self = this;
    self.fields = self.allSearchFields;
  },
  methods: {
    async searchWfKeyUp(e) {
      if (e.keyCode === 13) {
        document.getElementById("workflow-search-btn").click();
      }
    },
    setDisabledDate() {
      let self = this;
      self.searchFields.dateRange.state.disabledDates.to = new Date(
        self.searchFields.dateRange.fromDate
      );
    },
    handleAddRowBtn(field) {
      const self = this;
      if (
        self.searchFields["rows"].length < 6 &&
        self.searchFields["choosenField"]
      ) {
        const selctedField = self.fields.filter((f) => f.name === field);
        self.searchFields["rows"].push(selctedField[0].name);
        self.searchFields["choosenField"] = "";
        self.searchFields.rows[0] = "";
        self.fields = self.fields.filter((f) => f.name !== field);
        self.searchFields[""] = "";
      }
    },
    handleRemoveRowBtn(index, field) {
      const self = this;
      self.searchFields["rows"].splice(index, 1);
      const removedField = self.allSearchFields.filter((f) => f.name === field);
      self.fields.push(removedField[0]);
      self.fields = self.sharedService.sortByAlphabatical(self.fields, "label");

      if (field !== "dateRange") self.searchFields[field] = "";
      else {
        self.searchFields.dateRange.fromDate = new Date(
          "1970-01-01 00:00:00 UTC+00"
        );
        self.searchFields.dateRange.toDate = new Date();
        self.searchFields.dateRange.state = {
          disabledDates: {
            to: new Date(),
          },
        };
      }

      this.$emit("handleSearchWorkflows", this.searchFields);
    },
    onSearchFieldChange() {
      const self = this;
      self.searchFields.rows[0] = self.searchFields.choosenField;
    },
    async searchItems() {
      this.$emit("handleSearchItems", this.searchWord);
    },
    async searchKeyUp(e) {
      if (e.keyCode === 13) {
        this.searchItems();
      }
    },
    onSelectAllChange(ev) {
      const self = this;
      if (ev.srcElement.checked) {
        self.selectedRecords = this.clonedDataSource.map((el) => el.id);
        self.selectedFilters[self.type] = JSON.parse(
          JSON.stringify(this.clonedDataSource)
        );
      } else {
        self.selectedRecords = [];
        self.selectedFilters[self.type] = [];
        this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
      }
      console.log(self.selectedRecords);
      return;
    },
    onChange(ev, record) {
      const self = this;
      if (self.type === "item-search") {
        self.selectedItemId = record.id;
        self.selectedUnit = {};
        self.selectedUnit.name = record.unitName;
        self.selectedCollection = record.collectionName;
      }
      console.log(self.selectAll);
      const isStatusChecked = self.selectedRecords.indexOf(record.id);
      const checkedStatus = self.type === "statuses" && isStatusChecked !== -1;
      const isChecked = ev && ev.srcElement && ev.srcElement.checked;
      if (checkedStatus || isChecked) {
        self.selectedFilters[self.type] = self.selectedFilters[self.type] || [];
        if (!self.selectedFilters[self.type].find((el) => el.id === record.id))
          self.selectedFilters[self.type].push(
            this.clonedDataSource.find((el) => el.id === record.id)
          );
      } else if (!checkedStatus) {
        let index;
        self.selectedFilters[self.type].map((el, i) => {
          if (el.id === record.id) index = i;
        });
        self.selectedFilters[self.type].splice(index, 1);
      } else {
        // self.selectedRecords.splice(this.selectedRecords.indexOf(record.id), 1);
        self.selectedFilters[self.type].splice(
          self.selectedFilters[self.type].indexOf((el) => el.id === record.id),
          1
        );
        if (self.selectedRecords.length !== self.clonedDataSource.length)
          self.selectAll = false;
      }
    },
    onFilterUserInput() {
      const self = this;
      self.getTypeaheadSearchItems();
      if (!self.userSearchValue) return;

      const temp = [];
      const tempDataSource = this.dataSource;
      tempDataSource.filter((o) =>
        // Object.keys(o).some(k => o[k] && o[k].toLowerCase().includes(self.userSearchValue.toLowerCase())));
        self.searchProps.filter((el) => {
          if (
            o[el] &&
            o[el].toLowerCase().indexOf(self.userSearchValue.toLowerCase()) > -1
          ) {
            if (!temp.find((e) => e.id === o.id)) temp.push(o);
          }
        })
      );

      self.clonedDataSource = temp;
    },
    populteValues() {
      if (!this.userSearchValue) {
        this.clonedDataSource = JSON.parse(JSON.stringify(this.dataSource));
        this.selectAll = this.selectedRecords.length === this.dataSource.length;
      }
    },
    getTypeaheadSearchItems() {
      const self = this;
      self.searchProps = [];
      switch (self.type) {
        case "items":
          self.searchProps = ["itemName"];
          break;
        case "primaryfiles":
          self.searchProps = ["primaryfileName"];
          break;
        case "collections":
          self.searchProps = ["collectionName"];
          break;
        case "units":
          self.searchProps = ["unitName"];
          break;
        case "workflows":
          self.searchProps = ["workflowName"];
          break;
        case "outputs":
          self.searchProps = ["outputName"];
          break;
        case "submitters":
          self.searchProps = ["submitterName"];
          break;
        case "steps":
          self.searchProps = ["stepName"];
          break;
        case "statuses":
          self.searchProps = ["statusName"];
          break;
        case "listing-collection":
        case "listing-item":
        case "listing-supplement":
          self.searchProps = ["name"];
          break;
      }
    },
    addItem(item) {
      const sefl = this;
      sefl.selectedFilters[self.type] = sefl.selectedFilters[self.type] || [];
      if (sefl.selectedFilters[self.type].indexOf(item) === -1)
        sefl.selectedFilters[self.type].push(item);
    },
    onCancel() {
      if (this.type === "item-search") {
        this.dataSource = [];
        this.clonedDataSource = [];
        this.searchWord = "";
        this.selectedItemId = null;
        this.errors.search_error = "";
        this.errors.no_data_error = "";
      }
    },
    onDone() {
      switch (this.type) {
        case "items":
          this.workflowDashboard.searchQuery.filterByItems = this.selectedFilters[
            this.type
          ].map((el) => el.itemId);
          break;
        case "primaryfiles":
          this.workflowDashboard.searchQuery.filterByFiles = this.selectedFilters[
            this.type
          ].map((el) => el.primaryfileId);
          break;
        case "collections":
          this.workflowDashboard.searchQuery.filterByCollections = this.selectedFilters[
            this.type
          ].map((el) => el.collectionId);
          break;
        case "workflows":
          this.workflowDashboard.searchQuery.filterByWorkflows = this.selectedFilters[
            this.type
          ].map((el) => el.workflowName);
          break;
        case "outputs":
          this.workflowDashboard.searchQuery.filterByOutputs = this.selectedFilters[
            this.type
          ].map((el) => el.outputName);
          break;
        case "units":
          this.workflowDashboard.searchQuery.filterByUnits = this.selectedFilters[
            this.type
          ].map((el) => el.unitId);
          break;
        case "submitters":
          this.workflowDashboard.searchQuery.filterBySubmitters = this.selectedFilters[
            this.type
          ].map((el) => el.submitterName);
          break;
        case "steps":
          this.workflowDashboard.searchQuery.filterBySteps = this.selectedFilters[
            this.type
          ].map((el) => el.stepName);
          break;
        case "statuses":
          this.workflowDashboard.searchQuery.filterByStatuses = this.selectedFilters[
            this.type
          ].map((el) => el.statusName);
          break;
        case "listing-collection":
        case "listing-item":
        case "listing-supplement":
          this.$emit(
            "myEvent",
            this.selectedFilters[this.type] &&
              this.selectedFilters[this.type].length
              ? JSON.parse(JSON.stringify(this.selectedFilters[this.type]))
              : []
          );
          break;
        case "item-search":
          this.itemService
            .getItemDetails(this.selectedItemId)
            .then((res) => {
              const selectedCollectionId = res._embedded.collection.id;
              this.itemService
                .getItemById(selectedCollectionId, this.selectedItemId)
                .then((response) => {
                  const self = this;
                  self.collectionDetailsService
                    .getCollection(selectedCollectionId)
                    .then((response) => {
                      self.selectedCollection = response.data;

                      //Updating unit id in our session storage for content page
                      const unitId = response.data._embedded.unit.id;
                      let uEntity = JSON.parse(
                        sessionStorage.getItem("unitEntity")
                      );
                      uEntity.currentUnit = unitId;
                      sessionStorage.setItem(
                        "unitEntity",
                        JSON.stringify({ ...uEntity })
                      );

                      //BATCH INGEST: checking permission
                      if (uEntity && uEntity.currentUnit)
                        self.accessControlService.checkAccessControl(self);

                      // //BATCH INGEST: Enable batch ingest nav
                      // let batchIngestHtml = document.getElementById(
                      //   "/batch/ingest"
                      // );
                      // if (batchIngestHtml) {
                      //   batchIngestHtml = batchIngestHtml.childNodes[0];
                      //   batchIngestHtml.ariaDisabled = null;
                      //   batchIngestHtml.classList.remove("disabled");
                      // }
                    });

                  const res = JSON.parse(JSON.stringify(response));
                  self.selectedItem = res;
                  self.selectedItem.parentType = self.type;
                  self.selectedItem.unitName = self.selectedUnit.name;
                  self.selectedItem.collectionName = self.selectedCollection;
                  self.$router.push("/collections/items/item-search/details");
                });
            })
            .catch((error) => {
              this.dataSource = [];
              this.clonedDataSource = [];
              this.searchWord = "";
              this.selectedItemId = null;
              this.errors.search_error = "";
              this.errors.no_data_error = "";
              this.$bvToast.toast("Failed to show the item", {
                title: "Notification",
                appendToast: true,
                variant: "danger",
                autoHideDelay: 5000,
              });
            });
          break;
        case "workflow-search":
          this.$emit("handleSearchWorkflows", this.searchFields);
          if (
            this.searchFields["rows"].length < 6 &&
            this.searchFields["choosenField"]
          ) {
            this.searchFields["rows"].push(this.searchFields["choosenField"]);
            this.searchFields.rows[0] = "";
            this.fields = this.fields.filter(
              (f) => f.name !== this.searchFields["choosenField"]
            );
            this.searchFields["choosenField"] = "";
          }
          break;
      }
      this.userSearchValue = "";
      this.type = "";
      this.selectAll = this.selectedRecords.length === this.dataSource.length;
      this.populteValues();
    },
    processModalData() {
      const self = this;
      this.populteValues();
      this.getTypeaheadSearchItems();
      // this.clonedDataSource = self.sharedService.sortByAlphabatical(
      //   JSON.parse(JSON.stringify(this.dataSource)),
      //   self.searchProps[0],
      //   false
      // );
      // To get the distinct values
      // if(this.searchDataSourceMap.get(this.type)) {
      //     this.clonedDataSource = this.searchDataSourceMap.get(this.type);
      // } else {
      //     // this.clonedDataSource = [...new Map(this.clonedDataSource.map(item =>[item[this.searchProps[0]], item])).values()];
      //     this.searchDataSourceMap.set(this.type, this.clonedDataSource);
      // }
      this.selectedRecords =
        this.selectedFilters[this.type] &&
        this.selectedFilters[this.type].length
          ? this.selectedFilters[this.type].map((el) => el.id)
          : [];
      this.selectAll =
        this.selectedRecords.length === this.clonedDataSource.length;
    },
  },
};
</script>

<style scoped>
table tbody tr:nth-of-type(odd) {
  background-color: #f8ecb4;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  font-size: 0.8em;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  table-layout: fixed;
}
.modal-body .scrollDiv,
.scrollDiv {
  height: 250px;
  overflow-y: scroll;
}
.bootstrap-typeahead {
  height: calc(2.25rem + 1px);
  padding: 0rem 0rem;
}
.status-btn {
  margin: 0.3rem !important;
  border-radius: 0.3rem !important;
}
#checkbox-group-2 {
  flex-wrap: wrap;
}
.items-area {
  overflow-x: clip;
}
.item-cls {
  cursor: pointer;
}
.trActive {
  background-color: #153c4d !important;
  color: #fff;
}
.trActive {
  animation-name: expandOpen;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  visibility: visible !important;
  max-width: 100%;
}
.supSelectAll {
  width: 100px;
}
@keyframes expandOpen {
  from {
    transform: scale3d(1, 1, 1);
    opacity: 0;
  }
  50% {
    transform: scale3d(1.03, 1.03, 1.03);
    opacity: 0.25;
  }
  to {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
}
.form-errors {
  color: red;
  margin: 0% !important;
  font-size: 0.9rem;
  padding-left: 3px;
  width: inherit;
}
.no-data-error {
  width: 100%;
  text-align: center;
  color: initial;
}
.search-btn:hover > .svg-search {
  fill: #f4871e;
}
.wf-search-btn:hover > .wf-search {
  fill: #fff;
}
.addRowBtn,
.btnRemove {
  margin-top: -0.3rem;
}
.removeRow {
  border: none !important;
}
</style>
