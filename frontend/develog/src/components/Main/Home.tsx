import { getMainInfo } from "apis";
import { useEffect, useState } from "react";
import * as S from "./Home.style";
import HomeCompany from "./HomeCompany";
import HomeInterview from "./HomeInterview";
import HomeProfile from "./HomeProfile";
import HomeResume from "./HomeResume";
const Home = () => {
  const [companyInfo, setCompanyInfo] = useState<{ companyId: number; name: string; logoUrl: string }[]>([
    { companyId: 0, name: "", logoUrl: "" },
  ]);
  const [resumeInfo, setResumeInfo] = useState<[]>();
  const [mainInterview, setMainInterview] = useState<
    {
      interviewId: number;
      companyId: number;
      predictionId: number;
      chapter: string;
      name: string;
      questionContent: string;
      resumeDetailId: number;
    }[]
  >([{ interviewId: 0, companyId: 0, predictionId: 0, resumeDetailId: 0, chapter: "", name: "", questionContent: "" }]);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  useEffect(() => {
    // const data = getMainInfo(); //api로 받아온 info
    const loadMainInfo = async () => {
      try {
        const mainInfo = await getMainInfo();
        // console.log(mainInfo);
        setUserName(mainInfo.data.userName);
        setUserEmail(mainInfo.data.userEmail);
        setCompanyInfo(mainInfo.data.mainInterestingCompany);
        setResumeInfo(mainInfo.data.mainResume);
        setMainInterview(mainInfo.data.mainInterview);
      } catch (error) {
        console.error("main info error");
      }
    };
    loadMainInfo();
  }, []);

  return (
    <>
      <S.InsideContainer>
        <HomeProfile userName={userName} userEmail={userEmail}></HomeProfile>
        <HomeCompany mainInterestingCompany={companyInfo}></HomeCompany>
      </S.InsideContainer>
      <S.InsideContainer>
        <HomeResume resumeInfo={resumeInfo}></HomeResume>
        <HomeInterview mainInterview={mainInterview}></HomeInterview>
      </S.InsideContainer>
    </>
  );
};

export default Home;
