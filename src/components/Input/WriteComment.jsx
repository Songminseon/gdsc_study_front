import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import ErrorModal from "@Component/Modal/ErrorModal";
import { COLORS } from "../Colors";
import checkIcon from "../../assets/vector/checked.svg";
import sendIcon from "../../assets/icon/send.png";
import { customStyles } from "@Component/modalOption";

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 52px;

  .input-area {
    position: relative;
    width: 100%;
    margin: 0px 8px;
    border-radius: 10px;
    background-color: ${COLORS.grey_300};
  }

  .send-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  input[type="text"] {
    display: inline-block;
    width: calc(100% - 100px);
    margin-left: 12px;
    font-size: 14px;
    height: 36px;
  }

  input[type="checkbox"] {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    border: 1px solid ${COLORS.grey_500};
    border-radius: 10px;
    margin-left: 10px;
  }

  input[type="checkbox"]:checked {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    background: url(${checkIcon});
  }

  label {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 700;
    color: ${(props) => (props.isSecret ? COLORS.red : COLORS.grey_500)};
  }

  input::placeholder {
    font-size: inherit;
    color: ${COLORS.grey_600};
    font-weight: 400;
  }
`;

const WriteComment = ({ boardId }) => {
  const [comment, setComment] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onClickSend = async () => {
    if (!comment) {
      setIsOpen(true);
    } else {
      const result = await axios({
        method: "POST",
        url: "/api/board/comment",
        data: {
          board_id: boardId,
          content: comment,
          is_secret: isSecret,
        },
      });
      if (result) {
        window.location.reload();
      } else {
        alert("server error");
      }
    }
  };

  const onChangeCheck = (e) => {
    setIsSecret(e.target.checked);
  };

  return (
    <CommentInputWrapper className="arrange-center" isSecret={isSecret}>
      <div className="input-area arrange-center">
        <input
          type="checkbox"
          name="is_secret"
          id="is_secret"
          value={isSecret}
          onChange={onChangeCheck}
        />
        <label htmlFor="is_secret">익명</label>
        <input
          type="text"
          value={comment}
          onChange={onChangeComment}
          placeholder="댓글을 입력해주세요"
          spellCheck={false}
        />
        <button className="send-button" onClick={onClickSend}>
          <img src={sendIcon} alt="전송 아이콘" />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        contentLabel="댓글 입력 오류"
        style={customStyles}
      >
        <ErrorModal
          text="빈칸으로 입력하지 말아주세요"
          onClick={() => setIsOpen(false)}
        />
      </Modal>
    </CommentInputWrapper>
  );
};

export default WriteComment;
