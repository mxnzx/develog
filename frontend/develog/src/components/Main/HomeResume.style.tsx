import styled from "styled-components";
import { Outline } from "./Home.style";
import * as R from "./HomeResume.style";

export const ResumeContainer = styled(Outline)`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

export const Title = styled.p`
  font-size: 22px;
  font-weight: 700;
  padding: 3% 7% 3% 7%;
  margin: 0;
`;
export const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 7%;
  padding-right: 7%;
`;

export const ListItem = styled.div<{ index: number }>`
  border-left: ${(props) => (props.index % 2 === 0 ? "12px solid #00216b" : "12px solid #63636B")};
  display: flex;
  flex-direction: column;
  height: 70px;
  margin-bottom: 10px;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  div {
    background-color: #99b4c9;
    border-radius: 19px;
    color: white;
    /* margin-left: 10px; */
    font-size: 13px;
    padding-left: 10px;
    padding-right: 10px;
    width: 99px;
    text-align: center;
    padding-bottom: 5px;
    padding-top: 5px;
    margin: 13px 3px 3px 10px;
    margin-bottom: 4px;
  }
  span {
    background-color: #99b4c9;
    border-radius: 19px;
    color: white;
    /* margin-left: 10px; */
    font-size: 13px;
    padding-left: 8px;
    padding-right: 8px;
    /* width: 99px; */
    text-align: center;
    padding: 5px 32px;
    margin: 13px 3px 3px 10px;
    margin-bottom: 4px;
  }
`;

export const HeaderTag = styled.div``;

export const ItemContent = styled.p`
  font-size: 16px;
  font-weight: 700;
  /* padding: 4% 6% 4% 6%; */
  /* padding-left: 4%; */
  /* padding-right: 4%; */
  margin: 5px 10px 13px 18px;
`;
