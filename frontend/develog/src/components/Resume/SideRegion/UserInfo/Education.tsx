import React, { useState } from "react";
// 스타일
import {
  Container,
  TitleBox,
  SubTitle,
  ToggleImg,
  Wrapper,
  CeirtBox,
  Text,
  NameText,
  Content,
} from "../SideRegion.style";
// 함수
import { DateFormat_YMD } from "utils/Function";
import { useQuery } from "react-query";
import { getEducation } from "apis/info";
import LoadingPage from "components/Common/Loading";

interface EducationItem {
  title: string;
  organization: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
}

const Education: React.FC = () => {
  const { data, isLoading, isError } = useQuery<EducationItem[]>("edu", () => getEducation());
  // console.log("교육정보", data);
  const [isToggleBoxVisible, setToggleBoxVisible] = useState(false);

  const handleToggleBox = () => {
    setToggleBoxVisible(!isToggleBoxVisible);
  };

  if (isLoading) {
    return (
      <Container style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <LoadingPage />
      </Container>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }


  return (
    <>
      {data && (
        <Container>
          <TitleBox>
            <SubTitle>교육사항</SubTitle>
            <ToggleImg src={isToggleBoxVisible ? "/icon/close.png" : "/icon/open.png"} onClick={handleToggleBox} />
          </TitleBox>
          {isToggleBoxVisible && (
            <Wrapper>
              {data.map((item) => (
                <CeirtBox key={item.title}>
                  <NameText>{item.title}</NameText>
                  <Text>주최기관 | {item.organization}</Text>
                  <Text>교육시간 | {item.period}</Text>
                  <Text>
                    교육기간 | {DateFormat_YMD(item.startDate)} ~ {DateFormat_YMD(item.endDate)}
                  </Text>
                  <Content>{item.description}</Content>
                </CeirtBox>
              ))}
            </Wrapper>
          )}
        </Container>
      )}
    </>
  );
};

export default Education;
