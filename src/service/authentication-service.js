import handleResponse from '../helpers/handle-response.js';
import axios from 'axios'


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUser,
    get currentUserValue () { return currentUser } 
};

function login(username, password) {
    return axios.post(`${process.env.VUE_APP_AMP_URL}/authenticate`, { username, password })
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUser = user.data;

            return this.currentUser;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser = null;
}