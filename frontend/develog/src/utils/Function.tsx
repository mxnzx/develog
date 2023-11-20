// 날짜 형식 포맷 YY-MM-DD
export const DateFormat_YMD = (dateString: string) => {
  const date = dateString.split("T")[0];
  return date;
};
// 날짜 형식 포맷 YY-MM
export const DateFormat_YM = (dateString: string) => {
  const date = dateString.slice(0, 7);
  return date;
};

// 날짜 형식 포맷 YY
export const DateFormat_YY = (dateString: string) => {
  const date = dateString.split("-")[0];
  return date;
};

export const formatTime = (timeinMillis: number): string => {
  const hours = Math.floor(timeinMillis / 3600000);
  const minutes = Math.floor((timeinMillis % 3600000) / 60000);
  const seconds = Math.floor((timeinMillis % 60000) / 1000);
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return formattedTime;
};
