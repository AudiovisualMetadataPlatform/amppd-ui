
import BaseService from './base-service'
export default class WorkflowResultService extends BaseService{
    async getWorkflowResults(searchQuery){
        var data = await super.post_auth('/workflow-results',  searchQuery).
        then(result=>{
            return result.data;
        });
        console.log(data);
        return data;
    }
    async setIsFinal(id, isFinal){
        var data = await super.post_auth('/workflow-results/isfinal/' + id + '?isFinal=' + isFinal,  null).
        then(result=>{
            return result.data;
        });
        console.log(data);
        return data;
    }
}