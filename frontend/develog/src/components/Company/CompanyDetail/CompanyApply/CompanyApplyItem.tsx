// 기업조회 페이지 지원 정보 조회 펼쳤을 때 데이터
import React from "react";
import styled from "styled-components";
import ApplyResume from "./ApplyResume";
import ApplyInterview from "./ApplyInterview";

const Container = styled.div`
  margin-left: 5px;
`;

const CompanyApplyItem = () => {
  return (
    <>
      <Container>
        <ApplyResume />
        <br />
        <ApplyInterview />
      </Container>
    </>
  );
};

export default CompanyApplyItem;
