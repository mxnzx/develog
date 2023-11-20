// 포트폴리오 관련(자소서 왼쪽 컴포넌트)
// historyId는 지원정보의 고유 번호

import { privateApi, fastPrivateApi } from "apis";

// 회원별 자소서 키워드 조회
export const getApplyInfo = async (historyId: number) => {
  try {
    // console.log("지원정보 조회 try?", historyId);
    const response = await privateApi.get(`/resume/info/${historyId}`);
    // console.log("지원정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 이전 자소서  조회
export const getPreResume = async (userId: number, userCategoryList: number[], categoryList: number[]) => {
  try {
    // console.log("✅이전 자소서 조회할 키워드: ", userCategoryList, categoryList);
    const response = await privateApi.get(
      `/resume/similar?userId=${userId}&userCategoryList=${userCategoryList}&categoryList=${categoryList}`);
    // console.log("이전 자소서 호출 결과", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// https://develog.co.kr/api/resume/similar?userId=9&userCategoryList=&categoryList=1,7,10
// https://develog.co.kr/api/resume/similar?userId=51&userCategoryList=&categoryList=10&categoryList[]=10