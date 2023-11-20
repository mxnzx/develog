import { backgroundWhite } from "style/Color";
import styled from "styled-components";

export const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 28%;
  height: 100%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  margin-left: 75px;
`;
export const TopBox = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
`;
export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;
export const Box = styled.div`
  display: flex;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

export const LoadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoadText = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: gray;
`;
export const Content = styled.div`
  background-color: ${backgroundWhite};
  height: 70%;
  border-radius: 8px;
  width: 93%;
  /* margin-top: -40px; */
  padding: 10px;
  font-size: 16px;
  word-spacing: 2px;
  line-height: 22px;
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
export const LoadImg = styled.img`
  opacity: 50%;
  width: 100px;
`;
