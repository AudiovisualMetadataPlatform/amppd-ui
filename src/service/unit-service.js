import BaseService from './base-service.js';
const baseService = new BaseService();

export default class UnitService extends BaseService{

    /***
     * To get all unit details
     * @params num, size
     */

    async getAllUnits(num,size){
        if(num && size){
            return super.get_auth(`/units?page=${num}&size=${size}`)
        }
        else return super.get_auth('/units');
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
}