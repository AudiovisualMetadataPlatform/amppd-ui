
import BaseService from './base-service.js';
const baseService = new BaseService();
export default class CollectionService extends BaseService{
    async getCollectionPage(num,size){
        if(num && size){
            return super.get_auth(`/collections?page=${num}&size=${size}`)
        }
        else return super.get_auth('/collections');
    }
    async activateCollection(id, active){        
        // return await super.post_auth(`/collections/${id}/activate?active=${active}`).then(result => result.data)
        return await super.patch_auth(`/collections/${id}`, 
           {
                active: active
           })
           .then(result => result.data)
    }
}