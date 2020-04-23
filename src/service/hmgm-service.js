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

function completeNer(resourcePath) {
    // const url = `${BASE_URL}/hmgm/ner-editor/complete`;
    const url = `${BASE_URL}/hmgm/ner-editor/complete?resourcePath=${resourcePath}`;
    console.log("axios completeNer: url = " + url);
    console.log("axios completeNer: resourcePath = " + resourcePath);
    return axios.post(url, {resourcePath:resourcePath})
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

function resetNer(resourcePath) {
    // const url = `${BASE_URL}/hmgm/ner-editor/reset`;
    const url = `${BASE_URL}/hmgm/ner-editor/reset?resourcePath=${resourcePath}`;
    console.log("axios resetNer: url = " + url);
    console.log("axios resetNer: resourcePath = " + resourcePath);
    return axios.post(url)
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

export { getTranscript, saveTranscript, completeTranscript, completeNer, resetNer }