import React, { Component } from "react";
import { Routes, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./pages/SigninPage/signPage";
import Register from "./pages/SignupPage/register.component";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/HomePage/homePage";
import Profile from "./pages/ProfilePage/profile.component";
import BoardUser from "./pages/ProfilePage/board-user.component";
import BoardModerator from "./pages/ProfilePage/board-moderator.component";
import BoardAdmin from "./pages/ProfilePage/board-admin.component";

import SubNavbar from "./components/subNavbar/sub-navbar.component";
import { useDispatch } from "react-redux";

import Search from "./components/search.component";
import logo from "./assets/icons/play archive.svg";

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//     };
//   }

//   componentDidMount() {
//     const user = AuthService.getCurrentUser();

//     if (user) {
//       this.setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }
//   }

//   logOut() {
//     AuthService.logout();
//     this.setState({
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//     });
//   }

//   render() {
//     const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

//     return (
//       <>
//         <header className="navbar navbar-expand-lg navbar-dark bg-dark">
//           <nav className="container-xxl bd-gutter flex-wrap flex-lg-nowrap" aria-label="Main navigation"> 
//             <Link to={"/"} className="navbar-brand">
//               <div className="logo">
//                 <img src={logo} alt="logo" />
//               </div>
//             </Link>
//             <div className="navbar-nav mr-auto">
//               <li className="nav-item">
//                 <Link to={"/home"} className="nav-link">
//                   Home
//                 </Link>
//               </li>

//               {showModeratorBoard && (
//                 <li className="nav-item">
//                   <Link to={"/mod"} className="nav-link">
//                     Moderator Board
//                   </Link>
//                 </li>
//               )}

//               {showAdminBoard && (
//                 <li className="nav-item">
//                   <Link to={"/admin"} className="nav-link">
//                     Admin Board
//                   </Link>
//                 </li>
//               )}

//               {currentUser && (
//                 <li className="nav-item">
//                   <Link to={"/user"} className="nav-link">
//                     User
//                   </Link>
//                 </li>
//               )}
//             </div>

//             {currentUser ? (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/profile"} className="nav-link">
//                     {currentUser.username}
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <a href="/login" className="nav-link" onClick={this.logOut}>
//                     LogOut
//                   </a>
//                 </li>
//               </div>
//             ) : (
//               <div className="navbar-nav ml-auto">
//                 <li className="nav-item">
//                   <Link to={"/login"} className="nav-link">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to={"/register"} className="nav-link">
//                     Sign Up
//                   </Link>
//                 </li>
//               </div>
//             )}

//             <Search />
//           </nav>
//         </header>
//         {/* <SubNavbar/> */}

//         <div className="container mt-3">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/user" element={<BoardUser />} />
//             <Route path="/mod" element={<BoardModerator />} />
//             <Route path="/admin" element={<BoardAdmin />} />
//           </Routes>
//         </div>

//       </>

//     );
//   }
// }

// export default App;



export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<SignupPage />} />

        {/* <Route exact path="/signup/display-name">
          <SignupPage />
        </Route> */}

        {/* <Route exact path="/browse">
          <BrowsePage />
        </Route> */}

        {/* <Route exact path="/games/:id">
          <GamePage />
        </Route> */}

        {/* <Route exact path="/wishlist">
          <WishlistPage />
        </Route> */}
      </Routes>
    </div>
  );
};

