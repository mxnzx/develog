// 관심기업 리스트 조회
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/RootState";
import { useQuery, useQueryClient } from "react-query";

// 컴포넌트
import { addInterestingCompany, getLikeList, searchCompany } from "apis/company";
import Swal from "sweetalert2";
// 스타일
import * as S from "../Main/HomeCompany.style";
import * as M from "components/Common/Modal.style";
import {
  BackRegion,
  MainTitle,
  CompanyWrapper,
  CompanyCard,
  LogoImg,
  Title,
  Box,
  Text,
  Dateago,
  LogoNone,
  PlusImg,
  BtnBox,
} from "./CompanyArea.style";

// 컴포넌트
import Modal from "components/Common/Modal";
import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import LoadingPage from "components/Common/Loading";

const CompanyArea = () => {
  const queryClient = useQueryClient();
  const userId = useSelector((state: RootState) => state.user.userId);
  // getLikeList
  const { data, isLoading, isError } = useQuery(["data"], () => getLikeList(userId));
  // console.log('관심 기업 리스트', data)
  // 기업 전체 목록(검색)
  const [allCompanies, setAllCompanies] = useState<null | any[]>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false); // 검색어 박스 표시 여부
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 사용자 직접 등록시 검색 창 닫기!
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSearchBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef, setShowSearchBox]);

  const [values, setValues] = useState({
    companyInfoId: -1, // 기본값: -1
    name: "",
    concept: "",
    vision: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setSearchTerm(value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      companyInfoId: -1, // 사용자가 직접 입력할 때 InfoId를 -1로 설정
    }));
    setSearchTerm(value);
    setShowSearchBox(value.length > 0);
  };

  const handleSelectCompany = (selectedCompany: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      companyInfoId: selectedCompany ? selectedCompany.companyInfoId : -1,
      name: selectedCompany ? selectedCompany.name : "",
      concept: "",
      vision: "",
    }));
    setShowSearchBox(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("데이터 묶음", values);
  };

  const nameSlice = (name: string) => {
    const sliceName = name.slice(0, 2);
    return sliceName;
  };

  const getDaysAgo = (date: string) => {
    const currentDate = new Date();
    const updatedDate = new Date(date);
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };
  const openModal = async () => {
    setIsModalOpen(true);
    const response = await searchCompany();
    setAllCompanies(response.data);
    setShowSearchBox(true);
  };
  // console.log("기업데이터", allCompanies);
  const closeModal = () => {
    setIsModalOpen(false);
    setValues({
      companyInfoId: -1,
      name: "",
      concept: "",
      vision: "",
    });
  };

  const postNewCompany = async () => {
    try {
      if (!values.name || !values.concept || !values.vision) {
        Swal.fire({
          title: "등록 실패",
          text: "기업 정보를 모두 입력해주세요",
          icon: "error",
        });
        return;
      }

      const response = await addInterestingCompany(userId, values);

      if (response && response.status === 200) {
        closeModal();
        Swal.fire({
          title: "등록 완료",
          text: "자소서 또는 인터뷰를 이용해보세요 🙂",
          icon: "success",
        });
        queryClient.invalidateQueries("data");
      } else {
        // console.log("error");
      }
    } catch (error) {
      closeModal();
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }
  return (
    <>
      <BackRegion>
        <MainTitle>
          <S.CompanyHeader>
            <span>관심 기업 리스트 </span>
            <img src="/icon/pin.png"></img>
          </S.CompanyHeader>
        </MainTitle>
        <CompanyWrapper>
          {data &&
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((company: any) => (
              <CompanyCard key={company.companyId} onClick={() => navigate(`/companydetail/${company.companyId}`, { state: { companyName: company.name } })}>
                {(company.logoUrl === null || company.logoUrl === "로고 없음") ? (
                  <LogoNone>{nameSlice(company.name)}</LogoNone>
                ) : (
                  <LogoImg src={company.logoUrl} />
                )}
                <Title>{company.name}</Title>
                <Box>
                  <Text>최근 수정일</Text>
                  <Dateago>{getDaysAgo(company.updatedAt)}일 전</Dateago>
                </Box>
              </CompanyCard>
            ))}
          <CompanyCard>
            <PlusImg src="/icon/company_add_icon.png" onClick={openModal} />
          </CompanyCard>
          <form onSubmit={handleSubmit}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <M.ModalTitle>관심 기업 추가</M.ModalTitle>
              <M.Line />
              <M.InfoContainer>
                <M.Icon src="/icon/company.png" />
                <M.InfoWrapper>
                  <M.InfoBox>
                    <M.Info>기업명</M.Info>
                    <M.Input name="name" value={values.name} onChange={handleNameChange} />
                    {showSearchBox && searchTerm.length > 0 && (
                      <M.SerchBox ref={searchBoxRef}>
                        {/* <button onClick={closeSearchBox}>Close</button> */}
                        {allCompanies &&
                          allCompanies
                            .filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((filteredCompany) => (
                              <M.SearchName
                                key={filteredCompany.companyInfoId}
                                onClick={() => handleSelectCompany(filteredCompany)}
                              >
                                {filteredCompany.name}
                              </M.SearchName>
                            ))}
                      </M.SerchBox>
                    )}
                  </M.InfoBox>
                  <M.InfoBox>
                    <M.Info>인재상</M.Info>
                    <M.Input name="concept" value={values.concept} onChange={handleChange} />
                  </M.InfoBox>
                  <M.InfoBox>
                    <M.Info>비전</M.Info>
                    <M.Input name="vision" value={values.vision} onChange={handleChange} />
                  </M.InfoBox>
                </M.InfoWrapper>
              </M.InfoContainer>
              <BtnBox>
                <Button
                  buttonColor={"darkBlack"}
                  fontColor={"white"}
                  height={"27px"}
                  fontSize={"14px"}
                  borderRadius={"1rem"}
                  width="75px"
                  type="submit"
                  onClick={postNewCompany}
                >
                  추가
                </Button>
              </BtnBox>
            </Modal>
          </form>
        </CompanyWrapper>
      </BackRegion>
    </>
  );
};

export default CompanyArea;
