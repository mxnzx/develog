import Button from "components/Common/Button";
import React, { useEffect, useRef, useState } from "react";
import { formatTime } from "utils/Function";
import * as S from "./Script.style";
import SpeechToText from "./SpeechToText";
import { getVoiceId } from "apis/interview";

export interface ScriptRecordType {
  isRecordOn: boolean;
  setRecordOn: React.Dispatch<React.SetStateAction<boolean>>;
  isResult: boolean;
  setResult: React.Dispatch<React.SetStateAction<boolean>>;
  voiceText: string;
  setVoiceText: React.Dispatch<React.SetStateAction<string>>;
  voiceId: number;
  setVoiceId: React.Dispatch<React.SetStateAction<number>>;
  predictionId: number;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const ScriptRecord = (props: ScriptRecordType) => {
  const [allText, setAllText] = useState<string>(""); // 입력본 + 녹음본 모두 합친 것
  const { startListening, stopListening, accenting, setAccentText, accentText } = SpeechToText();
  //타이머 구현
  //스틉워치 작동중인지 여부
  const [running, setRunning] = useState<boolean>(false);
  //실시간으로 측정되고 있는 시간
  const [time, setTime] = useState<number>(0);
  //타이머 실시간으로 관리하는 함수
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  //1.스톱워치 시작, 정지 하는 함수.
  const startStopWatch = () => {
    //버튼을 클릭했을 때, running이 false 이면, 1000ms 마다 타이머가 실행됨
    //setTime 함수를 호출하여 이전 시간에 1000을 더한 값이 time이 된다.
    //그리고 running state를 true로 만들어 준다.

    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
      setRunning(true);
    } else {
      clearInterval(intervalRef.current);
      props.setTime(time);
      //녹음 스크립트 저장.
      resetStopwatch();
      setRunning(false);
    }
  };

  //스톱워치 reset 하는 함수(분석하기 누르면 reset시키기)
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  //분석하기 누른 경우, voiceId 얻어야 됨 - api 호출
  const analyze = async () => {
    try {
      props.setResult(true);
      props.setVoiceText(allText);
      setAllText("");
      // console.log(props.predictionId);
      const response = await getVoiceId(props.predictionId);
      //voiceId로 이제 ...
      // console.log(response.data);
      props.setVoiceId(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 녹음 시작 & 종료
  useEffect(() => {
    if (running) {
      startListening();
    } else {
      stopListening();
    }
  }, [setRunning, running]);

  // 변환된 텍스트 저장
  useEffect(() => {
    if (accentText) {
      setAllText(allText + " " + accentText); // 기존 입력된 값과 합치기
    }
  }, [setAccentText, accentText]);

  return (
    <>
      <S.ElementContainer style={{ position: "relative" }}>
        <S.Icon src="/icon/record_icon.png"></S.Icon>

        <S.ElementTitle>녹음</S.ElementTitle>
        <S.ElementContent style={{ marginLeft: "-10px" }}>
          <S.RecordBtn
            onClick={() => {
              setRunning(!running); // 녹음 시작, 종료
              startStopWatch();
              accenting(); // 텍스트로 변환
            }}
          >
            {running ? (
              <img src="/icon/stop.png" style={{ height: "70%" }}></img>
            ) : (
              <img src="/icon/recordBtn_icon.png" style={{ height: "70%" }}></img>
            )}
          </S.RecordBtn>
          <span>{running ? formatTime(time) : "작성하신 스크립트를 녹음해보세요."}</span>
        </S.ElementContent>
        <Button
          buttonColor={"darkBlack"}
          fontColor={"white"}
          height={"25px"}
          fontSize={"14px"}
          borderRadius={"0.625rem"}
          width="80px"
          style={{ position: "absolute", right: "3%" }}
          onClick={analyze}
        >
          분석하기
        </Button>
      </S.ElementContainer>
    </>
  );
};

export default ScriptRecord;
