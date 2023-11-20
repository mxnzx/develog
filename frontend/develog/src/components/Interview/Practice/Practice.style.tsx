import styled, { css } from "styled-components";

interface IconProps {
  checkTailQues?: boolean;
}
export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 370px;
  overflow: auto;
  overflow-x: hidden;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: row;
  height: 28px;
  align-items: center;
  margin: 2%;
  position: relative;
`;

export const Icon = styled.img<IconProps>`
  margin-left: 5px;
  height: 70%;
  z-index: 99;
  ${(props) =>
    props.checkTailQues &&
    css`
      position: absolute;
      right: 0px;
      z-index: 100;
    `}
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
