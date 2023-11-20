import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ListType } from "components/Main/HomeInterview.style";


// 사용자 상태 인터페이스 정의
export interface KeywordState {
  userCategoryList: any;
  categoryList: any;
}

// 초기 상태 정의
const initialState: KeywordState = {
  userCategoryList: [],
  categoryList: [],
};

// createSlice를 사용하여 슬라이스 생성
const KeywordSlice = createSlice({
  name: "keywordStore",
  initialState,
  reducers: {
    setUserCategoryList: (state, action) => {
      state.userCategoryList = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const { setUserCategoryList, setCategoryList } = KeywordSlice.actions;

export default KeywordSlice.reducer;
