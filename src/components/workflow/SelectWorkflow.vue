<template>
  <div class="col-lg-5">
    <loader :show="workflowSubmission.loading" />
    <div class="card p-3">
      <h4>Select workflow</h4>
      <div class="mb-3">
        <label for="workflow-name-select" class="visually-hidden">Select list:</label>
        <select
          class="form-control"
          id="workflow-name-select"
          v-on:change="selection"
        >
          <option value="" selected disabled>Select a workflow...</option>
          <option
            v-for="(workflow, index) in workflows"
            v-bind:key="index"
            v-bind:value="workflow.id"
            >{{ workflow.name }}</option
          >
        </select>
      </div>
      <div v-if="workflowSubmission.selectedWorkflow">
        <h4>Workflow Node Parameters</h4>
        <div class="scroll-div">
          <ul class="list-unstyled">
            <li v-if="workflowSubmission.selectedWorkflowParameters.length==0">
              No step specified in workflow.
            </li>
            <li
              v-for="(param,
              index) in workflowSubmission.selectedWorkflowParameters"
              :key="index"
              class="node-li"
            >
              <h5 class="node-name">
                Node {{ param.nodeId }}: {{ param.nodeName }}
              </h5>
              <div v-if="param.params.length==0">
                No parameter specified.
              </div>
              <div
                v-for="(p, paramIndex) in param.params"
                :key="paramIndex"
                :value="p.name"
              >
                {{ p.name }}: {{ p.value }}
              </div>
            </li>
          </ul>
        </div>
        <div class="p-3"></div>
        <h4>Selected Files</h4>
        <div class="container no-pad no-marg">
          <div>
            <div>
              <div class="eq-btns btn-columns">
                <button
                  v-on:click="submitWorkflow"
                  :disabled="submissionEnabled === false"
                  type="button"
                  class="btn btn-primary btn-md"
                  data-toggle="modal"
                  data-target=".save-modal"
                >
                  Run Workflow
                </button>
                <button
                  v-if="
                    !workflowSubmission.workflowDetails
                      .inputWprkflowResultFormats.length
                  "
                  v-on:click="workflowSubmission.showSaveBundle = true"
                  :disabled="saveBundleEnabled === false"
                  type="button"
                  class="btn btn-outline-primary btn-md"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                >
                  Save selection as bundle
                </button>
              </div>
              <div
                class="table-responsive"
                v-if="
                  workflowSubmission.workflowDetails.inputWprkflowResultFormats
                    .length && workflowSubmission.selectedIntWfResult.length
                "
              >
                <table id="myTable" class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Alias</th>
                      <th scope="col">Workflow</th>
                      <th scope="col">Output</th>
                      <th scope="col">
                        <span class="visually-hidden">actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="row-1"
                      v-for="(res,
                      index) in workflowSubmission.selectedIntWfResult"
                      :key="index"
                      :class="{ 'hidden-row': !res.id }"
                    >
                      <td class="center-data">{{ res.outputLabel }}</td>
                      <td class="center-data">{{ res.workflowName }}</td>
                      <td class="center-data">{{ res.outputName }}</td>
                      <td class="text-center slim-col-12 slim-col-4 ">
                        <span class="text-center hideTillSelected">
                          <button
                            class="btn btn-link removeFile"
                            data-remove="row-1"
                            v-on:click="removeSelectedResult(index)"
                          >
                            <svg
                              class="icon-minus"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 311.5 311.5"
                              style="enable-background:new 0 0 311.5 311.5;"
                              xml:space="preserve"
                            >
                              <path
                                class="circle-stroke"
                                d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                                    M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"
                              ></path>
                              <path
                                class="minus-stroke"
                                d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"
                              ></path>
                              <path
                                class="plus-stroke"
                                d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"
                              ></path>
                            </svg>
                            Remove File
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul
                class="list-unstyled file-list"
                v-else-if="
                  !workflowSubmission.workflowDetails.inputWprkflowResultFormats
                    .length
                "
              >
                <li
                  v-for="(file, index) in selectedFilesArray"
                  v-bind:key="index"
                  v-bind:value="file.id"
                  class="file-list-item"
                  data-toggle="tooltip"
                  v-bind:title="file.name"
                >
                  <button class="btn file-name no-bx-shadow">
                    <svg
                      v-if="!workflowService.isAudioFile(file)"
                      class="icon-play  "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path
                        class="icon-play"
                        d="M25.7 8.8c2.7 0 5.3 0 7.8 0.1C35.9 8.9 37.8 9 39 9.1l1.8 0.1c0 0 0.2 0 0.4 0s0.4 0 0.6 0.1c0.1 0 0.3 0.1 0.6 0.1 0.3 0 0.5 0.1 0.7 0.2 0.2 0.1 0.4 0.2 0.7 0.3 0.3 0.1 0.5 0.3 0.7 0.5 0.2 0.2 0.5 0.4 0.7 0.6 0.1 0.1 0.2 0.2 0.4 0.4 0.2 0.2 0.4 0.7 0.7 1.4 0.3 0.7 0.5 1.5 0.6 2.4 0.1 1 0.2 2.1 0.3 3.3 0.1 1.2 0.1 2.1 0.1 2.7v1 3.3c0 2.3-0.1 4.6-0.4 7 -0.1 0.9-0.3 1.7-0.6 2.4s-0.5 1.2-0.8 1.5L45 36.7c-0.2 0.2-0.5 0.5-0.7 0.6 -0.2 0.2-0.5 0.3-0.7 0.5s-0.5 0.2-0.7 0.3c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0-0.5 0.1-0.6 0.1 -0.1 0-0.3 0-0.6 0.1 -0.2 0-0.4 0-0.4 0 -4 0.3-9 0.5-15 0.5 -3.3 0-6.2-0.1-8.6-0.2 -2.4-0.1-4-0.1-4.8-0.2L11 38.6l-0.9-0.1c-0.6-0.1-1-0.2-1.3-0.2 -0.3-0.1-0.7-0.2-1.2-0.5s-1-0.6-1.4-1c-0.1-0.1-0.2-0.2-0.4-0.4 -0.2-0.2-0.4-0.7-0.7-1.4s-0.5-1.5-0.6-2.4c-0.1-1-0.2-2.1-0.3-3.3 -0.1-1.2-0.1-2.1-0.1-2.7v-1 -3.3c0-2.3 0.1-4.6 0.4-7 0.1-0.9 0.3-1.7 0.6-2.4s0.5-1.2 0.8-1.5L6.3 11c0.2-0.2 0.5-0.5 0.7-0.6 0.2-0.2 0.5-0.3 0.7-0.5C8 9.8 8.2 9.7 8.4 9.6s0.4-0.1 0.7-0.2c0.3 0 0.5-0.1 0.6-0.1 0.1 0 0.3 0 0.6-0.1s0.4 0 0.4 0C14.6 8.9 19.6 8.8 25.7 8.8zM21.2 29.4l11.6-6 -11.6-6.1V29.4z"
                      ></path>
                    </svg>
                    <svg
                      v-else
                      class="icon-play-audio"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path
                        d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z"
                      />
                    </svg>
                    {{ file.name }}
                  </button>
                  <button class="btn file-name no-bx-shadow">
                    {{ file.originalFilename }}
                  </button>
                  <button
                    class="btn btn-link add-remove float-end file-list-item-add"
                    v-on:click="removeFile(file.id)"
                  >
                    <svg
                      class="icon-minus"
                      version="1.1"
                      id="Layer_2"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 311.5 311.5"
                      style="enable-background:new 0 0 311.5 311.5;"
                      xml:space="preserve"
                    >
                      <path
                        class="circle-stroke"
                        d="M156.8,302c-80.6,0-146.2-65.6-146.2-146.2S76.2,9.6,156.8,9.6S303,75.2,303,155.8S237.4,302,156.8,302z
                              M156.8,27.9c-70.5,0-127.9,57.4-127.9,127.9s57.4,127.9,127.9,127.9s127.9-57.4,127.9-127.9S227.3,27.9,156.8,27.9z"
                      ></path>
                      <path
                        class="minus-stroke"
                        d="M220.7,164.9H92.8c-5,0-9.1-4.1-9.1-9.1s4.1-9.1,9.1-9.1h127.9c5,0,9.1,4.1,9.1,9.1S225.8,164.9,220.7,164.9z"
                      ></path>
                      <path
                        class="plus-stroke"
                        d="M165.9,91.8v127.9c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1V91.8c0-5,4.1-9.1,9.1-9.1S165.9,86.8,165.9,91.8z"
                      ></path>
                    </svg>
                    Remove File
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false" class="my-modal">
      <template #header><h3>{{ modalHeader }}</h3></template>
      <template #body><div>
        <div v-for="(modalText, index) in modalTextList" :key="index">
          <div
            v-if="
              modalText === 'Please upload the necessary supplemental files.'
            "
          >
            {{ modalText }}
            <b-link class="font-italic" @click="handleSeeHelp($event)"
              >See Help</b-link
            >
          </div>
          <div v-else>
            {{ modalText }}
          </div>
        </div>
        <div v-if="errors.length > 0">
          <div class="error-header"><strong>Failed submissions:</strong></div>
          <div v-for="(error, index) in errors" v-bind:key="index" class="row">
            <div class="col-md-12 error-item">
              Content File ID: {{ error.primaryfileId }}
            </div>
            <div class="col-md-12 error-item">
              Collection: {{ error.collectionName }}
            </div>
            <div class="col-md-12 error-item">Item: {{ error.itemName }}</div>
            <div class="col-md-12 error-item">
              Content File: {{ error.primaryfileName }}
            </div>
            <div class="col-md-12 error-item">Error: {{ error.error }}</div>
          </div>
        </div>
      </div>></template>
      <template #footer><div>
        <input
          type="button"
          class="secondary-button"
          v-on:click="handleSuccess"
          value="Ok"
        />
      </div></template>
    </modal>
    <SaveBundle />
    <!--TODO 
      fr-done-btn is moved out of below if block as a work-around for the issue that supplementList is empty when the button is empty
      when the button is first rendered, upon Run Workflow, it's populated but somehow the page doesn't get updated, 
      so ref to it triggers NPE. A better fix would be to figure out a way to update the page reactively.
    -->
    <b-button
        id="fr-done-btn"
        @click="showFRModal = true"
        class="spl-fr-btn"
      >
    </b-button>
    <!-- Check whether supplementList is not empty -->
    <div v-if="supplementList?.length > 0">
      <b-modal v-model="showFRModal" id="modal-center" centered>
        <template #header>
          <h5 class="text-capitalize">
            Choose the Facial Recognition input file for
            {{ supplementList[0].primaryFileName }}:
          </h5>
        </template>
        <template #default>
          <b-form-radio-group v-model="selectedSupplement" stacked>
            <b-form-radio
              v-for="(supplement, index) in supplementList"
              v-bind:key="index"
              :value="supplement"
              >{{ supplement.name }}</b-form-radio
            >
          </b-form-radio-group>
          <div class="row p-3">
            <div class="float-start">
              <label class="switch">
                <input type="checkbox" v-model="isActiveSupplementSwitch" />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="float-start text-start ps-2">
              Use this input for all files in this batch.
            </div>
          </div>
        </template>
        <template #footer="{ hide }">
          <button class="btn btn-secondary" @click="hide()">
            Cancel
          </button>
          <button size="sm" class="btn btn-primary" @click="onDone()">
            Done
          </button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import { env } from "@/helpers/env.js";
import { requestOptions } from "@/helpers/request-options";
import Modal from "@/components/shared/Modal.vue";
import SaveBundle from "@/components/workflow/SaveBundle.vue";
import WorkflowService from "../../service/workflow-service";
import SharedService from "@/service/shared-service";
import Loader from "@/components/shared/Loader.vue";

export default {
  name: "SelectWorkflow",
  props: {},
  data() {
    return {
      workflows: [],
      jobs: {},
      workflowService: new WorkflowService(),
      sharedService: new SharedService(),
      modalHeader: "",
      modalTextList: [],
      showModal: false,
      selectedFilesArray: [],
      errors: [],
      showFRModal: false,
      supplementList: [], // list of supplements for a particular Supplement MGM node and particular PFile
      selectedSupplement: [],
      isActiveSupplementSwitch: false,
      defaultFacialRecognition: [],
    };
  },
  components: {
    Modal,
    SaveBundle,
    Loader,
  },
  computed: {
    workflowSubmission: sync("workflowSubmission"),
    workflowDetails: sync("workflowSubmission.workflowDetails"),
    selectedFiles: sync("workflowSubmission.selectedFiles"),
    updateSelectedFiles: sync("workflowSubmission.updateSelectedFiles"),
    workflowSubmissionsearchResults: sync("workflowSubmissionsearchResults"),
    submissionEnabled() {
      let self = this;
      console.log(
        "selectedFilesArray.length: " +
          this.selectedFilesArray.length +
          ", selectedWorkflow: " +
          self.workflowSubmission.selectedWorkflow
      );
      if (
        self.workflowSubmission.workflowDetails.inputWprkflowResultFormats
          .length
      ) {
        for (
          let i = 0;
          i < self.workflowSubmission.selectedIntWfResult.length;
          i++
        ) {
          if (!self.workflowSubmission.selectedIntWfResult[i].id) return false;
        }
        return (
          self.workflowSubmission.workflowDetails.inputWprkflowResultFormats
            .length === self.workflowSubmission.selectedIntWfResult.length
        );
      } else
        return (
          self.selectedFilesArray.length > 0 &&
          self.workflowSubmission.selectedWorkflow != null
        );
    },
    saveBundleEnabled() {
      console.log(
        `selectedFilesArray.length: ${this.selectedFilesArray.length}`
      );
      return this.selectedFilesArray.length > 0;
    },
  },
  methods: {
    removeSelectedResult(index) {
      const self = this;
      if (
        self.workflowSubmission.workflowDetails.inputWprkflowResultFormats
          .length !== self.workflowSubmission.selectedIntWfResult.length
      ) {
        for (
          let i = 0;
          i <
          self.workflowSubmission.workflowDetails.inputWprkflowResultFormats
            .length;
          i++
        ) {
          self.workflowSubmission.selectedIntWfResult.splice(i, 1, {});
        }
      } else self.workflowSubmission.selectedIntWfResult.splice(index, 1, {});
    },
    handleSeeHelp(ev) {
      ev.preventDefault();
      const helpUrl = env.getEnv("VUE_APP_DOC_WORKFLOW_SUBMISSIONS_ERROR_HELP");
      window.open(helpUrl, "helpwindow", "width=800, height=500");
      return;
    },
    handleSuccess() {
      let self = this;
      self.showModal = false;
      if (
        self.modalTextList[0] === "Files have been submitted successfully." ||
        self.modalTextList[0] === "File has been submitted successfully."
      ) {
        self.workflowSubmission.loading = false;
        self.workflowSubmission.showBundleError = false;
        self.workflowSubmission.showSelectBundle = false;
        self.workflowSubmission.showSaveBundle = false;
        self.workflowSubmission.bundles = [];
        self.workflowSubmission.selectedFiles = new Map();
        self.workflowSubmission.updateSelectedFiles = 0;
        self.workflowSubmissionsearchResults = false;
        if (self.modalTextList[0] === "File has been submitted successfully.") {
          self.workflowSubmission.selectedIntWfResult = [];
        }
      }
    },
    async getPublishedWorkflows() {
      let self = this;
      this.workflowService.getPublishedWorkflows().then((response) => {
        let workflowResponse = response.data;
        self.workflows = self.sharedService.sortByAlphabatical(
          workflowResponse.rows
        );
      });
    },
    async selection(event) {
      let self = this;
      self.workflowSubmission.loading = true;
      try {
        self.workflowSubmission.selectedWorkflow = event.target.value;
        let wfDetails = await this.workflowService.getWorkflowDetails(
          self.workflowSubmission.selectedWorkflow
        );
        self.workflowSubmission.selectedWorkflowParameters =
          wfDetails.tempParams;
        self.workflowSubmission.workflowDetails = wfDetails.response;

        self.workflowSubmission.loading = false;
        self.workflowSubmission.showBundleError = false;
        self.workflowSubmission.showSelectBundle = false;
        self.workflowSubmission.showSaveBundle = false;
        self.workflowSubmission.bundles = [];
        self.workflowSubmission.selectedFiles = new Map();
        self.workflowSubmission.updateSelectedFiles = 0;
        self.workflowSubmissionsearchResults = false;
        self.workflowSubmission.selectedIntWfResult = [];
      } catch (error) {
        console.log(error);
      }
      self.workflowSubmission.loading = false;
    },

    // we don't need to create anoynymous bundle upon workflow submission,
    // since such bundles aren't accessible to users; and creating one each time will overcrowd DB table over time;
    // instead we can add endpoint on backend to submit list of primaryfiles and use that endpoint
    async getSupplementsForPrimaryfiles(supplementNodes) {
      let self = this;
      let supplements = [];
      for (let i = 0; i < supplementNodes.length; i++) {
        let name = "";
        let category = "";
        let format = "";
        supplementNodes[i].params.map((param) => {
          if (param.name === "Name") {
            name = param.value;
          } else if (param.name === "Category") {
            category = param.value;
          } else if (param.name === "Format") {
            format = param.value;
          }
        });
        await self.workflowService
          .getSupplementsForPrimaryfiles(
            self.workflowService.getSelectedPrimaryfileIds(this.selectedFiles),
            name,
            category,
            format
          )
          .then((response) => {
            response = JSON.parse(JSON.stringify(response));
            response.data["category"] = category;
            supplements.push(response.data);
          });
      }

      return supplements;
    },

    getEachPFileAbsolutePaths(arr, key) {
      return arr.map((item) => item[key]).filter((data) => data);
    },

    getEmptyPrimaryfileNameList(emptySupplementalPFiles, selectedFiles) {
      if (
        selectedFiles === null ||
        !selectedFiles.size ||
        !Object.keys(emptySupplementalPFiles).length
      )
        return "";
      let pfListWithNoSupplements = [];
      for (let key in emptySupplementalPFiles) {
        const sortedEmptyIndexes = emptySupplementalPFiles[key].sort(
          (a, b) => a - b
        );
        pfListWithNoSupplements.push(
          `Files that could not be submitted due to no ${key} supplement available:`
        );
        const selectedFilesList = Array.from(selectedFiles.values());
        sortedEmptyIndexes.forEach(function(value) {
          for (let i = 0; i < selectedFilesList.length; i++) {
            if (i === value) {
              let primaryfile = selectedFilesList[i];
              pfListWithNoSupplements.push(`- ${primaryfile.name}`);
            }
          }
        });
      }

      return pfListWithNoSupplements;
    },

    onDone() {
      document.getElementById("fr-done-btn").click();
      this.workflowSubmission.loading = true;
    },

    pauser() {
      //Pause inside the loop for user input
      return new Promise((resolve) => {
        let playbuttonclick = function() {
          document
            .getElementById("fr-done-btn")
            .removeEventListener("click", playbuttonclick);
          resolve("resolved");
        };
        this.workflowSubmission.loading = false;
        document
          .getElementById("fr-done-btn")
          .addEventListener("click", playbuttonclick);
      });
    },

    getPrimaryFileName(index) {
      const files = Array.from(this.selectedFiles.values());
      let primaryFileName = "";
      for (let i = 0; i < files.length; i++) {
        if (index === i) {
          primaryFileName = files[i].name;
          break;
        }
      }
      return primaryFileName;
    },

    async submitWorkflowApi(body, emptyPFileIndexes, emptySupplementalPFiles) {
      let self = this;
      await self.workflowService
        .submitWorkflow(
          this.workflowSubmission.selectedWorkflow,
          self.workflowService.getSelectedPrimaryfileIds(
            this.selectedFiles,
            emptyPFileIndexes
          ),
          false,
          body
        )
        .then((response) => {
          let jobsobj = response.data;
          for (var j = 0; j < jobsobj.length; j++) {
            var thisItem = jobsobj[j];
            if (!thisItem.success) {
              self.errors.push(thisItem);
            }
          }

          let emptyPrimaryfileDetails = [];
          let eFailure;
          if (emptyPFileIndexes && emptyPFileIndexes.size) {
            emptyPrimaryfileDetails = self.getEmptyPrimaryfileNameList(
              emptySupplementalPFiles,
              this.selectedFiles
            );
            eFailure = self.errors.length + emptyPFileIndexes.size;
          }
          let total = this.selectedFilesArray.length;
          let eSuccess = total - eFailure;
          const emptyPFModalData = [
            `Total number of files submitted: ${total}`,
            `Number of jobs successfully created: ${eSuccess}`,
            `Number of jobs failed to be created: ${eFailure}`,
            ...emptyPrimaryfileDetails,
            "Please upload the necessary supplemental files.",
          ];
          let success = total - self.errors.length;
          let failure = self.errors.length;
          self.modalHeader =
            failure || emptyPrimaryfileDetails.length ? "Error" : "Success";
          self.modalTextList =
            failure || emptyPrimaryfileDetails.length
              ? emptyPrimaryfileDetails.length
                ? emptyPFModalData
                : [
                    `Total number of files submitted: ${total}`,
                    `Number of jobs successfully created: ${success}`,
                    `Number of jobs failed to be created: ${failure}`,
                  ]
              : ["Files have been submitted successfully."];
          self.showModal = true;
          self.workflowSubmission.loading = false;
        })
        .catch((e) => {
          console.log(e);
          self.modalHeader = "Error";
          self.modalTextList = [
            "Error submitting workflow:  Could not finish submission.",
          ];
          self.showModal = true;
          self.workflowSubmission.loading = false;
        });
    },

    getSelectedResultIds(selectedResults) {
      let resultIds = "";
      for (let i = 0; i < selectedResults.length; i++) {
        resultIds =
          resultIds === ""
            ? selectedResults[i].id
            : resultIds + "," + selectedResults[i].id;
      }
      return resultIds;
    },

    async submitWorkflow() {
      let self = this;
      try {
        if (
          self.workflowSubmission.workflowDetails.inputWprkflowResultFormats
            .length
        ) {
          //Submit intermediary file to workflows
          self.workflowSubmission.loading = true;
          await self.workflowService
            .submitWorkflow(
              self.workflowSubmission.selectedWorkflow,
              self.getSelectedResultIds(
                self.workflowSubmission.selectedIntWfResult
              ),
              true,
              null
            )
            .then((response) => {
              if (response.data[0].success) {
                self.modalHeader = "Success";
                self.modalTextList = ["File has been submitted successfully."];
              } else {
                self.modalHeader = "Error";
                self.modalTextList = [
                  "Some thing went wrong! Could not finish submission.",
                ];
              }
              self.showModal = true;
              self.workflowSubmission.loading = false;
            })
            .catch((e) => {
              console.log(e);
              self.modalHeader = "Error";
              self.modalTextList = [
                "Error submitting workflow:  Could not finish submission.",
              ];
              self.showModal = true;
              self.workflowSubmission.loading = false;
            });
        } else {
          // Submit normal files to workflows
          self.workflowSubmission.loading = true;
          self.errors = [];
          console.log("Submitting workflow");

          const workflowNodes =
            self.workflowSubmission.selectedWorkflowParameters;
          const supplementNodes = workflowNodes.filter(
            (node) => node.node_id === "supplement"
          ); // all Supplement MGM nodes in the workflow
          if (supplementNodes.length) {
            console.log("Getting supplements for all PFiles for each MGM in the workflow requiring supplements ...");
            let supplements = await self.getSupplementsForPrimaryfiles(
              supplementNodes
            );

            //Empty Content File listing
            const emptySupplementalPFiles = {};
            for (let i = 0; i < supplements.length; i++) { // loop through each supplementNode
              for (let j = 0; j < supplements[i].length; j++) { // loop through each PFile for the current supplementNode
                if (!supplements[i][j].length) {
                  if (Object.keys(emptySupplementalPFiles).length) {
                    let matched = true;
                    for (let key of Object.keys(emptySupplementalPFiles)) {
                      if (key === supplements[i].category) {
                        emptySupplementalPFiles[key].push(j);
                        matched = true;
                        break;
                      } else {
                        matched = false;
                      }
                    }
                    if (!matched) {
                      emptySupplementalPFiles[supplements[i].category] = [j];
                    }
                  } else {
                    emptySupplementalPFiles[supplements[i].category] = [j];
                  }
                } else {
                  for (let k = 0; k < supplements[i][j].length; k++) {
                    supplements[i][j][k][
                      "primaryFileName"
                    ] = self.getPrimaryFileName(j);
                  }
                }
              }
            }
            let emptyPFileIndexArr = [];
            for (let key in Object.values(emptySupplementalPFiles)) {
              emptyPFileIndexArr = emptyPFileIndexArr.concat(
                Object.values(emptySupplementalPFiles)[key]
              );
            }
            const emptyPFileIndexes = new Set(emptyPFileIndexArr);

            if (emptyPFileIndexes.size === supplements[0].length) {
              //In case all supplement nodes have error
              const total = this.selectedFilesArray.length;
              const success = 0;
              const failure = supplements[0].length;
              const emptyPrimaryfileDetails = self.getEmptyPrimaryfileNameList(
                emptySupplementalPFiles,
                this.selectedFiles
              );
              self.modalHeader = "Error";
              self.modalTextList = [
                `Total number of files submitted: ${total}`,
                `Number of jobs successfully created: ${success}`,
                `Number of jobs failed to be created: ${failure}`,
                ...emptyPrimaryfileDetails,
                "Please upload the necessary supplemental files.",
              ];
              self.showModal = true;
              self.workflowSubmission.loading = false;
            } else {
              //Filtering error free supplement nodes
              if (emptyPFileIndexes.size) {
                const reverseEmptyPFileIndexes = new Set(
                  Array.from(emptyPFileIndexes).reverse()
                );
                reverseEmptyPFileIndexes.forEach(function(value) {
                  for (let i = 0; i < supplements.length; i++) {
                    supplements[i].splice(value, 1);
                  }
                });
              }

              let paths = [];
              //User input in the case of multiple supplements are found
              for (let i = 0; i < supplements.length; i++) { // loop through each supplementNode
                for (let j = 0; j < supplements[i].length; j++) { // loop through each PFile for the current supplementNode
                  let oneSupplement = [];
                  if (supplements[i][j].length > 1) { // more than one supplements exist for current supplementNode and PFile
                    self.supplementList = supplements[i][j]; // list of supplements for current supplementNode and PFile
                    // Toggle button's activity
                    if (self.defaultFacialRecognition.length) { // if "Use this supplement for all files" was choosen by now
                      let matched = true;
                      for (let frValue of self.defaultFacialRecognition) {
                        for (let sup of self.supplementList) {
                          if (frValue === sup.name) {
                            oneSupplement = sup;
                            matched = true;
                            break;
                          } else {
                            matched = false;
                          }
                        }
                      }
                      if (!matched) { // if default supplement doesn't match, ask user to select from current supplement list
                        self.selectedSupplement = supplements[i][j][0];
                        self.showFRModal = true;
                        await self.pauser();
                        oneSupplement = self.selectedSupplement;
                        if (self.isActiveSupplementSwitch) {
                          self.defaultFacialRecognition.push(
                            oneSupplement.name
                          );
                          self.isActiveSupplementSwitch = false;
                        }
                      }
                    } else { // no default supplement, ask user to select from current supplement list
                      self.selectedSupplement = supplements[i][j][0];
                      self.showFRModal = true;
                      await self.pauser();
                      oneSupplement = self.selectedSupplement;
                      if (self.isActiveSupplementSwitch) {
                        self.defaultFacialRecognition.push(oneSupplement.name);
                        self.isActiveSupplementSwitch = false;
                      }
                    }
                  } else {  // just one supplements exist for current supplementNode and PFile, use that one, no need to choose
                    oneSupplement = supplements[i][j][0];
                  }
                  paths.push({ [j]: oneSupplement.absolutePathname });
                }
              }
              self.showFRModal = false;

              //Filtering all absolute paths of each PFile
              let submitFilesApiBody = [];
              for (let i = 0; i < supplements[0].length; i++) {
                const absolutePathList = self.getEachPFileAbsolutePaths(
                  paths,
                  i
                );
                //Constructing submitWorkflow API body
                const info = {
                  map: {},
                };
                for (let i = 0; i < absolutePathList.length; i++) {
                  info["map"][i + 1] = { path: absolutePathList[i] };
                }
                submitFilesApiBody.push(info);
              }

              //POST api call
              self.submitWorkflowApi(
                submitFilesApiBody,
                emptyPFileIndexes,
                emptySupplementalPFiles
              );
            }
          } else {
            self.submitWorkflowApi();
          }
        }
      } catch (error) {
        console.log(error);
        self.modalHeader = "Error";
        self.modalTextList = [
          "Error submitting workflow:  Could not finish submission.",
        ];
        self.showModal = true;
        self.workflowSubmission.loading = false;
      }
    },

    removeFile(id) {
      let self = this;
      self.selectedFiles.delete(id);
      self.workflowSubmission.updateSelectedFiles =
        self.workflowSubmission.updateSelectedFiles - 1;
      console.log("Removed selected file " + id);
    },
  },
  watch: {
    updateSelectedFiles: function() {
      this.selectedFilesArray = Array.from(
        this.workflowSubmission.selectedFiles.values()
      );
      console.log("Updated selectedFilesArray: " + this.selectedFilesArray);
    },
  },
  mounted() {
    let self = this;
    self.getPublishedWorkflows();
  },
  beforeDestroy() {
    const self = this;
    this.workflowSubmission = {
      selectedWorkflow: null,
      selectedWorkflowParameters: [],
      workflowDetails: {
        inputWprkflowResultFormats: [],
        inputWprkflowResultLabels: [],
      },
    };
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
.node-li {
  margin-bottom: 16px;
}
.node-name {
  font-weight: 700;
}
.error-item {
  padding-left: 40px;
}
.error-item:last-of-type {
  margin-bottom: 20px;
}
.error-header {
  margin-top: 10px;
}

.btn-primary:disabled {
  background-color: rgba(187, 187, 187, 0.856) !important;
  border-color: rgba(187, 187, 187, 0.856) !important;
}
.btn-secondary:disabled {
  background-color: rgba(187, 187, 187, 0.856) !important;
  border-color: rgba(187, 187, 187, 0.856) !important;
}
.spl-fr-btn {
  visibility: hidden;
}
.hidden-row {
  display: none;
}
.center-data {
  padding-top: 1.25rem !important;
}
</style>
