// historyId props로 위에서 부터 받아오기
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

// 스타일
import { Container, Title, TextBox, TextTitle, Text } from "./SideRegion.style";

// 함수
import { DateFormat_YY } from "utils/Function";
import { getApplyInfo } from "apis/portfolio";
import LoadingPage from "components/Common/Loading";

interface ApplyInfoProps {
  historyId: number;
}

// 사이드 탭 부분
const ApplyInfo: React.FC<ApplyInfoProps> = ({ historyId }) => {
  // console.log("자소서 페이지 히스토리", historyId);
  const { data, isLoading, isError } = useQuery(["data"], () => getApplyInfo(historyId));

  useEffect(() => {
    // console.log("히스토리 왔니", historyId);
  }, [historyId]);
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
  // console.log("지원정보", data);

  return (
    <>
      <Container>
        <Title>📍 지원정보</Title>
        <TextBox>
          <TextTitle style={{ width: "110px" }}>기업명</TextTitle>
          <Text>{data?.name}</Text>
        </TextBox>
        <TextBox>
          <TextTitle style={{ width: "110px" }}>지원 직무</TextTitle>
          <Text>{data?.section}</Text>
        </TextBox>
        <TextBox>
          <TextTitle style={{ width: "110px" }}>지원 시기</TextTitle>
          <Text>
            {data?.updatedAt && DateFormat_YY(data.updatedAt)} {data?.chapter}
          </Text>
        </TextBox>
        <TextBox>
          <TextTitle style={{ width: "110px" }}>인재상</TextTitle>
          <Text style={{ width: "50%" }}>{data?.concept}</Text>
        </TextBox>
        <TextBox>
          <TextTitle style={{ width: "110px" }}>비전</TextTitle>
          <Text style={{ width: "50%" }}>{data?.vision}</Text>
        </TextBox>
      </Container>
    </>
  );
};

export default ApplyInfo;
