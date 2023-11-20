import styled from "styled-components";
import { backgroundWhite } from "style/Color";
//전체 Container
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

//내부 Container
export const InsideContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 23vw;
  margin-bottom: 2%;
`;

export const Outline = styled.div`
  border-radius: 2rem;
  margin: 1%;
  background-color: ${backgroundWhite};
  height: 100%;
  box-shadow: 5px 5px 8px 0px rgba(0, 0, 0, 0.25);
`;
