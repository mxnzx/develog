import React, { useState } from "react";
// 로그인 시 페이지
import Welcome from "components/Main/Welcome";
import Home from "components/Main/Home";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/RootState";
const HomePage = () => {
  //Redux 데이터 가져오기
  const isAuthorized = useSelector((state: RootState) => state.user.isAuthorized);
  // const isAuthorized = true;
  return (
    <>
      {/* 로그인 시, Home 컴포넌트 렌더링, 비로그인 시 Welcome 렌더링 */}
      {isAuthorized ? <Home></Home> : <Welcome></Welcome>}
    </>
  );
};

export default HomePage;
