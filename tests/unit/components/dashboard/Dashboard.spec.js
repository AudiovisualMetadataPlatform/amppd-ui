import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Dashboard from '../../../../src/components/dashboard/Dashboard.vue'
jest.mock('../../../../src/service/base-service',
    function () {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    post_auth: () => {
                        return true;
                    }
                }
                return superFn;
            }
        );
    }
);
jest.mock('../../../../src/service/workflow-result-service',
    function () {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {};
                return superFn;
            }
        );
    });
describe('Dashboard.vue', () => {
    let wrapper;
    let refreshDataSpy;
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    const $store = {
        state: {
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
                        columnName: 'dateCreated',
                        orderByDescending: true
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
                    }
                },
                rows: []
            },
            selectedFilters: {},
            dashboardColumns: [
                { order: "a", label: "Date", field: "dateCreated" },
                { order: "b", label: "Test Date", field: "testDate" },
                { order: "c", label: "Output Date", field: "outputDate" },
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
                { order: "p", label: "Test Output", field: "outputTest" },
                { order: "q", label: "Status", field: "status" },
                { order: "r", label: "Actions", field: "actions" },
                { order: "s", label: "Add to Test", field: "addToTest" },
            ],
        }
    };
    beforeEach(() => {
        wrapper = shallowMount(Dashboard, {
            localVue,
            mocks: {
                $store
            }
        });
    });

    it('Dashboard Instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should remove the filter from the selected filters', () => {
        wrapper.vm.workflowDashboard.searchQuery.filterByItems = ["17th Annual Spring Symposium Keynote Address", "A Concert of Baroque Music 19640630"];
        wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters = ["amppd@iu.edu"];
        wrapper.vm.removeSubmitterFilter(0);
        expect(wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters.length).toEqual(0);
    });

    it('should remove all the selected filters', () => {
        wrapper.vm.workflowDashboard.searchQuery.filterByItems = ["17th Annual Spring Symposium Keynote Address", "A Concert of Baroque Music 19640630"];
        wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters = ["amppd@iu.edu"];
        if(wrapper.vm.filterCount > 1) {
            wrapper.vm.clearAll();
        }
        expect(wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters.length).toEqual(0);
        expect(wrapper.vm.filterCount).toBe(0);
    });
});