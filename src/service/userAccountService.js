import * as axios from 'axios';

const BASE_URL = process.env.VUE_APP_AMP_URL;

function sendLoginRequest(email, pswd) {
    const url = `${BASE_URL}/login`;
	return axios.post(url, 
		{emailid: email,
        password: pswd  })
        .then(x => x.data)
}

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
    const url = `${BASE_URL}/approve-user`;
	return axios.post(url,
        {
         userId: userid
        })
        .then(x => x.data)
}

export { sendLoginRequest, sendRegisterRequest, sendResetRequest, sendfetchEmailRequest, sendForgotPswdEmailRequest, sendApproveUserRequest }

