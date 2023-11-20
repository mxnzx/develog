import React, { useEffect, useState } from "react";
// 스타일
import { LabelContainer, PredictionMargin, SubTextButtonWrap, StyledSVG } from "../Interview.style";
import Text from "style/Text";
import Button from "components/Common/Button";
import { useLocation, useNavigate } from "react-router-dom";

// 타입
export interface ScriptHeaderType {
  // 현재 페이지에서 이전 페이지로 이동하기 위함. (or 면접 첫 페이지로 보낼 수도 있음)
  pathId?: number;
  interviewId: number;
  resumeDetailId: number;
  historyId: number;
  companyId: number;
}

const ScriptHeader = (props: ScriptHeaderType) => {
  // console.log("히스토리:", historyId);
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>();
  // 예상 면접질문, 꼬리질문 타이틀
  useEffect(() => {
    // 경로에 tail이 있으면, 예상 꼬리질문
    const isTail: boolean = location.pathname.includes("tail");
    if (isTail) {
      setTitle("예상 꼬리 질문");
    } else setTitle("예상 면접 질문");
  }, []);
  return (
    <>
      <LabelContainer>
        <Text $isBold $sizeUpHalf>
          {title}
        </Text>
        <PredictionMargin />
        {/* 설명 글과 버튼 */}
        <SubTextButtonWrap>
          <Text $isSubTextColor $isBold>
            작성하신 자기소개서 답변에 기반한 예상 질문입니다. 예상 질문에 대한 스크립트를 작성하고 녹음해 보세요.
          </Text>
          {/* GPT로 질문 생성하기 */}
          <Button
            buttonColor={"btnGrey"}
            fontColor={"darkBlack"}
            height={"1.9rem"}
            fontSize={"1rem"}
            borderRadius={"0.625rem"}
            width="6.625rem"
            onClick={() => {
              // navigate(-1);
              navigate("/interview", {
                state: {
                  interviewId: props.interviewId,
                  resumeDetailId: props.resumeDetailId,
                  historyId: props.historyId,
                  companyId: props.companyId,
                },
              });
            }}
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
