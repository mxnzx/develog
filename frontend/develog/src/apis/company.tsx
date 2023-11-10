// 기업 페이지 API 작성
import { privateApi, fastPrivateApi } from "apis";

// 회원별 자소서 키워드 조회
export const getCompanyInfo = async (companyId: number) => {
  try {
    console.log("기업정보 조회 try?", companyId);
    const response = await privateApi.get(`/company/detail/header/${companyId}`);
    console.log("기업정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
