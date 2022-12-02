import { createSlice } from '@reduxjs/toolkit';

import getUsers from '../thunks/getUsers';
interface IPartnerModified {
  id: number;
  name: string;
  avatar: string;
  likeBtn: boolean;
}

interface IPartners {
  partners: IPartnerModified[] | [];
  loading: boolean;
  error: boolean | string | undefined;
  page: number;
  showMore: boolean;
}

const savedPartnersSlice = localStorage.getItem('partnersSlice');

const initialState: IPartners = {
  partners:
    savedPartnersSlice !== null ? JSON.parse(savedPartnersSlice).partners : [],
  loading: false,
  error: false,
  page: savedPartnersSlice !== null ? JSON.parse(savedPartnersSlice).page : 1,
  showMore:
    savedPartnersSlice !== null
      ? JSON.parse(savedPartnersSlice).showMore
      : true,
};

const partnersSlice = createSlice({
  name: 'partnersSlice',
  initialState,
  reducers: {
    removePartners(state) {
      state.partners = [];
      state.page = 1;
      state.showMore = true;
      localStorage.removeItem('partnersSlice');
    },
    setPage(state) {
      state.page += 1;
    },
    toggleLikeBtn(state, action) {
      state.partners = [
        ...state.partners.map((partner) => {
          if (partner.id === action.payload) {
            partner.likeBtn = !partner.likeBtn;
          }
          return partner;
        }),
      ];
      localStorage.setItem(
        'partnersSlice',
        JSON.stringify({
          partners: state.partners,
          page: state.page,
          showMore: state.showMore,
        })
      );
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
      localStorage.setItem(
        'partnersSlice',
        JSON.stringify({
          partners: state.partners,
          page: state.page,
          showMore: state.showMore,
        })
      );
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { removePartners, setPage, toggleLikeBtn } = partnersSlice.actions;

export default partnersSlice.reducer;
