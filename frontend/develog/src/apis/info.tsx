import { privateApi } from "apis";

//회원 정보 조회
export const getInfo = async () => {
  try {
    const response = await privateApi.get(`/users/info`);
    // console.log("회원정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//어학 조회
export const getLanguage = async () => {
  try {
    const response = await privateApi.get(`portfolio/language`);
    // console.log("어학정보 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//프로젝트 조회
export const getProject = async () => {
  try {
    const response = await privateApi.get(`portfolio/project`);
    // console.log("프로젝트 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//교육 조회
export const getEducation = async () => {
  try {
    const response = await privateApi.get(`portfolio/edu`);
    // console.log("교육 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//자격증 조회
export const getLicense = async () => {
  try {
    const response = await privateApi.get(`portfolio/license`);
    // console.log("자격증 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//경력 조회
export const getCareer = async () => {
  try {
    const response = await privateApi.get(`portfolio/career`);
    // console.log("경력 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//학력 조회
export const getSchool = async () => {
  try {
    const response = await privateApi.get(`portfolio/school`);
    // console.log("학교 조회 결과", response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//학력 저장
export const postSchool = async (values: any) => {
  try {
    const response = await privateApi.post(`portfolio/school`, values);
    // console.log("학력 저장 완료?", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//경력 저장
export const postCareer = async (careerData: any) => {
  // console.log("보내려는 데이터:", careerData);
  try {
    const response = await privateApi.post(`portfolio/career`, careerData);
    // console.log("경력 저장 완료?", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//자격증 추가 및 수정
export const postLicense = async (values: any) => {
  try {
    const response = await privateApi.post(`portfolio/license`, values);
    // console.log("자격증 저장 완료?", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//교육 이수 최초 저장
export const postEdu = async (values: any) => {
  try {
    const response = await privateApi.post(`portfolio/edu`, values);
    // console.log("교육 이수 저장 완료?", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//프로젝트최초 저장
export const postProject = async (values: any) => {
  try {
    const response = await privateApi.post(`portfolio/project`, values);
    // console.log("프로젝트 저장 완료?", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//어학 저장
export const postLanguage = async (values: any) => {
  try {
    const response = await privateApi.post(`portfolio/language`, values);
    // console.log("어학 저장 완료?", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
