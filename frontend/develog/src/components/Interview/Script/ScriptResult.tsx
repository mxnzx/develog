//우측 스크립트 분석 결과 컴포넌트
import React, { useEffect, useState } from "react";

// import * as S from "./ScriptResult.style";
import * as M from "./Script.style";

import KeyWordResult from "./KeywordResult";
import SpeedResult from "./SpeedResult";
import ScoreResult from "./ScoreResult";
//키워드 props
export interface ScriptResultType {
  keywordList: { keywordId: number; keywordContent: string }[];
  voiceText: string;
  voiceId: number;
  time: number;
  voiceSecond: number;
  setVoiceSecond: React.Dispatch<React.SetStateAction<number>>;
  similarity: number;
  setSimilarity: React.Dispatch<React.SetStateAction<number>>;
}

const ScriptResult = (props: ScriptResultType) => {
  //키워드 돌면서 voiceText에 있는지 확인
  //포함된 키워드
  const [includeKeyword, setIncludeKeyword] = useState<string[]>([]);
  //포함되지 않은 키워드
  const [exceptKeyword, setExceptKeyword] = useState<string[]>([]);

  const [resultText, setResultText] = useState("");

  const [voiceId, setVoiceId] = useState<number>(props.voiceId);
  useEffect(() => {
    setResultText(props.voiceText);
    setExceptKeyword([]);
    setIncludeKeyword([]);
  }, [props.voiceText]);

  useEffect(() => {
    if (resultText.length !== 0) {
      props.keywordList.forEach((keyword) => {
        // console.log(keyword.keywordContent);
        // console.log(props.voiceText);
        // console.log(resultText);
        if (resultText.includes(keyword.keywordContent)) {
          // console.log("포함!!");
          // console.log(keyword.keywordContent);
          setIncludeKeyword((prevInclude) => [...prevInclude, keyword.keywordContent]);
        } else {
          setExceptKeyword((prevExcept) => [...prevExcept, keyword.keywordContent]);
        }
      });
    }
  }, [resultText]);
  useEffect(() => {
    setVoiceId(props.voiceId);
    // console.log(props.voiceId);
    // console.log(props.time);
  }, [props.voiceId]);

  return (
    <>
      <M.ResumeContainer>
        <M.Title>녹음 분석 결과</M.Title>
        <M.TextContainer>
          <M.Content disabled={true} style={{ height: "100%" }} value={resultText}></M.Content>
        </M.TextContainer>
        <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <KeyWordResult
            includeKeyword={includeKeyword}
            exceptKeyword={exceptKeyword}
            voiceId={props.voiceId}
            voiceText={resultText}
            time={props.time}
            voiceSecond={props.voiceSecond}
            setVoiceSecond={props.setVoiceSecond}
            similarity={props.similarity}
            setSimilarity={props.setSimilarity}
          ></KeyWordResult>
          <SpeedResult voiceSecond={resultText.length / props.voiceSecond}></SpeedResult>
          <ScoreResult similarity={props.similarity}></ScoreResult>
        </div>
      </M.ResumeContainer>
    </>
  );
};

export default ScriptResult;
