import { backgroundWhite } from "style/Color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;
export const ClickBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
export const ClickImg = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 5px;
  cursor: pointer;
`;
export const Title = styled.p`
  font-size: 18px;
  font-family: "Pretendard-SemiBold";
  margin-bottom: 10px;
`;
export const NoContent = styled.div`
  background-color: #ffffffad;
  width: 97%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  font-size: 14px;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.153);
`;
export const Content = styled.div`
  /* background-color: #ffffffad; */
  background: rgba(255, 255, 255, 0.7);
  width: 97%;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  padding: 0px 25px;
  border-radius: 10px;
  font-size: 14px;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.153);
`;
export const TailContent = styled.div`
  background-color: #eaeaea;
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  padding: 0px 25px;
  border-radius: 10px;
  font-size: 14px;
  align-items: center;
  margin-bottom: 10px;
`;
export const Text = styled.p`
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

export const DetailWrapper = styled.div`
  width: 99%;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 5px;
  max-height: 300px;
  /* overflow-y: scroll;
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
  } */
`;

export const Question = styled.p`
  font-family: "Pretendard-SemiBold";
  font-size: 15px;
  cursor: pointer;
`;

export const Answer = styled.p`
  /* font-family: "Pretendard-SemiBold"; */
  font-size: 14px;
  word-spacing: 2px;
  line-height: 20px;
`;

export const Box = styled.div`
  width: 94%;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const Keyword = styled.span`
  display: flex;
  align-items: center;
  height: 27px;
  border-radius: 5px;
  background-color: #d0e0bc;
  padding: 10px;
  text-align: center;
  margin-right: 10px;
`;

export const TitleBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

// 여기서부터는 인터뷰 쪽 css
export const Keyword1 = styled.span`
  display: flex;
  align-items: center;
  height: 27px;
  border-radius: 5px;
  background-color: #c1d8eb;
  padding: 10px;
  text-align: center;
  margin-right: 10px;
`;
export const MoveBox = styled.div`
  display: flex;
  justify-content: end;
  margin: 0px 0px 15px 0px;
`;
export const MoveBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1.5px;
  border-radius: 8px;
  width: 160px;
  padding: 4px 5px;
  border-color: #979797c5;
  /* background-color: #e2e8de; */
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.153);
  cursor: pointer;
  color: #1f211e;
  transition: 0.5s;
  &:hover{
    transition: 0.5s;
    background-color: white;
    border-color: #c7cbc590;
  }
  /* display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 160px;
  padding: 4px 5px;
  background-color: #e2e8de;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.153);
  cursor: pointer;
  color: #1f211e; */
`;
