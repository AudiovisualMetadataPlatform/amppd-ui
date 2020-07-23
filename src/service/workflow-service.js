
import BaseService from './base-service'
export default class WorkflowService extends BaseService{
    getWorkflows(){
        return super.get_auth('/workflows');
    }
    searchFiles(searchWord){
        return super.get_auth('/primaryfiles/search/findByKeyword?keyword='+searchWord)
        .catch(e => {
          console.log(e);});
    }
    createBundle(bundle){
        return super.post_auth('/bundles', bundle);
    }
    addPrimaryFiles(bundleId, primaryfileIds){
        return super.post_auth('/bundles/' + bundleId + '/addPrimaryfiles?primaryfileIds=' + primaryfileIds);
    }
    submitWorkflow(selectedWorkflow, bundleId){
        return super.post_auth('/jobs/bundle?workflowId=' + selectedWorkflow + '&bundleId=' + bundleId);
    }
    cleanParameterName(name){
        if(!name) return "";
        var tempName = name.replace(/(_)/g, ' ');
        tempName = tempName.replace(/(^\w)|(\s+\w)/g, match => match.toUpperCase());
        return tempName;
    }
    async getWorkflowDetails(id){
        var tempParams = [];
        return await super.get_auth('/workflows/' + id).then(response=>
            {
                // Get the steps from the response
                var data = response.data.steps;

                // If we didn't get an steps, return empty list
                if(!response.data.steps) {
                    return tempParams;
                }

                // Get the node keys
                var nodeKeys = Object.keys(data);
                for(var nodeKey in nodeKeys){
                var thisNode = data[nodeKey]; 

                // Create a new node object
                var newNode = {
                    nodeId: nodeKey,
                    nodeName: this.cleanParameterName(thisNode.toolId),
                    annotation: thisNode.annotation,
                    params:[]
                };

                // Iterate over the tool inputs and add appropriate
                var toolInputKeys = Object.keys(thisNode.toolInputs);
                for(var input = 0; input < toolInputKeys.length; input++){
                    // Get the input
                    var toolInputKey = toolInputKeys[input];
                    var thisInput = thisNode.toolInputs[toolInputKey];

                    // If we don't have an input, skip it
                    if(!thisInput) continue;
                    // __class__ as far as I can tell, is an indication it is not a parameter
                    if(thisInput.__class__) continue;

                    // Add the parameter
                    newNode.params.push({
                        name: this.cleanParameterName(toolInputKey),
                        value: thisInput,
                        type: 'text'
                    });

                }
                // If we had any params, add it to the list of nodes with params
                if(newNode.params.length>0){
                    tempParams.push(newNode);
                }
            }
            return tempParams;
        });
    }
}