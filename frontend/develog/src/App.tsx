import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "style/GlobalStyles";
import { BaseContainer } from "App.style";
import SideBar from "components/Common/SideBar";
import HomePage from "pages/Main/HomePage";
import CompanyListPage from "pages/Company/CompanyListPage";
import InterviewPage from "pages/Interview/InterviewPage";
import InterviewScriptPage from "pages/Interview/InterviewScriptPage";
import ResumePage from "pages/Resume/ResumePage";
import WelcomePage from "pages/Main/WelcomePage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/RootState";
import LogInPage from "pages/Auth/LogInPage";
import GptResume from "components/Resume/GptResume";
import InterviewTTS from "components/Interview/Practice/Audio/InterviewTTS";
import CompanyDetail from "components/Company/CompanyDetail/CompanyDetail";
import PracticeReadyPage from "pages/Interview/Practice/PracticeReadyPage";
import InfoPage from "pages/Info/InfoPage";

function App() {
  // hideComponent로 웰컴페이지에서 SideBar 제거 예정
  const isAuthorized = useSelector((state: RootState) => state.user.isAuthorized);

  return (
    <>
      <GlobalStyle />
      {isAuthorized ? <SideBar /> : null}
      <BaseContainer>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<HomePage />} />

          {/* 로그인 */}
          <Route path="/login/oauth2/code/kakao" element={<LogInPage />} />

          {/* 관심기업 */}
          <Route path="/company" element={<CompanyListPage />} />
          <Route path="companydetail/:companyId" element={<CompanyDetail />} />

          {/* 자소서 */}
          <Route path="/resume/:resumeId" element={<ResumePage />} />
          <Route path="/resume/openAi/:resumeId" element={<GptResume />} />

          {/* 면접 */}
          <Route path="/interview/:interviewId/history/:historyId/resume/:resumeDetailId" element={<InterviewPage />} />
          {/* 임시 */}
          <Route path="/interview" element={<InterviewPage />} />
          <Route
            // 정규 주소 후보
            // path="/interview/:interviewId/resume/:resumeDetailId/script/:predictionId"
            // 프론트 구현 위함
            path="/script"
            element={<InterviewScriptPage />}
          />
          <Route
            path="/interview/:interviewId/prediction/:predictionId/resume/:resumeDetailId"
            element={<InterviewScriptPage />}
          ></Route>
          <Route path="/script/tail" element={<InterviewScriptPage />}></Route>
          {/* 모의면접 */}
          <Route path="/practice" element={<PracticeReadyPage />}></Route>
          {/* TTS 테스트용 */}
          <Route path="/test/tts" element={<InterviewTTS />} />
          {/* Info 페이지 */}
          <Route path="/info" element={<InfoPage />}></Route>
        </Routes>
      </BaseContainer>
    </>
  );
}

export default App;
