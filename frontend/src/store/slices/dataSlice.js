import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (userType) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/games`,
      {
        withCredentials: true,
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
      .addCase(fetchGames.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.landingPageData = action.payload.data;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = dataSlice;

export default reducer;