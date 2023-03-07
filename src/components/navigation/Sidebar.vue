<template>
  <div class="w-100">
    <div class="col-12 bg-dark-1 nav-bar">
      <!-- <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header d-flex">
            <a class="navbar-brand" href="#"></a>
            <span v-html="ampSvg"></span>
          </div>
          <ul class="nav navbar-nav">
            <li class="marg-t-2" :class="menu.class" v-for="menu in menuList" :key="menu.name">
              <a :href="'/#' + menu.url" v-if="!menu.children">
                <span v-html="menu.icon"></span>
                <span class="pl-2">{{ menu.name }}</span>
              </a>
              <template v-else>
                <div class="dropdown">
                  <a href="#" @click="$event.preventDefault();showDropdown(menu)" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <span v-html="menu.icon"></span>
                      <span class="pl-2">{{ menu.name + menu.show}}</span>
                  </a>
                  <div class="dropdown-menu" :class="menu.show ? 'show' : ''" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="">
                    <a class="dropdown-item" href="/workflows/listings.html">Listings</a>
                    <a class="dropdown-item" href="/workflows/select-files-1.html">Submissions</a>
                  </div>
                </div>
              </template>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </nav>-->
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
                @click="routeTo(menu)"
                v-if="menu.url === '/batch/ingest'"
                :class="{
                  'd-none': !accessControl._nav._ingestBatch,
                }"
              >
                <span v-html="menu.icon"></span>
                <span class="pl-2 menu-name">{{ menu.name }}</span>
              </b-nav-item>
              <b-nav-item
                :id="menu.url"
                @click="routeTo(menu)"
                v-else-if="!menu.children && menu.url !== '/mgm-evaluation'"
              >
                <span v-html="menu.icon"></span>
                <span class="pl-2 menu-name">{{ menu.name }}</span>
              </b-nav-item>
              <b-nav-item-dropdown v-else>
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
                  class="p-0"
                  :disabled="!submenu.url"
                  v-for="submenu in menu.children"
                  :key="submenu.name"
                  @click="routeTo(submenu)"
                >
                  <span class="submenu">{{ submenu.name }}</span>
                </b-dropdown-item>
                <!-- <b-dropdown id="dropdown-1" text="Dropdown Button">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
                <b-dropdown-item>Third Action</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item active>Active action</b-dropdown-item>
                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown>-->
              </b-nav-item-dropdown>
              <!-- <b-nav-item-dropdown text="Lang" right v-else>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown>-->
            </span>
          </b-navbar-nav>
          <b-nav-item
            class="nav-span"
            :class="!isAuthenticated ? 'abs-position' : 'ini-position'"
          >
            <Logout />
          </b-nav-item>
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
import { accountService } from "../../service/account-service.js";
import { sync } from "vuex-pathify";
import SharedService from "../../service/shared-service.js";
import EvaluationService from "@/service/evaluation-service";
import AccessControlService from "@/service/access-control-service";

export default {
  components: {
    Logout,
    BreadCrumbs,
  },
  data() {
    return {
      menuList: config.common.menus,
      ampSvg: config.common.icons["amp"],
      accountService: accountService,
      sharedService: new SharedService(),
      evaluationService: new EvaluationService(),
      accessControlService: new AccessControlService(),
    };
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
    mgmCategories: sync("mgmCategories"),
    accessControl: sync("accessControl"),
    orderedMenuList() {
      let self = this;
      return this.sharedService.sortByNumber(self.menuList, "displayId");
    },
  },
  methods: {
    async networkCalls() {
      const self = this;
      try {
        //MGM Evaluation menus
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
        const uEntity = JSON.parse(sessionStorage.getItem("unitEntity"));

        //Access Control
        await self.accessControlService.permittedActions(self);
        let isAdminResponse = await self.accessControlService.getIsAdmin();
        self.accessControl._isAdmin = isAdminResponse.data;

        //BATCH INGEST: checking permission
        if (uEntity && uEntity.currentUnit)
          self.accessControlService.checkAccessControl(this);

        //BATCH INGEST: Disable batch ingest nav
        if (!uEntity || (uEntity && !uEntity.currentUnit)) {
          let batchIngestHtml = document.getElementById("/batch/ingest")
            .childNodes[0];
          batchIngestHtml.ariaDisabled = "true";
          batchIngestHtml.classList.add("disabled");
        }
      } catch (error) {
        console.log(error);
      }
    },
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
        self.$router.push("/");
      }
    },
    routeTo(menu, data) {
      const self = this;
      if (
        self.$route.path === "/workflow/edit" &&
        localStorage.getItem("activeWorkflowSession")
      ) {
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
      } else {
        if (menu.url === "/mgm-evaluation") {
          if (data.name === "All MGMs") {
            self.$router.push(menu.url);
          } else {
            self.$router.push(`${menu.url}/${data.id}`);
          }
        } else {
          self.$router.push(`${menu.url}`);
        }
      }
    },
    convertToSvg(value) {
      var parser = new DOMParser();
      return parser.parseFromString(value, "image/svg+xml");
    },
    showDropdown(menu) {
      menu.show = !menu.show;
    },
  },
  mounted() {
    const self = this;
    this.networkCalls();
  },
};
</script>

<style lang="css">
@import "/amppd-ui/src/styles/style.css";
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
.abs-position {
  position: absolute;
  right: 0px;
}
.ini-position {
  position: initial;
  right: 0px;
}
</style>
