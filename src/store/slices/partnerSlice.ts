import { createSlice } from '@reduxjs/toolkit';

import getUser from '../thunks/getUser';
interface IPartnerModified {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

interface IPartner {
  partner: IPartnerModified | null;
  loading: boolean;
  error: boolean | string | undefined;
}

const initialState: IPartner = {
  partner: null,
  loading: false,
  error: false,
};

const partnersSlice = createSlice({
  name: 'partnersSlice',
  initialState,
  reducers: {
    removePartner(state) {
      state.partner = initialState.partner;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.partner = payload;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { removePartner } = partnersSlice.actions;

export default partnersSlice.reducer;
