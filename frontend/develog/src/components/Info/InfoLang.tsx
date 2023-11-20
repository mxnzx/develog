import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { format } from "date-fns";
// 포트폴리오 내 어학 컴포넌트
interface languageData {
  title: string;
  organization: string;
  grade: string;
  startDate: Date;
  endDate: Date;
}
const InfoLang = (props: {
  languageData: languageData[];
  setLanguageData: React.Dispatch<React.SetStateAction<languageData[]>>;
}) => {
  //새로운 값 저장 함수
  const addLan = () => {
    const newLanguageData: languageData = {
      title: "",
      organization: "",
      grade: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    props.setLanguageData((prevData) => [...prevData, newLanguageData]);
    // console.log(props.languageData);
  };

  //삭제 함수
  const removeLan = (index: number) => {
    const updatedCareerData = props.languageData.filter((_, idx) => idx !== index);
    props.setLanguageData(updatedCareerData);
  };

  useEffect(() => {
    // console.log(props.languageData);
  }, [props.languageData]);

  //날짜 제외 update
  const updateState = (index: number) => (e: any) => {
    const newArray = props.languageData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    props.setLanguageData(newArray);
  };

  // 날짜 update
  const updateDateState = (index: number) => (name: string, value: Date | null) => {
    // UTC로 변환
    const adjustedDate = value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss") : null;
    // console.log(value.toISOString);
    const newArray = props.languageData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: adjustedDate };
      } else {
        return item;
      }
    });

    // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
    props.setLanguageData(newArray);
  };
  return (
    <>
      <S.header>
        <h2 style={{ marginRight: "5px" }}>어학</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addLan}></img>
      </S.header>
      {props.languageData.map((data, idx) => {
        return (
          <S.Wrapper key={idx}>
            <S.InputContainer component={"career"}>
              <p>어학명</p>
              <input name="title" defaultValue={data.title} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>주관기관</p>
              <input name="organization" defaultValue={data.organization} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>성적</p>
              <input name="grade" defaultValue={data.grade} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>취득일</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="취득년월 선택" // placeholder
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={new Date(data.startDate)} // value
                name="startDate"
                onChange={(date) => updateDateState(idx)("startDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>만료일</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                // maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="만료년월 선택" // placeholder
                selected={new Date(data.endDate)} // value
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                name="endDate"
                onChange={(date) => updateDateState(idx)("endDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <img
              src="/icon/minus-circle.png"
              style={{ cursor: "pointer", position: "absolute", top: "65%", right: "2%", height: "21%" }}
              onClick={() => {
                removeLan(idx);
              }}
            ></img>
          </S.Wrapper>
        );
      })}
    </>
  );
};
export default InfoLang;
