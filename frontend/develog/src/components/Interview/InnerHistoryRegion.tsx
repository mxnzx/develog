// 기업명, 지원직무 or 인재상 - 비전 넣는 곳
import React from "react";

// 스타일
import styled, { css } from "styled-components";
import { boxNormalWhite } from "style/Color";
import Text from "style/Text";

const WhiteBox = styled.div`
  /* width: 100%; */
  height: 5.96rem;
  border-radius: 0.75rem;
  background-color: ${boxNormalWhite};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.25rem 0.75rem;
`;

const LineDiv = styled.div`
  display: grid;
  grid-template-columns: 15% 5% 80%;
  align-items: center;
`;

export interface InnerHistoryRegionType {
  // 흰박스의 첫번째 줄, 제목(Label)| 내용(Content)
  firstLabel: string;
  firstContent: string;
  // 흰박스의 두번째 줄
  secondLabel: string;
  secondContent: string;
}

const InnerHistoryRegion = (props: InnerHistoryRegionType) => {
  return (
    <WhiteBox>
      <LineDiv>
        <Text $isBold $center>
          {" "}
          {props.firstLabel}{" "}
        </Text>
        <Text $isBold $center>
          {" "}
          |{" "}
        </Text>
        <Text style={{ wordSpacing: "2px", lineHeight: "22px" }}> {props.firstContent} </Text>
      </LineDiv>
      <LineDiv>
        <Text $isBold $center>
          {" "}
          {props.secondLabel}{" "}
        </Text>
        <Text $isBold $center>
          {"  "}
          | {"  "}
        </Text>
        <Text style={{ wordSpacing: "2px", lineHeight: "22px" }}> {props.secondContent} </Text>
      </LineDiv>
    </WhiteBox>
  );
};

export default InnerHistoryRegion;
