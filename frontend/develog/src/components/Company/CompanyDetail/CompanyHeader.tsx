// 지원정보리스트를 묶고 있는 박스
import React from "react";

import styled, { css } from "styled-components";
import { backgroundWhite } from "style/Color";
import InnerHistoryRegion from "components/Interview/InnerHistoryRegion";
import { useQuery } from "react-query";
import { getCompanyInfo } from "apis/company";
import { useLocation, useParams } from "react-router-dom";
import LoadingPage from "components/Common/Loading";

export const Header = styled.div`
  width: 100%;
  height: 16%;
  background-color: ${backgroundWhite};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

export const InnerBox = styled.div`
  height: 100%;
  width: 60%;
  /* padding-right: 20px; */
`;

export const Logo = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 25px;
  background-color: white;
`;
export const NoLogo = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 25px;
  /* background-color: #faf1dd; */
  background-color: #dbe3c5;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
export const Name = styled.p`
  font-size: 22px;
  font-family: "Pretendard-SemiBold";
`;
export const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;
const CompanyHeader = () => {
  const { companyId } = useParams<{ companyId: string | undefined }>();
  // console.log("기업id", companyId);

  if (!companyId) {
    // companyId가 존재하지 않을 때의 처리
    return <div>Company ID not found.</div>;
  }

  const companyIdNumber: number = parseInt(companyId, 10);

  const { data, isLoading, isError } = useQuery(["header"], () => getCompanyInfo(companyIdNumber));
  const nameSlice = (name: string) => {
    const sliceName = name.slice(0, 2);
    return sliceName;
  };
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }

  // data가 없는 경우에 대한 추가적인 처리
  if (!data) {
    return <div>No data available.</div>;
  }

  // console.log("헤더 지원정보 왔어?", data);
  return (
    <>
      {data && (
        <Header>
          <Box>
            <InfoBox>
              {/* 로고 없음에 대한 처리 */}
              {data.logoUrl === null || data.logoUrl === "로고 없음" ? (
                <NoLogo>{nameSlice(data.name)}</NoLogo>
              ) : (
                <Logo src={data.logoUrl} />
              )}
              <Name>{data.name}</Name>
            </InfoBox>
            <InnerBox>
              <InnerHistoryRegion
                firstLabel="비전"
                firstContent={data.vision}
                secondLabel="인재상"
                secondContent={data.concept}
              />
            </InnerBox>
          </Box>
        </Header>
      )}
    </>
  );
};

export default CompanyHeader;
