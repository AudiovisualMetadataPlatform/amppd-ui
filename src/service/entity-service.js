import UnitService from './unit-service';
import { env } from '../helpers/env'; 

const unitService = new UnitService();

export default class EntityService {
    
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
        if (self.baseUrl === 'unit') {
        
            // unit Validation rules
            if (!self.entity.name || !self.entity.taskManager) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }
            self.unitService.updateUnitDetails(self.selectedUnit.id, self.entity).then(response => {
                self.isDataChanged = false;
                self.$toast.success("Unit details updated successfully.", self.sharedService.toastNotificationConfig);
            });
        } else if (self.baseUrl === 'collection') {
            self.submitted = true;
            
            // Collection Validation rules
            if (!self.entity.name) {
                self.$toast.error("Please provide required fields!", self.sharedService.toastNotificationConfig);
                return false;
            }
            if (!self.isCreatePage) {
                self.collectionService.updateCollection(self.entity).then(response => {
                    self.$toast.success("Collection details updated successfully", self.sharedService.toastNotificationConfig);
                    self.submitted = false;
                    self.isDataChanged = false;
                }).catch(error => {
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to update a collection details. Please try again!!", self.sharedService.toastNotificationConfig);
                    }
                });
            } else {
                self.entity.unit = self.baseService.API_URL + `/units/${self.selectedUnit.id}`;
                self.collectionService.createCollection(self.entity).then(response => {
                    self.$toast.success("Collection created successfully", self.sharedService.toastNotificationConfig);
                    self.entity = response;
                    self.selectedCollection = response;
                    self.selectedCollection.selectedCollectionId = response.id;                    
                    self.submitted = false;
                    self.isDataChanged = false;
                    console.log("collection.id = " + self.entity.id);
                    console.log("selectedCollectionId = " + self.selectedCollection.selectedCollectionId);
                }).catch(error => {
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Unable to create a collection details. Please try again!!", self.sharedService.toastNotificationConfig);
                    }
                });
            }
        } else if (self.baseUrl === 'file') {
            self.submitted = true;
            
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
                self.$toast.success("File details has been updated successfully", self.sharedService.toastNotificationConfig);
                self.isDataChanged = false;
            }).catch(error => {
                self.showLoader = false;
                self.submitted = false;
                if (error.response && error.response.data && error.response.data.validationErrors) {
                    const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                    errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                } else {
                    self.$toast.error("File details update failed!", self.sharedService.toastNotificationConfig);
                }
            });
        } else if (self.baseUrl === 'item') {
            self.submitted = true;

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
                    self.showLoader = false;
                    self.submitted = false;
                    self.entity = response;
                    self.selectedItem = response;
                    self.selectedItem.selectedItemId = response.id;
                    self.isDataChanged = false;
                    self.$router.push("/collections/items/details");
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Failed to add an Item", self.sharedService.toastNotificationConfig);
                    }
                });
            } else {
                self.itemService.updateItem(self.entity).then(success => {
                    self.showLoader = false;
                    self.$toast.success("Item details updated successfully", self.sharedService.toastNotificationConfig);
                    self.submitted = false;
                    self.isDataChanged = false;
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$toast.error(el, self.sharedService.toastNotificationConfig));
                    } else {
                        self.$toast.error("Item details update failed!", self.sharedService.toastNotificationConfig);
                    }
                });
            }
        }
    }

}
