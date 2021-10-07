import React from "react";
import styled from "styled-components";

import tempProfile from "../assets/img/temp.png";
import { COLORS } from "../components/Colors";

const CommentWrapper = styled.div`
  padding-bottom: 4px;
  border-top: 1px solid ${COLORS.grey_400};
  .comment-profile-wrapper {
    margin: 6px 16px;

    img {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      overflow: hidden;
    }

    .comment-nick {
      font-weight: 700;
      font-size: 12px;
      margin-left: 6px;
    }
  }

  .comment-content {
    font-weight: 400;
    font-size: 11px;
    margin: 4px 16px 0px 16px;
    word-break: break-all;
  }

  .comment-date {
    font-weight: 400;
    font-size: 11px;
    color: ${COLORS.grey_500};
    margin: 4px 16px;
  }
`;

const Comment = ({ profileUrl, nick, date, content }) => {
  const profileImg = !profileUrl ? tempProfile : profileUrl;

  return (
    <CommentWrapper>
      <div className="comment-profile-wrapper arrange-center">
        <img src={profileImg} alt="유저이미지" />
        <p className="comment-nick">{nick}</p>
      </div>
      <p className="comment-content">{content}</p>
      <p className="comment-date">{date}</p>
    </CommentWrapper>
  );
};

export default Comment;
