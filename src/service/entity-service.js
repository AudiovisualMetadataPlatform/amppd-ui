import SharedService from './shared-service';
import UnitService from './unit-service';
import { env } from '../helpers/env'; 

const sharedService = new SharedService();
const unitService = new UnitService();

export default class EntityService {
    
    constructor() {}


    async getUnitDetails(defaultUnit, context) {
        let unitDetails = {};
        await unitService.getUnitById(defaultUnit).then(res => {
            unitDetails.response = res;
        }).catch(err => {
            self.$bvToast.toast("Unable to retrive unit details. Please try again!", context.sharedService.erorrToastConfig);
        });
        return unitDetails;
    }


    async onUpdateEntityDetails(self) {
        if (self.baseUrl === 'unit') {
            self.unitService.updateUnitDetails(self.selectedUnit.id, self.entity).then(response => {
                self.isDataChanged = false;
                self.$bvToast.toast("Unit details updated successfully.", self.sharedService.successToastConfig);
            });
        } else if (self.baseUrl === 'collection') {
            self.submitted = true;

            // Collection Validation rules
            if (!self.entity.name || !self.entity.taskManager) {

                self.$bvToast.toast("Please provide required fields!", self.sharedService.erorrToastConfig);
                return false;

            }
            if (!self.isCreatePage) {
                self.collectionService.updateCollection(self.entity).then(reponse => {
                    self.$bvToast.toast("Collection details updated successfully", self.sharedService.successToastConfig);
                    self.submitted = false;
                    self.isDataChanged = false;
                }).catch(error => {
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                    } else {
                        self.$bvToast.toast("Unable to update a collection details. Please try again!!", self.sharedService.erorrToastConfig);
                    }
                });
            } else {
                self.entity.unit = self.baseService.API_URL + `/units/${self.selectedUnit.id}`;
                self.collectionService.createCollection(self.entity).then(reponse => {
                    self.$bvToast.toast("Collection created successfully", self.sharedService.successToastConfig);
                    // self.showEdit = !self.showEdit;
                    self.submitted = false;
                    self.isDataChanged = false;
                }).catch(error => {
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                    } else {
                        self.$bvToast.toast("Unable to create a collection details. Please try again!!", self.sharedService.erorrToastConfig);
                    }
                });
            }
        } else if (self.baseUrl === 'file') {
            self.submitted = true;
            // Collection Validation rules
            if (!self.entity.name) {
                self.$bvToast.toast("Please provide required fields!", self.sharedService.erorrToastConfig);
                return false;
            }
            self.showLoader = true;
            const payload = { name: self.entity.name, description: self.entity.description };
            self.primaryFileService.updatePrimaryFile(self.entity.id, payload).then(reponse => {
                self.showLoader = false;
                self.submitted = false;
                self.$bvToast.toast("File details has been updated successfully", { title: 'Notification', appendToast: true, variant: "success", autoHideDelay: 5000 });
                self.isDataChanged = false;
            }).catch(error => {
                self.showLoader = false;
                self.submitted = false;
                if (error.response && error.response.data && error.response.data.validationErrors) {
                    const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                    errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                } else {
                    self.$bvToast.toast("File details update failed!", { title: 'Notification', appendToast: true, variant: "danger", autoHideDelay: 5000 })

                }
            });
        } else if (self.baseUrl === 'item') {
            self.submitted = true;

            // Collection Validation rules
            if (!self.entity.name) {

                self.$bvToast.toast("Please provide required fields!", self.sharedService.erorrToastConfig);
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
                    self.$bvToast.toast("Item has been added successfully", self.sharedService.successToastConfig);
                    self.entity = response;
                    self.selectedItem = response;
                    self.isDataChanged = false;
                    // self.$router.push("/collection/details");
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                    } else {
                        self.$bvToast.toast("Failed to add an Item", self.sharedService.erorrToastConfig);
                    }

                });
            } else {
                self.itemService.updateItem(self.entity).then(success => {
                    self.showLoader = false;
                    self.$bvToast.toast("Item details updated successfully", { title: 'Notification', appendToast: true, variant: "success", autoHideDelay: 5000 });
                    // self.showEdit = !self.showEdit;
                    self.submitted = false;
                    self.isDataChanged = false;
                }).catch(error => {
                    self.showLoader = false;
                    self.submitted = false;
                    if (error.response && error.response.data && error.response.data.validationErrors) {
                        const errorMessages = self.sharedService.extractErrorMessage(error.response.data.validationErrors);
                        errorMessages.map(el => self.$bvToast.toast(el, self.sharedService.erorrToastConfig));
                    } else {
                        self.$bvToast.toast("Item details update failed!", { title: 'Notification', appendToast: true, variant: "danger", autoHideDelay: 5000 });
                    }

                });
            }
        }
    }

    async getItemsConfig(self) {
        if(!self.itemConfigs.externalSources.length || !self.itemConfigs.taskManagers.length) {
            await self.itemService.getItemsConfig().then(res => {
                self.itemConfigs.externalSources = res.externalSources;
                self.itemConfigs.taskManagers = res.taskManagers;
            }).catch(err => {
                self.$bvToast.toast("Unable to retrive config details. Please try again!", self.sharedService.erorrToastConfig);
            })
        }
    }

}