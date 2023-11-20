import styled from "styled-components";
import { backgroundWhite, colorBlue } from "style/Color";

export const Container = styled.div`
  margin-bottom: 0.5rem;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
export const TextBox = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  /* text-align: center; */
  width: 100%;
`;
export const TextBox1 = styled.div`
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-radius: 0.6rem;
  transition: 0.7s;
  height: 50px;
  margin: 0;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transition: 0.7s;
  }
`;
export const ToggleImg = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 50%;
    transition: 0.5s;
  }
`;
export const ToggleBox = styled.div``;
export const TextTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 2rem;
  font-size: 15px;
  font-weight: 700;
  border-radius: 0.3rem;
  background-color: #f2f7fb;
  margin: 4px 10px 4px 0px;
  opacity: 85%;
`;
export const Wrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
`;
export const OutWrapper = styled.div`
  height: 90%;
  padding-right: 10px;
  margin-right: -10px;
  overflow-y: scroll;
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
export const CeirtBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const NameText = styled.div`
  /* height: 1rem; */
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 0.3rem;
  background-color: #99b4c9;
  color: white;
  padding: 0.3rem 1rem;
  margin-bottom: 5px;
`;
export const TitleText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  border-radius: 0.3rem;
  background-color: #dde1e4;
  color: #505050;
  padding: 0.3rem 1rem;
  /* margin-bottom: 0.3rem; */
  margin: 0.5rem;
  /* background-color: ${colorBlue}; */
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: black;
  /* margin-bottom: 0.6rem; */
`;
export const Text = styled.div`
  display: flex;
  font-size: 15px;
  flex-wrap: wrap;
  margin: 3px;
`;
export const Text1 = styled.div`
  display: flex;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  flex-wrap: wrap;
  margin: 3px;
`;
export const BoldText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
`;
export const Hr = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background: #b7b7b7;
  margin-top: -7px;
  opacity: 70%;
`;

export const Content = styled.div`
  background-color: #fefdfa;
  opacity: 70%;
  font-size: 14px;
  border-radius: 0.3rem;
  padding: 13px;
  margin-top: 7px;
  margin-bottom: 7px;
  word-spacing: 2px;
  line-height: 17px;
`;

export const NameBox = styled.div`
  background-color: ${backgroundWhite};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
  padding: 7px 9px;
  margin: 0;
  margin-bottom: 1rem;
`;
export const NameBox1 = styled.div`
  background-color: ${backgroundWhite};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
`;

export const NameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.55rem;
  height: 1.3rem;
  font-size: 0.8rem;
  border-radius: 0.6rem;
  background-color: ${colorBlue};
  margin-right: 0.5rem;
  color: black;
  opacity: 80%;
`;

export const Br = styled.div`
  height: 10px;
`;

export const WordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin-bottom: 5px; */
  margin-top: 12px;
`;

export const KeyWord = styled.span`
  background-color: ${colorBlue};
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 8px;
  margin-right: 10px;
  box-shadow: 0px 2px 2px 0px rgba(189, 188, 188, 0.25);
  margin-bottom: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    opacity: 75%;
  }
`;
