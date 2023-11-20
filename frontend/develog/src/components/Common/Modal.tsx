import React from "react";

// 스타일
import { ModalWrapper, ModalContent, Box, CloseIcon } from "./Modal.style";

// 컴포넌트
import Button from "./Button";

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = (props: NameModalProps) => {
  if (props.children) {
    // children 프로퍼티가 존재하는 경우
    return (
      <ModalWrapper isOpen={props.isOpen}>
        <ModalContent>
          <CloseIcon src="/icon/x.png" onClick={() => props.onClose()} />
          {props.children}
        </ModalContent>
      </ModalWrapper>
    );
  } else {
    // children 프로퍼티가 없는 경우
    return (
      <ModalWrapper isOpen={props.isOpen}>
        <ModalContent>
          <CloseIcon src="/icon/x.png" onClick={() => props.onClose()} />
          {/* 다른 처리를 추가할 수 있음 */}
        </ModalContent>
      </ModalWrapper>
    );
  }
};

export default Modal;
