// 면접 준비 메인 컴포넌트(가장 바깥)
import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
// 컴포넌트
import InterviewResume from "./InterviewResume";

//api
import { getInterviewInfo, getInterviewCompanyInfo } from "apis/interview";
// 스타일
import styled from "styled-components";
import { InterviewGround, InterviewHeader } from "./Interview.style";
import InnerHistoryRegion from "./InnerHistoryRegion";
import { OutWrapper } from "components/Resume/SideRegion/SideRegion.style";

const ScrollBar = styled(OutWrapper)`
  width: 101%;
  height: 100%;
  /* padding-left: 0.5rem; */
`;

const Interview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { interviewId: number; resumeDetailId: number; historyId: number; companyId: number };
  const interviewId = state.interviewId;
  const resumeDetailId = state.resumeDetailId;
  const historyId = state.historyId;
  const companyId = state.companyId;
  // console.log('인터뷰 기업 아이디', companyId)
  // console.log(interviewId);
  // console.log(resumeDetailId);
  // console.log(historyId);

  const [companyInfo, setCompanyInfo] = useState<{
    concept: string;
    name: string;
    section: string;
    vision: string;
  }>({ name: "", concept: "", section: "", vision: "" });

  //자기소개 질문, 답변
  const [resumeDetail, setResumeDetail] = useState<{ resumeDetailId: number; question: string; answer: string }>({
    resumeDetailId: 0,
    question: "",
    answer: "",
  });

  //예상 면접 질문
  const [predictResponse, setPredictResponse] = useState<
    { predictionId: number; questionContent: string; resumeDetailId: number; fromResume: string }[]
  >([]);

  useEffect(() => {
    const loadInterviewInfo = async () => {
      try {
        //resumeDetailId 임시값 - 추후 수정
        const companyInfo = await getInterviewCompanyInfo(historyId);
        setCompanyInfo({
          name: companyInfo.data.companyResponse.name,
          concept: companyInfo.data.companyResponse.concept,
          section: companyInfo.data.companyResponse.section,
          vision: companyInfo.data.companyResponse.vision,
        });
        const interviewInfo = await getInterviewInfo(resumeDetailId);
        setResumeDetail(interviewInfo.data.resumeDetail);
        // console.log(interviewInfo.data);
        setPredictResponse(interviewInfo.data.predictionResponses);
      } catch (error) {
        // console.log(error);
      }
    };
    loadInterviewInfo();
  }, []);
  return (
    <>
      <svg
        onClick={() => navigate(`/companydetail/${companyId}`, { state: { companyName: companyInfo.name }})}
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
      <InterviewGround>
        <ScrollBar>
          <InterviewHeader>
            <InnerHistoryRegion
              firstLabel="지원 기업 "
              firstContent={companyInfo.name}
              secondLabel="지원 직무 "
              secondContent={companyInfo.section}
            />
            <InnerHistoryRegion
              firstLabel="비전"
              firstContent={companyInfo.vision}
              secondLabel="인재상"
              secondContent={companyInfo.concept}
            />
          </InterviewHeader>

          <InterviewResume
            resumeDetailId={resumeDetailId}
            resumeDetail={resumeDetail}
            predictResponse={predictResponse}
            interviewId={interviewId}
          />
        </ScrollBar>
      </InterviewGround>
    </>
  );
};

export default Interview;
