import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

import RedButton from "../../../components/Button/RedButton";
import { COLORS } from "../../../components/Colors";
import { customStyles } from "../../../components/modalOption";
import ErrorModal from "../../../components/Modal/ErrorModal";

import MainInput from "../../../components/Input/MainInput";
import InfoBar from "../../../layout/InfoBar";

const AuthWrapper = styled.div`
  .label-text {
    margin: 24px 16px 0px 16px;
    font-size: 12px;
    color: ${COLORS.grey_600};
  }

  .input-wrapper {
    margin: 12px 16px;
  }

  .button-wrapper {
    margin: 30px 16px;
  }
`;

const Index = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onClickAuth = async () => {
    const result = await axios({
      method: "POST",
      url: "/api/user/email",
      data: {
        email: email,
      },
    });
    if (result) {
      setIsOpen(true);
    } else {
      alert(result.data.message);
    }
  };

  return (
    <AuthWrapper>
      <InfoBar text="이메일 인증" />
      <p className="label-text">이메일 입력</p>
      <div className="input-wrapper">
        <MainInput
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <div className="button-wrapper">
        <RedButton text="이메일 보내기" onClick={onClickAuth} />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="이메일 모달"
        style={customStyles}
        ariaHideApp={false}
      >
        <ErrorModal
          text="입력해주신 이메일로 인증메일이 전송되었습니다"
          onClick={() => setIsOpen(false)}
        />
      </Modal>
    </AuthWrapper>
  );
};

export default Index;
