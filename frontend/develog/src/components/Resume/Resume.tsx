// Resume.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import { useParams } from "react-router-dom";
import SideRegion from "components/Resume/SideRegion/SideRegion";
import MainRegion from "components/Resume/MainRegion/MainRegion";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoveIcon = styled.img`
  position: fixed;
  left: 93%;
  top: 50%;
  width: 27px;
  height: 40px;
  cursor: pointer;
`;

const Resume = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const historyId = state.historyId;
  const companyId = state.companyId;
  const companyName = state.companyName;
  // console.log("companyId, companyName 뭐야?----------", companyId, companyName);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { resumeId } = useParams<{ resumeId: string }>();
  const resumeIds = Number(resumeId);

  // 선택된 키워드를 저장할 state 추가
  const [usercategory, setUsercategory] = useState<number[]>([]);
  const [category, setCategory] = useState<number[]>([]);
  // 선택된 키워드가 변경될 때 호출되는 콜백 함수
  const handleSelectedKeywordsChange = (newSelectedKeywords: number[], newSelectedDBKeywords: number[]) => {
    setUsercategory(newSelectedKeywords);
    setCategory(newSelectedDBKeywords);
    // console.log("부모로 온 유저 키워드-----------:", newSelectedKeywords);
    // console.log("부모로 온 DB 키워드-----------:", newSelectedDBKeywords);
  };

  return (
    <>
      <Container>
        <svg
          // onClick={() => navigate(-1)}
          onClick={() => navigate(`/companydetail/${companyId}`, { state: { companyName: companyName }})}
          style={{ cursor: "pointer", position: "fixed", left: "5%", top: "10%" }}
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.8329 7.9486L8.65681 11.4234C8.57221 11.4938 8.50413 11.582 8.45741 11.6816C8.41069 11.7812 8.38647 11.89 8.38647 12C8.38647 12.1101 8.41069 12.2188 8.45741 12.3184C8.50413 12.418 8.57221 12.5062 8.65681 12.5766L12.8329 16.0514C12.9424 16.1425 13.0756 16.2005 13.2169 16.2186C13.3582 16.2368 13.5017 16.2143 13.6307 16.1539C13.7596 16.0935 13.8687 15.9975 13.9452 15.8774C14.0217 15.7572 14.0623 15.6178 14.0624 15.4753V8.52469C14.0623 8.38226 14.0217 8.2428 13.9452 8.12263C13.8687 8.00246 13.7596 7.90655 13.6307 7.84612C13.5017 7.78569 13.3582 7.76323 13.2169 7.78138C13.0756 7.79953 12.9424 7.85753 12.8329 7.9486Z"
            fill="#0F172A"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.25 12C2.25 6.61704 6.61704 2.25 12 2.25C17.383 2.25 21.75 6.61704 21.75 12C21.75 17.383 17.383 21.75 12 21.75C6.61704 21.75 2.25 17.383 2.25 12ZM12 3.75C7.44546 3.75 3.75 7.44546 3.75 12C3.75 16.5545 7.44546 20.25 12 20.25C16.5545 20.25 20.25 16.5545 20.25 12C20.25 7.44546 16.5545 3.75 12 3.75Z"
            fill="#0F172A"
          />
        </svg>
        <SideRegion historyId={historyId} usercategory={usercategory} category={category} />
        <MainRegion onSelectedKeywordsChange={handleSelectedKeywordsChange} />
        <MoveIcon
          src="/icon/rightmove.png"
          onClick={() => navigate(`/resume/openAi/${resumeId}`, { state: { historyId, companyId:companyId, companyName:companyName } })}
        />
      </Container>
    </>
  );
};

export default Resume;
