import BaseService from './base-service.js';
const baseService = new BaseService();

export default class ItemService extends BaseService{

    /***
     * To get all item details based on collection id
     * @params num, size
     */

    async getCollectionItems(collectionId, num,size){
        if(num && size){
            return await super.get_auth(`/collections/${collectionId}/items?page=${num}&size=${size}`)
        }
        else return await super.get_auth(`/collections/${collectionId}/items`);
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

    /***
     * To add a item to a collection
     * @params obj
     */

     async addItemToCollection(obj){        
        return await super.post_auth(`/items`, obj).then(result => result.data)
    }

    /***
     * To update a item
     * @params obj, id
     */

     async updateItem(obj){    
        return await super.patch_auth(`/items/${obj.id}`, obj).then(result => result.data)
    }

    /***
     * To get details of a item
     * @params itemId
     */

    async getItemDetails(itemId){        
        return await super.get_auth(`/items/${itemId}`).then(result => result.data)
    }

    /***
     * To search items by keyword
     * @params keyword
     */

    async searchItemsByKeyword(keyword){        
        return await super.get_auth(`/items/search?keyword=${keyword}`).then(result => result.data)
    }

    /***
     * To get item data statistics by id.
     * @params id
     */
    async getItemStatistics(id) {        
        return await super.get_auth(`/items/${id}/statistics`)
            .then(result => result.data)
    }

}