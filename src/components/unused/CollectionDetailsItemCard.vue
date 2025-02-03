<template>
  <div class="card bg-light-gray-1 p-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h3>
            <a
              class="expand"
              data-toggle="collapse"
              role="button"
              v-on:click="handleClick()"
              :aria-expanded="Show ? 'true' : 'false'"
              aria-controls="collapseExample"
            >
              {{ collectionDetails.items[index].name }}
              <svg
                aria-hidden="true"
                focusable="false"
                class="svg-inline float-end arrow-1"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  class="hotlink"
                  d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                ></path></svg
            ></a>
          </h3>
          <p>
            {{ collectionDetails.items[index].description }}
          </p>

          <div class="row">
            <div class="col-md-6">
              <dl class="row">
                <dt class="col-sm-4 text-end">Source Name:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].externalSource }}
                </dd>
                <dt class="col-sm-4 text-end">Source ID:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].externalId }}
                </dd>
                <dt class="col-sm-4 text-end">Created by:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].createdBy }}
                </dd>
                <dt class="col-sm-4 text-end">Created Date:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].createdDate }}
                </dd>
              </dl>
            </div>
            <div class="col-md-6">
              <dl class="row">
                <dt class="col-sm-4 text-end">Modified by:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].modifiedBy }}
                </dd>
                <dt class="col-sm-4 text-end">Modifed Date:</dt>
                <dd class="col-sm-8 text-start">
                  {{ collectionDetails.items[index].modifiedDate }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-end controls">
          <button class="btn btn-outline-danger btn mt-2">Delete</button>
          <button class="btn btn-outline-primary btn mt-2">Edit</button>
          <button class="btn btn-outline-primary btn mt-2">
            View workflow results
          </button>
          <a href="add-files.html" class="btn btn-primary btn mt-2"
            >Add files</a
          >
        </div>
      </div>
      <div
        id="collapseExample"
        v-if="Show === true && loading === false"
        class="container"
      >
        <ul
          class="list-unstyled file-list"
          v-for="rec in collectionDetails.items[index] &&
            collectionDetails.items[index].primaryFiles"
          :key="rec.id"
        >
          <li>
            <button
              class="btn btn-light btn-sm"
              data-toggle="modal"
              data-target=".bd-example-modal-lg-2"
            >
              <svg
                class="icon-play-audio"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path
                  d="M24.3 11.2v26.1c0 0.4-0.2 0.8-0.5 1.1 -0.3 0.3-0.7 0.5-1.1 0.5s-0.8-0.2-1.1-0.5l-8-8H7.4c-0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1v-9.2c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5h6.3l8-8c0.3-0.3 0.7-0.5 1.1-0.5s0.8 0.2 1.1 0.5C24.2 10.4 24.3 10.8 24.3 11.2zM32.5 20.9c0.7 1.1 1 2.2 1 3.4s-0.3 2.3-1 3.4 -1.6 1.8-2.7 2.2C29.6 30 29.4 30 29.2 30c-0.4 0-0.8-0.1-1.1-0.4s-0.5-0.7-0.5-1.1c0-0.3 0.1-0.6 0.3-0.9 0.2-0.2 0.4-0.4 0.7-0.6 0.3-0.2 0.5-0.4 0.8-0.6s0.5-0.5 0.7-0.9c0.2-0.4 0.3-0.8 0.3-1.4 0-0.5-0.1-1-0.3-1.4 -0.2-0.4-0.4-0.7-0.7-0.9 -0.3-0.2-0.5-0.4-0.8-0.6 -0.3-0.2-0.5-0.4-0.7-0.6s-0.3-0.5-0.3-0.9c0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.4 1.1-0.4 0.2 0 0.4 0 0.6 0.1C30.9 19.1 31.8 19.8 32.5 20.9zM37.6 17.5c1.4 2.1 2 4.3 2 6.8 0 2.4-0.7 4.7-2 6.8 -1.4 2.1-3.2 3.6-5.4 4.5 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1.1 0.9-1.4 0.9-0.5 1.5-0.8 1.8-1.1 1.2-0.9 2.1-1.9 2.8-3.3s1-2.7 1-4.2 -0.3-2.9-1-4.2c-0.7-1.3-1.6-2.4-2.8-3.3 -0.3-0.2-0.9-0.6-1.8-1.1 -0.6-0.3-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C34.5 13.9 36.3 15.4 37.6 17.5zM42.8 14.1c2 3.1 3 6.5 3 10.1 0 3.7-1 7.1-3 10.1 -2 3.1-4.7 5.3-8.1 6.8 -0.2 0.1-0.4 0.1-0.6 0.1 -0.4 0-0.8-0.2-1.1-0.5 -0.3-0.3-0.5-0.7-0.5-1.1 0-0.6 0.3-1 0.9-1.4 0.1-0.1 0.3-0.1 0.5-0.3 0.2-0.1 0.4-0.2 0.5-0.3 0.7-0.4 1.4-0.8 2-1.2 2-1.5 3.5-3.3 4.6-5.4 1.1-2.2 1.7-4.5 1.7-6.9 0-2.4-0.6-4.8-1.7-6.9 -1.1-2.2-2.6-4-4.6-5.4 -0.6-0.4-1.2-0.8-2-1.2 -0.1-0.1-0.3-0.1-0.5-0.3s-0.4-0.2-0.5-0.3c-0.6-0.4-0.9-0.8-0.9-1.4 0-0.4 0.2-0.8 0.5-1.1 0.3-0.3 0.7-0.5 1.1-0.5 0.2 0 0.4 0 0.6 0.1C38 8.8 40.7 11 42.8 14.1z"
                ></path>
              </svg>
              {{ rec.originalFilename }}
            </button>
            <button class="btn btn-link add-remove float-end">
              <svg
                class="icon-minus"
                version="1.1"
                id="Layer_2"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 311.5 311.5"
                style="enable-background: new 0 0 311.5 311.5"
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
      <div v-else id="collapseExample" class="container collapse"></div>
    </div>
  </div>
</template>

<script>
import sync from "@/helpers/sync";
import CollectionDetailsService from "../../service/collection-detail-service";

export default {
  name: "CollectionDetailsItemCard",
  props: {
    index: Number,
  },
  data() {
    return {
      CollectionDetailsService: new CollectionDetailsService(),
      Show: false,
      loading: true,
    };
  },
  computed: {
    collectionDetails: sync("collectionDetails"),
  },
  methods: {
    async handleClick() {
      let self = this;
      self.Show = !self.Show;
      self.Show && self.getPrimaryFiles();
    },
    async getPrimaryFiles() {
      let self = this;

      this.CollectionDetailsService.getItemsPrimaryFiles(
        self.collectionDetails.items[self.index].id
      ).then((response) => {
        self.collectionDetails.items[self.index].primaryFiles =
          response.data._embedded.primaryfiles;

        self.loading = false;
      });
    },
  },
  mounted() {
    let self = this;
  },
};
</script>
<style scoped>
@import "../../styles/style.css";
</style>
