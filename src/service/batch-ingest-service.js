import * as axios from 'axios';

const BASE_URL = process.env.VUE_APP_AMP_URL;

function upload(formData) {
    const url = `${BASE_URL}/batch/ingest`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
}
export { upload }