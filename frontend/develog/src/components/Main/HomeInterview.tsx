import React from "react";
import * as S from "./HomeInterview.style";
import { useNavigate } from "react-router-dom";
export interface HomeInterviewType {
  mainInterview: {
    interviewId: number;
    companyId: number;
    predictionId: number;
    chapter: string;
    name: string;
    questionContent: string;
    resumeDetailId: number;
  }[];
}
const HomeInterview = (props: HomeInterviewType) => {
  const interviewList = props.mainInterview;
  const navigate = useNavigate();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "・・・" : text;
  };

  return (
    <S.InterviewContainer>
      <S.Title>최근 연습한 면접</S.Title>
      <S.InterviewList>
        {interviewList.map((item, index) => (
          <S.ListItem
            key={index}
            index={index}
            onClick={() => {
              navigate("/script", {
                state: {
                  interviewId: item.interviewId,
                  resumeDetailId: item.resumeDetailId,
                  predictionId: item.predictionId,
                },
              });
            }}
          >
            <S.ItemHeader>
              <span>{item.name}</span>
              <div>{item.chapter}</div>
            </S.ItemHeader>
            <S.ItemContent>{truncateText(item.questionContent, 27)}</S.ItemContent>
          </S.ListItem>
        ))}
      </S.InterviewList>
    </S.InterviewContainer>
  );
};

export default HomeInterview;
