// 면접페이지 컴포넌트(헤더+ 좌측 + 우측 컴포넌트 불러오기)
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { addNewKeyword } from "apis/interview";

// 컴포넌트
import PredictItem from "../PredictItem";
import ResumeAnswer from "./ResumeAnswer";
import ScriptHeader from "./ScriptHeader";
import ScriptKeyword from "./ScriptKeyword";
import ScriptRecord from "./ScriptRecord";
import ScriptResult from "./ScriptResult";
import ScriptTail from "./ScriptTail";
import ScriptWrite from "./ScriptWrite";

// 스타일
import { InterviewGround, PredictionMargin } from "../Interview.style";
import { getDetailPrediction, deleteKeyword } from "apis/interview";
import * as S from "./Script.style";

const Script = () => {
  //파라미터 취득
  const location = useLocation();
  const state = location.state as {
    interviewId: number;
    resumeDetailId: number;
    predictionId: number;
    historyId: number;
    companyId: number;
  };

  const interviewId = state.interviewId;
  const resumeDetailId = state.resumeDetailId;
  const predictionId = state.predictionId;
  const historyId = state.historyId;
  const companyId = state.companyId;

  //받아온 응답값
  const [keywordList, setKeywordList] = useState<{ keywordId: number; keywordContent: string }[]>([]);
  const [predictionAnswer, setPredictionAnswer] = useState<string>("");
  const [predictionQuestion, setPredictionQuestion] = useState<string>("");

  const [resumeDetail, setResumeDetail] = useState<{
    answerContent: string;
    questionContent: string;
    resumeDetailId: number;
  }>({ answerContent: "", questionContent: "", resumeDetailId: -1 });
  const [tailListResponse, setTailListResponse] = useState<{ tailId: number; tailQuestion: string }[]>([]);
  const [voiceUrl, setVoiceUrl] = useState<string>("");
  const [voiceId, setVoiceId] = useState<number>(-1);
  const [voiceSecond, setVoiceSecond] = useState<number>(0);
  const [isSave, setSave] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  //녹음 완료/아닌 경우 check
  const [isRecordOn, setRecordOn] = useState(false);
  const [time, setTime] = useState<number>(0);

  //분석하기 누른 경우 check - true인 경우 컴포넌트 갈아끼우기
  //분석하기 누른 경우, allText 초기화 시켜주기.

  const [isResult, setResult] = useState(false);
  const [voiceText, setVoiceText] = useState<string>("");
  const [similarity, setSimilarity] = useState<number>(0);
  //input 요소에서 엔터키를 누르면 새로운 키워드를 추가.
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && newKeyword.trim() !== "") {
      addKeyword(newKeyword);
      setNewKeyword("");
    }
  };

  /* 함수 */
  //키워드 삭제 시
  const removeKeyword = async (keywordId: number, keyword: string) => {
    // console.log("어디가문제야");
    const response = await deleteKeyword(keywordId);
    // console.log(response.data);
    const updatedKeywords = keywordList.filter((k) => k.keywordContent !== keyword);
    setKeywordList(updatedKeywords);
  };
  //모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };
  //키워드 추가
  const addKeyword = async (keyword: string) => {
    let isInclude = false;
    keywordList.map((k) => {
      if (k.keywordContent === keyword) {
        isInclude = true;
        return;
      }
    });
    if (isInclude === false) {
      const response = await addNewKeyword(predictionId, keyword);
      // console.log(response.data.keywordId);
      setKeywordList((prevKeywords) => [
        ...prevKeywords,
        { keywordId: response.data.keywordId, keywordContent: keyword },
      ]);
    }
  };
  //키워드 모달 닫기
  const closeKeyModal = () => {
    setShowKeyModal(false);
  };

  /* props */
  const writeProps = {
    isSave,
    setSave,
    predictionAnswer,
    setPredictionAnswer,
    predictionId,
  };
  const tailProps = {
    tailListResponse,
    showModal,
    setShowModal,
    closeModal,
    predictionQuestion,
    predictionId,
  };

  const keywordProps = {
    showKeyModal,
    setShowKeyModal,
    closeKeyModal,
    keywordList,
    removeKeyword,
    newKeyword,
    setNewKeyword,
    handleEnter,
    predictionId,
  };

  const recordProps = {
    isRecordOn,
    setRecordOn,
    isResult,
    setResult,
    voiceText,
    setVoiceText,
    voiceId,
    setVoiceId,
    predictionId,
    time,
    setTime,
  };

  const isTail = location.pathname.includes("tail") ? true : false;

  useEffect(() => {
    //예상 질문 상세 조회페이지로 넘어가는 api
    const getDetail = async (interviewId: number, resumeDetailId: number, predictionId: number) => {
      try {
        const response = await getDetailPrediction(interviewId, resumeDetailId, predictionId);
        // console.log(response);
        setKeywordList(response.data.keywords);
        setPredictionAnswer(response.data.predictionAnswer);
        setPredictionQuestion(response.data.predictionQuestion);
        setResumeDetail(response.data.resumeDetail);
        setTailListResponse(response.data.tailListResponse);
        setVoiceUrl(response.data.voiceUrl);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail(interviewId, resumeDetailId, predictionId);
  }, []);
  return (
    <>
      <InterviewGround>
        {/* 예상 면접질문 헤더 */}
        {/* 여기 historyId 추가하면됩니다!! */}
        <ScriptHeader interviewId={interviewId} resumeDetailId={resumeDetailId} historyId={historyId} companyId={companyId} />
        {/* Long이 붙으면, 일정 영역 넘어가면 스크롤로 넘어감 */}
        <PredictItem
          Long
          ML
          word={predictionQuestion}
          interviewId={interviewId}
          resumeDetailId={resumeDetailId}
          predictionId={predictionId}
        />
        {/* 답변 스크립트 , 자기소개서 들어갈 container */}
        <S.ContentContainer>
          <S.ScriptContainer>
            <ScriptWrite {...writeProps}></ScriptWrite>
            <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* 꼬리질문 */}
              {isTail ? null : <ScriptTail {...tailProps}></ScriptTail>}
              {/* 키워드 */}
              <ScriptKeyword {...keywordProps}></ScriptKeyword>
              {/* 녹음 */}
              <ScriptRecord {...recordProps}></ScriptRecord>
            </div>
          </S.ScriptContainer>
          {isResult ? (
            <ScriptResult
              keywordList={keywordList}
              voiceText={voiceText}
              voiceId={voiceId}
              time={time}
              voiceSecond={voiceSecond}
              setVoiceSecond={setVoiceSecond}
              similarity={similarity}
              setSimilarity={setSimilarity}
            ></ScriptResult>
          ) : isTail ? ( // <ScriptResult keywordList={keywordList}></ScriptResult> // 분석 결과 나온 경우 분석 결과 컴포넌트 // 분석 하기 전, 자기소개서 답변 or 이전 답변 스크립트 컴포넌트
            <ResumeAnswer answer={resumeDetail.answerContent} isTail={isTail}></ResumeAnswer>
          ) : (
            <ResumeAnswer answer={resumeDetail.answerContent} isTail={isTail}></ResumeAnswer>
          )}
        </S.ContentContainer>
      </InterviewGround>
    </>
  );
};

export default Script;
