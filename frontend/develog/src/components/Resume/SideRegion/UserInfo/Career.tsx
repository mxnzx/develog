import React, { useState } from "react";
// 스타일
import * as S from "../SideRegion.style";
// 함수
import { DateFormat_YM } from "utils/Function";
import { useQuery } from "react-query";
import { getCareer } from "apis/info";
import LoadingPage from "components/Common/Loading";

interface CareerItem {
  name: string;
  department: string;
  section: string;
  startDate: string;
  endDate: string;
}

const Career: React.FC = () => {
  const { data, isLoading, isError } = useQuery<CareerItem[]>("career", () => getCareer());
  // console.log("경력정보", data);

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
            <S.SubTitle>경력사항</S.SubTitle>
            <S.ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </S.TitleBox>
          {isToggleBoxVisible && (
            <S.Wrapper>
              {data.map((item) => (
                <S.CeirtBox key={item.name}>
                  <S.NameBox>
                    <S.TextBox1>
                      <S.NameDiv>회사명</S.NameDiv>
                      <S.Text>{item.name}</S.Text>
                    </S.TextBox1>
                    <S.TextBox1>
                      <S.NameDiv>부서명</S.NameDiv>
                      <S.Text>{item.department}</S.Text>
                    </S.TextBox1>
                    <S.TextBox1>
                      <S.NameDiv>직급명</S.NameDiv>
                      <S.Text>{item.section}</S.Text>
                    </S.TextBox1>
                    <S.TextBox1>
                      <S.NameDiv>근무기간</S.NameDiv>
                      <S.Text>
                        {DateFormat_YM(item.startDate)} ~ {DateFormat_YM(item.endDate)}
                      </S.Text>
                    </S.TextBox1>
                  </S.NameBox>
                </S.CeirtBox>
              ))}
            </S.Wrapper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default Career;
