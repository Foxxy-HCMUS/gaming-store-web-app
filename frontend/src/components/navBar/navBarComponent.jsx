import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";
import { register, signin, logout } from "../../store/slices/authSlice";

// const NavBar = () => {
//   const dispatch = useDispatch();
//   dispatch(fetchUser());
//   const currentUser = useSelector((state) => state.auth.user);
//   const [toggle, setToggle] = useState(false);

//   const handleToggle = () => {
//     setToggle((prev) => !prev);
//   };

//   const handleClose = () => {
//     setToggle(false);
//   };

//   const [logoutModal, setLogOutModal] = useState(false);

//   const handleCloseLogoutModal = () => {
//     setLogOutModal((prev) => !prev);
//   };

//   const logout = () => {
//     dispatch(logoutUser());
//   };

//   if (currentUser === undefined) {
//     console.log(currentUser);
//   }

//   return (
//     <div id="header" className={styles.header__main__div}>
//       <div className={styles.header__first}>
//         <Link to="/">
//           <div className={styles.header_logo}>
//             <img
//             //   style={{ height: "36px" }}
//               src={"icons/play_archive.svg"}
//               alt="play_archive"
//             />
//           </div>
//         </Link>
//       </div>

//       <div className={styles.header_navigation}>
//         <div className={styles.header_navigation__item}>
//           <Link to="/">
//             <p className={styles.onhover_white_color}>STORE</p>
//           </Link>
//         </div>
//         <div className={styles.header_navigation__item}>
//           <Link to="/distribution">
//             <p className={styles.onhover_white_color}>DISTRIBUTION</p>
//           </Link>
//         </div>
//         <div className={styles.header_navigation__item}>
//           <Link to="/support">
//             <p className={styles.onhover_white_color}>SUPPORT</p>
//           </Link>
//         </div>
//         <div className={styles.header_navigation__item}>
//           <a
//             href="https://www.unrealengine.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <p className={styles.onhover_white_color}>UNREAL ENGINE</p>
//           </a>
//         </div>
//       </div>

//       <div className={styles.header__second}>
//         <div
//           className={`${styles.padding__left} ${styles.icon} ${styles.padding__right} ${styles.display__none} ${styles.onhover_white_color}`}
//         >
//           <img src={"icons/header_global.svg"} alt="global" />
//         </div>
//       </div>

//       {currentUser ? (
//         <>
//           <div
//             onClick={handleCloseLogoutModal}
//             style={{ position: "relative" }}
//             className={`${styles.header__second__user} ${styles.padding__left} ${styles.padding__right} ${styles.display__none}`}
//           >
//             <div
//               className={`${styles.padding__left} ${styles.padding__right} ${styles.display__none} ${styles.icon} ${styles.onhover_white_color}`}
//             >
//               <img
//                 style={{ height: "26px" }}
//                 src="/icons/is_signed.svg"
//                 alt="onl user"
//               />
//             </div>
//             <div
//               id={styles.header__writer}
//               className={`${styles.display__none} ${styles.padding__right}`}
//             >
//               <p
//                 style={{ fontSize: "14px" }}
//                 className={styles.onhover_white_color}
//               >
//                 {currentUser.username}
//               </p>
//             </div>
//           </div>
//           {logoutModal ? (
//             <div className={styles.logout__modal}>
//               <Link onClick={handleCloseLogoutModal} to="/wishlist">
//                 WishList
//               </Link>
//               <p
//                 onClick={() => {
//                   handleCloseLogoutModal();
//                   logout();
//                 }}
//               >
//                 Sign Out
//               </p>
//             </div>
//           ) : null}
//         </>
//       ) : (
//         <Link to="/signup">
//           <div
//             className={`${styles.header__second__user} ${styles.padding__left} ${styles.padding__right} ${styles.display__none}`}
//           >
//             <div
//               className={`${styles.padding__left} ${styles.padding__right} ${styles.display__none} ${styles.icon} ${styles.onhover_white_color}`}
//             >
//               <img src={"icons/header_user_off.svg"} alt="off user" />
//             </div>
//             <div
//               id={styles.header__rewrite}
//               className={`${styles.padding__left} ${styles.display__none}`}
//             >
//               <p className={styles.onhover_white_color}>SIGN IN</p>
//             </div>
//           </div>
//         </Link>
//       )}

//       <div
//         className={`${styles.padding__left} ${styles.padding_right} ${styles.download_btn}`}
//       >
//         <button
//           className={`${styles.download_btn} ${styles.onhover_blue_color}`}
//         >
//           DOWNLOAD
//         </button>
//       </div>

//       <div
//         onClick={handleToggle}
//         className={
//           toggle ? `${styles.toggle} ${styles.active}` : `${styles.toggle}`
//         }
//         style={{ backgroundColor: toggle ? "#2A2A2A" : "#0078F2" }}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       <div
//         id="side-menu"
//         className={styles.menu}
//         style={{ width: toggle ? "86%" : "" }}
//       >
//         <div className={styles.mainMenu} id="main__menu">
//           <div className={styles.menu__item}>
//             <p onClick={handleClose}>STORE</p>
//             <p onClick={handleClose}>DISTRIBUTION</p>
//             <p onClick={handleClose}>SUPPORT</p>
//             <p onClick={handleClose}>UNREAL ENGINE</p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <button
//           id={styles.btn__revoke}
//           className={`${styles.header__button} ${styles.onhover__color__blue}`}
//         >
//           DOWNLOAD
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Divider,
  Box,
  Menu,
  MenuItem,
  List,
  ListItem,
  Popover,
  ListItemButton,
  // useTheme,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
// import makeStyles from "@mui/styles";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
// import NavLink from "./navLinkComponent";
import LanguageIcon from "@mui/icons-material/Language";
// import LanguageContext from "../../LanguageContext";

// const LanguageButton = ({ onClick }) => {
//   const { language } = useContext(LanguageContext);

//   return (
//     <IconButton color="inherit" onClick={onClick}>
//       <LanguageIcon />
//       <Typography variant="button" sx={{ ml: 1 }}>
//         {language === "en" ? "Français" : "English"}
//       </Typography>
//     </IconButton>
//   );
// };

const NavBar = () => {
  const location = useLocation(); // setting the default active tab in navbar
  const navigate = useNavigate();

  const [value, setValue] = useState(location.pathname);
  // const theme = useTheme();
  // console.log(theme);
  // const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  const handleChange = (e, value) => {
    setValue(value);
  };

  // const { language } = useContext(LanguageContext);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const [logoutModal, setLogOutModal] = useState(false);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleClose = () => {
    setToggle(false);
  };


  const handleSignin = () => {
    navigate("/singin");
  };

  // handle logout action

  const handleLogout = () => {
    dispatch(logout());
    setLogOutModal((prev) => !prev);
    navigate("/");
    window.location.reload();
  };

  // handle menu for online user

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleMenuClose = () => {
    console.log("close menu");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <AppBar
          sx={[{ background: "#2a2a2a" }, { textAlign: "center" }]}
          position="static"
          className={styles.navbar}
        >
          <Toolbar className={styles.toolbar} variant="dense">
            {/* <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} /> */}
            <Link to="/">
              <div className={`${styles.header_logo} ${styles.center}`}>
                <img src={"icons/play_archive.svg"} alt="play_archive" />
              </div>
            </Link>

            <Tabs
              sx={{ marginLeft: "flex" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={handleChange}
              className={`${styles.center} ${styles.onhover_white_color} ${styles.tabs}`}
            >
              <Tab selected label="STORE" component={Link} to="/" value="/" />
              <Tab
                label="DISTRIBUTION"
                component={Link}
                to="/distribution"
                value="/distribution"
              />
              <Tab
                label="SUPPORT"
                component={Link}
                to="/support"
                value="/support"
              />
              <Tab
                label=""
                icon={
                  <Divider orientation="vertical" className={styles.divider} />
                }
                disabled
              />
              <Tab
                label="UNREAL ENGINE"
                href="https://www.unrealengine.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.unreal_engine}
              />
            </Tabs>

            <IconButton
              sx={{ marginLeft: "auto" }}
              className={`${styles.icon} ${styles.center} ${styles.display__none} ${styles.onhover_white_color} ${styles.language_icon}`}
            >
              <img src={"icons/header_global.svg"} alt="global" />
            </IconButton>

            {currentUser ? (
              <>
                <Box
                  className={`${styles.user} ${styles.display__none}`}
                  // component={Link}
                  // to="/profile"
                  aria-controls="menu"
                  aria-haspopup="true"
                  // anchorEl={anchorEl}
                  sx={{ cursor: "pointer" }}
                  onMouseEnter={handleMenuOpen}
                  onMouseLeave={handleMenuClose}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                >
                  <IconButton
                    className={`${styles.icon} ${styles.center} ${styles.user_state} ${styles.onhover_white_color}`}
                  >
                    <img src={"icons/is_signed.svg"} alt="onl user" />
                  </IconButton>
                  <Button
                    variant="outlined"
                    className={`${styles.signin_btn} ${styles.display__none}`}
                  >
                    {currentUser.username}
                  </Button>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                    sx={{
                      pointerEvents: 'none',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    disableRestoreFocus
                    className={styles.popover_user}
                  > 
                    <List> 
                      <ListItemButton sx={{ pointerEvents: 'auto' }} onClose={handleMenuClose}>
                        PROFILE
                      </ListItemButton>
                      <ListItemButton onClick={handleLogout} sx={{ pointerEvents: 'auto' }} onClose={handleMenuClose}>
                        SIGN OUT
                      </ListItemButton>
                    </List>
                  </Popover>
                </Box>
              </>
            ) : (
              
                <Box className={`${styles.user} ${styles.display__none}`}
                component={Link}
                to="/signin"
                onClick={handleSignin}>
                  <IconButton
                    className={`${styles.icon} ${styles.center} ${styles.user_state} ${styles.onhover_white_color}`}
                  >
                    <img src={"icons/header_user_off.svg"} alt="off user" />
                  </IconButton>
                  <Button
                    variant="outlined"
                    className={`${styles.signin_btn} ${styles.display__none}`}
                  >
                    Sign In
                  </Button>
                </Box>
              
            )}
            <Button
              className={`${styles.download_btn} ${styles.display__none}`}
              variant="contained"
            >
              DOWNLOAD
            </Button>

            <div
              onClick={handleToggle}
              className={
                toggle
                  ? `${styles.toggle} ${styles.active}`
                  : `${styles.toggle}`
              }
              style={{ backgroundColor: toggle ? "#2A2A2A" : "#0078F2" }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div
              id="side-menu"
              className={styles.menu}
              style={{ width: toggle ? "86%" : "" }}
            >
              <div className={styles.mainMenu} id="main__menu">
                <div className={styles.menu__item}>
                  <p onClick={handleClose}>STORE</p>
                  <p onClick={handleClose}>DISTRIBUTION</p>
                  <p onClick={handleClose}>SUPPORT</p>
                  <p onClick={handleClose}>UNREAL ENGINE</p>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default NavBar;
