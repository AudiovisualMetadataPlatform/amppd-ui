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

  async getPermittedActions() {
    return super.get_auth(
      '/permissions/actions?actionTypes=&targetTypes=&unitIds='
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

  async updateRoleActionConfig(unitId, body) {
    return await super
    .post_auth(`/roles/config?unitId=${unitId}`, body)
    .then((result) => result.data);
  }

  // return permitted actions within current unit (if populated); this is only called after AC data has been initialized
  permittedActions(instance) {
    const self = instance;
    let unitId;
    let uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));
    if (uEntity && uEntity.currentUnit) {
      unitId = uEntity.unitList.filter(
        (unit) => unit.id === uEntity.currentUnit
      )[0].id;
    }
    if (unitId) {
      return self.acUnitsActions.filter((ua) => ua.unitId === unitId)[0].actions;
    }
  }

  // call admin API and initialize acIsAdmin along with default permissions for current unit based on acIsAdmin
  async isAdmin(instance) {
    const self = instance;
    try {
      let adminResponse = await this.getIsAdmin();
      self.acIsAdmin = adminResponse.data;
      if (self.acIsAdmin) {
        // Permissions for Admin User
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
        self.accessControl._primaryfile_media._read = true;
        self.accessControl._supplement._create = true;
        self.accessControl._supplement._read = true;
        self.accessControl._supplement._update = true;
        self.accessControl._supplement._move = true;
        self.accessControl._supplement._delete = true;
        self.accessControl._workflowresult._create = true;
        self.accessControl._workflowresult._read = true;
        self.accessControl._workflowresult._update = true;
        self.accessControl._workflowresult._delete = true;
        self.accessControl._workflowresult_output._read = true;
        self.accessControl._workflowresult_restricted._create = true;
        self.accessControl._role._read = true;
        self.accessControl._role._update = true;
        self.accessControl._role_unit._update = true;
        self.accessControl._roleassignment._read = true;
        self.accessControl._roleassignment._update = true;
      } else {
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
        self.accessControl._primaryfile_media._read = false;
        self.accessControl._supplement._create = false;
        self.accessControl._supplement._read = false;
        self.accessControl._supplement._update = false;
        self.accessControl._supplement._move = false;
        self.accessControl._supplement._delete = false;
        self.accessControl._workflowresult._create = false;
        self.accessControl._workflowresult._read = false;
        self.accessControl._workflowresult._update = false;
        self.accessControl._workflowresult._delete = false;
        self.accessControl._workflowresult_output._read = false;
        self.accessControl._workflowresult_restricted._create = false;
        self.accessControl._role._read = false;
        self.accessControl._role._update = false;
        self.accessControl._role_unit._update = false;
        self.accessControl._roleassignment._read = false;
        self.accessControl._roleassignment._update = false;        
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

  // populate permissions for current unit (selected in Content Navigation) for non-admin user
  // note that batch/workflow etc are not handled here because they are not tied to current unit
  async checkAccessControl(instance) {
    const self = instance;
    try {
      self.showLoader = true;
      if (!self.acIsAdmin) {
        let actions = this.permittedActions(instance); 
        for (let i = 0; i < actions.length; i++) {
          const action = actions[i];
          if (action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_UNIT")) {
            switch (action.actionType) {
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
                self.accessControl._primaryfile_media._read = true;
                break;
            }
          } else if ( 
            // Note: below is only useful for future suuplement page under content navigation, and not useful for global supplement page
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
            // Note: below is only useful for WF results shown under PFile, and not useful for Dashboard
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE"):
                self.accessControl._workflowresult._create = true;
                break;               
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._workflowresult._read = true;
                break;               
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._workflowresult._update = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_DELETE"):
                self.accessControl._workflowresult._delete = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT_OUTPUT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._workflowresult_output._read = true;
                break;
            }
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_ROLE")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._role._read = true;               
                break;
            }          
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_ROLE_UNIT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._role_unit._update = true;               
                break;  
            }          
          } else if (
            action.targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_ROLEASSIGNMENT")
          ) {
            switch (action.actionType) {
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_READ"):
                self.accessControl._roleassignment._read = true;
                break;
              case env.getEnv("VUE_APP_AC_ACTIONTYPE_UPDATE"):
                self.accessControl._roleassignment._update = true;                
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

  async initPermissions(instance) {
    const self = instance;
    await this.isAdmin(self);
    if(!self.acIsAdmin) {
      await this.getPermittedActions()
        .then((res) => {
          let allUnitActions = res.data;
          if (allUnitActions != undefined) {
            // set up unitsActions and actionsUnits hashmaps            
            // for (let unit of allUnitActions) {
            //   let actions = new Set();
            //   for (let action of unit.actions) {
            //     let actionKey = `${action.actionType}-${action.targetType}`;
            //     actions.add(actionKey);
            //     let units = self.accessControl.actionsUnits.get(actionKey);
            //     if (!units) {
            //       units = new Set();
            //       self.accessControl.actionsUnits.set(actionKey, units);
            //     }
            //     units.add(unit.unitId);
            //   }
            //   self.accessControl.unitsActions.set(unit.unitId, actions);
            // }

            // set up acUnitsMedia and acUnitsOutput
            for (let unit of allUnitActions) {
              let actions = [];
              for (let action of unit.actions) {
                const { actionType, targetType } = action;
                actions.push({ actionType, targetType });
                if (actionType === env.getEnv("VUE_APP_AC_ACTIONTYPE_READ")) {
                  if (targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_PRIMARYFILE_MEDIA"))
                    self.acUnitsMedia.push(unit.unitId);
                  else if (targetType === env.getEnv("VUE_APP_AC_TARGETTYPE_WORKFLOWRESULT_OUTPUT"))
                    self.acUnitsOutput.push(unit.unitId);
                } 
              }
              self.acUnitsActions.push({ unitId: unit.unitId, actions });
            }	
            console.log("acUnitsMedia: " + self.acUnitsMedia);		 
            console.log("acUnitsOutput: " + self.acUnitsOutput);				 
      
            // set up navigation menus permissions
            let allActions = allUnitActions.map(a => a.actions).flat();          
            for (const [index, action] of allActions.entries()) {
              const { actionType, targetType } = action;
              self.acActions.push(`${actionType}-${targetType}`);
            }
          }
        });
    }
  }


}
