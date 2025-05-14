import BaseService from './base-service';
import {accountService} from './account-service';
import { env } from "../helpers/env";

const baseService = new BaseService();

// User input passcode is required if authentication is turned on and no previous valid HMGM token is stored
async function auth_token_required(editorInput, authString) {
    if (env.getDisableAuth() == 'true') {
        console.log("HMGM authentication: AMP authentication disabled." );
        return false;
    }
    // check if the current user is logged in and the locally stored auth token is valid
    if (accountService.currentUserValue) {
        var validated = await accountService.validate();
        // if yes, no need to ask for HMGM auth string
        if (validated) {
            console.log("HMGM authentication: current user is logged in AMP." );
            return false;
        }
    }
    // otherwise, check HMGM auth token
    var hmgmToken = localStorage.getItem(editorInput);
    if (!hmgmToken) {
        console.log("HMGM authentication: No HMGM auth token stored. Need user to input passcode.");
        return true;
    }
    // The following API call to validate HMGM token and auth string is unnecessary in most cases, 
    // because as long as a previous HMGM token is stored for the editor input (which is unique per HMGM job), 
    // the token should always be valid, as AMPPD currently doesn't expire HMGM token.
    // Furthermore, the backend validates HMGM token upon each HMGM API call.
    // The only situation when revalidating is useful is if the HMGM editor URL provided in the task is modified 
    // with wrong auth string, or the HMGM token in local storage is somehow compromised, in which case
    // below API call can prevent the page from being shown before any HMGM API call is made.
    console.log("HMGM authentication: Found and validating stored HMGM auth token: " + hmgmToken);
    return !auth_token_valid(hmgmToken, editorInput, null, authString);
}

async function auth_token_valid(hmgmToken, editorInput, userPass, authString) {   
    let token = hmgmToken ? hmgmToken : '';
    let input = editorInput ? editorInput : '';
    let pass = userPass ? userPass : '';
    let auth = authString ? authString : '';
    const url = `/hmgm/authorize-editor?hmgmToken=${token}&editorInput=${input}&userPass=${pass}&authString=${auth}`;
    baseService.get(url).then(x => {
        if (x.data) {
            const token = x.data;
            localStorage.setItem(editorInput, token);
            console.log("HMGM authentication succeeded: token = " + token);
            return true;
        }
        else {
            console.log("HMGM authentication failed: editorInput = " + editorInput);
            return false;
        }
    }).catch(e=>{
        console.log("Error during HMGM authentication: editorInput = " + editorInput, e);
        return false;
    });

    
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