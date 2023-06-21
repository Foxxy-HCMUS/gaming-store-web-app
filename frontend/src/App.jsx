import React, { Component, useEffect, useState } from "react";
import { Routes, Route, Link, Switch, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import "./App.module.css";

import AuthService from "./services/auth.service";

import Login from "./pages/SigninPage/SigninPage";
import Register from "./pages/SignupPage/register.component";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage/profile.component";
import BoardUser from "./pages/ProfilePage/board-user.component";
import BoardModerator from "./pages/ProfilePage/board-moderator.component";
import BoardAdmin from "./pages/ProfilePage/board-admin.component";

import SubNavbar from "./components/subNavbar/sub-navbar.component";
import { useDispatch, useSelector } from "react-redux";

// import { fetchGames } from "./store/slices/dataSlice";
import { fetchGames } from "./store/slices/rootSlice";

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

import axios from "axios";
import DistributionPage from "./pages/DistributionPage";
import SupportPage from "./pages/SupportPage";
import NavBar from "./components/navBar";

// import LanguageContext from "./LanguageContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import SigninPage from './pages/SigninPage';
// import { fetchUser } from "./store/actions";
import { fetchUserData } from "./store/slices/rootSlice";
import { fetchUser } from "./store/slices/authSlice";
import { Alert, Snackbar } from "@mui/material";
import GamePage  from "./pages/GamePage/GamePage";
// import theme from "./components/customTheme/customTheme";
// import BrowsePage from './pages/BrowsePage/BrowsePage';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showNavBar, setShowNavBar ] = useState(true);
  // console.log(location.pathname)
  const notShow = ["/signin", "/register", "/forgot-password", "/reset-password", "/verify-email"]

  useEffect(() => {
    if (notShow.includes(location.pathname)) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // const { isLoggedIn } = useSelector((state) => state.auth);
  // console.log(isLoggedIn);
  useEffect(() => {
    // dispatch(fetchUser());
    // if (isLoggedIn) {
    //   dispatch(fetchUserData());  
    // }
    dispatch(fetchGames());
  }, [dispatch]);

  // const [language, setLanguage] = useState("en");

  // const handleLanguageChange = () => {
  //   if (language === "en") {
  //     setLanguage("fr");
  //   } else {
  //     setLanguage("en");
  //   }
  // };

  // console.log(LanguageContext)
  // const data = AuthService.login("mod", "modtest");
  // console.log(data);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    // <ThemeProvider theme={theme}>
    <>
      <div className="App">
        <NavBar/>
        {showNavBar && <SubNavbar/>} 
        {/* <ThemeProvider theme={theme}> */}
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success">
              Login successful!
            </Alert>
          </Snackbar>
        {/* </ThemeProvider> */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route path="/distribution" element={<DistributionPage />} />

          <Route path="/support" element={<SupportPage />} />

          <Route path="/signin" element={<SigninPage setSnackbarOpen={setSnackbarOpen}/>} />

          {/* <Route path="/logout" element={<SigninPage />} /> */}

          <Route path="/register" element={<Register />} />
        
          {/* <Route exact path="/browse" element={<BrowsePage />} /> */}
          
          {/* <Route exact path="/games/:id">
          <GamePage />
        </Route> */}

        {/* <Route path = "/games/:id" element={<GamePage/>}/> */}
        <Route path = "/:id" element={<GamePage _id = {location.pathname.replace('/','')}/>}/>

          {/* <Route exact path="/wishlist">
          <WishlistPage />
        </Route> */}
        </Routes>
      </div>
    </>
    // </ThemeProvider>
  );
}
