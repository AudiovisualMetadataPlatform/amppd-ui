import BaseService from './base-service.js';
const baseService = new BaseService();

export default class PrimaryFileService extends BaseService{

    /***
     * To get all primary file details
     * @params itemId
     */

    async getPrimaryFiles(itemId){
        return await super.get_auth(`/items/${itemId}/primaryfiles`); 
    }

    
}