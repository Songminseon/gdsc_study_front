import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  span {
    margin-left: 16px;
  }

  .option-button {
    width: 100%;
    height: 40px;
  }
`;

const CommentOption = ({ onClick }) => {
  return (
    <ModalWrapper>
      <button className="option-button" onClick={onClick}>
        <span>쪽지 보내기</span>
      </button>
    </ModalWrapper>
  );
};

export default CommentOption;
