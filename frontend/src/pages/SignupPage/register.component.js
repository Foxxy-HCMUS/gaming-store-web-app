// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

// import AuthService from "../../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password
//       ).then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true
//           });
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleRegister}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, vusername]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, vpassword]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}

//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Register;

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

const Register = () => {
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
  });

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
        if (value.length < 8) {
          setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters long." }));
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
  // console.log(test);
  // dispatch(register(test));
  const postUserData = () => {
    // dispatch(postUser(data));
    dispatch(register(data));
    navigate("/");
  };

  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <p className={styles.signup_text}>Sign Up</p>
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
        </div>
        <div>
          <button
            onClick={(UserNameAvailability.status && checked) ? postUserData : null}
            style={(!UserNameAvailability.status || Object.values(errors).some((error) => error !== "") || !checked) ? { opacity: "0.5" } : null}
            className={styles.button}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
