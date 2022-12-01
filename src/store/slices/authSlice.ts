import { createSlice } from '@reduxjs/toolkit';

import signIn from '../thunks/postSignIn';
import signUp from '../thunks/postSignUp';

interface IAuth {
  token: string | null;
  loading: boolean;
  error: boolean | string | undefined;
}
const savedToken = localStorage.getItem('token');

const initialState: IAuth = {
  token: savedToken !== null ? JSON.parse(savedToken) : null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      const { token } = payload;
      state.loading = false;
      state.error = false;
      localStorage.setItem('token', JSON.stringify(token));
      state.token = token;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      const { token } = payload;
      state.loading = false;
      state.error = false;
      localStorage.setItem('token', JSON.stringify(token));
      state.token = token;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;
