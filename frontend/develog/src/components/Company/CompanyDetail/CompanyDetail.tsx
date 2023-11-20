// 기업 상세페이지_지원정보 리스트 아이템
import React, { useState, ChangeEvent } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams, useLocation } from "react-router-dom";
// 스타일
import { BtnBox } from "components/Company/CompanyArea.style";
import { ModalTitle, Line, InfoBox, Info, Input, InfoWrapper, InfoContainer } from "components/Common/Modal.style";
import { PlusImg } from "../CompanyArea.style";
import Swal from "sweetalert2";
import * as S from "./CompanyDetail.style";
// 컴포넌트
import CompanyHeader from "./CompanyHeader";
import { DateFormat_YY } from "utils/Function";
import { ToggleImg } from "components/Resume/SideRegion/SideRegion.style";
import Modal from "components/Common/Modal";
import Button from "components/Common/Button";
import CompanyApplyItem from "./CompanyApply/CompanyApplyItem";
import { getApplylist } from "apis/company";
import LoadingPage from "components/Common/Loading";
import { addApplyCompany, deleteApplyCompany } from "apis/company";

const CompanyDetail = () => {
  const location = useLocation();
  const companyName = location.state?.companyName || "";
  // console.log("기업 이름 보자보자", companyName);
  const queryClient = useQueryClient();
  const { companyId } = useParams<{ companyId: string | undefined }>();

  if (!companyId) {
    return <div>Company ID not found.</div>;
  }

  const companyIdNumber: number = parseInt(companyId, 10);
  // console.log("companyIdNumber", companyIdNumber);
  const [values, setValues] = useState({
    companyId: companyIdNumber,
    section: "",
    chapter: "",
  });

  const { data, isLoading, isError } = useQuery(["data1"], () => getApplylist(companyIdNumber));
  // console.log("--------리스트 왔엉--------?", data);

  const [toggleStates, setToggleStates] = useState<boolean[]>(data ? new Array(data.length).fill(false) : []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 인덱스 별로 토글 상태를 변경하기
  const toggleItem = (index: number) => {
    setToggleStates((prev) => {
      const newToggleStates = [...prev];
      newToggleStates[index] = !newToggleStates[index];
      return newToggleStates;
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("데이터 묶음", values);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValues({
      companyId: companyIdNumber,
      section: "",
      chapter: "",
    });
  };

  // console.log('지원정보 추가데이터 확인', values)
  const clickApplyBtn = async () => {
    const response = await addApplyCompany(values);
    // console.log(response);
    if (response.status == 200) {
      Swal.fire({
        title: "등록 완료",
        text: "지원 정보 등록 성공",
        icon: "success",
      });
      closeModal();
      queryClient.invalidateQueries("data1");
    } else {
      // console.log("지원 정보 등록 실패");
      closeModal();
    }
  };

  const clickDeleteBtn = async (historyId: number) => {
    const result = await Swal.fire({
      title: "지원정보 삭제",
      text: "지원정보를 삭제하시겠습니까?",
      icon: "warning",
    });

    if (result.isConfirmed) {
      const response = await deleteApplyCompany(historyId);
      // console.log(response);

      if (response.status === 200) {
        // console.log(`historyId=${historyId} 삭제 성공`);
        queryClient.invalidateQueries("data1");
      } else {
        Swal.fire({
          icon: "error",
          text: "지원정보 삭제 실패",
        });
      }
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
      {data && (
        <S.Container>
          <CompanyHeader />
          <S.ContentWrapepr>
            {data.length > 0 &&
              data.map((item: any, index: number) => (
                <S.CompanyItem key={item.resumeId}>
                  <S.TitleBox>
                    <S.Box>
                      <S.InfoTag>{DateFormat_YY(item.createdAt)}</S.InfoTag>
                      <S.InfoTag>{item.chapter}</S.InfoTag>
                    </S.Box>
                    <S.Title onClick={() => toggleItem(index)}>
                      [{companyName}] {item.section}_지원 정보
                    </S.Title>
                    <S.DeleteBtn onClick={() => clickDeleteBtn(item.historyId)}>삭제</S.DeleteBtn>
                    <ToggleImg
                      src={toggleStates[index] ? "/icon/close.png" : "/icon/open.png"}
                      onClick={() => toggleItem(index)}
                    />
                  </S.TitleBox>
                  {toggleStates[index] && (
                    <S.DetailWrapper>
                      <CompanyApplyItem
                        resumeId={item.resumeId}
                        interviewId={item.interviewId}
                        historyId={item.historyId}
                        companyId = {companyIdNumber}
                        companyName = {companyName}
                      />
                    </S.DetailWrapper>
                  )}
                </S.CompanyItem>
              ))}
            <S.CompanyItem>
              <PlusImg src="/icon/company_add_icon.png" onClick={openModal} />
            </S.CompanyItem>
            <form onSubmit={handleSubmit}>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalTitle>지원정보 추가</ModalTitle>
                <Line />
                <InfoContainer>
                  <InfoWrapper>
                    <InfoBox>
                      <Info>지원 직무</Info>
                      <Input name="section" value={values.section} onChange={handleChange} />
                    </InfoBox>
                    <InfoBox>
                      <Info>지원 시기</Info>
                      <Input name="chapter" value={values.chapter} onChange={handleChange} />
                    </InfoBox>
                  </InfoWrapper>
                </InfoContainer>
                <BtnBox>
                  <Button
                    buttonColor={"darkBlack"}
                    fontColor={"white"}
                    height={"27px"}
                    fontSize={"14px"}
                    borderRadius={"1rem"}
                    width="75px"
                    type="submit"
                    onClick={clickApplyBtn}
                  >
                    추가
                  </Button>
                </BtnBox>
              </Modal>
            </form>
          </S.ContentWrapepr>
        </S.Container>
      )}
    </>
  );
};
export default CompanyDetail;
