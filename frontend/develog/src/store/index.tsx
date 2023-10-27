// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/reducers/user'; // 나중에 작성할 userSlice 파일을 가져옵니다.

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
