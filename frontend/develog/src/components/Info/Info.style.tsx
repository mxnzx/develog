import styled from "styled-components";
import { backgroundWhite } from "style/Color";

export const Container = styled.div`
  width: 100%;
  height: 81vh;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundWhite};
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
  /* fill: rgba(255, 255, 255, 0.46); */
  border-radius: 20px;
  /* filter: drop-shadow(5px 4px 4px rgba(0, 0, 0, 0.25)); */
`;

export const ButtonBox = styled.div`
  display: flex;
  /* flex-direction: row; */
  margin-left: 20px;
`;

export const ContentBox = styled.div<{ isData: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 20px 30px 20px 50px;
  padding-right: 30px;
  /* overflow: scroll; */
  ${({ isData }) => isData && `align-items:center; justify-content:center`}
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

export const Button = styled.div<{ isActive: boolean }>`
  border-radius: 20px 20px 0px 0px;
  box-shadow: 5px -2px 8.2px -4px rgba(0, 0, 0, 0.25);
  margin-right: 0.5px;
  height: 50px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cbd8da9c;
  /* box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1); */
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
  ${({ isActive }) => isActive && `background-color: #ffffff68;`}
`;

export const SaveButton = styled.div`
  font-family: "Pretendard-Regular";
  position: relative;
  top: 119%;
  left: 35%;
  margin: 0.5rem;
  border-radius: 20px;
  height: 30px;
  width: 92px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #cbd8dabc;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;

export const header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10%;
  padding: 10px;
  img {
    height: 25px;
  }
  h2 {
    font-size: 26px;
    font-weight: 700;
  }
`;

export const InputContainer = styled.div<{ component: string }>`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  align-items: center;
  padding: ${(props) => (props.component === "data" ? "20px" : "0px")};
  p {
    /* padding-top: 10px; */
    padding-bottom: 10px;
    font-weight: 800;
  }
  input {
    border: none;
    border-radius: 10px;
    height: 40px;
    width: ${(props) => (props.component === "career" ? "175px" : "260px")};
    padding: 10px;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
  }
  .input-datepicker {
    width: 180px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  flex-wrap: wrap;
  position: relative;
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 500px;
  padding: 60px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.1);
  /* filter: drop-shadow(5px 4px 4px rgba(0, 0, 0, 0.25)); */
  align-items: center;
  justify-content: center;
`;

export const DataBox = styled.div`
  border-radius: 10px;
  height: 40px;
  width: 260px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
`;

export const CertiBox = styled.div`
  display: flex;
`;

export const ContentWrapper = styled(Wrapper)`
  padding: 0px;
`;
