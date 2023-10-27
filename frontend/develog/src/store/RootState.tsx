// RootState.ts
import { UserState } from '../store/reducers/user'; // 사용자 슬라이스의 상태 타입을 가져옵니다.

// 모든 슬라이스의 상태를 포함하는 전체 상태 타입을 정의합니다.
export interface RootState {
  user: UserState; 
}
