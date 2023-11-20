import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrediction, removePrediction } from "store/reducers/practiceStore";
import * as S from "./PracticeItem.style";

import PracticeTailItem from "components/Interview/Practice/PracticeTailItem";
import { RootState } from "store/RootState";

// 면접질문 + 꼬리질문이 들어가는 컴포넌트
export interface PredictItemType {
  question: {
    //question index
    predictionId: number;
    //quesetion 내용
    questionContent: string;
    //꼬리질문 내용
    tailList: { tailId: number; tailQuestion: string }[];
  };
}
const PracticeItem = (props: PredictItemType) => {
  const dispatch = useDispatch();
  const [isToggle, setToggle] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [tailQuestion, setTailQuestion] = useState<{ tailId: number; tailQuestion: string }[]>([]);

  const toggleQuestion = () => {
    if (isSelect) {
      //선택된거면 추가
      const predictionIdx = props.question.predictionId;
      const questionContent = props.question.questionContent;
      dispatch(addPrediction({ predictionIdx: predictionIdx, questionContent: questionContent, isTail: false }));
    } else {
      //푼거면 빼기
      const predictionIdx = props.question.predictionId;
      dispatch(removePrediction({ predictionIdx: predictionIdx, isTail: false }));
    }
  };

  useEffect(() => {
    //꼬리 질문 있으면 토글 가능, 없으면 불가능
    if (props.question.tailList.length > 0) {
      setToggle(true);
      setTailQuestion(props.question.tailList);
    }
  });

  useEffect(() => {
    toggleQuestion();
  }, [isSelect]);

  return (
    <>
      <S.Wrapper isSelect={isSelect}>
        <S.Icon
          src="/icon/checkbox.png"
          onClick={() => {
            setSelect(!isSelect);
          }}
        ></S.Icon>
        {isSelect ? <S.Icon isSelect={isSelect} src="/icon/check.png"></S.Icon> : null}
        <S.Text>{props.question.questionContent}</S.Text>
        {isToggle ? (
          isOpen == false ? (
            <S.Icon isToggle={isToggle} src="/icon/open.png" onClick={() => setOpen(true)}></S.Icon>
          ) : (
            <S.Icon isToggle={isToggle} src="/icon/close.png" onClick={() => setOpen(false)}></S.Icon>
          )
        ) : null}
      </S.Wrapper>
      {isOpen
        ? tailQuestion.map((ques, idx) => (
            <PracticeTailItem idx={ques.tailId} content={ques.tailQuestion} key={idx}></PracticeTailItem>
          ))
        : null}
    </>
  );
};
export default PracticeItem;
