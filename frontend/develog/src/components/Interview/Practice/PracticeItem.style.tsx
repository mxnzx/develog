import styled, { css } from "styled-components";
import { backgroundWhite, colorBlue } from "style/Color";

interface IconProps {
  isToggle?: boolean;
  isSelect?: boolean;
}

interface SelectProps {
  isSelect?: boolean;
  isTail?: boolean;
}

export const Wrapper = styled.div<SelectProps>`
  cursor: pointer;
  background-color: ${(props) => (props.isSelect ? colorBlue : backgroundWhite)};
  height: 40px;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 12px;
  margin: 5px;
  align-items: center;
  position: relative;
  ${(props) =>
    props.isTail &&
    css`
      width: 95%;
      margin-right: -50px;
    `}
`;

export const Icon = styled.img<IconProps>`
  height: 80%;
  margin-left: 10px;
  z-index: 100;
  ${(props) =>
    props.isToggle &&
    css`
      position: absolute;
      right: 10px;
    `}
  ${(props) =>
    props.isSelect &&
    css`
      position: absolute;
      z-index: 99;
    `}
`;

export const Text = styled.p`
  margin-left: 10px;
`;
