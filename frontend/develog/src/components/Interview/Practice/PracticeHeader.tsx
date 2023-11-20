import React, { useEffect, useState } from "react";

// 스타일
import { LabelContainer, PredictionMargin, SubTextButtonWrap, StyledSVG } from "../Interview.style";
import Text from "style/Text";
import Button from "components/Common/Button";
import { useLocation } from "react-router-dom";

// 타입
export interface ScriptHeaderType {
  // 현재 페이지에서 이전 페이지로 이동하기 위함. (or 면접 첫 페이지로 보낼 수도 있음)
  pathId?: number;
}

const ScriptHeader = (props: ScriptHeaderType) => {
  const location = useLocation();
  return (
    <>
      <LabelContainer>
        <Text $isBold $sizeUpHalf>
          모의 면접
        </Text>
        <PredictionMargin />
        {/* 설명 글과 버튼 */}
        <SubTextButtonWrap>
          <Text $isSubTextColor $isBold>
            모의 면접에 포함할 면접 질문들을 선택해주세요. (최대 10개 선택 가능)
          </Text>
          {/* GPT로 질문 생성하기 */}
          <Button
            buttonColor={"btnGrey"}
            fontColor={"darkBlack"}
            height={"1.9rem"}
            fontSize={"1rem"}
            borderRadius={"0.625rem"}
            width="6.625rem"
          >
            <StyledSVG marginRight src={"/icon/postArrowCircle.svg"} />
            이전으로
          </Button>
        </SubTextButtonWrap>
      </LabelContainer>
    </>
  );
};
export default ScriptHeader;
