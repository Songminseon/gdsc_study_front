import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import xVector from "@Assets/vector/xVector.svg";
import { COLORS } from "@Component/Colors";
import ConfirmModal from "@Component/Modal/ConfirmModal";
import { customStyles } from "@Component/modalOption";
import ErrorModal from "@Component/Modal/ErrorModal";

const PostWrapper = styled.div`
  textarea::placeholder {
    color: ${COLORS.grey_500};
  }

  .top-navigation {
    height: 48px;
  }

  .close-icon {
    width: 14px;
    height: 14px;
    margin-left: 16px;
    margin-right: 20px;
  }

  .confirm-button {
    color: white;
    background-color: ${COLORS.red};
    padding: 5px 9px;
    font-size: 12px;
    line-height: 12px;
    border-radius: 20px;
    margin-left: auto;
    margin-right: 16px;
  }

  .post-content {
    width: calc(100% - 32px);
    margin: 64px 16px 16px 16px;
    height: auto;
    overflow-x: hidden;
    min-height: 150px;
    max-height: 500px;
    line-height: 1.25;
  }
`;

const Index = ({ commentId, closeMessage }) => {
  const history = useHistory();

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [content, setContent] = useState("");

  const onClickErrorConfirm = () => {
    setIsOpenError(false);
    setIsOpenConfirm(false);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const autoGrow = (e) => {
    e.target.style.height = "21px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const onClickExit = () => {
    history.goBack();
  };

  const sendMessage = async () => {
    if (!content) {
      setIsOpenError(true);
    } else {
      await axios({
        method: "POST",
        url: "/api/message",
        data: {
          content: content,
          comment_id: commentId,
        },
      })
        .then((result) => {
          if (result.data.success) {
            closeMessage();
          } else {
            alert("??? ???????????? ?????? ??? ????????????.");
            closeMessage();
          }
        })
        .catch(() => alert("server error"));
    }
  };

  return (
    <PostWrapper>
      <div className="top-navigation arrange-center">
        <button onClick={onClickExit}>
          <img src={xVector} alt="????????? ??????" className="close-icon" />
        </button>
        <p>?????? ?????????</p>
        <button
          className="confirm-button arrange-center-center"
          onClick={() => setIsOpenConfirm(true)}
        >
          ??????
        </button>
      </div>
      <textarea
        className="post-content"
        value={content}
        onChange={onChangeContent}
        placeholder="????????? ???????????????."
        spellCheck={false}
        onInput={autoGrow}
        wrap="physical"
      />
      <Modal
        isOpen={isOpenConfirm}
        onRequestClose={() => setIsOpenConfirm(false)}
        ariaHideApp={false}
        contentLabel="?????? ??????"
        style={customStyles}
      >
        <ConfirmModal
          head="??????????????? ???????????? ????????? ???????????????. ????????? ??????????????????????"
          leftBtn="??????"
          leftBtnFunc={() => setIsOpenConfirm(false)}
          rightBtn="??????"
          rightBtnFunc={sendMessage}
        />
      </Modal>
      <Modal
        isOpen={isOpenError}
        onRequestClose={() => setIsOpenError(false)}
        ariaHideApp={false}
        contentLabel="?????? ??????"
        style={customStyles}
      >
        <ErrorModal text="????????? ??????????????????." onClick={onClickErrorConfirm} />
      </Modal>
    </PostWrapper>
  );
};

export default Index;
