import React from "react";
import styled from "styled-components";
import { COLORS } from "../Colors";

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 52px;

  .input-area {
    width: 100%;
    margin: 8px;
    border-radius: 10px;
    background-color: ${COLORS.grey_300};
  }

  input {
    font-size: 14px;
    height: 36px;
  }

  input::placeholder {
    font-size: inherit;
    color: ${COLORS.grey_600};
    font-weight: 400;
  }
`;

const WriteComment = ({ comment, onChangeComment, isSecret }) => {
  return (
    <CommentInputWrapper className="arrange-center">
      <div className="input-area">
        <input type="checkbox" />
        <input
          value={comment}
          onChange={onChangeComment}
          placeholder="댓글을 입력해주세요"
        />
      </div>
    </CommentInputWrapper>
  );
};

export default WriteComment;
