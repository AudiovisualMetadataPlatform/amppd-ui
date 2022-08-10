import BaseService from "./base-service.js";

export default class SupplementService extends BaseService {
  /***
   * To get the supplement files
   * @params num, size
   *  @method GET
   */

  async getSupplementFiles(num, size) {
    if (num && size) {
      return await super
        .get_auth(`/supplements?page=${num}&size=${size}`)
        .then((result) => result.data);
    } else
      return await super.get_auth("/supplements").then((result) => result.data);
  }
}
