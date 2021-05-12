import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
//import { fetchData } from './fetchData';


/* async actions */

export const logIn = createAsyncThunk(
  'user/logIn',
  async ({ username, password }, { rejectWithValue }) => {
    if (username === 'abcd' && password === 'abcd') {
      return {
        username,
        jwtToken: username + ' OK'
      };
    } else {
      return null;
    }
  }
);


/* slice */
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
    
    status: 'idle',
    error: null,

    usernameValue: '',
    passwordValue: ''
  },
  reducers: {
    updateUsername: (state, action) => {
      state.usernameValue = action.payload;
    },
    updatePassword: (state, action) => {
      state.passwordValue = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = 'idle';
      state.error = '';
    }
  },
  extraReducers: {
    [logIn.pending]: (state, action) => {
      state.status = 'loading';
    },
    [logIn.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.usernameValue = '';
      state.passwordValue = '';
      if (action.payload) {
        state.user = action.payload;
        state.isLoggedIn = true;
      } else {
        state.error = 'No such combination of username and password found.';
      }
    },
    [logIn.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});


/* export actions */
export const {
  updateUsername,
  updatePassword,
  logOut
} = userSlice.actions;


export default userSlice.reducer;
