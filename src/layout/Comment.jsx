import React from "react";
import styled from "styled-components";
import axios from "axios";

import tempProfile from "../assets/img/temp.png";
import { COLORS } from "../components/Colors";

import likeIcon from "@Assets/icon/like_grey.png";
import likeRedIcon from "@Assets/icon/like.png";
import optionIcon from "@Assets/icon/option_grey.png";

const CommentWrapper = styled.div`
  padding-bottom: 4px;
  border-top: 1px solid ${COLORS.grey_400};
  .comment-profile-wrapper {
    margin: 6px 16px;
    justify-content: space-between;

    .user-profile {
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

    .comment-button-wrapper {
      background-color: ${COLORS.grey_300};
      border-radius: 5px;

      button {
        padding: 0px 8px 1px 8px;
        img {
          width: 12px;
        }
      }
    }

    .border-line {
      height: 8px;
      width: 1px;
      background-color: ${COLORS.grey_500};
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
    margin: 4px 0px 4px 16px;
  }

  .comment-like-icon {
    width: 10px;
    margin: 0px 4px;
  }

  .comment-like-num {
    font-size: 11px;
    color: ${COLORS.red};
  }
`;

const Comment = ({
  id,
  profileUrl,
  nick,
  date,
  content,
  likeNum,
  setIsOpen,
}) => {
  const profileImg = !profileUrl ? tempProfile : profileUrl;

  const onClickLike = async () => {
    const likeResult = await axios(`/api/like/2/${id}`);
    if (likeResult.data.data.isLiked) {
      alert("이미 공감한 댓글입니다.");
    } else {
      const result = await axios({
        method: "POST",
        url: "/api/like",
        data: {
          category: 2,
          refId: id,
        },
      });
      if (result) {
        window.location.reload();
      } else {
        alert("server error");
      }
    }
  };

  return (
    <CommentWrapper>
      <div className="comment-profile-wrapper arrange-center">
        <div className="arrange-center">
          <img src={profileImg} alt="유저이미지" className="user-profile" />
          <p className="comment-nick">{nick}</p>
        </div>
        <div className="comment-button-wrapper arrange-center">
          <button onClick={onClickLike}>
            <img src={likeIcon} alt="좋아요" />
          </button>
          <div className="border-line" />
          <button onClick={() => setIsOpen(true)}>
            <img src={optionIcon} alt="옵션" />
          </button>
        </div>
      </div>
      <p className="comment-content">{content}</p>
      <div className="arrange-center">
        <p className="comment-date">{date}</p>
        {likeNum > 0 && (
          <div className="arrange-center">
            <img
              className="comment-like-icon"
              src={likeRedIcon}
              alt="좋아요 갯수"
            />
            <strong className="comment-like-num">{likeNum}</strong>
          </div>
        )}
      </div>
    </CommentWrapper>
  );
};

export default Comment;
