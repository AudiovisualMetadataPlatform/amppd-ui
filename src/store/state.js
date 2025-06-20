const state = {
  workflowSubmission: {
    loading: false,
    showBundleError: false,
    showSelectBundle: false,
    showSaveBundle: false,
    bundles: [],
    selectedFiles: new Map(), // use map instead of array to improve search performance
    updateSelectedFiles: 0, // flag to indicate changes in selectedFiles, a work-around to solve the issue that Vue does not watch Map
    selectedWorkflow: null,
    selectedWorkflowParameters: [],
    workflowDetails: {
      inputWprkflowResultFormats: [],
      inputWprkflowResultLabels: [],
    },
    intermediaryWorkflowResults: [],
    selectedIntWfResult: [],
  },
  workflowSubmissionsearchResults: false,

  workflowDashboard: {
    loading: false,
    filtersEnabled: {
      dateFilter: false,
      submitterFilter: false,
      collectionFilter: false,
      externalIdFilter: false,
      itemFilter: false,
      fileFilter: false,
      workflowFilter: false,
      stepFilter: false,
      outputFilter: false,
      statusFilter: false,
      searchFilter: false,
    },
    searchQuery: {
      sortRule: {
        columnName: "dateCreated",
        orderByDescending: true,
      },
      pageNum: 1,
      resultsPerPage: 10,
      filterByDates: [],
      filterByTestDates: [],
      filterBySubmitters: [],
      filterByCollections: [],
      filterByUnits: [],
      filterByExternalIds: [],
      filterByItems: [],
      filterByFiles: [],
      filterByWorkflows: [],
      filterBySteps: [],
      filterByOutputs: [],
      filterByStatuses: [],
      filterBySearchTerms: [],
      filterByRelevant: true,
    },
    searchResult: {
      rows: [],
      totalResults: 0,
      filters: {
        dates: [],
        submitters: [],
        collections: [],
        externalIds: [],
        items: [],
        files: [],
        workflows: [],
        steps: [],
        outputs: [],
        statuses: [],
        searchTerms: [],
      },
    },
    rows: [],
  },
  dashboardColumns: [
    { order: "a", label: "Test Date", field: "testDate" },
    { order: "b", label: "Date", field: "dateCreated" },
    { order: "d", label: "Submitter", field: "submitter" },
    { order: "e", label: "Unit", field: "unit" },
    { order: "f", label: "Collection", field: "collectionName" },
    { order: "g", label: "External Source", field: "externalSource" },
    { order: "h", label: "External ID", field: "externalId" },
    { order: "i", label: "Item", field: "itemName" },
    { order: "j", label: "Content File", field: "primaryfileName" },
    { order: "k", label: "Workflow", field: "workflowName" },
    { order: "l", label: "Step", field: "workflowStep" },
    { order: "m", label: "Output", field: "outputName" },
    { order: "n", label: "Alias", field: "outputLabel" },
    { order: "o", label: "Ground Truth", field: "groundTruth" },
    { order: "p", label: "Test Scores", field: "scores" },
    { order: "q", label: "Status", field: "status" },
    { order: "r", label: "Actions", field: "actions" },
    { order: "s", label: "Add to Test", field: "addToTest" },
  ],
  typeAheadResult: "",

  Collections: {
    page: { number: 1, size: 20, totalElements: 0 },
    _embedded: { collections: [] },
    loading: false,
  },
  Items: {
    page: {
      number: 1,
      size: 20,
      totalElements: 0,
    },
    _embedded: {
      items: [],
    },
  },
  primaryFiles: {
    page: {
      number: 1,
      size: 20,
      totalElements: 0,
    },
    _embedded: {
      primaryfiles: [],
    },
  },

  allUnits: {}, // all units the current user can read
  selectedUnit: {},
  selectedCollection: {},
  selectedItem: {},
  selectedFile: {},
  selectedFilters: {},
  mgmEvaluation: {
    selectedRecords: [],
  },
  mgmCategories: [],
  configProperties: {},

  accessControl: {  // permissions for current user within current unit
    // actionsUnits: new Map(),	// HashMap of unitId -> HashSet{actionKey}
  	// unitsActions: new Map(),	// HashMap of actionKey -> HashSet{unitId}

    _unit: {
      _create: false,
      _read: false,
      _update: false,
      _delete: false,
    },
    _collection: {
      _create: false,
      _read: false,
      _update: false,
      _activate: false,
      _delete: false,
    },
    _item: {
      _create: false,
      _read: false,
      _update: false,
      _delete: false,
    },
    _primaryfile: {
      _create: false,
      _read: false,
      _update: false,
      _delete: false,
    },
    _primaryfile_media: {
      _read: false,
    },
    _supplement: {
      _create: false,
      _read: false,
      _update: false,
      _move: false,
      _delete: false,
    },
    _workflowresult: {
      _create: false,
      _read: false,
      _update: false,
      _delete: false,
    },
    _workflowresult_output: {
      _read: false,
    },
    _workflowresult_restricted: {
      _create: false,
    },
    _workflow: {
      _create: false,
      _read: false,
      _update: false,
      _restrict: false,
      _delete: false,
    },
    _role: {
      _read: false,
      _update: false,
    },
    _role_unit: {
      _update: false,
    },
    _roleassignment: {
      _read: false,
      _update: false,
    },
  },

  isAuthenticated: false,
  acIsAdmin: false,   // whether current user is admin
  acUnitsActions: [], // 2-D array of all units with all permitted actions per unit for current user
  acUnitsMedia: [],		// IDs of units in which current user can view primaryfile media
  acUnitsOutput: [],	// IDs of units in which current user can view workflow output
  acActions: []		  // actionKeys of actions current user can perform in some unit
};

export default state;
