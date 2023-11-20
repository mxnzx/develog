import { backgroundWhite, colorBlue } from "style/Color";
import styled, { css } from "styled-components";


export const Container = styled.div`
  width: 100%;
  height: 85vh;
  min-height: 80vh;
  border-radius: 2.5rem;
`;

export const ContentWrapepr = styled.div`
  width: 102.5%;
  height: 75%;
  /* border: 1px solid; */
  padding-right: 20px;
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

export const CompanyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 85px;
  background-color: ${backgroundWhite};
  border-radius: 1.5rem;
  justify-content: center;
  margin-bottom: 25px;
`;
export const Box = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
  margin-bottom: 10px;
  height: 65px;
`;

export const InfoTag = styled.div`
  width: 80px;
  height: 30px;
  border-radius: 44rem;
  background-color: ${colorBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 0px 7px;
`;

export const Title = styled.div`
  width: 60%;
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
`;

export const DeleteBtn = styled.div`
  width: 55px;
  height: 25px;
  font-size: 12px;
  border-radius: 44rem;
  background-color: #e07358;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

export const DetailWrapper = styled.div`
  width: 95%;
  margin-top: 10px;
  margin-bottom: 25px;
  padding-left: 5px;
  max-height: 70%;
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