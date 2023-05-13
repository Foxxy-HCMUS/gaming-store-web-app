import axios from "axios";

class AuthService {
  login(username, password) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/signin`, {
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
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
      headers: { "x-access-token": token },
    });
    return response.data;
  }

  logout() {
    sessionStorage.removeItem("user");
  }

  register(username, email, password, firstName, lastName) {
    // console.log(username, email, password, firstName, lastName);
    return axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
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
    return JSON.parse(sessionStorage.getItem('user'));;
  }
}

export default new AuthService();