
import BaseService from './base-service.js';
const baseService = new BaseService();
export default class CollectionDetailsService extends BaseService{
    async getCollection(id){
        return await super.get_auth(`/collections/${id}`)
    }
    async getCollectionItems(id){
        return await super.get_auth(`/collections/${id}/items`)
    }
    async getItemsPrimaryFiles(id){
       return await super.get_auth(`/items/${id}/primaryfiles`)
    }
}