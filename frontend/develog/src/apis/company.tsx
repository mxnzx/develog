// 관심기업 등록 API
import { privateApi } from "apis";

export const addInterestingCompany = async (userId: number, values: any) => {
  try {
    const response = await privateApi.post(`/company/add/${userId}`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};
