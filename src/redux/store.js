import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalSlice from './slices/modalSlice';
import apiReducer from './slices/apiSlice';

const store = configureStore({
  //   //5. store에 slice 등록
  reducer: {
    modal: modalSlice,
    auth: authReducer,
    api: apiReducer,
  },
});

export default store;
