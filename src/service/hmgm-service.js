import * as axios from 'axios';

const BASE_URL = process.env.VUE_APP_AMP_URL;

function getTranscript(datasetPath, reset) {

    const url = `${BASE_URL}/hmgm/transcript-editor?datasetPath=${datasetPath}&reset=${reset}`;
    return axios.get(url)
        // get data
        .then(x => x.data)
}
function saveTranscript(json, filePath) {
    var formData = new FormData();
    
    formData.append('data', json);
    formData.append('filePath', filePath);
    const url = `${BASE_URL}/hmgm/transcript-editor/save`;
    return axios.post(url, {json, filePath})
        // get data
        .then(x => x.data)
}
function completeTranscript(filePath) {
    const url = `${BASE_URL}/hmgm/transcript-editor/complete`;
    return axios.post(url, {filePath:filePath})
        // get data
        .then(x => x.data)
}

function getNer(datasetPath, reset) {

    const url = `${BASE_URL}/hmgm/ner-editor?datasetPath=${datasetPath}&reset=${reset}`;
    return axios.get(url)
        // get data
        .then(x => x.data)
}
function saveNer(json, filePath) {
    var formData = new FormData();
    
    formData.append('data', json);
    formData.append('filePath', filePath);
    const url = `${BASE_URL}/hmgm/ner-editor/save`;
    return axios.post(url, {json, filePath})
        // get data
        .then(x => x.data)
}
function completeNer(filePath) {
    const url = `${BASE_URL}/hmgm/ner-editor/complete`;
    return axios.post(url, {filePath:filePath})
        // get data
        .then(x => x.data)
}

export { getTranscript, saveTranscript, completeTranscript, getNer, saveNer, completeNer}