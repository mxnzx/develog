// RootState.ts
import { UserState } from "./reducers/user";
import { ResumeState } from "./reducers/resumeStore";
import { VoiceState } from "./reducers/voiceStore";
import { PracticeState } from "./reducers/practiceStore";

// 모든 슬라이스의 상태를 포함하는 전체 상태 타입을 정의합니다.
export interface RootState {
  user: UserState;
  // 자소서
  resumeStore: ResumeState;
  // TTS
  voiceStore: VoiceState;
  //모의면접 질문
  practiceStore: PracticeState;
}
