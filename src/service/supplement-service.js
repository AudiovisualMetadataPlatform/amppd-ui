import BaseService from "./base-service.js";

export default class SupplementService extends BaseService {
  /***
   * To get the supplement files
   * @params num, size
   *  @method GET
   */

//  async getSupplementFiles(num, size) {
//    if (num && size) {
//      return await super
//        .get_auth(`/supplements?page=${num}&size=${size}`)
//        .then((result) => result.data);
//    } else
//      return await super.get_auth("/supplements").then((result) => result.data);
//  }

	async getSupplementFiles() {
		return await super.get_auth("/supplements").then((result) => result.data);
	}
	
  /***
   * To add a supplemental file
   * @params entityId, formData
   */

  async addSupplement(type, id, formData) {
    return await super
      .post_auth(`/${type}s/${id}/addSupplement`, formData)
      .then((result) => result.data);
  }

  /***
   * To get a supplemental file
   * @params entityId
   */

  async getSupplement(projection, type, id) {
    if (projection) {
      return await super
        .get_auth(`/${type}s/${id}?projection=detail`)
        .then((result) => result.data);
    } else {
      return await super
        .get_auth(`/${type}s/${id}`)
        .then((result) => result.data);
    }
  }

  /***
   * To update a supplement
   * @params entityId, obj
   */

  async updateSupplement(type, id, obj) {
    return await super
      .patch_auth(`/${type}s/${id}`, obj)
      .then((result) => result.data);
  }

  /***
   * To replace a supplement file
   * @params entityId, formData
   */

  async replaceSupplementFile(type, id, fileData) {
    return await super
      .post_auth(`/${type}s/${id}/upload`, fileData)
      .then((result) => result.data);
  }

  /***
   * To move a supplement file
   * @params parentId, parentType
   */

  async moveSupplementFile(currentSupType, currentSupId, parentId, parentType) {
    return await super
      .post_auth(
        `/${currentSupType}s/${currentSupId}/move?parentId=${parentId}&parentType=${parentType}`
      )
      .then((result) => result.data);
  }
}
