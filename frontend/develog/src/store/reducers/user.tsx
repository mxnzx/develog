// UserSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// 사용자 상태 인터페이스 정의
export interface UserState {
  isAuthorized: boolean;
  userId: number;
  userEmail: string;
  name: string;
}

// 초기 상태 정의
const initialState: UserState = {
  isAuthorized: false,
  userId: -1,
  userEmail: "0",
  name: "0",
};

// createSlice를 사용하여 슬라이스 생성
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAuthorized = true;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.name = action.payload.name;
    },
    logOut: (state) => {
      state.isAuthorized = false;
      state.userId = -1;
      state.userEmail = "0";
      state.name = "0";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { logIn, logOut } = UserSlice.actions;

export default UserSlice.reducer;
