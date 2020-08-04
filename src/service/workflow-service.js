
import BaseService from './base-service.js';
const baseService = new BaseService();
export default class WorkflowService extends BaseService{
    async searchFiles(searchWord, media_type){
        return await super.get_auth('/primaryfiles/search/findByItemOrFileName?keyword=' + searchWord +'&mediaType=' + media_type).then(response => response.data);  
    }

    isAudioFile(primaryfile){
        if (primaryfile.mediaType)
            return primaryfile.mediaType.startsWith('audio');
        if (primaryfile.originalFilename)
            return primaryfile.originalFilename.endsWith('.mp3') || 
                    primaryfile.originalFilename.endsWith('.wav') ||
                    primaryfile.originalFilename.endsWith('.flac');        
    } 

    // concatenate IDs of selected primaryfiles into a query string
    getSelectedPrimaryfileIds(selectedFiles){
        if (selectedFiles === null || selectedFiles.size === 0)
            return "";
        var primaryfileIds = ""; 
        for (let primaryfile of selectedFiles.values()) {
            primaryfileIds = primaryfileIds === "" ? primaryfile.id : primaryfileIds + "," + primaryfile.id;
        }
        // if (selectedFiles === null || selectedFiles.length === 0)
        //     return "";
        // var primaryfileIds = selectedFiles[0].id; 
        // for (var i=1; i < selectedFiles.length; i++) {
        //     primaryfileIds += "," + selectedFiles[i].id;
        // }
        return primaryfileIds;
    }

    listBundles() {
        return super.get_auth(`/bundles/search/findAllNamed`);
    }

    findBundle(name) {
        return super.get_auth(`/bundles/search/findNamedByCurrentUser?name=${name}`);
        //  .then(response => { 
        //     console.log("findBundle: " + response.data.id); 
        //     return response.data
        //  });
    }

    updateBundle(bundleId, description, primaryfileIds){
        return super.post_auth(`/bundles/${bundleId}/update?description=${description}&primaryfileIds=${primaryfileIds}`);
    }

    createBundle(name, description, primaryfileIds){
        return super.post_auth(`/bundles/create?name=${name}&description=${description}&primaryfileIds=${primaryfileIds}`);
    }

    submitWorkflow(selectedWorkflow, primaryfileIds){
        console.log('/jobs/submitFiles?workflowId=' + selectedWorkflow + '&primaryfileIds=' + primaryfileIds);
        return super.post_auth('/jobs/submitFiles?workflowId=' + selectedWorkflow + '&primaryfileIds=' + primaryfileIds);
    }

    createNewBundle(bundle){
        return super.post_auth('/bundles', bundle);
    }
    addPrimaryFiles(bundleId, primaryfileIds){
        return super.post_auth('/bundles/' + bundleId + '/addPrimaryfiles?primaryfileIds=' + primaryfileIds);
    }
    submitWorkflowWithBundle(selectedWorkflow, bundleId){
        return super.post_auth('/jobs/submitBundle?workflowId=' + selectedWorkflow + '&bundleId=' + bundleId);
    }

    cleanParameterName(name){
        if(!name) return "";
        var tempName = name.replace(/(_)/g, ' ');
        tempName = tempName.replace(/(^\w)|(\s+\w)/g, match => match.toUpperCase());
        return tempName;
    }    
    getWorkflows(){
        return super.get_auth('/workflows');
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