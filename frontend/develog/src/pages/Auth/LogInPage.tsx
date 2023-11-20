import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// 로그인 리덕스
import { logIn } from "store/reducers/user";

// API
import { logInAPI } from "apis/Auth/LogIn";
import axios from "axios";
// import { SERVERURL } from "ignore/URLs";

const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    // console.log(code);

    if (code) {
      // console.log(typeof code, "내 타입은?");
      logInAPI(code)
        .then((res) => {
          dispatch(logIn(res.data));
          console.log(res, "로그인 성공");
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err, "에러");
          navigate("/");
        });
    }
    // localStorage.setItem
    // dispatch(login(code));
  }, []);

  return <></>;
};

export default LogInPage;
