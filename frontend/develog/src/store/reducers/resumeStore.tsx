// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 사용자 상태 인터페이스 정의
export interface ResumeState {
  resumeDetailId: number;
}

// 초기 상태 정의
const initialState: ResumeState = {
  resumeDetailId: 0,
};

// createSlice를 사용하여 슬라이스 생성
const ResumeSlice = createSlice({
  name: "resumeStore",
  initialState,
  reducers: {
    recentResume: (state, action) => {
      // console.log(action, "ResumeStore - 자소서 업데이트");
      state.resumeDetailId = action.payload.resumeDetailId;
    },
  },
});

export const { recentResume } = ResumeSlice.actions;

export default ResumeSlice.reducer;
