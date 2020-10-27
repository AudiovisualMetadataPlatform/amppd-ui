
import BaseService from './base-service'
export default class WorkflowResultService extends BaseService{
    async getWorkflowResults(searchQuery){
        var data = await super.post_auth('/dashboard',  searchQuery).
        then(result=>{
            return result.data;
        });
        console.log(data);
        return data;
    }
    async setIsFinal(id, isFinal){
        var data = await super.post_auth('/dashboard/isfinal/' + id + '?isFinal=' + isFinal,  null).
        then(result=>{
            return result.data;
        });
        console.log(data);
        return data;
    }
}