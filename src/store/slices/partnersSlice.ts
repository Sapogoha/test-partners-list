import { createSlice } from '@reduxjs/toolkit';

import getUsers from '../thunks/getUsers';
interface IPartnerModified {
  id: number;
  name: string;
  avatar: string;
}

interface IPartners {
  partners: IPartnerModified[] | [];
  loading: boolean;
  error: boolean | string | undefined;
  page: number;
  showMore: boolean;
}

const initialState: IPartners = {
  partners: [],
  loading: false,
  error: false,
  page: 1,
  showMore: true,
};

const partnersSlice = createSlice({
  name: 'partnersSlice',
  initialState,
  reducers: {
    removePartners(state) {
      state.partners = initialState.partners;
      state.page = initialState.page;
      state.showMore = initialState.showMore;
    },
    setPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      if (payload.length < 8) {
        state.showMore = false;
      }
      state.partners = [...state.partners, ...payload];
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { removePartners, setPage } = partnersSlice.actions;

export default partnersSlice.reducer;
