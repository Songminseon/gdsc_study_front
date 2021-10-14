import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import arrowIcon from "@Assets/vector/arrow.svg";
import optionIcon from "@Assets/icon/option.png";
import sendIcon from "@Assets/icon/send.png";
import { optionStyles } from "@Component/modalOption";
import { COLORS } from "@Component/Colors";

const NavigationWrapper = styled.div`
  width: 100%;
  height: 48px;
  background: white;
  justify-content: space-between;

  button {
    width: 16px;
    height: 16px;
    padding: 16px;
  }

  .back-button {
    transform: rotate(180deg);
  }

  .special-button {
    margin-right: 16px;

    button {
      width: 16px;
      height: 16px;
      padding: 0px;
      margin-left: 16px;

      img {
        width: 16px;
      }
    }
  }
`;

const OptionWrapper = styled.div`
  width: 100px;
  border: 0.5px solid ${COLORS.grey_200};

  button {
    width: 100%;
    height: 30px;
    padding: 10px;
  }
`;

const MessageBar = ({ onClickSend, toId }) => {
  const history = useHistory();

  const [isOpenOption, setIsOpenOption] = useState(false);

  const onClickBack = () => {
    history.goBack();
  };

  const onClickOption = () => {
    setIsOpenOption(true);
  };

  const onClickReload = () => {
    window.location.reload();
  };

  const onClickDelete = async () => {
    await axios({
      method: "DELETE",
      url: "/api/message",
      data: {
        to_id: toId,
      },
    })
      .then(() => {
        history.push("/message");
      })
      .catch(() => {
        alert("server error");
      });
  };

  const onClickBan = () => {
    alert("개발중");
  };

  const onClickReport = () => {
    alert("개발중");
  };

  return (
    <NavigationWrapper className="arrange-center">
      <div className="arrange-center">
        <button className="back-button" onClick={onClickBack}>
          <img src={arrowIcon} alt="뒤로가기" />
        </button>
        <p>익명</p>
      </div>
      <div className="arrange-center special-button">
        <button onClick={onClickSend}>
          <img src={sendIcon} alt="쪽지 보내기" />
        </button>
        <button onClick={onClickOption}>
          <img src={optionIcon} alt="옵션" />
        </button>
      </div>
      <Modal
        isOpen={isOpenOption}
        onRequestClose={() => setIsOpenOption(false)}
        style={optionStyles}
        ariaHideApp={false}
        contentLabel="메세지 옵션"
      >
        <OptionWrapper>
          <button onClick={onClickReload}>새로고침</button>
          <button onClick={onClickDelete}>전체 삭제</button>
          <button onClick={onClickBan}>차단</button>
          <button onClick={onClickReport}>신고</button>
        </OptionWrapper>
      </Modal>
    </NavigationWrapper>
  );
};

export default MessageBar;
