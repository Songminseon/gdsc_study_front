import React from "react";
import styled from "styled-components";
import { COLORS } from "../Colors";

const ModalWrapper = styled.div`
  height: 110px;

  h3 {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-top: 20px;
  }

  button {
    width: calc(100% - 32px);
    height: 32px;
    border-radius: 5px;
    border: 1px solid ${COLORS.black};
    margin: 20px 16px;
  }
`;

const ErrorModal = ({ text, onClick }) => {
  return (
    <ModalWrapper>
      <h3>{text}</h3>
      <button onClick={onClick} className="arrange-center-center">
        확인
      </button>
    </ModalWrapper>
  );
};

export default ErrorModal;
