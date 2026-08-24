import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';

import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

type UserState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  (data: TLoginData) => loginUserApi(data)
);

export const getUserThunk = createAsyncThunk('user/getUser', () =>
  getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutUserThunk = createAsyncThunk('user/logout', () =>
  logoutApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;

        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;

        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;

        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { setAuthChecked, clearUser } = userSlice.actions;

export default userSlice.reducer;
