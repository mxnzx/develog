import React, { useState } from "react";

// 스타일
import * as S from "../SideRegion.style";

// 함수
import { DateFormat_YMD } from "utils/Function";
import { useQuery } from "react-query";
import { getLicense } from "apis/info";
import LoadingPage from "components/Common/Loading";

interface CertificateItem {
  title: string;
  organization: string;
  serialNum: string;
  acquisitionDate: string;
  expireDate: string;
}

const Certificate: React.FC = () => {
  const { data, isLoading, isError } = useQuery<CertificateItem[]>("cert", () => getLicense());
  // console.log("자격정보", data);

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
            <S.SubTitle>자격증</S.SubTitle>
            <S.ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </S.TitleBox>
          {isToggleBoxVisible && (
            <S.Wrapper>
              {data.map((item) => (
                <S.CeirtBox key={item.serialNum}>
                  <S.NameBox>
                    <S.NameText>{item.title}</S.NameText>
                    <S.Text>발급기관 | {item.organization}</S.Text>
                    <S.Text>자격번호 | {item.serialNum}</S.Text>
                    <S.Text>취득일자 | {DateFormat_YMD(item.acquisitionDate)}</S.Text>
                    <S.Text>만료일자 | {DateFormat_YMD(item.expireDate)}</S.Text>
                  </S.NameBox>
                  {/* <Hr /> */}
                </S.CeirtBox>
              ))}
            </S.Wrapper>
          )}
        </S.Container>
      )}
    </>
  );
};

export default Certificate;
