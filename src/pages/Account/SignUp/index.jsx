import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axios from "axios";
import Modal from "react-modal";

import InfoBar from "../../../layout/InfoBar";
import MainInput from "../../../components/Input/MainInput";
import RedButton from "../../../components/Button/RedButton";
import Error from "../../../components/Error";

import ErrorModal from "../../../components/Modal/ErrorModal";
import { customStyles } from "../../../components/modalOption";

const SignWrapper = styled.div`
  padding-top: 48px;

  p {
    margin: 4px 16px 0px 16px;
  }

  .top-navigation {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
  }

  .input-wrapper {
    margin: 8px 16px 0px 16px;
  }

  .label-text {
    font-size: 10px;
    font-weight: 400;
    margin-left: 16px;
    margin-top: 24px;
  }

  .button-wrapper {
    width: calc(100% - 32px);
    margin: 24px 16px 0px 16px;
  }
`;

const Index = () => {
  const history = useHistory();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [major, setMajor] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [errorNum, setErrorNum] = useState(0);
  const [errorText, setErrorText] = useState("");

  const onChangeUserId = (e) => {
    const { value, name } = e.target;
    if (value.length < 7 || value.length > 15) {
      setErrorNum(3);
    } else {
      setErrorNum(0);
    }
    setUserId(value);
  };

  const onChangePassword = (e) => {
    const { value } = e.target;

    const patternSpecial = /[~!@#$%^&*()_+|<>?:{}]/;
    const patternEng = /[a-zA-Z]/;
    const patternNum = /[0-9]/;

    if (
      !patternSpecial.test(value) ||
      !patternNum.test(value) ||
      !patternEng.test(value)
    ) {
      setErrorNum(1);
    } else {
      setErrorNum(0);
    }
    setPassword(value);
  };

  const onChangeRePassword = (e) => {
    const { value } = e.target;
    if (value !== password) {
      setErrorNum(2);
    } else {
      setErrorNum(0);
    }
    setRePassword(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeNick = (e) => {
    setNick(e.target.value);
  };

  const onChangeMajor = (e) => {
    setMajor(e.target.value);
  };

  const onClickSignup = async () => {
    if (errorNum !== 0) {
      alert("회원정보를 제대로 입력해주세요.");
    } else {
      const result = await axios({
        method: "POST",
        url: "/api/user",
        data: {
          user_id: userId,
          password: password,
          name: name,
          email: email,
          nickname: nick,
          major: major,
        },
      });
      if (result) {
        if (result.data.success) {
          history.push("/login");
        } else {
          setIsOpen(true);
          setErrorText(result.data.message);
        }
      } else {
        setErrorText("bad reqeust");
        setIsOpen(true);
      }
    }
  };

  return (
    <SignWrapper>
      <div className="top-navigation">
        <InfoBar text="회원가입" />
      </div>
      <p className="label-text">아이디</p>
      <div className="input-wrapper">
        <MainInput
          value={userId}
          type="text"
          onChange={onChangeUserId}
          placeholder="아이디를 입력해주세요"
        />
      </div>
      {errorNum === 3 && <Error errorNum={3} />}
      <p className="label-text">비밀번호</p>
      <div className="input-wrapper">
        <MainInput
          value={password}
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      {errorNum === 1 && <Error errorNum={1} />}
      <p className="label-text">비밀번호 확인</p>
      <div className="input-wrapper">
        <MainInput
          value={rePassword}
          type="password"
          onChange={onChangeRePassword}
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
      </div>
      {errorNum === 2 && <Error errorNum={2} />}
      <p className="label-text">이름</p>
      <div className="input-wrapper">
        <MainInput
          value={name}
          type="text"
          onChange={onChangeName}
          placeholder="이름을 입력해주세요"
        />
      </div>
      <p className="label-text">이메일</p>
      <div className="input-wrapper">
        <MainInput
          value={email}
          type="email"
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <p className="label-text">닉네임</p>
      <div className="input-wrapper">
        <MainInput
          value={nick}
          type="text"
          onChange={onChangeNick}
          placeholder="닉네임을 입력해주세요"
        />
      </div>
      <p className="label-text">전공</p>
      <div className="input-wrapper">
        <MainInput
          value={major}
          type="text"
          onChange={onChangeMajor}
          placeholder="전공을 입력해주세요"
        />
      </div>
      <div className="button-wrapper">
        <RedButton text="회원가입" onClick={onClickSignup} />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="회원가입 실패 알림"
        ariaHideApp={false}
        style={customStyles}
      >
        <ErrorModal text={errorText} onClick={() => setIsOpen(false)} />
      </Modal>
    </SignWrapper>
  );
};

export default Index;
