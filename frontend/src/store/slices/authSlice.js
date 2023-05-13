import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../../services/auth.service";

const user = JSON.parse(sessionStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, firstName, lastName }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password, firstName, lastName);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.message.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      // console.log(data);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const fetchUser = createAsyncThunk(
  'auth/fetchUser', 
  async (_, { getState }) => {
  const { user } = getState().auth;
  const response = await AuthService.fetchUser(user.accessToken);
  return response;
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// const initialState = {
//   user: null,
//   isLoggedIn: false,
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // logout: (state) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to handle each action type
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoggedIn = false;
      //   state.user = null;
      // });
  },
});

// export const { setUser, logout } = authSlice.actions;
export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

const { reducer } = authSlice;
export default reducer;
