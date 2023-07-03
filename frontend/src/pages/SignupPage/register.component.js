import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import theme from "../../components/customTheme/customTheme";
import styles from "./register.module.css";
import { postUser } from "../../store/actions";
import { register } from "../../store/slices/authSlice";
import { FormControlLabel } from "@mui/material";
import AuthService from "../../services/auth.service";

export default function Register() {
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState({
    secretkey: "",
    status: false,
  });
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    secretkey: "",
  });

  const handleKeyInput = (e) => {
    setSecretKey((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    })
    const value = e.target.value;
    if (value.length < 1) {
      setErrors((prev) => ({ ...prev, secretkey: "Secret Key must not be left blank." }));
    } else {
      setErrors((prev) => ({ ...prev, secretkey: "" }));
    }
    if (value.length > 0) {
      if (e.target.value === 'G02-admin') {
        setSecretKey((prev) => ({ ...prev, status: true }));
      }
    }
  }

  const handleInput = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    // Add validation for each field
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "email":
        if (!value.match(/^\S+@\S+\.\S+$/)) {
          setErrors((prev) => ({ ...prev, email: "Email must be valid." }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "firstName":
        if (value.length < 2) {
          setErrors((prev) => ({ ...prev, firstName: "First name must be at least 2 characters long." }));
        } else {
          setErrors((prev) => ({ ...prev, firstName: "" }));
        }
        break;
      case "lastName":
        if (value.length < 2) {
          setErrors((prev) => ({ ...prev, lastName: "Last name must be at least 2 characters long." }));
        } else {
          setErrors((prev) => ({ ...prev, lastName: "" }));
        }
        break;
      case "password":
        if (value.length < 1) {
          setErrors((prev) => ({ ...prev, password: "Password must not be left blank." }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (user) {
      setData({
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
      });
    }
  }, [user]);

  const [UserNameAvailability, setUserNameAvailability] = useState({
    message: "",
    status: false,
    loading: false,
  });

  const [error, setError] = useState(false);

  const checkUserNameAvailability = async () => {
    setUserNameAvailability((prev) => ({ ...prev, loading: true }));
    try {
      const { data: UserNameAvailability } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/username-availability`,
        {
          username: data.username,
        },
      );

      // console.log(UserNameAvailability)

      setUserNameAvailability({ ...UserNameAvailability, loading: false });
      setError(!UserNameAvailability.status);
      if (data.username.length < 4 || data.username.length > 24) {
        setErrors((prev) => ({ ...prev, username: "Username must be 4-20 characters long." }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    } catch (err) {
      setUserNameAvailability((prev) => ({ ...prev, loading: false }));
    }
  };

  const debounced = useDebouncedCallback(checkUserNameAvailability, 500);

  // Debouncing for userName input
  const UserNameInputHandler = (e) => {
    const { value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        username: value,
      };
    });
    if (value.length > 0) debounced();
  };

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const postUserData = () => {
    // dispatch(postUser(data));
    dispatch(register(data));
    navigate("/signin");
  };

  const [checked, setChecked] = useState(false);
  
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.signup_text}>Sign Up</p>
        <div> 
          Register as:
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => setUserType(e.target.value)}
          />
          User
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => setUserType(e.target.value)}
          />
          Admin
        </div>
        
        {userType === "Admin" ? (
          <div>
            <ThemeProvider theme={theme}>
              <TextField
                required
                style={{ width: "100%" }}
                label="Secret Key"
                value={setSecretKey.secretkey}
                // defaultValue={user ? user.secretkey : ''}
                name="Secret Key"
                type="text"
                id="secretkey"
                onChange={handleKeyInput}
                error={errors.secretkey !== ""}
                helperText={errors.secretkey}
              />
            </ThemeProvider>
          </div>
        ) : null}
        <div className={styles.names}>
          <ThemeProvider theme={theme}>
            <TextField
              required
              style={{ width: "100%" }}
              label="First Name"
              value={data.firstName}
              onChange={handleInput}
              name="firstName"
              defaultValue={user ? data.firstName : ''}
              autoFocus
              error={errors.firstName !== ""}
              helperText={errors.firstName}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              required
              style={{ width: "100%" }}
              label="Last Name"
              defaultValue={user ? user.lastName : ''}
              name="lastName"
              value={data.lastName}
              onChange={handleInput}
              error={errors.lastName !== ""}
              helperText={errors.lastName}
            />
          </ThemeProvider>
        </div>
        <ThemeProvider theme={theme}>
          <TextField
            // disabled
            required
            style={{ width: "100%" }}
            label="Email"
            value={data.email}
            onChange={handleInput}
            defaultValue={user ? user.email : ''}
            name="email"
            error={errors.email !== ""}
            helperText={errors.email}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <TextField
            required
            style={{ width: "100%" }}
            label="Username"
            value={data.username}
            defaultValue={user ? user.username : ''}
            name="username"
            onChange={UserNameInputHandler}
            error={errors.username !== '' || error}
            helperText={errors.username !== '' ? errors.username : error ? UserNameAvailability.message : ''}
            autoComplete={false}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <TextField
            // disabled
            required
            style={{ width: "100%" }}
            label="Password"
            value={data.password}
            defaultValue={user ? user.password : ''}
            name="password"
            type="password"
            id="password"
            onChange={handleInput}
            error={errors.password !== ""}
            helperText={errors.password}
          />
        </ThemeProvider>
        {userType !== 'Admin' ? (
          <div className={styles.checkboxes}>
            <div className={styles.checkbox}>
              <Checkbox
                sx={{
                  padding: 0,
                  color: "gray",
                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
              />
              <p>
                I would like to receive news, surveys and special offers from Play Archive.
              </p>
            </div>

            <div className={styles.checkbox}>
              <Checkbox
                sx={{
                  padding: 0,
                  color: "gray",
                  "& .MuiSvgIcon-root": { fontSize: 22 },
                }}
                onClick={() => setChecked(!checked)}
              />
              <p>
                I have read and agree to the{" "}
                <span className={styles.underline}>terms of service</span>
              </p>
            </div>
            <button
            onClick={(UserNameAvailability.status && checked) ? postUserData : null}
            style={(!UserNameAvailability.status || Object.values(errors).some((error) => error !== "") || !checked) ? { opacity: "0.5" } : null}
            className={styles.button}
          >
            CONTINUE
          </button>
          </div>
        ) : (
        <button
          onClick={((UserNameAvailability.status && secretKey.status)) ? postUserData : null}
          style={(!UserNameAvailability.status || Object.values(errors).some((error) => error !== "") || !secretKey.status) ? { opacity: "0.5" } : null}
          className={styles.button}
        >
          CONTINUE
        </button>
        )}
      </div>
    </div>  
  );
}