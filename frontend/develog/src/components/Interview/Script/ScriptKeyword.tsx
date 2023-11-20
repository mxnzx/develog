import React, { useState } from "react";
import * as S from "./Script.style";
import Button from "components/Common/Button";
import { ModalWrapper, Modal, KeywordList } from "components/Resume/MainRegion/MainRegion.style";

export interface ScriptKeywordType {
  showKeyModal: boolean;
  setShowKeyModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeKeyModal: () => void;
  keywordList: { keywordId: number; keywordContent: string }[];
  removeKeyword: (keywordId: number, keyword: string) => void;
  newKeyword: string;
  setNewKeyword: (keyword: string) => void;
  handleEnter: (e: any) => void;
}

const ScriptKeyword = (props: ScriptKeywordType) => {
  return (
    <>
      <S.ElementContainer>
        <S.Icon src="/icon/keyword_icon.png"></S.Icon>
        <S.ElementTitle>키워드</S.ElementTitle>
        <S.ElementContent>
          <S.PlusIcon
            src="/icon/plus-square.png"
            onClick={() => {
              props.setShowKeyModal(true);
            }}
          ></S.PlusIcon>
          {props.keywordList.length !== 0 ? (
            <>
              {props.keywordList.map((keyword, index) => (
                <Button
                  buttonColor={"skyBlue"}
                  fontWeight={"700"}
                  style={{ margin: "4px 6px", padding: "5px 9px" }}
                  key={index}
                  onClick={() => props.removeKeyword(keyword.keywordId, keyword.keywordContent)}
                >
                  {keyword.keywordContent} ☓
                </Button>
              ))}
            </>
          ) : (
            <></>
          )}
        </S.ElementContent>
      </S.ElementContainer>
      {props.showKeyModal && (
        <>
          <ModalWrapper
            style={{ backgroundColor: "#0000003d" }}
            onClick={() => {
              props.closeKeyModal();
            }}
          ></ModalWrapper>
          <>
            <Modal style={{ top: "-5%", left: "153%", zIndex: "2000" }}>
              <KeywordList
                style={{
                  borderTop: "30px solid #CECECE",
                  position: "absolute",
                  top: "-46px",
                  width: "180px",
                  borderRadius: "0.3rem",
                  borderTopLeftRadius: "1.3rem",
                  borderTopRightRadius: "1.3rem",
                  justifyContent: "center",
                  maxHeight: "220px",
                }}
              >
                <S.KeywordTitle>키워드 리스트</S.KeywordTitle>
                <S.KeywordInput
                  placeholder="키워드를 입력 후 ENTER"
                  value={props.newKeyword}
                  onChange={(e) => props.setNewKeyword(e.target.value)}
                  onKeyUp={props.handleEnter}
                ></S.KeywordInput>
                <S.KeywordItemList>
                  {props.keywordList.map((keyword, index) => (
                    <S.KeywordItem key={index}>{keyword.keywordContent}</S.KeywordItem>
                  ))}
                </S.KeywordItemList>
              </KeywordList>
            </Modal>
          </>
        </>
      )}
    </>
  );
};

export default ScriptKeyword;
