import BaseService from './base-service.js';
const baseService = new BaseService();

export default class ItemService extends BaseService{

    /***
     * To get all unit details
     * @params num, size
     */

    async getAllItems(collectionId, num,size){
        if(num && size){
            return super.get_auth(`/collections/${collectionId}/items?page=${num}&size=${size}`)
        }
        else return super.get_auth(`/collections/${collectionId}/items`);
    }

    /***
     * To get Unit details By id
     * @params id, active
     */

    async getItemById(collectionId, id, active){        
        return await super.get_auth(`/collections/${collectionId}/items/${id}`, 
           {
                active: active
           })
           .then(result => result.data)
    }
}