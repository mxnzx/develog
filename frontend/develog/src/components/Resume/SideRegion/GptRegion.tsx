import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";

// 스타일
import { Br, Hr, SubTitle } from "./SideRegion.style";
import * as S from "./GptRegion.style";
// 컴포넌트
import Button from "components/Common/Button";
import { resumeGpt } from "apis/resume";
import swal from "sweetalert";
import LoadingPage from "components/Common/Loading";

interface ContentProps {
  data: string; // 예시로 문자열 타입으로 가정
}

const GptRegion: React.FC<ContentProps> = (props) => {
  // 자소서에 해당하는 항목
  const userId = useSelector((state: RootState) => state.user.userId);
  const [content, setContent] = useState("");
  const [gptContent, setGptContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    setContent(props.data);
    setGptContent("");
    setIsLoading(false);
    setIsButtonClicked(false);
  }, [props.data]);

  // Gpt로 자소서 내용 보내기 post
  const handleAnalysis = async () => {
    setIsButtonClicked(true);
    setIsLoading(true);

    try {
      const data = await resumeGpt(content);
      // 첨삭 데이터 오면 데이터 변경
      setGptContent(data);
    } catch (error) {
      // 마지막에 지우기
      setIsLoading(false);
      setIsButtonClicked(false);
      setGptContent("");
      swal("현재 GPT서버가 불안정합니다.\n 잠시 후에 시도해주세요.");
      console.error("API 호출 오류:", error);
    } finally {
      setIsLoading(false);
    }
    // console.log("before: ", content);
    // console.log("after: ", gptContent);
  };

  return (
    <>
      <S.Container>
        <S.TopBox>
          <SubTitle>문맥 교정된 자소서</SubTitle>
        </S.TopBox>
        <Br />
        <Hr />
        <S.Wrapper>
          <S.Box>
            {isLoading ? (
              <S.LoadBox>
                <LoadingPage />
                <br />
                <S.LoadText>약 1분정도 소요됩니다 🙂</S.LoadText>
              </S.LoadBox>
            ) : (
              isButtonClicked && (
                <div style={{ height: "97%", display: "flex", justifyContent: "center" }}>
                  <S.Content>{gptContent}</S.Content>
                </div>
              )
            )}
            {!isLoading &&
              !gptContent &&
              !isButtonClicked && ( // 로딩 및 통신까지 실패할 경우
                <Button
                  buttonColor={"darkBlack"}
                  fontColor={"white"}
                  height={"32px"}
                  fontSize={"15px"}
                  borderRadius={"0.625rem"}
                  width="93px"
                  onClick={handleAnalysis}
                >
                  분석하기
                </Button>
              )}
          </S.Box>
        </S.Wrapper>
      </S.Container>
    </>
  );
};
export default GptRegion;
