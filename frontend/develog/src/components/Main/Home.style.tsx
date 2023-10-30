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
  height: 40vh;
  margin: 1vh;
`;

export const Outline = styled.div`
  border-radius: 2rem;
  background-color: ${backgroundWhite};
  height: 100%;
  box-shadow: 5px 5px 8px 0px rgba(0, 0, 0, 0.25);
`;
