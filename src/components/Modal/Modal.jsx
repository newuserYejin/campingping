import styled from "styled-components";
import { X } from "lucide-react";
import Button from "../Button/Button";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 4em;
`;

export const Modal = ({
  isOpen,
  onClose,
  onSave,
  isFooter,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>
        <div>{children}</div>
        {isFooter && (
          <ModalFooter>
            <Button onClick={onClose} size="m">
              닫기
            </Button>
            <Button onClick={onSave} size="m" variant="primary">
              저장
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
