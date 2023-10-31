import axios from "axios";
import { publicApi } from "apis";

// 로그인 조회 api
export const logInAPI = async (code: string) => {
  try {
    // console.log('마이페이지 try진입')
    const response = await publicApi.post("/users/login/kakao", { data: code });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("error!", error);
  }
};
