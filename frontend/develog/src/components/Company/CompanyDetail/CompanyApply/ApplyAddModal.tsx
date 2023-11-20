// 지원정보추가 모달
// 관심기업 리스트 조회
import React, { useState, ChangeEvent } from "react";
// import * as S from "../Main/HomeCompany.style";

// 스타일
import { BtnBox } from "components/Company/CompanyArea.style";
import {
  ModalTitle,
  Line,
  InfoBox,
  Info,
  Icon,
  Input,
  InfoWrapper,
  InfoContainer,
} from "components/Common/Modal.style";

// 컴포넌트
import Modal from "components/Common/Modal";
import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";

const ApplyAddModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [values, setValues] = useState({
    직무: "",
    시기: "",
  });

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
      직무: "",
      시기: "",
    });
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalTitle>관심 기업 추가</ModalTitle>
          <Line />
          <InfoContainer>
            <Icon src="/icon/company.png" />
            <InfoWrapper>
              <InfoBox>
                <Info>지원 직무</Info>
                <Input name="직무" value={values.직무} onChange={handleChange} />
              </InfoBox>
              <InfoBox>
                <Info>지원 시기</Info>
                <Input name="시기" value={values.시기} onChange={handleChange} />
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
            >
              추가
            </Button>
          </BtnBox>
        </Modal>
      </form>
    </>
  );
};

export default ApplyAddModal;
