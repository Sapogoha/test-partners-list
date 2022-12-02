import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import partnersSlice from './slices/partnersSlice';
import partnerSlice from './slices/partnerSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    partners: partnersSlice,
    partner: partnerSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
