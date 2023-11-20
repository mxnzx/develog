// 예상 면접 질문 하나하나
import React from "react";
import { useNavigate } from "react-router-dom";

// 스타일
import { InterviewFullLine, StyledSVG } from "./Interview.style";
import Text from "style/Text";

import { getDetailPrediction } from "apis/interview";

// 타입
export interface LineWordProps {
  word: string;
  Long?: boolean;
  ML?: boolean;
  // 연습하기
  rightWord?: string;
  onClick?: (e: any) => void;
  interviewId: number;
  resumeDetailId: number;
  predictionId: number;
}

//예상 질문 상세 조회페이지로 넘어가는 api
// const getDetail = async (interviewId: number, resumeDetailId: number, predictionId: number) => {
//   try {
//     const response = await getDetailPrediction(interviewId, resumeDetailId, predictionId);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

const PredictItem = (props: LineWordProps) => {
  // Long이면(자소서 질문 제목이라면) <연습하기> 등이 보이면 안된다.
  const navigate = useNavigate();
  const showMovePath = props.Long;
  const showComponent = (componentName: string | undefined) => {
    switch (componentName) {
      case "연습하기":
        return <StyledSVG src={"/icon/arrowRight.svg"} />;
      default:
        return null;
    }
  };
  return (
    <>
      {/* Long이 나오면, 자동으로 줄바꿈함. Default는 말줄임표 */}
      <InterviewFullLine
        style={{ boxShadow: "1px 1px 1px 0px rgba(0, 0, 0, 0.153)" }}
        Long={props.Long}
        ML={props.ML}
        onClick={
          !showMovePath
            ? () => {
                navigate("/script", {
                  state: {
                    interviewId: props.interviewId,
                    resumeDetailId: props.resumeDetailId,
                    predictionId: props.predictionId,
                  },
                });
              }
            : undefined
        }
      >
        <Text style={{ fontSize: "15px" }}>{props.word}</Text>
        {!showMovePath && (
          <>
            <Text style={{ fontSize: "13px" }}> {props.rightWord}</Text>
            {showComponent(props.rightWord)}{" "}
          </>
        )}
      </InterviewFullLine>
    </>
  );
};

export default PredictItem;
