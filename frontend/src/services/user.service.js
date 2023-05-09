import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  async fetchUser(accessToken) {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  }

  // Update user data on the backend server
  static async updateUserData(accessToken, data) {
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user`, data, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  }

  // Delete user account on the backend server
  static async deleteAccount(accessToken) {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers: { 'x-access-token': accessToken },
    });
    return response.data;
  }

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();