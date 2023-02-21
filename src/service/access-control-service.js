import { env } from "@/helpers/env";
import BaseService from "./base-service.js";

export default class AccessControlService extends BaseService {
  async getHasPermission(actionType, targetType, unitId) {
    return super.get_auth(
      `/permissions/has?actionType=${actionType}&targetType=${targetType}&unitId=${unitId}`
    );
  }

  async hasPermission(action_type, target_type) {
    const actionType = env.getEnv(action_type);
    const targetType = env.getEnv(target_type);
    let unitId;
    let uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    if (uEntity && uEntity.currentUnit) {
      unitId = uEntity.unitList.filter(
        (unit) => unit.id === uEntity.currentUnit
      )[0].id;
    }
    // console.log(actionType, targetType, unitId)
    if (unitId) {
      let permission = await this.getHasPermission(
        actionType,
        targetType,
        unitId
      );
      return permission.data;
    }
  }

  async checkAccessControl(instance) {
    const self = instance;
    try {
      self.showLoader = true;
      self.accessControl._nav._ingestBatch = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_EXECUTE",
        "VUE_APP_AC_TARGETTYPE_BATCH"
      );
      self.accessControl._unit._create = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_CREATE",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._unit._read = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_READ",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._unit._list = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_LIST",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._unit._update = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_UPDATE",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._unit._delete = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_DELETE",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._collection._create = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_CREATE",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.accessControl._collection._read = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_READ",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.accessControl._collection._list = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_LIST",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.accessControl._collection._update = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_UPDATE",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.accessControl._collection._activate = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_ACTIVATE",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.accessControl._collection._delete = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_DELETE",
        "VUE_APP_AC_TARGETTYPE_COLLECTION"
      );
      self.showLoader = false;
    } catch (error) {
      self.showLoader = false;
      self.$bvToast.toast(
        "Oops! Something went wrong.",
        self.sharedService.erorrToastConfig
      );
      console.error(error.message);
    }
  }
}
