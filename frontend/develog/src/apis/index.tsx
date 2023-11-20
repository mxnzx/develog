import axios, { AxiosInstance } from "axios";
export * from "./main";
const BASE_URL = "https://develog.co.kr/api";
const PYTHON_URL = "https://develog.co.kr/fastapi";

export const publicApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const fastPrivateApi = axios.create({
  baseURL: PYTHON_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token;

  return config;
});

export const fileApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// 리프레시 토큰을 통해 서버로부터 새로운 액세스 토근 가져오기
export async function postRefreshToken() {
  // console.log("리프레시 토큰 재발급");
  const headers = {
    // withCredential: true,
    "Authorization-refresh": "Bearer " + localStorage.getItem("refresh_token"),
    // 'Access-Control-Allow-Origin': '*',
    // "Access-Control-Allow-Credentials": true,
  };
  const response = await publicApi.put("/auth/refresh", null, { headers });
  // console.log("리프레시 성공");
  return response.data;
}

// 모든 응답에 대한 처리
// privateApi.interceptors.response.use(
//   // 응답 성공시
//   (response) => {
//     console.log("===================================interceptors");
//     return response.data;
//   },
//   // 응답 실패시(토큰 재발급 필요시)
//   async (error) => {
//     const { config } = error;
//     console.log("===================================error");
//     console.log("error", error);

//     const originRequest = config;
//     try {
//       const response = await postRefreshToken();
//       const newAccessToken = response.data.accessToken;
//       localStorage.setItem("accessToken", response.data.accessToken);
//       localStorage.setItem("refreshToken", response.data.refreshToken);
//       axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//       originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       return axios(originRequest);
//     } catch {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       // window.location.href = ("/");
//     }
//     return Promise.reject(error);
//   }
// );
