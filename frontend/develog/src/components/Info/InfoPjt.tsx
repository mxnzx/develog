import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { format } from "date-fns";

// 포트폴리오 내 프로젝트  컴포넌트
interface projectData {
  title: string;
  organization: string;
  award: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
const InfoPjt = (props: {
  projectData: projectData[];
  setProjectData: React.Dispatch<React.SetStateAction<projectData[]>>;
}) => {
  const addPjt = () => {
    const newProjectData: projectData = {
      title: "",
      organization: "",
      award: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    props.setProjectData((prevData) => [...prevData, newProjectData]);
    // console.log(props.projectData);
  };

  //삭제 함수
  const removePjt = (index: number) => {
    const updatedPjt = props.projectData.filter((_, idx) => idx !== index);
    props.setProjectData(updatedPjt);
  };

  useEffect(() => {
    // console.log(props.projectData);
  }, [props.projectData]);

  //날짜 제외 update
  const updateState = (index: number) => (e: any) => {
    const newArray = props.projectData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    props.setProjectData(newArray);
  };

  const updateDateState = (index: number) => (name: string, value: Date | null) => {
    // UTC로 변환
    const adjustedDate = value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss") : null;
    // console.log(value.toISOString);
    const newArray = props.projectData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: adjustedDate };
      } else {
        return item;
      }
    });

    // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
    props.setProjectData(newArray);
  };
  return (
    <>
      <S.header>
        <h2 style={{ marginRight: "5px" }}>프로젝트</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addPjt}></img>
      </S.header>
      {props.projectData.map((data, idx) => {
        return (
          <S.Wrapper key={idx}>
            <S.InputContainer component={"career"}>
              <p>프로젝트명</p>
              <input name="title" defaultValue={data.title} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>주관기관</p>
              <input name="organization" defaultValue={data.organization} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>수상</p>
              <input name="award" defaultValue={data.award} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>시작일</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="시작년월 선택" // placeholder
                selected={new Date(data.startDate)} // value
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                name="startDate"
                onChange={(date) => updateDateState(idx)("startDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>종료일</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                // maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="종료년월 선택" // placeholder
                selected={new Date(data.endDate)} // value
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                name="endDate"
                onChange={(date) => updateDateState(idx)("endDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <S.InputContainer component={"career"} style={{ width: "100%" }}>
              <p>설명</p>
              <input
                name="description"
                style={{ width: "100%" }}
                defaultValue={data.description}
                onChange={updateState(idx)}
              ></input>
            </S.InputContainer>
            <img
              src="/icon/minus-circle.png"
              style={{ cursor: "pointer", position: "absolute", top: "35%", right: "1%", height: "13%" }}
              onClick={() => {
                removePjt(idx);
              }}
            ></img>
          </S.Wrapper>
        );
      })}
    </>
  );
};
export default InfoPjt;
