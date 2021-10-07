import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

import { COLORS } from "../../../components/Colors";
import InfoBar from "../../../layout/InfoBar";
import ErrorModal from "../../../components/Modal/ErrorModal";
import { customStyles } from "../../../components/modalOption";

const AuthWrapper = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin: 16px;
  }

  .auth-card-container {
    width: calc(100% - 32px);
    margin: 0px 16px;
    padding: 12px 0px;
    background-color: ${COLORS.grey_light};
    border-radius: 5px;

    p {
      margin-left: 12px;
      margin-top: 2px;
      font-size: 10px;
      font-weight: 400;
      color: ${COLORS.grey_500};
      line-height: 1.5;
    }

    span {
      font-size: 12px;
      font-weight: 700;
      margin-left: 12px;
    }
  }
`;

const Index = () => {
  const history = useHistory();

  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClickAuth = () => {
    if (isAuth) {
      setIsOpen(true);
    } else {
      history.push("/mypage/auth/detail");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/user/isAuth");
      setIsAuth(result.data.isAuth);
    };
    fetchData();
  });

  return (
    <AuthWrapper>
      <InfoBar text="학교 인증" />
      <h1>인증 방식 선택</h1>
      <button className="auth-card-container" onClick={onClickAuth}>
        <span>재학생 인증</span>
        <p>
          게시판 등 모든 커뮤니티 이용이 가능하며,
          <br />
          재학 증명 자료를 통해 인증
        </p>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="인증 에러 모달"
        ariaHideApp={false}
        style={customStyles}
      >
        <ErrorModal />
      </Modal>
    </AuthWrapper>
  );
};

export default Index;
