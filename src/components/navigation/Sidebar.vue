<template>
  <div class="w-100">
    <div class="col-12 bg-dark-1">
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
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <span v-html="ampSvg"></span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
            <span
              class="nav-span"
              v-for="menu in orderedMenuList"
              :key="menu.name"
            >
              <b-nav-item @click="routeTo(menu)" v-if="!menu.children">
                <span v-html="menu.icon"></span>
                <span class="pl-2">{{ menu.name }}</span>
              </b-nav-item>
              <b-nav-item-dropdown v-else>
                <template #button-content>
                  <span v-html="menu.icon"></span>
                  <span class="pl-2">{{ menu.name }}</span>
                  <span
                    v-if="menu.dropdownIcon"
                    v-html="menu.dropdownIcon"
                  ></span>
                </template>
                <b-dropdown-item
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
            <b-nav-item class="nav-span">
              <Logout />
            </b-nav-item>
          </b-navbar-nav>
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
    };
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
    orderedMenuList() {
      let self = this;
      return this.sharedService.sortByNumber(self.menuList, "displayId");
    },
  },
  methods: {
    routeTo(menu) {
      const self = this;
      if (
        self.$route.path === "/workflow/edit" &&
        localStorage.getItem("activeWorkflowSession")
      ) {
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
      } else {
        self.$router.push(`${menu.url}`);
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
  fill: white;
}

.bg-dark-1 a:hover,
.bg-dark-1 .dropdown a.nav-link:hover {
  color: #f4871e !important;
  text-decoration: none;
}
.dropdown-toggle::after {
  display: none !important;
}
.navbar-light .navbar-nav .show > .nav-link,
.navbar-light .navbar-nav .nav-link:focus {
  color: #fff !important;
}
.navbar-light .navbar-nav .nav-link:hover {
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

.nav-span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
