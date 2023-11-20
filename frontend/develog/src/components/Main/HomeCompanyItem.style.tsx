import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
`;

export const Box = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const CompanyImg = styled.img`
  height: 71px;
  width: 71px;
  border-radius: 61px;
  background-color: white;
  cursor: pointer;
  /* margin-bottom: 5px; */
  transition: 0.5s;
  &:hover{
    transition: 0.5s;
    width: 73px;
    height: 73px;
    box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.332);
  }
`;
export const CompanyName = styled.p`
  margin-top: 10px;
`;

export const NoLogo = styled.div`
  height: 71px;
  width: 71px;
  border-radius: 61px;
  cursor: pointer;
  background-color: #dbe3c5;
  /* box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: 0.5s;
  &:hover{
    transition: 0.5s;
    width: 73px;
    height: 73px;
    box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.332);
  }
`