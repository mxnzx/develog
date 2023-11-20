import React from "react";
import { useQuery } from "react-query";
import * as S from "./Info.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/RootState";
// 포트폴리오 내 회원정보 컴포넌트
import { getInfo } from "apis/info";

const InfoData = () => {
  const { data, isLoading, isError } = useQuery(["mypageData"], () => getInfo());
  if (isLoading) {
    return <div>Loading...</div>; // 데이터가 로드 중일 때 표시할 내용
  }

  if (isError) {
    return <div>Error loading data.</div>; // 데이터 로드 중 오류가 발생한 경우 처리
  }
  //   console.log(data.createdAt);
  const registdate = data && data.createdAt ? data.createdAt.substring(0, 10) : null;

  return (
    <div style={{display:"flex", height: "100%", alignItems:"center"}}>
      <S.DataWrapper>
        <S.InputContainer component={"data"}>
          <p>이름</p>
          <S.DataBox>{data?.name}</S.DataBox>
        </S.InputContainer>
        <S.InputContainer component={"data"}>
          <p>이메일</p>
          <S.DataBox>{data?.email}</S.DataBox>
        </S.InputContainer>
        <S.InputContainer component={"data"}>
          <p>가입일</p>
          <S.DataBox>{registdate}</S.DataBox>
        </S.InputContainer>
      </S.DataWrapper>
    </div>
  );
};
export default InfoData;
