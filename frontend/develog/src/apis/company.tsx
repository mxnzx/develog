// 기업 페이지 API 작성
import { privateApi, fastPrivateApi } from "apis";

// 관심기업 리스트 조회
export const getLikeList = async (userId: number) => {
  try {
    // console.log("관심기업 리스트 조회 try?", userId);
    const response = await privateApi.get(`/company/list/${userId}`);
    // console.log("관심기업 리스트 조회 결과", response.data.data);
    return response.data.data;
  } catch (error) {
    // console.log(error);
  }
};

// 기업 상세페이지 헤더 기업 정보
export const getCompanyInfo = async (companyId: number) => {
  try {
    // console.log("기업정보 조회 try?", companyId);
    const response = await privateApi.get(`/company/detail/header/${companyId}`);
    // console.log("기업정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    // console.log(error);
  }
};

// 기업 상세페이지 지원 정보
export const getApplylist = async (companyId: number) => {
  try {
    // console.log("지원정보 item 조회 try?", companyId);
    const response = await privateApi.get(`/company/info/list/${companyId}`);
    // console.log("지원정보 item 결과", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 관심기업 등록 API
export const addInterestingCompany = async (userId: number, values: any) => {
  try {
    const response = await privateApi.post(`/company/add/${userId}`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 기업 검색 (기업 등록 시)
export const searchCompany = async () => {
  try {
    const response = await privateApi.get(`/company/search`);
    // console.log('어떤기업 들어와?', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관심기업 지원 등록 API
export const addApplyCompany = async (values: any) => {
  try {
    const response = await privateApi.post(`/company`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관심기업 지원 삭제 API
export const deleteApplyCompany = async (historyId: number) => {
  try {
    const response = await privateApi.delete(`/company/${historyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 관심기업 지원정보 면접 준비 리스트 조회
export const getCompanyInterviewList = async (interviewId: number) => {
  try {
    const response = await privateApi.get(`/company/interview/${interviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 기업 상세페이지 자소서 조회
export const getCompanyResume = async (resumeId: number) => {
  try {
    const response = await privateApi.get(`/company/resume/${resumeId}`);
    // console.log('기업 자소서랑 질문 조회:', response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};