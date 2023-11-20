import React, { useEffect, useState } from "react";
import * as S from "./Script.style";
import Button from "components/Common/Button";
import { ModalWrapper, Modal, KeywordList } from "components/Resume/MainRegion/MainRegion.style";
import { createTails, getTailId, registTailTitle } from "apis/interview";
export interface ScriptTailType {
  tailListResponse: { tailId: number; tailQuestion: string }[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  predictionQuestion: string;
  predictionId: number;
}

const ScriptTail = (props: ScriptTailType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tailList, setTailList] = useState<{ tailId: number; tailQuestion: string }[]>(props.tailListResponse);
  const createNewTail = async () => {
    setIsLoading(true);
    try {
      const response = await createTails(props.predictionQuestion);
      const tailTitle = response.data;
      // console.log(tailTitle);
      //꼬리질문 id 받아오기
      const secondResponse = await getTailId(props.predictionId);
      // console.log(secondResponse.data);
      const tailId = secondResponse.data;
      //꼬리질문 제목 등록하기
      // console.log(props.predictionId);
      const registResponse = await registTailTitle(tailId, tailTitle);
      // console.log(registResponse.data);
      setTailList([...tailList, { tailId: tailId, tailQuestion: tailTitle }]);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }

    //새로운 꼬리질문 받으면,
  };

  useEffect(() => {
    setTailList(props.tailListResponse);
  }, [props.tailListResponse]);

  return (
    <>
      <S.ElementContainer>
        <S.Icon src="/icon/tail_icon.png"></S.Icon>
        <S.ElementTitle>꼬리 질문</S.ElementTitle>
        <S.ElementContent>
          {tailList.length !== 0 ? (
            <>
              <Button buttonColor={"skyBlue"} fontWeight={"700"}>
                {tailList[0].tailQuestion}
              </Button>
              <span
                style={{ cursor: "pointer", marginLeft: "4px" }}
                onClick={() => {
                  props.setShowModal(true);
                }}
              >
                더보기
              </span>
            </>
          ) : (
            <Button
              style={{ padding: "5px 9px" }}
              buttonColor={"skyBlue"}
              onClick={() => {
                createNewTail();
              }}
            >
              {isLoading ? "생성중입니다..." : "생성하기"}
            </Button>
          )}
        </S.ElementContent>
      </S.ElementContainer>

      {props.showModal && (
        <>
          <ModalWrapper
            style={{ backgroundColor: "#0000003d" }}
            onClick={() => {
              props.closeModal();
            }}
          ></ModalWrapper>
          <>
            <Modal style={{ top: "-5%", left: "153%", zIndex: "2000" }}>
              <KeywordList
                style={{
                  borderTop: "30px solid #CECECE",
                  position: "absolute",
                  top: "-46px",
                  width: "280px",
                  borderRadius: "1.3rem",
                  justifyContent: "center",
                }}
              >
                <S.KeywordTitle>꼬리 질문 리스트</S.KeywordTitle>
                <S.KeywordItemList>
                  {tailList.map((ques, index) => (
                    <S.KeywordItem key={index}>{ques.tailQuestion}</S.KeywordItem>
                  ))}
                </S.KeywordItemList>
                <Button
                  width="67px"
                  height="22px"
                  fontSize={"10px"}
                  buttonColor={"darkBlack"}
                  fontColor={"white"}
                  borderRadius={"20px"}
                  style={{ margin: "10px" }}
                  onClick={() => {
                    createNewTail();
                  }}
                >
                  생성하기
                </Button>
              </KeywordList>
            </Modal>
          </>
        </>
      )}
    </>
  );
};

export default ScriptTail;
