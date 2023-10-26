// 날짜 형식 포멧 YY-MM-DD
export const DateFormat_YMD = (dateString: string) => {
  const date = dateString.split("T")[0];
  return date;
};

// 날짜 형식 포멧 YY
export const DateFormat_YY = (dateString: string) => {
  const date = dateString.split("-")[0];
  return date;
};
