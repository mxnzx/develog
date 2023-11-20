import styled, { css } from "styled-components";
import { backgroundWhite } from "style/Color";

// 관심기업 리스트 조회
export const BackRegion = styled.div`
  background-color: ${backgroundWhite};
  width: 100%;
  height: 85vh;
  min-height: 80vh;
  border-radius: 2.5rem;
  padding: 0px 20px 20px 20px;
`;
export const MainTitle = styled.div`
  margin-top: -10px;
`;
export const CompanyWrapper = styled.div`
  display: flex;
  height: 80%;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 25px;
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

export const CompanyCard = styled.div`
  background-color: ${backgroundWhite};
  border-radius: 25px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  width: 170px;
  height: 240px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 1% 5% 5% 5%;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.187);
  }
`;

export const LogoImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: white;
`;
export const LogoNone = styled.div`
  width: 90px;
  height: 90px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: #dee8c2;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;
export const Box = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 12px 7px;
`;

export const Dateago = styled.div`
  width: 60px;
  height: 22px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.p`
  font-size: 13px;
  margin: 8px;
`;

export const PlusImg = styled.img`
  width: 50px;
  height: 50px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    width: 53px;
    height: 53px;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  position: fixed;
  top: 85%;
  left: 82%;
`;
