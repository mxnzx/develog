import React, { useEffect, useState } from "react";
import * as S from "./PracticeItem.style";
import { useDispatch, useSelector } from "react-redux";
import { addPrediction, removePrediction } from "store/reducers/practiceStore";

import { RootState } from "store/RootState";
export interface TailItemType {
  idx: number;
  content: string;
}
const PraticeTailItem = (props: TailItemType) => {
  const [isSelect, setSelect] = useState(false);
  const dispatch = useDispatch();
  const toggleQuestion = () => {
    if (isSelect) {
      //선택된거면 추가
      const predictionIdx = props.idx;
      const questionContent = props.content;
      dispatch(addPrediction({ predictionIdx: predictionIdx, questionContent: questionContent, isTail: true }));
    } else {
      //푼거면 빼기
      const predictionIdx = props.idx;
      dispatch(removePrediction({ predictionIdx: predictionIdx, isTail: true }));
    }
  };

  useEffect(() => {
    toggleQuestion();
  }, [isSelect]);

  return (
    <>
      <S.Wrapper isSelect={isSelect} isTail={true}>
        <S.Icon
          src="/icon/checkbox.png"
          onClick={() => {
            setSelect(!isSelect);
          }}
        ></S.Icon>
        {isSelect ? <S.Icon isSelect={isSelect} src="/icon/check.png"></S.Icon> : null}
        <S.Text>{props.content}</S.Text>
      </S.Wrapper>
    </>
  );
};

export default PraticeTailItem;
