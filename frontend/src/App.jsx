// import SignIn from './SignIn.js';
// import axios from './api/axios';
// import SignUp from './SignUp.js';


// function App() {
//   return (
//     <div>
//       <SignUp />
//       <SignIn />
//     </div>
//   );
// };

// // const App = async (e) => {
// //   e.preventDefault();

// //   try {
// //     const response = await axios.post(
// //       <div>
// //         <SignUp />
// //         <SignIn />
// //       </div>,
// //       JSON.stringify({ email, password }),
// //       {
// //         headers: { "Content-Type": "application/json" },
// //         withCredentials: true,
// //       }
// //     );
// //     setSuccess(true);
// //   }
// //   catch (err) {
// //     if (!err?.response) {
// //       setErrMsg("No Server Response");
// //     } else if (err.response?.status === 409) {
// //       setErrMsg("Username Taken");
// //     } else {
// //       setErrMsg("Registration Failed");
// //     }
// //     errRef.current.focus();
// //   }
// // }

// export default App;



import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import Search from "./components/search.component";
import logo from "./assets/icons/play archive.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
          <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap" aria-label="Main navigation"> 
            <Link to={"/"} className="navbar-brand">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}

            <Search />
          </nav>
        </header>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;