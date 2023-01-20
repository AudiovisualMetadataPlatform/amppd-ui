import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import EntityList from '../../../../src/components/entity/EntityList.vue'
import Vuex from 'vuex'

jest.mock('../../../../src/service/base-service',
    function () {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    get_auth: () => {
                        return true;
                    },
                    post_auth: () => {
                        return true;
                    },
                }
                return superFn;
            }
        );
    }
);
jest.mock('../../../../src/service/shared-service',
    function () {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    sortByAlphabatical: (arr) => {
                        console.log(arr);
                        return arr;
                    }
                }
                return superFn;
            }
        );
    }
);
jest.mock('../../../../src/service/primary-file-service',
    () => {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    getPrimaryFiles: (id) => {

                    }
                };
                return superFn;
            }
        );
    });

    jest.mock('../../../../src/service/unit-service',
    () => {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    getAllUnits: () => {
                        return Promise.resolve({data:{page:10, _embedded:{}}})
                    }
                };
                return superFn;
            }
        );
    });  
    
    jest.mock('../../../../src/service/item-service',
    () => {
        return jest.fn().mockImplementation(
            function () {
                const superFn = {
                    getItemsConfig: (id) => {
                        return Promise.resolve({"externalSources":["MCO","DarkAvalon"],"taskManagers":["Jira","Trello"]})
                    }
                };
                return superFn;
            }
        );
    });  


describe('EntityList.vue', () => {
    let wrapper;
    let refreshDataSpy;
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);
    localVue.use(Vuex);
    const $store = {
        state: {
            selectedCollection: null,
            Items: {
                page: {
                    number: 1,
                    size: 20,
                    totalElements: 0
                },
                _embedded: {
                    items: []
                },
            },
            selectedItem: {},
            primaryFiles: {
                page: {
                    number: 1,
                    size: 20,
                    totalElements: 0
                },
                _embedded: {
                    primaryfiles: []
                },
            },
            selectedPrimaryFile: {},
            selectedUnit: {},
            selectedFile: {},
            selectedFilters: {},
            itemConfigs: {
                externalSources: [],
                taskManagers: []
            }
        }
    };
    beforeEach(() => {
        wrapper = shallowMount(EntityList, {
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

    it('EntityList Instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });

    it('should fetch config values', async () => {
        await wrapper.vm.getItemsConfig();
        expect(wrapper.vm.itemConfigs.externalSources.length).toBe(2)
    });
});