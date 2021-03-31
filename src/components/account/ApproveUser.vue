<template>
  <div>
    <Header/>
    <main>
      <div class="container">
        <h1 class="text-center">Welcome to the Audiovisual Metadata Platform</h1>
        <div class="card col-6">
        <div class="card-body">
        <h2 class="card-title">Approve User</h2>
        <form>
          <div class="error">
            <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
            </ul>
            </p>
          </div>
          <div class="form-group">
            <label for="userId">User ID: {{this.$route.params.id}}</label>
          </div>
          <div class="form-group">
            <label for="email">Email: {{approve_user_emailId}}</label>
          </div>
           <div class="form-group" v-if="isUserApproved">
            <label>The user has already been approved. </label>
          </div>
          <div class="form-group" v-if="isRequested" >
            <button class="btn btn-primary marg-bot-4" v-on:click="approveUser()">Approve</button>
          </div>
          <div class="form-group" v-if="isRequested">
            <button class="btn btn-primary marg-bot-4" v-on:click="rejectUser()">Reject</button>
          </div>
          <div class="form-group" v-if="approve_user">
            <label>The user has been approved. </label>
          </div>
          <div class="form-group" v-if="reject_user">
            <label>The user has been rejected successfully. </label>
          </div>
        </form>
      </div>  
    </div>
  </div>
  </main>
  </div>
</template>  

<script>
import Header from '@/components/shared/Header.vue';
import {accountService} from '@/service/account-service';
  export default {
    name: 'ApproveUser',
    components: {
      Header
      },
    data: function() { 
		return {
			errors: [],
			id: null,
			approve_user: false,
      reject_user: false,
      approve_user_emailId:null,
      approve_user_status:null
    }
  },
computed:{
    isRequested: function(){
      if(this.approve_user_status=='REQUESTED')
      {
          return true;
      }
      return false;
    },
    isUserApproved: function(){
      if(this.approve_user_status == 'ACTIVATED' || this.approve_user_status == 'ACCEPTED'){
          return true;
      }
      return false;
    }
  },
  methods:{
	async approveUser() {
    event.preventDefault();
    let self = this;
    this.errors=[];
    self.approve_user = false;
    self.reject_user=false;
    await accountService.sendApproveUserRequest(this.$route.params.id )
    .then(response => {
      self.approve_user = response.success;
      })
    .catch(e => {
      console.log(e);
		});
		console.log("approve result is:"+self.approve_user);
		if(this.errors.length != 0)
    {
      this.errors.push('User was not approved');
    }
    },

    async getApproveUserdata(){
      event.preventDefault();
      let self= this;
     await accountService.loadApproveUserData(this.$route.params.id)
     .then(response => {
       self.approve_user_emailId = response.email;
       self.approve_user_status = response.status;
     })
     .catch(e => {
      console.log(e);
		});
    },
    async rejectUser() {
      event.preventDefault();
      let self = this;
      this.errors=[];
      self.approve_user = false;
      self.reject_user=false;
      await accountService.sendRejectUserRequest(this.$route.params.id )
      .then(response => {
        self.reject_user = response.success;
      })
      .catch(e => {
        console.log(e);
      });
      console.log("reject result is:"+self.reject_user);
      if(this.errors.length != 0)
      {
        this.errors.push('User was not rejected successfully');
      }
    }
  },
  beforeMount() {
    this.getApproveUserdata();
  }
};
</script>

<style lang="css">
@import '/amppd-ui/src/styles/style.css';
  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem; 
    padding-left:3px; 
  }

</style>