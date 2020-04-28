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
            <label for="email">User ID: {{this.$route.params.id}}</label>
          </div>
          <div class="form-group">
            <button class="btn btn-primary marg-bot-4" v-on:click="approveUser()">Approve</button>
          </div>
          <div class="form-group">
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
import {sendApproveUserRequest, sendRejectUserRequest} from '@/service/userAccountService';
  export default {
    name: 'ApproveUser',
    components: {
      Header
      },
    data: function() { 
		return {
			errors: [],
			id: null,
			approve_status: false,
      approve_user: false,
      reject_user: false
    }
  },
  methods:{
	async approveUser() {
    event.preventDefault();
    this.errors=[];
    this.approve_user = false;
    this.reject_user=false;
    await sendApproveUserRequest(this.$route.params.id )
    .then(response => {
      self.approve_status = response.success;
      })
    .catch(e => {
      console.log(e);
		});
		console.log("approve result is:"+self.approve_status);
		if(this.errors.length == 0 && self.approve_status)
        {
			this.approve_user = true;
        }
        else
        {
          this.errors.push('User was not approved');
        }
    },
    async rejectUser() {
      event.preventDefault();
      this.errors=[];
      this.reject_user=false;
      this.approve_user = false;
      await sendRejectUserRequest(this.$route.params.id )
      .then(response => {
        self.approve_status = response.data.success;
      })
      .catch(e => {
        console.log(e);
      });
      console.log("reject result is:"+self.approve_status);
      if(this.errors.length == 0 && self.approve_status)
      {
        this.reject_user = true;
      }
      else
      {
        this.errors.push('User was not approved');
      }
    }
  },
  mounted() {
    //console.log("IT WORKS");
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