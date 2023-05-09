import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        // if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        // console.log(response.data);
        return response.data;
      });
  }

  async fetchUser(token) {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { "x-access-token": token },
    });
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstName, lastName) {
    // console.log(username, email, password, firstName, lastName);
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstName,
      lastName
    })
    .then(response => {
      return response.data;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();