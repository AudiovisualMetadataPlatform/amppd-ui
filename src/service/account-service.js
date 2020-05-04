import BaseService from './base-service.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const baseService = new BaseService();
function sendRegisterRequest(username, pswd, email) {
  const url = `/register`;
	return baseService.post_auth(url,
        {
          username: username,
          password: pswd,
          email: email  
        })
        .then(x => x.data)
}

function sendResetRequest(token, pswd, email) {
  const url = `/reset-password`;
	return baseService.post_auth(url,
        {
          emailid: email,
          password: pswd,
          token: token
        })
        .then(x => x.data)
}

function sendfetchEmailRequest(token) {
  const url = `/reset-password-getEmail`;
	return baseService.post_auth(url,
        {
          token: token
        })
        .then(x => x.data)
}

function sendForgotPswdEmailRequest(emailid) {
  const url = `/forgot-password`;
	return baseService.post_auth(url,
        {
          emailid: emailid
        })
        .then(x => x.data)
}

function sendApproveUserRequest(userid) {
  const url = `/user/account/approve`;
	return baseService.post_auth(url,
        {
         userId: userid
        })
        .then(x => x.data)
}

function sendRejectUserRequest(userid) {
  const url = `/user/account/reject`;
	return baseService.post_auth(url,
        {
         userId: userid
        })
        .then(x => x.data)
}

function login(username, password) {
  console.log("login");
  return baseService.post(`/authenticate`, { username, password })
      .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUser = user.data;
          console.log(currentUser);
          return this.currentUser;
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
      });
}
async function validate() {
  var success = await baseService.post_auth(`/validate`)
      .then(user => {
          return true;
      })
      .catch(error => {
        console.log("IN ERROR");
        return false;
      });
  console.log("Success: " + success);
  return success;
}
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUser = null;
}

export const accountService = { 
  sendRegisterRequest, 
  sendResetRequest, 
  sendfetchEmailRequest, 
  sendForgotPswdEmailRequest, 
  sendApproveUserRequest, 
  sendRejectUserRequest, 
  validate,
  login, 
  logout,
  currentUser: currentUser,
  get currentUserValue () { return JSON.parse(localStorage.getItem('currentUser')) }  
}

