import BaseService from './base-service';

const baseService = new BaseService();

function auth_token_required(auth_string, input_file){
    var user_token = localStorage.getItem(input_file);
    if(!user_token){
        console.log("No input token defined")
        return true;
    }
    console.log("User token: " + user_token);
    return !auth_token_valid(auth_string, input_file, user_token);
}

async function auth_token_valid(auth_string, input_file, user_token){    
    const url = `/hmgm/authorize-editor?authString=${auth_string}&userToken=${user_token}&editorInput=${input_file}`;
    var success = await baseService.get_auth(url).then(x=>{
        if(x.data==true){
            localStorage.setItem(input_file, user_token);
        }
        return x.data;
    }).catch(e=>{
        console.log("Error: " + e);
        return false;
    });
    console.log("Success: " + success);

    return success;
}

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

export { getTranscript, saveTranscript, completeTranscript, completeNer, resetNer, auth_token_required, auth_token_valid }