import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Color, ColorKeyTypes } from "style/Color";

interface ButtonStyle {
  width?: string;
  height?: string;
  buttonColor?: ColorKeyTypes;
  hasBorder?: boolean;
  borderColor?: ColorKeyTypes;
  borderRadius?: string;
  fontColor?: ColorKeyTypes;
  fontSize?: string;
  fontWeight?: string;
  logIn?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyle {
  children: ReactNode;
  className?: string;
}

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <>
      <ButtonStyled className={className} {...rest}>
        {children}
      </ButtonStyled>
    </>
  );
};

const ButtonStyled = styled.button<ButtonStyle>`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;

  //버튼 눌렀을 때 테두리 하얀색 없애기
  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    opacity: 80%;
    transition: 0.5s;
  }

  ${({ logIn }) =>
    logIn &&
    css`
      &:hover {
        transform: scale(1.1);
        opacity: 100%;
      }
    `}

  ${({
    width = "auto",
    height = "auto",
    buttonColor = "white",
    hasBorder = false,
    borderColor = "black",
    borderRadius = "4px",
    fontColor = "black",
    fontSize = "14px",
    fontWeight = "100",
  }) => css`
    width: ${width};
    height: ${height};
    background-color: ${(Color as Record<string, string>)[buttonColor]};
    border: ${hasBorder ? `1px solid ${(Color as Record<string, string>)[borderColor]}` : "none"};
    border-radius: ${borderRadius};
    color: ${(Color as Record<string, string>)[fontColor]};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
  `}
`;
export default Button;
