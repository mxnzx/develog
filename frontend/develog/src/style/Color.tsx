// 메인 배경화면 색상
export const backgroundWhite = "rgba(255, 255, 255, 0.46);";

// 아래 white 박스 제외한 전부
export const boxNormalWhite = "rgba(255, 255, 255, 0.50)";

// 텍스트 - 제목 밑의 부가설명 글자색 (면접페이지 - 예상면접질문 바로 아래 글)
export const subTextColor = "#63636B;";

// 면접 스크립트에 있는 박스들
export const boxTransWhite = "rgba(255, 255, 255, 0.70)";

export const colorBlue = "#99b4c9";

export const skyBlue = "#C1D8EB";
export const pinkRed = "#FAC0C0";
export const Color = {
  //버튼 컬러
  backgroundWhite: "rgba(255, 255, 255, 0.46)",
  colorBlue: "#99b4c9",
  darkBlack: "#0F172A",
  beige: "#E8E2D1",
  white: "#FFFFFF",
  btnGrey: "rgba(140, 140, 140, 0.42)",
  skyBlue: "#C1D8EB",
  pinkRed: "#FAC0C0",
};

//Color 객체의 속성 이름을 추출하기 위한 타입.
export type ColorKeyTypes = keyof typeof Color;
