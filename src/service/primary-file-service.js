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

    /***
     * To update a  primary file details
     * @params primaryfileid, postobj
     */

     async updatePrimaryFile(itemId, postObj){
        return await super.patch_auth(`/items/${itemId}/primaryfiles/${postObj.id}`); 
    }


    
}