import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import BoardNavigation from "../../../layout/BoardNaviagtion";
import BoardDetail from "../../../layout/BoardDetail";
import Comment from "../../../layout/Comment";
import WriteComment from "../../../components/Input/WriteComment";

import { formatDate } from "@Hooks/getBoardInfo";
import { COLORS } from "../../../components/Colors";
import ErrorModal from "@Component/Modal/ErrorModal";
import { customStyles } from "@Component/modalOption";

const DetailWrapper = styled.div`
  padding-bottom: 52px;

  .like-button {
    margin: 8px 16px 0px 16px;
    padding: 3px 10px;
    background-color: ${COLORS.grey_400};
    border-radius: 5px;

    span {
      font-size: 12px;
      font-weight: 700;
      color: ${COLORS.grey_600};
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

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const onClickLike = async () => {
    const boardId = match.params.id;
    const liekResult = await axios(`/api/like/1/${boardId}`);
    const { data } = liekResult.data;

    if (liekResult) {
      if (data.isLiked) {
        setIsOpen(true);
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
            setIsOpen(true);
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
    console.log(commentList);
    fetchData();
    fetchComment();
  }, []);

  return (
    <DetailWrapper>
      <BoardNavigation title="자유게시판" />
      <BoardDetail
        nick={boardDetail.nickname}
        date={formatDate(boardDetail.date)}
        title={boardDetail.title}
        content={boardDetail.content}
        like={boardDetail.like}
        comment={boardDetail.comment}
      />
      <button className="like-button" onClick={onClickLike}>
        <span>공감</span>
      </button>
      <div className="comment-wrapper">
        {commentList.map((item) => (
          <Comment
            nick={item.User.nickname}
            date={formatDate(item.created_at)}
            content={item.content}
          />
        ))}
      </div>
      <div className="write-comment-container">
        <WriteComment boardId={match.params.id} />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="이미 공감한 글"
      >
        <ErrorModal text={modalText} onClick={() => setIsOpen(false)} />
      </Modal>
    </DetailWrapper>
  );
};

export default Index;
