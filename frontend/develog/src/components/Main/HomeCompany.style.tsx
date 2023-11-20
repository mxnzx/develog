import styled from "styled-components";
import { Outline } from "./Home.style";

export const CompanyContainer = styled(Outline)`
  flex-grow: 1;
  hr {
    width: 88%;
    border: none;
    height: 3px;
    background: rgba(140, 140, 140, 0.26);
  }
`;

export const CompanyHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4% 6% 0% 6%;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 22px;
    color: #454343;
  }
  img {
    margin-left: 4px;
  }
`;

export const CompanyListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  flex-wrap: wrap;
  max-height: 66%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ffffffd0;
    border-radius: 0.5rem;
    /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.05); */
  }

  &::-webkit-scrollbar-track {
    background: rgba(160, 161, 162, 0.1);
    border-radius: 0.5rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0% 3%;
  margin-bottom: 2%;
`;
