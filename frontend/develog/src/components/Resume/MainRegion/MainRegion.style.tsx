import { backgroundWhite } from "style/Color";
import styled, { CSSProperties, css } from "styled-components";

export const TopContainer = styled.div``;
export const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 68%;
  height: 100%;
  border-radius: 2rem;
  /* background-color: beige; */
`;
export const PlainBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  /* width: 150px; */
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
  margin-left: 27px;
  margin-top: 20px;
  margin-bottom: 13px;
`;

export const TitleBox = styled.div`
  margin-left: 6px;
  margin-top: 25px;
`;
export const Text = styled.p`
  font-size: 17px;
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0px 7px 0px 5px;
  &:hover {
    opacity: 85%;
    transition: 0.5s;
  }
`;

interface ColorProps {
  backgroundColor?: string;
}
export const TieBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  height: 65px;
`;
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
export const Modal = styled.div`
  position: relative;
  top: 30%;
  left: 75%;
  transform: translate(-50%, -50%);
`;

export const KeywordList = styled.div`
  background-color: rgb(250, 250, 250);
  width: 200px;
  max-height: 340px;
  padding: 15px 12px;
  border-radius: 0.3rem;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.05);
`;
export const Wrapper = styled.div`
  /* max-height: 280px; */
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 240px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 0.5rem;
    /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.05); */
  }

  &::-webkit-scrollbar-track {
    background: rgba(160, 161, 162, 0.1);
    border-radius: 0.5rem;
  }
`;
export const KeywordItem = styled.span<ColorProps>`
  background-color: ${(props) => props.backgroundColor || "#ece6d2"};
  padding: 4px 13px;
  border: 0;
  font-size: 15px;
  border-radius: 6px;
  /* margin-bottom: 7px; */
  margin-right: 10px;
  box-shadow: 1px 1px 0px 0px rgba(131, 131, 131, 0.25);
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    opacity: 75%;
  }
`;

export const SelectedKeywords = styled.div`
  margin-left: 25px;
`;

export const KeywordBtn = styled.span<ColorProps>`
  /* background-color: #e8e2d1; */
  /* background-color: ${(props) => props.backgroundColor || "#c2d4e2dd"}; */
  background-color: ${(props) => props.backgroundColor || "#ebe4cd"};
  color: #212121;
  padding: 4px 11px;
  font-size: 16px;
  border-radius: 10px;
  margin-right: 10px;
  box-shadow: 1px 1px 0px 0px rgba(131, 131, 131, 0.25);
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    opacity: 75%;
  }
`;

export const SText = styled.p`
  font-size: 14px;
  margin: 5px 0px 10px;
`;
export const ContentWrapper = styled.div`
  margin-top: 3%;
  margin-left: 3%;
  height: 85%;
`;

export const Content = styled.textarea<{ height?: CSSProperties["height"]; fontSize?: string }>`
  background-color: ${backgroundWhite};
  /* box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1); */
  width: 97%;
  height: ${(props) => props.height || "15%"};
  font-size: ${(props) => props.fontSize || "17px"};
  font-family: "Pretendard-Regular";
  border-radius: 0.6rem;
  padding: 25px;
  word-spacing: 2px;
  line-height: 22px;

  margin-bottom: 10px;
  resize: none;
  border: none;
  outline: none;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f0f1f6;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(160, 161, 162, 0.1);
    border-radius: 0.5rem;
  }
`;

export const PercentBox = styled.div`
  width: 96%;
  display: flex;
  justify-content: center;
  height: 30px;
`;
export const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5%;
  margin-top: -5px;
`;
export const MaxNum = styled.textarea`
  background-color: ${backgroundWhite};
  width: 60px;
  height: 27px;
  font-family: "Pretendard-Regular";
  font-size: 13px;
  border-radius: 0.6rem;
  padding-top: 5px;
  padding-left: 10px;
  resize: none;
  border: none;
  margin-left: 5px;
  margin-right: 5px;
`;

export const PlusWord = styled.input`
  width: 99%;
  height: 32px;
  border-radius: 0.3rem;
  border: dashed 1px;
  border-color: #abb1b6;
  outline: none;
  padding: 2px;
  font-size: 13px;
  font-family: "Pretendard-Regular";
  margin-bottom: 10px;
`;

// 사이드 버튼
export const BtnBox = styled.div`
  position: absolute;
  /* left: 90%; */
  left: 89.5%;
  top: 35%;
  display: flex;
  flex-direction: column;
`;

export const HoverBox = styled.div`
  position: "fixed";
  top: "13%";
  left: "89%";
  transform: "translateX(-50%)";
  background-color: "rgba(229, 229, 229, 0.86)";
  color: "black";
  padding: "5px";
  border-radius: "5px";
  font-size: "12px";
  width: "78px";
  height: "28px";
  display: "flex";
  align-items: "center";
  justify-content: "center";
  transition: "1s";
`;
export const NumBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${backgroundWhite};
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
  font-family: "Pretendard-Regular";
  border: 0;
  margin-bottom: 7px;
  align-items: center;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #99b4c9;
    `}
`;