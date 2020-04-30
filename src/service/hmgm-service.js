import BaseService from './base-service';

const baseService = new BaseService();
function getTranscript(datasetPath, reset) {

    const url = `/hmgm/transcript-editor?datasetPath=${datasetPath}&reset=${reset}`;
    return baseService.get_auth(url)
        // get data
        .then(x => x.data)
}

function saveTranscript(json, filePath) {
    var formData = new FormData();
    
    formData.append('data', json);
    formData.append('filePath', filePath);
    const url = `/hmgm/transcript-editor/save`;
    return baseService.post_auth(url, {json, filePath})
        // get data
        .then(x => x.data)
}

function completeTranscript(filePath) {
    const url = `/hmgm/transcript-editor/complete`;
    return baseService.post_auth(url, {filePath:filePath})
        // get data
        .then(x => x.data)
}

function completeNer(resourcePath) {
    const url = `/hmgm/ner-editor/complete?resourcePath=${resourcePath}`;
    console.log("axios completeNer: url = " + url);
    console.log("axios completeNer: resourcePath = " + resourcePath);
    return baseService.post_auth(url, {resourcePath:resourcePath})
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

function resetNer(resourcePath) {
    // const url = `${BASE_URL}/hmgm/ner-editor/reset`;
    const url = `/hmgm/ner-editor/reset?resourcePath=${resourcePath}`;
    console.log("axios resetNer: url = " + url);
    console.log("axios resetNer: resourcePath = " + resourcePath);
    return baseService.post_auth(url)
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

export { getTranscript, saveTranscript, completeTranscript, completeNer, resetNer }