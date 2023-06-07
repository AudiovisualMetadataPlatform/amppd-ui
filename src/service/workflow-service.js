
import BaseService from './base-service.js';
export default class WorkflowService extends BaseService {
    async searchFiles(searchWord, mime_type) {
        return await super.get_auth('/primaryfiles/search/findByKeywordMediaType?keyword=' + encodeURIComponent(searchWord) + '&mediaType=' + mime_type).then(response => response.data);
    }

    async searchIntermediateFiles(searchWord, outputTypes) {
        return await super
            .get_auth(
                // '/workflow-results/intermediate/primaryfiles?outputTypes=transcript,segment&mediaType=av&keyword=MW'
                "/workflow-results/intermediate/primaryfiles?outputTypes=" + outputTypes + "&keyword=" + encodeURIComponent(searchWord)
            ).then((response) => response.data);
    }

    async getCompleteWorkflowResultsForPrimaryfileOutputTypes(outputTypes, primaryfileId) {
        return await super
            .get_auth(
                "/workflow-results/intermediate/outputs?outputTypes=" + outputTypes + "&primaryfileId=" + primaryfileId
            ).then((response) => response.data);
    }

    isAudioFile(primaryfile) {
        if (primaryfile.mediaType) return primaryfile.mediaType.startsWith("audio");
        else if (primaryfile.mimeType)
            return primaryfile.mimeType.startsWith("audio");
        else if (primaryfile.originalFilename)
            return (
                primaryfile.originalFilename.endsWith(".mp3") ||
                primaryfile.originalFilename.endsWith(".wav") ||
                primaryfile.originalFilename.endsWith(".flac")
            );
    }

    // concatenate IDs of selected primaryfiles into a query string
    getSelectedPrimaryfileIds(selectedFiles, emptyPFileIndexes) {
        if (selectedFiles === null || selectedFiles.size === 0)
            return "";
        if (emptyPFileIndexes) {
            let primaryfileIds = "";
            const sortedEmptyIndexes = Array.from(emptyPFileIndexes).sort(
                (a, b) => a - b
            );
            const selectedFilesList = Array.from(selectedFiles.values());
            const files = selectedFilesList.filter((file, index) => {
                let isFound = false;
                for (let i = 0; i < sortedEmptyIndexes.length; i++) {
                    if (index === sortedEmptyIndexes[i]) {
                        isFound = true;
                        break;
                    } else {
                        isFound = false;
                    }
                }
                return !isFound;
            })
            for (let primaryfile of files) {
                primaryfileIds = primaryfileIds === "" ? primaryfile.id : primaryfileIds + "," + primaryfile.id;
            }
            return primaryfileIds;
        } else {
            let primaryfileIds = "";
            for (let primaryfile of selectedFiles.values()) {
                primaryfileIds = primaryfileIds === "" ? primaryfile.id : primaryfileIds + "," + primaryfile.id;
            }
            return primaryfileIds;
        }
    }

    listBundles() {
        return super.get_auth(`/bundles/search/findAllNamed`);
    }

    findBundle(name) {
        return super.get_auth(`/bundles/search/findNamedByCurrentUser?name=${name}`);
    }

    updateBundle(bundleId, description, primaryfileIds) {
        return super.post_auth(`/bundles/${bundleId}/update?description=${description}&primaryfileIds=${primaryfileIds}`);
    }

    createBundle(name, description, primaryfileIds) {
        return super.post_auth(`/bundles/create?name=${name}&description=${description}&primaryfileIds=${primaryfileIds}`);
    }

    getSupplementsForPrimaryfiles(primaryfileIds, name, category, format) {
        return super.get_auth('/primaryfiles/supplements?primaryfileIds=' + primaryfileIds + '&category=' + category + '&format=' + format);
    }

    submitWorkflow(selectedWorkflow, ids, isIntermediary = false, body = null) {
        if (isIntermediary)
            return super.post_auth('/jobs/submitResults?workflowId=' + selectedWorkflow + '&resultIdss=' + ids + '&resultIdss=');
        else
            return super.post_auth('/jobs/submitFiles?workflowId=' + selectedWorkflow + '&primaryfileIds=' + ids, body);
    }

    cleanParameterName(name) {
        if (!name) return "";
        var tempName = name.replace(/(_)/g, ' ');
        tempName = tempName.replace(/(^\w)|(\s+\w)/g, match => match.toUpperCase());
        return tempName;
    }
    getWorkflows() {
        return super.get_auth('/workflows?showPublished=true');
    }

    getAllWorkflows() {
        return super.get_auth('/workflows');
    }

    getFilteredWorkflows(name, creator, dateRange, annotations, tags) {
        return super.get_auth(`/workflows?name=${name}&creator=${creator}&dateRange=${dateRange}&annotations=${annotations}&tags=${tags}`);
    }

    async getWorkflowDetails(id) {
        var tempParams = [];
        return await super.get_auth('/workflows/' + id).then(response => {
            // Get the steps from the response
            var data = response.data.steps;

            // If we didn't get an steps, return empty list
            if (!response.data.steps) {
                return tempParams;
            }

            // Get the node keys
            var nodeKeys = Object.keys(data);
            for (var nodeKey in nodeKeys) {
                var thisNode = data[nodeKey];

                // Create a new node object
                var newNode = {
                    nodeId: nodeKey,
                    node_id: thisNode.toolId,
                    nodeName: this.cleanParameterName(thisNode.toolName),
                    annotation: thisNode.annotation,
                    params: []
                };

                // Iterate over the tool inputs and add appropriate
                var toolInputKeys = Object.keys(thisNode.toolInputs);
                for (var input = 0; input < toolInputKeys.length; input++) {
                    // Get the input
                    var toolInputKey = toolInputKeys[input];
                    var thisInput = thisNode.toolInputs[toolInputKey];

                    // If we don't have an input, skip it
                    if (!thisInput) continue;
                    // __class__ as far as I can tell, is an indication it is not a parameter
                    if (thisInput.__class__) continue;

                    // Add the parameter
                    newNode.params.push({
                        name: this.cleanParameterName(toolInputKey),
                        value: thisInput,
                        type: 'text'
                    });

                }
                // If we had any params, add it to the list of nodes with params
                if (newNode.params.length > 0) {
                    tempParams.push(newNode);
                }
            }
            return { tempParams: tempParams, response: response.data };
        });
    }

    async getEditorStartStatus(workflowId) {
        return super.post_auth(`/workflows/${workflowId}/editStart`);
    }

    async getEditorEndStatus(workflowId) {
        return super.post_auth(`/workflows/${workflowId}/editEnd`);
    }

    async createNewWorkflow() {
        return super.post_auth('/workflows/create');
    }
}