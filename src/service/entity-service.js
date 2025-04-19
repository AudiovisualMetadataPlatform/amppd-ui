import UnitService from './unit-service';
import { env } from '../helpers/env'; 

const unitService = new UnitService();

export default class EntityService extends BaseService {
    
    constructor() {}

    async getUnitDetails(defaultUnit, context) {
        let unitDetails = {};
        await unitService.getUnitById(defaultUnit).then(res => {
            unitDetails.response = res;
        }).catch(err => {
            self.$toast.error("Unable to retrieve unit details. Please try again!", context.sharedService.toastNotificationConfig);
        });
        return unitDetails;
    }

    async onUpdateEntityDetails(self) {
        self.submitted = true; 

        if (self.baseUrl === 'unit') {   
            // unit Validation rules
            if (!self.entity.name || !self.entity.taskManager) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }     
            self.unitService.updateUnitDetails(self.selectedUnit.id, self.entity).then(response => {
                self.submitted = false;
                self.isDataChanged = false;
                console.log("Updated unit " + self.entity.id);
                self.$toast.success("Unit details updated successfully.", self.sharedService.toastNotificationConfig);
            }).catch(error => {
                self.submitted = false;
                if (error.response && error.response.data && error.response.data.validationErrors) {
                    const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                    errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                } else {
                    self.$toast.error("Unable to update unit details. Please try again!", self.sharedService.toastNotificationConfig);
                }
            });      
        } else if (self.baseUrl === 'collection') {           
            // Collection Validation rules
            if (!self.entity.name) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }
            self.showLoader = true;
            if (self.isCreatePage) {
                self.entity.unit = self.baseService.API_URL + `/units/${self.selectedUnit.id}`;
                self.collectionService.createCollection(self.entity).then(response => {
                    self.entity = response;
                    self.selectedCollection = response;
                    self.selectedCollection.selectedCollectionId = response.id;                    
                    self.showLoader = false;
                    self.submitted = false;
                    self.isDataChanged = false;
                    // // TODO below is a workaround but doesn't work
                    // // save selectedCollection into localStorage as sync doesn't seem to take effect on write
                    // let vuex = JSON.parse(localStorage.getItem("vuex"));                    
                    // localStorage.setItem("vuex", JSON.stringify({
                    //     ...vuex,
                    //     selectedCollection: self.selectedCollection,
                    // }));                       
                    // console.log("Created collection " + self.entity.id);
                    self.$toast.success("Collection created successfully.", self.sharedService.toastNotificationConfig);
                    self.$router.push("/collection/details");
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to create collection. Please try again!", self.sharedService.toastNotificationConfig);
                    }
                });
            } else {
                self.collectionService.updateCollection(self.entity).then(response => {
                    self.showLoader = false;
                    self.submitted = false;
                    self.isDataChanged = false;
                    // TODO below is a workaround:
                    // save selectedCollection into localStorage as sync doesn't seem to take effect on write
                    let vuex = JSON.parse(localStorage.getItem("vuex"));                    
                    localStorage.setItem("vuex", JSON.stringify({
                        ...vuex,
                        selectedCollection: self.selectedCollection,
                    }));                    
                    console.log("Updated collection " + self.entity.id);
                    self.$toast.success("Collection details updated successfully.", self.sharedService.toastNotificationConfig);
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to update collection details. Please try again!", self.sharedService.toastNotificationConfig);
                    }
                });
            }
        } else if (self.baseUrl === 'item') {
            // item Validation rules
            if (!self.entity.name) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }
            self.showLoader = true;
            if (self.isCreatePage) {
                self.entity = {
                    ...self.entity,
                    collection: env.getAmpUrl() + `/collections/${self.selectedCollection.id}`
                }
                self.itemService.addItemToCollection(self.entity).then(response => {
                    self.entity = response;
                    self.selectedItem = response;
                    self.selectedItem.selectedItemId = response.id;
                    self.showLoader = false;
                    self.submitted = false;
                    self.isDataChanged = false;
                    self.$toast.success("Item created successfully.", self.sharedService.toastNotificationConfig);
                    console.log("Created item " + self.entity.id);
                    self.$router.push("/collections/items/details");
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to create item. Please try again!", self.sharedService.toastNotificationConfig);
                    }
                });
            } else {
                self.itemService.updateItem(self.entity).then(success => {
                    self.showLoader = false;
                    self.submitted = false;
                    self.isDataChanged = false;
                    console.log("Updated item " + self.entity.id);
                    self.$toast.success("Item details updated successfully.", self.sharedService.toastNotificationConfig);
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to update item details. Please try again!", self.sharedService.toastNotificationConfig);
                    }
                });
            }
        } else if (self.baseUrl === 'file') {          
            // file Validation rules
            if (!self.entity.name) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }
            self.showLoader = true;
            const payload = { name: self.entity.name, description: self.entity.description };
            self.primaryFileService.updatePrimaryFile(self.entity.id, payload).then(response => {
                self.showLoader = false;
                self.submitted = false;
                self.isDataChanged = false;
                // TODO below is a workaround:
                // save selectedFile into localStorage as sync doesn't seem to take effect on write
                let vuex = JSON.parse(localStorage.getItem("vuex"));                    
                localStorage.setItem("vuex", JSON.stringify({
                    ...vuex,
                    selectedFile: self.selectedFile,
                }));                    
                console.log("Updated file " + self.entity.id);
                self.$toast.success("File details updated successfully.", self.sharedService.toastNotificationConfig);
            }).catch(error => {
                self.showLoader = false;
                self.submitted = false;
                if (error.response && error.response.data && error.response.data.validationErrors) {
                    const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                    errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                } else {
                    self.$toast.error("Unable to update file details. Please try again!", self.sharedService.toastNotificationConfig);
                }
            });
        }
    }

    getDeleteWarnings(entityStatistics, entityType) {
        let statistics = [], header = '', question = '';
        if (entityStatistics.countCollections) { 
            statistics.push(entityStatistics.countCollections + " collections");
        }
        if (entityStatistics.countItems) { 
            statistics.push(entityStatistics.countItems + " items");
        }
        if (entityStatistics.countPrimaryfiles) { 
            statistics.push(entityStatistics.countPrimaryfiles + " primaryfiles");
        }
        if (entityStatistics.countUnitSupplements) { 
            statistics.push(entityStatistics.countUnitSupplements + " unit supplements");
        }
        if (entityStatistics.countCollectionSupplements) { 
            statistics.push(entityStatistics.countCollectionSupplements + " collection supplements");
        }
        if (entityStatistics.countItemSupplements) { 
            statistics.push(entityStatistics.countItemSupplements + " item supplements");
        }
        if (entityStatistics.countPrimaryfileSupplements) { 
            statistics.push(entityStatistics.countPrimaryfileSupplements + " primaryfile supplements");
        }
        if (entityStatistics.countWorkflowResults) { 
            statistics.push(entityStatistics.countWorkflowResults + " workflow results");
        }
        if (entityStatistics.countMgmEvaluationTests) { 
            statistics.push(entityStatistics.countMgmEvaluationTests + " evaluation test results");
        }
        if (statistics.length) {
            header = `Deleting this ${entityType} will also delelte the following associated data:`;
            question = "Do you want to continue?";
        }
        else {
            question = `Are you sure you want to delete this ${entityType}?`;
        }
        console.log("getDeleteWarnings question: " + question);
        return {header, statistics, question};
    }

    async deleteEntity(entityId, entityType) {
        return await super.delete_auth(`/${entityType}s/${entityId}`); 
    }

    async getEntityStatistics(entityId, entityType) {  
        return await super.get_auth(`/${entityType}s/${entityId}/statistics`)
            .then(result => result.data)
    }  

}
