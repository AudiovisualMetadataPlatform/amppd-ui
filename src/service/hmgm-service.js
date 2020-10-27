import BaseService from './base-service';
import {accountService} from './account-service';

const baseService = new BaseService();

async function auth_token_required(auth_string, input_file){
    if(process.env.VUE_APP_DISABLE_AUTH == 'true'){
        return false;
    }
    var validated = await accountService.validate();
    if(validated===true){
        return false;
    }
    var user_token = localStorage.getItem(input_file);
    if(!user_token){
        console.log("No input token defined")
        return true;
    }
    console.log("User token: " + user_token);
    return !auth_token_valid(auth_string, input_file, user_token);
}

async function auth_token_valid(auth_string, input_file, user_token){   
    if(process.env.VUE_APP_DISABLE_AUTH == 'true'){
        return true;
    } 
    const url = `/hmgm/authorize-editor?authString=${auth_string}&userToken=${user_token}&editorInput=${input_file}`;
    var success = await baseService.get(url).then(x=>{
        if(x.data==true){
            const token = `${input_file};;;;${user_token};;;;${auth_string}`;
            localStorage.setItem(input_file, token);
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
    return baseService.get_token_auth(url, datasetPath)
        // get data
        .then(x => x.data)
}

function saveTranscript(json, filePath, originalFilename) {
    var formData = new FormData();
    
    formData.append('data', json);
    formData.append('filePath', filePath);
    const url = `/hmgm/transcript-editor/save`;
    return baseService.post_token_auth(url, {json, filePath}, originalFilename)
        // get data
        .then(x => x.data)
}

function completeTranscript(filePath, originalFilename) {
    const url = `/hmgm/transcript-editor/complete`;
    return baseService.post_token_auth(url, {filePath:filePath},originalFilename)
        // get data
        .then(x => x.data)
}

function completeNer(resourcePath) {
    const url = `/hmgm/ner-editor/complete?resourcePath=${resourcePath}`;
    console.log("axios completeNer: url = " + url);
    console.log("axios completeNer: resourcePath = " + resourcePath);
    return baseService.post_token_auth(url, {resourcePath:resourcePath},resourcePath)
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

function resetNer(resourcePath) {
    // const url = `${BASE_URL}/hmgm/ner-editor/reset`;
    const url = `/hmgm/ner-editor/reset?resourcePath=${resourcePath}`;
    console.log("axios resetNer: url = " + url);
    console.log("axios resetNer: resourcePath = " + resourcePath);
    return baseService.post_token_auth(url,resourcePath)
    // return axios.post(url, {resourcePath:resourcePath})
        // get data
        .then(x => x.data)
}

export { getTranscript, saveTranscript, completeTranscript, completeNer, resetNer, auth_token_required, auth_token_valid }