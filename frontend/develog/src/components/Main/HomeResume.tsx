import React from "react";
import * as S from "./HomeResume.style";
import { useNavigate } from "react-router-dom";

interface ResumeType {
  resumeInfo: ResumeItem[];
}

interface ResumeItem {
  resumeId: number;
  historyId: number;
  name: string;
  chapter: string;
  section: string;
}

const HomeResume = (props: ResumeType) => {
  const data: ResumeItem[] = props.resumeInfo as ResumeItem[];
  // console.log("data", data);
  const navigate = useNavigate();
  //최신 3개 보여줌.
  return (
    <S.ResumeContainer>
      <S.Title>최근 작성한 자기소개서</S.Title>
      <S.ResumeList>
        {data &&
          data.map((item, index) => (
            <S.ListItem
              key={index}
              index = {index}
              onClick={() => navigate(`/resume/${item.resumeId}`, { state: { historyId: item.historyId } })}
            >
              <S.ItemHeader>
                <span>{item.name}</span>
                <div>{item.chapter}</div>
              </S.ItemHeader>
              <S.ItemContent>{item.section} 자기소개서</S.ItemContent>
            </S.ListItem>
          ))}
      </S.ResumeList>
    </S.ResumeContainer>
  );
};

export default HomeResume;
