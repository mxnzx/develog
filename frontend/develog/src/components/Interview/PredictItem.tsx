// 예상 면접 질문 하나하나
import React from "react";

// 스타일
import { InterviewFullLine } from "./Interview.style";
import Text from "style/Text";

// 타입
export interface LineWordProps {
  word: string;
  onClick?: (e: any) => void;
}

const PredictItem = (props: LineWordProps) => {
  return (
    <>
      <InterviewFullLine>
        <Text>{props.word}</Text>
      </InterviewFullLine>
    </>
  );
};

export default PredictItem;
