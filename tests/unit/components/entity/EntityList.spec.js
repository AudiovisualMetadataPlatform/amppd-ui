import { shallowMount, createLocalVue } from '@vue/test-utils'
import {createBootstrap} from 'bootstrap-vue-next'
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
                    getEntityConfigs: (id) => {
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
    localVue.use(createBootstrap());
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
            entityConfigs: {
                externalSources: [],
                taskManagers: []
            },
            accessControl:{
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
        await wrapper.vm.getEntityConfigs();
        expect(wrapper.vm.entityConfigs.externalSources.length).toBe(2)
    });
});