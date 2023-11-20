import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { getSchool } from "apis/info";

import { format } from "date-fns";
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
const InfoSchool = (props: {
  schoolData: schoolData;
  setSchoolData: React.Dispatch<React.SetStateAction<schoolData>>;
}) => {
  //새로운 고등학교 추가
  const addHigh = () => {
    // console.log("고등학교 추가", props.schoolData.high);
    const newHighData = {
      schoolType: "HIGH",
      schoolName: "",
      major: "",
      enterDate: new Date(),
      graduateDate: new Date(),
      grade: "",
      totalNum: 0,
      totalGrade: 0,
      totalPoint: 0,
      majorNum: 0,
      majorGrade: 0,
      majorPoint: 0,
    };
    props.setSchoolData((prevData) => ({
      ...prevData,
      high: [...prevData.high, newHighData],
    }));
  };

  const removeHigh = (index: number) => {
    const updatedHighData = props.schoolData.high.filter((_, idx) => idx !== index);
    props.setSchoolData((prevData) => ({
      ...prevData,
      high: updatedHighData,
    }));
  };

  //새로운 대학교 추가
  const addUni = () => {
    const newUniData = {
      schoolType: "UNI",
      schoolName: "",
      major: "",
      enterDate: new Date(),
      graduateDate: new Date(),
      grade: "",
      totalNum: 0,
      totalGrade: 0,
      totalPoint: 0,
      majorNum: 0,
      majorGrade: 0,
      majorPoint: 0,
    };
    props.setSchoolData((prevData) => ({
      ...prevData,
      uni: [...prevData.uni, newUniData],
    }));
  };

  const removeUni = (index: number) => {
    const updatedUniData = props.schoolData.uni.filter((_, idx) => idx !== index);
    props.setSchoolData((prevData) => ({
      ...prevData,
      uni: updatedUniData,
    }));
  };
  //새로운 대학원
  const addGrad = () => {
    const newGradData = {
      schoolType: "GRAD",
      schoolName: "",
      major: "",
      enterDate: new Date(),
      graduateDate: new Date(),
      grade: "",
      totalNum: 0,
      totalGrade: 0,
      totalPoint: 0,
      majorNum: 0,
      majorGrade: 0,
      majorPoint: 0,
    };
    props.setSchoolData((prevData) => ({
      ...prevData,
      grad: [...prevData.grad, newGradData],
    }));
  };

  const removeGrad = (index: number) => {
    const updatedGradData = props.schoolData.grad.filter((_, idx) => idx !== index);
    props.setSchoolData((prevData) => ({
      ...prevData,
      grad: updatedGradData,
    }));
  };

  useEffect(() => {
    // console.log(props.schoolData);
  }, [props.schoolData]);
  //날짜 제외 update
  const updateState = (type: string, index: number) => (e: any) => {
    if (type === "high") {
      const newArray = props.schoolData.high.map((item, idx) => {
        if (idx === index) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
      props.setSchoolData((prevData) => ({
        ...prevData,
        high: newArray,
      }));
    }
    if (type === "uni") {
      const newArray = props.schoolData.uni.map((item, idx) => {
        if (idx === index) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
      props.setSchoolData((prevData) => ({
        ...prevData,
        uni: newArray,
      }));
    }
    if (type === "grad") {
      const newArray = props.schoolData.grad.map((item, idx) => {
        if (idx === index) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
      props.setSchoolData((prevData) => ({
        ...prevData,
        grad: newArray,
      }));
    }
  };

  // 날짜 update
  const updateDateState = (index: number) => (type: string, name: string, value: Date | null) => {
    // UTC로 변환
    const adjustedDate = value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss") : null;
    // console.log(value.toISOString);
    if (type === "high") {
      const newArray = props.schoolData.high.map((item, idx) => {
        if (idx === index) {
          return { ...item, [name]: adjustedDate };
        } else {
          return item;
        }
      });

      // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
      props.setSchoolData((prevData) => ({
        ...prevData,
        high: newArray,
      }));
    }
    if (type === "grad") {
      const newArray = props.schoolData.grad.map((item, idx) => {
        if (idx === index) {
          return { ...item, [name]: adjustedDate };
        } else {
          return item;
        }
      });

      // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
      props.setSchoolData((prevData) => ({
        ...prevData,
        grad: newArray,
      }));
    }
    if (type === "uni") {
      const newArray = props.schoolData.uni.map((item, idx) => {
        if (idx === index) {
          return { ...item, [name]: adjustedDate };
        } else {
          return item;
        }
      });

      // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
      props.setSchoolData((prevData) => ({
        ...prevData,
        uni: newArray,
      }));
    }
  };

  return (
    <>
      <S.header>
        <h2 style={{ marginRight: "5px" }}>고등학교</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addHigh}></img>
      </S.header>
      {props.schoolData.high.map((data, idx) => {
        return (
          <S.Wrapper key={idx}>
            <S.InputContainer component="school">
              <p>학교명</p>
              <input name="schoolName" defaultValue={data.schoolName} onChange={updateState("high", idx)}></input>
            </S.InputContainer>
            <S.InputContainer component="school">
              <p>계열</p>
              <input name="major" defaultValue={data.major} onChange={updateState("high", idx)}></input>
            </S.InputContainer>
            <S.InputContainer component="school">
              <p>입학년월</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="입학년월 선택" // placeholder
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                yearDropdownItemNumber={15}
                selected={new Date(data.enterDate)} // value
                name="enterDate"
                onChange={(date) => updateDateState(idx)("high", "enterDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <S.InputContainer component="school">
              <p>졸업년월</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                // maxDate={new Date()}
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="졸업년월 선택" // placeholder
                selected={new Date(data.graduateDate)} // value
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                name="graduateDate"
                onChange={(date) => updateDateState(idx)("high", "graduateDate", date)} // 날짜를 선택하였을 때 실행될 함수
              />
            </S.InputContainer>
            <img
              src="/icon/minus-circle.png"
              style={{ cursor: "pointer", position: "absolute", top: "65%", right: "2%", height: "21%" }}
              onClick={() => {
                removeHigh(idx);
              }}
            ></img>
          </S.Wrapper>
        );
      })}

      <S.header style={{ marginTop: "20px" }}>
        <h2 style={{ marginRight: "5px" }}>대학교</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addUni}></img>
      </S.header>
      {props.schoolData.uni.map((data, idx) => {
        return (
          <>
            <S.Wrapper key={idx}>
              <S.InputContainer component="school">
                <p>학교명</p>
                <input name="schoolName" defaultValue={data.schoolName} onChange={updateState("uni", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>전공</p>
                <input name="major" defaultValue={data.major} onChange={updateState("uni", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>입학년월</p>
                <DatePicker
                  locale={ko} // 언어설정 기본값은 영어
                  dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                  className="input-datepicker" // 클래스 명 지정 css주기 위해
                  closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                  placeholderText="입학년월 선택" // placeholder
                  maxDate={new Date()}
                  selected={new Date(data.enterDate)} // value
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  name="enterDate"
                  onChange={(date) => updateDateState(idx)("uni", "enterDate", date)} // 날짜를 선택하였을 때 실행될 함수
                />
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>졸업년월</p>
                <DatePicker
                  locale={ko} // 언어설정 기본값은 영어
                  dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                  className="input-datepicker" // 클래스 명 지정 css주기 위해
                  // maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                  closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                  selected={new Date(data.graduateDate)} // value
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  name="graduateDate"
                  onChange={(date) => updateDateState(idx)("uni", "graduateDate", date)} // 날짜를 선택하였을 때 실행될 함수
                />
              </S.InputContainer>
              <img
                src="/icon/minus-circle.png"
                style={{ cursor: "pointer", position: "absolute", top: "65%", right: "2%", height: "21%" }}
                onClick={() => {
                  removeUni(idx);
                }}
              ></img>
            </S.Wrapper>
            <S.Wrapper>
              <S.InputContainer component="school" style={{ marginRight: "277px" }}>
                <p>졸업구분</p>
                <input name="grade" defaultValue={data.grade} onChange={updateState("uni", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>이수학점</p>
                <input
                  style={{ width: "60px" }}
                  name="totalNum"
                  defaultValue={data.totalNum}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>성적</p>
                <input
                  style={{ width: "50px" }}
                  name="totalGrade"
                  defaultValue={data.totalGrade}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school" style={{}}>
                <p>만점</p>
                <input
                  style={{ width: "50px" }}
                  name="totalPoint"
                  defaultValue={data.totalPoint}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>전공학점</p>
                <input
                  style={{ width: "60px" }}
                  name="majorNum"
                  defaultValue={data.majorNum}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>성적</p>
                <input
                  style={{ width: "50px" }}
                  name="majorGrade"
                  defaultValue={data.majorGrade}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>만점</p>
                <input
                  style={{ width: "50px" }}
                  name="majorPoint"
                  defaultValue={data.majorPoint}
                  onChange={updateState("uni", idx)}
                ></input>
              </S.InputContainer>
            </S.Wrapper>
          </>
        );
      })}
      <S.header style={{ marginTop: "20px" }}>
        <h2 style={{ marginRight: "5px" }}>대학원</h2>
        <img src="/icon/add-circle-outline.png" style={{ cursor: "pointer" }} onClick={addGrad}></img>
      </S.header>
      {props.schoolData.grad.map((data, idx) => {
        return (
          <>
            <S.Wrapper key={idx}>
              <S.InputContainer component="school">
                <p>학교명</p>
                <input name="schoolName" defaultValue={data.schoolName} onChange={updateState("grad", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>전공</p>
                <input name="major" defaultValue={data.major} onChange={updateState("grad", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>입학년월</p>
                <DatePicker
                  locale={ko} // 언어설정 기본값은 영어
                  dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                  className="input-datepicker" // 클래스 명 지정 css주기 위해
                  closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                  placeholderText="입학년월 선택" // placeholder
                  maxDate={new Date()}
                  selected={new Date(data.enterDate)} // value
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  name="enterDate"
                  onChange={(date) => updateDateState(idx)("grad", "enterDate", date)} // 날짜를 선택하였을 때 실행될 함수
                />
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>졸업년월</p>
                <DatePicker
                  locale={ko} // 언어설정 기본값은 영어
                  dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                  className="input-datepicker" // 클래스 명 지정 css주기 위해
                  // maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                  closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                  selected={new Date(data.graduateDate)} // value
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  name="graduateDate"
                  onChange={(date) => updateDateState(idx)("grad", "graduateDate", date)} // 날짜를 선택하였을 때 실행될 함수
                />
              </S.InputContainer>
              <img
                src="/icon/minus-circle.png"
                style={{ cursor: "pointer", position: "absolute", top: "65%", right: "2%", height: "21%" }}
                onClick={() => {
                  removeGrad(idx);
                }}
              ></img>
            </S.Wrapper>
            <S.Wrapper>
              <S.InputContainer component="school" style={{ marginRight: "277px" }}>
                <p>졸업구분</p>
                <input name="grade" defaultValue={data.grade} onChange={updateState("grad", idx)}></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>이수학점</p>
                <input
                  style={{ width: "60px" }}
                  name="totalNum"
                  defaultValue={data.totalNum}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>성적</p>
                <input
                  style={{ width: "50px" }}
                  name="totalGrade"
                  defaultValue={data.totalGrade}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school" style={{}}>
                <p>만점</p>
                <input
                  style={{ width: "50px" }}
                  name="totalPoint"
                  defaultValue={data.totalPoint}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>전공학점</p>
                <input
                  style={{ width: "60px" }}
                  name="majorNum"
                  defaultValue={data.majorNum}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>성적</p>
                <input
                  style={{ width: "50px" }}
                  name="majorGrade"
                  defaultValue={data.majorGrade}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
              <S.InputContainer component="school">
                <p>만점</p>
                <input
                  style={{ width: "50px" }}
                  name="majorPoint"
                  defaultValue={data.majorPoint}
                  onChange={updateState("grad", idx)}
                ></input>
              </S.InputContainer>
            </S.Wrapper>
          </>
        );
      })}
    </>
  );
};
export default InfoSchool;
