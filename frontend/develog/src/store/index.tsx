// store.ts
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "store/reducers/user"; // 나중에 작성할 userSlice 파일을 가져옵니다.
import resumeReducer, { recentResume } from "./reducers/resumeStore";
import practiceReducer from "./reducers/practiceStore";
import keywordReducer from "./reducers/keyword";

// Persist
import { persistReducer, FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER } from "redux-persist";
import user from "store/reducers/user";
import resumeStore from "./reducers/resumeStore";
import voiceStore from "./reducers/voiceStore";
import practiceStore from "./reducers/practiceStore";
// 로컬 스토리지에 저장
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  recentResume: resumeReducer,
  practiceStore: practiceReducer,
  keyword: keywordReducer, // keywordReducer 추가
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "resumeStore", "voiceStore", "practiceStore"], // 유지하고 싶은 값
  blacklist: [], // 유지하기 싫음
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     resumeStore: resumeReducer,
//   },
// });
export default store;
