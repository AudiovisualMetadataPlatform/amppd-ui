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
  },
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
  typeAheadResult: "",
  Collections: {
    page: { number: 1, size: 20, totalElements: 0 },
    _embedded: { collections: [] },
    loading: false,
  },
  selectedCollection: null,
  collectionDetails: {
    items: {},
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
  selectedItem: {},

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
  selectedPrimaryFile: {},
  selectedUnit: {},
  isAuthenticated: false,
  selectedFile: {},
  selectedFilters: {},
  itemConfigs: {
    externalSources: [],
    taskManagers: [],
  },
};

export default state;
