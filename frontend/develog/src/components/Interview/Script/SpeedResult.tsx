import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import * as M from "./Script.style";
export interface SpeedResultType {
  voiceSecond: number;
}
const SpeedResult = (props: SpeedResultType) => {
  //1초에 몇글자 - 말하는 속도

  const userName = useSelector((state: RootState) => state.user.name);
  const [speed, setSpeed] = useState("");
  useEffect(() => {
    if (props.voiceSecond > 0 && props.voiceSecond < 4) {
      setSpeed("느린 편");
    } else if (props.voiceSecond >= 4 && props.voiceSecond < 7) {
      setSpeed("적당한 편");
    } else if (props.voiceSecond >= 7 && props.voiceSecond <= 15) {
      setSpeed("빠른 편");
    }
  }, [props.voiceSecond]);
  return (
    <>
      <M.ElementContainer
        style={{ flexDirection: "column", alignItems: "normal", height: "80px", justifyContent: "center" }}
      >
        {/* 말하는 속도 */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "23px", marginTop: "23px" }}>
          <M.Icon src="/icon/voiceMail.png" style={{ height: "100%" }}></M.Icon>
          <span>말하는 속도</span>
        </div>
        <div style={{ paddingLeft: "60px", paddingBottom: "11px" }}>
          <p>
            {props.voiceSecond > 0 && props.voiceSecond < 15 ? (
              <span>
                분석 결과, {userName}님의 말의 속도는{" "}
                <span style={{ color: "#002984", fontWeight: "700" }}>{Math.round(props.voiceSecond)} 글자/초</span>{" "}
                으로, <span style={{ color: "#FF5858", fontWeight: "700" }}>{speed}입니다.</span>
              </span>
            ) : (
              <span style={{ color: "#002984", fontWeight: "700" }}>잘못된 녹음파일입니다.</span>
            )}
          </p>
        </div>
      </M.ElementContainer>
    </>
  );
};
export default SpeedResult;
