import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { selectUser } from './authSlice';
import authReducer from "./authSlice";
import dataReducer from "./dataSlice";
import { combineReducers } from "redux";
import userService from '../../services/user.service';
import { useDispatch } from 'react-redux';

const initialState = {
    userData: {},
    status: 'idle',
    error: null,
  };

export const fetchUserData = createAsyncThunk(
  'user/fetch',
  async (_, { getState } ) => {
    const { accessToken } = selectUser(getState());
    const data = await userService.fetchUser(accessToken);
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      return action.payload;
    },
    logoutUser: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { getUser, logoutUser } = userSlice.actions;

export const fetchGames = createAsyncThunk(
  'games/fetch',
  async (_, { getState }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/games`,
      {
        withCredentials: true,
        headers: authHeader(getState()),
      }
    );
    return data;
  }
);

export const filterData = createAsyncThunk(
  'games/filter',
  async (query, { getState }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/games/filters?${query}`,
      {
        withCredentials: true,
        headers: authHeader(getState()),
      }
    );
    return data.data;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    getGames: (state, action) => {
      return action.payload;
    },
    sortGames: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(filterData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(filterData.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { getGames, sortGames } = gamesSlice.actions;

export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async (id, { getState, dispatch }) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist`,
      {
        gameId: id,
      },
      {
        // withCredentials: true,
        headers: authHeader(getState()),
      }
    );
    dispatch(fetchUserData());
    return getState().user;
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (id, { getState, dispatch }) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist`,
        {data: {
          gameId: id,
        },
        headers: 
            // withCredentials: true,
            authHeader(getState()),
    }
    );
    return dispatch(fetchUserData());
  }
);

export const addToOrders = createAsyncThunk(
  'orders/add',
  async (id, { getState }) => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/user/add-orders`,
      {
        gameId: id,
      },
      {
        withCredentials: true,
        headers: authHeader(getState()),
      }
    );
    return;
  }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addToWishlist.fulfilled, (state, action) => {
          const { wishlist } = action.payload;
          return wishlist;
        })
        .addCase(addToWishlist.rejected, (state, action) => {
          console.log(action.error.message);
        })
        .addCase(removeFromWishlist.fulfilled, (state, action) => {
          const { wishlist } = action.payload;
          return wishlist;
        })
        .addCase(removeFromWishlist.rejected, (state, action) => {
          console.log(action.error.message);
        })
        .addCase(addToOrders.fulfilled, (state, action) => {
          const { orders } = action.payload;
          return orders;
        })
        .addCase(addToOrders.rejected, (state, action) => {
          console.log(action.error.message);
        });
    },
});

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    user: userSlice.reducer,
    games: gamesSlice.reducer,
    wishlist: wishlistSlice.reducer,
  });

export default rootReducer;