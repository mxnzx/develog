import { privateApi } from "apis";

// 회원별 자소서 키워드 조회
export const getInfo = async () => {
  try {
    const response = await privateApi.get(`/users/info`);
    console.log("회원정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
