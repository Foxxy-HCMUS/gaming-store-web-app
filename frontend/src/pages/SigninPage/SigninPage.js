import React, { Component, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

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


export default function SignInPage() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });
    dispatch(login({
      'username': data.get('username'), 'password': data.get('password')}));
  };


  const { isLoggedIn } = useSelector(state => state.auth);
  if (isLoggedIn) {
      return <Navigate to="/" />;
  }


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
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
        <ThemeProvider theme={theme}>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
      </Container>
     {/* </ThemeProvider> */}
     {/* </StyledEngineProvider> */}
    </div>
  );
}