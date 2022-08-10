import BaseService from "./base-service.js";

export default class EvaluationService extends BaseService {
  /***
   * To get all mgm categories
   * @method GET
   */

  async getMgmCategories() {
    return super.get_auth(`/mgmCategories`);
  }
}
