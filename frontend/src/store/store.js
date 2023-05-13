import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";

// const reducer = {
//   auth: authReducer,
//   data: dataReducer,
//   rootReducer: rootReducer
// }


import rootReducer from "./slices/rootSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
  // compose(
  //   applyMiddleware(thunk)
  //   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
  });

export default store;
