import { env } from "@/helpers/env";
import BaseService from "./base-service.js";

export default class AccessControlService extends BaseService {
  async getHasPermission(actionType, targetType, unitId) {
    return super.get_auth(
      `/permissions/has?actionType=${actionType}&targetType=${targetType}&unitId=${unitId}`
    );
  }

  async getPermissionsUnits(actionType, targetType) {
    return super.get_auth(`/permissions/units?actionType=${actionType}&targetType=${targetType}`);
  }

  async getPermittedActions(unitId) {
    return super.get_auth(
      `/permissions/actions?unitIds=${unitId ? unitId : ""}`
    );
  }

  async getIsAdmin() {
    return super.get_auth(`/roleAssignments/isAdmin`);
  }

  async findActiveUsersByNameStartingIdsExcluding(keyword, idsExcluding) {
    return super.get_auth(
      `/users/active?nameStarting=${keyword}&idsExcluding=${idsExcluding}`
    );
  }

  async retrieveRoleAssignments(unitId) {
    return super.get_auth(`/roleAssignments?unitId=${unitId}`);
  }

  async updateRoleAssignments(unitId, body) {
    return await super
      .post_auth(`/roleAssignments?unitId=${unitId}`, body)
      .then((result) => result.data);
  }

  async retrieveRoleActionConfig(unitId) {
    return super.get_auth(`/roles/config?unitId=${unitId}`);
  }

  /* async hasPermission(action_type, target_type) {
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
      self.accessControl._unit._update = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_UPDATE",
        "VUE_APP_AC_TARGETTYPE_UNIT"
      );
      self.accessControl._collection._create = await this.hasPermission(
        "VUE_APP_AC_ACTIONTYPE_CREATE",
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
  } */

  async getGlobalPermission(instance, target, action) {
    const self = instance;
    const result = self.accessControl.permittedActions.find(({ actions }) =>
      actions.find(
        ({ targetType, actionType }) =>
          targetType === target && actionType === action
      )
    );
    return !!result;
  }

  async permittedActions(instance) {
    const self = instance;
    this.getPermittedActions().then(
      (res) => (self.accessControl.permittedActions = res.data)
    );
    let unitId;
    let uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    if (uEntity && uEntity.currentUnit) {
      unitId = uEntity.unitList.filter(
        (unit) => unit.id === uEntity.currentUnit
      )[0].id;
    }
    if (unitId) {
      let permission = await this.getPermittedActions(unitId);
      return permission.data;
    }
  }

  async isAdmin(instance) {
    const self = instance;
    try {
      let adminResponse = await this.getIsAdmin();
      if (adminResponse.data) {
        // Permissions for Admin User
        self.accessControl.permittedActions = [];
        self.accessControl._isAdmin = true;
        self.accessControl._unit._create = true;
        self.accessControl._unit._read = true;
        self.accessControl._unit._update = true;
        self.accessControl._unit._delete = true;
        self.accessControl._collection._create = true;
        self.accessControl._collection._read = true;
        self.accessControl._collection._update = true;
        self.accessControl._collection._activate = true;
        self.accessControl._collection._delete = true;
        self.accessControl._item._create = true;
        self.accessControl._item._read = true;
        self.accessControl._item._update = true;
        self.accessControl._item._delete = true;
        self.accessControl._primaryfile._create = true;
        self.accessControl._primaryfile._read = true;
        self.accessControl._primaryfile._update = true;
        self.accessControl._primaryfile._delete = true;
        self.accessControl._primaryfilemedia._read = true;
        self.accessControl._supplement._create = true;
        self.accessControl._supplement._read = true;
        self.accessControl._supplement._update = true;
        self.accessControl._supplement._move = true;
        self.accessControl._supplement._delete = true;
        self.accessControl._workflowresult._create = true;
        self.accessControl._workflowresult._read = true;
        self.accessControl._workflowresult._export = true;
        self.accessControl._workflowresult._update = true;
        self.accessControl._workflowresult._delete = true;
        self.accessControl._workflowresult_restricted._create = true;
        self.accessControl._workflow._create = true;
        self.accessControl._workflow._read = true;
        self.accessControl._workflow._update = true;
        self.accessControl._workflow._restrict = true;
        self.accessControl._workflow._delete = true;
        self.accessControl._nav._ingestBatch = true;
      } else {
        self.accessControl._isAdmin = false;
        self.accessControl._unit._create = false;
        self.accessControl._unit._read = false;
        self.accessControl._unit._update = false;
        self.accessControl._unit._delete = false;
        self.accessControl._collection._create = false;
        self.accessControl._collection._read = false;
        self.accessControl._collection._update = false;
        self.accessControl._collection._activate = false;
        self.accessControl._collection._delete = false;
        self.accessControl._item._create = false;
        self.accessControl._item._read = false;
        self.accessControl._item._update = false;
        self.accessControl._item._delete = false;
        self.accessControl._primaryfile._create = false;
        self.accessControl._primaryfile._read = false;
        self.accessControl._primaryfile._update = false;
        self.accessControl._primaryfile._delete = false;
        self.accessControl._primaryfilemedia._read = false;
        self.accessControl._supplement._create = await this.getGlobalPermission(
          self,
          env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT"),
          env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE")
        );
        self.accessControl._supplement._read = false;
        self.accessControl._supplement._update = false;
        self.accessControl._supplement._move = false;
        self.accessControl._supplement._delete = false;
        self.accessControl._workflowresult._create = false;
        self.accessControl._workflowresult._read = false;
        self.accessControl._workflowresult._export = false;
        self.accessControl._workflowresult._update = false;
        self.accessControl._workflowresult._delete = false;
        self.accessControl._workflowresult_restricted._create = false;
        self.accessControl._workflow._create = await this.getGlobalPermission(
          self,
          env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW"),
          env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE")
        );
        self.accessControl._workflow._read = false;
        self.accessControl._workflow._update = await this.getGlobalPermission(
          self,
          env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW"),
          env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE")
        );
        self.accessControl._workflow._restrict = false;
        self.accessControl._workflow._delete = false;
        self.accessControl._nav._ingestBatch = false; //default value is true
      }
    } catch (error) {
      self.showLoader = false;
      self.$bvToast.toast(
        "Oops! Something went wrong.",
        self.sharedService.erorrToastConfig
      );
      console.error(error);
    }
  }

  async checkAccessControl(instance) {
    const self = instance;
    try {
      self.showLoader = true;
      await this.isAdmin(self);
      if (!self.accessControl._isAdmin) {
        // Permissions for Non-admin User
        let allPermissions = await this.permittedActions(self);
        let actions = allPermissions[0].actions;
        for (let i = 0; i < actions.length; i++) {
          const action = actions[i];
          if (action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_UNIT")) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._unit._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._unit._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._unit._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._unit._delete = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_COLLECTION")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._collection._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._collection._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._collection._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_ACTIVATE"):
                self.accessControl._collection._activate = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._collection._delete = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_ITEM")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._item._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._item._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._item._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._item._delete = true;
                break;
            }
          } else if (
            action.targetType ===
            env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._primaryfile._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._primaryfile._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._primaryfile._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._primaryfile._delete = true;
                break;
            }
          } else if (
            action.targetType ===
            env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE_MEDIA")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._primaryfilemedia._read = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_SUPPLEMENT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._supplement._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._supplement._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._supplement._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_MOVE"):
                self.accessControl._supplement._move = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._supplement._delete = true;
                break;
            }
          } else if (
            action.targetType ===
            env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._workflowresult._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._workflowresult._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_EXPORT"):
                self.accessControl._workflowresult._export = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._workflowresult._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._workflowresult._delete = true;
                break;
            }
          } else if (
            action.targetType ===
            env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT_RESTRICTED")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._workflowresult_restricted._create = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOW")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._workflow._create = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._workflow._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._workflow._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_RESTRICT"):
                self.accessControl._workflow._restrict = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._workflow._delete = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_BATCH")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_EXECUTE"):
                self.accessControl._nav._ingestBatch = true;
                break;
            }
          }
        }
      }
      self.showLoader = false;
    } catch (error) {
      self.showLoader = false;
      self.$bvToast.toast(
        "Oops! Something went wrong.",
        self.sharedService.erorrToastConfig
      );
      console.error(error);
    }
  }
}
