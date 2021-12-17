import BaseService from './base-service'
import { env } from "../helpers/env";

export default class WorkflowResultService extends BaseService{
    async getWorkflowResults(searchQuery){
        var data = await super.post_auth('/workflow-results', searchQuery).
        then(result=>{
            return result.data;
        });
        return data;
    }

    async getWorkflowFilters(){
        var data = await super.get_auth('/workflow-filters').
        then(result=>{
            return result.data;
        });
        return data;
    }

    async exportWorkflowResults(searchQuery){
        var data = await super.post_auth('/workflow-results/export', searchQuery).
        then(result=>{
            return result.data;
        });
        return data;
    }
    async setWorkflowResultFinal(id, isFinal){
        var data = await super.post_auth('/workflow-results/' + id + '?isFinal=' + isFinal, null).
        then(result=>{
            return result.data;
        });
        return data;
    }

    getSourceUrl(primaryfileId) {
        const url = `${this.API_URL}/primaryfiles/${primaryfileId}/media`;
        return url; 
    }
    getOutputUrl(id) {
        const url = `${this.API_URL}/workflow-results/${id}/output`;
        return url; 
    }
}