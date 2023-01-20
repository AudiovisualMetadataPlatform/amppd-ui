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

  /***
   * To get details of the parameters of a mgm scoring tool
   * @method GET
   */

  async getDetailParametersMgmScoringTool(id) {
    return super.get_auth(
      `/mgmScoringTools/${id}/parameters?projection=detail`
    );
  }

  /***
   * To get all the MGM Evaluation test results
   * @method POST
   */

  async getMgmEvaluationTestResults(searchQuery) {
    var data = await super
      .post_auth("/mgm-evaluation-test/query", searchQuery)
      .then((result) => {
        return result.data;
      });
    return data;
  }

  /***
   * To submit a MGM new test
   * @method POST
   */

  async mgmSubmitNewTest(body) {
    var data = await super
      .post_auth("/mgm-evaluation-test/new", body)
      .then((result) => {
        return result.data;
      });
    return data;
  }

  /***
   * To get details of mgm review output
   * @method GET
   */

  async getMgmReviewOutput(ids) {
    return super.get_auth(
      `/mgmEvaluationTests/search/findByIds?ids=${ids}&projection=detail`
    );
  }

  // To download any file by it's name
  downloadFile(fileName) {
    const url = `/` + fileName;
    return super.get_auth(url).then((x) => x.data);
  }
}
