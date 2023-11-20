// 기업 조회 페이지 내 면접 준비 컴포넌트

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCompanyInterviewList } from "apis/company";
import { postInterview, getInterviewCompanyInfo } from "apis/interview";
import * as S from "./ApplyResume.style";
import { ToggleImg } from "components/Resume/SideRegion/SideRegion.style";
import { useNavigate } from "react-router-dom";

// 상속 변수 타입 지정
interface ApplyInterviewProps {
  interviewId: number;
  historyId: number;
  companyId: number;
}

const ApplyInterview: React.FC<ApplyInterviewProps> = ({ interviewId, historyId, companyId}) => {
  const navigate = useNavigate();
  // console.log("인터뷰 리스트 컴포넌트", interviewId);
  // console.log(companyId);
  const { data, isLoading, isError } = useQuery("companyInterviewList", () => getCompanyInterviewList(interviewId));
  const [interviewAt, setInterviewAt] = useState("");
  const [place, setPlace] = useState("");
  const [newInterviewId, setNewInterviewId] = useState(interviewId);
  // 예상질문 토글
  // console.log(data);
  const [toggleStates, setToggleStates] = useState<boolean[]>(data ? new Array(data.length).fill(false) : []);
  // console.log("예상질문 토글", toggleStates);
  // 꼬리질문 토글
  const [toggleState, setToggleState] = useState<boolean[]>(data ? new Array(data.length).fill(false) : []);
  const [firstDetail, setFirstDetail] = useState(0);
  useEffect(() => {
    const fetchDetailId = async () => {
      try {
        const detailIds = await getInterviewCompanyInfo(historyId);
        const firstDetail = detailIds.data.resumeDetailIds[0];
        setFirstDetail(firstDetail);
      } catch (error) {
        throw error;
      }
    };
    fetchDetailId();
  }, [interviewId, historyId]);
  //면접 등록 api
  const createInterview = async () => {
    const response = await postInterview(interviewAt, place, historyId);
    if (response.status === 200) {
      // console.log(response.data.interviewId);
      const createInterviewId = response.data;
      // console.log("인터뷰 생성", createInterviewId);
      setNewInterviewId(createInterviewId);
      //interview page로 이동
      navigate("/interview", {
        state: {
          interviewId: createInterviewId,
          resumeDetailId: firstDetail,
          historyId: historyId,
          companyId: companyId,
        },
      });
    }
  };

  const toggleItems = (index: number) => {
    setToggleStates((prev) => {
      const newToggleStates = [...prev];
      newToggleStates[index] = !newToggleStates[index];
      return newToggleStates;
    });
  };
  const toggleItem = (index: number) => {
    setToggleState((prev) => {
      const newToggleState = [...prev];
      newToggleState[index] = !newToggleState[index];
      return newToggleState;
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }
  // console.log("기업상세 인터뷰 데이터", data.data);

  return (
    <>
      <S.Container>
        {newInterviewId === -1 ? (
          <S.NoContent>
            <S.Text onClick={createInterview}>면접 준비하러 가기 →</S.Text>
          </S.NoContent>
        ) : (
          <>
            <S.ClickBox>
              <S.Title>면접 준비</S.Title>
              <S.ClickImg src="/icon/move.png" />
            </S.ClickBox>
            {/* 면접 생성 후 */}
            {data.data && data.data.length > 0 ? (
              data.data.map((item: any, index: number) => (
                <S.Content key={index}>
                  <S.TitleBox>
                    <S.Question onClick={() => toggleItems(index)}>
                      예상질문{index + 1}. {item.questionContent}
                    </S.Question>
                    <ToggleImg
                      src={toggleStates[index] ? "/icon/close.png" : "/icon/open.png"}
                      onClick={() => toggleItems(index)}
                    />
                  </S.TitleBox>
                  {toggleStates[index] && (
                    <S.DetailWrapper>
                      {/* <br /> */}
                      <S.Box>
                        {item.predictionKeywordList.map((word: any) => (
                          <S.Keyword1 key={word.keyword}>{word.keyword}</S.Keyword1>
                        ))}
                      </S.Box>
                      <S.Box>
                        <S.Answer>{item.answerContent}</S.Answer>
                      </S.Box>
                      <S.MoveBox>
                        <S.MoveBtn
                          onClick={() => {
                            navigate("/script", {
                              state: {
                                interviewId: interviewId,
                                resumeDetailId: item.resumeDetailId,
                                predictionId: item.predictionId,
                                historyId: historyId,
                                companyId:companyId
                              },
                            });
                          }}
                        >
                          {" "}
                          연습하러 가기
                        </S.MoveBtn>
                      </S.MoveBox>

                      {item.tailQuestionList &&
                        item.tailQuestionList.map((tail: any, tailIndex: number) => (
                          <S.TailContent key={tailIndex}>
                            <S.TitleBox>
                              <S.Question>
                                꼬리질문{tailIndex + 1}. {tail.tailQuestion}
                              </S.Question>
                              <ToggleImg
                                src={toggleState[tailIndex] ? "/icon/close.png" : "/icon/open.png"}
                                onClick={() => toggleItem(tailIndex)}
                              />
                            </S.TitleBox>
                            {toggleState[tailIndex] && (
                              <S.DetailWrapper>
                                <S.Box>
                                  {tail.tailKeywordList.map((word: any) => (
                                    <S.Keyword1 key={word.keyword}>{word.keyword}</S.Keyword1>
                                  ))}
                                </S.Box>
                                <S.Box>
                                  <S.Answer>{tail.tailAnswer}</S.Answer>
                                </S.Box>
                              </S.DetailWrapper>
                            )}
                          </S.TailContent>
                        ))}
                    </S.DetailWrapper>
                  )}
                </S.Content>
              ))
            ) : (
              <S.NoContent>
                <S.Text
                  onClick={() => {
                    navigate("/interview", {
                      state: {
                        interviewId: newInterviewId,
                        resumeDetailId: firstDetail,
                        historyId: historyId,
                      },
                    });
                  }}
                >
                  🔎 생성된 인터뷰의 예상질문 등록이 필요합니다.
                </S.Text>
              </S.NoContent>
            )}
          </>
        )}
      </S.Container>
    </>
  );
};
export default ApplyInterview;
