import BaseService from "./base-service.js";

export default class ConfigPropertiesService extends BaseService {
  /***
   * To get all config properties
   * @method GET
   */

  getConfigProperties() {
    return super.get_auth(`/config`).then(result => result.data);
  }
}
