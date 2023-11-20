// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 사용자 상태 인터페이스 정의
export interface VoiceState {
  voiceURL: string;
}

// 초기 상태 정의
const initialState: VoiceState = {
  voiceURL: "blob:",
};

// createSlice를 사용하여 슬라이스 생성
const VoiceSlice = createSlice({
  name: "voiceStore",
  initialState,
  reducers: {
    recentResume: (state, action) => {
      // console.log(action, "voiceStore - TTS 업데이트");
      state.voiceURL = action.payload.voiceURL;
    },
  },
});

export const { recentResume } = VoiceSlice.actions;

export default VoiceSlice.reducer;
