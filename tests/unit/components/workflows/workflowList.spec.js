import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import { wrap } from 'underscore';
import WorkflowList from '../../../../src/components/workflow/WorkflowList.vue'
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

// Getworkflow Mock
jest.mock('../../../../src/service/workflow-service',
    function () {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    getWorkflows: ()=>{
                        // console.log(filters, 'filter request');
                        return Promise.resolve({data: [{id:1, name: "TestName1", visible: true}, {id:2, name: "TestName2", visible: true}]});
                        
                    },
                    getAllWorkflows: ()=>{
                        return Promise.resolve({data: { rows:[{id:1, name: "TestName1", visible: true, annotations: ['test']}, {id:2, name: "TestName2", visible: true, annotations: ['test']}] }});
                        
                    },
                    getWorkflowDetails(id) {
                        return Promise.resolve({tempParams: [{id: 1, nodeName: "dummy-test"},{id: 2, nodeName: "test-name-2"}], response: {}});
                    }
                };
                return superFn;
            }
        );
    });

describe('WorkflowList.vue', () => {
    let wrapper;
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    const $store = {
        state: {
            listOfWorkflows: []
        }
    };
    beforeEach(() => {
        wrapper = shallowMount(WorkflowList, {
            localVue,
            mocks: {
                $store
            },
            filters: {
                "LOCAL_DATE_VALUE":
                    (value) => {
                        if(value) return moment(value).format("DD/MM/YYYY");
                    }
                }
        });
    });

    it('Workflow List Instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('ListOfWorkflows attrirbute should be updated after response', async () => {
        await wrapper.vm.getWorkflowList();
        expect(wrapper.vm.listOfWorkflows.length).toBe(2);

    });

    it('should return workflow details based on workflow selection', async() => {
        await wrapper.vm.getWorkflowDetails(0);
        expect(wrapper.vm.listOfWorkflows[0].details.length).toEqual(2);
        expect(wrapper.vm.listOfWorkflows[0].selectedNode).toEqual(0);
    });

    it('it should set selected node as a selected node', () => {
        wrapper.vm.onChangeNode(0, 1);
        expect(wrapper.vm.listOfWorkflows[0].selectedNode).toEqual(1);   
    });

});