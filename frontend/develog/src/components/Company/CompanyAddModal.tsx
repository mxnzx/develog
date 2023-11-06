import React, { useState } from "react";
import Modal from "components/Common/Modal";

const CompanyAddModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // refetchMyPageData();
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
        }}
      ></Modal>
    </>
  );
};

export default CompanyAddModal;
