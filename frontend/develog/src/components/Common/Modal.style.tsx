import { colorBlue } from "style/Color";
import styled from "styled-components";

export const ModalWrapper = styled.div<{ isOpen: boolean }>`
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? "block" : "none")};
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* text-align: center; */
  background: #fff;
  width: 35%;
  min-height: 300px;
  padding: 25px 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* z-index: 1001; */
`;
export const CloseIcon = styled.img`
  width: 25px;
  height: 25px;
  position: fixed;
  top: 5%;
  left: 92%;
  cursor: pointer;
  :hover& {
    opacity: 70%;
  }
`;

export const Box = styled.div`
  display: flex;
  position: fixed;
  top: 85%;
  left: 82%;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  color: black;
  font-family: "Pretendard-SemiBold";
  margin-left: 10px;
`;

export const Line = styled.hr`
  width: 95%;
  border: 0;
  height: 0.2px;
  background: #b7b7b7;
  opacity: 70%;
  margin-top: 15px;
`;

export const InfoBox = styled.div`
  display: flex;
  margin-bottom: 7px;
  align-items: center;
`;

export const Info = styled.p`
  font-size: 16px;
  width: 90px;
  margin-right: 10px;
`;

export const Icon = styled.img`
  width: 80px;
`;

export const Input = styled.input`
  height: 35px;
  width: 95%;
  border-radius: 0.5rem;
  border: 0;
  background: rgba(227, 227, 227, 0.45);
  padding-left: 10px;
`;
export const InfoContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SerchBox = styled.div`
  width: 200px;
  min-height: 50px;
  max-height: 220px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 300px;
  top: 140px;
  border-radius: 6px;
  z-index: 100;
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
`

export const SearchName = styled.button`
  height: 30px;
  border-radius: 6px;
  padding: 5px 15px;
  border: 0;
  background-color: ${colorBlue};
  margin-bottom: 5px;
  margin-right: 20px;
  cursor: pointer;
  &:hover{
    transition: 0.5s;
    opacity: 75%;
    color: black;
  }
`