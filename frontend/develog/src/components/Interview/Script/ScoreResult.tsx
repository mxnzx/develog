import React, { useState } from "react";

import * as M from "./Script.style";
interface ScoreResultType {
  similarity: number;
}
const ScoreResult = (props: ScoreResultType) => {
  return (
    <>
      <M.ElementContainer
        style={{ flexDirection: "column", alignItems: "normal", height: "80px", justifyContent: "center" }}
      >
        {/* 점수 */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "23px", marginTop: "23px" }}>
          <M.Icon src="/icon/score.png" style={{ height: "100%" }}></M.Icon>
          <span>점수</span>
        </div>
        <div style={{ paddingLeft: "60px", paddingBottom: "11px" }}>
          <p>
            분석 결과, 해당 문항에 대한 점수는
            <span style={{ color: "#FF5858", fontWeight: "700" }}> {props.similarity}점 입니다.</span>
          </p>
        </div>
      </M.ElementContainer>
    </>
  );
};

export default ScoreResult;
