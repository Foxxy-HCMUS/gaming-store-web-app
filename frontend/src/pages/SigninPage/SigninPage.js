import React, { Component, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { withRouter } from '../../common/with-router';

import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../store/slices/authSlice';
import styles from "./SigninPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from "@mui/material/styles";
import theme from "../../components/customTheme/customTheme";
import { Alert, Snackbar } from "@mui/material";
import { fetchUserData } from "../../store/slices/rootSlice";
// import MuiAlert from '@material-ui/lab/Alert';


// import { createMuiTheme, MuiThemeProvider } from '@mui/core/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Play Archive
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme({
//   palette: {
//     primary: '#e89eef',
//     secondary: '#336b87'
//   }
// });


export default function SignInPage(props) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [loginError, setLoginError] = useState('');

  // const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });
    let usernameError = '';
    let passwordError = '';

    if (data.get('username').length < 4) {
      usernameError = 'Username must be at least 4 characters';
    }

    if (data.get('password').length < 1) {
      passwordError = 'Password must not be left blank';
    }

    setErrors({ username: usernameError, password: passwordError });

    if (usernameError !== '' || passwordError !== '') {
      console.log('There are errors in the form');
      return;
    }

    try {
      await dispatch(login({
        'username': data.get('username'), 'password': data.get('password')
      }));
    } catch (error) {
      setLoginError('Failed to login. Please check your credentials and try again.');
    }
  };


  const { isLoggedIn, user } = useSelector(state => state.auth);
  if (isLoggedIn) {
    sessionStorage.setItem('user', JSON.stringify(user));
    props.setSnackbarOpen(true);
    dispatch(fetchUserData());
    return <Navigate to="/" />;
  }
  console.log('isLoggedIn', !loginError);

  // handle close for snackbar
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <div className={styles.container}>
     {/* <StyledEngineProvider> */}
     {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="xs" className={styles.main}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          // className={styles.box}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ThemeProvider theme={theme}>
          <TextField
              className={styles.textfield}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              // onChange={UserNameInputHandler}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ input: { cursor: 'pointer' } }}
            />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
            <TextField
              className={styles.textfield}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // onChange={PasswordInputHandler}
              error={!!errors.password}
              helperText={errors.password}
            />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            </ThemeProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <ThemeProvider theme={theme}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled">
              Login successful!
            </Alert>
          </Snackbar>
        </ThemeProvider>  */}
        {(loginError) && <Alert severity="error">{loginError}</Alert>}
        <ThemeProvider theme={theme}>
          <Typography variant="body2" color="error">
            {loginError}
          </Typography>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
      </Container>
     {/* </ThemeProvider> */}
     {/* </StyledEngineProvider> */}
    </div>
  );
}