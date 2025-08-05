import { requestOptions } from "../helpers/request-options";
import axios from 'axios';
import { accountService } from '@/service/account-service';
import { env } from "../helpers/env";
import router  from "../router";

  
export default class BaseService{
    constructor() {
        this.API_URL = env.getAmpUrl();
        this.axiosInstance = axios.create({});
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            error => this.errorHandler(error)
          )
    }

    errorHandler(error) {
        // only redirect to login for timeout requests, not for user login request
        if ([401, 403].indexOf(error.status) !== -1 && accountService.currentUser) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            let path = location.hash.substring(1);
            accountService.logout();
            // original code reloads current location, which causes browser reload homepage instead of login page;
            // better solution would be redirecting to login page with return URL of current page
            // location.reload(true);
            console.log("base-service.errorHandler: upon login timeout, location = " + path);
            router.push({ path: "/account/login", query: { returnUrl: path }});
            // TODO below is an attempt to avoid error toast message upon timeout,
            // but it doesn't work, instead it will result in no timeout and no redirect to login
            // return Promise.accept(error);
        }
        else {
            return Promise.reject(error);
        }
    }

    get(url){
        return this.axiosInstance.get(this.API_URL + url);
    }

    get_auth(url){
        return this.axiosInstance.get(this.API_URL + url, requestOptions.get());
    }

    get_token_auth(url, input_dataset){
        return this.axiosInstance.get(this.API_URL + url, requestOptions.getToken(input_dataset));
    }   
    
    post(url, body){
        console.log("BaseService: sending post to " + this.API_URL + url);
        return this.axiosInstance.post(this.API_URL + url, body);
    }

    post_auth(url, body){
        let isForm = body instanceof FormData;
        let isFormStr = isForm ? " for multi-part-form data" : "";
        console.log("BaseService: sending post" + isFormStr + " to " + this.API_URL + url);
        return this.axiosInstance.post(this.API_URL + url, body, requestOptions.post(isForm));
    }

    post_token_auth(url, body, input_dataset){
        console.log("BaseService: sending post to " + this.API_URL + url);
        return this.axiosInstance.post(this.API_URL + url, body, requestOptions.postToken(input_dataset));
    }

    patch_auth(url, body){
        console.log("BaseService: sending patch to " + this.API_URL + url);
        return this.axiosInstance.patch(this.API_URL + url, body, requestOptions.patch());
    }

    delete_auth(url, body){
        console.log("BaseService: sending delete to " + this.API_URL + url);
        return this.axiosInstance.delete(this.API_URL + url, requestOptions.delete());
    }

}