import axios from "axios";
import userService from '../../services/user.service';
import authHeader from '../../services/auth-header';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLandingPage = createAsyncThunk(
  "games/fetchGames",
  async (userType, { getState }) => { 
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/games`,
      {
        // withCredentials: true,
        // headers: authHeader(getState()),
      }
    );
    return response;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    games: [],
    landingPageData: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterData: (state, action) => {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingPage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLandingPage.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.landingPageData = action.payload.data;
      })
      .addCase(fetchLandingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = dataSlice;

export default reducer;
