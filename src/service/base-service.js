import { requestOptions } from "../helpers/request-options";
import axios from 'axios';

export default class BaseService{
    constructor(){
        this.API_URL = process.env.VUE_APP_AMP_URL;
    }
    get_auth(url){
        console.log("sending get via base service");
        return axios.get(this.API_URL+ url, requestOptions.get());
    }
    
    post_auth(url, body){
        console.log("sending post via base service");
        return axios.post(this.API_URL+ url,body, requestOptions.post());
    }
}