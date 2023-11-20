import React, { useState } from "react";

import { ResumeContainer, Title, TextContainer, Content } from "./Script.style";
export interface ResumeAnswerType {
  answer: string;
  isTail: boolean;
}

const ResumeAnswer = (props: ResumeAnswerType) => {
  const answer = props.answer.replace(/\\n/g, "\n");

  return (
    <ResumeContainer>
      <Title>{props.isTail ? "이전 답변 스크립트" : "자기소개서 답변"}</Title>
      <TextContainer>
        <Content disabled={true} style={{ height: "100%" }} value={answer}></Content>
      </TextContainer>
      <div style={{ flexGrow: "1" }}></div>
    </ResumeContainer>
  );
};

export default ResumeAnswer;
