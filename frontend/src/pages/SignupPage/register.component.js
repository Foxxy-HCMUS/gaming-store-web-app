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

const Register = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({
    displayName: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleInput = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setData({
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
    });
  }, [user]);

  const [displayNameAvailabilty, setDisplayNameAvailabilty] = useState({
    message: "",
    status: false,
    loading: false,
  });

  const [error, setError] = useState(false);

  const checkDisplayNameAvailability = async () => {
    setDisplayNameAvailabilty((prev) => ({ ...prev, loading: true }));
    try {
      const { data: displayNameData } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/display-name-availability`,
        {
          displayName: data.displayName,
        },
        {
          withCredentials: true,
        }
      );

      setDisplayNameAvailabilty({ ...displayNameData, loading: false });
      setError(!displayNameData.status);
    } catch (err) {
      setDisplayNameAvailabilty((prev) => ({ ...prev, loading: false }));
    }
  };

  const debounced = useDebouncedCallback(checkDisplayNameAvailability, 500);

  // Debouncing for displayName input
  const displayNameInputHandler = (e) => {
    const { value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        displayName: value,
      };
    });
    if (value.length > 0) debounced();
  };

  const dispatch = useDispatch();
  let history = useNavigate();
  const postUserData = () => {
    dispatch(postUser(data));
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src="/icons/Epic_Games_white.svg" alt="logo" />
      </div>
      <div className={styles.form}>
        <p>Sign Up</p>
        <div className={styles.names}>
          <ThemeProvider theme={theme}>
            <TextField
              required
              style={{ width: "100%" }}
              label="First Name"
              value={data.firstName}
              onChange={handleInput}
              name="firstName"
              defaultValue={user.firstName}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              required
              style={{ width: "100%" }}
              label="Last Name"
              defaultValue={user.lastName}
              name="lastName"
              value={data.lastName}
              onChange={handleInput}
            />
          </ThemeProvider>
        </div>
        <ThemeProvider theme={theme}>
          <TextField
            error={error}
            required
            style={{ width: "100%" }}
            label="Display Name"
            value={data.displayName}
            name="displayName"
            onChange={displayNameInputHandler}
            helperText={displayNameAvailabilty.message}
            autoComplete={false}
          />
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <TextField
            disabled
            required
            style={{ width: "100%" }}
            label="email"
            value={data.email}
            defaultValue={user.email}
            name="email"
          />
        </ThemeProvider>
        <div className={styles.checkboxes}>
          <div className={styles.checkbox}>
            <Checkbox
              sx={{
                padding: 0,

                color: "gray",
                "& .MuiSvgIcon-root": { fontSize: 28 },
              }}
            />
            <p>
              I would like to receive news, surveys and special offers from Epic
              Games.
            </p>
          </div>

          <div className={styles.checkbox}>
            <Checkbox
              sx={{
                padding: 0,
                color: "gray",
                "& .MuiSvgIcon-root": { fontSize: 28 },
              }}
            />
            <p>
              I have read and agree to the{" "}
              <span className={styles.underline}>terms of service</span>
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={displayNameAvailabilty.status ? postUserData : null}
            style={!displayNameAvailabilty.status ? { opacity: "0.5" } : null}
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
