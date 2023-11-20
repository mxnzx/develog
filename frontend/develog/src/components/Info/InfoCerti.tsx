import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { format } from "date-fns";
// import moment from "moment";
// 포트폴리오 내 자격증 컴포넌트
interface licenseData {
  title: string;
  organization: string;
  serialNum: string;
  acquisitionDate: Date;
  expireDate: Date;
}

const InfoCerti = (props: {
  licenseData: licenseData[];
  setLicenseData: React.Dispatch<React.SetStateAction<licenseData[]>>;
}) => {
  //새로운 값 저장 함수
  const addCerti = () => {
    const newLicenseData: licenseData = {
      title: "",
      organization: "",
      serialNum: "",
      acquisitionDate: new Date(),
      expireDate: new Date(),
    };
    props.setLicenseData((prevData) => [...prevData, newLicenseData]);
    // console.log(props.licenseData);
  };

  //삭제 함수
  const removeCerti = (index: number) => {
    const updatedCareerData = props.licenseData.filter((_, idx) => idx !== index);
    props.setLicenseData(updatedCareerData);
  };

  useEffect(() => {
    // console.log(props.licenseData);
  }, [props.licenseData]);

  //날짜 제외 update
  const updateState = (index: number) => (e: any) => {
    const newArray = props.licenseData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    props.setLicenseData(newArray);
  };

  //날짜 update
  // 날짜 update
  const updateDateState = (index: number) => (name: string, value: Date | null) => {
    // UTC로 변환
    const adjustedDate = value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss") : null;
    // console.log(value.toISOString);
    const newArray = props.licenseData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: adjustedDate };
      } else {
        return item;
      }
    });

    // payload에 담길 때 변환된 날짜를 사용하여 setCareerData 호출
    props.setLicenseData(newArray);
  };
  return (
    <>
      <S.header>
        <h2 style={{ marginRight: "5px" }}>자격증</h2>
        <img src="/icon/add-circle-outline.png" onClick={addCerti}></img>
      </S.header>

      {props.licenseData.map((data, idx) => (
        <S.Wrapper key={idx}>
          <S.CertiBox>
            <S.InputContainer component={"career"}>
              <p>자격증명</p>
              <input name="title" defaultValue={data.title} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>발급기관</p>
              <input name="organization" defaultValue={data.organization} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>자격번호</p>
              <input name="serialNum" defaultValue={data.serialNum} onChange={updateState(idx)}></input>
            </S.InputContainer>
            <S.InputContainer component={"career"}>
              <p>취득일</p>
              <DatePicker
                locale={ko} // 언어설정 기본값은 영어
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                maxDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="입사년월을 입력하세요" // placeholder
                selected={new Date(data.acquisitionDate)}
                name="acquisitionDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(date) => updateDateState(idx)("acquisitionDate", date)}
              />
            </S.InputContainer>
            <img
              src="/icon/minus-circle.png"
              style={{ cursor: "pointer", position: "absolute", top: "65%", right: "18%", height: "21%" }}
              onClick={() => {
                removeCerti(idx);
              }}
            ></img>
          </S.CertiBox>
        </S.Wrapper>
      ))}
    </>
  );
};
export default InfoCerti;
