
import BaseService from './base-service'
export default class WorkflowResultService extends BaseService{
    async getWorkflowResults(searchQuery){
        var data = await super.post_auth('/workflow-results',  searchQuery).
        then(result=>{
            return result.data;
        });
        return data;
    }
    async setIsFinal(id, isFinal){
        var data = await super.post_auth('/workflow-results/isfinal/' + id + '?isFinal=' + isFinal,  null).
        then(result=>{
            return result.data;
        });
        return data;
    }

    getSourceUrl(primaryfileId) {
        const BASE_URL = process.env.VUE_APP_AMP_URL;
        const url = `${BASE_URL}/primaryfiles/${primaryfileId}/media`;
        return url; 
    }
    getOutputUrl(id) {
        const BASE_URL = process.env.VUE_APP_AMP_URL;
        const url = `${BASE_URL}/workflow-results/${id}/output`;
        return url; 
    }
}