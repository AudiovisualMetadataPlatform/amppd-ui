<template>
  <div class="logout"
    :class="!isAuthenticated ? 'abs-position' : 'ini-position'">
    <span
      class="nav-span"
      v-for="menu in filteredMenuList"
      :key="menu.name"
    >
      <b-nav-item-dropdown class="logout-options">
        <template #button-content>
          <span v-if="isAuthenticated">
            <div v-if="hasUserInitials" class="user-initials">{{userInitials}}</div>
            <span v-else v-html="menu.icon"></span>
          </span>
          <span v-else v-html="menu.icon"></span>
          <span
            v-if="menu.dropdownIcon"
            v-html="menu.dropdownIcon"
          ></span>
        </template>
        <b-dropdown-item
          class="p-0"
          v-for="submenu in menu.children"
          :key="submenu.name"
          @click="routeTo(submenu)"
        >
          <span class="submenu">{{ submenu.name }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </span>
    <!-- <div class="right-pane"><button type = "button" v-on:click="signout()">Logout</button></div> -->
  </div>
</template>

<script>
import config from "../../assets/constants/common-contant.js"
import { accountService } from "@/service/account-service";
import sync from "@/helpers/sync";
import defaultState from "../../store/state";
import SharedService from "@/service/shared-service";
export default {
  name: "logout",
  data() {
    return {
      menuList: config.common.accessControl,
      sharedService: new SharedService(),
    }
  },
  methods: {
    signout() {
      const self = this;
      if (
        self.$route.path === "/workflow/edit" &&
        localStorage.getItem("activeWorkflowSession")
      ) {
        alert(
          "Workflow editor session is active. Please click on done button before leaving the page."
        );
      } else {
        self.isAuthenticated = false;
        accountService.logout();
        this.$router.push("/");
      }
    },
    routeTo(submenu) {
      if(!this.isAuthenticated) {
        this.$router.push(`${submenu.url}`);
      } else {
        this.signout();
      }
    }
  },
  computed: {
    isAuthenticated: sync("isAuthenticated"),
    acIsAdmin: sync("acIsAdmin"),
    acUnitsActions: sync("acUnitsActions"),
    acUnitsMedia: sync("acUnitsMedia"),
    acUnitsOutput: sync("acUnitsOutput"),
    acActions: sync("acActions"),
    mgmCategories: sync("mgmCategories"),
    hasUserInitials: function () {
      return this.isAuthenticated ? this.userInitials.length > 0 : false;
    },
    userInitials: function () {
      return this.isAuthenticated ? this.sharedService.getUserInitials() : '';
    },
    filteredMenuList() {
      if(this.isAuthenticated) {
        return this.menuList.filter((menu) => menu.name === "SignedIn")
      } else {
        return this.menuList.filter((menu) => menu.name === "SignedOut")
      }
    }
  },
  mounted() {},
};
</script>

<style lang="css">
.abs-position {
  position: absolute;
  right: 0px;
}
.ini-position {
  position: initial;
  right: 0px;
}

.user-initials {
  background-color: #f4871e;
  color: #fff;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  display: inline-block;
  padding: 0.25em;
  border: 2px solid #fff;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1.3em;
}

.logout-options ul {
  margin-top: -0.925rem;
}

.nav-link{
  display: flex !important;
  align-items: baseline;
}

li {
  list-style: none;
  padding: .1rem;
}

.active-link {
  color: #153c4d;
}

.active-link:hover {
  color: #f4871e;
}

a {
  text-decoration: none;
  background-color: transparent;
}

a:link {
  color: #153c4d;
}

a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}

.svg-inline {
  width: 25px;
  height: auto;
}

:not(svg) {
  transform-origin: 0px 0px;
}

.icon-dark-1,
.svg-inline.dwn-arrow {
  fill: #fff !important;
}

.icon-light-1 {
  fill: #f8ae67;
}

/* .workflows .workflows, .collections .collections {
    background: #22617d;
  } */

svg.icon-user {
  width: 2.5rem;
}
</style>
