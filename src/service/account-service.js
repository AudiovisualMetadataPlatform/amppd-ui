import BaseService from './base-service.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const baseService = new BaseService();

// TODO
// API calls for user registration & reset password etc should not use post_auth as 
// these APIs do not require authentication; instead just use plain baseService.post

function sendRegisterRequest(username, firstName, lastName, pswd, email) {
  const url = `/account/register`;
	return baseService.post_auth(url,
        {
          username: username,
          password: pswd,
          email: email,
          firstName,
          lastName  
        })
        .then(x => x.data)
}

function sendResetRequest(token, pswd, email) {
  const url = `/account/reset-password`;
	return baseService.post_auth(url,
        {
          emailid: email,
          password: pswd,
          token: token
        })
        .then(x => x.data)
}

function sendfetchEmailRequest(token) {
  const url = `/account/reset-password-getEmail`;
	return baseService.post_auth(url,
        {
          token: token
        })
        .then(x => x.data)
}

function sendForgotPswdEmailRequest(emailid) {
  const url = `/account/forgot-password`;
	return baseService.post_auth(url,
        {
          emailid: emailid
        })
        .then(x => x.data)
}

function getUser(userid){
  const url = `/users/`+userid;
  return baseService.get_auth(url)
  .then(x => x.data)
  }

function sendApproveUserRequest(userId, approve) {
  const url = `/account/approve?userId=${userId}&approve=${approve}`;
	return baseService.post_auth(url)
        .then(x => x.data)
}

function sendActivateUserRequest(userToken) {
  const url = `/account/activate`;
	return baseService.post_auth(url,
        {
         token: userToken
        })
        .then(x => x.data)
}

function login(username, password) {
  return baseService.post(`/account/authenticate`, { username, password })
      .then(response => {
          const { token, user } = response.data;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ token, username, ...user })
          );
          this.currentUser = response.data;
          return this.currentUser;
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
        return null;
      });
}

async function validate() {
  var success = await baseService.post_auth(`/account/validate`)
      .then(user => {
          return true;
      })
      .catch(error => {
        console.log("IN ERROR");
        return false;
      });
  console.log("User authenticated: " + success);
  return success;
}

function logout() {
  // remove user from local storage to log user out
  // also clear up local and session storage
  localStorage.clear();
  sessionStorage.clear();
  this.currentUser = null;
}

export const accountService = { 
  sendRegisterRequest, 
  sendResetRequest, 
  sendfetchEmailRequest, 
  sendForgotPswdEmailRequest,
  getUser,  
  sendApproveUserRequest,
  sendActivateUserRequest,
  validate,
  login, 
  logout,
  currentUser: currentUser,
  get currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')) }  
}

