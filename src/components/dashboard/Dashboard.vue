<template>
  <div class="collections w-100">
    <!-- <loader :show="!isFilterApiLoaded"/> -->
    <div
      class="container-fluid"
      :class="{
        'p-0': parent === 'NewTest' || parent === 'TestResults',
      }"
    >
      <div class="row">
        <div
          class="col-12"
          :class="{
            'bg-light-gray-1': parent !== 'NewTest' && parent !== 'TestResults',
          }"
        >
          <main class="m-0">
            <div class="pad-all-3">
              <div
                class="card"
                :class="{
                  'mb-0': parent === 'NewTest' || parent === 'TestResults',
                }"
              >
                <div class="card-body">
                  <h1
                    v-if="parent !== 'NewTest' && parent !== 'TestResults'"
                    class="card-title"
                  >
                    AMP Dashboard
                  </h1>
                  <div class="container-fluid" v-if="filterCount > 0">
                    <div class="row selected-filters-row">
                      <div class="col-sm-2 label-bold">
                        CURRENTLY FILTERED BY
                      </div>

                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-if="
                          workflowDashboard.searchQuery.filterByDates.length > 0
                        "
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeDateFilter()"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >{{
                                parent === "TestResults"
                                  ? "Output date"
                                  : "Date"
                              }}
                              range</label
                            >
                            <label class="row no-padding-col"
                              >{{
                                workflowDashboard.searchQuery.filterByDates[0].getMonth() +
                                  1
                              }}/{{
                                workflowDashboard.searchQuery.filterByDates[0].getDate()
                              }}/{{
                                workflowDashboard.searchQuery.filterByDates[0].getFullYear()
                              }}
                              -
                              {{
                                workflowDashboard.searchQuery.filterByDates[1].getMonth() +
                                  1
                              }}/{{
                                workflowDashboard.searchQuery.filterByDates[1].getDate()
                              }}/{{
                                workflowDashboard.searchQuery.filterByDates[1].getFullYear()
                              }}</label
                            >
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-if="
                          workflowDashboard.searchQuery.filterByTestDates
                            .length > 0
                        "
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeTestDateFilter()"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col">
                              Test date range</label
                            >
                            <label class="row no-padding-col"
                              >{{
                                workflowDashboard.searchQuery.filterByTestDates[0].getMonth() +
                                  1
                              }}/{{
                                workflowDashboard.searchQuery.filterByTestDates[0].getDate()
                              }}/{{
                                workflowDashboard.searchQuery.filterByTestDates[0].getFullYear()
                              }}
                              -
                              {{
                                workflowDashboard.searchQuery.filterByTestDates[1].getMonth() +
                                  1
                              }}/{{
                                workflowDashboard.searchQuery.filterByTestDates[1].getDate()
                              }}/{{
                                workflowDashboard.searchQuery.filterByTestDates[1].getFullYear()
                              }}</label
                            >
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(submitter, index) in workflowDashboard
                          .searchQuery.filterBySubmitters"
                        v-bind:submitter="submitter"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeSubmitterFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Submitter</label
                            >
                            <label class="row no-padding-col">{{
                              submitter
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(unit, index) in selectedFilters.units"
                        v-bind:workflow="unit.unitName"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeUnitFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Unit</label
                            >
                            <label class="row no-padding-col">{{
                              unit.unitName
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(collection,
                        index) in selectedFilters.collections"
                        v-bind:workflow="collection.collectionName"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeCollectionFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Collection</label
                            >
                            <label class="row no-padding-col">{{
                              collection.collectionName
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(externalId, index) in workflowDashboard
                          .searchQuery.filterByExternalIds"
                        v-bind:externalId="externalId"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeExternalIdFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >External ID</label
                            >
                            <label class="row no-padding-col">{{
                              externalId
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(item, index) in selectedFilters.items"
                        v-bind:item="item.itemName"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeItemFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Item</label
                            >
                            <label class="row no-padding-col">{{
                              item.itemName
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(file, index) in selectedFilters.primaryfiles"
                        v-bind:file="file.primaryfileName"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeFileFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Content File</label
                            >
                            <label class="row no-padding-col">{{
                              file.primaryfileName
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(workflow, index) in workflowDashboard
                          .searchQuery.filterByWorkflows"
                        v-bind:workflow="workflow"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeWorkflowFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Workflow</label
                            >
                            <label class="row no-padding-col">{{
                              workflow
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(step, index) in workflowDashboard.searchQuery
                          .filterBySteps"
                        v-bind:step="step"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeStepFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Step</label
                            >
                            <label class="row no-padding-col">{{ step }}</label>
                          </div>
                        </div>
                      </button>
                      <span v-if="parent !== 'NewTest'">
                        <button
                          class="btn btn-outline col-sm-2 selected-filter-button"
                          v-for="(output, index) in workflowDashboard
                            .searchQuery.filterByOutputs"
                          v-bind:output="output"
                          v-bind:index="index"
                          v-bind:key="index"
                        >
                          <div class="row">
                            <svg
                              class="col-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              @click="removeOutputFilter(index)"
                            >
                              <path
                                fill="#808080"
                                d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                              ></path>
                            </svg>
                            <div class="col-sm-1">
                              <label class="row label-bold no-padding-col"
                                >Output</label
                              >
                              <label class="row no-padding-col">{{
                                output
                              }}</label>
                            </div>
                          </div>
                        </button>
                      </span>
                      <span
                        v-if="parent !== 'NewTest' && parent !== 'TestResults'"
                      >
                        <button
                          class="btn btn-outline col-sm-2 selected-filter-button"
                          v-for="(status, index) in workflowDashboard
                            .searchQuery.filterByStatuses"
                          v-bind:status="status"
                          v-bind:index="index"
                          v-bind:key="index"
                        >
                          <div class="row">
                            <svg
                              class="col-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              @click="removeStatusFilter(index)"
                            >
                              <path
                                fill="#808080"
                                d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                              ></path>
                            </svg>
                            <div class="col-sm-1">
                              <label class="row label-bold no-padding-col"
                                >Status</label
                              >
                              <label class="row no-padding-col">{{
                                status
                              }}</label>
                            </div>
                          </div>
                        </button>
                      </span>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-for="(searchTerm, index) in workflowDashboard
                          .searchQuery.filterBySearchTerms"
                        v-bind:searchTerm="searchTerm"
                        v-bind:index="index"
                        v-bind:key="index"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="removeSearchFilter(index)"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="row label-bold no-padding-col"
                              >Search Term</label
                            >
                            <label class="row no-padding-col">{{
                              searchTerm
                            }}</label>
                          </div>
                        </div>
                      </button>
                      <button
                        class="btn btn-outline col-sm-2 selected-filter-button"
                        v-if="filterCount > 1"
                      >
                        <div class="row">
                          <svg
                            class="col-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            @click="clearAll()"
                          >
                            <path
                              fill="#808080"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                            ></path>
                          </svg>
                          <div class="col-sm-1">
                            <label class="bold" style="min-height: 16px"
                              >Clear all</label
                            >
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div class="container-fluid">
                    <div class="row filter-btns">
                      <div class="col d-flex">
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('unit')"
                          >Unit</b-button
                        >
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('collection')"
                          >Collection</b-button
                        >
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('workflow')"
                          >Workflow</b-button
                        >
                        <b-button
                          v-if="parent !== 'NewTest'"
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('output')"
                          >Output</b-button
                        >
                        <DateFilter
                          :parent="parent"
                          v-if="parent === 'TestResults'"
                          label="Test Date"
                          @displayChanged="
                            changeDisplayedFilter(
                              workflowDashboard.filtersEnabled.dateFilter
                            )
                          "
                        />
                        <DateFilter
                          :parent="parent"
                          @displayChanged="
                            changeDisplayedFilter(
                              workflowDashboard.filtersEnabled.dateFilter
                            )
                          "
                        />
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('submitter')"
                          >Submitter</b-button
                        >
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('item')"
                          >Item</b-button
                        >
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('primaryfile')"
                          >Content File</b-button
                        >
                        <b-button
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('step')"
                          >Step</b-button
                        >
                        <b-button
                          v-if="parent !== 'NewTest' && parent !== 'TestResults'"
                          class="btn btn-info dropdown"
                          v-b-modal.modal-lg
                          @click="onOpenModal('status')"
                          >Status</b-button
                        >

                        <div
                          v-if="parent !== 'NewTest'"
                          id="btn-show-hide"
                          class="dropdown"
                        >
                          <b-dropdown id="dropdown-form">
                            <template #button-content>
                              <span>Show/Hide Columns</span>
                              <span
                                ><svg
                                  aria-hidden="true"
                                  focusable="false"
                                  class="svg-inline"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 48 48"
                                >
                                  <g id="Layer_2" class="icon-white">
                                    <path d="M14 20l10 10 10-10z"></path>
                                  </g></svg
                              ></span>
                            </template>
                            <b-dropdown-form>
                              <b-form-checkbox
                                v-for="column in dashboardColumns.filter(
                                  (item) => {
                                    if (parent === 'TestResults')
                                      return (
                                        // item.field !== 'dateCreated' &&
                                        item.field !== 'status' &&
                                        item.field !== 'actions' &&
                                        item.field !== 'addToTest'
                                      );
                                    else
                                      return (
                                        item.field !== 'testDate' &&
                                        // item.field !== 'dateCreated' &&
                                        item.field !== 'groundTruth' &&
                                        item.field !== 'scores' &&
                                        item.field !== 'addToTest'
                                      );
                                  }
                                )"
                                :key="column.field"
                                :value="column"
                                :checked="column"
                                v-model="columns"
                                @change="onChange($event.target, column)"
                                class="mb-3"
                                >{{ column.label }}</b-form-checkbox
                              >
                            </b-dropdown-form>
                          </b-dropdown>
                        </div>                    
                      </div>
                      <div
                        v-if="parent !== 'NewTest' && parent !== 'TestResults'"
                        class="relevant-togggle"
                      >
                        <span class="txt-v pr-2"
                          >Show Relevant Results Only</span
                        >
                        <label class="switch" title="Relevant Result"
                          ><span class="sr-only">Relevant Result</span>
                          <input
                            type="checkbox"
                            v-model="
                              workflowDashboard.searchQuery.filterByRelevant
                            "
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div
                      class="row spacer"
                      :class="
                        parent === 'NewTest' || parent === 'TestResults'
                          ? 'filter-gap'
                          : ''
                      "
                    ></div>
                  </div>
                  <DashboardTable
                    v-if="columns.length"
                    :columns="columns"
                    :parent="parent"
                    :workflowResultType="workflowResultType"
                    :workflowResultOutput="workflowResultOutput"
                  />
                  <Search
                    :searchType="searchType"
                    :dataSource="searchSource"
                    :key="searchType + searchSource.length"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import Sidebar from "@/components/navigation/Sidebar.vue";
import DashboardTable from "@/components/dashboard/DashboardTable.vue";
import DateFilter from "@/components/dashboard/DashboardFilters/DateFilter";
import Logout from "@/components/shared/Logout.vue";
import Search from "@/components/shared/Search.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import Loader from "@/components/shared/Loader.vue";
import SharedService from "@/service/shared-service";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    DashboardTable,
    DateFilter,
    Logout,
    Search,
    Loader,
  },
  data() {
    return {
      workflowSubmitted: false,
      bundle: null,
      visible: true,
      searchType: "",
      searchSource: [],
      workflowResultService: new WorkflowResultService(),
      sharedService: new SharedService(),
      isFilterApiLoaded: false,
      columns: [],
    };
  },
  computed: {
    workflowDashboard: sync("workflowDashboard"),
    dashboardColumns: sync("dashboardColumns"),
    filterCount: function() {
      var dateFilter = 0;
      if (this.workflowDashboard.searchQuery.filterByDates.length > 0)
        dateFilter = 1;
      if (this.workflowDashboard.searchQuery.filterByTestDates.length > 0)
        dateFilter = 1;
      if (
        this.workflowDashboard.searchQuery.filterByDates.length > 0 &&
        this.workflowDashboard.searchQuery.filterByTestDates.length > 0
      )
        dateFilter = 2;
      if (this.parent !== "NewTest")
        dateFilter =
          dateFilter +
          this.workflowDashboard.searchQuery.filterByOutputs.length +
          this.workflowDashboard.searchQuery.filterByStatuses.length;
      return (
        dateFilter +
        this.workflowDashboard.searchQuery.filterBySubmitters.length +
        this.workflowDashboard.searchQuery.filterByWorkflows.length +
        this.workflowDashboard.searchQuery.filterByCollections.length +
        this.workflowDashboard.searchQuery.filterByUnits.length +
        this.workflowDashboard.searchQuery.filterByExternalIds.length +
        this.workflowDashboard.searchQuery.filterByItems.length +
        this.workflowDashboard.searchQuery.filterByFiles.length +
        this.workflowDashboard.searchQuery.filterBySteps.length +
        this.workflowDashboard.searchQuery.filterBySearchTerms.length
      );
    },

    filterByCollections: sync(
      "workflowDashboard.searchQuery.filterByCollections"
    ),
    filterByUnits: sync("workflowDashboard.searchQuery.filterByUnits"),
    filterByWorkflows: sync("workflowDashboard.searchQuery.filterByWorkflows"),
    filterByOutputs: sync("workflowDashboard.searchQuery.filterByOutputs"),
    selectedFilters: sync("selectedFilters"),
  },
  props: {
    parent: {
      default: "",
    },
    workflowResultType: {
      default: "",
    },
    workflowResultOutput: {
      default: "",
    },
  },
  methods: {
    onChange(ev, col) {
      const self = this;
      self.columns = self.sharedService.sortByAlphabatical(
        self.columns,
        "order"
      );
      if (col.field === "actions") {
        //To remove the sortable icon
        let actionsButton = document.getElementById("actions");
        if (actionsButton) {
          actionsButton.childNodes[0].removeChild(
            actionsButton.childNodes[0].childNodes[1]
          );
          actionsButton.childNodes[0].style.justifyContent = "center";
        }
      }
    },
    changeDisplayedFilter(item) {
      this.workflowDashboard.filtersEnabled.dateFilter = false;
      this.workflowDashboard.filtersEnabled.submitterFilter = false;
      this.workflowDashboard.filtersEnabled.collectionFilter = false;
      this.workflowDashboard.filtersEnabled.externalIdFilter = false;
      this.workflowDashboard.filtersEnabled.itemFilter = false;
      this.workflowDashboard.filtersEnabled.fileFilter = false;
      this.workflowDashboard.filtersEnabled.workflowFilter = false;
      this.workflowDashboard.filtersEnabled.stepFilter = false;
      this.workflowDashboard.filtersEnabled.outputFilter = false;
      this.workflowDashboard.filtersEnabled.statusFilter = false;
      this.workflowDashboard.filtersEnabled.searchFilter = false;
      item = !item;
    },
    clearAll() {
      this.workflowDashboard.searchQuery.filterByDates = [];
      this.workflowDashboard.searchQuery.filterByTestDates = [];
      this.workflowDashboard.searchQuery.filterBySubmitters = [];
      this.workflowDashboard.searchQuery.filterByCollections = [];
      this.workflowDashboard.searchQuery.filterByUnits = [];
      this.workflowDashboard.searchQuery.filterByExternalIds = [];
      this.workflowDashboard.searchQuery.filterByItems = [];
      this.workflowDashboard.searchQuery.filterByFiles = [];
      this.workflowDashboard.searchQuery.filterByWorkflows = [];
      this.workflowDashboard.searchQuery.filterBySteps = [];
      this.workflowDashboard.searchQuery.filterBySearchTerms = [];
      if (this.parent !== "NewTest") {
        this.workflowDashboard.searchQuery.filterByOutputs = [];
        this.workflowDashboard.searchQuery.filterByStatuses = [];
      } else if (this.parent === "TestResults") {
        this.workflowDashboard.searchQuery.sortRule.columnName = "id";
      }
      // Clear selected search on popup
      this.selectedFilters["items"] = [];
      this.selectedFilters["primaryfiles"] = [];
      this.selectedFilters["collections"] = [];
      this.selectedFilters["units"] = [];
      this.selectedFilters["workflows"] = [];
      this.selectedFilters["outputs"] = [];
      this.selectedFilters["submitters"] = [];
      this.selectedFilters["steps"] = [];
      if (this.parent !== "NewTest") {
        this.selectedFilters["statuses"] = [];
      }
    },
    removeDateFilter() {
      this.workflowDashboard.searchQuery.filterByDates = [];
      console.log(
        "current date filter is:" +
          this.workflowDashboard.searchQuery.filterByDates
      );
    },
    removeTestDateFilter() {
      this.workflowDashboard.searchQuery.filterByTestDates = [];
      console.log(
        "current date filter is:" +
          this.workflowDashboard.searchQuery.filterByTestDates
      );
    },
    removeSubmitterFilter(index) {
      let indx;
      this.selectedFilters["submitters"].map((el, i) => {
        if (
          el.submitterName ===
          this.workflowDashboard.searchQuery.filterBySubmitters[index]
        )
          indx = i;
      });
      this.selectedFilters["submitters"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterBySubmitters.splice(
        index,
        1
      );
      console.log(
        "selected submitters are:" +
          this.workflowDashboard.searchQuery.filterBySubmitters +
          " and removed element is:" +
          removed
      );
    },
    removeCollectionFilter(index) {
      let indx;
      this.selectedFilters["collections"].map((el, i) => {
        if (
          el.collectionId ===
          this.workflowDashboard.searchQuery.filterByCollections[index]
        )
          indx = i;
      });
      this.selectedFilters["collections"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByCollections.splice(
        index,
        1
      );
      console.log(
        "selected search terms are:" +
          this.workflowDashboard.searchQuery.filterByCollections +
          " and removed element is:" +
          removed
      );
    },
    removeExternalIdFilter(index) {
      var removed = this.workflowDashboard.searchQuery.filterByExternalIds.splice(
        index,
        1
      );
      console.log(
        "selected externalIds are:" +
          this.workflowDashboard.searchQuery.filterByExternalIds +
          " and removed element is:" +
          removed
      );
    },
    removeItemFilter(index) {
      let indx;
      this.selectedFilters["items"].map((el, i) => {
        if (
          el.itemId === this.workflowDashboard.searchQuery.filterByItems[index]
        )
          indx = i;
      });
      this.selectedFilters["items"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByItems.splice(
        index,
        1
      );
      console.log(
        "selected items are:" +
          this.workflowDashboard.searchQuery.filterByItems +
          " and removed element is:" +
          removed
      );
    },
    removeFileFilter(index) {
      let indx;
      this.selectedFilters["primaryfiles"].map((el, i) => {
        if (
          el.primaryfileId ===
          this.workflowDashboard.searchQuery.filterByFiles[index]
        )
          indx = i;
      });
      this.selectedFilters["primaryfiles"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByFiles.splice(
        index,
        1
      );
      console.log(
        "selected files are:" +
          this.workflowDashboard.searchQuery.filterByFiles +
          " and removed element is:" +
          removed
      );
    },
    removeWorkflowFilter(index) {
      let indx;
      this.selectedFilters["workflows"].map((el, i) => {
        if (
          el.workflowName ===
          this.workflowDashboard.searchQuery.filterByWorkflows[index]
        )
          indx = i;
      });
      this.selectedFilters["workflows"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByWorkflows.splice(
        index,
        1
      );
      console.log(
        "selected workflows are:" +
          this.workflowDashboard.searchQuery.filterByWorkflows +
          " and removed element is:" +
          removed
      );
    },
    removeStepFilter(index) {
      let indx;
      this.selectedFilters["steps"].map((el, i) => {
        if (
          el.stepName ===
          this.workflowDashboard.searchQuery.filterBySteps[index]
        )
          indx = i;
      });
      this.selectedFilters["steps"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterBySteps.splice(
        index,
        1
      );
      console.log(
        "selected steps are:" +
          this.workflowDashboard.searchQuery.filterBySteps +
          " and removed element is:" +
          removed
      );
    },
    removeOutputFilter(index) {
      let indx;
      this.selectedFilters["outputs"].map((el, i) => {
        if (
          el.outputName ===
          this.workflowDashboard.searchQuery.filterByOutputs[index]
        )
          indx = i;
      });
      this.selectedFilters["outputs"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByOutputs.splice(
        index,
        1
      );
      console.log(
        "selected outputs are:" +
          this.workflowDashboard.searchQuery.filterByOutputs +
          " and removed element is:" +
          removed
      );
    },
    removeStatusFilter(index) {
      let indx;
      this.selectedFilters["statuses"].map((el, i) => {
        console.log(this.selectedFilters["statuses"]);
        console.log(this.workflowDashboard.searchQuery.filterByStatuses[index]);
        if (
          el.statusName ===
          this.workflowDashboard.searchQuery.filterByStatuses[index]
        )
          indx = i;
      });
      this.selectedFilters["statuses"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByStatuses.splice(
        index,
        1
      );
      console.log(
        "selected statuses are:" +
          this.workflowDashboard.searchQuery.filterByStatuses +
          " and removed element is:" +
          removed
      );
    },
    removeSearchFilter(index) {
      var removed = this.workflowDashboard.searchQuery.filterBySearchTerms.splice(
        index,
        1
      );
      console.log(
        "selected search terms are:" +
          this.workflowDashboard.searchQuery.filterBySearchTerms +
          " and removed element is:" +
          removed
      );
    },
    removeUnitFilter(index) {
      let indx;
      this.selectedFilters["units"].map((el, i) => {
        if (
          el.unitId === this.workflowDashboard.searchQuery.filterByUnits[index]
        )
          indx = i;
      });
      this.selectedFilters["units"].splice(indx, 1);
      var removed = this.workflowDashboard.searchQuery.filterByUnits.splice(
        index,
        1
      );
      console.log(
        "selected outputs are:" +
          this.workflowDashboard.searchQuery.filterByUnits +
          " and removed element is:" +
          removed
      );
    },
    onOpenModal(value) {
      let self = this;
      switch (value) {
        case "item":
          this.searchType = "items";
          this.searchSource = self.workflowDashboard.searchResult.filters.items.map(
            (el) => ({
              id: el.itemId,
              itemName: el.itemName,
              itemId: el.itemId,
              collectionName: el.collectionName,
              unitName: el.unitName,
            })
          );
          break;
        case "primaryfile":
          this.searchType = "primaryfiles";
          this.searchSource = self.workflowDashboard.searchResult.filters.files.map(
            (el) => ({
              id: el.primaryfileId,
              primaryfileName: el.primaryfileName,
              primaryfileId: el.primaryfileId,
              itemName: el.itemName,
              externalSource: el.externalSource,
              externalId: el.externalId,
            })
          );
          break;
        case "collection":
          this.searchType = "collections";
          this.searchSource = self.workflowDashboard.searchResult.filters.collections.map(
            (el) => ({
              id: el.collectionId,
              collectionName: el.collectionName,
              collectionId: el.collectionId,
              unitName: el.unitName,
            })
          );
          break;
        case "unit":
          this.searchType = "units";
          this.searchSource = self.workflowDashboard.searchResult.filters.units.map(
            (el) => ({
              id: el.unitId,
              unitName: el.unitName,
              unitId: el.unitId,
            })
          );
          break;
        case "workflow":
          this.searchType = "workflows";
          this.searchSource = self.workflowDashboard.searchResult.filters.workflows.map(
            (el) => ({ id: el, workflowName: el })
          );
          break;
        case "output":
          this.searchType = "outputs";
          this.searchSource = self.workflowDashboard.searchResult.filters.outputs.map(
            (el) => ({ id: el, outputName: el })
          );
          break;
        case "submitter":
          this.searchType = "submitters";
          this.searchSource = self.workflowDashboard.searchResult.filters.submitters.map(
            (el) => ({ id: el, submitterName: el })
          );
          break;
        case "step":
          this.searchType = "steps";
          this.searchSource = self.workflowDashboard.searchResult.filters.steps.map(
            (el) => ({ id: el, stepName: el })
          );
          break;
        case "status":
          this.searchType = "statuses";
          this.searchSource = self.workflowDashboard.searchResult.filters.statuses.map(
            (el) => ({ id: el, statusName: el })
          );
          break;
      }

      this.$bvModal.show("modal-lg");
    },
  },
  mounted() {
    this.columns = this.dashboardColumns;
    if (this.parent === "TestResults") {
      this.clearAll();
      this.columns = this.columns.filter((column) => {
        if (column.field === "addToTest") {
          column.label = "Visualize";
        }

        return (
          //column.field !== "dateCreated" &&
          column.field !== "status" &&
          column.field !== "actions"
        );
      });
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [];
      this.workflowDashboard.searchQuery.filterByOutputs = [];
    } else if (this.parent === "NewTest") {
      this.clearAll();
      this.columns = this.columns.filter((column) => {
        if (column.field === "addToTest") {
          column.label = "Add to Test";
        }

        return (
          column.field !== "testDate" &&
          //column.field !== "dateCreated" &&
          column.field !== "groundTruth" &&
          column.field !== "scores" &&
          column.field !== "status" &&
          column.field !== "actions"
        );
      });
      this.workflowDashboard.searchQuery.pageNum = 1;
      this.workflowDashboard.searchQuery.filterByTypes = [
        this.workflowResultType,
      ];
      this.workflowDashboard.searchQuery.filterByOutputs = [
        ...this.workflowResultOutput.split(/\s*,\s*/),
      ];
      this.workflowDashboard.searchQuery.filterByStatuses = ["COMPLETE"];
    } else {
      this.columns = this.columns.filter((column) => {
        return (
          column.field !== "testDate" &&
          //column.field !== "dateCreated" &&
          column.field !== "unit" &&
          column.field !== "externalSource" &&
          column.field !== "workflowStep" &&
          column.field !== "groundTruth" &&
          column.field !== "scores" &&
          column.field !== "actions" &&
          column.field !== "addToTest"
        );
      });
      this.workflowDashboard.searchQuery.filterByTypes = [];
      this.workflowDashboard.searchQuery.filterByOutputs = [];
      this.clearAll();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-margin-min {
  margin: 0.5em !important;
}

.spacer {
  height: 24px;
}

.selected-filters-row {
  margin-left: -30px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.selected-filter-button {
  background-color: white;
  border: 2px solid;
  text-align-last: left;
  align-self: flex-start;
  color: black;
  border-radius: 5px;
  border-color: #ced4da;
  padding-bottom: 0px;
  padding-right: 20px;
  margin-bottom: 5px;
  margin-right: 10px;
  flex-wrap: wrap;
  min-width: max-content;
}

.label-bold {
  font-weight: bold;
  flex-wrap: wrap;
}

.no-padding-col {
  margin-bottom: 0px;
  flex-wrap: wrap;
}

.btn-info {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
}
.relevant-togggle {
  margin-left: auto;
  margin-right: 0;
  margin-top: auto;
}
.filter-gap {
  height: 18px !important;
}

#dropdown-form {
  margin: 0px;
  padding: 0px;
}
#dropdown-form > button > span > svg > g > path {
  fill: #153c4d !important;
}
#dropdown-form > button:hover > span > svg > g > path {
  fill: #fff !important;
}
form.b-dropdown-form {
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
form.b-dropdown-form > * {
  flex: 0 0 50%;
}
</style>
