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

export const fetchAdminBoard = createAsyncThunk(
  'admin/fetch',
  async (_, { getState }) => {
    const { accessToken } = selectUser(getState());
    const data = await userService.getAdminBoard(accessToken);
    return data;
  } 
)

export const fetchAllUserForAdmin = createAsyncThunk(
  'admin/fetch',
  async (_, { dispatch, getState }) => {
    const { accessToken } = selectUser(getState());
    const data = await userService.getUserDataForAdmin(accessToken);
    return {"ALL_USER": data.data}
  } 
);

export const fetchAllUserRolesForAdmin = createAsyncThunk(
  'admin/fetch',
  async (_, { dispatch, getState }) => {
    const { accessToken } = selectUser(getState());
    const data = await userService.getUserRolesDataForAdmin(accessToken);
    return {"ALL_USER_ROLES": data.data}
  } 
);

// export const fetchOnlyUserForAdmin = createAsyncThunk(
//   'admin/fetch',
//   async (_, { dispatch, getState }) => {
//     const { accessToken } = selectUser(getState());
//     const data = await userService.getAllUserRole(accessToken);
//     return {"USER_ROLE": data.data}
//   } 
// );

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
      })
      .addCase(fetchAdminBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adminData = action.payload;
      })
      .addCase(fetchAdminBoard.rejected, (state, action) => {
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
        withCredentials: false,
        headers: authHeader(getState()),
      }
    );
    return data;
  }
);

export const searchGames = createAsyncThunk(
  'games/search',
  async (query, { getState, dispatch }) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/games/search?${query}`,
      {
        withCredentials: false,
        headers: authHeader(getState()),
      }
    );
    return data;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    setGames: (state, action) => {
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
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(searchGames.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { setGames, sortGames } = gamesSlice.actions;

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

export const addToCart = createAsyncThunk(
  'cart/add',
  async (id, { getState, dispatch }) => {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/cart`,
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

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (id, { getState, dispatch }) => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/cart`,
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

export const SubtractWallet = createAsyncThunk(
  'wallet/subtract',
  async (payment, {getState, dispatch})=>{
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wallet`,
        {
          payment: payment
        },
        {
          headers: authHeader(getState()),
        }
    );
    dispatch(fetchUserData());
    return getState().user;
  }
)

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

export const makeOrder = createAsyncThunk(
  'orders/',
  async ({userId, games}, {getState, dispatch})=>{
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/order`,
      {
        userId: userId,
        games: games,
      },
      {
        // withCredentials: true,
        headers: authHeader(getState())
      }
    )
    return;
  }
)

export const getOrders = createAsyncThunk(
  'orders/get',
  async ({ userId }, {getState, dispatch})=>{
    const {da} = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/order/${userId}`,
      // {
      //   userId: userId,
      // },
      {
        withCredentials: true,
        // headers: authHeader(getState()) 
        heades: { "Content-Type": "Application/json"}
      }
    );
    return da;
  }
)


export const updateGame = createAsyncThunk(
  'game/:id',
  async (game, {getState, dispatch}) =>{
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/games/${game.id}`,
      {
        game
      },
      {
        params: {id: game.id},
        headers:authHeader(getState())
      }
    )
  }
)

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
        })
        .addCase(getOrders.fulfilled, (state, action) => {
          const { orders } = action.payload;
          return orders;
        })
        .addCase(getOrders.rejected, (state, action) => {
          console.log(action.error.message);
        })
        .addCase(SubtractWallet.fulfilled, (state, action) => {
          return ;
        })
        .addCase(SubtractWallet.rejected, (state, action) => {
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