import { privateApi } from "apis";

export const getMainInfo = async () => {
  try {
    const response = await privateApi.get("/users/main");
    return response.data;
  } catch (error) {
    throw error;
  }
};
