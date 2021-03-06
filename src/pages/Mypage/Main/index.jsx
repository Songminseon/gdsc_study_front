import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import TopNavigation from "../../../layout/TopNavigation";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

import temp from "../../../assets/img/temp.png";
import { COLORS } from "../../../components/Colors";
import { customStyles } from "../../../components/modalOption";

const MypageWrapper = styled.div`
  padding-top: 48px;

  .profile-wrapper {
    margin: 0px 8px;

    .profile-img-area {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      margin: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .profile-text-area {
      p {
        font-size: 12px;
        font-weight: 400;
        color: ${COLORS.grey_500};
        margin-top: 3px;
      }

      strong {
        font-size: 12px;
        font-weight: 700;
      }
    }
  }

  .mypage-content-container {
    margin: 8px 8px 0px 8px;

    h2 {
      margin: 16px 12px 0px 12px;
      font-weight: 700;
    }

    button,
    a {
      display: inline-block;
      margin: 16px 12px 0px 12px;
      width: calc(100% - 24px);
      font-size: 14px;
      font-weight: 400;
    }

    .last-child {
      margin-bottom: 16px;
    }
  }
`;

const Index = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    nickname: "",
    name: "",
    major: "",
  });

  const logout = async () => {
    const result = await axios({
      method: "GET",
      url: "/api/user/logout",
    });
    if (!result.data.success) {
      window.location.replace("/login");
    } else {
      alert("Server Error");
    }
  };

  const onClickLeave = async () => {
    const result = await axios({
      method: "DELETE",
      url: "/api/user",
    });
    if (result) {
      history.push("/");
    } else {
      alert("Server Error");
    }
  };

  const handleModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "GET",
        url: "/api/user",
      });
      const { data } = result.data;

      setUserInfo({
        id: data.user_id,
        name: data.name,
        nickname: data.nickname,
        major: data.major,
      });
    };

    fetchData();
  }, []);

  return (
    <MypageWrapper>
      <div>
        <div className="top-navigation">
          <TopNavigation title="??? ??????" />
        </div>
        <div className="profile-wrapper board-wrapper arrange-center">
          <div className="profile-img-area">
            <img src={temp} alt="?????? ?????????" />
          </div>
          <div className="profile-text-area">
            <strong>{userInfo.id}</strong>
            <p>
              {userInfo.name}/ {userInfo.nickname}
            </p>
            <p>{userInfo.major}</p>
          </div>
        </div>
        <div className="mypage-content-container board-wrapper">
          <h2>??????</h2>
          <Link to="/mypage/auth">?????? ??????</Link>
          <Link to="/mypage/edit">????????? ??????</Link>
          <button onClick={handleModal}>????????????</button>
          <button onClick={logout} className="last-child">
            ????????????
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        contentLabel="???????????? ??????"
        style={customStyles}
      >
        <ConfirmModal
          head="????????? ????????????????????????? ????????? ?????? ?????? ????????? ????????? ???????????? ????????? ??????????????????"
          leftBtn="??????"
          leftBtnFunc={handleModal}
          rightBtn="??????"
          rightBtnFunc={onClickLeave}
        />
      </Modal>
    </MypageWrapper>
  );
};

export default Index;
