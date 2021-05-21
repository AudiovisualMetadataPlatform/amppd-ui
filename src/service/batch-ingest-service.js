import BaseService from './base-service';

const BASE_URL = process.env.VUE_APP_AMP_URL;
const baseService = new BaseService();
function upload(formData) {
    const url = `/batch/ingest`;
    return baseService.post_auth(url, formData).then(x => x.data);
}
function downloadFile(fileName){
    const url = `/`+fileName;
    return baseService.get_auth(url).then(x => x.data); 
}

export { upload,downloadFile }