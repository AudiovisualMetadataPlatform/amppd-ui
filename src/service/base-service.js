import { requestOptions } from "../helpers/request-options";
import axios from 'axios';
import {handleResponse} from "../helpers/handle-response";
import { accountService } from '@/service/account-service';
const axiosInstance = axios.create({
  });
  
  
export default class BaseService{
    constructor(){
        this.API_URL = process.env.VUE_APP_AMP_URL;
        this.axiosInstance = axios.create({});
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            error => this.errorHandler(error)
          )
    }
    successHandler(response){
        return response;
    }
    errorHandler(error) {
        if ([401, 403].indexOf(error.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            accountService.logout();
            location.reload(true);
        }

        return Promise.reject(error);
    }
    get_auth(url){
        
        return this.axiosInstance.get(this.API_URL+ url, requestOptions.get());
    }
    
    post_auth(url, body){
        console.log("sending post via base service");
        return this.axiosInstance.post(this.API_URL+ url,body, requestOptions.post());
    }
    post(url, body){
        console.log("sending post via base service");
        return this.axiosInstance.post(this.API_URL+ url,body);
    }
}