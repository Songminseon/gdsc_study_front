import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { COLORS } from "../Colors";
import pencilIcon from "../../assets/icon/pencil.svg";

const ButtonWrapper = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 20px;
  background-color: ${COLORS.grey_300};
  display: flex;
  align-items: center;

  .pencil-icon {
    width: 16px;
    height: 16px;
    margin-left: 12px;
  }

  .write-text {
    font-size: 11px;
    margin-left: 4px;
    font-weight: 700;
  }
`;

const WritePost = () => {
  const history = useHistory();

  const onClickBtn = () => {
    history.push("/board/post");
  };

  return (
    <ButtonWrapper onClick={onClickBtn}>
      <img src={pencilIcon} alt="연필 아이콘" className="pencil-icon" />
      <span className="write-text">글 쓰기</span>
    </ButtonWrapper>
  );
};

export default WritePost;
