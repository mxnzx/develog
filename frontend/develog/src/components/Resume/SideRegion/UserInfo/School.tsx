import React, { useState } from "react";
import { useQuery } from "react-query";
// 스타일
import * as S from "../SideRegion.style";

// 컴포넌트
import { DateFormat_YM } from "utils/Function";
import LoadingPage from "components/Common/Loading";
import { getSchool } from "apis/info";

interface SchoolType {
  high: SchoolInfo[];
  uni: SchoolInfo[];
  grad: SchoolInfo[];
}

interface SchoolInfo {
  schoolType: string;
  schoolName: string;
  major: string;
  enterDate: string;
  graduateDate: string;
  grade: string;
  totalNum: number;
  totalGrade: number;
  totalPoint: number;
  majorNum: number;
  majorGrade: number;
  majorPoint: number;
}

const School: React.FC = () => {
  const { data, isLoading, isError } = useQuery<SchoolType>("school", () => getSchool());

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
            <S.SubTitle>학력정보</S.SubTitle>
            <S.ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </S.TitleBox>
          {isToggleBoxVisible && (
            <S.Wrapper>
              {data.high && data.high.length > 0 && (
                <>
                  {data.high.map((item) => (
                    <S.ToggleBox key={item.schoolName}>
                      <S.TextTitle>{item.schoolName}</S.TextTitle>
                      <S.Text>입학 | {DateFormat_YM(item.enterDate)}</S.Text>
                      <S.Text>졸업 | {DateFormat_YM(item.graduateDate)}</S.Text>
                      <S.Br />
                    </S.ToggleBox>
                  ))}
                  <S.Hr />
                </>
              )}

              {data.uni && data.uni.length > 0 && (
                <>
                  {data.uni.map((item) => (
                    <S.ToggleBox key={item.schoolName}>
                      <S.TextTitle>{item.schoolName}</S.TextTitle>
                      <S.Text>전공 | {item.major}</S.Text>
                      <S.Text>구분 | {item.grade}</S.Text>
                      <S.Text>입학 | {DateFormat_YM(item.enterDate)}</S.Text>
                      <S.Text>졸업 | {DateFormat_YM(item.graduateDate)}</S.Text>
                      <S.Text>
                        평균학점 | {item.totalGrade} / {item.totalPoint}
                      </S.Text>
                      <S.Text>
                        전공학점 | {item.majorGrade} / {item.majorPoint}
                      </S.Text>
                      <S.Br />
                    </S.ToggleBox>
                  ))}
                  <S.Hr />
                </>
              )}

              {data.grad && data.grad.length > 0 && (
                <>
                  {data.grad.map((item) => (
                    <S.ToggleBox key={item.schoolName}>
                      <S.TextTitle>{item.schoolName}</S.TextTitle>
                      <S.Text>연구실 | {item.major}</S.Text>
                      <S.Text>구분 | {item.grade} 과정</S.Text>
                      <S.Text>입학 | {DateFormat_YM(item.enterDate)}</S.Text>
                      <S.Text>졸업 | {DateFormat_YM(item.graduateDate)}</S.Text>
                      <S.Br />
                    </S.ToggleBox>
                  ))}
                </>
              )}
            </S.Wrapper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default School;
