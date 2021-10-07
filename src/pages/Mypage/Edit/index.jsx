import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

import RedButton from "../../../components/Button/RedButton";
import { COLORS } from "../../../components/Colors";

import MainInput from "../../../components/Input/MainInput";
import InfoBar from "../../../layout/InfoBar";

const EditWrapper = styled.div`
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
  const history = useHistory();

  const [test, setTest] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/user/test");
      setTest(result.data.test);
    };
    fetchData();
  });
  const [nickname, setNickname] = useState("");

  const onChangeNick = (e) => {
    setNickname(e.target.value);
  };

  const changeNick = async () => {
    const result = await axios({
      method: "PUT",
      url: "/api/user",
      data: {
        nickname: nickname,
      },
    });
    if (result) {
      history.push("/mypage");
    } else {
      alert("server error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/user");
      const { data } = result.data;

      setNickname(data.nickname);
    };

    fetchData();
  }, []);

  return (
    <EditWrapper>
      <InfoBar text="닉네임 변경" />

      <p className="label-text">{test}닉네임</p>
      <div className="input-wrapper">
        <MainInput
          type="email"
          value={nickname}
          onChange={onChangeNick}
          placeholder="닉네임을 입력해주세요."
        />
      </div>
      <div className="button-wrapper">
        <RedButton text="닉네임 설정" onClick={changeNick} />
      </div>
    </EditWrapper>
  );
};

export default Index;
