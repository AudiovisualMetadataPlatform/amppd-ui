import BaseService from './base-service';
import {accountService} from './account-service';
import { env } from "../helpers/env";

const baseService = new BaseService();

async function auth_token_required(auth_string, input_file){
    if(env.getDisableAuth() == 'true'){
        return false;
    }
    // check if the current user is logged in and the locally stored auth token is valid
    var validated = await accountService.validate();
    // if yes, no need to ask for HMGM auth string
    if(validated===true){
        return false;
    }
    // otherwise, check HMGM auth string
    var user_token = localStorage.getItem(input_file);
    if(!user_token){
        console.log("No input token defined")
        return true;
    }
    console.log("User token: " + user_token);
    return !auth_token_valid(auth_string, input_file, user_token);
}

async function auth_token_valid(auth_string, input_file, user_token){   
    if(env.getDisableAuth() == 'true'){
        console.log("Authenticated disabled: " + success);
        return true;
    } 

    // TODO the following API call to check auth string might be unnecessary, 
    // because the backend validate auth string upon any HMGM API call;
    // the purpose here might be to prevent the page from being shown beore any HMGM API call is made
    // although there should be better way to achieve that than using an extra API to check
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

    console.log("User authenticated for HMGM editor: " + success);
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
    const url = `/hmgm/transcript-editor`;
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
        .then(x => x.data)
}

function resetNer(resourcePath) {
    const url = `/hmgm/ner-editor/reset?resourcePath=${resourcePath}`;
    console.log("axios resetNer: url = " + url);
    console.log("axios resetNer: resourcePath = " + resourcePath);
    return baseService.post_token_auth(url,resourcePath)
        .then(x => x.data)
}

export { getTranscript, saveTranscript, completeTranscript, completeNer, resetNer, auth_token_required, auth_token_valid }