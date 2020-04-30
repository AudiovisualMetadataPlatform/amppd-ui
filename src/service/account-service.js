import * as axios from 'axios';
import handleResponse from '../helpers/handle-response.js';

const BASE_URL = process.env.VUE_APP_AMP_URL;
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

function sendRegisterRequest(username, pswd, email) {
    const url = `${BASE_URL}/register`;
	return axios.post(url,
        {
          username: username,
          password: pswd,
          email: email  
        })
        .then(x => x.data)
}

function sendResetRequest(token, pswd, email) {
    const url = `${BASE_URL}/reset-password`;
	return axios.post(url,
        {
          emailid: email,
          password: pswd,
          token: token
        })
        .then(x => x.data)
}

function sendfetchEmailRequest(token) {
    const url = `${BASE_URL}/reset-password-getEmail`;
	return axios.post(url,
        {
          token: token
        })
        .then(x => x.data)
}

function sendForgotPswdEmailRequest(emailid) {
    const url = `${BASE_URL}/forgot-password`;
	return axios.post(url,
        {
          emailid: emailid
        })
        .then(x => x.data)
}

function sendApproveUserRequest(userid) {
    const url = `${BASE_URL}/user/account/approve`;
	return axios.post(url,
        {
         userId: userid
        })
        .then(x => x.data)
}

function sendRejectUserRequest(userid) {
    const url = `${BASE_URL}/user/account/reject`;
	return axios.post(url,
        {
         userId: userid
        })
        .then(x => x.data)
}

function login(username, password) {
  return axios.post(`${process.env.VUE_APP_AMP_URL}/authenticate`, { username, password })
      .then(handleResponse)
      .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUser = user.data;
          console.log(currentUser);
          return this.currentUser;
      });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUser = null;
}

export const accountService = { sendRegisterRequest, 
  sendResetRequest, 
  sendfetchEmailRequest, 
  sendForgotPswdEmailRequest, 
  sendApproveUserRequest, 
  sendRejectUserRequest, 
  login, 
  logout,
  currentUser: currentUser,
  get currentUserValue () { return currentUser }  
}

