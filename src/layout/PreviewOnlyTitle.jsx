import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { COLORS } from "../components/Colors";
import likeIcon from "../assets/icon/like.png";
import commentIcon from "../assets/icon/comment.png";

const BoardWrapper = styled(Link)`
  .board-title {
    font-size: 12px;
    font-weight: 400;
  }

  .preview-board-status-wrapper {
    height: 12px;
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

const PreviewOnlyTitle = ({ boardId, title, date, comments, like }) => {
  const linkUrl = `/board/detail/${boardId}`;

  return (
    <BoardWrapper to={linkUrl}>
      <p className="board-title">{title}</p>
      <div className="preview-board-status-wrapper arrange-center-center">
        <p className="category-text">{date}</p>
        <div className="arrange-center">
          <img src={likeIcon} alt="좋아요 아이콘" className="status-icon" />
          <span className="status-text status-like">{like}</span>
          <img src={commentIcon} alt="댓글 아이콘" className="status-icon" />
          <span className="status-text status-comments">{comments}</span>
        </div>
      </div>
    </BoardWrapper>
  );
};

PreviewOnlyTitle.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  like: PropTypes.number.isRequired,
};

export default PreviewOnlyTitle;
