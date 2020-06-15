
import BaseService from './base-service'
export default class WorkflowService extends BaseService{
    async getDashboardResults(searchQuery){
        var data = await super.post_auth('/dashboard',  searchQuery).
        then(result=>{
            return result.data;
        });
        console.log(data);
        return data;
    }
}