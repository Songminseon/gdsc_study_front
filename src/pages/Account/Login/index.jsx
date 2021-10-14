import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import { COLORS } from "../../../components/Colors";
import MainInput from "../../../components/Input/MainInput";
import ErrorModal from "../../../components/Modal/ErrorModal";

import logo from "../../../assets/logo/logo.png";
import RedButton from "../../../components/Button/RedButton";
import { customStyles } from "../../../components/modalOption";

const LoginWrapper = styled.div`
  padding-top: 32px;

  p {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .logo-area {
    display: block;
    width: 56px;
    height: 56px;
    margin: 0px auto 0px auto;
  }

  .main-text {
    margin-top: 16px;
    color: ${COLORS.grey_600};
    font-weight: 400;
    font-size: 12px;
  }

  .sub-text {
    color: ${COLORS.red};
    font-weight: 700;
    margin-top: 8px;
    margin-bottom: 32px;
    font-size: 18px;
  }

  .input-wrapper {
    width: calc(100% - 64px);
    height: 32px;
    margin: 6px 32px 0px 32px;
  }

  .signup-link {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 16px;
  }

  .button-wrapper {
    margin: 8px 32px 0px 32px;
  }
`;

const Index = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [isFocus, setIsFocus] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onChangeUserId = (e) => {
    setUserId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFocus = () => {
    if (isFocus) {
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  };

  const onClickLogin = async () => {
    const result = await axios({
      method: "POST",
      url: "/api/user/login",
      data: {
        user_id: userId,
        password: password,
      },
    });
    if (result) {
      if (result.data.success) {
        window.location.replace("/");
      } else {
        setIsOpen(true);
        setErrorText(result.data.message);
      }
    } else {
      setIsOpen(true);
      setErrorText("invalid");
    }
  };

  return (
    <LoginWrapper>
      {!isFocus && (
        <div>
          <img src={logo} alt="로고" className="logo-area" />
          <p className="main-text">GDSC를 즐겁고 편하게</p>
          <p className="sub-text">GDSC타임</p>
        </div>
      )}
      <div className="input-wrapper">
        <MainInput
          value={userId}
          type="text"
          onChange={onChangeUserId}
          handleFocus={handleFocus}
          placeholder="아이디"
        />
      </div>
      <div className="input-wrapper">
        <MainInput
          value={password}
          type="password"
          onChange={onChangePassword}
          handleFocus={handleFocus}
          placeholder="비밀번호"
        />
      </div>
      <div className="button-wrapper">
        <RedButton text="GDSC 로그인" onClick={onClickLogin} />
      </div>
      {!isFocus && (
        <Link to="/signup" className="signup-link">
          회원가입
        </Link>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        contentLabel="로그인 실패"
        style={customStyles}
      >
        <ErrorModal text={errorText} onClick={() => setIsOpen(false)} />
      </Modal>
    </LoginWrapper>
  );
};

export default Index;
