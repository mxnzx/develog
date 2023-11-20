import React, { useState, useEffect } from "react";

// 스타일
import { OutWrapper, Title, Text, Content, Wrapper, Br, WordBox, KeyWord, ToggleImg, Text1 } from "./SideRegion.style";
import { getPreResume } from "apis/portfolio";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import { useParams } from "react-router-dom";
import LoadingPage from "components/Common/Loading";
import { Container } from "../MainRegion/MainRegion.style";

interface PreResumeProps {
  usercategory: number[];
  category: number[];
}

const PreResume: React.FC<PreResumeProps> = ({ usercategory, category }) => {
  const userId = useSelector((state: RootState) => state.user.userId);
  // const { resumeId } = useParams<{ resumeId: string }>();
  // const resumeIds = Number(resumeId);
  const [categoryList, setCategoryList] = useState([]);
  // console.log("🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡🧡", category);
  // 동적으로 쿼리 키를 구성
  const queryKey = ["preresume", userId, usercategory, category];

  // getPreResume
  const { data, isLoading, isError, refetch } = useQuery(queryKey, () => getPreResume(userId, usercategory, category));
  // console.log("키워드와 일치하는 자소서", data);
  useEffect(() => {
    // usercategory가 변경될 때마다 refetch 실행
    refetch();
  }, [usercategory, category]);

  if (isLoading) {
    return (
      <Container style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center" }}>
        <LoadingPage />
      </Container>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      {/* 키워드는 리덕스에서 받아오기 or 받아온 키워드로 프론트에서 필터걸기 */}
      <Title>✏ 유사한 키워드 자소서</Title>
      {data && (
        <>
          {data.isQuestion === "F" ? (
            <Text>관련된 자소서 문항이 없습니다.</Text>
          ) : (
            <OutWrapper>
              {data.resumeDetails.map((item: any) => (
                <Wrapper key={item.resumeDetailId}>
                  <hr style={{ opacity: "90%", height: "1px", backgroundColor: "gray", marginBottom: "10px" }} />
                  <Text1>{item.question}</Text1>
                  <WordBox>
                    {item.totalCategory.userCategory.map((keyword: any) => (
                      <KeyWord key={keyword.userCategoryId}>{keyword.keyword}</KeyWord>
                    ))}
                    {item.totalCategory.category.map((keyword1: any) => (
                      <KeyWord key={keyword1.categoryId}>{keyword1.keyword}</KeyWord>
                    ))}
                  </WordBox>
                  <Br />
                  <Content style={{ marginTop: "00px", wordSpacing: "2px", lineHeight: "22px", marginBottom:"20px"}}>{item.answer}</Content>
                </Wrapper>
              ))}
            </OutWrapper>
          )}
        </>
      )}
    </>
  );
};

export default PreResume;
