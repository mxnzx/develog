import React, { useEffect, useState } from "react";
import * as S from "./Script.style";
import Button from "components/Common/Button";
import { saveScript } from "apis/interview";
export interface ScriptWriteType {
  isSave: boolean;
  setSave: React.Dispatch<React.SetStateAction<boolean>>;
  predictionAnswer: string;
  setPredictionAnswer: React.Dispatch<React.SetStateAction<string>>;
  predictionId: number;
}
const ScriptWrite = (props: ScriptWriteType) => {
  useEffect(() => {
    props.setPredictionAnswer(props.predictionAnswer);
  }, [props.predictionAnswer]);
  const save = async () => {
    try {
      const response = await saveScript(props.predictionId, props.predictionAnswer);
      props.setSave(true);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <S.Title>답변 스크립트 작성</S.Title>
      <S.TextContainer>
        <S.Content
          onBlur={(e) => props.setPredictionAnswer(e.target.value)}
          placeholder="스크립트를 작성해주세요."
          disabled={props.isSave}
          defaultValue={props.predictionAnswer}
        ></S.Content>
        {props.isSave ? (
          <Button
            buttonColor={"darkBlack"}
            fontColor={"white"}
            height={"25px"}
            fontSize={"14px"}
            borderRadius={"0.625rem"}
            width="80px"
            style={{ position: "absolute", bottom: "4%", right: "3%" }}
            onClick={() => {
              props.setSave(false);
            }}
          >
            수정
          </Button>
        ) : (
          <Button
            buttonColor={"darkBlack"}
            fontColor={"white"}
            height={"25px"}
            fontSize={"14px"}
            borderRadius={"0.625rem"}
            width="80px"
            style={{ position: "absolute", bottom: "4%", right: "3%" }}
            onClick={() => {
              save();
              // 등록 api 호출
            }}
          >
            저장
          </Button>
        )}
      </S.TextContainer>
    </>
  );
};

export default ScriptWrite;
