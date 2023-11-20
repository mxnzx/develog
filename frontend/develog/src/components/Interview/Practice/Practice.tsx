// 모의면접 페이지
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/RootState";
import Button from "components/Common/Button";
//컴포넌트
import PracticeItem from "./PracticeItem";

import { getQuestion, playPractice } from "apis/interview";
import { reset } from "store/reducers/practiceStore";
// 스타일
import { InterviewGround } from "../Interview.style";
import PracticeHeader from "./PracticeHeader";
import * as S from "./Practice.style";

const Practice = () => {
  const dispatch = useDispatch();
  const [checkTailQues, setCheckTail] = useState(false);
  const [isCheck, setCheck] = useState(false);
  //interviewId 임시값 : 6
  const [interviewId, setInterviewId] = useState(6);
  const [questionList, setQuestionList] = useState<
    { predictionId: number; questionContent: string; tailList: { tailId: number; tailQuestion: string }[] }[]
  >([]);
  const practiceList = useSelector((state: RootState) => state.practiceStore.predictionList);

  const startPractice = async (isCheck: boolean) => {
    if (isCheck) {
      //꼬리 질문 생성하는 api 호출
      // console.log("꼬리 질문 생성해줘");
    } else {
      // console.log("꼬리 질문 생성안해");
      //꼬리 질문 아닌애랑, 꼬리 질문애 나눠서 보내기
      const checkedPredictionId: number[] = [];
      const checkedTailId: number[] = [];

      practiceList.map((practiceItem, idx) => {
        practiceItem.isTail
          ? checkedTailId.push(practiceItem.predictionIdx)
          : checkedPredictionId.push(practiceItem.predictionIdx);
      });
      const startPract = await playPractice(interviewId, checkedPredictionId, checkedTailId);
    }
  };

  // useEffect(() => {
  //   dispatch(reset());
  // }, []);

  useEffect(() => {
    const loadQuestionList = async () => {
      try {
        const questionList = await getQuestion(6);
        setQuestionList(questionList.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadQuestionList();
  }, []);
  return (
    <>
      <InterviewGround>
        <PracticeHeader></PracticeHeader>
        <S.QuestionContainer>
          {questionList.map((ques, index) => (
            <PracticeItem question={ques} key={index}></PracticeItem>
          ))}
        </S.QuestionContainer>
        <S.BottomContainer>
          <S.Text>
            랜덤 꼬리 질문을 받고 싶어요.{" "}
            <S.Icon
              src="/icon/checkbox.png"
              onClick={() => {
                setCheckTail(true);
              }}
            ></S.Icon>
            {checkTailQues ? (
              <S.Icon
                checkTailQues={checkTailQues}
                src="/icon/check.png"
                onClick={() => {
                  setCheckTail(!checkTailQues);
                }}
              ></S.Icon>
            ) : null}
          </S.Text>
          <Button
            buttonColor={"darkBlack"}
            height={"33px"}
            width={"140px"}
            fontColor="white"
            borderRadius="20px"
            onClick={() => {
              // console.log(practiceList);
              startPractice(isCheck);
            }}
          >
            모의 면접 시작하기
          </Button>
        </S.BottomContainer>
      </InterviewGround>
    </>
  );
};

export default Practice;
