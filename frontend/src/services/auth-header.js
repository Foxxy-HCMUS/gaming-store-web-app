// import jwtDecode from "jwt-decode";
// import axios from "axios";
// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user && user.accessToken) {
//     return { "x-access-token": user.accessToken };
//   } else {
//     return {};
//   }
// }

export default function authHeader(state) {
  const user = state.auth.user;
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};