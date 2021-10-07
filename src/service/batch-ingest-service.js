import BaseService from './base-service';
import { env } from "../helpers/env";

const BASE_URL = env.getAmpUrl();
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