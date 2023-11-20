import styled from "styled-components";
import { backgroundWhite, colorBlue, skyBlue } from "style/Color";

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 76%;
`;
export const ScriptContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0.75rem;
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  justify-content: space-between;
`;
export const ResumeContainer = styled(ScriptContainer)``;

export const Title = styled.div`
  font-size: larger;
  font-weight: 600;
  padding: 0.5rem;
`;

export const TextContainer = styled.div`
  background: ${backgroundWhite};
  width: 100%;
  height: 255px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ElementContainer = styled.div`
  width: 100%;
  background-color: ${backgroundWhite};
  border-radius: 12px;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* height: 50%; */
  height: 80px;
`;

export const Content = styled.textarea`
  height: 73%;
  border: none;
  resize: none;
  background: none;
  padding: 1%;
  margin: 3%;
  font-family: "Pretendard-Regular";
`;

export const Icon = styled.img`
  height: 45%;
  margin-left: 5%;
  margin-right: 2%;
`;

export const ElementTitle = styled.span`
  margin-right: 5%;
  min-width: 60px;
`;

export const ElementContent = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  padding: 1%;
  span {
    color: ${colorBlue};
    font-size: 12px;
  }
`;

export const RecordBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  height: 100%;
  &:focus {
    border: none;
    outline: none;
  }
`;

export const KeywordList = styled.div`
  display: flex;
  flex-direction: row;
`;

export const KeywordTitle = styled.span`
  position: fixed;
  top: -39px;
  left: 18px;
  font-size: 14px;
`;

export const KeywordItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const KeywordItem = styled.p`
  font-size: 12px;
  font-weight: 700;
  background-color: ${skyBlue};
  border-radius: 4px;
  margin: 4px;
  padding: 6px;
`;

export const PlusIcon = styled.img`
  cursor: pointer;
  height: 35%;
`;

export const KeywordInput = styled.input`
  width: 94%;
  border-radius: 0.3rem;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  border: dashed 1px;
  border-color: #abb1b6;
  outline: none;
  padding: 2px;
  height: 24px;
`;
