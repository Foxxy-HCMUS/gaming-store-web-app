// import logo from './logo.svg';
// import './App.css';
import SignIn from './SignIn.js';
import axios from './api/axios';
import SignUp from './SignUp.js';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
};

// export default App;

// const App = async (e) => {
//   e.preventDefault();

  // try {
  // const response = await axios.post(
  //   <div>
  //     <SignUp />
  //     <SignIn />
  //   </div>,
  //   JSON.stringify({ email, password }),
  //   {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   }
  // );
  // setSuccess(true);
  // }
  // catch (err) {
  //   if (!err?.response) {
  //     setErrMsg("No Server Response");
  //   } else if (err.response?.status === 409) {
  //     setErrMsg("Username Taken");
  //   } else {
  //     setErrMsg("Registration Failed");
  //   }
  //   errRef.current.focus();
  // }
// }

export default App;
