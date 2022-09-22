import BaseService from "./base-service.js";

export default class EvaluationService extends BaseService {
  /***
   * To get all mgm categories
   * @method GET
   */

  async getMgmCategories() {
    return super.get_auth(`/mgmCategories`);
  }

  /***
   * To get details of a mgm category
   * @method GET
   */

  async getDetailsMgmCategory(id) {
    return super.get_auth(`/mgmCategories/${id}?projection=detail`);
  }

  /***
   * To get details of a mgm scoring tool
   * @method GET
   */

  async getDetailsMgmScoringTool(id) {
    return super.get_auth(`/mgmScoringTools/${id}?projection=detail`);
  }
}
