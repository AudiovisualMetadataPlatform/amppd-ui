<template>
  <div
    class="container-fluid dataTables_wrapper"
    :class="baseUrl == 'unit' ? 'units' : 'collection'"
  >
    <loader :show="showLoader" />
    <div class="row" v-if="!showLoader">
      <!-- <Sidebar /> -->
      <div class="col-12 bg-light-gray-1">
        <main :class="!unitEntity.currentUnit ? 'mb-3' : 'mb-5'">
          <!-- AmpHeader - Details page -->

          <b-card
            class="text-center mt-5 mb-3"
            :class="
              baseUrl === 'file' && entity.mediaType === 'video'
                ? 'extra-padding mb-5'
                : unitEntity.currentUnit
                ? showAssignRoles || showRolesSettings
                  ? 'mb-3'
                  : 'mb-5'
                : 'mb-3'
            "
          >
            <h1 class="text-left">
              <span class="text-capitalize">{{
                baseUrl === "file" ? "Content File" : baseUrl
              }}</span>
              Details
              <button
                v-if="baseUrl === 'item' && entity.parentType === 'item-search'"
                class="btn btn-primary btn-lg float-right"
                type="button"
                @click="handleSearchItem()"
              >
                Search Item
              </button>
            </h1>
            <div class="primary-file">
              <div
                v-if="baseUrl === 'file'"
                class="media-player"
              >
                <div v-if="entity.mediaSource">
                  <mediaelement
                    ref="vPlay"
                    :type="entity.mediaType"
                    :autoplay="false"
                    :forceLive="false"
                    preload="auto"
                    :source="entity.mediaSource"
                    width="100%"
                    height="495.4px"
                  ></mediaelement>
                </div>
                <div class="float-left">
                  <b-button
                    v-b-toggle.collapse-1
                    variant="outline-primary"
                    class="btn-lg media-info-btn"
                  >
                    <span v-html="infoSvg"></span>
                    Media Information
                  </b-button>
                </div>
                <b-collapse
                  v-if="selectedFile.mediaInfo"
                  id="collapse-1"
                  class="mt-2 media-details"
                >
                  <textarea
                    v-model="mediaInfo"
                    disabled
                    class="textArea mt-2 mb-2"
                  ></textarea>
                </b-collapse>
              </div>
              <form
                name="unitForm"
                class="form"
                :class="{
                  'w-50': baseUrl === 'file',
                  'w-100': baseUrl !== 'file',
                }"
              >
                <div v-if="baseUrl === 'file'">
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>
                        <span class="text-capitalize">{{ baseUrl }}</span>
                        Name:
                      </label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.name"
                        :disabled="
                          showEdit ||
                            (baseUrl === 'file' &&
                              !accessControl._primaryfile._update)
                        "
                        :class="{ 'error-border': submitted && !entity.name }"
                        @change="onInputChange"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Original Name:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.originalFilename"
                        :disabled="true"
                      />
                    </div>
                  </div>
                  <div class="col-12 text-left form-group p-0">
                    <label>Description:</label>
                    <textarea
                      class="form-control w-100"
                      v-model="entity.description"
                      :disabled="
                        showEdit ||
                          (baseUrl === 'file' &&
                            !accessControl._primaryfile._update)
                      "
                      @change="onInputChange"
                    ></textarea>
                  </div>
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>Created By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.createdBy"
                        :disabled="true"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Date Created:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.createdDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>
                  <div class="col-12 text-left form-group p-0 flex-div">
                    <div style="width: 48%">
                      <label>Modified By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.modifiedBy"
                        :disabled="true"
                      />
                    </div>
                    <div style="width: 48%">
                      <label>Modified Date:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="row">
                    <div
                      class="text-left form-group"
                      :class="baseUrl === 'collection' ? 'col-6' : 'col-12'"
                    >
                      <label>
                        <span class="text-capitalize">{{ baseUrl }}</span> Name:
                      </label>
                      <select
                        v-if="baseUrl == 'unit'"
                        class="select custom-select w-100"
                        v-model="unitEntity.currentUnit"
                        @change="onUnitChange"
                        required
                        id="unit-select"
                        ><option value="" disabled selected
                          >- Choose Unit -</option
                        >
                        <option
                          v-for="option in unitEntity.unitList"
                          :key="option.id"
                          :value="option.id"
                          >{{ option.name }}</option
                        >
                      </select>
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        v-model="entity.name"
                        :disabled="
                          showEdit ||
                            (baseUrl === 'collection' &&
                              !accessControl._collection._update) ||
                            (baseUrl === 'item' && !accessControl._item._update)
                        "
                        :class="{ 'error-border': submitted && !entity.name }"
                        @change="onInputChange"
                      />
                    </div>
                    <div
                      class="col-6 text-left form-group"
                      v-if="baseUrl === 'collection'"
                    >
                      <label>Task Manager:</label>
                      <select
                        class="select custom-select w-100"
                        v-model="entity.taskManager"
                        :disabled="
                          showEdit ||
                            (baseUrl === 'collection' &&
                              !accessControl._collection._update)
                        "
                        :class="{
                          'error-border': submitted && !entity.taskManager,
                        }"
                        @change="onInputChange"
                      >
                        <option
                          v-for="option in listOfTaskManager"
                          :key="option"
                          >{{ option }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div
                    class="col-12 text-left form-group p-0"
                    v-if="baseUrl === 'file'"
                  >
                    <label>Original Name:</label>
                    <input
                      type="text"
                      class="form-control w-100"
                      v-model="entity.originalFilename"
                      :disabled="true"
                    />
                  </div>
                  <div
                    v-if="unitEntity.currentUnit"
                    class="col-12 text-left form-group p-0 expand-ani"
                  >
                    <label>Description:</label>
                    <textarea
                      class="form-control w-100"
                      v-model="entity.description"
                      :disabled="
                        showEdit ||
                          (baseUrl === 'unit' &&
                            !accessControl._unit._update) ||
                          (baseUrl === 'collection' &&
                            !accessControl._collection._update) ||
                          (baseUrl === 'item' && !accessControl._item._update)
                      "
                      @change="onInputChange"
                    ></textarea>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Unit:</label>
                      <input
                        v-if="
                          (isCreatePage || selectedItem.selectedItemId) &&
                            selectedUnit
                        "
                        type="text"
                        class="form-control w-100"
                        v-model="selectedUnit.name"
                        :disabled="true"
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        v-model="entity.unitName"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Collection:</label>
                      <input
                        v-if="
                          (isCreatePage || selectedItem.selectedItemId) &&
                            selectedCollection
                        "
                        type="text"
                        class="form-control w-100"
                        v-model="selectedCollection.name"
                        :disabled="true"
                      />
                      <input
                        v-else
                        type="text"
                        class="form-control w-100"
                        :value="entity.collectionName"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Created By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.createdBy"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Date Created:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.createdDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>Modified By:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.modifiedBy"
                        :disabled="true"
                      />
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>Modified Date:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                        :disabled="true"
                      />
                    </div>
                  </div>

                  <div
                    v-if="baseUrl !== 'item' && unitEntity.currentUnit"
                    class="col-12 p-0 expand-ani"
                  >
                    <div class="row">
                      <div class="col-3 text-left form-group">
                        <label>Created By:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="entity.createdBy"
                          :disabled="true"
                        />
                      </div>
                      <div class="col-3 text-left form-group">
                        <label>Date Created:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          :value="entity.createdDate | LOCAL_DATE_VALUE"
                          :disabled="true"
                        />
                      </div>
                      <div class="col-3 text-left form-group">
                        <label>Modified By:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          v-model="entity.modifiedBy"
                          :disabled="true"
                        />
                      </div>

                      <div class="col-3 text-left form-group">
                        <label>Modified Date:</label>
                        <input
                          type="text"
                          class="form-control w-100"
                          :value="entity.modifiedDate | LOCAL_DATE_VALUE"
                          :disabled="true"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="baseUrl === 'item'">
                    <div class="col-6 text-left form-group">
                      <label>External Source:</label>
                      <select
                        class="select custom-select w-100"
                        :disabled="
                          baseUrl === 'item' && !accessControl._item._update
                        "
                        v-model="entity.externalSource"
                        @change="onInputChange"
                      >
                        <option
                          v-for="option in listOfExternalResources"
                          :key="option"
                          >{{ option }}</option
                        >
                      </select>
                    </div>
                    <div class="col-6 text-left form-group">
                      <label>External Id:</label>
                      <input
                        type="text"
                        class="form-control w-100"
                        v-model="entity.externalId"
                        :disabled="
                          showEdit ||
                            (baseUrl === 'item' && !accessControl._item._update)
                        "
                        @change="onInputChange"
                      />
                    </div>
                  </div>
                </div>
                <div class="d-flex float-right">
                  <a
                    v-if="unitEntity.currentUnit && baseUrl === 'unit' && accessControl._role._read"
                    class="btn btn-lg btn-outline-primary mr-2"
                    :class="{ activeBtn: showRolesSettings }"
                    id="pills-unit-roles-tab"
                    data-toggle="pill"
                    role="tab"
                    aria-controls="pills-unit-roles-settings"
                    aria-selected="false"
                    @click="handleRolesSettingBtn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-check-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                    </svg>
                    Unit Roles Settings
                  </a>
                  <a
                    v-if="unitEntity.currentUnit && baseUrl === 'unit' && accessControl._roleassignment._read"
                    class="btn btn-lg btn-outline-primary mr-2"
                    :class="{ activeBtn: showAssignRoles }"
                    id="pills-assign-tab"
                    data-toggle="pill"
                    role="tab"
                    aria-controls="pills-assign"
                    aria-selected="false"
                    @click="handleAssignRolesButton"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                      />
                      <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                      />
                    </svg>
                    Assign Roles
                  </a>
                  <div
                    v-if="
                      (unitEntity.currentUnit &&
                        baseUrl === 'unit' &&
                        accessControl._unit._update) ||
                        (baseUrl === 'collection' &&
                          accessControl._collection._update) ||
                        (baseUrl === 'item' && accessControl._item._update) ||
                        (baseUrl === 'file' &&
                          accessControl._primaryfile._update)
                    "
                    class="w-100 text-right p-0 expand-ani"
                  >
                    <button
                      class="btn btn-primary btn-lg btn-edit"
                      type="button"
                      @click="onUpdateEntityDetails"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </b-card>

          <!-- AmpHeader - Details page Ends here-->
          <div
            v-if="
              baseUrl === 'item' &&
                (selectedItem.id || selectedItem.selectedItemId)
            "
          >
            <ItemFiles></ItemFiles>
          </div>
          <div v-else-if="baseUrl === 'file' && accessControl._workflowresult._read">
            <OutputFile />
          </div>
          <div
            class
            v-else-if="
              baseUrl !== 'item' && baseUrl !== 'file' && unitEntity.currentUnit
            "
          >
            <div
              v-if="showAssignRoles && accessControl._roleassignment._read"
              class="tab-pane expandOpen"
              :class="{ 'mb-5': showAssignRoles }"
              id="pills-assign"
              role="tabpanel"
              aria-labelledby="pills-assign-tab"
            >
              <div class="card card-body marg-t-0 bg-light-gray-1 b-card-spl">
                <div class="form-group">
                  <label v-if="accessControl._roleassignment._update" for="formGroupExampleInpu bold">Select User</label>
                  <div v-if="accessControl._roleassignment._update" data-v-4ae6b2fb="" class="">
                    <div data-v-4ae6b2fb="" class="input-group mb-3">
                      <input
                        data-v-4ae6b2fb=""
                        type="text"
                        id="exampleFormControlInput100"
                        placeholder="Select User"
                        autocomplete="off"
                        class="form-control"
                        list="userInputList"
                        v-model="selectedUser"
                      />
                      <datalist id="userInputList">
                        <option
                          v-for="user in userList"
                          :key="user.id"
                          :value="user.username"
                          >{{ `${user.firstName} ${user.lastName}` }}</option
                        >
                      </datalist>

                      <div data-v-4ae6b2fb="" class="input-group-append">
                        <button
                          class="marg-tb-1 btn btn-primary btn-save add-btn"
                          v-on:click="handleAddUser"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="list-group marg-t-2 mb-2 role-assign-ul">
                    <li
                      class="list-group-item d-flex"
                      v-for="(user, userIndex) in assignedRoles.users"
                      :key="userIndex"
                    >
                      <div class="bold pad-r-3 u-width">
                        {{ user.username }}
                      </div>
                      <div
                        class="form-check form-check-inline mr-4"
                        v-for="(role, roleIndex) in assignedRoles.roles"
                        :key="role.id"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="`inlineCheckbox-${userIndex}-${roleIndex}`"
                          v-on:click="
                            handleAssignRoles(user, role, userIndex, roleIndex)
                          "
                          :checked="
                            (assignedRoles['assignments'] &&
                              assignedRoles['assignments'][userIndex] &&
                              assignedRoles['assignments'][userIndex][
                                roleIndex
                              ]) ||
                              false
                          "
                          :disabled="!accessControl._roleassignment._update || role.level <= assignedRoles['level']"
                        />
                        <label
                          class="form-check-label"
                          :for="`inlineCheckbox-${userIndex}-${roleIndex}`"
                          >{{ role.name }}</label
                        >
                      </div>
                    </li>
                  </ul>
                  <div v-if="accessControl._roleassignment._update" class="float-right">
                    <button
                      type="submit"
                      class="marg-tb-1 btn btn-primary btn-save"
                      @click="handleAssignRolesSaveBtn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="showRolesSettings && accessControl._role._read"
              :class="{ 'mb-5': showRolesSettings }"
              class="tab-pane expandOpen"
              id="pills-unit-roles-settings"
              role="tabpanel"
              aria-labelledby="pills-unit-roles-tab"
            >
              <div class="card card-body marg-t-0">
                <div class="table-responsive-lg">
                  <table id="myTable" class="table w-100 permissions">
                    <thead>
                      <tr>
                        <th scope="col" class="">Action</th>
                        <th
                          scope="col"
                          class="checkbox slim-col-6 text-center"
                          v-for="roleName in settingsRoles.unitRoleNames"
                          :key="roleName"
                        >
                          {{ roleName }}
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="(actions, actionLabel, index) in settingsRoles[
                        'groupedActions'
                      ]"
                      :key="index"
                      class="action-table"
                    >
                      <tr>
                        <td
                          colspan="7"
                          class="table-primary hdr-2 slim-col-1 font-weight-bold"
                        >
                          <span>{{ actionLabel }}</span>
                        </td>
                      </tr>
                      <tr v-for="action in actions" :key="action.id">
                        <td class="col-8">
                          <span>{{ action.name }}</span>
                        </td>
                        <td
                          v-for="(roleName,
                          roleNameIndex) in settingsRoles.unitRoleNames"
                          :key="roleNameIndex"
                          :class="
                            `checkbox col-${4 /
                              settingsRoles.unitRoleNames.length} text-center`
                          "
                        >
                          <span>
                            <label class="visually-hidden"></label>
                            <input
                              class=""
                              type="checkbox"
                              v-on:click="handleUpdateRoleAction(roleName, action.id)"
                              :checked="existRoleAction(roleName, action.id)"
                              :disabled="!accessControl._role_unit._update"
                            />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="accessControl._role_unit._update" class="float-right">
                    <button
                      type="submit"
                      class="marg-tb-1 btn btn-primary btn-save"
                      @click="handleRolesSettingsSaveBtn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <b-card class="m-0 text-left expand-ani">
              <!-- Title - Listing page -->

              <!-- Title - Unit Details page  -->
              <div class="d-flex w-100" v-if="baseUrl == 'unit'">
                <div class="col-3 text-left p-0">
                  <h2>Unit Collections</h2>
                </div>
                <div class="col-9 text-right p0 btn-grp">
                  <button
                    class="btn btn-primary btn-lg btn-edit mr-2"
                    v-if="accessControl._collection._create"
                    type="button"
                    @click="onCreateCollection()"
                  >
                    Create New Collection
                  </button>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onSearch('listing-collection')"
                  >
                    Search Collections
                  </button>
                </div>
              </div>
              <!-- Title - Collection Details page  -->
              <div class="d-flex w-100" v-if="baseUrl == 'collection'">
                <div class="col-3 text-left">
                  <h2>Collection Items</h2>
                </div>
                <div class="col-9 text-right p-0 btn-grp">
                  <button
                    class="btn btn-primary btn-lg btn-edit mr-2"
                    type="button"
                    v-if="accessControl._item._create"
                    @click="onCreateItem"
                  >
                    Create New Item
                  </button>
                  <button
                    class="btn btn-primary btn-lg btn-edit"
                    type="button"
                    @click="onSearch('listing-item')"
                  >
                    Search Items
                  </button>
                </div>
              </div>
              <div class="row row-spl" v-if="records && records.length">
                <b-card
                  class="m-3 w-100 text-left b-card-spl"
                  v-for="elem in records"
                  :key="elem.id"
                >
                  <div class="col-12 p-0">
                    <div class="row">
                      <div
                        :class="
                          (baseUrl === 'unit' &&
                            accessControl._collection._activate) ||
                          (baseUrl === 'unit' &&
                            accessControl._collection._read) ||
                          baseUrl !== 'unit'
                            ? 'col-11'
                            : 'col-12'
                        "
                      >
                        <h3>{{ elem.name }}</h3>
                        <p>{{ elem.description }}</p>
                      </div>
                      <div
                        v-if="
                          (baseUrl === 'unit' &&
                            accessControl._collection._activate) ||
                            (baseUrl === 'unit' &&
                              accessControl._collection._read) ||
                            baseUrl !== 'unit'
                        "
                        class="col-1 text-right"
                      >
                        <!-- TODO
                          Remove active button for now until we fix the issue with inactive workflow result
                        <div                          
                          v-if="baseUrl === 'unit' && accessControl._collection._activate"
                          class="d-flex float-right"
                        >
                          <span class="mr-1">Active</span>
                          <label
                            class="switch"
                            :title="elem.active ? 'Deactivate' : 'Activate'"
                          >
                            <input
                              type="checkbox"
                              v-model="elem.active"
                              v-on:click="toggleCollectionActive(elem)"
                            />
                            <span class="slider round"></span>
                          </label>
                        </div> 
                        -->
                        <div
                          v-if="
                            (elem.active &&
                              baseUrl === 'unit' &&
                              accessControl._collection._read) ||
                              (baseUrl === 'collection' &&
                                accessControl._item._read)
                          "
                          class="float-right"
                        >
                          <button
                            class="btn btn-primary btn"
                            @click="onView(elem)"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Reusing same components for details page, so based on condition we are displaying the data -->
                    <div
                      class="row w-100"
                      :class="
                        accessControl._collection._activate ||
                        accessControl._collection._read ||
                        baseUrl !== 'unit'
                          ? ''
                          : 'justify-content-between'
                      "
                      v-if="purpose"
                    >
                      <div class="col-3" v-if="baseUrl == 'unit'">
                        <label>Task Manager</label>
                        <p class="mb-0">{{ elem.taskManager }}</p>
                      </div>
                      <div class="col-2" v-if="baseUrl == 'collection'">
                        <label>Source Name</label>
                        <p class="mb-0">{{ elem.externalSource }}</p>
                      </div>
                      <div class="col-2" v-if="baseUrl == 'collection'">
                        <label>Source Id</label>
                        <p class="mb-0">{{ elem.externalId }}</p>
                      </div>
                      <div class="col-2">
                        <label>Date Created:</label>
                        <p class="mb-0">
                          {{ elem.createdDate | LOCAL_DATE_VALUE }}
                        </p>
                      </div>
                      <div class="col-2">
                        <label>Created By</label>
                        <p class="mb-0">{{ elem.createdBy }}</p>
                      </div>
                      <div class="col-2">
                        <label>Modified By</label>
                        <p class="mb-0">{{ elem.modifiedBy }}</p>
                      </div>
                      <div class="col-2">
                        <label>Modified Date</label>
                        <p class="mb-0">
                          {{ elem.modifiedDate | LOCAL_DATE_VALUE }}
                        </p>
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
import { sync } from "vuex-pathify";
import config from "../../assets/constants/common-contant.js";
import Sidebar from "@/components/navigation/Sidebar.vue";
import Logout from "@/components/shared/Logout.vue";
import Loader from "@/components/shared/Loader.vue";
import CollectionService from "../../service/collection-service";
import UnitService from "../../service/unit-service";
import SharedService from "../../service/shared-service";
import ItemService from "../../service/item-service";
import ItemFiles from "./ItemFiles.vue";
import OutputFile from "./OutputFile.vue";
import PrimaryFileService from "../../service/primary-file-service.js";
import Search from "@/components/shared/Search.vue";
import BaseService from "../../service/base-service";
import EntityService from "../../service/entity-service";
import { env } from "../../helpers/env";
import Mediaelement from "./Mediaelement.vue";
import WorkflowResultService from "../../service/workflow-result-service";
import ConfigPropertiesService from "@/service/config-properties-service";
import EvaluationService from "@/service/evaluation-service";
import AccessControlService from "@/service/access-control-service";

export default {
  name: "EntityList",
  components: {
    Logout,
    Sidebar,
    Loader,
    ItemFiles,
    Search,
    OutputFile,
    mediaelement: Mediaelement,
  },
  props: [],
  data() {
    return {
      unitService: new UnitService(),
      collectionService: new CollectionService(),
      sharedService: new SharedService(),
      itemService: new ItemService(),
      baseService: new BaseService(),
      primaryFileService: new PrimaryFileService(),
      entityService: new EntityService(),
      workflowResultService: new WorkflowResultService(),
      configPropertiesService: new ConfigPropertiesService(),
      evaluationService: new EvaluationService(),
      accessControlService: new AccessControlService(),
      records: [],
      masterRecords: [],
      showLoader: false,
      entity: {},
      showEdit: false,
      infoSvg: config.common.icons["info"],
      searchType: "",
      submitted: false,
      isDataChanged: false,
      defaultUnitId: "",
      unitEntity: { unitList: [], currentUnit: "" },
      showAssignRoles: false,
      showRolesSettings: false,
      assignedRolesUnitChanged: false,    // whether unit for role assignments has changed since last refresh
      settingsRolesUnitChanged: false,    // whether unit for role setings has changed since last refresh
      assignedRoles: {},
      settingsRoles: {},
      newRoles: [],
      userList: [],
      idsExcluding: [],
      selectedUser: "",
    };
  },
  computed: {
    accessControl: sync("accessControl"),
    acIsAdmin: sync("acIsAdmin"),
    acUnitsActions: sync("acUnitsActions"),
    selectedUnit: sync("selectedUnit"),
    selectedCollection: sync("selectedCollection"),
    selectedItem: sync("selectedItem"),
    selectedFile: sync("selectedFile"),
    itemConfigs: sync("itemConfigs"),
    configProperties: sync("configProperties"),
    baseUrl() {
      const self = this;
      if (window.location.hash.toLowerCase().indexOf("unit") > -1) {
        return "unit";
      } else if (window.location.hash.toLowerCase().indexOf("file") > -1) {
        return "file";
      } else if (
        window.location.hash.toLowerCase().indexOf("collection") > -1 &&
        window.location.hash.toLowerCase().indexOf("item") === -1
      ) {
        this.getItemsConfig();
        return "collection";
      } else if (window.location.hash.toLowerCase().indexOf("item") > -1) {
        return "item";
      }
      return "";
    },
    purpose() {
      return window.location.hash.toLowerCase().indexOf("details") > -1
        ? "details"
        : "";
    },
    isCreatePage() {
      return (
        window.location.hash.toLowerCase().indexOf("create") > -1 ||
        window.location.hash.toLowerCase().indexOf("add-item") > -1
      );
    },
    listOfTaskManager() {
      return this.itemConfigs.taskManagers;
    },
    listOfExternalResources() {
      return this.itemConfigs.externalSources;
    },
    mediaInfo() {
      return this.selectedFile && this.selectedFile.mediaInfo
        ? JSON.stringify(JSON.parse(this.selectedFile.mediaInfo), undefined, 4)
        : "";
    },
  },
  methods: {
    handleAddUser() {
      const self = this;
      self.assignedRoles.users.splice(0, 0, { username: self.selectedUser });
      let role = [];
      for (let i = 0; i < self.assignedRoles.roles.length; i++) {
        role.push(false);
      }
      self.assignedRoles.assignments.splice(0, 0, role);
      const getUser = self.userList.find(
        ({ username }) => username === self.selectedUser
      );
      self.selectedUser = "";
      self.idsExcluding.push(getUser.id);
      self.accessControlService
        .findActiveUsersByNameStartingIdsExcluding("", self.idsExcluding)
        .then((response) => {
          self.userList = self.sharedService.sortByAlphabatical(
            response.data,
            "username"
          );
        });
    },
    async handleAssignRolesSaveBtn() {
      const self = this;
      self.accessControlService
        .updateRoleAssignments(self.unitEntity.currentUnit, self.newRoles)
        .then(async (res) => {
          if (res.added.length || res.deleted.length) {
            self.$bvToast.toast(
              "User role assignments have been updated successfully.",
              self.sharedService.successToastConfig
            );
          }
          if (res.failed.length) {
            for (let i = 0; i < res.failed.length; i++) {
              self.$bvToast.toast(
                `Failed to update ${res.failed[i].roleName} role assignments for ${res.failed[i].username}`,
                self.sharedService.erorrToastConfig
              );
            }
          }
          self.refreshRoleAssignments(true);
        })
        .catch((e) => {
          self.showLoader = false;
          self.$bvToast.toast(
            "Oops! Something went wrong.",
            self.sharedService.erorrToastConfig
          );
          console.log(e);
        });
    },
    handleAssignRoles(user, role, userIndex, roleIndex) {
      const self = this;
      self.assignedRoles["assignments"][userIndex][roleIndex] = !self
        .assignedRoles["assignments"][userIndex][roleIndex];
      let indexNewRoles = self.newRoles.findIndex(
        (element) =>
          element.username === user.username && element.roleName === role.name
      );
      if (indexNewRoles > -1) {
        self.newRoles[indexNewRoles]["assigned"] =
          self.assignedRoles["assignments"][userIndex][roleIndex];
      } else {
        self.newRoles.push({
          username: user.username,
          roleName: role.name,
          assigned: self.assignedRoles["assignments"][userIndex][roleIndex],
        });
      }
    },
    async handleAssignRolesButton() {
      const self = this;
      self.showRolesSettings = false;
      self.showAssignRoles = !self.showAssignRoles;
      console.log("showAssignRoles = " + self.showAssignRoles);
      if (self.showAssignRoles) {
        self.refreshRoleAssignments();
      }
    },
    async refreshRoleAssignments(forced = false) {
      const self = this;
      
      // no need to do anything if refresh not forced and unit hasn't changed since last refresh
      if (!forced && !self.assignedRolesUnitChanged) {
        console.log ("No need to refresh RoleAssignments.");
        return false;
      }

      // otherwise retrieve RoleAssignments and initialize/reset data
      self.showLoader = true;
      const assignRolesResponse = await 
        self.accessControlService.retrieveRoleAssignments(self.unitEntity.currentUnit);
      self.assignedRoles = assignRolesResponse.data;
      self.idsExcluding = self.assignedRoles.users.map((user) => user.id);
      self.accessControlService
        .findActiveUsersByNameStartingIdsExcluding("", self.idsExcluding)
        .then((response) => {
          self.userList = self.sharedService.sortByAlphabatical(
            response.data,
            "username"
          );
        });
        self.newRoles = [];
        self.assignedRolesUnitChanged = false;
        self.showLoader = false;        

        console.log("Refreshed RoleAssignments");
        return true;
    },
    async refreshRolesSettings(forced = false) {
      const self = this;

      // no need to do anything if refresh not forced and unit hasn't changed since last refresh
      if (!forced && !self.settingsRolesUnitChanged) {
        console.log ("No need to refresh RolesSettings.");
        return false;
      }

      // otherwise retrieve RolesSettings and initialize/reset settingsRoles
      self.showLoader = true;
      const settingsRolesResponse = await 
        self.accessControlService.retrieveRoleActionConfig(self.unitEntity.currentUnit);
      self.settingsRoles = settingsRolesResponse.data;
      let groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      self.settingsRoles["groupedActions"] = groupBy(self.settingsRoles.actions, "targetType");

      // set up hashmap <roleName, actionSet>
      console.log("Refreshing rolesActions hashmap and updatedRoles hashset ...")
      let rolesActions = new Map();
      for (let role of self.settingsRoles.roles) {
        let actions = rolesActions.get(role.name)
        if (!actions) {
          actions = new Set();
          rolesActions.set(role.name, actions);
        }          
        for (let action of role.actions) {
          actions.add(action.id);
        }
        console.log("Processed unit role " + role.name + " with " + actions.size + " actions: " + actions);
      }
      self.settingsRoles["rolesActions"] = rolesActions;

      // set up hashset to keep updated roles represented by roleName, initially empty
      self.settingsRoles["rolesUpdated"] = new Set();      
      self.settingsRolesUnitChanged = false;
      self.showLoader = false;

      console.log ("Refreshed RolesSettings.");
      return true;
    },
    async handleRolesSettingBtn() {
      const self = this;
      self.showAssignRoles = false;
      self.showRolesSettings = !self.showRolesSettings;
      console.log("showRolesSettings = " + self.showRolesSettings);
      if (self.showRolesSettings) {
        self.refreshRolesSettings();
      }
    },
    handleUpdateRoleAction(roleName, actionId) {
      const self = this;
      // flip the existence of roleName-actionId in the rolesActions hashmap-hashset
      let rolesActions = self.settingsRoles["rolesActions"];
      let actions = rolesActions.get(roleName);
      if (actions) {
        if (actions.has(actionId)) {
          actions.delete(actionId);
          console.log("removing role-action to existing role: roleName = " + roleName +", actionId = " + actionId);
        }
        else {
          actions.add(actionId);
          console.log("adding role-action: roleName = " + roleName +", actionId = " + actionId);
        }
      } else {
        actions = new Set();
        actions.add(actionId);
        rolesActions.set(roleName, actions);        
        console.log("adding role-action to new role: roleName = " + roleName +", actionId = " + actionId);
      }
      // add the role name to the update roles hashset
      self.settingsRoles["rolesUpdated"].add(roleName);      
    },
    existRoleAction(roleName, actionId) {
      const self = this;
      // check if the roleName-actionId exists in the rolesActions hashmap-hashset
      let actions = self.settingsRoles["rolesActions"].get(roleName);
      let exist = actions && actions.has(actionId)
      return exist;
    },
    async handleRolesSettingsSaveBtn() {
      const self = this;
      // process all updated roles each with its associated actions IDs
      let rolesActions = self.settingsRoles["rolesActions"];
      let rolesUpdated = self.settingsRoles["rolesUpdated"];
      let roles = new Array();
      for (let roleName of rolesUpdated) {
        let actions = rolesActions.get(roleName);  
        let actionIds = Array.from(actions);
        let role = {"name": roleName, "actionIds": actionIds};
        roles.push(role);
        console.log("Updating role " + roleName + " with " + actionIds.length + " actions: " + actionIds);
      }
      // call updateRoleActionConfig API 
      self.accessControlService
        .updateRoleActionConfig(self.unitEntity.currentUnit, roles)
        .then(async (res) => {
          let nFailed = roles.length - res.length;
          if (nFailed === 0) {
            self.$bvToast.toast(
              "Roles permission configuration have been updated successfully.",
              self.sharedService.successToastConfig
            );
          } else {
              self.$bvToast.toast(
                `Failed to update ${nFailed} roles with permissions configuration`,
                self.sharedService.erorrToastConfig
              );
          }          
          self.refreshRolesSettings(true);
        })
        .catch((e) => {
          self.showLoader = false;
          self.$bvToast.toast(
            "Oops! Something went wrong.",
            self.sharedService.erorrToastConfig
          );
          console.log(e);
        });
    },      
    async getUnitDetails() {
      const self = this;
      self.showLoader = true;
      try {
        const unitDetails = await self.entityService.getUnitDetails(
          self.unitEntity.currentUnit,
          self
        );      
        if (unitDetails.response) {
          self.selectedUnit = unitDetails.response;
          self.entity = unitDetails.response;
          this.getUnitCollections();
          self.showLoader = false;
        } else {
          self.showLoader = false;
        }
        self.showLoader = false;
      } catch (error) {
        self.showLoader = false;
        console.log(error);
      }
    },
    onUnitChange() {
      const self = this;
      self.showAssignRoles = false;
      self.showRolesSettings = false;
      //Removing expand animation css
      const expandAniHtml = document.getElementsByClassName("expand-ani");
      if (expandAniHtml.length === 4)
        for (let i = 0; i < expandAniHtml.length; i++) {
          expandAniHtml[i].classList.remove("expandOpen");
        }
      sessionStorage.setItem(
        "unitEntity",
        JSON.stringify({ ...self.unitEntity })
      );
      self.getEntityData();
      //Checking Access Control
      self.accessControlService.checkAccessControl(this);
    },
    async toggleCollectionActive(collection) {
      collection.active = !collection.active;
      this.collectionService.activateCollection(
        collection.id,
        collection.active
      );
    },
    async getAllUnits() {
      const self = this;
      try {
        self.showLoader = true;
        
        await self.unitService.getAllUnits().then((res) => {
          self.allUnits = res.data;
          self.unitEntity.unitList = self.sharedService.sortByAlphabatical(this.allUnits);
          self.showLoader = false;
          if (
            self.unitEntity.unitList &&
            self.unitEntity.unitList.length === 1
          ) {
            self.unitEntity.currentUnit = self.unitEntity.unitList[0].id;
            self.onUnitChange();
          } else {
            let uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
            if (!uEntity)
              sessionStorage.setItem(
                "unitEntity",
                JSON.stringify({ ...self.unitEntity })
              );
            const unitSelectHtml = document.getElementById("unit-select");
            if (unitSelectHtml) unitSelectHtml.focus();
          }
        });        
      } catch (error) {
        self.showLoader = false;
        console.log(error);
      }
    },
    async getConfigs() {
      const self = this;
      try {
        self.showLoader = true;
        self.configProperties = await self.configPropertiesService.getConfigProperties();        
        self.showLoader = false;
      } catch (error) {
        self.showLoader = false;
        console.log(error);
      }
    },
    async getEntityData() {
      const self = this;
      if (self.baseUrl === "unit" && self.selectedUnit) {
        self.getUnitDetails();
        self.assignedRolesUnitChanged = true;
        self.settingsRolesUnitChanged = true;
      } else if (self.baseUrl === "collection") {
        // if current collection exists but fields not populated, get its details
        if (self.selectedCollection && self.selectedCollection.id && !self.selectedCollection.name) {
          self.selectedCollection = await this.collectionService.getCollectionDetails(self.selectedCollection.id);
        }
        self.entity = self.selectedCollection;
        if (self.selectedCollection && !self.isCreatePage)
          this.getCollectionItems();
        else {
          self.selectedCollection = self.entity = {};
          self.showEdit = false;
        }
      } else if (self.baseUrl === "item") {
        self.entity = self.selectedItem;
        if (self.isCreatePage) {
          self.selectedItem = self.entity = {};
          self.showEdit = false;
        }
      } else if (self.baseUrl === "file") {
        self.showLoader = true;
        self.entity = self.selectedFile;
        if (self.accessControl._primaryfile_media._read) {
          let mediaSourceUrl = await self.workflowResultService.getMediaSymlink(
            self.selectedFile.id
          );
          self.entity["mediaSource"] = mediaSourceUrl;
          console.log("EntityList.getEntityData: mediaSource = " + self.entity.mediaSource);
        }
        let mediaSourceType = await self.primaryFileService.getPrimaryFile(
          self.selectedFile.id
        );
        self.entity["mediaInfo"] = mediaSourceType.mediaInfo;
        self.entity["mediaType"] = mediaSourceType.mimeType.substring(0, 5);
        console.log("EntityList.getEntityData: mediaType = " + self.entity.mediaType);
        self.showLoader = false;
      }
    },
    async getUnitCollections() {
      const self = this;
      self.showLoader = true;
      self.collectionService
        .getCollectionByUnitId(self.selectedUnit.id)
        .then((response) => {
          if (response && response && response._embedded) {
            self.records =
              response._embedded[Object.keys(response._embedded)[0]];
            self.records = self.sharedService.sortByAlphabatical(self.records);
            self.masterRecords = JSON.parse(JSON.stringify(self.records));
          }
          self.showLoader = false;

          //Adding expand animation css
          const expandAniHtml = document.getElementsByClassName("expand-ani");
          for (let i = 0; i < expandAniHtml.length; i++) {
            expandAniHtml[i].classList.add("expandOpen");
          }
        });
    },
    async getCollectionItems() {
      const self = this;
      self.showLoader = true;
      self.itemService
        .getCollectionItems(self.selectedCollection.id)
        .then((response) => {
          self.showLoader = false;
          if (response && response.data && response.data._embedded) {
            self.records =
              response.data._embedded[Object.keys(response.data._embedded)[0]];
            self.records = self.sharedService.sortByAlphabatical(self.records);
            self.masterRecords = JSON.parse(JSON.stringify(self.records));
          }
        });
        self.showLoader = false;
    },
    async onView(objInstance) {
      const self = this;
      if (self.baseUrl === "collection" && self.purpose) {
        self.selectedItem = objInstance;
        self.$router.push("/collections/items/details");
      } else if (self.baseUrl === "unit" && self.purpose) {
        self.selectedCollection = objInstance;
        self.$router.push("/collection/details");
      }
    },
    onCreateCollection() {
      const self = this;
      self.$router.push("/collection/create");
    },
    onCreateItem() {
      const self = this;
      self.$router.push("/collection/add-items");
    },
    onUpdateEntityDetails() {
      const self = this;
      self.entityService.onUpdateEntityDetails(self);
    },
    onCancel() {
      var result = confirm("Are you sure want to cancel!");
      if (result) this.showEdit = !this.showEdit;
    },
    onSearch(type) {
      this.searchType = type;
      this.$bvModal.show("modal-lg");
    },
    onSearchDone(records) {
      this.records = records && records.length ? records : this.masterRecords;
    },
    onInputChange(ev) {
      this.isDataChanged = true;
    },
    async getItemsConfig() {
      const self = this;
      self.entityService.getItemsConfig(self);
    },
    handleSearchItem() {
      this.$router.push("/collections/items/item-search");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDataChanged) {
      this.$bvModal
        .msgBoxConfirm(`Changes you have made may not be saved.`, {
          title: "Notification",
          size: "md",
          buttonSize: "sm",
          //   okVariant: 'danger',
          okTitle: "Leave",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: true,
          centered: false,
          noCloseOnBackdrop: true,
        })
        .then((value) => {
          if (value) next();
        })
        .catch((err) => {
          // An error occurred
        });
    } else {
      next();
    }
  },
  mounted() {
    const self = this;
    
    // retrieve configProperties if not yet populated
    if (!self.configProperties || Object.keys(self.configProperties).length === 0) {
      self.getConfigs();
    }

    // retrieve units list and currentUnit info from storage if available, otherwise initialize them 
    const uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    if (!uEntity) {
      self.unitEntity = { unitList: [], currentUnit: "" };
    }
    else {
      self.unitEntity = uEntity;    
    }

    // retrieve units list if not yet populated
    if (!self.unitEntity.unitList || !self.unitEntity.unitList.length) {
      self.getAllUnits();
    } 

    // if currentUnit set, gegetEntityData for the page 
    if (self.unitEntity.currentUnit) {
      self.getEntityData();
    }

    // adjust size of PFile fields for PFile page
    let formHTML = document.getElementsByClassName("form")[0];
    if (formHTML && this.baseUrl === "file") {
      formHTML.style.width = "50%";
    } else if (formHTML) {
      formHTML.style.width = "100%";
    }
  },
};
</script>

<style scoped>
@import "../../styles/style.css";

.textArea {
  width: 100%;
  min-height: 30rem;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.8rem;
  line-height: 1.2;
}
.error-border {
  border: 1px solid red;
}
.flex-div {
  display: flex;
  justify-content: space-between;
}
.extra-padding {
  padding-bottom: 40px;
}
.float-left {
  position: relative;
  margin-top: 10px;
}
.media-info-btn {
  position: absolute;
}
.media-details {
  margin-top: 60px !important;
}
.primary-file {
  display: flex;
}
.media-player {
  width: 50%;
  margin-right: 15px;
}
video {
  margin-top: 0px;
  width: 100% !important;
}
.btn-grp {
  margin-bottom: 33px;
  padding-right: 0px;
}
.b-card-spl {
  background-color: #fafafa;
  margin: 0px 0px 8px 0px !important;
}
.b-card-spl > div:first-child {
  padding: 8px !important;
}
.row-spl {
  margin: 0px;
}
.switch {
  min-width: 45px;
}

.expandOpen,
.trActive {
  animation-name: expandOpen;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  visibility: visible !important;
  max-width: 100%;
}
@keyframes expandOpen {
  from {
    transform: scale3d(1, 1, 1);
    opacity: 0;
  }
  50% {
    transform: scale3d(1.03, 1, 1.03);
    opacity: 0.25;
  }
  to {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
}

.activeBtn {
  background: #153c4d !important;
  border-color: #153c4d !important;
  color: #fff !important;
}
.add-btn {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.list-group .list-group-item:nth-child(2n) {
  background-color: rgb(253, 234, 215);
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.list-group .list-group-item:nth-child(n) {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.role-assign-ul {
  max-height: 25rem !important;
  overflow-y: auto;
}
.u-width {
  min-width: 14rem;
}
.permissions td {
  padding: 6px;
}
.table-primary,
.table-primary > th,
.table-primary > td {
  background-color: #fdead7;
}
.action-table {
  border-top: none !important;
}
</style>
