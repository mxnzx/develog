import styled, { css } from "styled-components";
import { backgroundWhite, boxNormalWhite, subTextColor } from "style/Color";

// 배경
export const InterviewGround = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  /* height: 100%; */
  border-radius: 2.5rem;
  background-color: ${backgroundWhite};
  padding: 1rem 3rem;
  /* overflow-y: scroll; */
`;

// 인터뷰 메인페이지의 상단 2개 박스
export const InterviewHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  margin-bottom: 2rem;
`;

// 제목 글씨
export const LabelContainer = styled.div`
  padding-left: 0.75rem;
  margin-top: 1.25rem;
  /* margin-bottom: 0.5rem; */
`;

export interface InterviewFullLineType {
  Long?: boolean;
  ML?: boolean;
}

// 한줄씩 있는 녀석들
export const InterviewFullLine = styled.div<InterviewFullLineType>`
  width: 100%;
  position: relative;
  background-color: ${boxNormalWhite};
  white-space: nowrap;
  height: 2.635rem;
  max-height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 7rem;
  overflow-x: hidden;
  margin-bottom: 0.5rem;

  /* 아래 있는 Text에서 말줄임 */
  & > div {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 오른쪽 연습하기 텍스트 */
  & div:nth-child(2) {
    position: absolute;
    right: 2rem;
    color: ${subTextColor};
    &:hover {
      cursor: pointer;
    }
  }
  /* 연습하기 옆의 > */
  & img:last-child {
    position: absolute;
    right: 0.75rem;
    &:hover {
      cursor: pointer;
    }
  }

  ${({ Long }) =>
    Long &&
    css`
      padding-right: 0.75rem;
      & > div {
        white-space: pre-wrap;
        /* overflow: hidden; */
      }
    `}
  ${({ ML }) =>
    ML &&
    css`
      margin-left: 0.5rem;
    `}
`;

// 자소서 내용
export const InterviewResumeBox = styled.div`
  width: 100%;
  background-color: ${boxNormalWhite};

  /* 줄바꿈 적용 + 영역 초과시, 자동 줄바꿈 */
  white-space: pre-wrap;

  /* 자소서 내용이 영역 넘어가면 div를 늘릴지, 스크롤로 처리할지. */
  /* height: 9rem; */
  /* 영역 늘리기 */
  min-height: 9rem;

  margin: 1rem auto;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  overflow-y: hidden;
`;

// 예상면접 줄바꿈
export const PredictionMargin = styled.div`
  margin-bottom: 0.5rem;
`;

// 예상면접질문 설명 및 버튼
export const SubTextButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

// SVG 전용
// 체크, + 등

export interface StyledSVGProps {
  marginRight?: boolean;
}
export const StyledSVG = styled.img<StyledSVGProps>`
  width: 1.25rem;
  height: 1.5rem;

  ${({ marginRight }) =>
    marginRight &&
    css`
      margin-right: 0.25rem;
    `}
`;

// 버튼 내부 SVG
export const BtnSVG = styled.img`
  margin-left: 3px;
  /* width: 0.5rem; */
  height: 1rem;
`;
