// 면접 준비 페이지 내 자기소개서 컴포넌트
import React, { useEffect, useState } from "react";

// 컴포넌트
import PredictItem from "./PredictItem";

//api
import { getOpenAIPredictId, createPredictionQ, registPredictionList, getInterviewInfo } from "apis/interview";
// 스타일
import Text from "style/Text";
import {
  InterviewResumeBox,
  LabelContainer,
  PredictionMargin,
  SubTextButtonWrap,
  StyledSVG,
  BtnSVG,
} from "./Interview.style";

import { useQuery } from "react-query";
import Button from "components/Common/Button";
import PredictInput from "./PredictInput";
import { useNavigate } from "react-router-dom";

export interface InterviewResumeType {
  resumeDetailId: number;
  resumeDetail: { resumeDetailId: number; question: string; answer: string };
  predictResponse: { predictionId: number; questionContent: string; resumeDetailId: number; fromResume: string }[];
  interviewId: number;
}
const InterviewResume = (props: InterviewResumeType) => {
  const navigate = useNavigate();
  const { data, isError, refetch } = useQuery(["interviewItem"], () => getInterviewInfo(props.resumeDetailId), {
    onSuccess: (data) => {
      // console.log(data);
      setPredictList(data.data.predictionResponses);
    },
  });
  // console.log('data',data);

  const answer = props.resumeDetail.answer.replace(/\\n/g, "\n");
  const [isLoading, setIsLoading] = useState(false);
  const [predictList, setPredictList] = useState<
    { predictionId: number; questionContent: string; resumeDetailId: number; fromResume: string }[]
  >([]);

  const createPrediction = async () => {
    setIsLoading(true);
    try {
      //gpt 호출
      const response = await createPredictionQ(props.resumeDetail.answer);
      const predictionList = response.data;
      // console.log(predictionList);

      //5개 서버에 저장
      registPredictionList(props.interviewId, props.resumeDetail.resumeDetailId, predictionList).then((response) => {
        if (response.status === 200) {
          refetch();
        }
      });
      // const newList = registResponse.data;
      // console.log(registResponse.data);
      //5개 원래꺼에 추가
      // setPredictList([...predictList, ...newList]);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log("변했따");
    refetch();
  }, [predictList]);

  return (
    <>
      {/* <svg
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", position: "fixed", left: "5%", top: "10%" }}
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12.8329 7.9486L8.65681 11.4234C8.57221 11.4938 8.50413 11.582 8.45741 11.6816C8.41069 11.7812 8.38647 11.89 8.38647 12C8.38647 12.1101 8.41069 12.2188 8.45741 12.3184C8.50413 12.418 8.57221 12.5062 8.65681 12.5766L12.8329 16.0514C12.9424 16.1425 13.0756 16.2005 13.2169 16.2186C13.3582 16.2368 13.5017 16.2143 13.6307 16.1539C13.7596 16.0935 13.8687 15.9975 13.9452 15.8774C14.0217 15.7572 14.0623 15.6178 14.0624 15.4753V8.52469C14.0623 8.38226 14.0217 8.2428 13.9452 8.12263C13.8687 8.00246 13.7596 7.90655 13.6307 7.84612C13.5017 7.78569 13.3582 7.76323 13.2169 7.78138C13.0756 7.79953 12.9424 7.85753 12.8329 7.9486Z"
          fill="#0F172A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.25 12C2.25 6.61704 6.61704 2.25 12 2.25C17.383 2.25 21.75 6.61704 21.75 12C21.75 17.383 17.383 21.75 12 21.75C6.61704 21.75 2.25 17.383 2.25 12ZM12 3.75C7.44546 3.75 3.75 7.44546 3.75 12C3.75 16.5545 7.44546 20.25 12 20.25C16.5545 20.25 20.25 16.5545 20.25 12C20.25 7.44546 16.5545 3.75 12 3.75Z"
          fill="#0F172A"
        />
      </svg> */}
      <LabelContainer>
        <Text $isBold $sizeUpHalf>
          자기소개서
        </Text>
      </LabelContainer>
      <PredictionMargin />
      <PredictItem
        Long
        word={`Q.  ${props.resumeDetail.question}`}
        interviewId={props.interviewId}
        resumeDetailId={props.resumeDetail.resumeDetailId}
        predictionId={0}
      />
      <InterviewResumeBox
        style={{
          boxShadow: "1px 1px 1px 0px rgba(0, 0, 0, 0.153)",
        }}
      >
        <Text
          style={{
            padding: "10px",
            fontSize: "14.5px",
            wordSpacing: "2px",
            lineHeight: "22px",
          }}
        >
          {answer}
        </Text>
      </InterviewResumeBox>
      <br />
      <LabelContainer>
        <Text $isBold $sizeUpHalf>
          예상 면접 질문
        </Text>
        <PredictionMargin />
        {/* 설명 글과 버튼 */}
        <SubTextButtonWrap>
          <Text $isSubTextColor $isBold>
            작성하신 자기소개서 답변에 기반한 예상 질문입니다. 예상 질문에 대한 스크립트를 작성하고 녹음해 보세요.
          </Text>
          {/* GPT로 질문 생성하기 */}
          <Button
            style={{ paddingLeft: "20px", paddingRight: "17px", cursor: "pointer" }}
            buttonColor={"darkBlack"}
            fontColor={"white"}
            height={"1.6rem"}
            fontSize={"0.75rem"}
            borderRadius={"0.625rem"}
            // width="6rem"
            onClick={() => {
              createPrediction();
            }}
          >
            {isLoading ? "생성중입니다 ... " : "예측 질문"}
            <BtnSVG src={"/icon/arrowDownCircle.svg"} />
          </Button>
        </SubTextButtonWrap>
      </LabelContainer>

      {/* 등록된 예상질문란 */}
      {predictList.map((predict, idx) => (
        <PredictItem
          key={idx}
          word={`예상질문${idx + 1}.  ${predict.questionContent}`}
          rightWord="연습하기"
          interviewId={props.interviewId}
          resumeDetailId={props.resumeDetail.resumeDetailId}
          predictionId={predict.predictionId}
        />
      ))}
      {/* 개별적으로 등록하는 예상질문 */}
      <PredictInput
        predictList={predictList}
        setPredictList={setPredictList}
        interviewId={props.interviewId}
        resumeDetailId={props.resumeDetailId}
      />
    </>
  );
};

export default InterviewResume;
