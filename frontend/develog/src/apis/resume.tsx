// 자소서 API
import { privateApi, fastPrivateApi } from "apis";

// 기업 상세페이지 자소서 최초등록
export const postCreateResume = async (deadlineAt: any, historyId: number) => {
  try {
    // console.log("자소서 등록 시도", historyId);
    const response = await privateApi.post("/resume/", {
      deadlineAt: deadlineAt,
      historyId: historyId,
    });
    // console.log("자소서 최초 등록 결과", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 상세 조회
export const getResumeDetail = async (resumeId: number) => {
  try {
    // console.log(resumeId,'번 자소서 조회 시도');
    const response = await privateApi.get(`/resume/${resumeId}`);
    // console.log('res:', response.data.data);
    return response.data.data;
  } catch (error) {
    // console.log(error);
  }
};

// 회원별 자소서 키워드 조회
export const getUserKeywords = async (userId: number) => {
  try {
    // console.log("키워드조회? try?", userId);
    const response = await privateApi.get(`/resume/category/${userId}`);
    // console.log("키워드 조회res", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 키워드 생성
export const postAddKeyword = async (userId: number, enteredKeyword: string) => {
  try {
    // console.log("키워드 추가 정보?", userId, enteredKeyword);
    const response = await privateApi.post("/resume/keyword", {
      userId: userId,
      keyword: enteredKeyword,
    });
    // console.log("키워드 등록 res", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 저장 API
export const saveResume = async (userId: number, resumeIds: number, details: any) => {
  try {
    // console.log(userId, resumeIds, "자소서데이터 Lisg try", details);
    const response = await privateApi.put("/resume/final", {
      userId: userId,
      resumeId: resumeIds,
      details: [details],
      isStore: "T",
    });
    // console.log("자소서 저장 성공?", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 gpt 첨삭 API
export const resumeGpt = async (content: string) => {
  try {
    // console.log("지피티 try?");
    const response = await fastPrivateApi.post("/resume/open-ai", {
      content: content,
    });
    // console.log("첨삭 성공?????");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 최초 등록 후 처음 1번 문항 생성 API(자기소개서 작성하러가기 -> resumeId 생성 후 실행할 통신)
export const addFirstResumeDetail = async (resumeId: number) => {
  try {
    const response = await privateApi.post("/resume/detail", {
      resumeId: resumeId,
      questionNum: 1,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 문항 추가 생성
export const addResumeDetail = async (resumeId: number, questionNum: number) => {
  try {
    const response = await privateApi.post("/resume/detail", {
      resumeId: resumeId,
      questionNum: questionNum,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 자소서 문항/항목 삭제
export const deleteResumeDetail = async (resumeDetailId: number) => {
  try {
    // console.log('삭제시도', resumeDetailId)
    const response = await privateApi.delete(`/resume/${resumeDetailId}`);
    // console.log('삭제성공?', response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
