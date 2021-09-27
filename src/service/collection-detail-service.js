
import BaseService from './base-service.js';
const baseService = new BaseService();
export default class CollectionDetailsService extends BaseService{
    async getCollection(id){
            return super.get_auth(`/collections/${id}?projection=detail`)
    }

async getItemsPrimaryFiles(id){

        return super.get_auth(`/items/${id}/primaryfiles`)
}

}