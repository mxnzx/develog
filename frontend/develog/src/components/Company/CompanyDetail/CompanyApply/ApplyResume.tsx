// 기업조회 리스트의 자기소개서 컴포넌트
// -1 상태랑 isQuestion문항 F 상태 유의하기
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

//스타일
import { getCompanyResume } from "apis/company";
import { postCreateResume, addFirstResumeDetail } from "apis/resume";
import LoadingPage from "components/Common/Loading";
import * as S from "./ApplyResume.style";

// 컴포넌트
import { ToggleImg } from "components/Resume/SideRegion/SideRegion.style";

interface ApplyResumeProps {
  resumeId: number;
  historyId: number;
  interviewId: number;
  companyId: number;
  companyName: string;
}

const ApplyResume: React.FC<ApplyResumeProps> = ({ resumeId, historyId, interviewId, companyId, companyName}) => {
  const navigate = useNavigate();
  // console.log("자소서id:", resumeId, "히스토리 아이디", historyId);

  // 자소서 QnA 데이터
  const { data, isLoading, isError } = useQuery(["data2"], () => getCompanyResume(resumeId));
  const [deadlineAt, setDeadlineAt] = useState("");
  // console.log("자소서 유무", data);

  const [toggleStates, setToggleStates] = useState<boolean[]>(data ? new Array(data.length).fill(false) : []);

  // 함수들 모음
  const createResume = async () => {
    const response = await postCreateResume(deadlineAt, historyId);
    if (response.status == 200) {
      const createresumeId = response.data.resumeId;
      // console.log("자소서 생성", createresumeId);
      const response2 = await addFirstResumeDetail(createresumeId);
      // console.log(response2.data.resumeDetailId);
      navigate(`/resume/${createresumeId}`, { state: { historyId: historyId, companyId:companyId, companyName:companyName } });
    }
  };

  const toggleItem = (index: number) => {
    setToggleStates((prev) => {
      const newToggleStates = [...prev];
      newToggleStates[index] = !newToggleStates[index];
      return newToggleStates;
    });
  };
  // console.log("토글에 담기는 것", toggleStates);
  if (isLoading) {
    return (
      <S.Container style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <LoadingPage />
      </S.Container>
    );
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }
  return (
    <S.Container>
      {resumeId === -1 ? (
        <>
          <S.ClickBox>
            <S.Title>자기소개서</S.Title>
            <S.ClickImg src="/icon/move.png" onClick={createResume} />
          </S.ClickBox>
          {/* 자기소개서 생성 전 */}
          <S.NoContent>
            <S.Text onClick={createResume}>자기소개서 작성하러 가기 →</S.Text>
          </S.NoContent>
        </>
      ) : (
        <>
          <S.ClickBox onClick={() => navigate(`/resume/${resumeId}`, { state: { historyId: historyId, companyId: companyId, companyName:companyName} })}>
            <S.Title>자기소개서</S.Title>
            <S.ClickImg src="/icon/move.png" />
          </S.ClickBox>
          {/* 자기소개서 생성 후 */}
          {data.isQuestion === "F" ? (
            <>
              <S.NoContent>
                <S.Text>✏️ 생성된 자소서의 문항 등록이 필요합니다.</S.Text>
              </S.NoContent>
            </>
          ) : (
            <>
              {/* 자기소개서 생성 후 */}
              {data.responseResumeDetailList &&
                data.responseResumeDetailList.map((item: any, index: number) => (
                  <S.Content key={index}>
                    <S.TitleBox>
                      <S.Question onClick={() => toggleItem(index)}>
                        문항{index + 1}. {item.question}
                      </S.Question>
                      <ToggleImg
                        src={toggleStates[index] ? "/icon/close.png" : "/icon/open.png"}
                        onClick={() => toggleItem(index)}
                      />
                    </S.TitleBox>
                    {toggleStates[index] && (
                      <S.DetailWrapper>
                        {/* <br /> */}
                        <S.Box>
                          {item.totalCategory.category.map((word: any) => (
                            <S.Keyword>{word.keyword}</S.Keyword>
                          ))}
                          {item.totalCategory.userCategory.map((words: any) => (
                            <S.Keyword>{words.keyword}</S.Keyword>
                          ))}
                        </S.Box>
                        <S.Box>
                          <S.Answer>{item.answer}</S.Answer>
                        </S.Box>
                        <S.MoveBox>
                          <S.MoveBtn
                            onClick={() => {
                              navigate("/interview", {
                                state: {
                                  interviewId: interviewId,
                                  resumeDetailId: item.resumeDetailId,
                                  historyId: historyId,
                                  companyId: companyId,
                                },
                              });
                            }}
                          >
                            인터뷰 페이지로 이동
                          </S.MoveBtn>
                        </S.MoveBox>
                      </S.DetailWrapper>
                    )}
                  </S.Content>
                ))}
            </>
          )}
        </>
      )}
    </S.Container>
  );
};

export default ApplyResume;
