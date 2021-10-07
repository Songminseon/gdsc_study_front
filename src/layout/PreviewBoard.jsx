import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { COLORS } from "../components/Colors";
import likeIcon from "../assets/icon/like.png";
import commentIcon from "../assets/icon/comment.png";

const BoardWrapper = styled(Link)`
  .preview-board-title {
    font-size: 12px;
    font-weight: 700;
    margin-top: 4px;
  }

  .preview-board-contents {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    margin-top: 2px;
  }

  .preview-board-status-wrapper {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .category-text {
      color: ${COLORS.grey_text};
      font-size: 10px;
      font-weight: 300;
    }

    .status-text {
      font-size: 10px;
      font-weight: 400;
      margin-left: 2px;
    }

    .status-like {
      color: ${COLORS.red};
      margin-right: 4px;
    }

    .status-comments {
      color: ${COLORS.green};
    }

    .status-icon {
      width: 8px;
      height: 8px;
    }
  }
`;

const PreviewBoard = ({ boardId, title, content, category, like, comment }) => {
  const linkUrl = `/board/detail/${boardId}`;

  return (
    <BoardWrapper to={linkUrl}>
      <h1 className="preview-board-title">{title}</h1>
      <p className="preview-board-contents">{content}</p>
      <div className="preview-board-status-wrapper arrange-center-center">
        <p className="category-text">{category}</p>
        <div className="arrange-center-center">
          <img src={likeIcon} alt="좋아요 아이콘" className="status-icon" />
          <span className="status-text status-like">{like || 0}</span>
          <img src={commentIcon} alt="댓글 아이콘" className="status-icon" />
          <span className="status-text status-comments">{comment || 0}</span>
        </div>
      </div>
    </BoardWrapper>
  );
};

PreviewBoard.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

export default PreviewBoard;
