import styled, { css } from "styled-components";
import { Outline } from "./Home.style";
import * as R from "./HomeResume.style";

export const InterviewContainer = styled(Outline)`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

export const Title = styled(R.Title)``;

export const InterviewList = styled(R.ResumeList)``;

export interface ListType {
  index: number;
}

export const ListItem = styled(R.ListItem)<{ index: number }>`
  border-left: ${(props) => (props.index % 2 === 0 ? "12px solid #00216b" : "12px solid #63636B")};
`;

export const ItemContent = styled(R.ItemContent)``;

export const ItemHeader = styled(R.ItemHeader)``;
