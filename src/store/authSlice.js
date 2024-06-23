import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { headerApi } from 'src/utils/headerApi';

const admin = JSON.parse(localStorage.getItem('admin'));

const initialState = {
  loading: false,
  authenticate: localStorage.getItem('authenticate') || false,
  token: localStorage.getItem('token'),
  admin: admin,
  rule: localStorage.getItem('rule') || '',
  error: '',
};

export const login = createAsyncThunk('login/loginUser', async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  console.log(data);
  return await axios
    .post(`${process.env.REACT_APP_API_URL}admin/login`, data, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const logout = createAsyncThunk('logout/logoutUser', (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  return axios
    .get(`${process.env.REACT_APP_API_URL}admin/logout`, {
      headers: headerApi(token),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.admin = action.payload.admin;
      localStorage.setItem('admin', JSON.stringify(action.payload.admin));
      state.rule = action.payload.admin.rule;
    },
    logoutUser: (state) => {
      state.loading = false;
      state.error = '';
      state.authenticate = false;
      state.token = null;
      state.admin = null;
      state.rule = '';
      localStorage.removeItem('authenticate');
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      localStorage.removeItem('rule');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.authenticate = false;
      state.token = null;
      state.admin = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.msg === 'Successful login') {
        console.log(action.payload);
        state.loading = false;
        state.error = '';
        state.authenticate = true;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.rule = action.payload.admin.rule;
        localStorage.setItem('authenticate', true);
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('admin', JSON.stringify(action.payload.admin));
        localStorage.setItem('rule', action.payload.admin.rule);
      } else {
        state.loading = false;
        state.error = action.payload.error;
        state.authenticate = false;
        state.token = null;
        state.admin = null;
        state.rule = '';
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);
      console.log(action.payload.response.data.error);
      if (action.payload.response) {
        state.error = action.payload.response.data.error;
      } else {
        state.error = 'Error, please try again';
      }
      state.loading = false;
      state.authenticate = false;
      state.token = null;
      state.admin = null;
      state.rule = '';
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
      state.authenticate = false;
      state.token = null;
      state.admin = null;
      state.rule = '';
      localStorage.removeItem('authenticate');
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      localStorage.removeItem('rule');
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { changeError, updateProfile, logoutUser } = authReducer.actions;
export default authReducer.reducer;
