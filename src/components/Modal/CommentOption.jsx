import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ModalWrapper = styled.div`
  span {
    margin-left: 16px;
  }

  .option-button {
    width: 100%;
    height: 40px;
  }
`;

const CommentOption = () => {
  const history = useHistory();

  const onClickMessage = () => {
    history.push(`/message/send`);
  };

  return (
    <ModalWrapper>
      <button className="option-button" onClick={onClickMessage}>
        <span>쪽지 보내기</span>
      </button>
    </ModalWrapper>
  );
};

export default CommentOption;
