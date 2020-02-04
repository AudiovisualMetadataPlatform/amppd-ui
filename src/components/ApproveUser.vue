<template>
  <div>
    <Header/>
    <div class="form-body">
      <h1>Approve User</h1>
      <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="form-content" id="approve">
			<div class="row">Click <span><a href="#" v-on:click="approveUser()">here</a></span> to approve</div>
			<div v-if="approve_user">
				<label>The user has been approved. </label>
			</div>
        </div>
    
	</div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
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
			approve_user: false
    }
  },
  methods:{
	async approveUser() {
		event.preventDefault();
		await axios.post(process.env.VUE_APP_AMP_URL+ '/approve-user',
          {
            id: this.$route.params.id 
          })
        .then(response => {
          self.approve_status = response.data.success;
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
    }
  },
  mounted() {
    //console.log("IT WORKS");
  }
};
</script>

<style scoped>
 .form-body{
  margin-block-start: 100px;
  width: auto;
  height: auto;
  text-align: center;
  }

  h1 {
  text-align: center;
  }

  .form-content{
  /*padding-top:50px;*/
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 50%;
    display: inline-block;
  }

  input[type=text], input[type=password] {
    border-radius: 5px;
    padding: 15px 20px;
    margin: 20px 20px;
    border: 1px solid #ccc;
    align-content: center;
    width: 50%;
  }

  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
    padding: 14px 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }

  /* Add a hover effect for buttons */
  button:hover {
    opacity: 0.8;
  }

  .error {
    padding: 20px 100px;  
    color: red;
  }

  ul{
  list-style: none;
  } 

  li span {
    width : 70%;
    padding-left: 100px;
    padding-right: 100px;
  }
 
  p {
    width:70%;
    text-align: center;
    margin:auto;
  }

  .row {
    text-align: center;
    padding:5px 10px;
  }
</style>