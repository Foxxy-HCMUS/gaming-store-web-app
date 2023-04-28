import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer,
  middleware: [thunk]
  // compose(
  //   applyMiddleware(thunk)
  //   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
  });

export default store;
