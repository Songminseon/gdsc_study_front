import React from "react";
import styled from "styled-components";
import { COLORS } from "../Colors";

const ModalWrapper = styled.div`
  width: 100%;
  padding: 16px 0px;

  p {
    font-size: 12px;
    font-weight: 400;
    margin: 0px 16px;
    line-height: 1.5;
  }

  .button-wrapper {
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      font-size: 12px;
      color: ${COLORS.red};
      font-weight: 400;
      padding: 0px 12px;
    }
  }
`;

const ConfirmModal = ({
  head,
  leftBtn,
  leftBtnFunc,
  rightBtn,
  rightBtnFunc,
}) => {
  return (
    <ModalWrapper>
      <p>{head}</p>
      <div className="button-wrapper">
        <button onClick={leftBtnFunc}>{leftBtn}</button>
        <button onClick={rightBtnFunc}>{rightBtn}</button>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
