import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

// 컴포넌트
import GptRegion from "./SideRegion/GptRegion";
import MainRegion from "./MainRegion/MainRegion";
import GptMainRegion from "./MainRegion/GptMainRegion";

const Container = styled.div`
  /* width: 100%; */
  /* height: 100vh; */
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MoveIcon = styled.img`
  width: 27px;
  height: 40px;
  cursor: pointer;
`;

// resumeId 필요
// 서로 보내주기
const GptResume = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const historyId = state?.historyId;
  const companyId = state.companyId;
  const companyName = state.companyName;

  // console.log("지금 gpt로 넘어왔고, companyId, companyName?", companyId, companyName);
  const userId = useSelector((state: RootState) => state.user.userId);
  const { resumeId } = useParams<{ resumeId: string }>();
  const resumeIds = Number(resumeId);
  return (
    <>
      <Container>
        <MoveIcon
          style={{ marginRight: "10px" }}
          src="/icon/leftmove.png"
          onClick={() =>
            navigate(`/resume/${resumeIds}`, {
              state: { historyId: historyId, companyId: companyId, companyName: companyName },
            })
          }
        />
        <br />
        <GptMainRegion />
      </Container>
    </>
  );
};

export default GptResume;
