<template>
  <div class="w-100">
    <div class="col-12 bg-dark-1 nav-bar">
      <b-navbar toggleable="lg nav-bar-items">
        <b-navbar-brand id="amp-logo" @click="routeToHome">
          <span v-html="ampSvg"></span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" class="nav-menus" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
            <span
              class="nav-span"
              v-for="menu in orderedMenuList"
              :key="menu.name"
            >
              <b-nav-item
                :id="menu.url"
                @click.prevent="routeTo(menu)"
                v-if="!menu.children && menu.url !== '/mgm-evaluation'"
              >
                <span v-html="menu.icon"></span>
                <span class="pl-2 menu-name">{{ menu.name }}</span>
              </b-nav-item>
              <b-nav-item-dropdown
                v-else
              >
                <template #button-content>
                  <span v-html="menu.icon"></span>
                  <span class="pl-2  menu-name">{{ menu.name }}</span>
                  <span
                    v-if="menu.dropdownIcon"
                    v-html="menu.dropdownIcon"
                  ></span>
                </template>
                <span v-if="menu.url === '/mgm-evaluation'">
                  <b-dropdown-item
                    class="p-0 custom-changes"
                    v-for="submenu in [{ name: 'All MGMs' }, ...mgmCategories]"
                    :key="submenu.name"
                    @click="routeTo(menu, submenu)"
                  >
                    <span class="submenu">{{ submenu.name }}</span>
                  </b-dropdown-item>
                </span>
                <b-dropdown-item
                  v-else
                  :disabled="!submenu.url"
                  class="p-0"
                  :class="{ 
                    'd-none': resolvePermissions(submenu.permissionKey)
                  }"
                  :id="submenu.url"
                  v-for="submenu in menu.children"
                  :key="submenu.name"
                  @click="routeTo(submenu)"
                >
                  <span class="submenu">
                    {{ submenu.name }}
                  </span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </span>
          </b-navbar-nav>
          <Logout />
        </b-collapse>
      </b-navbar>
    </div>
    <BreadCrumbs />
  </div>
</template>
<script>

import config from "../../assets/constants/common-contant.js";
import Logout from "@/components/shared/Logout.vue";
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";
import sync from "@/helpers/sync";
import SharedService from "../../service/shared-service.js";
import EvaluationService from "@/service/evaluation-service";
import { env } from "@/helpers/env";

export default {
  components: {
    Logout,
    BreadCrumbs,
  },
  data() {
    return {
      menuList: config.common.menus,
      ampSvg: config.common.icons["amp"],
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
    };
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
    mgmCategories: sync("mgmCategories"),
    acIsAdmin: sync("acIsAdmin"),
    acActions: sync("acActions"),
    orderedMenuList() {
      let self = this;
      // Update menu list based on user permissions when acIsAdmin is updated
      if(!self.acIsAdmin) {
        if(self.acActions.length > 0) {
          // Filter menu list based on user permissions when acActions is updated
          let filteredMenus = self.menuList.filter(menu => {
            return !self.resolvePermissions(menu.permissionKey);
          });
          return self.sharedService.sortByNumber(filteredMenus, "displayId")
        }
      } else {
        return self.sharedService.sortByNumber(self.menuList, "displayId");
      }
    },
  },
  methods: {
    routeToHome() {
      const self = this;
      if (
        self.$route.path === "/workflow/edit" &&
        localStorage.getItem("activeWorkflowSession")
      ) {
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
      } else {
        console.log("routing to home");
        self.$router.push("/");
      }
    },
    routeTo(menu, data) {
      const self = this;
      if (self.$route.path === "/workflow/edit" && localStorage.getItem("activeWorkflowSession")) {
        alert("Workflow editor session is active. Please click on done button before leaving the page.");
      } else if (menu.url === "/mgm-evaluation") {
          if (data.name === "All MGMs") {
            self.$router.push(menu.url);
          } else {
            self.$router.push(`${menu.url}/${data.id}`);
          }
      } else {
        console.log("routing to menu");
        self.$router.push(`${menu.url}`).catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error;
          }
        })
      }
    },
    resolvePermissions(keys) {
      if(this.acIsAdmin) {
        console.log("resolvePermissions: is Admin", keys);
        return false;
      } else {
        if(Array.isArray(keys) && keys.length > 0) {
          console.log("resolvePermissions: keys is array", keys);
          return keys.map(key => {
            return this.acActions.indexOf(key) < 0;
          }).reduce((acc, current) => acc && current, true);
        } else if(typeof keys === "string") {
          console.log("resolvePermissions: keys is string", keys);
          return this.acActions.indexOf(keys) < 0;
        } else {
          console.log("resolvePermissions: permission denied", keys);
          return true;
        }
      }
    },
    async loadMgmCategories() {
      // Calculate MGM Evaluation menus when user is logged in and has permission to create MGMEvaluation tests
      const self = this;
      const mgmCreate = `${env.getEnv("VUE_APP_AC_ACTIONTYPE_CREATE")}-${env.getEnv("VUE_APP_AC_TARGETTYPE_MGMEVALUATIONTEST")}`
      if (self.isAuthenticated && (self.acIsAdmin || self.acActions.includes(mgmCreate))) {
        self.mgmCategoryResponse = await this.evaluationService.getMgmCategories();
        self.sortedMgmCategories = self.sharedService.sortByAlphabatical(
          self.mgmCategoryResponse.data._embedded.mgmCategories
        );
        self.filteredMgmCategories = self.sortedMgmCategories.filter((item) =>
          parseInt(item.mstsCount, 10)
        );
        self.mgmCategories = JSON.parse(
          JSON.stringify(self.filteredMgmCategories)
        );
        // // Force setting localStorage vuex object for state in vuex-persistedstate
        // let vuex = JSON.parse(localStorage.getItem("vuex"));
        // localStorage.setItem("vuex", JSON.stringify({
        //   ...vuex,
        //   mgmCategories: self.mgmCategories,
        // }));
      }
    },
  },
  watch: {
    acIsAdmin: async function() {
        this.loadMgmCategories();
    },
    acActions: async function() {
        this.loadMgmCategories();
    }
  },
  mounted() {
  },
};
</script>

<style lang="css">
@import "../../styles/style.css";
.form-errors {
  color: red;
  margin: 0% !important;
  font-size: 0.9rem;
  padding-left: 3px;
}
nav ul li {
  list-style: none;
  font-size: 1rem;
}
.navbar-nav {
  flex-direction: initial !important;
}
.icon-dark-1[data-v-0028c4b4],
.svg-inline.dwn-arrow[data-v-0028c4b4] {
  fill: #fff !important;
}

.bg-dark-1 a:hover,
.bg-dark-1 .dropdown a.nav-link:hover {
  color: #f4871e !important;
  text-decoration: none;
}
.dropdown-toggle::after {
  display: none !important;
}
.menu-name,
.navbar-light .navbar-nav .show > .nav-link,
.navbar-light .navbar-nav .nav-link:focus {
  color: #fff !important;
}
.navbar-light .navbar-nav .nav-link:hover,
.nav-link:hover > .menu-name {
  color: #f4871e !important;
}

.submenu {
  color: #153c4d !important;
}
.dropdown-item.active,
.dropdown-item:active {
  background: #f4871e !important;
}
.bg-dark-1 a,
.bg-dark-1 a:active,
.bg-dark-1 a:visited {
  color: #fff !important;
}

.navbar-toggler {
  background-color: #ffffff !important;
}

#amp-logo:hover {
  cursor: pointer;
}

.nav-span {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* constant navbar CSS in every browser */
.nav-bar {
  height: 111.69px !important;
}
.nav-bar-items {
  padding: 0px !important;
  height: 103.69px !important;
}
.nav-bar-items > a > span > svg {
  height: 87.69px !important;
}
.navbar-brand {
  margin-top: -16px !important;
}
.nav-menus {
  margin-top: 7px;
}
@media screen and (max-width: 991px) {
  .navbar-brand {
    margin-top: 0px !important;
  }
  .nav-bar {
    height: auto !important;
  }
  .nav-bar-items {
    height: auto !important;
  }
}
.dropdown-menu {
  min-width: 8rem !important;
}
</style>
