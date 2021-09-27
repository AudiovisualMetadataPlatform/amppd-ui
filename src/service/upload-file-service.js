import BaseService from './base-service';

const BASE_URL = process.env.VUE_APP_AMP_URL;
const baseService = new BaseService();


export default class UploadFilesService extends BaseService {
   
    upload(file, onUploadProgress) {
        const url = `/primaryfiles`;
      let formData = new FormData();
      formData.append("file", file);
      return   super.post_auth(url, formData);
    }
    getFiles() {
      return super.get_auth("/files");
    }
  }
  