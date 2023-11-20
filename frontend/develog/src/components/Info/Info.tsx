import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";

//컴포넌트
import InfoSchool from "./InfoSchool";
import InfoCareer from "./InfoCareer";
import InfoCerti from "./InfoCerti";
import InfoEdu from "./InfoEdu";
import InfoPjt from "./InfoPjt";
import InfoLang from "./InfoLang";
import InfoData from "./InfoData";
// import Button from "components/Common/Button";

import {
  postSchool,
  postCareer,
  postLicense,
  postEdu,
  postProject,
  postLanguage,
  getSchool,
  getCareer,
  getLicense,
  getEducation,
  getProject,
  getLanguage,
} from "apis/info";

const Info = () => {
  const [activeComponent, setActiveComponent] = useState("school");

  // 각 자식 컴포넌트로 보낼 값들 정의

  // 경력
  interface careerData {
    name: string;
    department: string;
    section: string;
    startDate: Date;
    endDate: Date;
  }

  //교육
  interface eduData {
    title: string;
    organization: string;
    period: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }

  //자격증
  interface licenseData {
    title: string;
    organization: string;
    serialNum: string;
    acquisitionDate: Date;
    expireDate: Date;
  }

  //프로젝트
  interface projectData {
    title: string;
    organization: string;
    award: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }

  //어학조회
  interface languageData {
    title: string;
    organization: string;
    grade: string;
    startDate: Date;
    endDate: Date;
  }

  //학교조회
  interface schoolData {
    high: {
      schoolType: string;
      schoolName: string;
      major: string;
      enterDate: Date;
      graduateDate: Date;
      grade: string;
      totalNum: number;
      totalGrade: number;
      totalPoint: number;
      majorNum: number;
      majorGrade: number;
      majorPoint: number;
    }[];
    uni: {
      schoolType: string;
      schoolName: string;
      major: string;
      enterDate: Date;
      graduateDate: Date;
      grade: string;
      totalNum: number;
      totalGrade: number;
      totalPoint: number;
      majorNum: number;
      majorGrade: number;
      majorPoint: number;
    }[];
    grad: {
      schoolType: string;
      schoolName: string;
      major: string;
      enterDate: Date;
      graduateDate: Date;
      grade: string;
      totalNum: number;
      totalGrade: number;
      totalPoint: number;
      majorNum: number;
      majorGrade: number;
      majorPoint: number;
    }[];
  }

  const [schoolData, setSchoolData] = useState<schoolData>({ high: [], uni: [], grad: [] });
  const [careerData, setCareerData] = useState<careerData[]>([]);
  const [eduData, setEduData] = useState<eduData[]>([]);
  const [licenseData, setLicenseData] = useState<licenseData[]>([]);
  const [projectData, setProjectData] = useState<projectData[]>([]);
  const [languageData, setLanguageData] = useState<languageData[]>([]);

  //activeComponent마다 다른 post 요청
  const saveData = async () => {
    switch (activeComponent) {
      case "school":
        const postData = [...schoolData.high, ...schoolData.uni, ...schoolData.grad];
        const schoolRes = await postSchool(postData);
        // console.log(schoolRes);
        break;
      case "career":
        const careerRes = await postCareer(careerData);
        // console.log(careerRes);
        break;
      case "license":
        const licenseRes = await postLicense(licenseData);
        // console.log(licenseRes);
        break;
      case "edu":
        const eduRes = await postEdu(eduData);
        // console.log(eduRes);
        break;
      case "project":
        const projectRes = await postProject(projectData);
        // console.log(projectRes);
        break;
      case "language":
        const languageRes = await postLanguage(languageData);
        // console.log(languageRes);
        break;
      case "data":
        break;
      default:
        break;
    }
  };

  //activeComponent마다 다른 get 요청

  useEffect(() => {
    const fetchData = async () => {
      switch (activeComponent) {
        case "school":
          const schoolRes = await getSchool();
          setSchoolData(schoolRes);
          break;
        case "career":
          const careerRes = await getCareer();
          setCareerData(careerRes);
          break;
        case "license":
          const licenseRes = await getLicense();
          setLicenseData(licenseRes);
          break;
        case "edu":
          const eduRes = await getEducation();
          setEduData(eduRes);
          break;
        case "project":
          const projectRes = await getProject();
          setProjectData(projectRes);
          break;
        case "language":
          const languageRes = await getLanguage();
          setLanguageData(languageRes);
          break;
        case "data":
          break;
        default:
          break;
      }
    };
    fetchData();
  }, [activeComponent]);

  const showComponent = (componentName: string) => {
    switch (componentName) {
      case "school":
        return <InfoSchool schoolData={schoolData} setSchoolData={setSchoolData}></InfoSchool>;
      case "career":
        return <InfoCareer careerData={careerData} setCareerData={setCareerData}></InfoCareer>;
      case "license":
        return <InfoCerti licenseData={licenseData} setLicenseData={setLicenseData}></InfoCerti>;
      case "edu":
        return <InfoEdu eduData={eduData} setEduData={setEduData}></InfoEdu>;
      case "project":
        return <InfoPjt projectData={projectData} setProjectData={setProjectData}></InfoPjt>;
      case "language":
        return <InfoLang languageData={languageData} setLanguageData={setLanguageData}></InfoLang>;
      case "data":
        return <InfoData></InfoData>;
      default:
        return null;
    }
  };
  return (
    <>
      <S.ButtonBox>
        <S.Button onClick={() => setActiveComponent("school")} isActive={activeComponent === "school"}>
          학력
        </S.Button>
        <S.Button onClick={() => setActiveComponent("career")} isActive={activeComponent === "career"}>
          경력
        </S.Button>
        <S.Button onClick={() => setActiveComponent("license")} isActive={activeComponent === "license"}>
          자격증
        </S.Button>
        <S.Button onClick={() => setActiveComponent("edu")} isActive={activeComponent === "edu"}>
          교육
        </S.Button>
        <S.Button onClick={() => setActiveComponent("project")} isActive={activeComponent === "project"}>
          프로젝트
        </S.Button>
        <S.Button onClick={() => setActiveComponent("language")} isActive={activeComponent === "language"}>
          어학
        </S.Button>
        <S.Button onClick={() => setActiveComponent("data")} isActive={activeComponent === "data"}>
          회원정보
        </S.Button>
        <S.SaveButton onClick={saveData}> 저장하기 ✓</S.SaveButton>
      </S.ButtonBox>
      <S.Container>
        <S.ContentBox isData={activeComponent === "data"}>{showComponent(activeComponent)}</S.ContentBox>
      </S.Container>
    </>
  );
};
export default Info;
