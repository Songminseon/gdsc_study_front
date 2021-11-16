import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import BoardNavigation from "../../../layout/BoardNaviagtion";
import BoardDetail from "../../../layout/BoardDetail";
import Comment from "../../../layout/Comment";
import WriteComment from "../../../components/Input/WriteComment";
import CommentOption from "@Component/Modal/CommentOption";
import MessagePost from "@Pages/Message/Post";

import { formatDate, getCategory } from "../../../hooks/getBoardInfo";
import { COLORS } from "../../../components/Colors";
import ErrorModal from "../../../components/Modal/ErrorModal";
import { customStyles } from "../../../components/modalOption";
import likeIcon from "@Assets/icon/like_grey.png";

const DetailWrapper = styled.div`
  padding-bottom: 52px;

  .like-button {
    margin: 8px 16px 0px 16px;
    padding: 5px 10px 7px 10px;
    background-color: ${COLORS.grey_300};
    border-radius: 5px;

    span {
      font-size: 12px;
      font-weight: 700;
      color: ${COLORS.grey_600};
    }

    img {
      width: 10px;
      margin-right: 2px;
    }
  }

  .comment-wrapper {
    margin-top: 40px;
  }

  .write-comment-container {
    position: fixed;
    width: 100%;
    max-width: 500px;
    height: 52px;
    bottom: 0px;
  }
`;

const Index = ({ match }) => {
  const [commentList, setCommentList] = useState([]);
  const [boardDetail, setBoardDetail] = useState({
    nick: "",
    date: "",
    title: "",
    content: "",
    like: 0,
    comment: 0,
    categoryId: 0,
  });

  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [modalText, setModalText] = useState("");

  const [isMessageOn, setIsMessageOn] = useState(false);
  const [commentId, setCommentId] = useState(0);

  const onClickOption = (id) => {
    setIsOpenOption(true);
    setCommentId(id);
  };

  const onClickMessage = () => {
    setIsMessageOn(true);
  };

  const closeMessage = () => {
    setIsMessageOn(false);
    setIsOpenOption(false);
  };

  const onClickLike = async () => {
    const boardId = match.params.id;
    const likeResult = await axios(`/api/like/1/${boardId}`);
    const { data } = likeResult.data;

    if (likeResult) {
      if (data.isLiked) {
        setIsOpenError(true);
        setModalText("이미 공감한 글입니다.");
      } else {
        axios({
          method: "POST",
          url: "/api/like",
          data: {
            category: 1,
            refId: boardId,
          },
        })
          .then(() => {
            setIsOpenError(true);
            setModalText("공감 완료");
            setBoardDetail({
              ...boardDetail,
              like: boardDetail.like + 1,
            });
          })
          .catch(() => {
            alert("server error when like");
          });
      }
    } else {
      alert("server error when fetch");
    }
  };

  useEffect(() => {
    const boardId = match.params.id;
    const fetchData = async () => {
      const result = await axios(`/api/board/detail/${boardId}`);
      const { data } = result.data;

      setBoardDetail({
        nickname: data.User.nickname,
        date: data.created_at,
        title: data.title,
        content: data.content,
        like: data.like_num,
        comment: data.comment_num,
        categoryId: data.board_category_id,
      });
    };

    const fetchComment = async () => {
      const result = await axios(`/api/board/${boardId}/comment`);
      setCommentList(result.data.data);
    };

    fetchData();
    fetchComment();
  }, []);

  return (
    <div>
      {isMessageOn ? (
        <MessagePost commentId={commentId} closeMessage={closeMessage} />
      ) : (
        <DetailWrapper>
          <BoardNavigation
            title={getCategory(parseInt(boardDetail.categoryId))}
          />
          <BoardDetail
            nick={boardDetail.nickname}
            date={formatDate(boardDetail.date)}
            title={boardDetail.title}
            content={boardDetail.content}
            like={boardDetail.like}
            comment={boardDetail.comment}
          />
          <button className="like-button arrange-center" onClick={onClickLike}>
            <img src={likeIcon} alt="공감 아이콘" />
            <span>공감</span>
          </button>
          <div className="comment-wrapper">
            {commentList.map((item) => (
              <Comment
                id={item.id}
                nick={item.User.nickname}
                date={formatDate(item.created_at)}
                content={item.content}
                likeNum={item.like_num}
                onClickOption={() => onClickOption(item.id)}
              />
            ))}
          </div>
          <div className="write-comment-container">
            <WriteComment boardId={match.params.id} />
          </div>
          <Modal
            isOpen={isOpenError}
            onRequestClose={() => setIsOpenError(false)}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="이미 공감한 글"
          >
            <ErrorModal
              text={modalText}
              onClick={() => setIsOpenError(false)}
            />
          </Modal>
          <Modal
            isOpen={isOpenOption}
            onRequestClose={() => setIsOpenOption(false)}
            ariaHideApp={false}
            contentLabel="댓글 옵션 모달"
            style={customStyles}
          >
            <CommentOption onClick={onClickMessage} />
          </Modal>
        </DetailWrapper>
      )}
    </div>
  );
};

export default Index;
