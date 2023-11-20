// 면접페이지 - 예상면접 질문 맨 마지막 "추가하기"
import React, { useEffect, useState } from "react";

// 스타일
import styled from "styled-components";
import { subTextColor, boxNormalWhite } from "style/Color";
import { InterviewFullLine, StyledSVG } from "./Interview.style";
import Text from "style/Text";

//api
import { addPersonalQuestion } from "apis/interview";

const InputText = styled(Text)`
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FullLine = styled.div`
  width: 100%;
  position: relative;
  background-color: #ede8d8c6;
  white-space: nowrap;
  height: 2.625rem;
  max-height: 5rem;
  display: flex;
  align-items: center;
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 7rem;
  overflow-x: hidden;
  margin-bottom: 0.5rem;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.153);

  /* 아래 있는 Text에서 말줄임 */
  & > input {
    left: 10rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 오른쪽 저장하기 텍스트 */
  & div:nth-of-type(2) {
    position: absolute;
    right: 2rem;
    /* font-size: 1.25rem; */
    color: ${subTextColor};
    &:hover {
      cursor: pointer;
    }
  }
  & > img:last-child {
    position: absolute;
    right: 0.75rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const CreateQuestion = styled.input`
  margin-left: 1rem;
  border: none;
  width: 100%;
  background: transparent;
  font-size: inherit;
  font: inherit;
  &:focus {
    outline: none;
  }
`;

interface predictList {
  predictionId: number;
  questionContent: string;
  resumeDetailId: number;
  fromResume: string;
}

export interface PredictInputType {
  interviewId: number;
  resumeDetailId: number;
  predictList: predictList[];
  setPredictList: React.Dispatch<React.SetStateAction<predictList[]>>;
}
const PredictInput = (props: PredictInputType) => {
  const [content, setContent] = useState<string>("");
  //input값 변할때마다 content 상태 업데이트
  const handleInputChange = (event: any) => {
    setContent(event.target.value);
  };

  const addNewQuestion = async () => {
    try {
      const newPredictId = await addPersonalQuestion(props.interviewId, props.resumeDetailId, content);
      props.setPredictList([
        ...props.predictList,
        { predictionId: newPredictId, resumeDetailId: props.resumeDetailId, questionContent: content, fromResume: "" },
      ]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FullLine>
        <InputText>추가하기</InputText>
        <StyledSVG src={"/icon/plusSquare.svg"} />
        <CreateQuestion type="text" placeholder="질문을 입력해주세요." onChange={handleInputChange} value={content} />
        <Text onClick={addNewQuestion}>저장하기</Text>
        <StyledSVG src={"/icon/check.svg"} />
      </FullLine>
    </>
  );
};

export default PredictInput;
