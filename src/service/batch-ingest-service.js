import BaseService from './base-service';

const BASE_URL = process.env.VUE_APP_AMP_URL;
const baseService = new BaseService();
function upload(formData) {
    const url = `${BASE_URL}/batch/ingest`;
    return baseService.post_auth(url, formData).then(x => x.data);
}
export { upload }