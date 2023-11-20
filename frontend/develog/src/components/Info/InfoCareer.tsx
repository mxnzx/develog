import React, { useEffect, useState } from "react";
import * as S from "./Info.style";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { format } from "date-fns";
// 포트폴리오 내 학력사항 컴포넌트
interface careerData {
  name: string;
  department: string;
  section: string;
  startDate: Date;
  endDate: Date;
}

const InfoCareer = (props: {
  careerData: careerData[];
  setCareerData: React.Dispatch<React.SetStateAction<careerData[]>>;
}) => {
  //새로운 값 저장 함수
  const addCareer = () => {
    const newCareer: careerData = {
      name: "",
      department: "",
      section: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    props.setCareerData((prevData) => [...prevData, newCareer]);
    // console.log(props.careerData);
  };

  //삭제 함수
  const removeCareer = (index: number) => {
    const updatedCareerData = props.careerData.filter((_, idx) => idx !== index);
    props.setCareerData(updatedCareerData);
  };

  useEffect(() => {
    // console.log(props.careerData);
  }, [props.careerData]);

  //날짜 제외 update
  const updateState = (index: number) => (e: any) => {
    const newArray = props.careerData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    props.setCareerData(newArray);
  };

  //날짜 update
  // 날짜 update
  const updateDateState = (index: number) => (name: string, value: Date | null) => {
    // UTC로 변환
    const adjustedDate = value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss") : null;
    // console.log(value.toISOString);
    const newArray = props.careerData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: adjustedDate };
      } else {
        return item;
      }
    });

    // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
    props.setCareerData(newArray);
  };

  return (
    <>
      <S.header>
        <h2 style={{ marginRight: "5px" }}>경력사항</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addCareer}></img>
      </S.header>

      {props.careerData.map((data, idx) => {
        // setStartDate(data.startDate);
        return (
          <S.Wrapper key={idx}>
            <S.InputContainer component={"career"}>
              <p>기업명</p>
              <input name="name" defaultValue={data.name} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>부서</p>
              <input name="department" defaultValue={data.department} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>직무</p>
              <input name="section" defaultValue={data.section} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>입사년월</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="입사년월을 입력하세요" // placeholder
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={new Date(data.startDate)}
                name="startDate"
                onChange={(date) => updateDateState(idx)("startDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>퇴사년월</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                // maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="퇴사년월을 선택하세요" // placehoslder
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
                removeCareer(idx);
              }}
            ></img>
          </S.Wrapper>
        );
      })}
    </>
  );
};
export default InfoCareer;
