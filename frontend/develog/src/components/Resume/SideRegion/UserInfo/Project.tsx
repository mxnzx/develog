import React, { useState } from "react";
import { useQuery } from "react-query";

// 스타일
import * as S from "../SideRegion.style";

//함수
import { DateFormat_YM } from "utils/Function";
import { getProject } from "apis/info";
import LoadingPage from "components/Common/Loading";

interface ProjectItem {
  title: string;
  award: string;
  description: string;
  endDate: string;
  organization: string;
  startDate: string;
}

const Project: React.FC = () => {
  const { data, isLoading, isError } = useQuery<ProjectItem[]>("project", () => getProject());
  // console.log("프로젝트", data);
  const [isToggleBoxVisible, setToggleBoxVisible] = useState(false);

  const handleToggleBox = () => {
    setToggleBoxVisible(!isToggleBoxVisible);
  };

  if (isLoading) {
    return (
      <S.Container style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <LoadingPage />
      </S.Container>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      {data && (
        <S.Container>
          <S.TitleBox>
            <S.SubTitle>프로젝트 경험</S.SubTitle>
            <S.ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </S.TitleBox>
          {isToggleBoxVisible && (
            <S.Wrapper>
              {data.map((item) => (
                <S.NameBox key={item.title}>
                  <S.NameText>{item.title}</S.NameText>
                  <S.Text>주최기관 | {item.organization}</S.Text>
                  <S.Text>수상내용 | {item.award}</S.Text>
                  <S.Text>
                    기간 | {DateFormat_YM(item.startDate)} ~ {DateFormat_YM(item.endDate)}
                  </S.Text>
                  <S.Content>{item.description}</S.Content>
                </S.NameBox>
              ))}
            </S.Wrapper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default Project;
