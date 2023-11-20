import React, { useEffect, useState } from "react";
import * as M from "./Script.style";
import * as S from "./KeywordResult.style";
import Button from "components/Common/Button";
import { registRecordResult, getAnalysisResult } from "apis/interview";
export interface KeywordResultType {
  includeKeyword: string[];
  exceptKeyword: string[];
  voiceId: number;
  voiceText: string;
  time: number;
  voiceSecond: number;
  setVoiceSecond: React.Dispatch<React.SetStateAction<number>>;
  similarity: number;
  setSimilarity: React.Dispatch<React.SetStateAction<number>>;
}
const KeywordResult = (props: KeywordResultType) => {
  const [includeKeyword, setIncludeKeyword] = useState<string[]>(props.includeKeyword);
  const [exceptKeyword, setExceptKeyword] = useState<string[]>(props.exceptKeyword);
  const [voiceId, setVoiceId] = useState<number>(props.voiceId);

  useEffect(() => {
    setIncludeKeyword(props.includeKeyword);
    setExceptKeyword(props.exceptKeyword);

    //여기서 요청 보내기
  }, [props.includeKeyword, props.exceptKeyword]);
  useEffect(() => {
    setVoiceId(props.voiceId);
    if (props.voiceId === -1) return;
    const registResult = async () => {
      try {
        const response = await registRecordResult(
          props.voiceId,
          props.voiceText,
          props.time / 1000,
          "P",
          props.includeKeyword,
          props.exceptKeyword
        );
        // console.log(response.data);
        if (response.status == 200) {
          const secResponse = await getAnalysisResult(props.voiceId);
          props.setSimilarity(secResponse.data.similarity);
          props.setVoiceSecond(secResponse.data.voiceSecond);
        }
      } catch (error) {
        console.log(error);
      }
    };
    registResult();
  }, [props.voiceId]);

  return (
    <>
      <M.ElementContainer style={{ height: "70px" }}>
        {/* 포함된 키워드 */}
        <S.KeywordContainer>
          <S.KeywordTitle>
            <M.Icon src="/icon/keyword_icon.png" style={{ paddingRight: "2%", height: "74%" }}></M.Icon>
            <span>포함된 키워드</span>
          </S.KeywordTitle>
          {includeKeyword.length !== 0 ? (
            <S.KeywordWrapper>
              {includeKeyword.map((keyword, index) => (
                <Button buttonColor={"skyBlue"} fontWeight={"700"} style={{ margin: "4px" }} key={index}>
                  {keyword}
                </Button>
              ))}
            </S.KeywordWrapper>
          ) : (
            <></>
          )}
        </S.KeywordContainer>
        <S.KeywordContainer>
          <S.KeywordTitle>
            <M.Icon src="/icon/keyword_icon.png" style={{ paddingRight: "2%", height: "74%" }}></M.Icon>
            <span>포함되지 않은 키워드</span>
          </S.KeywordTitle>
          {exceptKeyword.length !== 0 ? (
            <S.KeywordWrapper>
              {exceptKeyword.map((keyword, index) => (
                <Button buttonColor={"pinkRed"} fontWeight={"700"} style={{ margin: "4px" }} key={index}>
                  {keyword}
                </Button>
              ))}
            </S.KeywordWrapper>
          ) : (
            <></>
          )}
        </S.KeywordContainer>
        {/* 포함되지 않은 키워드 */}
      </M.ElementContainer>
    </>
  );
};
export default KeywordResult;
