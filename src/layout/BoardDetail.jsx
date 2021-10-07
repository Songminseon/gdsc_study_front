import React from "react";
import styled from "styled-components";

import tempProfile from "../assets/img/temp.png";
import likeIcon from "../assets/icon/like.png";
import commentIcon from "../assets/icon/comment.png";

import { COLORS } from "../components/Colors";

const BoardWrapper = styled.div`
  .board-author-container {
    margin-left: 16px;

    .author-profile {
      width: 24px;
      height: 24px;
      border-radius: 5px;
      overflow: hidden;
    }

    .author-write-info {
      margin-left: 8px;

      .author-nick {
        font-weight: 700;
        font-size: 14px;
      }

      .author-date {
        font-weight: 400;
        font-size: 12px;
        color: ${COLORS.grey_500};
      }
    }
  }

  .board-content-container {
    width: 100%;
    margin-top: 12px;

    .board-title {
      font-weight: 700;
      margin: 0px 16px;
    }

    .board-content {
      font-size: 14px;
      margin: 12px 16px;
      word-break: break-all;
    }
  }

  .board-status-container {
    margin-left: 16px;

    .status-icon {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }

    .status-text {
      font-size: 12px;
      margin-right: 4px;
    }

    .like-text {
      color: ${COLORS.red};
    }

    .comment-text {
      color: ${COLORS.green};
    }
  }
`;

const BoardDetail = ({
  profileUrl,
  nick,
  date,
  title,
  content,
  like,
  comment,
}) => {
  const profileImg = !profileUrl ? tempProfile : profileUrl;

  return (
    <BoardWrapper>
      <div className="board-author-container arrange-center">
        <img src={profileImg} alt="작성자 이미지" className="author-profile" />
        <div className="author-write-info">
          <p className="author-nick">{nick || ""}</p>
          <p className="author-date">{date}</p>
        </div>
      </div>
      <div className="board-content-container">
        <h1 className="board-title">{title}</h1>
        <p className="board-content">{content}</p>
      </div>
      <div className="board-status-container arrange-center">
        <img src={likeIcon} alt="좋아요" className="status-icon" />
        <p className="status-text like-text">{like}</p>
        <img src={commentIcon} alt="댓글 수" className="status-icon" />
        <p className="status-text comment-text">{comment}</p>
      </div>
    </BoardWrapper>
  );
};

export default BoardDetail;
