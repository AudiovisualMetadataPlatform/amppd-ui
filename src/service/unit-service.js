import BaseService from './base-service.js';
import { env } from "../helpers/env";
const baseService = new BaseService();

export default class UnitService extends BaseService{

    /***
     * To get the list of all units accessible to current user.
     * @params num, size
     */

    async getAllUnits(num,size){
        if(num && size){
            return super.get_auth(`/permissions/units?actionType=Read&targetType=Unit&page=${num}&size=${size}`)
        }
        else return super.get_auth('/permissions/units?actionType=Read&targetType=Unit');
    }

    /***
     * To get Unit details By id
     * @params id, active
     */

    async getUnitById(id, active){        
        return await super.get_auth(`/units/${id}`, 
           {
                active: active
           })
           .then(result => result.data)
    }

    /***
     * To update unit details By id
     * @params id
     * @method Patch
     */

     async updateUnitDetails(id, data){        
        return await super.patch_auth(`/units/${id}`,data)
           .then(result => result.data)
    }

    /***
     * To get unit data statistics by id.
     * @params id
     */
    async getUnitStatistics(id) {        
        return await super.get_auth(`/units/${id}/statistics`)
            .then(result => result.data)
    }
    
}