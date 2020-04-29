class BaseService{
    API_URL = process.env.VUE_APP_AMP_URL;
    constructor(){
    }
    get(url){
        return axios.get( API_URL+ url)
    }
    post(url, body){

    }
}