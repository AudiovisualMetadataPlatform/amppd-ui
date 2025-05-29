import BaseService from "./base-service.js";
const baseService = new BaseService();

export default class PrimaryFileService extends BaseService {
  /***
   * To get a content file details
   * @params primaryfileid
   */
  async getPrimaryFile(id) {
    let response = await super.get_auth(`/primaryfiles/${id}`);
    return response.data;
  }

  /***
   * To get all content file details
   * @params itemId
   */
  async getPrimaryFiles(itemId) {
    return await super.get_auth(`/items/${itemId}/primaryfiles`);
  }

  /***
   * To update a  content file details
   * @params primaryfileid, postobj
   */
  async updatePrimaryFile(id, postObj) {
    return await super.patch_auth(`/primaryfiles/${id}`, postObj);
  }

  /***
   * To upload a file
   * @params primaryfileid, formData
   */
  async uploadFile(id, formData) {
    // return await super.post_auth(`/primaryfiles/${id}/upload`, formData);
    return await super.post_auth(`/items/${id}/addPrimaryfile`, formData);
  }

  /***
   * To delete a primaryfile
   * @params primaryfile id
   */
  async deletePrimaryFile(id) {
    return await super.delete_auth(`/primaryfiles/${id}`);
  }

  /***
   * To get primaryFile data statistics by id.
   * @params id
   */
  async getPrimaryfileStatistics(id) {        
    return await super.get_auth(`/primaryfiles/${id}/statistics`)
        .then(result => result.data)
  }  

}
