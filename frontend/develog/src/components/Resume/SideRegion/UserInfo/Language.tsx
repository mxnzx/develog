import React, { useState } from "react";

// 스타일
import * as S from "../SideRegion.style";

// 함수
import { DateFormat_YMD } from "utils/Function";
import { useQuery } from "react-query";
import { getLanguage } from "apis/info";
import LoadingPage from "components/Common/Loading";

interface LanguageItme {
  title: string;
  organization: string;
  grade: string;
  startDate: string;
  endDate: string;
}
const Language: React.FC = () => {
  const { data, isLoading, isError } = useQuery<LanguageItme[]>("language", () => getLanguage());

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
            <S.SubTitle>어학사항</S.SubTitle>
            <S.ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </S.TitleBox>
          {isToggleBoxVisible && (
            <S.Wrapper>
              {data.map((item) => (
                <S.NameBox1 key={item.title}>
                  <S.TextBox style={{ marginTop: "5px" }}>
                    <S.TitleText>{item.title}</S.TitleText>
                    <S.TitleText>{item.grade} </S.TitleText>
                    <S.TitleText>{DateFormat_YMD(item.startDate)} ~</S.TitleText>
                  </S.TextBox>
                </S.NameBox1>
              ))}
            </S.Wrapper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default Language;
