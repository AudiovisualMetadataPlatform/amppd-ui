import axios from 'axios'
import authenticationService from '@/service/authentication-service';

const API_URL = process.env.API_URL || 'http://localhost:8200';
var token = "";
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser && currentUser.token){
    token = currentUser.token;
}
export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
})