import React, { useState, useEffect, useRef } from "react";
import Button from "components/Common/Button";
import {
  addResumeDetail,
  deleteResumeDetail,
  getResumeDetail,
  getUserKeywords,
  postAddKeyword,
  saveResume,
} from "apis/resume";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import { useParams } from "react-router-dom";

// 스타일
import * as S from "./MainRegion.style";
import { useQuery } from "react-query";
import LoadingPage from "components/Common/Loading";
import Swal from "sweetalert2";

interface MainRegionProps {
  onSelectedKeywordsChange: (newSelectedKeywords: number[], newSelectedDBKeywords: number[]) => void;
}

const MainRegion: React.FC<MainRegionProps> = ({ onSelectedKeywordsChange }) => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const { resumeId } = useParams<{ resumeId: string }>();
  const resumeIds = Number(resumeId);
  // console.log("userId: ", userId, "resumeId: ", resumeIds);

  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]); // 유저키워드
  const [selectedDBKeywords, setSelectedDBKeywords] = useState<number[]>([]); // 디비키워드
  onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
  // 자소서 상세 데이터 가져오기(res)
  const {
    data: res,
    isLoading,
    isError,
    refetch,
  } = useQuery(["resumeitem", resumeIds], () => getResumeDetail(resumeIds), {
    onSuccess: (data) => {
      // 자소서 데이터 가져와서 화면에 뿌리고 각 값 변수에 할당하기
      setQuestion(data.responseResumeTotalDetails[currentQuestionIndex]?.question || "");
      setAnswer(data.responseResumeTotalDetails[currentQuestionIndex]?.answer || "");
      setNum(data.responseResumeTotalDetails[currentQuestionIndex]?.answer.length || 0);
      setWordLength(data.responseResumeTotalDetails[currentQuestionIndex]?.maxLength || 0);
      setcurrentDetailId(data.responseResumeTotalDetails[currentQuestionIndex]?.resumeDetailId || 0);
      setSelectedKeywords(
        (data.responseResumeTotalDetails[currentQuestionIndex]?.totalCategory.userCategory || []).map(
          (item: { userCategoryId: number }) => item.userCategoryId
        )
      );
      setSelectedDBKeywords(
        (data.responseResumeTotalDetails[currentQuestionIndex]?.totalCategory.category || []).map(
          (items: { categoryId: number }) => items.categoryId
        )
      );
      onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
    },
  });
  // console.log("자소서 데이터", res);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentDetailId, setcurrentDetailId] = useState<number>(0);
  const [newKeyword, setNewKeyword] = useState<string>(""); // 새로운 키워드 관리
  // 저장 상태 관리
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const [selectedModalKeywords, setSelectedModalKeywords] = useState<number[]>([]); // 선택한 유저 키워드
  const [selectedModalDBKeywords, setSelectedModalDBKeywords] = useState<number[]>([]); // 선택한 디비 키워드
  const inputRef = useRef<HTMLInputElement>(null);

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [num, setNum] = useState<number>(0);
  const [wordlength, setWordLength] = useState<number>(0);
  const [showKeyword, setShowKeyword] = useState<boolean>(false);
  const [percentage, setPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState<{
    userCategory: { userCategoryId: number; keyword: string }[];
    category: { categoryId: number; keyword: string }[];
  }>({
    userCategory: [],
    category: [],
  });

  // console.log("키워드 데이터", data);

  const fetchData = async (callback?: () => void) => {
    const response = await getUserKeywords(userId);
    setData(response.data);

    if (response.data) {
      onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
      // 유저 키워드 저장(item)
      setSelectedKeywords(
        (response.data.responseResumeTotalDetails[currentQuestionIndex]?.totalCategory.userCategory || []).map(
          (item: { userCategoryId: number }) => item.userCategoryId
        )
      );
      // 디비 키워드 저장(items)
      setSelectedDBKeywords(
        (response.data.responseResumeTotalDetails[currentQuestionIndex]?.totalCategory.category || []).map(
          (items: { categoryId: number }) => items.categoryId
        )
      );
      setQuestion(response.data.responseResumeTotalDetails[currentQuestionIndex]?.question || "");
      setAnswer(response.data.responseResumeTotalDetails[currentQuestionIndex]?.answer || "");
      setNum(response.data.responseResumeTotalDetails[currentQuestionIndex]?.answer.length || 0);
      setWordLength(response.data.responseResumeTotalDetails[currentQuestionIndex]?.maxLength || 0);
      setcurrentDetailId(response.data.responseResumeTotalDetails[currentQuestionIndex]?.resumeDetailId || 0);
      handleSave();
      if (callback) {
        callback();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, currentQuestionIndex]);

  // 유저 키워드 추가하기
  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newKeyword.trim() !== "") {
      postNewKeyword(newKeyword);
      setNewKeyword("");
    }
    onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
    // handleSave();
  };

  useEffect(() => {
    // 글자수 비교
    const calculatedPercentage = (num / wordlength) * 100;
    const limitedPercentage = Math.min(calculatedPercentage, 100);
    setPercentage(limitedPercentage);
  }, [num, wordlength]);

  const postNewKeyword = async (keyword: string) => {
    try {
      const response = await postAddKeyword(userId, keyword);
      fetchData();
      const addedKeywordId = response.data.userCategoryId;
      setSelectedKeywords((prevKeywords) => [...prevKeywords, addedKeywordId]);
      // handleSave();
    } catch (error) {
      console.error("Error adding keyword:", error);
    }
  };

  // 유저 키워드 체크
  const handleKeywordClick = (keywordId: number) => {
    const isSelected = selectedKeywords.includes(keywordId);

    setSelectedKeywords((prevKeywords) => {
      if (isSelected) {
        return prevKeywords.filter((id) => id !== keywordId);
      } else {
        return [...prevKeywords, keywordId];
      }
    });
    onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords); // 부모로 넘기기
    setSelectedModalKeywords((prevSelectedModalKeywords) => {
      if (isSelected) {
        return prevSelectedModalKeywords.filter((id) => id !== keywordId);
      } else {
        return [...prevSelectedModalKeywords, keywordId];
      }
    });
  };

  // 디비 키워드 체크
  const handleDBKeywordClick = (keywordId: number) => {
    const isSelected = selectedDBKeywords.includes(keywordId);

    setSelectedDBKeywords((prevKeywords) => {
      if (isSelected) {
        return prevKeywords.filter((id) => id !== keywordId);
      } else {
        return [...prevKeywords, keywordId];
      }
    });
    onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords); // 부모로 넘기기
    setSelectedModalDBKeywords((prevSelectedModalDBKeywords) => {
      if (isSelected) {
        return prevSelectedModalDBKeywords.filter((id) => id !== keywordId);
      } else {
        return [...prevSelectedModalDBKeywords, keywordId];
      }
    });
  };

  // console.log("resumeDetail 자소서 디테일 보자", currentDetailId);
  const handleQuestionButtonClick = (index: number) => {
    setCurrentQuestionIndex(index);
    // fetchData(() => {
    setSelectedKeywords(
      (res.responseResumeTotalDetails[index]?.totalCategory.userCategory || []).map(
        (item: { userCategoryId: number }) => item.userCategoryId
      )
    );
    setSelectedDBKeywords(
      (res.responseResumeTotalDetails[index]?.totalCategory.category || []).map(
        (items: { categoryId: number }) => items.categoryId
      )
    );
    setQuestion(res.responseResumeTotalDetails[index]?.question || "");
    setAnswer(res.responseResumeTotalDetails[index]?.answer || "");
    setNum(res.responseResumeTotalDetails[index]?.answer.length || 0);
    setWordLength(res.responseResumeTotalDetails[index]?.maxLength || 0);
    setcurrentDetailId(res.responseResumeTotalDetails[index]?.resumeDetailId || 0);
    onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
    // });
    handleSave();
  };
  // Resume Detail 삭제(문항 삭제)
  const hanleDeleteResumeDetail = async () => {
    // console.log("삭제하려는 detailID: ", currentDetailId);
    const response = await deleteResumeDetail(currentDetailId);
    if (response.status === 200) {
      refetch();
    }
  };
  const openKeyword = () => {
    setShowKeyword(true);
  };
  const closeKeywordModal = () => {
    setShowKeyword(false);
    handleSave();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeKeywordModal();
    }
  };
  // console.log("유저 키워드 선택--", selectedKeywords);
  // console.log("디비 키워드 선택---", selectedDBKeywords);
  // console.log('지금 자소서 항목 번호------>', currentQuestionIndex+1)

  const handlePlusResume = async () => {
    // console.log("------항목추가------");
    // console.log(resumeIds, res.totalQuestionSize + 1);
    const response = await addResumeDetail(resumeIds, res.totalQuestionSize + 1);
    if (response.status === 200) {
      refetch(); // 리렌더링
    }
    handleSave();
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleSave = () => {
    onSelectedKeywordsChange(selectedKeywords, selectedDBKeywords);
    const details = {
      resumeDetailId: currentDetailId,
      question: question,
      answer: answer,
      questionNum: currentQuestionIndex + 1,
      maxLength: wordlength,
      userCategoryList: selectedKeywords,
      categoryList: selectedDBKeywords,
    };
    // console.log("저장할 때 정보", details);
    saveResume(userId, resumeIds, details)
      .then((response) => {
        if (response.status === 200) {
          setSaveStatus("저장 완료");
          refetch();
          // 1초만
          setTimeout(() => {
            setSaveStatus(null);
          }, 1000);
        }
      })
      .catch((error) => {
        // console.error('자소서 저장 중 오류 발생:', error);
        setSaveStatus("저장 실패");
      });
  };

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
  // console.log("지원정보", data);
  return (
    <S.Container>
      <S.BtnBox>
        {Array.from({ length: res.totalQuestionSize }, (_, index) => (
          <S.NumBtn selected={index === currentQuestionIndex} onClick={() => handleQuestionButtonClick(index)}>
            {index + 1}
          </S.NumBtn>
        ))}
        <S.NumBtn onClick={() => handlePlusResume()}>+</S.NumBtn>
      </S.BtnBox>
      <S.TieBox>
        <S.Box>
          <S.Text>자소서 항목 분류</S.Text>
          <S.Icon src="/icon/plusicon.png" onClick={openKeyword} />
        </S.Box>
        <div>
          <Button
            buttonColor={"darkBlack"}
            fontColor={"white"}
            height={"25px"}
            fontSize={"14px"}
            borderRadius={"0.625rem"}
            width="80px"
            // onClick={handleSave}
          >
            {saveStatus || "저장"}
          </Button>
          <button
            onClick={hanleDeleteResumeDetail}
            style={{
              backgroundColor: "rgba(225, 104, 77, 1)",
              color: "white",
              height: "23px",
              fontSize: "14px",
              borderRadius: "50%",
              width: "23px",
              border: "0",
              marginLeft: "7px",
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            ☓
            {isHovered && (
              <div
                style={{
                  position: "fixed",
                  top: "13%",
                  left: "89%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(229, 229, 229, 0.86)",
                  color: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  width: "78px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "1s",
                }}
              >
                <p>문항 삭제</p>
              </div>
            )}
          </button>
        </div>
      </S.TieBox>
      {showKeyword && (
        // 모달형식으로 키워드 리스트 띄우기 => 위치는 다시 조정해야함
        <S.ModalWrapper onClick={handleModalClick}>
          <S.Modal>
            <S.KeywordList>
              <S.SText>🏷️ 키워드 선택 또는 추가 </S.SText>
              <S.PlusWord
                ref={inputRef}
                placeholder="키워드 생성"
                height="20px"
                value={newKeyword}
                onChange={(e) => {
                  setNewKeyword(e.target.value);
                }}
                onKeyUp={handleEnterKeyPress} // 엔터로 이벤트 인식하기!
              />
              <br />
              <S.Wrapper>
                {/* 디비 키워드 */}
                {data.category.length > 0 &&
                  data.category.map((category) => (
                    <S.PlainBox
                      key={category.categoryId}
                      onClick={() => {
                        handleDBKeywordClick(category.categoryId);
                        // handleSave();
                      }}
                    >
                      <S.Icon src="/icon/list.png" />
                      <S.KeywordItem
                        className={selectedModalDBKeywords.includes(category.categoryId) ? "selected" : ""}
                      >
                        {category.keyword}
                        {selectedModalDBKeywords.includes(category.categoryId) && " ✔️"}
                      </S.KeywordItem>
                    </S.PlainBox>
                  ))}
                {/* 유저 키워드 */}
                {data.userCategory.length > 0 &&
                  data.userCategory.map((userCategory) => (
                    <S.PlainBox
                      key={userCategory.userCategoryId}
                      onClick={() => {
                        handleKeywordClick(userCategory.userCategoryId);
                        // handleSave();
                      }}
                    >
                      <S.Icon src="/icon/list.png" />
                      <S.KeywordItem
                        className={selectedModalKeywords.includes(userCategory.userCategoryId) ? "selected" : ""}
                      >
                        {userCategory.keyword}
                        {selectedModalKeywords.includes(userCategory.userCategoryId) && " ✔️"}
                      </S.KeywordItem>
                    </S.PlainBox>
                  ))}
              </S.Wrapper>
            </S.KeywordList>
          </S.Modal>
        </S.ModalWrapper>
      )}
      <S.SelectedKeywords>
        {/* 디비 키워드 보여주기 */}
        {selectedDBKeywords &&
          selectedDBKeywords.map((keywordId) => (
            <S.KeywordBtn
              key={keywordId}
              onClick={() => {
                handleDBKeywordClick(keywordId);
              }}
            >
              {data.category.find((category) => category.categoryId === keywordId)?.keyword} ☓
            </S.KeywordBtn>
          ))}
        {/* 유저 키워드 보여주기 */}
        {selectedKeywords &&
          selectedKeywords.map((keywordId) => (
            <S.KeywordBtn
              key={keywordId}
              onClick={() => {
                handleKeywordClick(keywordId);
              }}
            >
              {data.userCategory.find((userCategory) => userCategory.userCategoryId === keywordId)?.keyword} ☓
            </S.KeywordBtn>
          ))}
      </S.SelectedKeywords>
      <S.ContentWrapper>
        <S.TitleBox>
          <S.Text>자소서 문항</S.Text>
        </S.TitleBox>
        <S.Content
          placeholder="자소서 문항을 입력하세요."
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onBlur={(e) => {
            setQuestion(e.target.value);
            handleSave();
          }}
          value={question}
        ></S.Content>
        <S.Content
          onChange={(e) => {
            setAnswer(e.target.value);
            setNum(e.target.value.length);
            // handleSave();
          }}
          onBlur={(e) => {
            setAnswer(e.target.value);
            handleSave();
          }}
          value={answer}
          height="60%"
          fontSize="16px"
        ></S.Content>
        <S.PercentBox>
          <div
            style={{
              width: "100%",
              height: "15px",
              backgroundColor: "#ffffff9e",
              boxShadow: "1px 1px 1px 0px rgb#d8d8d818",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: "99%",
                backgroundColor: "#f68c72",
                borderRadius: "5px",
                boxShadow: "1px 2px 2px 0px rgba(207, 205, 205, 0.1)",
                transition: "0.5s",
              }}
            />
          </div>
        </S.PercentBox>
        <S.CountBox>
          <S.Text>{num} / </S.Text>
          <S.MaxNum
            placeholder="글자수"
            value={wordlength}
            onBlur={(e) => {
              const value = e.target.value;
              const parsedValue = value !== "" ? parseInt(value, 10) : 0;
              setWordLength(parsedValue);
              handleSave();
            }}
            onChange={(e) => {
              const value = e.target.value;
              const parsedValue = value !== "" ? parseInt(value, 10) : 0; // 빈 문자열일 경우 0으로 처리
              setWordLength(parsedValue);
            }}
          ></S.MaxNum>
          <S.Text> 자</S.Text>
        </S.CountBox>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default MainRegion;
