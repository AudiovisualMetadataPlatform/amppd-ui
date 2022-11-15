import { shallowMount, createLocalVue } from '@vue/test-utils'

import DashboardTable from '../../../../src/components/dashboard/DashboardTable.vue'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'

jest.mock('../../../../src/service/base-service', 
    function(){
        return jest.fn().mockImplementation(
          function() {
            const superFn = {
              post_auth: ()=>{
                return true;
            }
          }
            
            return superFn; 
          }
        );
    }
);
jest.mock('../../../../src/service/workflow-result-service', 
function(){
  return jest.fn().mockImplementation(
    function() {
      const superFn = {
        getWorkflowResults: (searchParams)=>{
          /****For Testing Purpose assiging search filters to response filters** */
          const filters = {
            items: searchParams.filterByItems,
            submitters: searchParams.filterBySubmitters
          }
          // console.log(filters, 'filter request');
          return Promise.resolve({ filters: filters, rows: [{collectionId: 2,
            collectionName: "TestCollection",
            dateCreated: "2021-11-17T15:26:17.301+0000",
            dateRefreshed: "2022-01-03T06:00:06.345+0000",
            dateUpdated: "2021-11-17T15:39:44.312+0000",
            externalId: "avalon795",
            externalSource: "DarkAvalon",
            historyId: "32d48e3506ae8cf7",
            id: 14663,
            invocationId: "5714eb36cd2a2be3",
            isFinal: false,
            itemId: 795,
            itemName: "Lunchroom Manners",
            outputId: "3fa3864fccf37f28",
            outputLink: null,
            outputName: "contact_sheet",
            outputPath: "/srv/services/amp_galaxy-test-8100/galaxy/database/files/008/dataset_8726.dat",
            outputType: "png",
            primaryfileId: 796,
            primaryfileName: "Lunchroom Manners",
            relevant: true,
            status: "ERROR",
            stepId: "59db80eee3e3e18f",
            submitter: "amppd@iu.edu",
            toolInfo: null,
            workflowId: "2db84b196cb92302",
            workflowName: "Contact Sheet Generation",
            workflowStep: "contact_sheets"}],filters: null, totalResults: 1});
          
        },
        getSourceUrl: (id) => {
          return id;
        }
    }
      return superFn; 
    }
  );
});
jest.mock('axios', () => ({
  post: () => Promise.resolve(
    {
      rows: [{test: "testValue"}],
      totalResults: 2})
}));
describe('DashboardTable.vue', () => {
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
    }
  };

  beforeEach(() => {
    wrapper = shallowMount(DashboardTable, {
      localVue,
      mocks: {
        $store
      },
      filters: {
        "LOCAL_DATE_VALUE":
          (value) => {
            if(value) return moment(value).format("DD/MM/YYYY");
          }
      },
      propsData: {
        columns: [
          { label: "Date", field: "dateCreated" },
          { label: "Submitter", field: "submitter" },
          { label: "Unit", field: "unit" },
          { label: "Collection", field: "collectionName" },
          { label: "External Source", field: "externalSource" },
          { label: "External ID", field: "externalId" },
          { label: "Item", field: "itemName" },
          { label: "Content File", field: "primaryfileName" },
          { label: "Workflow", field: "workflowName" },
          { label: "Step", field: "workflowStep" },
          { label: "Output", field: "outputName" },
          { label: "Status", field: "status" },
        ],
      },
    });
    refreshDataSpy = jest.spyOn(wrapper.vm, "refreshData") 
  })
  it('VueInstance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should check default sort query for workflow api', () => {
    const tempSortRule = {
      columnName: 'dateCreated',
      orderByDescending: true
    };
    expect(wrapper.vm.workflowDashboard.searchQuery.sortRule).toStrictEqual(tempSortRule);

  });

  it('should apply sort query for workflow api', () => {
    const tempSortRule = {
      columnName: 'collectionName',
      orderByDescending: true
    };
    wrapper.vm.sortQuery(tempSortRule);
    expect(wrapper.vm.workflowDashboard.searchQuery.sortRule).toBe(tempSortRule);

  });

  it('should apply page number while perfomring pagination', () => {
    const pageNumber = 2;
    wrapper.vm.paginate(pageNumber);
    expect(wrapper.vm.workflowDashboard.searchQuery.pageNum).toBe(pageNumber);
  });

  it('should fetch data form the Workflow API', async () => {
    await wrapper.vm.refreshData();
    expect(wrapper.vm.workflowDashboard.searchResult.totalResults).toEqual(1);
  });

  it('should return date string', () => {
    const date = wrapper.vm.getDateString();
    expect(moment().format("YYYYMMDD")).toEqual(date);
  });

  it('should send selected filters to Workflow Result API', () => {
    wrapper.vm.workflowDashboard.searchQuery.filterByItems = ["17th Annual Spring Symposium Keynote Address", "A Concert of Baroque Music 19640630"];
    wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters = ["amppd@iu.edu"]
    wrapper.vm.$options.watch.filterByItems.call(wrapper.vm);
    expect(refreshDataSpy).toBeCalled();
  });

  it('should return updated search params post watch function', () => {
    expect(wrapper.vm.workflowDashboard.searchQuery.filterByItems.length).toEqual(2);
    expect(wrapper.vm.workflowDashboard.searchQuery.filterBySubmitters.length).toEqual(1);
  });


})
