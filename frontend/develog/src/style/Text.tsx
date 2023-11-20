import React from "react";

// 스타일
import styled, { css } from "styled-components";
import { subTextColor } from "./Color";

interface TextProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;

  // 굵게
  $isBold?: boolean;

  // 중앙 정렬
  $center?: boolean;

  // 글자 크기
  $sizeUpHalf?: boolean;
  $sizeDownHalf?: boolean;

  // 색상
  $isSubTextColor?: boolean;
}
const StyledText = styled.div<TextProps>`
  color: #000;
  font-size: 1rem;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  line-height: 100%; // 1.375rem

  ${(props) =>
    props.$isBold &&
    css`
      font-family: "Pretendard-SemiBold";
    `}

  /* 글자 위치 */
    ${(props) =>
    props.$center &&
    css`
      text-align: center;
    `}

    /* 사이즈 */
    ${(props) =>
    props.$sizeUpHalf &&
    css`
      font-size: 1.5rem;
    `}
    ${(props) =>
    props.$sizeDownHalf &&
    css`
      font-size: 0.75rem;
    `}

    /* 색상 */
    ${(props) =>
    props.$isSubTextColor &&
    css`
      color: ${subTextColor};
    `}
`;

const Text = (props: TextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default Text;
