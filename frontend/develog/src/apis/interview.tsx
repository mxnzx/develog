import { privateApi, fastPrivateApi } from "apis";
export const getQuestion = async (interviewId: number) => {
  try {
    const response = await privateApi.get(`/interview/exam/question/${interviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//랜덤 꼬리 질문 없이 모의 면접 시작하는 api
export const playPractice = async (interviewId: number, checkedPredictionId: number[], checkedTailId: number[]) => {
  try {
    const response = await privateApi.post(`/interview/exam/question`, {
      interviewId,
      checkedPredictionId,
      checkedTailId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GPT 기반 예상 면접 질문 등록(생성하기 버튼 누를때)
export const getOpenAIPredictId = async (interviewId: number, resumeDetailId: number) => {
  try {
    const response = await privateApi.post(`/interview/openAI`, { interviewId, resumeDetailId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//사용자가 임의로 추가하는 질문
export const addPersonalQuestion = async (interviewId: number, resumeDetailId: number, questionContent: string) => {
  try {
    // console.log(interviewId);
    const response = await privateApi.post(`/interview/resume/onlyHerQuestion`, {
      interviewId,
      resumeDetailId,
      questionContent,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//예상 면접 질문 페이지 조회
export const getDetailPrediction = async (interviewId: number, resumeDetailId: number, predictionId: number) => {
  try {
    const response = await privateApi.get(
      `/interview/prediction/list?interviewId=${interviewId}&resumeDetailId=${resumeDetailId}&predictionId=${predictionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//답변 스크립트 저장
export const saveScript = async (predictionId: number, answerContent: string) => {
  try {
    const response = await privateApi.post("/interview/prediction/answer", {
      predictionId,
      answerContent,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//예상 면접 질문 답변 키워드 등록
export const addNewKeyword = async (predictionId: number, keyword: string) => {
  try {
    const response = await privateApi.post("/interview/prediction/keyword", {
      predictionId,
      keyword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//예상 면접 질문 답변 삭제
export const deleteKeyword = async (keywordId: number) => {
  try {
    const response = await privateApi.delete("/interview/prediction/keyword", {
      data: {
        keywordId: keywordId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//꼬리 질문 생성(프론트->fastAPI)
export const createTails = async (content: string) => {
  try {
    const response = await fastPrivateApi.post("/interview/create-tail", {
      content,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//꼬리질문 생성(프론트->백)
export const getTailId = async (predictionId: number) => {
  try {
    const response = await privateApi.post("/interview/tail", {
      predictionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//꼬리질문 제목 등록
export const registTailTitle = async (tailId: number, tailTitle: string) => {
  try {
    const response = await privateApi.post("/interview/tail/title", {
      tailId,
      tailTitle,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//fastApi 예측 질문 생성
export const createPredictionQ = async (content: string) => {
  try {
    const response = await fastPrivateApi.post("/interview/create-prediction", {
      content,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//예측 질문 5개 서버에 등록
export const registPredictionList = async (interviewId: number, resumeDetailId: number, questionContents: string[]) => {
  try {
    // console.log(interviewId);
    const response = await privateApi.post("/interview/openAI/question", {
      interviewId,
      resumeDetailId,
      questionContents,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//예상 면접 질문 녹음 파일 S3저장(저장은 안함, voiceId 얻기위함)
export const getVoiceId = async (predictionId: number) => {
  try {
    const formData = new FormData();
    const emptyFile = new File([], "empty");
    const predictionBlob = { predictionId: predictionId };
    const jsonBlob = new Blob([JSON.stringify(predictionBlob)], {
      type: "application/json",
    });
    formData.append("predictionId", jsonBlob);

    formData.append("file", emptyFile);

    const response = await privateApi.post("/interview/s3/voice/prediction", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//예상 면접 질문 녹음 분석 결과 등록
export const registRecordResult = async (
  voiceId: number,
  voiceText: string,
  voiceSecond: number,
  voiceCheckType: string,
  containsKeyword: string[],
  unContainsKeyword: string[]
) => {
  try {
    const response = await privateApi.post("/interview/analysis/voice", {
      voiceId,
      voiceText,
      voiceSecond,
      voiceCheckType,
      containsKeyword,
      unContainsKeyword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//예상면접 질문 분석 결과 조회
export const getAnalysisResult = async (voiceId: number) => {
  try {
    const response = await privateApi.get(`/interview/prediction/voice/${voiceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//자소서에 따른 면접 페이지 조회
export const getInterviewCompanyInfo = async (historyId: number) => {
  try {
    const response = await privateApi.get(`/interview?historyId=${historyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
//자소서에 따른 면접 페이지 조회(기업 정보 제외)
export const getInterviewInfo = async (resumeDetailId: number) => {
  try {
    const response = await privateApi.get(`/interview/resume/?resumeDetailId=${resumeDetailId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//면접 최초 등록
export const postInterview = async (interviewAt: any, place: string, historyId: number) => {
  try {
    const response = await privateApi.post("/interview", {
      interviewAt: interviewAt,
      place: place,
      historyId: historyId,
    });
    // console.log("면접 최초 등록 결과", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
