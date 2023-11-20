//모의면접 질문 저장
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//사용자 상태 인터페이스 정의
//질문 interface

//스토어 상태 모델
export interface PracticeState {
  predictionList: { predictionIdx: number; questionContent: string; isTail: boolean }[];
}

//초기 상태 정의
const initialState: PracticeState = {
  predictionList: [],
};
//createSlice 사용하여 슬라이스 생성
const PracticeQuestionSlice = createSlice({
  name: "practiceStore",
  initialState,
  reducers: {
    //상태 변경을 처리하는 리듀서 함수 추가
    addPrediction: (state, action) => {
      state.predictionList.push(action.payload);
    },
    removePrediction: (state, action) => {
      const { predictionIdx, isTail } = action.payload;

      // predictionList 배열에서 제거할 항목을 찾는 로직
      const predictionIndexToRemove = state.predictionList.findIndex(
        (prediction) => prediction.predictionIdx === predictionIdx && prediction.isTail === isTail
      );

      if (predictionIndexToRemove !== -1) {
        // 해당 항목을 배열에서 제거
        state.predictionList.splice(predictionIndexToRemove, 1);
      }
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

//리듀서 함수 내보내기
export const { addPrediction, removePrediction, reset } = PracticeQuestionSlice.actions;

//스토어 생성
export default PracticeQuestionSlice.reducer;
