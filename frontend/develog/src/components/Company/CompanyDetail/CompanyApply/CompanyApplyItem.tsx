// 기업조회 페이지 지원 정보 조회 펼쳤을 때 데이터
import React from "react";
import styled from "styled-components";
import ApplyResume from "./ApplyResume";
import ApplyInterview from "./ApplyInterview";

const Container = styled.div`
  margin-left: 5px;
`;

interface CompanyApplyItemProps {
  resumeId: number;
  interviewId: number;
  historyId: number;
  companyId: number;
  companyName: string;
}

const CompanyApplyItem: React.FC<CompanyApplyItemProps> = ({ resumeId, interviewId, historyId, companyId, companyName }) => {
  // console.log("자소서 리스트에서 온 첫 히스토리 아이디:", historyId);
  // console.log('지원 아이템 기업 아이디', companyId);
  return (
    <>
      <Container>
        <ApplyResume resumeId={resumeId} historyId={historyId} interviewId={interviewId} companyId={companyId} companyName={companyName} />
        <br />
        <ApplyInterview interviewId={interviewId} historyId={historyId} companyId={companyId} />
      </Container>
    </>
  );
};

export default CompanyApplyItem;
